import React from "react";
import "../styles/customer.css";

function QuickSuggestions({ setTitle }) {

  const suggestions = [
    "Emergency Medicine",
    "Blood Delivery",
    "Ambulance Support",
    "Oxygen Cylinder",
    "Medical Equipment"
  ];

  return (

    <div className="suggestions">

      <h3>Quick Rescue Services</h3>

      <div className="suggestion-grid">

        {suggestions.map((item, index) => (

          <div
            key={index}
            className="suggestion-card"
            onClick={() => setTitle(item)}
          >
            {item}
          </div>
        ))}

      </div>

    </div>
  );
}

export default QuickSuggestions;