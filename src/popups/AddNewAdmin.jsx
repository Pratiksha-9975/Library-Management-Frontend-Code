import React, { useState } from "react";
import placeHolder from "../assets/placeholder.jpg";
import closeIcon from "../assets/close-square.png";
import keyIcon from "../assets/key.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddNewAdminPopup } from "../store/slices/popUpSlice";
import { addNewAdmin } from "../store/slices/userSlice";

const AddNewAdmin = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const showPopup = useSelector((state) => state.popup.addNewAdminPopup);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  if (!showPopup) return null;


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result);
    if (file) reader.readAsDataURL(file);
  };


  const handleAddNewAdmin = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (avatar) formData.append("avatar", avatar);

    dispatch(addNewAdmin(formData));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className="bg-white rounded-xl shadow-2xl p-6 w-[90%] max-w-md animate-[popupScale_.25s_ease] relative"
      >
       
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Add New Admin</h2>
          <button
            onClick={() => dispatch(toggleAddNewAdminPopup())}
            className="hover:scale-110 transition"
          >
            <img src={closeIcon} className="w-6 h-6" alt="close" />
          </button>
        </div>

     
        <div className="flex flex-col items-center mb-5">
          <div className="relative w-28 h-28">
            <img
              src={avatarPreview || placeHolder}
              alt="avatar"
              className="w-full h-full object-cover rounded-full border shadow"
            />

            <label className="absolute bottom-0 right-0 bg-blue-600 text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-blue-700">
              Upload
              <input type="file" className="hidden" onChange={handleImageChange} />
            </label>
          </div>
        </div>

   
        <form className="space-y-4" onSubmit={handleAddNewAdmin}>
       
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

        
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="flex items-center border rounded-lg px-2">
              <img src={keyIcon} className="w-5 h-5 opacity-70" alt="key" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full p-2 outline-none"
                required
              />
            </div>
          </div>

       
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            {loading ? "Creating..." : "Create Admin"}
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
