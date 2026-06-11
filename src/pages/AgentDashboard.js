import React from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import RoleSidebar from "../components/RoleSidebar";

import "../styles/dashboard.css";
import "../styles/agent.css";

function AgentDashboard() {

  const navigate = useNavigate();

  return (

    <>
      <Navbar />

      <div className="dashboard-container">

        <RoleSidebar />

        <div className="dashboard-content">

          <h1 className="dashboard-title">
            🚚 Agent Dashboard
          </h1>

          <p className="welcome-text">
            Manage rescue operations efficiently
          </p>

          {/* FEATURE CARDS */}
          <div className="dashboard-grid">

            <div
              className="dashboard-card"
              onClick={() => navigate("/agent/orders")}
            >
              <h2>📦 Assigned Orders</h2>
              <p>View all orders assigned to you</p>
            </div>

            <div
              className="dashboard-card"
              onClick={() => navigate("/agent/update")}
            >
              <h2>⚡ Update Status</h2>
              <p>Update order progress in real time</p>
            </div>

            <div
              className="dashboard-card"
              onClick={() => navigate("/agent/history")}
            >
              <h2>📊 Order History</h2>
              <p>Completed rescue requests</p>
            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default AgentDashboard;