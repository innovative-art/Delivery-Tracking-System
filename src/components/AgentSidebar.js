import React from "react";

import {
  Link
} from "react-router-dom";

import "../styles/sidebar.css";

function AgentSidebar() {

  return (

    <div className="sidebar">

      <div className="sidebar-logo">
        🚚 RescueNet Agent
      </div>

      <ul>

        <Link to="/agent/orders">
          <li>Assigned Orders</li>
        </Link>

        <Link to="/agent/update">
          <li>Update Status</li>
        </Link>

        <Link to="/agent/history">
          <li>Delivery History</li>
        </Link>

        <Link to="/">
          <li>Logout</li>
        </Link>

      </ul>

    </div>
  );
}

export default AgentSidebar;