import React from "react";

// components
import AddDivision from "./AddDivision";

// layout for page
import AddBudgetRequest from "./AddBudgetRequest";
import SuperAdminDepartmentData from "../../../layouts/SuperAdminLayout/SuperAdminDepartmentData";


export default function DepartmentData() {

    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full lg:w-8/12 px-4">
                    <AddDivision/>
                </div>
                <div className="w-full mb-12 px-4">
                    <AddBudgetRequest/>
                </div>
            </div>
        </>
    );
}

DepartmentData.layout = SuperAdminDepartmentData;