import React, {useEffect, useState} from "react";

// components
import AddDepartment from "./AddDepartment";

// layout for page
import AdminMinistryData from "../../../layouts/AdminMinistryData";

export default function MinistryData() {

    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12 px-4">
                    {/*<AddDepartment/>*/}
                </div>
            </div>
        </>
    );
}

MinistryData.layout = AdminMinistryData;
