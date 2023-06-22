import React from "react";

// components
import AddDepartment from "./AddDepartment";

// layout for page
import AdminMinistryData from "../../../layouts/AdminLayouts/AdminMinistryData";
import DepartmentTable from "../../../components/Cards/DepartmentTable";

export default function MinistryData() {

    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full lg:w-8/12 px-4">
                    <AddDepartment/>
                </div>
                <div className="w-full mb-12 px-4">
                    <DepartmentTable/>
                </div>
            </div>
        </>
    );
}

MinistryData.layout = AdminMinistryData;