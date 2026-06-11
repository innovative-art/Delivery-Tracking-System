import React from "react";

import {
  Link
} from "react-router-dom";

import "../styles/sidebar.css";

function CustomerSidebar() {

  return (

    <div className="sidebar">

      <div className="sidebar-logo">
        🚑 RescueNet
      </div>

      <ul>

        <Link to="/customer/create">
          <li>Create Order</li>
        </Link>

        <Link to="/customer/orders">
          <li>Your Orders</li>
        </Link>

        {/* <Link to="/customer/track">
          <li>Track Orders</li>
        </Link> */}

        <Link to="/">
          <li>Logout</li>
        </Link>

      </ul>

    </div>
  );
}

export default CustomerSidebar;