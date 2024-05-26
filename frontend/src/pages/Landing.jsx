import React from 'react';
import { Link } from 'react-router-dom';
import GameSlider from '../components/GameSlider';

const Landing = () => {
  return (
    <div className="bg-gray-300 min-h-screen">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Welcome to E-Sports Dashboard</h1>
        
        {/* About the app */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">About Our App</h2>
          <p className="text-gray-700">
            Our platform provides a comprehensive solution for e-sports players and organizations.
            Whether you're a player looking to join tournaments or an organization managing events,
            we have the tools you need to succeed.
          </p>
        </div>

        {/* Features of the app */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Upcoming Events */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
            <p className="text-gray-700 mb-4">
              Stay updated with the latest tournaments and events in the e-sports world.
            </p>
          </div>

          {/* Registration */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Registration</h2>
            <p className="text-gray-700 mb-4">
              Easy registration process for players and organizations to get started.
            </p>
          </div>

          {/* Connect with Players */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Connect with Players</h2>
            <p className="text-gray-700 mb-4">
              Network and connect with other players to form teams and enhance your gaming experience.
            </p>
          </div>

          {/* Benefits for Organizing Companies */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Benefits for Organizing Companies</h2>
            <p className="text-gray-700 mb-4">
              Gain exposure and access to a larger audience by organizing e-sports events on our platform.
            </p>
          </div>
        </div>


        {/* User options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Option 1: E-Sports Player */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Are you an e-sports player?</h2>
            <p className="text-gray-700 mb-4">Join tournaments, connect with other players, and showcase your skills!</p>
            <Link to="/register" className="block w-full text-center bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">Register</Link>
          </div>

          {/* Option 2: Organization */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Are you an organization?</h2>
            <p className="text-gray-700 mb-4">Host tournaments, manage events, and build your e-sports community!</p>
            <Link to="/register" className="block w-full text-center bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">Register</Link>
          </div>
        </div>

        {/* Additional images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src="https://hpro-web-assets.s3.amazonaws.com/insights/uploads/2020/08/HARMAN_Esports-Arena_horiz.jpg" alt="Image 1" className="w-full h-auto rounded-md" />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src="https://hpro-web-assets.s3.amazonaws.com/insights/uploads/2020/08/HARMAN_Esports-Arena_horiz.jpg" alt="Image 2" className="w-full h-auto rounded-md" />
          </div>
        </div>
      </div>

        {/* Slider */}
        <div className="container mx-auto p-8 mb-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Featured E-Sport Games</h2>
        <GameSlider />
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">E-Sports Dashboard</h3>
              <p className="mt-2">Your go-to platform for all things e-sports!</p>
            </div>
            <div>
              <ul className="flex space-x-4">
                <li><Link to="/about" className="hover:text-gray-300">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
                <li><Link to="/terms" className="hover:text-gray-300">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
