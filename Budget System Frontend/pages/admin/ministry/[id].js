import React from "react";

// components
import AddDepartment from "./addDepartment";

// layout for page
import AdminMinistryData from "../../../layouts/adminLayouts/adminMinistryData";
import DepartmentTable from "../../../components/cards/departmentTable";

export default function Id() {

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

Id.layout = AdminMinistryData;