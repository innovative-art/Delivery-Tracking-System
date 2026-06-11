import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

function AgentRegister() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "AGENT"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const registerAgent = async () => {

    try {

      const res = await fetch(
        "http://localhost:9090/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        }
      );

      if (!res.ok) {
        throw new Error("Registration failed");
      }

      alert("✅ Agent Registered Successfully");

      navigate("/admin");

    } catch (err) {

      console.log(err);
      alert("❌ Error registering agent");
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1>👨‍✈️ Register Agent</h1>

        <input
          name="name"
          placeholder="Agent Name"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        {/* ROLE FIXED AS AGENT */}
        <input
          value="AGENT"
          disabled
          style={{
            background: "#ddd",
            color: "#000"
          }}
        />

        <button onClick={registerAgent}>
          Register Agent
        </button>

      </div>

    </div>
  );
}

export default AgentRegister;