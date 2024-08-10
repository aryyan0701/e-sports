import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ClipLoader } from "react-spinners";
import { loginUser } from "../redux/auth/authApi";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: location.state?.email || "",
    password: location.state?.password || "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);

  const { email, password } = formData;

  useEffect(() => {
    if (location.state?.email && location.state?.password) {
      handleSubmit();
    }
  }, []);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    dispatch(loginUser(formData)).then((res) => {
      if (res.type === "auth/login/fulfilled") {
        setMessage("Redirecting to dashboard...");
        toast.success("Login successful");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else if(res.type === "auth/login/rejected") {
        toast.error(res.payload || "Login failed");
        setMessage("Please check your credentials and try again.");
      }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <>
      <Navbar />
      <div
        className="relative flex justify-center items-center min-h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images7.alphacoders.com/132/1320094.jpeg')",
        }}
      >
        <Toaster/>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 w-full max-w-md p-8 space-y-4 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-white">Login</h2>
          <form onSubmit={onSubmit} className="space-y-6">
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
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2 mt-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              disabled={authStatus === "login loading"}
            >
              {authStatus === "login loading" ? (
                <ClipLoader size={20} color={"#fff"} />
              ) : (
                "Login"
              )}
            </button>
            <p className="text-sm text-center">
              Don't have an account..?{" "}
              <Link to="/register" className="font-semibold text-white">
                Click Here
              </Link>
            </p>
          </form>
          {authStatus === "login failed" && (
            <p className="mt-4 text-center text-sm text-red-400">{message}</p>
          )}
          {authStatus === "login succeeded" && (
            <p className="mt-4 text-center text-sm text-green-400">{message}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
