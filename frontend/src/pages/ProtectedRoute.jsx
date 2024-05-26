// src/pages/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = sessionStorage.getItem('user');

  if (!user) {
    // User is not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  // User is logged in, allow access to the protected route
  return children;
};

export default ProtectedRoute;
