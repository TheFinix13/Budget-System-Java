import React from "react";

// components
import AddDepartment from "./AddDepartment";

// layout for page
import DepartmentTable from "../../../components/Cards/DepartmentTable";
import SuperAdminMinistryData from "../../../layouts/SuperAdminLayout/SuperAdminMinistryData";

export default function MinistryData() {

    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <DepartmentTable/>
                </div>
            </div>
        </>
    );
}

MinistryData.layout = SuperAdminMinistryData;