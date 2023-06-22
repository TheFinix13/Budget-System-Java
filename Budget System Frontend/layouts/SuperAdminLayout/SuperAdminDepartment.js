import React from "react";

// components
import SuperAdminSidebar from "../../components/Sidebar/SuperAdminSidebar";
import SuperDepartmentNavbar from "../../components/Navbars/SuperAdminNavbars/SuperDepartmentNavbar";
import SuperDepartmentStats from "../../components/Headers/SuperAdminHeaders/SuperDepartmentStats";

export default function SuperAdminDepartment({children}) {

    return (
        <>
            <SuperAdminSidebar/>

            <div className="relative md:ml-64 bg-blueGray-100">
                <SuperDepartmentNavbar/>

                {/* Header */}
                <SuperDepartmentStats/>

                {/* Body */}
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    {children}
                </div>
            </div>
        </>
    );
}