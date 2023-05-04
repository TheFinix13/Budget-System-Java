import React, {useState} from "react";

// components
import Sidebar from "components/Sidebar/Sidebar.js";
import DepartmentNavbar from "../components/Navbars/DepartmentNavbar";
import DepartmentStats from "../components/Headers/DepartmentStats";

export default function AdminDepartment({ children }) {

    return (
        <>
            <Sidebar />

            <div className="relative md:ml-64 bg-blueGray-100">
                <DepartmentNavbar/>

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
