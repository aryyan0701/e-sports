import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth/authSlice";
import { checkUser } from "../redux/user/userSlice";
import { fetchUserEvents } from "../redux/user/userApi";
import DashNavbar from "../components/DashNavbar";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, role, status, error, createdEvents, registeredEvents } =
    useSelector((state) => state.user);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    dispatch(checkUser("User data not found"));
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(
        fetchUserEvents({ userId: user.id, role: user.role, email: user.email })
      );
    }
  }, [dispatch, user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1000);

    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        User not found
      </div>
    );
  }

  return (
    <>
      <DashNavbar />
      {status === "loading" ? (
        <div className="flex justify-center items-center min-h-screen bg-gray-200">
          <div className="flex w-[40rem] flex-col gap-4">
            <div className="skeleton h-[25rem] w-full bg-gray-500 rounded-md animate-pulse"></div>
            <div className="skeleton h-4 w-28 bg-gray-500 rounded-md animate-pulse"></div>
            <div className="skeleton h-4 w-full bg-gray-500 rounded-md animate-pulse"></div>
            <div className="skeleton h-4 w-full bg-gray-500 rounded-md animate-pulse"></div>
          </div>
        </div>
      ) : (
          <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                 {/* user details */}
          <div className="relative z-10 w-full max-w-md md:max-w-sm p-14 space-y-4 bg-gray-800 rounded-lg shadow-lg">
            {/* <h2 className="text-3xl font-bold text-center text-white mb-6">
              Your Details
            </h2> */}
            <div className="flex flex-col items-center space-t-20">
              {user.profileImage && (
                <div className="text-center">
                  <img
                    src={`http://localhost:5000${user.profileImage}`}
                    alt="Profile"
                    className="w-30 h-26 rounded-full"
                  />
                </div>
              )}
              <div className="text-start grid grid-cols-2 gap-2 py-10">
                <div>
                  <p className="text-lg font-medium text-gray-300">Name</p>
                  <p className="text-lg font-medium text-gray-300 mt-2">
                    Email
                  </p>
                  <p className="text-lg font-medium text-gray-300 mt-2">
                    Number
                  </p>
                  <p className="text-lg font-medium text-gray-300 mt-2">
                    Role
                  </p>
                  <p className="text-lg font-medium text-gray-300 mt-2">Bio</p>
                </div>
                <div>
                  <p className="text-lg text-white">{user.name}</p>
                  <p className="text-lg text-white mt-2">{user.email}</p>
                  <p className="text-lg text-white mt-2">{user.phoneNumber}</p>
                  <p className="text-lg text-white mt-2">{user.role}</p>
                  <p className="text-lg text-white mt-2">{user.bio}</p>
                </div>
              </div>
            </div>
          </div>
              <div>
                 {/* events details */}
          <div className="relative z-10 w-full max-w-lg md:max-w-4xl p-14 space-y-4 bg-gray-800 rounded-lg shadow-lg">
            {role === "organizer" ? (
              <>
                <h2 className="text-3xl font-bold text-center text-base-600 mb-6">
                Created Events
                </h2>
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {createdEvents.length > 0 ? (
                    createdEvents.map((event) => (
                      <div
                        key={event._id}
                        className="bg-gray-700 p-6 rounded-lg shadow-lg"
                      >
                        <h3 className="text-lg font-bold text-white mb-4">
                          {event.name.toUpperCase()}
                        </h3>
                        <p className="text-md text-gray-300 mb-2">
                          Date: {new Date(event.date).toLocaleDateString()}
                        </p>
                        <p className="text-md text-gray-300 mb-2">
                          Venue: {event.venue}
                        </p>
                        <p className="text-md text-gray-300 mb-2">
                          Contact: {event.contact}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-lg text-gray-300">No events found.</p>
                  )}
                </div>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-center text-base-600 mb-6">
                  Upcoming Events
                </h2>
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {registeredEvents.length > 0 ? (
                    registeredEvents.map((event) => (
                      <div
                        key={event._id}
                        className="bg-gray-700 p-6 rounded-lg shadow-lg"
                      >
                        <h3 className="text-lg font-semibold text-white mb-4">
                          {event.name.toUpperCase()}
                        </h3>
                        <p className="text-md text-gray-300 mb-2">
                          Date: {new Date(event.date).toLocaleDateString()}
                        </p>
                        <p className="text-md text-gray-300 mb-2">
                          Venue: {event.venue}
                        </p>
                        <p className="text-md text-gray-300 mb-2">
                          Prizepool: {event.prizepool}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-lg text-gray-300">No events found.</p>
                  )}
                </div>
              </>
            )}
          </div>
            </div>
          </div>  
        </div>
      )}
    </>
  );
};

export default Profile;
