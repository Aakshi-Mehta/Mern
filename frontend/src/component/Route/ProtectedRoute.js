import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  if (loading) return null; // Optionally render a loading indicator or spinner

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
