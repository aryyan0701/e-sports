import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ClipLoader } from 'react-spinners'; 

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
  
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', formData);
      sessionStorage.setItem('token', res.data.token);
      sessionStorage.setItem('user', JSON.stringify(res.data.user));
      console.log('Token set in localStorage:', sessionStorage.getItem('token'));
console.log('User data in localStorage:', JSON.parse(sessionStorage.getItem('user')));
      setMessage('Login successful! Redirecting...');
      setTimeout(() => {
        navigate('/dashboard'); // Redirect to a dashboard or home page after login
      }, 2000); // Redirect after 2 seconds
    } catch (err) {
      console.error(err.response.data);
      setMessage('Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  
  return (
    <>
      <Navbar />
      <div className="relative flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images7.alphacoders.com/132/1320094.jpeg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Optional: For better readability */}
        <div className="relative z-10 w-full max-w-md p-8 space-y-4 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-white">Login</h2>
          <form onSubmit={onSubmit} className="space-y-6">
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
            <button 
              type="submit" 
              className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? (
                <ClipLoader size={20} color={"#fff"} /> // Show spinner while loading
              ) : (
                "Login"
              )}
            </button>
          <p className="text-sm text-center">Don't have an account..? <Link to='/register' className="font-semibold text-white">Click Here</Link></p>
          </form>
          {message && <p className="mt-4 text-center text-sm text-gray-400">{message}</p>}
        </div>
      </div>
    </>
  );
};

export default Login;
