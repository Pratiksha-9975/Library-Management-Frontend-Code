import React, { useEffect, useState } from "react";
import { PiKeyReturnBold } from "react-icons/pi";
import { FaSquareCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toggleReturnBookPopup } from "../store/slices/popUpSlice";
import { toast } from "react-toastify";
import { fetchAllBooks, resetBookSlice } from "../store/slices/bookSlice";
import {
  fetchAllBorrowedBooks,
  resetBorrowSlice,
} from "../store/slices/borrowSlice";
import ReturnBookPopup from "../popups/ReturnBookPopup";

const Catalog = () => {
  const dispatch = useDispatch();

  const { returnBookPopup } = useSelector((state) => state.popup);

  const { loading, error, allBorrowedBooks, message } = useSelector(
    (state) => state.borrow
  );

  const [filter, setFilter] = useState("borrowed");

  // FETCH BORROWED BOOKS
  useEffect(() => {
    dispatch(fetchAllBorrowedBooks());
  }, [dispatch]);

  const formatDateAndTime = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} | ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  const currentDate = new Date();

  const borrowedBooks = allBorrowedBooks?.filter((item) => {
    const due = new Date(item.dueDate);
    return due > currentDate;
  });

  const overdueBooks = allBorrowedBooks?.filter((item) => {
    const due = new Date(item.dueDate);
    return due < currentDate;
  });

  const booksToDisplay = filter === "borrowed" ? borrowedBooks : overdueBooks;

  const [email, setEmail] = useState("");
  const [borrowBookId, setBorrowBookId] = useState("");

  const openReturnBookPopup = (bookId, email) => {
    setBorrowBookId(bookId);
    setEmail(email);
    dispatch(toggleReturnBookPopup());
  };

  
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(fetchAllBorrowedBooks());
      dispatch(fetchAllBooks());
      dispatch(resetBookSlice());
      dispatch(resetBorrowSlice());
    }

    if (error) {
      toast.error(error);
      dispatch(resetBorrowSlice());
    }
  }, [dispatch, error, message]);

  return (
    <div className="p-6 w-full max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Borrowed Catalog</h1>


      <div className="flex gap-4 mb-6">
        <button
          className={`px-5 py-2 rounded-xl font-semibold border transition ${
            filter === "borrowed"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700"
          }`}
          onClick={() => setFilter("borrowed")}
        >
          Borrowed Books
        </button>

        <button
          className={`px-5 py-2 rounded-xl font-semibold border transition ${
            filter === "overdue"
              ? "bg-red-600 text-white"
              : "bg-white text-gray-700"
          }`}
          onClick={() => setFilter("overdue")}
        >
          Overdue Books
        </button>
      </div>

      {loading && (
        <p className="text-center text-gray-500 py-10 text-lg">Loading...</p>
      )}

      {!loading && booksToDisplay?.length === 0 && (
        <p className="text-center text-gray-500 text-lg py-12">
          No books in this category.
        </p>
      )}

    
      <div className="space-y-4">
        {booksToDisplay?.map((item) => {
          const returned = item.returnDate !== null;

          return (
            <div
              key={item._id}
              className="bg-white shadow-md border rounded-xl p-5 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-start">
                
          
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    Book ID: {item.book?.id}
                  </h2>

                 

                 
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Price:</span> ₹{item.book?.price}
                  </p>

          
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-medium">Borrowed By:</span>{" "}
                    {item.user?.email}
                  </p>

              
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-medium">Borrowed On:</span>{" "}
                    {formatDateAndTime(item.borrowDate)}
                  </p>

                
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Due Date:</span>{" "}
                    {formatDateAndTime(item.dueDate)}
                  </p>

               
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Fine:</span> ₹{item.fine}
                  </p>

                
                  {!returned ? (
                    <p className="text-red-600 font-semibold mt-2">
                      Not Returned
                    </p>
                  ) : (
                    <p className="text-green-600 font-semibold mt-2 flex items-center gap-1">
                      <FaSquareCheck /> Returned
                    </p>
                  )}
                </div>

             
                {!returned && (
                  <button
                    onClick={() =>
                      openReturnBookPopup(item.book?.id, item.user?.email)
                    }
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition flex items-center gap-2"
                  >
                    <PiKeyReturnBold size={18} />
                    Return
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {returnBookPopup && (
        <ReturnBookPopup bookId={borrowBookId} email={email} />
      )}
    </div>
  );
};

export default Catalog;
