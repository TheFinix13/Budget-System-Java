import React from "react";

// components
import DepartmentStats from "../../components/headers/ministryHeaders/departmentStats";
import MinistrySidebar from "../../components/sidebar/ministrySidebar";

export default function MinistryDepartment({ children }) {

    return (
        <>
            <MinistrySidebar />

            <div className="relative md:ml-64 bg-blueGray-100">

                {/* Header */}
                <DepartmentStats />

                {/* Body */}
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    {children}
                </div>
            </div>
        </>
    );
}