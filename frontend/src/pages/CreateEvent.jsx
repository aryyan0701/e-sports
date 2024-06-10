import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import DashNavbar from '../components/DashNavbar';
import { FiExternalLink } from "react-icons/fi";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    contact: '',
  });
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const [isOrganizer, setIsOrganizer] = useState(false);
  const navigate = useNavigate();

  const { name, description, date, contact } = formData;

  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        setUser(parsedUserData);
        setIsOrganizer(parsedUserData.role === 'organizer');
      } catch (error) {
        console.error('Failed to parse user data:', error);
      }
    }
  }, []);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isOrganizer) {
      setMessage('Only organizers can create events.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/events/create', formData);
      console.log(res.data);
      setMessage('Event created successfully! Redirecting to event list...');
      setFormData({
        name: '',
        description: '',
        date: '',
        contact: '',
      });
      setTimeout(() => {
        navigate('/eventlist');
      }, 2000);
    } catch (err) {
      console.error(err.response.data);
      setMessage('Event creation failed. Please try again.');
    }
  };

  return (
    <>
      <DashNavbar />
      <div className="relative flex justify-center items-center min-h-screen bg-cover bg-center pt-10" style={{ backgroundImage: "url('https://weezevent.com/wp-content/uploads/2018/10/15140712/compet_esport.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 w-full max-w-lg md:max-w-md p-8 space-y-4 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-white">Create Event</h2>
          {isOrganizer ? (
            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Event Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={onChange}
                  required
                  placeholder="Enter event name"
                  className="w-full px-4 py-2 mt-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
                <textarea
                  name="description"
                  value={description}
                  onChange={onChange}
                  required
                  placeholder="Enter event description"
                  className="w-full px-4 py-2 mt-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-300">Date</label>
                <input
                  type="date"
                  name="date"
                  value={date}
                  onChange={onChange}
                  required
                  className="w-full px-4 py-2 mt-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-300">Organizer Contact</label>
                <input
                  type="text"
                  name="contact"
                  value={contact}
                  onChange={onChange}
                  required
                  placeholder="Enter organizer contact"
                  className="w-full px-4 py-2 mt-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              >
                Create Event
              </button>
            </form>
          ) : (
            <div>
              <p className="mt-4 text-center text-sm text-gray-400">Only organizers can create events.</p>
              <p className="mt-4 text-center text-xl font-semibold text-gray-400"><Link to="/eventlist">Visit Events Here<FiExternalLink className='text-center inline ml-2'/></Link></p>
            </div>
          )}
          {message && <p className="mt-4 text-center text-sm text-gray-400">{message}</p>}
        </div>
      </div>
    </>
  );
};

export default CreateEvent;
