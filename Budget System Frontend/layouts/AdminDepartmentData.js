import React from "react";

// components
import Sidebar from "components/Sidebar/Sidebar.js";
import DepartmentDataStats from "../components/Headers/DepartmentDataStats";
import DepartmentDataNavbar from "../components/Navbars/DepartmentDataNavbar";

export default function AdminDepartmentData({ children }) {

    return (
        <>
            <Sidebar />

            <div className="relative md:ml-64 bg-blueGray-100">
                <DepartmentDataNavbar/>

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
