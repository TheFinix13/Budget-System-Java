import React from "react";

// components
import SuperAdminSidebar from "../../components/Sidebar/SuperAdminSidebar";
import SuperDashboardStats from "../../components/Headers/SuperAdminHeaders/SuperDashboardStats";
import SuperDashboardNavbar from "../../components/Navbars/SuperAdminNavbars/SuperDashboardNavbar";

export default function SuperAdminDashboard({children}) {
    return (
        <>
            <SuperAdminSidebar/>

            <div className="relative md:ml-64 bg-blueGray-100">
                <SuperDashboardNavbar/>

                {/* Header */}
                <SuperDashboardStats/>

                {/* Body */}
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    {children}
                </div>

            </div>
        </>
    );
}
