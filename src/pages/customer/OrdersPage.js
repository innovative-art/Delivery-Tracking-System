import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import CustomerSidebar from "../../components/CustomerSidebar";

import "../../styles/dashboard.css";
import "../../styles/customer.css";

function OrdersPage() {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {

    const token = localStorage.getItem("accessToken");

    try {

      const response = await fetch(
        "http://localhost:9090/api/customer/orders",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();

      setOrders(data || []);

    } catch (error) {
      console.log("Orders fetch error:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (

    <>
      <Navbar />

      <div className="dashboard-container">

        <CustomerSidebar />

        <div className="dashboard-content">

          <h1 className="dashboard-title">
            Your Orders 📦
          </h1>

          <p className="welcome-text">
            Track all your emergency requests
          </p>

          {/* STATES */}
          {loading && (
            <p style={{ color: "#94a3b8" }}>
              Loading orders...
            </p>
          )}

          {!loading && orders.length === 0 && (
            <p style={{ color: "#94a3b8" }}>
              No orders found
            </p>
          )}

          {/* ORDERS LIST */}
          <div className="orders-grid">

            {orders.map((order) => (

              <div
                key={order.id}
                className="order-card"
                onClick={() =>
                  navigate(`/customer/track/${order.id}`)
                }
              >

                <h2>{order.productName}</h2>

                <p>{order.description}</p>

                <div className="order-meta">

                  <span>
                    📍 {order.deliveryAddress}
                  </span>

                  <span>
                    📦 Status: {order.status}
                  </span>

                </div>

                <div className="order-time">

                  <small>
                    Created: {order.createdAt}
                  </small>

                  <small>
                    Updated: {order.updatedAt}
                  </small>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>
    </>
  );
}

export default OrdersPage;