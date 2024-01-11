import React from "react";

// components
import DashboardStats from "components/headers/ministryHeaders/dashboardStats.js";
import DashboardNavbar from "../../components/navbars/ministryNavbars/navbar";
import MinistrySidebar from "../../components/sidebar/ministrySidebar";

export default function MinistryDashboard({ children }) {
    return (
        <>
            <MinistrySidebar />

            <div className="relative md:ml-64 bg-blueGray-100">
                <DashboardNavbar />

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
