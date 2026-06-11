import React from "react";
import "../styles/customer.css";

function OrderHistoryCard({ order }) {

  return (

    <div className="history-card">

      <div className="history-top">

        <h2>{order.title}</h2>

        <span className="status-badge">
          {order.status}
        </span>

      </div>

      <p>{order.description}</p>

      <div className="history-footer">

        <span>
          Ordered:
        </span>

        <span>
          {new Date(order.createdAt)
            .toLocaleString()}
        </span>

      </div>

    </div>
  );
}

export default OrderHistoryCard;