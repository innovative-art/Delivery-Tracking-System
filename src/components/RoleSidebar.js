import React from "react";

import CustomerSidebar from "./CustomerSidebar";
import AgentSidebar from "./AgentSidebar";
import AdminSidebar from "./AdminSidebar";

function RoleSidebar() {

  const role = localStorage.getItem("role");

  if (role === "CUSTOMER") return <CustomerSidebar />;

  if (role === "AGENT") return <AgentSidebar />;

  if (role === "ADMIN") return <AdminSidebar />;

  return null;
}

export default RoleSidebar;