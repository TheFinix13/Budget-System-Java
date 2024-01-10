import React from "react";

// components
import AdminSidebar from "components/sidebar/adminSidebar.js";
import MinistryStats from "../../components/headers/adminHeaders/ministryStats";
import MinistryNavbar from "../../components/navbars/adminNavbars/ministryNavbar";

export default function AdminMinistry({ children }) {

    return (
        <>
            <AdminSidebar />

            <div className="relative md:ml-64 bg-blueGray-100">
                <MinistryNavbar/>

                {/* Header */}
                <MinistryStats />

                {/* Body */}
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    {children}
                </div>
            </div>
        </>
    );
}
