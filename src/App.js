import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// AUTH
import Login from "./pages/Login";
import Register from "./pages/Register";

// LANDING
import HomePage from "./pages/HomePage";

// DASHBOARDS
import AdminDashboard from "./pages/AdminDashboard";
import AgentDashboard from "./pages/AgentDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";

// CUSTOMER PAGES
import CreateOrderPage from "./pages/customer/CreateOrderPage";
import OrdersPage from "./pages/customer/OrdersPage";
import TrackOrderPage from "./pages/customer/TrackOrderPage";

// AGENT PAGES
import AgentOrders from "./pages/agent/AssignedOrders";
import AgentUpdate from "./pages/agent/UpdateOrderStatus";
import AgentHistory from "./pages/agent/OrderHistory";

// ADMIN PAGES
import AdminOrdersPage from "./pages/admin/OrdersPage";
import AssignOrdersPage from "./pages/admin/AssignOrdersPage";
import AgentsPage from "./pages/admin/AgentsPage";
import AnalyticsPage from "./pages/admin/AnalyticsPage";

// SECURITY
import ProtectedRoute from "./components/ProtectedRoute";

import RegisterAgent from "./pages/RegisterAgent";

function App() {

  return (
    <BrowserRouter>
      <Routes>

        {/* ================= LANDING ================= */}
        <Route path="/" element={<HomePage />} />

        {/* ================= AUTH ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= DASHBOARDS ================= */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/agent"
          element={
            <ProtectedRoute allowedRoles={["AGENT"]}>
              <AgentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer"
          element={
            <ProtectedRoute allowedRoles={["CUSTOMER"]}>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= CUSTOMER ================= */}

        <Route
          path="/customer/create"
          element={
            <ProtectedRoute allowedRoles={["CUSTOMER"]}>
              <CreateOrderPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer/orders"
          element={
            <ProtectedRoute allowedRoles={["CUSTOMER"]}>
              <OrdersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer/track/:id"
          element={
            <ProtectedRoute allowedRoles={["CUSTOMER"]}>
              <TrackOrderPage />
            </ProtectedRoute>
          }
        />

        {/* ================= AGENT ================= */}

        <Route
          path="/agent/orders"
          element={
            <ProtectedRoute allowedRoles={["AGENT"]}>
              <AgentOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/agent/update"
          element={
            <ProtectedRoute allowedRoles={["AGENT"]}>
              <AgentUpdate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/agent/history"
          element={
            <ProtectedRoute allowedRoles={["AGENT"]}>
              <AgentHistory />
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN ================= */}

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminOrdersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/assign"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AssignOrdersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/agents"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AgentsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AnalyticsPage />
            </ProtectedRoute>
          }
        />

        <Route
  path="/admin/register-agent"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <RegisterAgent />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;