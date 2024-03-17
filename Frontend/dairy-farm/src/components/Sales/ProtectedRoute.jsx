import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { authToken } = useAuth();

  console.log(authToken);

  return authToken ? children : <Navigate to="/Signin" replace />;
};

export default ProtectedRoute;
