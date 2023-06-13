import React from "react";

// components
// layout for page
import MinistryDepartmentData from "../../../layouts/MinistryLayouts/MinistryDepartmentData";
import AddDivisionInMinistry from "./AddDivisionInMinistry";
import AddBudgetRequestInMinistry from "./AddBudgetRequestInMinistry";


export default function DepartmentData() {

    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full lg:w-8/12 px-4">
                    <AddDivisionInMinistry/>
                </div>
                <div className="w-full mb-12 px-4">
                    {/*<DivisionTable />*/}
                    <AddBudgetRequestInMinistry/>
                </div>
            </div>
        </>
    );
}

DepartmentData.layout = MinistryDepartmentData;