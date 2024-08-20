import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleDemoLogin = () => {
    if (location.pathname === '/login') {
      // Custom event for demo login
      const event = new CustomEvent('demoLogin', {
        detail: { email: 'user@gmail.com', password: 'user1234' }
      });
      window.dispatchEvent(event);
    } else {
      navigate('/login', { state: { email: 'user@gmail.com', password: 'user1234' } });
    }
  };

  return (
    <nav className="bg-indigo-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold md: text-2xl md:text-3xl"><a href="/">Battelfy</a></div>


        {/* Navigation Links */}
        <div className='lg:flex space-x-4 gap-x-5'>
          <button onClick={handleDemoLogin} className="text-white  text-xl md:text-2xl hover:text-gray-300 font-semibold">Use Demo</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
