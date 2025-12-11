import React from "react";
import { useDispatch } from "react-redux";
import { toggleReadBookPopup } from "../store/slices/popUpSlice";
import closeIcon from "../assets/close-square.png";

const ReadBookPopup = ({ book }) => {
  const dispatch = useDispatch();

 
  if (!book || Object.keys(book).length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
      onClick={() => dispatch(toggleReadBookPopup())}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-6 w-[90%] max-w-lg border border-white/30 animate-[popupScale_.3s_ease]"
      >
    
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            {book.title || "Book Details"}
          </h2>

          <button
            onClick={() => dispatch(toggleReadBookPopup())}
            className="hover:scale-110 transition"
          >
            <img src={closeIcon} className="w-7" alt="close" />
          </button>
        </div>

      
        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-semibold">Author:</span>{" "}
            {book.author || "Unknown"}
          </p>

          <p>
            <span className="font-semibold">Price:</span> ₹
            {book.price || "N/A"}
          </p>

          <p>
            <span className="font-semibold">Quantity:</span>{" "}
            {book.quantity ?? "N/A"}
          </p>

          <p>
            <span className="font-semibold">Availability:</span>{" "}
            <span
              className={`font-bold ${
                book.availability ? "text-green-600" : "text-red-600"
              }`}
            >
              {book.availability ? "Available" : "Unavailable"}
            </span>
          </p>

          <p className="text-sm text-gray-600 leading-relaxed">
            <span className="font-semibold">Description:</span>
            <br />
            {book.description || "No description available."}
          </p>

        
          <p className="text-xs text-gray-500 pt-2">
            Added:{" "}
            {book.createdAt
              ? new Date(book.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
          <p className="text-xs text-gray-500">
            Updated:{" "}
            {book.updatedAt
              ? new Date(book.updatedAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>

    
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

export default ReadBookPopup;
