import React from 'react';
import DashNavbar from '../components/DashNavbar';
import TypingAnimation from '../components/TypingAnimation';
import GameSlider from '../components/GameSlider';
import { Link } from 'react-router-dom';

function DashBoard() {
  const words = ["Welcome to Battelfy", "Where Gamers Unite and Compete", "Elevate Your e-Sports Experience", "Empowering e-Sports Heroes"];
  return (
    <>
      <DashNavbar />
      <div className="relative flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://i.pinimg.com/originals/7d/2a/9f/7d2a9fca264faa93561f72b5fc885fec.gif')" }}>
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="text-4xl text-white font-bold text-center">
            <TypingAnimation words={words} /> 
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
      </div>
    </>
  );
}

export default DashBoard;