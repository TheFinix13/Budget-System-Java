import React from "react";

// components
import AdminNavbar from "components/navbars/adminNavbars/dashboardNavbar.js";
import AdminSidebar from "components/sidebar/adminSidebar.js";
import DashboardStats from "components/headers/adminHeaders/dashboardStats.js";

export default function AdminDashboard({ children }) {
  return (
    <>
      <AdminSidebar />

      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />

        {/* Header */}
        <DashboardStats />

        {/* Body */}
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
        </div>

      </div>
    </>
  );
}
