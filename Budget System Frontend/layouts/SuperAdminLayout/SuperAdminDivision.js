import React from "react";

// components
import SuperAdminSidebar from "../../components/Sidebar/SuperAdminSidebar";
import SuperDivisionNavbar from "../../components/Navbars/SuperAdminNavbars/SuperDivisionNavbar";
import SuperDivisionStats from "../../components/Headers/SuperAdminHeaders/SuperDivisionStats";

export default function SuperAdminDivision({children}) {

    return (
        <>
            <SuperAdminSidebar/>

            <div className="relative md:ml-64 bg-blueGray-100">
                <SuperDivisionNavbar/>

                {/* Header */}
                <SuperDivisionStats/>

                {/* Body */}
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    {/*<AllDepartmentTable/>*/}
                    {children}
                </div>
            </div>
        </>
    );
}