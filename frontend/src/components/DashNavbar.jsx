import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCircleUser, FaBars } from "react-icons/fa6";
import { FaWindowClose } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "../redux/user/userSlice";
import { logout } from "../redux/auth/authSlice";

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
    navigate("/login");
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
          <div className={`lg:flex ${isOpen ? "block" : "hidden"} gap-x-4`}>
            <button
              onClick={handleLogout}
              className="text-white text-2xl hover:text-gray-300"
            >
              Logout
            </button>
            {role !== "organizer" ? (
              <Link
                to="/profile"
                className="text-white text-2xl mt-[6px] hover:text-gray-300"
              >
                <FaCircleUser />
              </Link>
            ) : (
              <Link
                to="/profile"
                className="text-white text-2xl mt-[6px] hover:text-gray-300"
              >
                <RiAdminFill />
              </Link>
            )}
          </div>
        </div>
      </nav>

      <div className={`drawer ${isOpen ? "drawer-open fixed inset-0 z-50" : ""}`}>
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
              <Link to='/dashboard'>Dashboard</Link>
            </li>
            <li className="mt-2 text-xl font-semibold">
              <Link to='/create-event'>Create Event</Link>
            </li>
            <li className="mt-2 text-xl font-semibold">
              <Link to='/eventlist'>Event List</Link>
            </li>
            <li className="mt-2 text-xl font-semibold">
              <Link to='/news'>Latest News</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashNavbar;
