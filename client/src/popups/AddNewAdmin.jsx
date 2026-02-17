import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewAdmin } from "../store/slices/userSlice";
import { IoClose } from "react-icons/io5";
import { FiUploadCloud } from "react-icons/fi";
import { toggleAddNewAdminPopup } from "../store/slices/popUpSlice";

function AddNewAdmin() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);

    dispatch(addNewAdmin(formData));
    setName("");
    setEmail("");
    setPassword("");
    setAvatar("");
    setPreview("");
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white w-[400px] rounded-2xl shadow-2xl p-6 relative animate-fadeIn">
        {/* Close Icon */}
        <button
          onClick={() => dispatch(toggleAddNewAdminPopup())}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition duration-200"
        >
          <IoClose size={26} />
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6">
          Register New Admin
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          />
          <div className="flex flex-col items-center">
            <label
              htmlFor="avatarUpload"
              className="w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center hover:border-green-400 transition duration-200"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-24 h-24 rounded-full object-cover mb-2"
                />
              ) : (
                <>
                  <FiUploadCloud size={40} className="text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    Click to upload avatar
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG up to 2MB
                  </p>
                </>
              )}
            </label>

            <input
              id="avatarUpload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="hidden"
            />
          </div>

          <button
            type="submit"
            onClick={() => handleSubmit()}
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 transition duration-200 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register Admin"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNewAdmin;
