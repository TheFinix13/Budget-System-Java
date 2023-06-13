import React from "react";

// components
import AdminSidebar from "components/Sidebar/AdminSidebar.js";
import DepartmentDataStats from "../../components/Headers/AdminHeaders/DepartmentDataStats";

export default function AdminDepartmentData({ children }) {

    return (
        <>
            <AdminSidebar />

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
