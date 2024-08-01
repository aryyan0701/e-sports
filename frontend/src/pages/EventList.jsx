import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { FaTrash } from "react-icons/fa";
import { checkUser } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth/authSlice";
import { getEvents, regiForEvent } from "../redux/event/eventApi";

Modal.setAppElement("#root");

const EventList = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
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

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-3xl">
            <a href="/">Battelfy</a>
          </div>
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
          <div className={`lg:flex ${isOpen ? "block" : "hidden"} gap-x-4`}>
            <Link
              to="/dashboard"
              className="text-white text-2xl hover:text-gray-300"
            >
              Dash
            </Link>
            <button
              onClick={handleLogout}
              className="text-white text-2xl hover:text-gray-300"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Event List</h2>
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
                  {event.name.toUpperCase()}
                </h3>
                <p className="text-gray-500 mb-2">
                  <strong>Date:</strong>{" "}
                  {new Date(event.date).toLocaleDateString()}
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
                    htmlFor="address"
                    className="text-gray-700 text-sm font-bold mb-2"
                  >
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address} // Use formData.address here
                    onChange={handleChange} // Use the handleChange function to update the state
                    placeholder="Address"
                    className="w-full px-4 py-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded"
                    required
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Register
              </button>
            </form>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default EventList;
