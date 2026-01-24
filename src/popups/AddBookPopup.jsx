import React, { useState } from "react";
import closeIcon from "../assets/close-square.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddBookPopup } from "../store/slices/popUpSlice";
import { addBook, fetchAllBooks } from "../store/slices/bookSlice";

const AddBookPopup = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.book);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");

  const handleAddBook = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("description", description);

    dispatch(addBook(formData)).then(() => {
      dispatch(fetchAllBooks());
      dispatch(toggleAddBookPopup()); 
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={() => dispatch(toggleAddBookPopup())}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white/90 backdrop-blur-xl w-[90%] max-w-lg shadow-2xl rounded-2xl p-6 border border-white/30 animate-[popupScale_.3s_ease]"
      >
    
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Add New Book</h2>

          <button
            onClick={() => dispatch(toggleAddBookPopup())}
            className="hover:scale-110 transition"
          >
            <img src={closeIcon} className="w-7 h-7" alt="close" />
          </button>
        </div>

       
        <form onSubmit={handleAddBook} className="space-y-5">
          
         
          <div>
            <label className="text-sm font-medium text-gray-700">Book Title</label>
            <input
              type="text"
              placeholder="Enter book title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-2 p-3 border rounded-xl bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

       
          <div>
            <label className="text-sm font-medium text-gray-700">Author</label>
            <input
              type="text"
              placeholder="Enter author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full mt-2 p-3 border rounded-xl bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

  
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Price (₹)</label>
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full mt-2 p-3 border rounded-xl bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full mt-2 p-3 border rounded-xl bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
          </div>

       
          <div>
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-2 p-3 border rounded-xl bg-white focus:ring-2 focus:ring-blue-500 outline-none h-28 resize-none"
              required
            ></textarea>
          </div>

      
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition shadow-md"
          >
            {loading ? "Adding..." : "Add Book"}
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

export default AddBookPopup;
