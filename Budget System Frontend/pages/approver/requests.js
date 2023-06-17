import React from "react";

// components
// layout for page
import ApproverRequests from "../../layouts/ApproverLayouts/ApproverRequests";
import HandledRequestsTable from "../../components/Cards/HandledRequestsTable";

export default function Requests() {
    return (
        <>
            <div className="flex flex-wrap">
                {/*<HandledRequestsTable color="dark"/>*/}
            </div>

        </>
    );
}

Requests.layout = ApproverRequests;
