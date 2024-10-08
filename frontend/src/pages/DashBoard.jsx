import React from 'react';
import DashNavbar from '../components/DashNavbar';
import TypingAnimation from '../components/TypingAnimation';
import GameSlider from '../components/GameSlider';
import { Link } from 'react-router-dom';
import { FaPlusSquare } from "react-icons/fa";;
import { RiTeamFill } from "react-icons/ri";
import { FaNewspaper } from "react-icons/fa6";
import ScrollToTop from '../components/ScrollToTop';
import Footer from '../components/Footer';


function DashBoard() {
  const words = ["Welcome to Battelfy", "Where Gamers Unite and Compete", "Elevate Your E-Sports Experience", "Empowering e-Sports Heroes"];
  return (
    <>
      <DashNavbar />
      <ScrollToTop/>
      <div className="relative flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://i.pinimg.com/originals/7d/2a/9f/7d2a9fca264faa93561f72b5fc885fec.gif')" }}>
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="text-3xl md:text-4xl text-white font-bold text-center p-6">
            <TypingAnimation words={words} /> 
          </div>
        </div>
      </div>
      
      {/* Additional Content */}
      <div className="container mx-auto px-4 py-10">
          {/* Additional images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src="https://i.ytimg.com/vi/4xkZaXCHYCw/maxresdefault.jpg" alt="Image 1" className="w-full h-60 rounded-md" />
             <div className="bg-gray-300 shadow-lg rounded-lg p-4 flex items-center justify-center mt-5">
            <button className="text-indigo-600 font-semibold text-lg hover:text-indigo-800 focus:outline-none">
             <Link to="/eventlist">Register for Event <RiTeamFill  className='text-2xl text-black text-center inline pb-1'/> </Link>
            </button>
          </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a6eb3868395361.5b5b27978a636.jpg" alt="Image 2" className="w-full h-60 rounded-md" />
              {/* Event Creation Button */}
          <div className="bg-gray-300 shadow-lg rounded-lg p-4 flex items-center justify-center mt-5">
            <button className="text-indigo-600 font-semibold text-lg hover:text-indigo-800 focus:outline-none">
              <Link to="/create-event">Create Event <FaPlusSquare className='text-2xl text-black text-center inline pb-1'/></Link>
            </button>
          </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src="https://cdn.dribbble.com/users/201299/screenshots/3251687/esports_news_dribbble.png" alt="Image 2" className="w-full h-60 rounded-md " />
              {/* Event Creation Button */}
          <div className="bg-gray-300 shadow-lg rounded-lg p-4 flex items-center justify-center mt-5">
            <button className="text-indigo-600 font-semibold text-lg hover:text-indigo-800 focus:outline-none">
              <Link to="/news">Latest News <FaNewspaper className='text-2xl text-black text-center inline pb-1'/></Link>
            </button>
          </div>
          </div>
        </div>
      

          {/* Slider */}
      <div className="container mx-auto p-8 mb-10">
        <h2 className="text-2xl font-bold text-center text-gray-200 mb-8">Choose Your Game</h2>
        <GameSlider />
      </div>
      </div>
      {/* Footer */}
      <Footer/>
    </>
  );
}

export default DashBoard;