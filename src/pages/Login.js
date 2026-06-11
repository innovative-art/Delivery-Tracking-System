import React, { useState } from "react";
import "../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {

    try {

      const data = await loginUser(formData);

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("role", data.role);

      alert("Login successful");

      // ROLE BASED REDIRECT
      if (data.role === "ADMIN") {
        navigate("/admin");
      }

      else if (data.role === "AGENT") {
        navigate("/agent");
      }

      else {
        navigate("/customer");
      }

    } catch (error) {

      console.log(error);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">

      <div className="glow-circle"></div>

      <div className="auth-card">

        <h1>🚑 RescueNet AI</h1>

        <p className="subtitle">
          Smart Emergency Delivery System
        </p>

        <input
          type="email"
          placeholder="Enter email"
          name="email"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Enter password"
          name="password"
          onChange={handleChange}
        />

        <button onClick={handleLogin}>
          Login
        </button>

        <p className="switch-text">
          New user? <Link to="/register">Create account</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;