import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
       <footer className="bg-gray-800 text-white py-8 px-8">
          <div className="container mx-auto">
            <div className="grid grid-col-1 md:grid-col-2 space-y-8 justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">E-Sports Hub</h3>
                <p className="mt-2">Your go-to platform for all things e-sports!</p>
              </div>
              <div>
                <ul className="grid grid-col-1 md:grid-col-2 space-y-6">
                  <li><Link to="/about" className="hover:text-gray-300">About Us</Link></li>
                  <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
                  <li><Link to="/terms" className="hover:text-gray-300">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </footer> 
    </>
  )
}

export default Footer