import React from "react";

// components
import ApproverNavbar from "components/navbars/approverNavbars/dashboardNavbar.js";
import ApproverSidebar from "../../components/sidebar/approverSidebar";
import DashboardStats from "../../components/headers/approverHeaders/dashboardStats";

export default function ApproverDashboard({ children }) {
    return (
        <>
            <ApproverSidebar />

            <div className="relative md:ml-64 bg-blueGray-100">
                <ApproverNavbar />

                 {/*Header */}
                <DashboardStats />


                {/* Body */}
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    {children}
                </div>

            </div>
        </>
    );
}
