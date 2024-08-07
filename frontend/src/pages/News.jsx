import React from 'react'
import DashNavbar from "../components/DashNavbar";


function News() {
  return (
    <>
      <DashNavbar />
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Latest News</h2>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Card title!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default News