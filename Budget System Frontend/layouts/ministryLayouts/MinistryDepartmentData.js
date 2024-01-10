import React from "react";

// components
import DepartmentDataStats from "../../components/headers/ministryHeaders/departmentDataStats";
import MinistrySidebar from "../../components/sidebar/ministrySidebar";

export default function MinistryDepartmentData({ children }) {

    return (
        <>
            <MinistrySidebar />

            <div className="relative md:ml-64 bg-blueGray-100">

                {/* Header */}
                <DepartmentDataStats />

                {/*Body*/}
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    {children}
                </div>
            </div>
        </>
    );
}
