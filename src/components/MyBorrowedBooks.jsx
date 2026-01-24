import React, { useState } from "react";
import { BookA, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleReadBookPopup } from "../store/slices/popUpSlice";
import ReadBookPopup from "../popups/ReadBookPopup";

const MyBorrowedBooks = () => {
  const dispatch = useDispatch();

  const { userBorrowedBooks } = useSelector((state) => state.borrow);
  const { books } = useSelector((state) => state.book);
  const { readBookPopUp } = useSelector((state) => state.popup);

  const [readBook, setReadBook] = useState({});
  const [filter, setFilter] = useState("not-returned");

  // Open popup with real book details
  const openReadPopup = (item) => {
    const fullBook = books.find((b) => b._id === item.bookId);
    setReadBook(fullBook || {});
    dispatch(toggleReadBookPopup());
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} | ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  const isOverdue = (dueDate, returned) => {
    if (returned) return false;
    if (!dueDate) return false;
    return new Date() > new Date(dueDate);
  };

  const returnedBooks = userBorrowedBooks?.filter((b) => b.returned === true);
  const notReturnedBooks = userBorrowedBooks?.filter((b) => b.returned === false);

  const booksToDisplay =
    filter === "returned" ? returnedBooks : notReturnedBooks;

  return (
    <div className="p-6 w-full max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <BookA size={32} className="text-blue-600" />
          My Borrowed Books
        </h1>
      </div>

      {/* FILTER */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-xl font-semibold border ${
            filter === "returned"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700"
          }`}
          onClick={() => setFilter("returned")}
        >
          Returned
        </button>

        <button
          className={`px-4 py-2 rounded-xl font-semibold border ${
            filter === "not-returned"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700"
          }`}
          onClick={() => setFilter("not-returned")}
        >
          Not Returned
        </button>
      </div>

      {/* EMPTY MESSAGE */}
      {booksToDisplay?.length === 0 && (
        <p className="text-center py-12 text-gray-500 text-lg">
          No books in this category.
        </p>
      )}

      {/* BOOK LIST */}
      <div className="space-y-4">
        {booksToDisplay?.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-md p-5 border hover:shadow-xl transition cursor-pointer flex justify-between items-center"
            onClick={() => openReadPopup(item)}
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {item.bookTitle}
              </h2>

              <div className="mt-3 space-y-1 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Borrowed On:</span>{" "}
                  {formatDate(item.borrowedDate)}
                </p>

                <p>
                  <span className="font-medium">Due Date:</span>{" "}
                  {formatDate(item.dueDate)}
                </p>

                {!item.returned && isOverdue(item.dueDate, item.returned) && (
                  <p className="text-red-600 font-bold">
                    ⚠ Overdue! Please return immediately
                  </p>
                )}

                {!item.returned && !isOverdue(item.dueDate, item.returned) && (
                  <p className="text-blue-600 font-medium">Not Returned Yet</p>
                )}

                {item.returned && (
                  <p className="text-green-600 font-medium">
                    Returned: {formatDate(item.returnedAt)}
                  </p>
                )}
              </div>
            </div>

            <ChevronRight size={28} className="text-gray-400" />
          </div>
        ))}
      </div>

      {/* POPUP */}
      {readBookPopUp && <ReadBookPopup book={readBook} />}
    </div>
  );
};

export default MyBorrowedBooks;
