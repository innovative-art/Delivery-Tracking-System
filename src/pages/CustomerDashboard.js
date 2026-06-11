import React from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import RoleSidebar from "../components/RoleSidebar";

import "../styles/dashboard.css";
import "../styles/customer.css";

function CustomerDashboard() {

  const navigate = useNavigate();

  return (

    <>
      <Navbar />

      <div className="dashboard-container">

        <RoleSidebar />

        <div className="dashboard-content">

          <h1 className="dashboard-title">
            Welcome to RescueNet AI 🚑
          </h1>

          <p className="welcome-text">
            Smart emergency rescue and priority delivery system
          </p>

          <div className="dashboard-grid">

            <div
              className="dashboard-card"
              onClick={() =>
                navigate("/customer/create")
              }
            >
              <h2>Create Order</h2>
              <p>Place emergency rescue request quickly</p>
            </div>

            <div
              className="dashboard-card"
              onClick={() =>
                navigate("/customer/orders")
              }
            >
              <h2>Your Orders</h2>
              <p>View all past and active requests</p>
            </div>

            <div
              className="dashboard-card"
              onClick={() =>
                navigate("/customer/track/1")} // placeholder fix
            >
              <h2>Track Orders</h2>
              <p>Live tracking with AI-style timeline</p>
            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default CustomerDashboard;