import React from "react";

// components
import AdminSidebar from "components/sidebar/adminSidebar.js";
import MinistryDataStats from "../../components/headers/adminHeaders/ministryDataStats";

export default function AdminMinistryData({ children }) {

    return (
        <>
            <AdminSidebar />

            <div className="relative md:ml-64 bg-blueGray-100">

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
