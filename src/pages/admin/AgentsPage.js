import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/AdminSidebar";

function AgentsPage() {

  const [agents, setAgents] = useState([]);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {

    const token = localStorage.getItem("accessToken");

    const res = await fetch(
      "http://localhost:9090/api/admin/agents",
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    const data = await res.json();

console.log(data);

setAgents(Array.isArray(data) ? data : []);
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-container">

        <AdminSidebar />

        <div className="dashboard-content">

          <h1>👨‍✈️ Agents</h1>

          {agents.map(agent => (

            <div key={agent.id} className="order-card">

              <h3>{agent.name}</h3>
              <p>{agent.email}</p>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}

export default AgentsPage;