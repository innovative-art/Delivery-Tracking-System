import React from "react";
import "../styles/timeline.css";

function TrackingTimeline({ status }) {

  const steps = [
    "REQUESTED",
    "ACCEPTED",
    "IN_PROGRESS",
    "COMPLETED"
  ];

  return (

    <div className="timeline">

      {steps.map((step, index) => {

        const active =
          steps.indexOf(status) >= index;

        return (

          <div
            className="timeline-step"
            key={index}
          >

            <div className={
              active
                ? "circle active"
                : "circle"
            }>
            </div>

            <p>{step}</p>

          </div>
        );
      })}

    </div>
  );
}

export default TrackingTimeline;