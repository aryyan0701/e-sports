import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { BsFillCalendar2DateFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { RiContactsFill } from "react-icons/ri";
import { GiTrophyCup } from "react-icons/gi";
import { IoCloseCircleOutline } from "react-icons/io5";
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
      <DashNavbar />
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Event List</h2>
          {status === "loading" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-200 justify-between gap-8">
              <div className="skeleton bg-gray-800 h-[20rem] w-full"></div>
              <div className="skeleton bg-gray-800 h-[20rem] w-full"></div>
              <div className="skeleton bg-gray-800 h-[20rem] w-full"></div>
              <div className="skeleton bg-gray-800 h-[20rem] w-full"></div>
              <div className="skeleton bg-gray-800 h-[20rem] w-full"></div>
              <div className="skeleton bg-gray-800 h-[20rem] w-full"></div>
              <div className="skeleton bg-gray-800 h-[20rem] w-full"></div>
              <div className="skeleton bg-gray-800 h-[20rem] w-full"></div>
              <div className="skeleton bg-gray-800 h-[20rem] w-full"></div>
            </div>
          ) : (
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="relative bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform  rounded-lg overflow-hidden"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-blue-600 mb-6">
                      {event.name ? event.name.toUpperCase() : "Unnamed Event"}
                    </h3>
                    <p className="text-gray-700 mb-2 flex items-center">
                      <BsFillCalendar2DateFill className="w-5 h-5 text-blue-500 mr-2" />
                      <strong>Date:</strong>{" "}
                      <span className="ml-2">
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                    </p>
                    <p className="text-gray-700 mb-2 flex items-center">
                      <FaLocationDot className="w-5 h-5 text-blue-500 mr-2" />
                      <strong>Venue:</strong>{" "}
                      <span className="ml-2">{event.venue}</span>
                    </p>
                    <p className="text-gray-700 mb-2 flex items-center">
                      <RiContactsFill className="w-5 h-5 text-blue-500 mr-2" />
                      <strong>Contact:</strong>{" "}
                      <span className="ml-2">{event.contact}</span>
                    </p>
                    <p className="text-gray-700 mb-2 flex items-center">
                      <GiTrophyCup className="w-5 h-5 text-blue-500 mr-2" />
                      <strong>Prizepool:</strong>{" "}
                      <span className="ml-2">{event.prizepool}</span>
                    </p>
                    <p className="text-gray-600 mb-6">
                      <strong>Description:</strong> {event.description}
                    </p>
                    {role !== "organizer" && (
                      <button
                        className="text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-300 ease-in-out font-semibold text-lg py-2 px-4 rounded-xl focus:outline-none shadow-md"
                        onClick={() => openModal(event)}
                      >
                        Register
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Register"
            className={`modal ${modalIsOpen ? "modal-open" : "modal-close"}`}
            overlayClassName="overlay"
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-700 mb-4">
              <h2 className="text-2xl font-bold text-blue-400">
                Register for {selectedEvent?.name}
              </h2>
              <button onClick={closeModal} className="close-button absolute top-4 right-4">
                <IoCloseCircleOutline/>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="mb-4 mt-2">
                  <label
                    className="block text-gray-200 text-md font-bold mb-2"
                    htmlFor="email"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="shadow appearance-none border border-gray-600 rounded-lg w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    required
                  />
                </div>
                <div className="mb-4 mt-2">
                  <label
                    className="block text-gray-200 text-md font-bold mb-2"
                    htmlFor="contactNumber"
                  >
                    Contact Number
                  </label>
                  <input
                    type="text"
                    id="contactNumber"
                    name="contactNumber"
                    className="shadow appearance-none border border-gray-600 rounded-lg w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder="Enter Number"
                    required
                  />
                </div>
                <div className="mb-4 mt-2">
                  <label
                    className="block text-gray-200 text-md font-bold mb-2"
                    htmlFor="teamName"
                  >
                    Team Name
                  </label>
                  <input
                    type="text"
                    id="teamName"
                    name="teamName"
                    className="shadow appearance-none border border-gray-600 rounded-lg w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.teamName}
                    onChange={handleChange}
                    placeholder="Enter Team Name"
                    required
                  />
                </div>
                <div className="mb-4 mt-2">
                  <label
                    className="block text-gray-200 text-md font-bold mb-2"
                    htmlFor="teamMemberCount"
                  >
                    Team Member Count
                  </label>
                  <input
                    type="text"
                    id="teamMemberCount"
                    name="teamMemberCount"
                    className="shadow appearance-none border border-gray-600 rounded-lg w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.teamMemberCount}
                    onChange={handleChange}
                    placeholder="Enter Member Count"
                    required
                  />
                </div>
                <div className="mb-4 mt-2">
                  <label
                    className="block text-gray-200 text-md font-bold mb-2"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <textarea
                    type="text"
                    id="address"
                    name="address"
                    className="shadow appearance-none border border-gray-600 rounded-lg w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter Address"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-300 ease-in-out text-lg w-full py-3 rounded-lg font-semibold focus:outline-none focus:ring-4 focus:ring-blue-300 mt-4"
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
