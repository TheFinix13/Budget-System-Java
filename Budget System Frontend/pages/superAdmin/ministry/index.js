import React from "react";

// components
import AddMinistry from "./AddMinistry";

// layout for page
import SuperAdminMinistry from "../../../layouts/SuperAdminLayout/SuperAdminMinistry";

export default function Index() {

    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12 px-4">
                    <AddMinistry/>
                </div>

            </div>
        </>
    );
}

Index.layout = SuperAdminMinistry;
