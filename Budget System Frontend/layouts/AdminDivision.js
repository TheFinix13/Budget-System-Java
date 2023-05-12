import React from "react";

// components
import Sidebar from "components/Sidebar/Sidebar.js";
import DivisionNavbar from "components/Navbars/DivisionNavbar";
import DivisionStats from "../components/Headers/DivisionStats";

export default function AdminDivision({ children }) {

    return (
        <>
            <Sidebar />

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