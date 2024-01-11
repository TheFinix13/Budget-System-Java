import React from "react";

// components
import ApproverSidebar from "../../components/sidebar/approverSidebar";
import HandledNavbar from "../../components/navbars/approverNavbars/handledNavbar";
import HandledStats from "../../components/headers/approverHeaders/handledStats";

export default function ApproverHandledRequests({ children }) {
    return (
        <>
            <ApproverSidebar />

            <div className="relative md:ml-64 bg-blueGray-100">
                <HandledNavbar />

                {/* Header */}
                <HandledStats />

                {/* Body */}
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    {children}
                </div>

            </div>
        </>
    );
}
