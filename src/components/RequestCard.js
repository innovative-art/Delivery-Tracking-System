import React from "react";
import TrackingTimeline from "./TrackingTimeline";
import "../styles/request.css";

function RequestCard({ request }) {

  return (

    <div className="request-card">

      <h2>{request.title}</h2>

      <p>{request.description}</p>

      <span className="status">
        {request.status}
      </span>

      <TrackingTimeline
        status={request.status}
      />

    </div>
  );
}

export default RequestCard;