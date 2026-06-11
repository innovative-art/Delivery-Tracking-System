import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {

  const role = localStorage.getItem("role");

  // ❌ NOT LOGGED IN
  if (!role) {
    return <Navigate to="/" />;
  }

  // ❌ WRONG ROLE
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  // ✔ ALLOWED
  return children;
}

export default ProtectedRoute;