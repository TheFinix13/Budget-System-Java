import React from "react";

// components
import SuperMinistryNavbar from "../../components/Navbars/SuperAdminNavbars/SuperMinistryNavbar";
import SuperMinistryStats from "../../components/Headers/SuperAdminHeaders/SuperMinistryStats";
import SuperAdminSidebar from "../../components/Sidebar/SuperAdminSidebar";

export default function SuperAdminMinistry({children}) {

    return (
        <>
            <SuperAdminSidebar/>
            {/* AddMinistry */}
            <div className="relative md:ml-64 bg-blueGray-100">
                <SuperMinistryNavbar/>

                {/* Header */}
                <SuperMinistryStats/>

                {/* Body */}
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    {children}
                </div>
            </div>
        </>
    );
}
