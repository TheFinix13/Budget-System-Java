import React from "react";

// components
// layout for page
import MinistryDepartment from "../../../layouts/MinistryLayouts/MinistryDepartment";
import AddDepartmentInMinistry from "./AddDepartmentInMinistry";

export default function Department() {

    return (
        <>
            <div className="flex flex-wrap">
                <AddDepartmentInMinistry/>
            </div>
        </>
    );
}

Department.layout = MinistryDepartment;
