import React from "react";

// components
import AdminSidebar from "components/sidebar/adminSidebar.js";
import DepartmentNavbar from "../../components/navbars/adminNavbars/departmentNavbar";
import DepartmentStats from "../../components/headers/adminHeaders/departmentStats";

export default function AdminDepartment({ children }) {

    return (
        <>
            <AdminSidebar />

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