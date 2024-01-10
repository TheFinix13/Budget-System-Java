import React from "react";

// components
import ApproverSidebar from "../../components/sidebar/approverSidebar";
import RequestStats from "../../components/headers/approverHeaders/requestStats";
import RequestNavbar from "../../components/navbars/approverNavbars/requestNavbar";

export default function ApproverRequests({ children }) {
    return (
        <>
            <ApproverSidebar />

            <div className="relative md:ml-64 bg-blueGray-100">
                <RequestNavbar />

                {/* Header */}
                <RequestStats />

                {/* Body */}
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    {children}
                </div>

            </div>
        </>
    );
}
