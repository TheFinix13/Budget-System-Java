import React from "react";

// components
import AdminNavbar from "components/Navbars/AdminNavbars/DashboardNavbar.js";
import AdminSidebar from "components/Sidebar/AdminSidebar.js";
import DashboardStats from "components/Headers/AdminHeaders/DashboardStats.js";

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
