import React from "react";

// components
import AdminSidebar from "components/Sidebar/AdminSidebar.js";
import MinistryStats from "../../components/Headers/AdminHeaders/MinistryStats";
import MinistryNavbar from "../../components/Navbars/AdminNavbars/MinistryNavbar";

export default function AdminMinistry({ children }) {

    return (
        <>
            <AdminSidebar />
            {/* AddMinistry */}
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
