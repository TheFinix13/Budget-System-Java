import React from "react";

// components
import DivisionNavbar from "components/Navbars/MinistryNavbars/DivisionNavbar";
import DivisionStats from "../../components/Headers/MinistryHeaders/DivisionStats";
import MinistrySidebar from "../../components/Sidebar/MinistrySidebar";

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