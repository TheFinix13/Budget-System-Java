import React from "react";

// components
import DivisionNavbar from "components/navbars/ministryNavbars/divisionNavbar";
import DivisionStats from "../../components/headers/ministryHeaders/divisionStats";
import MinistrySidebar from "../../components/sidebar/ministrySidebar";

export default function MinistryDivision({ children }) {

    return (
        <>
            <MinistrySidebar />

            <div className="relative md:ml-64 bg-blueGray-100">
                <DivisionNavbar/>

                {/* Header */}
                <DivisionStats />

                {/* Body */}
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    {children}
                </div>
            </div>
        </>
    );
}