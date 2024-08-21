import React from 'react';
import { Link } from 'react-router-dom';
import GameSlider from '../components/GameSlider';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <>
    <Navbar/>
    <ScrollToTop/>
    <div className="bg-gray-300 min-h-screen">
      {/* Hero section */}
      <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://t4.ftcdn.net/jpg/05/63/31/87/360_F_563318702_OMWeOJ39uEeb76lulVtLTm80zwsbWYGd.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-4">Welcome to Battelfy</h1>
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-center max-w-sm md:max-w-xl">Ultimate platform for everything e-sports. Connect, compete, and thrive!</p>
          <Link to="/register" className="px-6 py-3 bg-indigo-600 rounded-xl text-lg md:text-xl hover:bg-indigo-700">Get Started</Link>
        </div>
      </div>

      {/* Features of the app */}
      <div className="container mx-auto p-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Upcoming Events */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl text-blue-600 font-semibold mb-4">Upcoming Events</h3>
            <p className="text-gray-700 mb-4">
              Stay updated with the latest tournaments and events in the e-sports world.
            </p>
          </div>

          {/* Registration */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl text-blue-600 font-semibold mb-4">Registration</h3>
            <p className="text-gray-700 mb-4">
              Easy registration process for players and organizations to get started.
            </p>
          </div>

          {/* Connect with Players */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl text-blue-600 font-semibold mb-4">Connect with Players</h3>
            <p className="text-gray-700 mb-4">
              Network and connect with other players to form teams and enhance your gaming experience.
            </p>
          </div>

          {/* Benefits for Organizing Companies */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl text-blue-600 font-semibold mb-4">Benefits for Organizing Companies</h3>
            <p className="text-gray-700 mb-4">
              Gain exposure and access to a larger audience by organizing e-sports events on our platform.
            </p>
          </div>
        </div>

        {/* User options */}
        <div className="grid grid-rows gap-6 mb-8 bg-white p-6 rounded-lg shadow-md">
          {/* Option 1: E-Sports Player */}
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl text-blue-600 font-bold mb-4">Are you an e-sports player?</h2>
              <p className="text-gray-700 mb-4">Join tournaments, connect with other players, and showcase your skills!</p>
              <p className="text-gray-700 mb-4">Stay updated with the latest tournaments and competitions tailored for your favorite games.</p>
              <p className="text-gray-700 mb-4">Create your profile and register for events with ease, all in one place.</p>
              <p className="text-gray-700 mb-4">Build your network by connecting with other players and forming teams.</p>
              <p className="text-gray-700 mb-4">Participate in events to demonstrate your prowess and climb the leaderboards.</p>
              <p className="text-gray-700 mb-4">Compete for exciting prizes and gain recognition in the e-sports community.</p>
            </div>
            <div className="img-fluid">
              <img src="https://www.spized.com/media/82/0c/79/1666019382/esportler-werden.jpg" alt="" className="w-full h-auto rounded-md" />
            </div>
          </div>
          <Link to="/register" className="block w-full text-center text-xl bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">Register Yourself</Link>
          {/* Option 2: Organization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4 mt-20">
            <div className="img-fluid">
              <img src="https://esportsresults.com/wp-content/uploads/2023/01/tournament-organizers.jpg" alt="" className="w-full h-auto rounded-md" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl text-blue-600 font-bold mb-4">Are you an organization?</h2>
              <p className="text-gray-700 mb-4">Host tournaments, manage events, and build your e-sports community!</p>
              <p className="text-gray-700 mb-4">Connect with skilled players looking for opportunities to compete and showcase their talents.</p>
              <p className="text-gray-700 mb-4">Gain visibility and attract participants from a global community of e-sport enthusiasts.</p>
              <p className="text-gray-700 mb-4">Simplify event registration and participant management with our user-friendly tools.</p>
              <p className="text-gray-700 mb-4">Foster engagement and build a loyal following through interactive features and communication channels.</p>
              <p className="text-gray-700 mb-4">Utilize our analytics tools to gain insights into event performance and participant demographics.</p>
            </div>
          </div>
          <Link to="/register" className="block w-full text-center text-xl bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">Register Yourself</Link>
        </div>

        {/* Additional images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src="https://hpro-web-assets.s3.amazonaws.com/insights/uploads/2020/08/HARMAN_Esports-Arena_horiz.jpg" alt="Image 1" className="w-full h-auto rounded-md" />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src="https://senet-cloud.s3.eu-central-1.amazonaws.com/assets/images/6064a58040229/hyperx_esports_arena_las_vegas.jpg" alt="Image 2" className="w-full h-auto rounded-md" />
          </div>
        </div>
        
        {/* About the app */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl text-blue-600 font-semibold mb-4">About Our App</h2>
          <p className="text-gray-700">
            Our platform provides a comprehensive solution for e-sports players and organizations.
            Whether you're a player looking to join tournaments or an organization managing events,
            we have the tools you need to succeed.
          </p>
        </div>

        {/* Slider */}
        <div className="container mx-auto p-8 mb-10">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Featured E-Sport Games</h2>
          <GameSlider />
        </div>
      </div>
          {/* Footer */}
          <Footer/>
    </div>  
    </>
  
  );
};

export default Landing;
