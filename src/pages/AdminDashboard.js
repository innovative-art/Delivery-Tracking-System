import React from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import AdminSidebar from "../components/AdminSidebar";

import "../styles/dashboard.css";
import "../styles/customer.css";

function AdminDashboard() {

  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="dashboard-container">

        <AdminSidebar />

        <div className="dashboard-content">

          {/* HEADER */}
          <h1 className="dashboard-title">
            🛡️ RescueNet Admin Control
          </h1>

          <div className="welcome-wrapper">

            <p className="welcome-text">
              Monitor rescue operations, assign agents, and manage the entire emergency delivery system in real time.
            </p>

          </div>

          {/* NAVIGATION GRID */}
          <div className="dashboard-grid">

            <div
              className="dashboard-card"
              onClick={() => navigate("/admin/orders")}
            >
              <h2>📦 All Orders</h2>
              <p>View all orders and live status updates.</p>
            </div>

            <div
              className="dashboard-card"
              onClick={() => navigate("/admin/assign")}
            >
              <h2>🚚 Assign Orders</h2>
              <p>Assign orders to agents efficiently.</p>
            </div>

            <div
              className="dashboard-card"
              onClick={() => navigate("/admin/agents")}
            >
              <h2>👨‍✈️ Manage Agents</h2>
              <p>View and manage existing agents.</p>
            </div>

            {/* 🔥 NEW FEATURE */}
            <div
              className="dashboard-card"
              onClick={() => navigate("/admin/register-agent")}
            >
              <h2>➕ Add New Agent</h2>
              <p>
                Register a new delivery agent into the system.
              </p>
            </div>

            <div
              className="dashboard-card"
              onClick={() => navigate("/admin/analytics")}
            >
              <h2>📊 System Analytics</h2>
              <p>Track performance and delivery metrics.</p>
            </div>

          </div>

        </div>

      </div>

      {/* INLINE STYLE */}
      <style>{`

        .highlight-card {
          border: 2px solid #00d9ff;
          box-shadow: 0 0 20px rgba(0,217,255,0.3);
        }

        .highlight-card:hover {
          transform: scale(1.05);
        }

      `}</style>

    </>
  );
}

export default AdminDashboard;