import React from "react";

// components
// layout for page
import ApproverRequests from "../../layouts/approverLayouts/approverRequests";
import HandledRequestsTable from "../../components/cards/handledRequestsTable";

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
