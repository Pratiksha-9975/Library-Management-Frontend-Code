import React, { useEffect, useState } from "react";
import adminIcon from "../assets/pointing.png";
import usersIcon from "../assets/people-black.png";
import bookIcon from "../assets/book-square.png";
import { Pie, Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";

import logo from "../assets/black-logo.png";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const { books } = useSelector((state) => state.book);
  const { allBorrowedBooks } = useSelector((state) => state.borrow);

  const [totalUser, setTotalUsers] = useState(0);
  const [totalAdmin, setTotalAdmin] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);
  const [overdueCount, setOverdueCount] = useState(0);

  useEffect(() => {
    let numberOfUsers = users.filter((u) => u.role === "User");
    let numberOfAdmins = users.filter((u) => u.role === "Admin");

    setTotalUsers(numberOfUsers.length);
    setTotalAdmin(numberOfAdmins.length);

    setTotalBooks(books?.length || 0);

    let borrowed = allBorrowedBooks.filter((b) => b.returnDate === null);
    let returned = allBorrowedBooks.filter((b) => b.returnDate !== null);

    setTotalBorrowedBooks(borrowed.length);
    setTotalReturnedBooks(returned.length);

    let overdue = borrowed.filter((b) => new Date(b.dueDate) < new Date());
    setOverdueCount(overdue.length);
  }, [users, books, allBorrowedBooks]);


  const pieData = {
    labels: ["Borrowed Books", "Returned Books"],
    datasets: [
      {
        data: [totalBorrowedBooks, totalReturnedBooks],
        backgroundColor: ["#3B82F6", "#10B981"],
        hoverBackgroundColor: ["#1D4ED8", "#059669"],
        borderWidth: 2,
      },
    ],
  };

 
  const monthlyCount = Array(12).fill(0);
  allBorrowedBooks.forEach((item) => {
    const month = new Date(item.borrowDate).getMonth();
    monthlyCount[month] += 1;
  });

  const lineChartData = {
    labels: [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ],
    datasets: [
      {
        label: "Books Borrowed",
        data: monthlyCount,
        borderColor: "#3B82F6",
        backgroundColor: "#93C5FD",
        tension: 0.3,
      },
    ],
  };


  const bookFrequency = {};
  allBorrowedBooks.forEach((item) => {
    if (!bookFrequency[item.bookTitle]) bookFrequency[item.bookTitle] = 0;
    bookFrequency[item.bookTitle]++;
  });

  const topBooks = Object.entries(bookFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  
  const recentBorrowList = [...allBorrowedBooks]
    .sort((a, b) => new Date(b.borrowDate) - new Date(a.borrowDate))
    .slice(0, 5);

return (
  <div className="p-6 w-full max-w-7xl mx-auto space-y-10">

    {/* Header */}
    <div className="flex flex-col sm:flex-row justify-between gap-6 items-start sm:items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold flex items-center gap-3">
        <img src={logo} alt="logo" className="w-10 bg-white p-1 rounded-lg" />
        Admin Dashboard
      </h1>

      <div className="flex items-center gap-4 bg-white/20 backdrop-blur-md p-3 px-5 rounded-xl">
        <img
          src={user?.avatar?.url || "/default-avatar.png"}
          alt="avatar"
          className="w-12 h-12 rounded-full object-cover border-2 border-white"
        />
        <p className="text-lg font-medium">
          Welcome, <span className="font-bold">{user?.name}</span>
        </p>
      </div>
    </div>

    {/* Stats Cards */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {[
        { label: "Users", value: totalUser, icon: usersIcon },
        { label: "Admins", value: totalAdmin, icon: adminIcon },
        { label: "Total Books", value: totalBooks, icon: bookIcon },
      ].map((item, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-5 border shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <img src={item.icon} className="w-8" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">{item.label}</p>
              <h2 className="text-2xl font-bold">{item.value}</h2>
            </div>
          </div>
        </div>
      ))}

      <div className="bg-white rounded-2xl p-5 border shadow-md hover:shadow-xl transition">
        <p className="text-gray-500 text-sm">Borrowed</p>
        <h2 className="text-3xl font-bold text-indigo-600">
          {totalBorrowedBooks}
        </h2>
      </div>

      <div className="bg-red-50 rounded-2xl p-5 border border-red-200 shadow-md hover:shadow-xl transition">
        <p className="text-red-500 text-sm">Overdue</p>
        <h2 className="text-3xl font-bold text-red-600">
          {overdueCount}
        </h2>
      </div>
    </div>

    {/* Chart */}
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl p-6 shadow-lg border hover:shadow-xl transition">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
          Borrowed vs Returned
        </h2>
        <Pie data={pieData} />
      </div>
    </div>

  </div>
);


};

export default AdminDashboard;
