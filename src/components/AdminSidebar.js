import { useNavigate } from "react-router-dom";

import "../styles/sidebar.css";

function AdminSidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (

    <div className="sidebar">

      <div className="sidebar-logo">
        🧠 Admin Panel
      </div>

      <ul>


<li
          onClick={() =>
            navigate("/admin")
          }
        >
          🏠 Admin Dashboard
        </li>

        <li
          onClick={() =>
            navigate("/admin/orders")
          }
        >
          📦 All Orders
        </li>

        <li
          onClick={() =>
            navigate("/admin/assign")
          }
        >
          🚚 Assign Orders
        </li>

        <li
          onClick={() =>
            navigate("/admin/agents")
          }
        >
          👨‍✈️ Agents List
        </li>

        <li
          onClick={() =>
            navigate("/admin/register-agent")
          }
        >
          👨‍✈️ Add Agent
        </li>

        <li onClick={handleLogout}>
          🚪 Logout
        </li>

      </ul>

    </div>
  );
}

export default AdminSidebar;