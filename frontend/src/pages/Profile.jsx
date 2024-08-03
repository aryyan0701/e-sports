import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { logout } from '../redux/auth/authSlice';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [createdEvents, setCreatedEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = sessionStorage.getItem('user');
      if (userData) {
        try {
          const parsedUserData = JSON.parse(userData);
          setUser(parsedUserData);
        } catch (error) {
          console.error('Failed to parse user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUserEvents = async () => {
      if (!user) return;
  
  
      try {
        if (user.role === "organizer") {
          const createdEventsRes = await axios.get("http://localhost:5000/api/events");
          const filteredEvents = createdEventsRes.data.filter(event => event.contact === user.email);
          setCreatedEvents(filteredEvents);
        }
  
        if (user.role === "player") {
          const token = sessionStorage.getItem('token');
          const registeredEventsRes = await axios.get(`http://localhost:5000/api/events/player/${user.id}/registered`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setRegisteredEvents(registeredEventsRes.data);
        }
      } catch (err) {
        console.error("Error fetching user events:", err.message);
      }
    };
  
    fetchUserEvents();
  }, [user]);
  

  if (!user) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-3xl"><a href="/">Battelfy</a></div>

          <button className="block lg:hidden text-white focus:outline-none" onClick={toggleMenu}>
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

          <div className={`lg:flex ${isOpen ? 'block' : 'hidden'} gap-x-4`}>
            <Link to="/dashboard" className="text-white text-2xl hover:text-gray-300">Dash</Link>
            <button onClick={handleLogout} className="text-white text-2xl hover:text-gray-300">Logout</button>
          </div>
        </div>
      </nav>
      <div className="relative flex flex-col justify-center items-center min-h-screen bg-cover bg-center pt-10" style={{ backgroundImage: "url('https://img.freepik.com/free-vector/gradient-neon-light-background_23-2149332915.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* user details */}
        <div className="relative z-10 w-full max-w-lg md:max-w-md p-8 space-y-4 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-white mb-6">Your Details</h2>
          <div className="flex flex-col items-center space-y-4">
            {user.profileImage && (
              <div className="text-center">
                <img src={`http://localhost:5000${user.profileImage}`} alt="Profile" className="w-30 h-26 rounded-full" />
              </div>
            )}
            <div className="text-start grid grid-cols-2 gap-2">
              <div>
                <p className="text-lg font-medium text-gray-300">Name</p>
                <p className="text-lg font-medium text-gray-300 mt-2">Email</p>
                <p className="text-lg font-medium text-gray-300 mt-2">Phone Number</p>
                <p className="text-lg font-medium text-gray-300 mt-2">Your Role</p>
                <p className="text-lg font-medium text-gray-300 mt-2">Bio</p>
              </div>
              <div>
                <p className="text-xl text-white">{user.name}</p>
                <p className="text-xl text-white mt-2">{user.email}</p>
                <p className="text-xl text-white mt-2">{user.phoneNumber}</p>
                <p className="text-xl text-white mt-2">{user.role}</p>
                <p className="text-xl text-white mt-2">{user.bio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* events details */}
        <div className="relative z-10 w-full max-w-lg md:max-w-4xl p-8 space-y-4 bg-gray-800 rounded-lg shadow-lg mt-8">
          {user.role === "organizer" ? (
            <>
              <h2 className="text-3xl font-bold text-center text-white mb-6">Events You Created</h2>
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {createdEvents.map((event) => (
                  <div key={event._id} className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-2">{event.name.toUpperCase()}</h3>
                    <p className="text-gray-500 mb-2">
                      <strong>Date:</strong>{" "}
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-500 mb-2">
                      <strong>Contact:</strong> {event.contact}
                    </p>
                    <p className="text-gray-500 mb-2">
                      <strong>Prizepool:</strong> {event.prizepool}
                    </p>
                    <p className="text-gray-500 mb-4">
                      <strong>Description:</strong> {event.description}
                    </p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-center text-white mb-6">Your Upcoming Events</h2>
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {registeredEvents.map((event) => (
                  <div key={event._id} className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-2">{event.name.toUpperCase()}</h3>
                    <p className="text-gray-500 mb-2">
                      <strong>Date:</strong>{" "}
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-500 mb-2">
                      <strong>Contact:</strong> {event.contact}
                    </p>
                    <p className="text-gray-500 mb-2">
                      <strong>Prizepool:</strong> {event.prizepool}
                    </p>
                    <p className="text-gray-500 mb-4">
                      <strong>Description:</strong> {event.description}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
