import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import CreateEvent from '../pages/CreateEvent';
import EventList from '../pages/EventList';

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create-event" element={<CreateEvent />} />
      <Route path="/events" element={<EventList />} />
    </Routes>
    <h2>App</h2>
    </>
    
  );
};

export default App;
