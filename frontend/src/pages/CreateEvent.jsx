import React, { useState } from 'react';
import axios from 'axios';
import DashNavbar from '../components/DashNavbar';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    contact: '',
  });
  const [message, setMessage] = useState('');

  const { name, description, date, contact } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/events/create', formData);
      console.log(res.data);
      setMessage('Event created successfully!');
      setFormData({
        name: '',
        description: '',
        date: '',
        contact: '',
      });
    } catch (err) {
      console.error(err.response.data);
      setMessage('Event creation failed. Please try again.');
    }
  };

  return (
    <>
      <DashNavbar />
      <div className="relative flex justify-center items-center min-h-screen bg-cover bg-center pt-10" style={{ backgroundImage: "url('https://images4.alphacoders.com/132/1320095.jpeg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Optional: For better readability */}
        <div className="relative z-10 w-full max-w-lg md:max-w-md p-8 space-y-4 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-white">Create Event</h2>
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
          {message && <p className="mt-4 text-center text-sm text-gray-400">{message}</p>}
        </div>
      </div>
    </>
  );
};

export default CreateEvent;
