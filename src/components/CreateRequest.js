import React, { useState } from "react";
import "../styles/request.css";

function CreateRequest() {

  const [request, setRequest] = useState({
    title: "",
    description: ""
  });

  const handleChange = (e) => {
    setRequest({
      ...request,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {

    console.log(request);

    alert("Rescue Request Created");

    setRequest({
      title: "",
      description: ""
    });
  };

  return (

    <div className="request-form">

      <h2>Create Rescue Request</h2>

      <input
        type="text"
        placeholder="Request Title"
        name="title"
        value={request.title}
        onChange={handleChange}
      />

      <textarea
        placeholder="Describe emergency situation..."
        name="description"
        value={request.description}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>
        Submit Request
      </button>

    </div>
  );
}

export default CreateRequest;