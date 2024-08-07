import React, { useEffect } from 'react';
import DashNavbar from "../components/DashNavbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from '../redux/news/newsApi';

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
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Latest News</h2>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
            {status === 'succeeded' && news.map((event) => (
              <div key={event._id} className="card bg-base-100 w-96 shadow-xl mx-auto lg:mx-4">
                <figure>
                  <img
                    src={event.thumbnail_url}
                    alt={event.title || "Event"}
                    className='w-30 h-30'
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {event.title ? event.title.toUpperCase() : "Unnamed Event"}
                    <div className="badge badge-secondary">NEW</div>
                  </h2>
                  <p>{event.description}</p>
                  <div className="card-actions justify-end">
                    <div className="badge badge-outline">Source: {event.source}</div>
                    <div className="badge badge-outline"><a href={event.source_url} target="_blank" rel="noopener noreferrer">Read more</a></div>
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
