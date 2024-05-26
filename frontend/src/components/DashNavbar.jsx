import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DashNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user'); // Remove user data from session storage
    navigate('/login'); // Navigate to the login page
  };

  return (
    <nav className="bg-indigo-600 p-4">
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
        <div className={`lg:flex ${isOpen ? 'block' : 'hidden'} space-x-4 gap-x-5`}>
          <Link to="/profile" className="text-white text-xl hover:text-gray-300">
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="text-white text-xl hover:text-gray-300"
          >
            Logout
          </button>
          {/* <Link to="/create-event" className="text-white hover:text-gray-300">
            Create Event
          </Link>
          <Link to="/events" className="text-white hover:text-gray-300">
            Event List
          </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default DashNavbar;
