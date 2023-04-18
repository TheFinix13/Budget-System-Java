import React from "react";

// components

import AdminNavbar from "components/Navbars/DashboardNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import DashboardStats from "components/Headers/DashboardStats.js";

export default function AdminDashboard({ children }) {
  return (
    <>
      <Sidebar />

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
