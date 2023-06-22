import React from "react";

// components
import SuperDepartmentDataStats from "../../components/Headers/SuperAdminHeaders/SuperDepartmentDataStats";
import SuperAdminSidebar from "../../components/Sidebar/SuperAdminSidebar";

export default function SuperAdminDepartmentData({children}) {

    return (
        <>
            <SuperAdminSidebar/>

            <div className="relative md:ml-64 bg-blueGray-100">

                {/* Header */}
                <SuperDepartmentDataStats/>

                {/*Body*/}
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    {children}
                </div>
            </div>
        </>
    );
}
