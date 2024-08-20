import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { FaWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "../redux/user/userSlice";
import { logout } from "../redux/auth/authSlice";
import toast, { Toaster } from "react-hot-toast";

const DashNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { role } = useSelector((state) => state.user);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    dispatch(checkUser("User data not found"));
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successful");
    setTimeout(() =>{
      navigate('/login')
    }, 2000)
  };

  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-3xl">
            <FaBars
              className="inline text-white text-2xl mb-2 cursor-pointer"
              onClick={toggleDrawer}
            />{" "}
            <a href="/">Battelfy</a>
          </div>

          {/* Navigation Links */}
          <div className= 'gap-x-4'>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://cdn-icons-png.flaticon.com/512/4715/4715328.png"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-200 rounded-box z-50 w-56 h-32 p-2 shadow"
              >
                <li>
                  <Link to='/profile' className="justify-between text-lg text-gray-300 font-semibold">
                    Profile
                    {role !== "organizer" ? (<span className="badge bg-gray-200 text-sm text-black">Player</span>):(<span className="badge bg-gray-200 text-md text-black">Organizer</span>)}
                  </Link>
                </li>
                <li>
                  <a className="text-lg text-gray-300 font-semibold">Settings</a>
                </li>
                <li>
                  <button  onClick={handleLogout}>
                  <a className="text-lg text-gray-300 font-semibold">Logout</a>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      
      <Toaster/>
      <div
        className={`drawer ${isOpen ? "drawer-open fixed inset-0 z-50" : ""}`}
      >
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={isOpen}
          onChange={toggleDrawer}
        />
        <div className="drawer-content"></div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
            onClick={toggleDrawer}
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <div className="relative">
              <button
                onClick={toggleDrawer}
                className="absolute top-4 right-4 text-white p-2 focus:outline-none"
              >
                <FaWindowClose className="text-white text-3xl" />
              </button>
            </div>
            <div className="text-white font-bold text-4xl p-5">
              <a href="/">Battelfy</a>
            </div>
            <li className="mt-10 text-xl font-semibold">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="mt-2 text-xl font-semibold">
              <Link to="/create-event">Create Event</Link>
            </li>
            <li className="mt-2 text-xl font-semibold">
              <Link to="/eventlist">Event List</Link>
            </li>
            <li className="mt-2 text-xl font-semibold">
              <Link to="/news">Latest News</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashNavbar;
