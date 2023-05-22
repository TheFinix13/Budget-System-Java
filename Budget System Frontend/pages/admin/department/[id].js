import React from "react";

// components
import AddDivision from "./AddDivision";

// layout for page
import AdminDepartmentData from "../../../layouts/AdminDepartmentData";
import AddBudgetRequest from "./AddBudgetRequest";


export default function DepartmentData() {

    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full lg:w-8/12 px-4">
                    <AddDivision/>
                </div>
                <div className="w-full mb-12 px-4">
                    {/*<DivisionTable />*/}
                    <AddBudgetRequest/>
                </div>
            </div>
        </>
    );
}

DepartmentData.layout = AdminDepartmentData;