import React, { useEffect } from "react";
import DashNavbar from "../components/DashNavbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../redux/news/newsApi";

function News() {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);
  const status = useSelector((state) => state.news.status);
  const error = useSelector((state) => state.news.error);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <>
      <DashNavbar />
      <div className="absolute top-[65px] left-0 right-0 bg-white shadow-md z-50 flex justify-around p-4">
        <button className="text-gray-600 hover:text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </button>
        <button className="text-gray-600 hover:text-blue-600 active">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <button className="text-gray-600 hover:text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </button>
      </div>
      <div className="pt-20 min-h-screen bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {status === "loading" && <p>Loading...</p>}
            {status === "failed" && <p>Error: {error}</p>}
            {status === "succeeded" &&
              news.map((event) => (
                <div key={event._id} className="card bg-base-100 shadow-xl">
                  <figure>
                    <img
                      src={event.thumbnail_url}
                      alt={event.title || "Event"}
                      className="w-30 h-30"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      {event.title
                        ? event.title.toUpperCase()
                        : "Unnamed Event"}
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>{event.description}</p>
                    <div className="card-actions justify-end">
                      <div className="badge badge-outline">
                        Source: {event.source}
                      </div>
                      <div className="badge badge-outline">
                        <a
                          href={event.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Read more
                        </a>
                      </div>
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
