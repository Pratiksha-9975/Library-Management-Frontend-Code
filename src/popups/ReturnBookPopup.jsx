import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { returnBook } from "../store/slices/borrowSlice";
import { toggleReturnBookPopup } from "../store/slices/popUpSlice";
import closeIcon from "../assets/close-square.png";

const ReturnBookPopup = ({ bookId, userEmail }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(userEmail || "");

  const handleReturnBook = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return alert("Please enter user email!");
    }

    dispatch(returnBook(email, bookId));
    dispatch(toggleReturnBookPopup());
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
      onClick={() => dispatch(toggleReturnBookPopup())}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-md border border-gray-200 animate-[popupScale_.3s_ease]"
      >
   
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Return Borrowed Book
          </h2>

          <button
            onClick={() => dispatch(toggleReturnBookPopup())}
            className="hover:scale-110 transition"
          >
            <img src={closeIcon} className="w-7" alt="close" />
          </button>
        </div>

      
        <form onSubmit={handleReturnBook} className="space-y-4">

       
          <div>
            <label className="text-sm font-medium text-gray-600">
              User Email
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 
                         focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white rounded-xl 
                       hover:bg-green-700 transition font-semibold shadow-md"
          >
            Confirm Return
          </button>
        </form>

       
        <style>
          {`
            @keyframes popupScale {
              0% { transform: scale(0.85); opacity: 0; }
              100% { transform: scale(1); opacity: 1; }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default ReturnBookPopup;
