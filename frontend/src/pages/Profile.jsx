import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [registrationHistory, setRegistrationHistory] = useState([]);
  const [organizedEvents, setOrganizedEvents] = useState([]);
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

  // useEffect(() => {
  //   if (user) {
  //     if (user.role === 'player') {
  //       fetchRegistrationHistory(user.email);
  //     } else if (user.role === 'organizer') {
  //       fetchOrganizedEvents(user._id);
  //     }
  //   }
  // }, [user]);

  
  // const fetchRegistrationHistory = async (userEmail) => {
  //   try {
  //     console.log(`Fetching registration history for ${userEmail}`);
  //     const res = await axios.get(`http://localhost:5000/api/registrations?email=${userEmail}`);
  //     console.log('API Response:', res.data);
  //     const registrations = res.data;
  
  //     // Fetch event details for each registration
  //     const eventPromises = registrations.map(reg =>
  //       axios.get(`http://localhost:5000/api/events/${reg.eventId}`).then(eventRes => ({
  //         ...reg,
  //         event: eventRes.data
  //       }))
  //     );
  
  //     const userRegistrations = await Promise.all(eventPromises);
  //     console.log('User Registrations:', userRegistrations);
  //     setRegistrationHistory(userRegistrations);
  //   } catch (err) {
  //     console.error('Failed to fetch registration history:', err.message);
  //   }
  // };
  
  
  // const fetchOrganizedEvents = async (organizerId) => {
  //   try {
  //     const res = await axios.get(`http://localhost:5000/api/events?organizer=${organizerId}`);
  //     setOrganizedEvents(res.data);
  //   } catch (err) {
  //     console.error('Failed to fetch organized events:', err.message);
  //   }
  // };

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
        <div className="relative z-10 w-full max-w-lg md:max-w-md p-8 space-y-4 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-white mb-6">Your Details</h2>
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

        {/* <div className="mt-8 relative z-10 w-full max-w-5xl p-8 space-y-4 bg-gray-800 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-center text-white mb-4">
            {user.role === 'player' ? 'Your Upcoming Events' : 'Your Organized Events'}
          </h3>
          {user.role === 'player' ? (
            registrationHistory.length > 0 ? (
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {registrationHistory.map((registration) => (
                  <div key={registration._id} className="bg-gray-700 p-4 rounded-lg shadow-lg">
                    <p className="text-lg font-medium text-gray-300">Event: {registration.event.name}</p>
                    <p className="text-lg text-gray-300">Date: {new Date(registration.event.date).toLocaleDateString()}</p>
                    <p className="text-lg text-gray-300">Team Name: {registration.teamName}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-lg text-center text-gray-300">No registrations found.</p>
            )
          ) : (
            organizedEvents.length > 0 ? (
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {organizedEvents.map((event) => (
                  <div key={event._id} className="bg-gray-700 p-4 rounded-lg shadow-lg">
                    <p className="text-lg font-medium text-gray-300">Event: {event.name}</p>
                    <p className="text-lg text-gray-300">Date: {new Date(event.date).toLocaleDateString()}</p>
                    <p className="text-lg text-gray-300">Description: {event.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-lg text-center text-gray-300">No organized events found.</p>
            )
          )}
        </div> */}
      </div>
    </>
  );
};

export default Profile;
