import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashNavbar from '../components/DashNavbar';

const Profile = () => {
  const [user, setUser] = useState(null);

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

  useEffect(() => {
    // Retrieve the user data from sessionStorage
    const userData = sessionStorage.getItem('user');

    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        setUser(parsedUserData);
      } catch (error) {
        console.error('Failed to parse user data:', error);
      }
    }
  }, []);

  if (!user) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <>
      {/* <DashNavbar/> */}
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
        <Link to="/dashboard" className="text-white text-2xl hover:text-gray-300">
            Dash
          </Link>
          <button onClick={handleLogout} className="text-white text-2xl hover:text-gray-300">
            Logout
          </button>
        </div>
      </div>
    </nav>
      <div className="relative flex justify-center items-center min-h-screen bg-cover bg-center pt-10" style={{ backgroundImage: "url('https://images4.alphacoders.com/132/1320095.jpeg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Optional: For better readability */}
        <div className="relative z-10 w-full max-w-lg md:max-w-md p-8 space-y-4 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-white mb-6">Profile</h2>
          <div className="flex flex-col items-center space-y-4">
          <div className="text-center">
              <p className="text-lg font-medium text-gray-300">Username</p>
              <p className="text-xl text-white">{user.username}</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-medium text-gray-300">Email</p>
              <p className="text-xl text-white">{user.email}</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-medium text-gray-300">Your Role</p>
              <p className="text-xl text-white">{user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
