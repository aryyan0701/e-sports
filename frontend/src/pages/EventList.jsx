import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Modal from "react-modal";

Modal.setAppElement("#root");

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

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
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events');
        setEvents(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching events:', err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <>
      {/* <DashNavbar /> */}
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
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Event List</h2>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {events.map(event => (
              <div key={event._id} className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">{event.name}</h3>
                <p className="text-gray-700 mb-4">{event.description}</p>
                <p className="text-gray-500 mb-2"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p className="text-gray-500 mb-4"><strong>Contact:</strong> {event.contact}</p>
                <button className="text-indigo-600 font-semibold text-lg bg-black p-2 rounded hover:text-indigo-800 focus:outline-none" onClick={openModal}>
               Register
            </button>
              </div>
            ))}
          </div>
          <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Source Code Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Register Yourself</h2>
          <button onClick={closeModal} className="close-button">
            Close
          </button>
        </div>
      </Modal>
        </div>
      </div>
    </>
  );
};

export default EventList;
