import React from "react";

// components
import SuperAdminSidebar from "../../components/Sidebar/SuperAdminSidebar";
import SuperMinistryDataStats from "../../components/Headers/SuperAdminHeaders/SuperMinistryDataStats";
import SuperMinistryDataNavbar from "../../components/Navbars/SuperAdminNavbars/SuperMinistryDataNavbar";

export default function SuperAdminMinistryData({children}) {

    return (
        <>
            <SuperAdminSidebar/>

            <div className="relative md:ml-64 bg-blueGray-100">

                <SuperMinistryDataNavbar/>
                {/* Header */}
                <SuperMinistryDataStats/>

                {/*Body*/}
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    {children}
                </div>
            </div>
        </>
    );
}
