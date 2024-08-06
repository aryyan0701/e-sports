import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { FaTrash } from "react-icons/fa";
import { checkUser } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth/authSlice";
import { getEvents, regiForEvent } from "../redux/event/eventApi";
import DashNavbar from "../components/DashNavbar";

Modal.setAppElement("#root");

const EventList = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    contactNumber: "",
    teamName: "",
    teamMemberCount: "",
    address: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const events = useSelector((state) => state.event.events);
  const status = useSelector((state) => state.event.status);
  const error = useSelector((state) => state.event.error);

  const { role } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(checkUser("User data not found"));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1000);

    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(regiForEvent({ eventId: selectedEvent._id, formData }))
    .unwrap()
    .then(() => {
      alert("Registration successful!");
      closeModal();
      navigate("/dashboard");
    })
    .catch((err) => {
      console.error("Registration failed:", err);
      alert("Registration failed. Please try again.");
    });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <DashNavbar/>
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Event List</h2>
          {status === "loading" ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-200 justify-between gap-8">
                 <div className="skeleton h-32 w-full"></div>
                 <div className="skeleton h-32 w-full"></div>
                 <div className="skeleton h-32 w-full"></div>
                 <div className="skeleton h-32 w-full"></div>
                 <div className="skeleton h-32 w-full"></div>
                 <div className="skeleton h-32 w-full"></div>
                 <div className="skeleton h-32 w-full"></div>
                 <div className="skeleton h-32 w-full"></div>
                 <div className="skeleton h-32 w-full"></div>
                 </div>
          ):(
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event._id}
                className="relative bg-white shadow-md rounded-lg p-6"
              >
                {role === "organizer" && (
                  <button
                    className="absolute top-3 right-4 text-red-500 hover:text-red-700"
                    // onClick={() => handleDelete(event._id)}
                  >
                    <FaTrash size={20} />
                  </button>
                )}
                <h3 className="text-xl font-bold mb-2">
                  {event.name ? event.name.toUpperCase() : "Unnamed Event"}
                </h3>
                <p className="text-gray-500 mb-2">
                  <strong>Date:</strong>{" "}
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-gray-500 mb-2">
                  <strong>Venue:</strong> {event.venue}
                </p>
                <p className="text-gray-500 mb-2">
                  <strong>Contact:</strong> {event.contact}
                </p>
                <p className="text-gray-500 mb-2">
                  <strong>Prizepool:</strong> {event.prizepool}
                </p>
                <p className="text-gray-500 mb-4">
                  <strong>Description:</strong> {event.description}
                </p>
                {role !== "organizer" && (
                  <button
                    className="text-black font-semibold text-lg bg-gray-300 p-2 rounded focus:outline-none"
                    onClick={() => openModal(event)}
                  >
                    Register
                  </button>
                )}
              </div>
            ))}
          </div>
          )}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Register"
            className="modal"
            overlayClassName="overlay"
          >
            <div className="flex justify-between items-center p-4 border border-t-0 border-r-0 border-l-0 border-b-4 border-b-black">
              <h2 className="text-2xl font-bold">
                Register for {selectedEvent?.name}
              </h2>
              <button onClick={closeModal} className="close-button">
                Close
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="mb-4 mt-5">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    required
                  />
                </div>
                <div className="mb-4 mt-5">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="contactNumber"
                  >
                    Contact Number
                  </label>
                  <input
                    type="text"
                    id="contactNumber"
                    name="contactNumber"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder="Enter Number"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="teamName"
                  >
                    Team Name
                  </label>
                  <input
                    type="text"
                    id="teamName"
                    name="teamName"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formData.teamName}
                    placeholder="Enter Team Name"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="teamMemberCount"
                  >
                    Team Member Count
                  </label>
                  <input
                    type="number"
                    id="teamMemberCount"
                    name="teamMemberCount"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formData.teamMemberCount}
                    placeholder="Enter Team Members Count"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="sm:col-span-2 mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    rows="3"
                    value={formData.address}
                    placeholder="Enter Address"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-gray-300 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default EventList;
