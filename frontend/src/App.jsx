import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateEvent from "./pages/CreateEvent";
import EventList from "./pages/EventList";
import Landing from "./pages/Landing";
import DashBoard from "./pages/DashBoard";
import ProtectedRoute from "./pages/ProtectedRoute";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard/*"
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
        <Route
          path="/create-event"
          element={
            <ProtectedRoute>
              <CreateEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/eventlist"
          element={
            <ProtectedRoute>
              <EventList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
