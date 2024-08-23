import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ClipLoader } from "react-spinners";
import { signupUser } from "../redux/auth/authApi";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
    bio: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);

  const { name, email, password, role, phoneNumber, bio } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onImageChange = (e) => setProfileImage(e.target.files[0]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("phoneNumber", phoneNumber);
    formData.append("bio", bio);
    if (profileImage) formData.append("profileImage", profileImage);

    dispatch(signupUser(formData)).then((res) => {
      if (res.type === "auth/register/fulfilled") {
        setMessage("Redirecting to login page...");
        toast.success("Registration successful");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else if (res.type === "auth/register/rejected") {
        setMessage("Please try again.");
        toast.error("Registration failed.");
      }
    });
  };

  return (
    <>
      <Navbar />
      <div
        className="relative flex justify-center items-center min-h-screen bg-cover bg-center pt-10"
        style={{
          backgroundImage:
            "url('https://images4.alphacoders.com/132/1320095.jpeg')",
        }}
      >
        {" "}
        <Toaster />
        <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
        {/* Optional: For better readability */}
        <div className="relative z-10 w-full max-w-sm md:max-w-md p-8 space-y-4 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-white">
            Register
          </h2>
          <form
            onSubmit={onSubmit}
            className="space-y-6"
            encType="multipart/form-data"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={onChange}
                  required
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 mt-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 mt-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                  placeholder="Password"
                  className="w-full px-4 py-2 mt-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                />
                <div
                  className="absolute inset-y-0 right-0 top-7 flex items-center px-3 text-md cursor-pointer text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-300"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={onChange}
                  placeholder="Enter your Number"
                  className="w-full px-4 py-2 mt-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-300"
                >
                  Role
                </label>
                <select
                  name="role"
                  value={role}
                  onChange={onChange}
                  className="w-full px-4 py-2 mt-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="select">Select</option>
                  <option value="player">Player</option>
                  <option value="organizer">Organizer</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="profileImage"
                  className="block text-sm font-medium text-gray-300"
                >
                  Profile Image
                </label>
                <input
                  type="file"
                  name="profileImage"
                  onChange={onImageChange}
                  className="w-full px-4 py-2 mt-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-300"
                >
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={bio}
                  onChange={onChange}
                  placeholder="Bio"
                  className="w-full px-4 py-2 mt-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              disabled={authStatus === "loading"}
            >
              {authStatus === "signup loading" ? (
                <ClipLoader size={20} color={"#fff"} />
              ) : (
                "Register"
              )}
            </button>
            <p className="text-sm font-semibold text-blue-600 text-center">
              Already have an account..?{" "}
              <Link to="/login" className="font-semibold text-white">
                Click Here
              </Link>
            </p>
          </form>
          {authError && (
            <p className="mt-4 text-center text-sm text-red-400">{authError}</p>
          )}
          {message && (
            <p className="mt-4 text-center text-sm text-green-400">{message}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Register;
