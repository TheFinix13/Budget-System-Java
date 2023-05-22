import React from "react";

// components
import ApproverNavbar from "components/Navbars/DashboardNavbar.js";
import ApproverSidebar from "../components/Sidebar/ApproverSidebar";
import DashboardStats from "../components/Headers/DashboardStats";

export default function ApproverDashboard({ children }) {
    return (
        <>
            <ApproverSidebar />

            <div className="relative md:ml-64 bg-blueGray-100">
                <ApproverNavbar />

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
