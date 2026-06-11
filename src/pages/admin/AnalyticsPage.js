import React, { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/AdminSidebar";

function AnalyticsPage() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {

    const token = localStorage.getItem("accessToken");

    try {

      const res = await fetch(
        "http://localhost:9090/api/admin/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();
      setOrders(data);

    } catch (err) {
      console.log(err);
    }
  };

  // 📊 CALCULATIONS
  const total = orders.length;

  const delivered = orders.filter(
    o => o.status === "DELIVERED"
  ).length;

  const pending = orders.filter(
    o => o.status !== "DELIVERED"
  ).length;

  const statusCount = (status) =>
    orders.filter(o => o.status === status).length;

  return (
    <>
      <Navbar />

      <div className="dashboard-container">

        <AdminSidebar />

        <div className="dashboard-content">

          <h1 className="dashboard-title">
            📊 System Analytics
          </h1>

          {/* CARDS */}
          <div className="dashboard-grid">

            <div className="dashboard-card">
              <h2>Total Orders</h2>
              <p>{total}</p>
            </div>

            <div className="dashboard-card">
              <h2>Delivered</h2>
              <p>{delivered}</p>
            </div>

            <div className="dashboard-card">
              <h2>Pending</h2>
              <p>{pending}</p>
            </div>

            <div className="dashboard-card">
              <h2>Assigned</h2>
              <p>{statusCount("ASSIGNED")}</p>
            </div>

          </div>

          {/* STATUS BREAKDOWN */}
          <div style={{ marginTop: "30px" }}>

            <h2>Order Status Breakdown</h2>

            <ul style={{ color: "#cbd5e1" }}>

              <li>PLACED → {statusCount("PLACED")}</li>
              <li>CONFIRMED → {statusCount("CONFIRMED")}</li>
              <li>ASSIGNED → {statusCount("ASSIGNED")}</li>
              <li>SHIPPED → {statusCount("SHIPPED")}</li>
              <li>OUT FOR DELIVERY → {statusCount("OUT_FOR_DELIVERY")}</li>
              <li>DELIVERED → {statusCount("DELIVERED")}</li>

            </ul>

          </div>

        </div>

      </div>
    </>
  );
}

export default AnalyticsPage;