import React from 'react';
import DashNavbar from '../components/DashNavbar';
import TypingAnimation from '../components/TypingAnimation';
import GameSlider from '../components/GameSlider';
import { Link } from 'react-router-dom';

function DashBoard() {
  const words = ["dynamic", "interactive", "amazing", "incredible"];
  return (
    <>
      <DashNavbar />
      <div className="relative flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://displays.riotgames.com/static/content-original-runeterra-mounttargon-29f374929568be3073201d2512af6731.jpg')" }}>
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="text-4xl text-white font-bold text-center">
            Welcome to Your <TypingAnimation words={words} /> Dashboard
          </div>
        </div>
      </div>
      
      {/* Slider */}
      <div className="container mx-auto p-8 mb-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Choose Your Game</h2>
        <GameSlider />
      </div>
      
      {/* Additional Content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Registration Button */}
          <div className="bg-white shadow-lg rounded-lg p-4 flex items-center justify-center">
            <button className="text-indigo-600 font-semibold text-lg hover:text-indigo-800 focus:outline-none">
             <Link to="/eventlist">Register for Event</Link>
            </button>
          </div>
          
          {/* Event Creation Button */}
          <div className="bg-white shadow-lg rounded-lg p-4 flex items-center justify-center">
            <button className="text-indigo-600 font-semibold text-lg hover:text-indigo-800 focus:outline-none">
              <Link to="/create-event">Create Event</Link>
            </button>
          </div>
          
          {/* More Features */}
          <div className="bg-white shadow-lg rounded-lg p-4 flex items-center justify-center">
            <button className="text-indigo-600 font-semibold text-lg hover:text-indigo-800 focus:outline-none">
              More Features
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
