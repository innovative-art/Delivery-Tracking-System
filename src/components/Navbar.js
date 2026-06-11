import React from "react";
import "../styles/navbar.css";

function Navbar() {

  const role = localStorage.getItem("role");

  return (
    <div className="navbar">

      <div className="logo">
        🚑 RescueNet AI
      </div>

      <div className="nav-right">

        <span className="role-badge">
          {role}
        </span>

      </div>

    </div>
  );
}

export default Navbar;