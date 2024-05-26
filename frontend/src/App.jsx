import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import CreateEvent from './pages/CreateEvent';
import EventList from './pages/EventList';
import Landing from './pages/Landing';
import DashBoard from './pages/DashBoard';
import ProtectedRoute from './pages/ProtectedRoute';
import Profile from './pages/Profile';

function App() {
  return (
    <>
       <Router>
      <Routes>
      <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
         <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
    </>
  )
}

export default App