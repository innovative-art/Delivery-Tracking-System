import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* HERO SECTION */}
      <div className="hero">

        <div className="overlay"></div>

        <div className="content">

          <h1>🚚 Smart Delivery Tracking System</h1>

          <p>
            Real-time tracking • Fast delivery • Agent coordination •
            Live status updates
          </p>

          <div className="buttons">
            <button onClick={() => navigate("/login")}>
              Login
            </button>

            <button
              className="register"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>

        </div>

      </div>

      {/* FEATURES SECTION */}
      <div className="features">

        <h2>✨ Why Choose Us</h2>

        <div className="grid">

          <div className="card">
            <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7" />
            <h3>Live Tracking</h3>
            <p>Track your order in real-time with status updates.</p>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1580674285054-bed31e145f59" />
            <h3>Fast Delivery</h3>
            <p>Optimized agent assignment ensures quick delivery.</p>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216" />
            <h3>Secure System</h3>
            <p>Role-based secure system for customers & agents.</p>
          </div>

        </div>

      </div>

      {/* INLINE CSS */}
      <style>{`

        .home {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          background: #0f172a;
          color: white;
        }

        /* HERO */
        .hero {
          height: 100vh;
          width: 100%;
          background: url("https://images.unsplash.com/photo-1600267147646-33b8b8c8a0f3") no-repeat center center/cover;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.6);
        }

        .content {
          position: relative;
          z-index: 2;
          max-width: 800px;
          padding: 20px;
        }

        .content h1 {
          font-size: 48px;
          margin-bottom: 15px;
          color: #00d9ff;
          text-shadow: 0 0 20px #00d9ff;
        }

        .content p {
          font-size: 18px;
          color: #cbd5e1;
          margin-bottom: 25px;
        }

        .buttons {
          display: flex;
          gap: 15px;
          justify-content: center;
        }

        .buttons button {
          padding: 12px 25px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-size: 16px;
          transition: 0.3s;
        }

        .buttons button:first-child {
          background: #2563eb;
          color: white;
        }

        .buttons button:first-child:hover {
          background: #1d4ed8;
        }

        .register {
          background: #000;
          color: white;
          border: 1px solid #334155;
        }

        .register:hover {
          background: #111;
        }

        /* FEATURES */
        .features {
          padding: 60px 20px;
          text-align: center;
          background: #0b1220;
        }

        .features h2 {
          font-size: 32px;
          margin-bottom: 40px;
          color: #38bdf8;
        }

        .grid {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .card {
          width: 300px;
          background: #111827;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0,0,0,0.4);
          transition: 0.3s;
        }

        .card:hover {
          transform: translateY(-10px);
        }

        .card img {
          width: 100%;
          height: 180px;
          object-fit: cover;
        }

        .card h3 {
          margin: 10px 0;
          color: #00d9ff;
        }

        .card p {
          font-size: 14px;
          color: #94a3b8;
          padding: 0 10px 20px;
        }

      `}</style>

    </div>
  );
}

export default HomePage;