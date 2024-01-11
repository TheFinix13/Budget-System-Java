import React from "react";

// components
import AdminSidebar from "components/sidebar/adminSidebar.js";
import DivisionNavbar from "components/navbars/adminNavbars/divisionNavbar";
import DivisionStats from "../../components/headers/adminHeaders/divisionStats";

export default function AdminDivision({ children }) {

    return (
        <>
            <AdminSidebar />

            <div className="relative md:ml-64 bg-blueGray-100">
                <DivisionNavbar/>

                {/* Header */}
                <DivisionStats />

                {/* Body */}
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    {/*<AllDepartmentTable/>*/}
                    {children}
                </div>
            </div>
        </>
    );
}