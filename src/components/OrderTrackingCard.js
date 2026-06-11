import React from "react";
import "../styles/customer.css";

function OrderTrackingCard({ order }) {

  const statuses = [
    "PLACED",
    "CONFIRMED",
    "ASSIGNED",
    "SHIPPED",
    "OUT_FOR_DELIVERY",
    "DELIVERED"
  ];

  return (

    <div className="tracking-card">

      <h2>{order.title}</h2>

      <p>{order.description}</p>

      <div className="tracking-timeline">

        {statuses.map((step, index) => {

          const active =
            statuses.indexOf(order.status)
            >= index;

          return (

            <div
              className="track-step"
              key={index}
            >

              <div className={
                active
                  ? "track-circle active"
                  : "track-circle"
              }></div>

              <p>{step}</p>

              {active && (
                <small>
                  {new Date(order.updatedAt)
                    .toLocaleString()}
                </small>
              )}

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default OrderTrackingCard;