import React, { useState } from "react";
import "../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "CUSTOMER"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ✅ FRONTEND VALIDATION ADDED
  const validateForm = () => {

    if (!formData.name.trim()) {
      alert("Name is required");
      return false;
    }

    if (!formData.email.trim()) {
      alert("Email is required");
      return false;
    }

    if (!formData.password.trim()) {
      alert("Password is required");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {

    // ❌ STOP IF VALIDATION FAILS
    if (!validateForm()) return;

    try {

      const response = await registerUser({
        ...formData,
        role: formData.role.toUpperCase()
      });

      console.log("REGISTER SUCCESS:", response);

      alert("Registration Successful");

      navigate("/login");

    } catch (error) {

      console.log("REGISTER ERROR FULL:", error);

      // ✅ CLEAN BACKEND ERROR HANDLING
      const backendMessage =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed";

      console.log("BACKEND MESSAGE:", backendMessage);

      alert(backendMessage);
    }
  };

  return (
    <div className="auth-container">

      <div className="glow-circle"></div>

      <div className="auth-card">

        <h1>🚑 Join RescueNet</h1>

        <p className="subtitle">
          AI Powered Rescue Delivery
        </p>

        <input
          type="text"
          placeholder="Full name"
          name="name"
          onChange={handleChange}
        />

        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />

        <select
          name="role"
          onChange={handleChange}
        >
          <option value="CUSTOMER">CUSTOMER</option>
        </select>

        <button onClick={handleRegister}>
          Register
        </button>

        <p className="switch-text">
          Already have account? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;