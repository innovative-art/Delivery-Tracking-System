import React, {
  useEffect,
  useState
} from "react";

import Navbar from "../../components/Navbar";
import RoleSidebar from "../../components/RoleSidebar";

function UpdateOrderStatus() {

  const [orders, setOrders] =
    useState([]);

  const [statusMap, setStatusMap] =
    useState({});

  const [locationMap, setLocationMap] =
    useState({});

  // FETCH AGENT ORDERS
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

      // REMOVE DUPLICATE ORDERS

      const uniqueOrders =
        Array.from(

          new Map(

            data.map((item) => [

              item.order.id,

              item

            ])

          ).values()

        );

      setOrders(uniqueOrders);

    } catch (error) {

      console.log(
        "Fetch error:",
        error
      );
    }
  };

  useEffect(() => {

    fetchOrders();

  }, []);

  // UPDATE STATUS
  const updateStatus = async (
    orderId
  ) => {

    const token =
      localStorage.getItem(
        "accessToken"
      );

    try {

      const response =
        await fetch(
          "http://localhost:9090/agent/update-status",
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

              status:
                statusMap[orderId],

              location:
                locationMap[orderId]
            })
          }
        );

      if (!response.ok) {

        throw new Error(
          "Status update failed"
        );
      }

      alert(
        "✅ Status Updated"
      );

      fetchOrders();

    } catch (error) {

      console.log(error);

      alert(
        "❌ Failed to update"
      );
    }
  };

  return (

    <>
      <Navbar />

      <div className="dashboard-container">

        <RoleSidebar />

        <div className="dashboard-content">

          <h1>
            🚚 Update Order Status
          </h1>

          {orders.length === 0 && (

            <p>
              No assigned orders
            </p>

          )}

          {orders.map((item) => {

            const order =
              item.order;

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

                <p>
                  👤 Customer:
                  {" "}
                  {order.user?.name}
                </p>

                <p>
                  📞 Phone:
                  {" "}
                  {order.phoneNumber}
                </p>

                <p>
                  📍 Pickup:
                  {" "}
                  {order.pickupAddress}
                </p>

                <p>
                  📍 Delivery:
                  {" "}
                  {order.deliveryAddress}
                </p>

                <p>
                  📦 Current Status:
                  {" "}

                  <strong>
                    {order.status}
                  </strong>
                </p>

                <br />

                {/* STATUS */}

                <select
                  value={
                    statusMap[
                      order.id
                    ] || ""
                  }

                  onChange={(e) =>
                    setStatusMap({
                      ...statusMap,

                      [order.id]:
                        e.target.value
                    })
                  }
                >

                  <option value="">
                    Select Status
                  </option>

                  <option value="CONFIRMED">
                    CONFIRMED
                  </option>

                  <option value="ASSIGNED">
                    ASSIGNED
                  </option>

                  <option value="SHIPPED">
                    SHIPPED
                  </option>

                  <option value="OUT_FOR_DELIVERY">
                    OUT FOR DELIVERY
                  </option>

                  <option value="DELIVERED">
                    DELIVERED
                  </option>

                </select>

                <br />
                <br />

                {/* LOCATION */}

                <input
                  type="text"

                  placeholder="Current Location"

                  value={
                    locationMap[
                      order.id
                    ] || ""
                  }

                  onChange={(e) =>
                    setLocationMap({
                      ...locationMap,

                      [order.id]:
                        e.target.value
                    })
                  }
                />

                <br />
                <br />

                <button
                  onClick={() =>
                    updateStatus(
                      order.id
                    )
                  }
                >

                  ✅ Update Status

                </button>

              </div>

            );

          })}

        </div>

      </div>
    </>
  );
}

export default UpdateOrderStatus;