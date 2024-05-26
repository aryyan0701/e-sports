import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'player',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const { username, email, password, role } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/users/register', formData);
      console.log(res.data);
      setMessage('Registration successful! Redirecting to login page...');
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirect after 2 seconds
    } catch (err) {
      console.error(err.response.data);
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <>
    <Navbar/>
  <div className="relative flex justify-center items-center min-h-screen bg-cover bg-center pt-10" style={{ backgroundImage: "url('https://images4.alphacoders.com/132/1320095.jpeg')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Optional: For better readability */}
      <div className="relative z-10 w-full max-w-lg md:max-w-md p-8 space-y-4 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white">Register</h2>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300">Username</label>
            <input 
              type="text" 
              name="username" 
              value={username} 
              onChange={onChange} 
              required 
              placeholder="Enter your username" 
              className="w-full px-4 py-2 mt-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
            <input 
              type="email" 
              name="email" 
              value={email} 
              onChange={onChange} 
              required 
              placeholder="Enter your email" 
              className="w-full px-4 py-2 mt-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <input 
              type="password" 
              name="password" 
              value={password} 
              onChange={onChange} 
              required 
              placeholder="Enter your password" 
              className="w-full px-4 py-2 mt-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-300">Role</label>
            <select 
              name="role" 
              value={role} 
              onChange={onChange} 
              className="w-full px-4 py-2 mt-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="player">Player</option>
              <option value="organizer">Organizer</option>
            </select>
          </div>
          <button 
            type="submit" 
            className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Register
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm text-gray-400">{message}</p>}
      </div>
    </div>    
    </>

  );
};

export default Register;