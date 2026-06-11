import React, {
  useEffect,
  useState,
  useCallback
} from "react";

import { useParams } from "react-router-dom";

import Navbar from "../../components/Navbar";
import CustomerSidebar from "../../components/CustomerSidebar";

function TrackOrderPage() {

  const { id } = useParams();

  const [trackingList, setTrackingList] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const steps = [
    "PLACED",
    "CONFIRMED",
    "ASSIGNED",
    "SHIPPED",
    "OUT_FOR_DELIVERY",
    "DELIVERED"
  ];

  // FETCH TRACKING

  const fetchTracking =
    useCallback(async () => {

      const token =
        localStorage.getItem(
          "accessToken"
        );

      try {

        const res = await fetch(
          `http://localhost:9090/customer/track/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        const data =
          await res.json();

        setTrackingList(
          Array.isArray(data)
            ? data
            : []
        );

        setLoading(false);

      } catch (err) {

        console.log(err);

        setLoading(false);
      }

    }, [id]);

  // LIVE UPDATE

  useEffect(() => {

    fetchTracking();

    const interval =
      setInterval(() => {

        fetchTracking();

      }, 2000);

    return () =>
      clearInterval(interval);

  }, [fetchTracking]);

  // CURRENT STATUS

  // 🔥 GET HIGHEST STATUS BASED ON STEPS ORDER (SAFE & RELIABLE)

// 🔥 USE ORDER STATUS AS SOURCE OF TRUTH (FIX)

const orderStatus =
  trackingList?.[0]?.order?.status || "PLACED";

const currentIndex =
  steps.indexOf(orderStatus);

// product name
const productName =
  trackingList?.[0]?.order?.productName || "Order";


  return (

    <>
      <Navbar />

      <div className="dashboard-container">

        <CustomerSidebar />

        <div className="dashboard-content">

          <h1
            style={{
              color: "white",
              marginBottom: "30px"
            }}
          >

            📍 Tracking:
            {" "}

            <span
              style={{
                color: "#00d9ff"
              }}
            >

              {productName}

            </span>

          </h1>

          {loading && (
            <p>Loading...</p>
          )}

          {!loading && (

            <div className="tracking-card">

              <div className="timeline-container">

                {steps.map((
                  step,
                  index
                ) => {

                  const active =
                    index <= currentIndex;

                  const stepTracking =
                    trackingList.find(
                      (t) =>
                        t.status ===
                        step
                    );

                  return (

                    <div
                      key={step}
                      className="timeline-item"
                    >

                      {/* LINE */}

                      {index !==
                        steps.length - 1 && (

                        <div
                          className={`timeline-line ${
                            active
                              ? "active-line"
                              : ""
                          }`}
                        ></div>

                      )}

                      {/* CIRCLE */}

                      <div
                        className={`timeline-circle ${
                          active
                            ? "active-circle"
                            : ""
                        }`}
                      >

                        {active
                          ? "✓"
                          : ""}

                      </div>

                      {/* CONTENT */}

                      <div className="timeline-content">

                        <h3>

                          {step.replaceAll(
                            "_",
                            " "
                          )}

                        </h3>

                        {stepTracking && (

                          <small>

                            📍
                            {" "}

                            {stepTracking.location}

                            <br />

                            🕒
                            {" "}

                            {new Date(
                              stepTracking.updatedAt
                            ).toLocaleString()}

                          </small>

                        )}

                      </div>

                    </div>

                  );

                })}

              </div>

            </div>

          )}

        </div>

      </div>

      {/* CSS */}

      <style>{`

        .tracking-card {

          background: #0f172a;

          padding: 40px;

          border-radius: 24px;

          box-shadow:
            0 15px 40px rgba(0,0,0,0.4);
        }

        .timeline-container {

          position: relative;

          margin-left: 20px;
        }

        .timeline-item {

          position: relative;

          display: flex;

          align-items: flex-start;

          margin-bottom: 60px;
        }

        /* LINE */

        .timeline-line {

          position: absolute;

          left: 18px;

          top: 38px;

          width: 5px;

          height: 75px;

          background: #334155;

          border-radius: 20px;
        }

        .active-line {

          background:
            linear-gradient(
              to bottom,
              #00d9ff,
              #38bdf8
            );

          box-shadow:
            0 0 15px #00d9ff,
            0 0 30px #00d9ff;

          animation:
            glowMove 1.5s infinite;
        }

        @keyframes glowMove {

          0% {

            filter: brightness(1);
          }

          50% {

            filter: brightness(1.7);
          }

          100% {

            filter: brightness(1);
          }
        }

        /* CIRCLE */

        .timeline-circle {

          width: 40px;

          height: 40px;

          border-radius: 50%;

          background: #334155;

          display: flex;

          align-items: center;

          justify-content: center;

          color: white;

          font-weight: bold;

          z-index: 2;

          transition: 0.4s;
        }

        .active-circle {

          background: #00d9ff;

          color: #001018;

          box-shadow:
            0 0 15px #00d9ff,
            0 0 35px #00d9ff;

          animation:
            pulse 1.5s infinite;
        }

        @keyframes pulse {

          0% {

            transform: scale(1);
          }

          50% {

            transform: scale(1.08);
          }

          100% {

            transform: scale(1);
          }
        }

        /* TEXT */

        .timeline-content {

          margin-left: 24px;

          margin-top: 2px;
        }

        .timeline-content h3 {

          color: white;

          margin: 0;

          font-size: 18px;
        }

        .timeline-content small {

          color: #94a3b8;

          line-height: 1.6;
        }

      `}</style>

    </>
  );
}

export default TrackOrderPage;