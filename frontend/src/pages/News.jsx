import React, { useEffect, useState } from "react";
import DashNavbar from "../components/DashNavbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaguesNews, fetchMatchesNews } from "../redux/news/newsApi";

function News() {
  const [activeSection, setActiveSection] = useState('leagues');
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);
  const status = useSelector((state) => state.news.status);
  const error = useSelector((state) => state.news.error);

  useEffect(() => {
    if (activeSection === 'leagues') {
      dispatch(fetchLeaguesNews());
    } else {
      dispatch(fetchMatchesNews());
    }
  }, [dispatch, activeSection]);  

  return (
    <>
      <DashNavbar />
      <div className="absolute top-[65px] left-0 right-0 bg-white shadow-md z-40 flex justify-around p-4">
        <h2
          className={`text-2xl font-bold text-center cursor-pointer ${
            activeSection === 'leagues' ? 'border-b-4 border-slate-500' : ''
          }`}
          onClick={() => setActiveSection('leagues')}
        >
         Leagues
        </h2>
        <h2
          className={`text-2xl font-bold text-center cursor-pointer ${
            activeSection === 'matches' ? 'border-b-4 border-slate-700' : ''
          }`}
          onClick={() => setActiveSection('matches')}
        >
         Matches News
        </h2>
      </div>

      <div className="pt-20 min-h-screen bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {status === "loading" && <p>Loading...</p>}
            {status === "failed" && <p>Error: {error}</p>}
            {status === "succeeded" &&
              news.map((event) => (
                <div key={event._id} className="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-2 rounded-lg overflow-hidden">
                <div className="card-body p-6">
                  <h2 className="card-title text-blue-600 font-extrabold text-xl mb-4">
                    {event.title ? event.title.toUpperCase() : "Unnamed Event"}
                  </h2>
                  <p className="text-gray-200 mb-4">{event.description || "No description available."}</p>
                  <h5 className="text-sm text-gray-500 mb-4">
                    Date: {new Date(event.published_date).toLocaleDateString()}
                  </h5>
                  <div className="card-actions flex justify-between items-center">
                    <div className="badge bg-blue-100 text-gray-600 px-3 py-1 rounded-full shadow-sm">
                      Source: {event.source}
                    </div>
                    <a
                      href={event.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 underline"
                    >
                      Read more
                    </a>
                  </div>
                </div>
              </div>
              
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default News;
