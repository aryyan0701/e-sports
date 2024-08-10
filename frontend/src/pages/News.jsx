import React, { useEffect, useState } from "react";
import DashNavbar from "../components/DashNavbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaguesNews, fetchMatchesNews } from "../redux/news/newsApi";
import ScrollToTop from "../components/ScrollToTop";

function News() {
  const [activeSection, setActiveSection] = useState("leagues");
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);
  const status = useSelector((state) => state.news.status);
  const error = useSelector((state) => state.news.error);

  useEffect(() => {
    if (activeSection === "leagues") {
      dispatch(fetchLeaguesNews());
    } else {
      dispatch(fetchMatchesNews());
    }
  }, [dispatch, activeSection]);

  return (
    <>
      <DashNavbar />
      <ScrollToTop />
      <div className="absolute top-[65px] left-0 right-0 bg-white shadow-md z-40 flex justify-around p-4">
        <h2
          className={`text-2xl font-bold text-center cursor-pointer ${
            activeSection === "leagues" ? "border-b-4 border-slate-500" : ""
          }`}
          onClick={() => setActiveSection("leagues")}
        >
          Leagues
        </h2>
        <h2
          className={`text-2xl font-bold text-center cursor-pointer ${
            activeSection === "matches" ? "border-b-4 border-slate-700" : ""
          }`}
          onClick={() => setActiveSection("matches")}
        >
          Matches
        </h2>
      </div>

      <div className="pt-20 min-h-screen bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {status === "loading" && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-200 justify-between gap-8">
                <div className="skeleton h-80 w-full"></div>
                <div className="skeleton h-80 w-full"></div>
                <div className="skeleton h-80 w-full"></div>
                <div className="skeleton h-80 w-full"></div>
                <div className="skeleton h-80 w-full"></div>
                <div className="skeleton h-80 w-full"></div>
                <div className="skeleton h-80 w-full"></div>
                <div className="skeleton h-80 w-full"></div>
                <div className="skeleton h-80 w-full"></div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {status === "failed" && (
              <p className="text-red-500">Error: {error}</p>
            )}
            {status === "succeeded" &&
              news.map((event) => (
                <div
                  key={event._id}
                  className="bg-base-200 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-2 rounded-lg overflow-hidden"
                >
                  <div className="relative">
                    <div className="absolute top-4 right-4 bg-white text-xs text-gray-700 py-1 px-2 rounded-lg shadow-md">
                      {new Date(event.published_date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-blue-700 font-extrabold text-2xl mb-3 mt-5">
                      {event.title
                        ? event.title.toUpperCase()
                        : "Unnamed Event"}
                    </h2>
                    <p className="text-gray-200 leading-relaxed mb-4">
                      {event.description || "No description available."}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full shadow-sm text-sm">
                        Source: {event.source}
                      </div>
                      <a
                        href={event.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 font-semibold underline"
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
