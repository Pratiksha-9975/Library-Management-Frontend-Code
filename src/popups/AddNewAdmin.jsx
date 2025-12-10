import React from "react";
import placeHolder from "../assets/placeholder.jpg";
import closeIcon from "../assets/close-square.png";
import keyIcon from "../assets/key.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddNewAdminPopup } from "../store/slices/popUpSlice";

const AddNewAdmin = () => {
  const dispatch = useDispatch();
  const showPopup = useSelector((state) => state.popup.addNewAdminPopup);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className="bg-white rounded-xl shadow-2xl p-6 w-[90%] max-w-md animate-[fadeIn_.25s_ease]"
        style={{
          animation: "popupScale 0.25s ease",
        }}
      >
       
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Add New Admin
          </h2>
          <button
            onClick={() => dispatch(toggleAddNewAdminPopup())}
            className="hover:scale-110 transition"
          >
            <img src={closeIcon} className="w-6 h-6" alt="close" />
          </button>
        </div>

        
        <div className="flex flex-col items-center mb-5">
          <div className="relative w-24 h-24">
            <img
              src={placeHolder}
              alt="avatar"
              className="w-full h-full object-cover rounded-full border shadow"
            />
            <label className="absolute bottom-0 right-0 bg-blue-600 text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-blue-700">
              Upload
              <input type="file" className="hidden" />
            </label>
          </div>
        </div>

  
        <form className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              placeholder="admin@example.com"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <div className="flex items-center border rounded-lg px-2">
              <img src={keyIcon} className="w-5 h-5 opacity-70" alt="key" />
              <input
                type="password"
                placeholder="Enter password"
                className="w-full p-2 outline-none"
              />
            </div>
          </div>

        
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Create Admin
          </button>
        </form>
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
  );
};

export default AddNewAdmin;
