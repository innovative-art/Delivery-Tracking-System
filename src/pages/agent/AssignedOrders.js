import React, {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import Navbar from "../../components/Navbar";
import RoleSidebar from "../../components/RoleSidebar";

function AssignedOrders() {

  const navigate = useNavigate();

  const [orders, setOrders] =
    useState([]);

  const fetchOrders = async () => {

    const token =
      localStorage.getItem(
        "accessToken"
      );

    try {

      const res = await fetch(
        "http://localhost:9090/api/agent/orders",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      const data =
        await res.json();

      console.log(data);

      setOrders(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.log(
        "Orders fetch error:",
        error
      );

      setOrders([]);
    }
  };

  useEffect(() => {

    fetchOrders();

  }, []);

  return (

    <>
      <Navbar />

      <div className="dashboard-container">

        <RoleSidebar />

        <div className="dashboard-content">

          <h1 className="dashboard-title">
            📦 Assigned Orders
          </h1>

          {orders.length === 0 && (

            <p>
              No assigned orders
            </p>

          )}

          {orders.map((item) => {

            const order = item.order;

            return (

              <div
                key={order.id}
                className="order-card"
              >

                <h2>
                  📦 {order.productName}
                </h2>

                <p>
                  📝 {order.description}
                </p>

                <hr />

                <h3>
                  👤 Customer Details
                </h3>

                <p>
                  Name:
                  {" "}
                  {order.user?.name || "N/A"}
                </p>

                <p>
                  Email:
                  {" "}
                  {order.user?.email || "N/A"}
                </p>

                <p>
                  Phone:
                  {" "}
                  {order.phoneNumber}
                </p>

                <hr />

                <h3>
                  📍 Delivery Details
                </h3>

                <p>
                  Pickup:
                  {" "}
                  {order.pickupAddress}
                </p>

                <p>
                  Delivery:
                  {" "}
                  {order.deliveryAddress}
                </p>

                <hr />

                <p>
                  📦 Status:
                  {" "}

                  <strong>
                    {order.status}
                  </strong>
                </p>

                <p>
                  👨‍✈️ Assigned Agent:
                  {" "}
                  {order.agent?.name}
                </p>

                <p>
                  🕒 Created:
                  {" "}

                  {new Date(
                    order.createdAt
                  ).toLocaleString()}
                </p>

                <br />

                <button
                  onClick={() =>
                    navigate(
                      "/agent/update"
                    )
                  }
                >

                  🚚 Update Status

                </button>

              </div>

            );

          })}

        </div>

      </div>
    </>
  );
}

export default AssignedOrders;