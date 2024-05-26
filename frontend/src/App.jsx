import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import CreateEvent from './pages/CreateEvent';
import EventList from './pages/EventList';
import Landing from './pages/Landing';

function App() {
  return (
    <>
    <Router>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='register' element={<Register/>} />
        <Route path='login' element={<Login/>} />
        <Route path='create-event' element={<CreateEvent/>} />
        <Route path='events' element={<EventList/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App