import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCircleUser } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { checkUser } from '../redux/user/userSlice';
import { logout } from '../redux/auth/authSlice';

const DashNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { role } = useSelector((state) => state.user);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

    useEffect(() => {
    dispatch(checkUser("User data not found"));
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout);
    navigate("/login");
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
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>

        {/* Navigation Links */}
        <div className={`lg:flex ${isOpen ? 'block' : 'hidden'} gap-x-4`}>
          <button onClick={handleLogout} className="text-white text-2xl hover:text-gray-300">
            Logout
          </button>
          {role !== 'organizer' ? (
            <Link to="/profile" className="text-white text-2xl mt-[6px] hover:text-gray-300">
            <FaCircleUser />
          </Link>
          ) : (
              <Link to="/profile" className="text-white text-2xl mt-[6px] hover:text-gray-300">
              <RiAdminFill />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashNavbar;
