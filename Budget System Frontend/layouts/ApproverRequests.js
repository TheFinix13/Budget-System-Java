import React from "react";

// components
import ApproverSidebar from "../components/Sidebar/ApproverSidebar";
import ApproverStats from "../components/Headers/ApproverStats";
import RequestNavbar from "../components/Navbars/RequestNavbar";

export default function ApproverRequests({ children }) {
    return (
        <>
            <ApproverSidebar />

            <div className="relative md:ml-64 bg-blueGray-100">
                <RequestNavbar />

                {/* Header */}
                <ApproverStats />

                {/* Body */}
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    {children}
                </div>

            </div>
        </>
    );
}
