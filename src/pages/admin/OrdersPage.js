import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/AdminSidebar";

function OrdersPage() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔥 AI PRIORITY SCORE
  const getPriorityScore = (order) => {

    let score = 0;

    const text = `
      ${order.productName || ""}
      ${order.description || ""}
    `.toLowerCase();

    // HIGH EMERGENCY KEYWORDS

    if (
      text.includes("blood") ||
      text.includes("oxygen") ||
      text.includes("emergency") ||
      text.includes("ambulance") ||
      text.includes("accident") ||
      text.includes("icu")
    ) {
      score += 100;
    }

    // MEDIUM PRIORITY

    if (
      text.includes("medicine") ||
      text.includes("medical") ||
      text.includes("hospital")
    ) {
      score += 60;
    }

    // LOW PRIORITY

    if (
      text.includes("equipment") ||
      text.includes("device")
    ) {
      score += 30;
    }

    // STATUS BASED BOOST

    if (order.status === "PLACED") {
      score += 40;
    }

    if (order.status === "CONFIRMED") {
      score += 20;
    }

    return score;
  };

  const fetchOrders = async () => {

    const token = localStorage.getItem("accessToken");

    const res = await fetch(
      "http://localhost:9090/api/admin/orders",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await res.json();

    // 🔥 SORT USING AI PRIORITY

    const sortedOrders = data.sort(
      (a, b) =>
        getPriorityScore(b) -
        getPriorityScore(a)
    );

    setOrders(sortedOrders);
  };

  // 🔥 PRIORITY LABEL
  const getPriorityLabel = (order) => {

    const score = getPriorityScore(order);

    if (score >= 100) {
      return "🔴 HIGH";
    }

    if (score >= 60) {
      return "🟠 MEDIUM";
    }

    return "🟢 LOW";
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-container">

        <AdminSidebar />

        <div className="dashboard-content">

          <h1
            style={{
              marginBottom: "25px",
              color: "#0f172a"
            }}
          >
            📦 AI Prioritized Orders
          </h1>

          {orders.map(order => (

            <div
              key={order.id}
              className="order-card"
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "18px",
                marginBottom: "20px",
                boxShadow:
                  "0 8px 25px rgba(0,0,0,0.08)",
                borderLeft:
                  getPriorityScore(order) >= 100
                    ? "8px solid #ef4444"
                    : getPriorityScore(order) >= 60
                    ? "8px solid #f97316"
                    : "8px solid #22c55e"
              }}
            >

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >

                <h2
                  style={{
                    margin: 0,
                    color: "#0f172a"
                  }}
                >
                  {order.productName}
                </h2>

                <span
                  style={{
                    padding: "6px 14px",
                    borderRadius: "20px",
                    background:
                      getPriorityScore(order) >= 100
                        ? "#fee2e2"
                        : getPriorityScore(order) >= 60
                        ? "#ffedd5"
                        : "#dcfce7",
                    fontWeight: "bold",
                    fontSize: "13px"
                  }}
                >
                  {getPriorityLabel(order)}
                </span>

              </div>

              <p
                style={{
                  color: "#475569",
                  marginTop: "12px"
                }}
              >
                📝 {order.description}
              </p>

              <p
                style={{
                  color: "#0f172a",
                  fontWeight: "600"
                }}
              >
                📍 {order.deliveryAddress}
              </p>

              <p
                style={{
                  color: "#2563eb",
                  fontWeight: "bold"
                }}
              >
                📦 Status: {order.status}
              </p>

            </div>

          ))}

        </div>
      </div>
    </>
  );
}

export default OrdersPage;