import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Agar user logged in nahi hai, toh Login par bhej do
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Agar logged in hai, toh child routes (Dashboard) render karo
  return <Outlet />;
};

export default ProtectedRoute;