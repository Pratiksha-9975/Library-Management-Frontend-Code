import React, { useEffect, useState } from "react";
import logo_with_title from "../assets/logo-with-title-black.png";
import returnIcon from "../assets/redo.png";
import browseIcon from "../assets/pointing.png";
import bookIcon from "../assets/book-square.png";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";

import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

const UserDashboard = () => {
  const { userBorrowedBooks } = useSelector((state) => state.borrow);
  const { user } = useSelector((state) => state.auth);

  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  const [borrowCounter, setBorrowCounter] = useState(0);
  const [returnCounter, setReturnCounter] = useState(0);

  useEffect(() => {
    const borrowed = userBorrowedBooks.filter((book) => !book.returned);
    const returned = userBorrowedBooks.filter((book) => book.returned);

    setTotalBorrowedBooks(borrowed.length);
    setTotalReturnedBooks(returned.length);

    let i = 0;
    const interval = setInterval(() => {
      if (i <= borrowed.length) setBorrowCounter(i);
      if (i <= returned.length) setReturnCounter(i);
      i++;
    }, 30);

    return () => clearInterval(interval);
  }, [userBorrowedBooks]);

  const pieData = {
    labels: ["Borrowed Books", "Returned Books"],
    datasets: [
      {
        data: [totalBorrowedBooks, totalReturnedBooks],
        backgroundColor: ["#3B82F6", "#10B981"],
        hoverBackgroundColor: ["#1D4ED8", "#059669"],
        borderWidth: 2,
        hoverOffset: 12,
      },
    ],
  };

return (
  <div className="p-6 w-full max-w-7xl mx-auto space-y-12">

    {/* Header */}
    <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-10 shadow-2xl overflow-hidden">
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-white">
        <div>
          <h1 className="text-4xl font-extrabold">
            Welcome Back,{" "}
            <span className="text-yellow-300">{user?.name}</span>
          </h1>
          <p className="mt-2 text-lg text-white/90">
            Track your reading progress and activity
          </p>
        </div>

        <img
          src={logo_with_title}
          alt="logo"
          className="w-48 drop-shadow-xl opacity-90 hover:opacity-100 transition"
        />
      </div>

      <div className="absolute -right-24 -top-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white rounded-3xl shadow-lg border hover:shadow-2xl transition group">
        <div className="p-7 flex items-center gap-5">
          <div className="p-4 rounded-2xl bg-blue-100 group-hover:scale-110 transition">
            <img src={bookIcon} className="w-10" />
          </div>
          <div>
            <h2 className="text-gray-500 font-medium">Borrowed Books</h2>
            <p className="text-4xl font-extrabold text-blue-600">
              {borrowCounter}
            </p>
          </div>
        </div>
        <div className="h-2 bg-blue-500 rounded-b-3xl" />
      </div>

      <div className="bg-white rounded-3xl shadow-lg border hover:shadow-2xl transition group">
        <div className="p-7 flex items-center gap-5">
          <div className="p-4 rounded-2xl bg-green-100 group-hover:scale-110 transition">
            <img src={returnIcon} className="w-10" />
          </div>
          <div>
            <h2 className="text-gray-500 font-medium">Returned Books</h2>
            <p className="text-4xl font-extrabold text-green-600">
              {returnCounter}
            </p>
          </div>
        </div>
        <div className="h-2 bg-green-500 rounded-b-3xl" />
      </div>

      <div className="bg-white rounded-3xl shadow-lg border hover:shadow-2xl transition group">
        <div className="p-7 flex items-center gap-5">
          <div className="p-4 rounded-2xl bg-purple-100 group-hover:scale-110 transition">
            <img src={browseIcon} className="w-10" />
          </div>
          <div>
            <h2 className="text-gray-500 font-medium">Total Activity</h2>
            <p className="text-4xl font-extrabold text-purple-600">
              {borrowCounter + returnCounter}
            </p>
          </div>
        </div>
        <div className="h-2 bg-purple-500 rounded-b-3xl" />
      </div>
    </div>

   

    {/* Recent Activity */}
    {userBorrowedBooks.length > 0 && (
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          📚 Recent Activity
        </h2>

        <div className="space-y-5">
          {userBorrowedBooks.slice(0, 3).map((item) => (
            <div
              key={item._id}
              className="p-6 bg-white rounded-3xl border shadow-md hover:shadow-xl transition flex justify-between items-center"
            >
              <div>
                <p className="text-gray-800 font-semibold">
                  Book ID: <span className="text-blue-600">{item.bookId}</span>
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Borrowed On:{" "}
                  {new Date(item.borrowedDate).toLocaleDateString()}
                </p>
              </div>

              {item.returned ? (
                <span className="px-5 py-1.5 text-green-700 bg-green-100 rounded-full font-semibold">
                  Returned
                </span>
              ) : (
                <span className="px-5 py-1.5 text-red-700 bg-red-100 rounded-full font-semibold">
                  Not Returned
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Empty State */}
    {userBorrowedBooks.length === 0 && (
      <p className="text-gray-500 text-center text-lg mt-12">
        📖 No activity yet. Start borrowing books to see insights here!
      </p>
    )}
  </div>
);

};

export default UserDashboard;
