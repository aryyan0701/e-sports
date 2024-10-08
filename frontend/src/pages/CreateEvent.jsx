import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import DashNavbar from '../components/DashNavbar';
import { FiExternalLink } from 'react-icons/fi';
import { createEvent } from '../redux/event/eventApi';
import { clearMessage } from '../redux/event/eventSlice';
import { checkUser } from "../redux/user/userSlice";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    venue: '',
    contact: '',
    prizepool: ''
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { name, description, date, venue, contact, prizepool } = formData;
  const { role, user } = useSelector((state) => state.user);
  const eventStatus = useSelector((state) => state.event.status);
  const eventError = useSelector((state) => state.event.error);
  const eventMessage = useSelector((state) => state.event.message);

  useEffect(() => {
    dispatch(checkUser('User data not found'));
  }, [dispatch]);

  useEffect(() => {
    if (eventMessage) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 3000); 
      return () => clearTimeout(timer); 
    }
  }, [eventMessage, dispatch]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (role !== "organizer") {
      dispatch(clearMessage());
      dispatch({ type: 'event/setMessage', payload: 'Only organizers can create events.' });
      return;
    }
    const eventData = { ...formData, userEmail: user.email };
    const resultAction = await dispatch(createEvent(eventData));
    if (createEvent.fulfilled.match(resultAction)) {
      setFormData({
        name: '',
        description: '',
        venue: '',
        date: '',
        contact: '',
        prizepool: ''
      });
      toast.success("Event created successfully");
      setTimeout(() =>{
        navigate('/eventlist')
      }, 2000)
    }else{
      toast.error("Error creating the event");
    }
  };

  return (
    <>
      <DashNavbar />
      <div
        className="relative flex justify-center items-center min-h-screen bg-cover bg-center pt-10 pb-10"
        style={{
          backgroundImage: "url('https://weezevent.com/wp-content/uploads/2018/10/15140712/compet_esport.jpg')"
        }}
      >
        <Toaster />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 w-full max-w-sm md:max-w-md p-8 space-y-4 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-white">Create Event</h2>
          {role === "organizer" ? (
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
                <label htmlFor="venue" className="block text-sm font-medium text-gray-300">Venue</label>
                <input
                  name="venue"
                  value={venue}
                  onChange={onChange}
                  placeholder='Enter the venue'
                  required
                  className="w-full px-4 py-2 mt-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-300">Organizer Contact</label>
                <input
                  type="text"
                  name="contact"
                  value={contact}
                  onChange={onChange}
                  required
                  placeholder="Enter contact"
                  className="w-full px-4 py-2 mt-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="prizepool" className="block text-sm font-medium text-gray-300">Prizepool</label>
                <input
                  type="text"
                  name="prizepool"
                  value={prizepool}
                  onChange={onChange}
                  required
                  placeholder="Enter prizepool"
                  className="w-full px-4 py-2 mt-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
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
              <button
                type="submit"
                className="w-full py-2 mt-4 font-semibold text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Event
              </button>
            </form>
          ) : (
            <div className="text-center">
              <p className="text-sm text-gray-400">You cannot create an event. Please visit the event list page for more information.</p>
              <Link to="/eventlist" className="mt-4 inline-block text-center text-indigo-400 hover:underline">
                Go to Event List <FiExternalLink className="inline" />
              </Link>
            </div>
          )}
          {eventStatus === 'loading' && (
            <p className="mt-4 text-center text-sm text-gray-400">Loading...</p>
          )}
          {eventError && (
            <p className="mt-4 text-center text-sm text-red-400">{eventError}</p>
          )}
          {eventMessage && (
            <p className="mt-4 text-center text-sm text-green-400">{eventMessage}</p>
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default CreateEvent;
