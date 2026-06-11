import React from "react";
import { useNavigate } from "react-router-dom";
import CustomerSidebar from "../../components/CustomerSidebar";
import Navbar from "../../components/Navbar";

function QuickAccessPage() {

  const navigate = useNavigate();

  const selectType = (type) => {

    navigate("/customer/order-form", {
      state: { type }
    });

  };

  return (
    <>
      <Navbar />

      <div className="dashboard-container">

        <CustomerSidebar />

        <div className="dashboard-content">

          <h1 className="dashboard-title">
            ⚡ Quick Access
          </h1>

          <p className="welcome-text">
            Select emergency type to continue
          </p>

          <div className="dashboard-grid">

            <div onClick={() => selectType("Emergency Medicine")} className="dashboard-card">
              Emergency Medicine
            </div>

            <div onClick={() => selectType("Blood Delivery")} className="dashboard-card">
              Blood Delivery
            </div>

            <div onClick={() => selectType("Oxygen Cylinder")} className="dashboard-card">
              Oxygen Cylinder
            </div>

            <div onClick={() => selectType("Ambulance Support")} className="dashboard-card">
              Ambulance Support
            </div>

            <div onClick={() => selectType("Medical Equipment")} className="dashboard-card">
              Medical Equipment
            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default QuickAccessPage;