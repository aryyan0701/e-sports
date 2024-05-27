// DashNavbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { PiGameControllerBold } from "react-icons/pi";

const DashNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-3xl"><a href="/">Battelfy</a></div>

        {/* Toggle Button for Small Screens */}
        <button
          className="block lg:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>

        {/* Navigation Links */}
        <div className={`lg:flex ${isOpen ? 'block' : 'hidden'} gap-x-4`}>
        {/* <Link to="/eventlist" className="text-white text-2xl hover:text-gray-300">
           Play
          </Link>
        <Link to="/create-event" className="text-white text-2xl  hover:text-gray-300">
           Events
          </Link> */}
          <button onClick={handleLogout} className="text-white text-2xl hover:text-gray-300">
            Logout
          </button>
          <Link to="/profile" className="text-white text-2xl mt-[6px] hover:text-gray-300">
            <FaCircleUser/>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default DashNavbar;
