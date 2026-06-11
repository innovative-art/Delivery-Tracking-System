import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomerSidebar from "../../components/CustomerSidebar";
import Navbar from "../../components/Navbar";

function CreateOrderPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedType = location.state?.type || "";

  const [form, setForm] = useState({
    productName: selectedType,
    description: "",
    deliveryAddress: "",
    phoneNumber: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const selectQuickType = (type) => {
    setForm({ ...form, productName: type });
  };

  const placeOrder = async () => {
    const token = localStorage.getItem("accessToken");

    const payload = {
      productName: form.productName,
      description: form.description,
      deliveryAddress: form.deliveryAddress,
      phoneNumber: form.phoneNumber
    };

    await fetch("http://localhost:9090/api/customer/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    alert("🚑 Order Placed Successfully");
    navigate("/customer/orders");
  };

  return (
    <>
      <Navbar />

      <div className="page-wrapper">

        <CustomerSidebar />

        {/* MAIN CONTENT */}
        <div className="main-content">

          <h1 className="title">🚑 Create Emergency Order</h1>

          {/* QUICK ACCESS */}
          <div className="quick-access">
            <button onClick={() => selectQuickType("Emergency Medicine")}>Medicine</button>
            <button onClick={() => selectQuickType("Blood Delivery")}>Blood</button>
            <button onClick={() => selectQuickType("Oxygen Cylinder")}>Oxygen</button>
            <button onClick={() => selectQuickType("Ambulance Support")}>Ambulance</button>
            <button onClick={() => selectQuickType("Medical Equipment")}>Equipment</button>
          </div>

          {/* CENTER FORM */}
          <div className="form-wrapper">

            <div className="form-card">

              <label>Product Name</label>
              <input
                name="productName"
                value={form.productName}
                onChange={handleChange}
                placeholder="Select from quick access or type"
              />

              <label>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe emergency requirement"
              />

              {/* <label>Pickup Address</label>
              <input
                name="pickupAddress"
                value={form.pickupAddress}
                onChange={handleChange}
              /> */}

              <label>Delivery Address</label>
              <input
                name="deliveryAddress"
                value={form.deliveryAddress}
                onChange={handleChange}
              />

              <label>Phone Number</label>
              <input
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
              />

              <div className="payment">
                💰 Payment Mode: <b>Cash on Delivery</b>
              </div>

              <button onClick={placeOrder}>
                🚑 Proceed to Place Order
              </button>

            </div>

          </div>

        </div>
      </div>

      {/* INLINE CSS */}
      <style>{`
        .page-wrapper {
          display: flex;
          background: #f4f6fb;
          min-height: 100vh;
        }

        .main-content {
          flex: 1;
          padding: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .title {
          font-size: 26px;
          font-weight: 600;
          margin-bottom: 15px;
          color: #1f2937;
        }

        /* QUICK ACCESS */
        .quick-access {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 25px;
        }

        .quick-access button {
          padding: 8px 14px;
          border-radius: 20px;
          border: none;
          background: #2563eb;
          color: white;
          cursor: pointer;
          font-size: 13px;
          transition: 0.2s;
        }

        .quick-access button:hover {
          background: #1d4ed8;
        }

        /* FORM CENTER WRAPPER */
        .form-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .form-card {
          width: 100%;
          max-width: 520px;
          background: white;
          padding: 25px;
          border-radius: 14px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        }

        .form-card label {
          display: block;
          margin-top: 12px;
          margin-bottom: 6px;
          font-size: 13px;
          color: #374151;
          font-weight: 600;
        }

        .form-card input,
        .form-card textarea {
          width: 100%;
          padding: 10px 12px;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          outline: none;
          font-size: 14px;
          background: #fafafa;
        }

        .form-card textarea {
          min-height: 80px;
          resize: none;
        }

        .payment {
          margin-top: 15px;
          padding: 10px;
          background: #1a4571;
          border-radius: 10px;
          font-size: 14px;
        }

        .form-card button {
          width: 100%;
          margin-top: 18px;
          padding: 12px;
          border: none;
          border-radius: 10px;
          background: #16a34a;
          color: white;
          font-size: 15px;
          cursor: pointer;
          transition: 0.2s;
        }

        .form-card button:hover {
          background: #15803d;
        }
      `}</style>
    </>
  );
}

export default CreateOrderPage;