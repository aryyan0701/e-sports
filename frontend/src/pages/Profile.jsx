import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth/authSlice";
import { checkUser } from "../redux/user/userSlice";
import { fetchUserEvents } from "../redux/user/userApi";
import DashNavbar from "../components/DashNavbar";
import ScrollToTop from "../components/ScrollToTop";
import Footer from "../components/Footer";

const Profile = () => {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const develoment = "http://localhost:5000";
  const production = "https://e-sports-ynb7.onrender.com";

  const { user, role, status, error, createdEvents, registeredEvents } =
    useSelector((state) => state.user);


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
      <ScrollToTop />
      {status === "loading" ? (
       
       <div className="grid grid-cols-1 w-200 justify-between gap-8 p-14">
       <div className="skeleton bg-gray-800 h-[20rem] w-full"></div>
       <div className="skeleton bg-gray-800 h-[20rem] w-full"></div>
       </div>
      ) : (
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col ">
            {/* user details */}
            <div className="relative z-10 md:flex  w-full max-w-md md:max-w-4xl p-14 space-x-10 space-y-8 bg-gray-800 rounded-lg shadow-lg">
              <div>
                <h2 className="text-3xl font-bold text-center text-white mb-6">
                  Your Details
                </h2>
                {user.profileImage && (
                  <div className="text-center">
                    <img
                      src={`${production}${user.profileImage}`}
                      alt="Profile"
                      className="w-[20rem] h-[14rem] rounded-2xl"
                    />
                  </div>
                )}
              </div>
              <div className="grid gap-4 ">
                <p className="text-lg font-medium text-gray-300">
                  Name: {user.name.toUpperCase()}
                </p>
                <p className="text-lg font-medium text-gray-300 mt-2">
                  Email: {user.email}
                </p>
                <p className="text-lg font-medium text-gray-300 mt-2">
                  Number: {user.phoneNumber}
                </p>
                <p className="text-lg font-medium text-gray-300 mt-2">
                  Role: {user.role}
                </p>
                <p className="text-lg font-medium text-gray-300 mt-2">
                  Bio: {user.bio}
                </p>
              </div>
            </div>
            <div>
              {/* events details */}
              <div className="relative z-10 w-full max-w-md md:max-w-4xl p-16 space-y-4 bg-gray-800 rounded-lg shadow-lg">
                {role === "organizer" ? (
                  <>
                    <div className="grid gap-4 grid-cols-1">
                      <h2 className="text-3xl font-bold text-center text-base-600 mb-6">
                        Created Events
                      </h2>
                      {createdEvents.length > 0 ? (
                        createdEvents.map((event) => (
                          <>
                            <div
                              key={event._id}
                              className="bg-gray-700 p-4 rounded-lg shadow-lg"
                            >
                              <h3 className="text-lg font-bold text-blue-700 mb-4">
                                {event.name.toUpperCase()}
                              </h3>
                              <div className="md:flex md:flex-row flex-col justify-between md:space-x-14">
                                <p className="text-md font-semibold text-gray-200 mb-2">
                                  Date:{" "}
                                  {new Date(event.date).toLocaleDateString()}
                                </p>
                                <p className="text-md font-semibold text-gray-200 mb-2">
                                  Venue: {event.venue}
                                </p>
                                <p className="text-md font-semibold text-gray-200 mb-2">
                                  Contact: {event.contact}
                                </p>
                              </div>
                            </div>
                          </>
                        ))
                      ) : (
                        <p className="text-lg text-gray-300">
                          You haven't created any events yet.
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-3xl font-bold text-center text-base-600 mb-6">
                      Upcoming Events
                    </h2>
                    <div className="grid gap-4 grid-cols-1">
                      {registeredEvents.length > 0 ? (
                        registeredEvents.map((event) => (
                          <div
                            key={event._id}
                            className="bg-gray-700 p-6 rounded-lg shadow-lg"
                          >
                            <h3 className="text-lg font-bold text-blue-700  mb-4">
                              {event.name.toUpperCase()}
                            </h3>
                            <div className="md:flex md:flex-row flex-col justify-between md:space-x-14">
                              <p className="text-md font-semibold text-gray-200 mb-2">
                                Date:{" "}
                                {new Date(event.date).toLocaleDateString()}
                              </p>
                              <p className="text-md font-semibold text-gray-200 mb-2">
                                Venue: {event.venue}
                              </p>
                              <p className="text-md font-semibold text-gray-200 mb-2">
                                Prizepool: {event.prizepool}
                              </p>
                              <p className="text-md font-semibold text-gray-200 mb-2">
                                Contact: {event.contact}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-lg text-gray-300">
                          You haven't register for any events yet.
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer/>
    </>
  );
};

export default Profile;
