import React from "react";
import closeIcon from "../assets/close-square.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleSettingPopup } from "../store/slices/popUpSlice";

const SettingPopup = () => {
  const dispatch = useDispatch();
  const showPopup = useSelector((state) => state.popup.settingPopup);

  if (!showPopup) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={() => dispatch(toggleSettingPopup())}
    >
      <div
        className="bg-white rounded-xl shadow-2xl p-6 w-[90%] max-w-lg animate-[fadeIn_.25s_ease]"
        style={{ animation: "popupScale 0.25s ease" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Settings</h2>
          <button
            onClick={() => dispatch(toggleSettingPopup())}
            className="hover:scale-110 transition"
          >
            <img src={closeIcon} className="w-6 h-6" alt="close" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-6">
          {/* Theme Switch */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-medium">Dark Mode</span>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" className="peer sr-only" />
              <div className="peer h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-1 after:top-1
                after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-blue-600
                peer-checked:after:translate-x-5"></div>
            </label>
          </div>

          {/* Notification Switch */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-medium">Notifications</span>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" defaultChecked className="peer sr-only" />
              <div className="peer h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-1 after:top-1
                after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-green-500
                peer-checked:after:translate-x-5"></div>
            </label>
          </div>

          {/* Update Username */}
          <div>
            <label className="text-sm text-gray-600">Update Username</label>
            <input
              type="text"
              placeholder="Enter new username"
              className="w-full p-2 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Update Password */}
          <div>
            <label className="text-sm text-gray-600">Change Password</label>
            <input
              type="password"
              placeholder="New password"
              className="w-full p-2 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Save Changes
          </button>
        </div>
      </div>

      {/* Animations */}
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

export default SettingPopup;
