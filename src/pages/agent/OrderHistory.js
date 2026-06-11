import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import RoleSidebar from "../../components/RoleSidebar";

function OrderHistory() {

  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {

    const token = localStorage.getItem("accessToken");

    try {

      const res = await fetch(
        "http://localhost:9090/api/agent/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      // SAFETY CHECK
      const list = Array.isArray(data) ? data : [];

      // STEP 1: ONLY DELIVERED ORDERS
      const delivered = list.filter(
        (item) => item.order?.status === "DELIVERED"
      );

      // STEP 2: REMOVE DUPLICATES (KEEP LATEST PER ORDER ID)
      const map = new Map();

      delivered.forEach((item) => {
        const orderId = item.order?.id;

        // overwrite so only latest stays
        map.set(orderId, item);
      });

      const cleanData = Array.from(map.values());

      setHistory(cleanData);

    } catch (error) {
      console.log("History fetch error:", error);
      setHistory([]);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <>
      <Navbar />

      <div className="dashboard-container">

        <RoleSidebar />

        <div className="dashboard-content">

          <h1>📜 Delivery History</h1>

          {history.length === 0 && (
            <p>No delivered orders</p>
          )}

          {history.map((item) => {

            const order = item.order;

            return (
              <div key={order.id} className="order-card">

                <h2>📦 {order?.productName}</h2>

                <p>👤 Customer: {order?.user?.name}</p>

                <p>📍 Delivery: {order?.deliveryAddress}</p>

                <p>📞 Phone: {order?.phoneNumber}</p>

                <p>
                  🕒 Delivered At:{" "}
                  {order?.updatedAt
                    ? new Date(order.updatedAt).toLocaleString()
                    : "N/A"}
                </p>

                <p style={{ color: "#00e0ff", fontWeight: "bold" }}>
                  ✅ DELIVERED
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </>
  );
}

export default OrderHistory;