import React, { useEffect, useState } from "react";
import DashNavbar from "../components/DashNavbar";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLeaguesNews,
  fetchMatchesNews,
  fetchHeadtoHeadMatches,
} from "../redux/news/newsApi";
import ScrollToTop from "../components/ScrollToTop";
import Footer from "../components/Footer";

function News() {
  const [activeSection, setActiveSection] = useState("leagues");
  const dispatch = useDispatch();
  const leaguesNews = useSelector((state) => state.news.leaguesNews);
  const matchesNews = useSelector((state) => state.news.matchesNews);
  const HeadToHeadMatches = useSelector((state) => state.news.H2HMatches);
  const status = useSelector((state) => state.news.status);
  const error = useSelector((state) => state.news.error);

  useEffect(() => {
    if (activeSection === "leagues") {
      dispatch(fetchLeaguesNews());
    } else if (activeSection === "matches") {
      dispatch(fetchMatchesNews());
    } else if (activeSection === "h2h") {
      dispatch(fetchHeadtoHeadMatches());
    }
  }, [dispatch, activeSection]);

  const renderNews = () => {
    const news = activeSection === "leagues" ? leaguesNews : matchesNews;
    return news.map((event) => (
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
          <h2 className="text-blue-700 font-bold text-2xl mb-3 mt-5">
            {event.title ? event.title.toUpperCase() : "Unnamed Event"}
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
    ));
  };

  const renderHeadToHeadMatches = () => {
    if (!HeadToHeadMatches || !HeadToHeadMatches.events) {
      return (
        <div className="text-center text-gray-500">
          No Head-to-Head Matches available.
        </div>
      );
    }

    return HeadToHeadMatches.events.map((event) => (
      <div
        key={event.id}
        className="bg-base-200 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-2 rounded-lg overflow-hidden border border-gray-200"
      >
        <div className="relative">
          <div className="absolute top-4 right-4 bg-white text-xs text-gray-700 py-1 px-2 rounded-lg shadow-md">
            {new Date(event.startTimestamp * 1000).toLocaleDateString()}
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-blue-700 font-bold text-2xl mb-2 mt-6">
            {event.homeTeam.name} vs {event.awayTeam.name}
          </h2>
          <p className="text-gray-200 text-base mb-4">
            {event.homeTeam.shortName} {event.homeScore.display} - {event.awayScore.display} {event.awayTeam.shortName}
          </p>
          <div className="flex flex-col space-y-2 justify-between items-start text-sm">
            <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full shadow-sm">
              Tournament: {event.tournament.name}
            </div>
            <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full shadow-sm">
              Season:  ({event.season.year})
            </div>
          </div>
        </div>
      </div>
    ));
  };

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
        <h2
          className={`text-2xl font-bold text-center cursor-pointer ${
            activeSection === "h2h" ? "border-b-4 border-slate-700" : ""
          }`}
          onClick={() => setActiveSection("h2h")}
        >
          HeadToHead
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
          <div className="p-4">
            {status === "failed" && (
              <p className="text-red-500 text-center font-semibold mb-4">
                Error: {error}
              </p>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-200 justify-between gap-8">
            {status === "succeeded" && activeSection === "leagues" && renderNews()}
            {status === "succeeded" && activeSection === "matches" && renderNews()}
            {status === "succeeded" && activeSection === "h2h" && renderHeadToHeadMatches()}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default News;
