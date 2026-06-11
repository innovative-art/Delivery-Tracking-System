import React, { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/AdminSidebar";

function AssignOrdersPage() {

  const [orders, setOrders] = useState([]);
  const [agents, setAgents] = useState([]);

  const [selectedAgents, setSelectedAgents] =
    useState({});

  useEffect(() => {

    fetchOrders();
    fetchAgents();

  }, []);

  // 🔥 AI PRIORITY SCORE

  const getPriorityScore = (order) => {

    let score = 0;

    const text = `
      ${order.productName || ""}
      ${order.description || ""}
    `.toLowerCase();

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

    if (
      text.includes("medicine") ||
      text.includes("medical") ||
      text.includes("hospital")
    ) {
      score += 60;
    }

    if (
      text.includes("equipment") ||
      text.includes("device")
    ) {
      score += 30;
    }

    if (order.status === "PLACED") {
      score += 40;
    }

    if (order.status === "CONFIRMED") {
      score += 20;
    }

    return score;
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

  // FETCH ORDERS

  const fetchOrders = async () => {

    const token =
      localStorage.getItem("accessToken");

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

      const sortedOrders =
        (Array.isArray(data) ? data : [])
          .sort(
            (a, b) =>
              getPriorityScore(b) -
              getPriorityScore(a)
          );

      setOrders(sortedOrders);

    } catch (error) {

      console.log("Orders fetch error:", error);

      setOrders([]);

    }
  };

  // FETCH AGENTS

  const fetchAgents = async () => {

    const token =
      localStorage.getItem("accessToken");

    try {

      const res = await fetch(
        "http://localhost:9090/api/admin/agents",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      setAgents(
        Array.isArray(data) ? data : []
      );

    } catch (error) {

      console.log("Agents fetch error:", error);

      setAgents([]);

    }
  };

  // ASSIGN ORDER

  const assignOrder = async (
    orderId,
    agentId
  ) => {

    if (!agentId) {

      alert("Please select an agent");

      return;
    }

    const token =
      localStorage.getItem("accessToken");

    try {

      const res = await fetch(
        "http://localhost:9090/api/admin/assign",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`
          },

          body: JSON.stringify({
            orderId,
            agentId
          })
        }
      );

      if (!res.ok) {

        throw new Error(
          "Assignment failed"
        );
      }

      alert("✅ Order Assigned Successfully");

      fetchOrders();

    } catch (error) {

      console.log(
        "Assign error:",
        error
      );

      alert("❌ Failed to assign order");
    }
  };

  return (

    <>
      <Navbar />

      <div
        className="dashboard-container"
        style={{
          background: "#f1f5f9",
          minHeight: "100vh"
        }}
      >

        <AdminSidebar />

        <div
          className="dashboard-content"
          style={{
            padding: "30px"
          }}
        >

          <h1
            style={{
              marginBottom: "30px",
              color: "#e9f0ff",
              fontSize: "32px",
              fontWeight: "700"
            }}
          >
            🚚 AI Priority Order Assignment
          </h1>

          {orders.length === 0 && (
            <p
              style={{
                color: "#000000",
                fontSize: "18px"
              }}
            >
              No orders available
            </p>
          )}

          {orders.map((order) => (

            <div
              key={order.id}

              style={{

                background: "white",

                padding: "25px",

                borderRadius: "22px",

                marginBottom: "28px",

                boxShadow:
                  "0 12px 35px rgba(0,0,0,0.08)",

                borderLeft:
                  getPriorityScore(order) >= 100
                    ? "10px solid #ef4444"
                    : getPriorityScore(order) >= 60
                    ? "10px solid #f97316"
                    : "10px solid #22c55e"
              }}
            >

              {/* TOP SECTION */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "18px"
                }}
              >

                <h2
                  style={{
                    margin: 0,
                    color: "#0f172a",
                    fontSize: "24px",
                    fontWeight: "700"
                  }}
                >
                  📦 {order.productName}
                </h2>

                <span
                  style={{
                    padding: "8px 18px",
                    borderRadius: "25px",

                    background:
                      getPriorityScore(order) >= 100
                        ? "#fee2e2"
                        : getPriorityScore(order) >= 60
                        ? "#ffedd5"
                        : "#dcfce7",

                    color:
                      getPriorityScore(order) >= 100
                        ? "#b91c1c"
                        : getPriorityScore(order) >= 60
                        ? "#c2410c"
                        : "#166534",

                    fontWeight: "700",
                    fontSize: "14px"
                  }}
                >
                  {getPriorityLabel(order)}
                </span>

              </div>

              {/* ORDER DETAILS */}

              <div
                style={{
                  color: "#000000",
                  lineHeight: "1.9",
                  fontSize: "16px"
                }}
              >

                <p>
                  📝
                  {" "}
                  <strong>Description:</strong>
                  {" "}
                  {order.description}
                </p>

                <p>
                  📍
                  {" "}
                  <strong>Delivery Address:</strong>
                  {" "}
                  {order.deliveryAddress}
                </p>

                <p>
                  📞
                  {" "}
                  <strong>Phone:</strong>
                  {" "}
                  {order.phoneNumber}
                </p>

                <p>
                  📦
                  {" "}
                  <strong>Status:</strong>
                  {" "}

                  <span
                    style={{
                      color: "#2563eb",
                      fontWeight: "700"
                    }}
                  >
                    {order.status}
                  </span>

                </p>

              </div>

              <hr
                style={{
                  margin: "20px 0",
                  border:
                    "1px solid #e2e8f0"
                }}
              />

              {/* CUSTOMER DETAILS */}

              <h3
                style={{
                  color: "#0f172a",
                  marginBottom: "12px"
                }}
              >
                👤 Customer Details
              </h3>

              <div
                style={{
                  color: "#000000",
                  lineHeight: "1.9",
                  fontSize: "16px"
                }}
              >

                <p>
                  <strong>Name:</strong>
                  {" "}
                  {order.user?.name || "N/A"}
                </p>

                <p>
                  <strong>Email:</strong>
                  {" "}
                  {order.user?.email || "N/A"}
                </p>

                <p>
                  <strong>Phone:</strong>
                  {" "}
                  {order.phoneNumber}
                </p>

              </div>

              <hr
                style={{
                  margin: "20px 0",
                  border:
                    "1px solid #e2e8f0"
                }}
              />

              {/* ASSIGNED */}

              {order.agent ? (

                <div>

                  <h3
                    style={{
                      color: "#16a34a",
                      marginBottom: "12px"
                    }}
                  >
                    ✅ Already Assigned
                  </h3>

                  <p
                    style={{
                      color: "#334155"
                    }}
                  >
                    👨‍✈️
                    {" "}
                    <strong>Agent:</strong>
                    {" "}
                    {order.agent.name}
                  </p>

                  <p
                    style={{
                      color: "#334155"
                    }}
                  >
                    📧
                    {" "}
                    {order.agent.email}
                  </p>

                </div>

              ) : (

                <div>

                  <select
                    value={
                      selectedAgents[
                        order.id
                      ] || ""
                    }

                    onChange={(e) =>
                      setSelectedAgents({
                        ...selectedAgents,

                        [order.id]:
                          e.target.value
                      })
                    }

                    style={{
                      padding: "12px",
                      borderRadius: "12px",

                      border:
                        "1px solid #cbd5e1",

                      width: "280px",

                      fontSize: "15px",

                      color: "#0f172a",

                      background: "white",

                      outline: "none"
                    }}
                  >

                    <option value="">
                      Select Agent
                    </option>

                    {agents.map((agent) => (

                      <option
                        key={agent.id}
                        value={agent.id}
                      >

                        {agent.name}
                        {" "}
                        (ID:
                        {" "}
                        {agent.id})

                      </option>

                    ))}

                  </select>

                  <br />
                  <br />

                  <button
                    onClick={() =>
                      assignOrder(
                        order.id,

                        selectedAgents[
                          order.id
                        ]
                      )
                    }

                    style={{

                      background:
                        "linear-gradient(135deg,#2563eb,#1d4ed8)",

                      color: "white",

                      border: "none",

                      padding:
                        "12px 22px",

                      borderRadius:
                        "12px",

                      cursor: "pointer",

                      fontWeight: "700",

                      fontSize: "15px",

                      boxShadow:
                        "0 8px 20px rgba(37,99,235,0.3)"
                    }}
                  >

                    🚚 Assign Order

                  </button>

                </div>

              )}

            </div>

          ))}

        </div>

      </div>
    </>
  );
}

export default AssignOrdersPage;