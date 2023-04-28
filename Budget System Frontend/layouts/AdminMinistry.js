import React from "react";

// components
import Sidebar from "components/Sidebar/Sidebar.js";
import MinistryStats from "../components/Headers/MinistryStats";
import MinistryNavbar from "../components/Navbars/MinistryNavbar";

export default function AdminMinistry({ children }) {

    return (
        <>
            <Sidebar />
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