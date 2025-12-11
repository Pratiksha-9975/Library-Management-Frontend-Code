import React, { useEffect, useState } from "react";
import { BookOpen, Search, Eye, Plus, LibraryBig } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import {
  toggleReadBookPopup,
  toggleRecordBookPopup,
  toggleAddBookPopup,
} from "../store/slices/popUpSlice";

import { toast } from "react-toastify";
import { fetchAllBooks, resetBookSlice } from "../store/slices/bookSlice";
import {
  fetchAllBorrowedBooks,
  resetBorrowSlice,
} from "../store/slices/borrowSlice";

import AddBookPopup from "../popups/AddBookPopup";
import ReadBookPopup from "../popups/ReadBookPopup";
import RecordBookPopup from "../popups/RecordBookPopup";

const BookManagement = () => {
  const dispatch = useDispatch();

  const { loading, error, message, books } = useSelector((state) => state.book);
  const { user } = useSelector((state) => state.auth);

  const { addBookPopup, readBookPopUp, recordBookPopup } = useSelector(
    (state) => state.popup
  );

  const { error: borrowError, message: borrowMessage } = useSelector(
    (state) => state.borrow
  );

  const [readBook, setReadBook] = useState({});
  const [borrowBookId, setBorrowBookId] = useState("");

  
  useEffect(() => {
    dispatch(fetchAllBooks());
    dispatch(fetchAllBorrowedBooks());
  }, [dispatch]);

 
  useEffect(() => {
    if (message || borrowMessage) {
      toast.success(message || borrowMessage);
      dispatch(fetchAllBooks());
      dispatch(fetchAllBorrowedBooks());
      dispatch(resetBookSlice());
      dispatch(resetBorrowSlice());
    }

    if (error || borrowError) {
      toast.error(error || borrowError);
      dispatch(resetBookSlice());
      dispatch(resetBorrowSlice());
    }
  }, [message, borrowMessage, error, borrowError, dispatch]);


  const [searchedKeyword, setSearchedKeyword] = useState("");
  const handleSearch = (e) => {
    setSearchedKeyword(e.target.value.toLowerCase());
  };

  const searchedBooks = books.filter((book) =>
    book.title?.toLowerCase().includes(searchedKeyword)
  );


  const openReadPopup = (id) => {
    const book = books.find((b) => b._id === id);
    setReadBook(book || {});
    dispatch(toggleReadBookPopup());
  };

  
  const openRecordBookPopup = (id) => {
    setBorrowBookId(id);
    dispatch(toggleRecordBookPopup());
  };


  const openAddBookPopup = () => {
    dispatch(toggleAddBookPopup());
  };

  return (
    <>
      <div className="p-6 w-full max-w-6xl mx-auto">
     
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <LibraryBig className="text-blue-600" size={32} />
            {user?.role === "Admin" ? "Book Management" : "Books"}
          </h1>

        
          {user?.role === "Admin" && (
            <button
              onClick={openAddBookPopup}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-md"
            >
              <Plus size={18} /> Add Book
            </button>
          )}
        </div>

        <div className="relative mb-6">
          <Search size={20} className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search books..."
            value={searchedKeyword}
            onChange={handleSearch}
            className="w-full pl-12 pr-4 py-3 rounded-xl border shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-40 bg-gray-200 animate-pulse rounded-xl"
              ></div>
            ))}
          </div>
        )}

    
        {!loading && searchedBooks.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-lg">
            No books found.
          </div>
        )}


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchedBooks.map((book) => (
            <div
              key={book._id}
              className="p-5 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition border border-gray-100"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                {book.title}
              </h2>

              <p className="text-sm text-gray-500 mb-3">{book.author}</p>

              <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                {book.description}
              </p>

              <div className="flex justify-between items-center">
              
                <button
                  onClick={() => openReadPopup(book._id)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                >
                  <Eye size={18} /> View
                </button>

         
                {user?.role === "Admin" && (
                  <button
                    onClick={() => openRecordBookPopup(book._id)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <BookOpen size={18} /> Record Borrow
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

   
      {addBookPopup && <AddBookPopup />}
      {readBookPopUp && <ReadBookPopup book={readBook} />}

   
      {user?.role === "Admin" && recordBookPopup && (
        <RecordBookPopup bookId={borrowBookId} />
      )}
    </>
  );
};

export default BookManagement;
