import React from "react";

// components
import Sidebar from "components/Sidebar/Sidebar.js";
import MinistryDataNavbar from "../components/Navbars/MinistryDataNavbar";
import MinistryDataStats from "../components/Headers/MinistryDataStats";

export default function AdminMinistryData({ children }) {

    return (
        <>
            <Sidebar />

            <div className="relative md:ml-64 bg-blueGray-100">
                <MinistryDataNavbar/>

                {/* Header */}
                <MinistryDataStats />

                {/*Body*/}
                <div className="px-4 md:px-10 mx-auto w-full -m-24">

                    {children}
                </div>
            </div>
        </>
    );
}
