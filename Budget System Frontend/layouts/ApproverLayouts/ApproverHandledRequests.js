import React from "react";

// components
import ApproverSidebar from "../../components/Sidebar/ApproverSidebar";
import HandledNavbar from "../../components/Navbars/ApproverNavbars/HandledNavbar";
import HandledStats from "../../components/Headers/ApproverHeaders/HandledStats";

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
