import React from "react";
import {
  Link
} from "react-router-dom";

import "../styles/sidebar.css";

function Sidebar() {

  const role =
  localStorage.getItem("role");

  return (

    <div className="sidebar">

      <div className="sidebar-logo">
        🚑 RescueNet
      </div>

      <ul>

        {role === "CUSTOMER" && (
          <>

            <Link to="/customer/create">
              <li>Create Order</li>
            </Link>

            <Link to="/customer/orders">
              <li>Your Orders</li>
            </Link>

            <Link to="/customer/track">
              <li>Track Orders</li>
            </Link>

          </>
        )}

        {role === "AGENT" && (
          <>

            <Link to="/agent/orders">
              <li>Assigned Orders</li>
            </Link>

            <Link to="/agent/update">
              <li>Update Status</li>
            </Link>

          </>
        )}

        {role === "ADMIN" && (
          <>

            <Link to="/admin/orders">
              <li>All Orders</li>
            </Link>

            <Link to="/admin/assign">
              <li>Assign Agents</li>
            </Link>

            <Link to="/admin/manage">
              <li>Manage System</li>
            </Link>

          </>
        )}

      </ul>

    </div>
  );
}

export default Sidebar;