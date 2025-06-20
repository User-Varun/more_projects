import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const jwt = Cookies.get("jwt"); // Check for JWT in cookies

  if (!jwt) {
    // If no JWT, redirect to login page
    return <Navigate to="/login" />;
  }

  // If JWT exists, render the protected route's children
  return children;
};

export default ProtectedRoute;
