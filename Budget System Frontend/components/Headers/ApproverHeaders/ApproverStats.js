import React, {useEffect, useState} from "react";
import {BudgetRequestServices} from "../../../data/api";
import PendingRequestsTable from "../../Cards/PendingRequestsTable";
import RequestCard from "../../Cards/RequestCard";

export default function ApproverStats() {

    const [pendingRequest, setPendingRequest] = useState([]);
    const [orientation, setOrientation] = useState("grid");

    async function fetchBudgetRequest() {
        await BudgetRequestServices.getPendingRequests()
            .then((response) => {
                const {data} = response;
                if (data){
                    setPendingRequest(data);
                }else{
                    console.error(data.message);
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    useEffect(() => {
        fetchBudgetRequest();

    }, []);

    const handleApprove = async (requestId) => {
        try {
            // Send request to the server to update the status to "approved"
            await BudgetRequestServices.approveRequest(requestId);

            // Remove the approved request from the pendingRequests array
            setPendingRequest((prevRequest) =>
                prevRequest.filter((request) =>
                    request.id !== requestId));

            alert('Request approved successfully')
        } catch (error) {
            console.error(error);
        }
    }

    const handleDeny = async (requestId) => {
        try {
            // Send request to the server to update the status to "denied"
            await BudgetRequestServices.denyRequest(requestId);

            // Remove the denied request from the pendingRequests array
            setPendingRequest((prevRequests) =>
                prevRequests.filter((request) =>
                    request.id !== requestId)
            );

            // Display a success message
            alert('Request denied successfully.');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {/*Header */}

            <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">

                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                    <button
                        className="bg-white text-blueGray-800 active:bg-indigo-600 text-sm px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                    >
                        <i className="fas fa-th cursor-pointer mr-12"
                           onClick={() => {
                               setOrientation("grid");
                           }}
                        ></i>
                    </button>

                    <button
                        className="bg-white text-blueGray-800 active:bg-indigo-600 text-sm px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                    >
                        <i className="fas fa-list-ul cursor-pointer mr-12"
                           onClick={() => {
                               setOrientation("list");
                           }}
                        ></i>
                    </button>
                </div>

                <div className="px-4 md:px-10 mx-auto w-full">
                    <div>
                        {/*Card stats*/}
                        {pendingRequest.length > 0 ? (
                            <>
                                {orientation === "grid" ? (
                                    <div className="flex flex-wrap">
                                        {pendingRequest.map((row) => (
                                            <div className="w-full lg:w-6/12 xl:w-3/12 p-4">
                                                <RequestCard
                                                    key={row.budget_id}
                                                 statDivision={row.divisionName}
                                                statCode={row.divisionCode}
                                                 statNarration={row.narration}
                                                statAmount={row.amount}
                                                 statAccept={() => handleApprove(row.budget_id)}
                                                statDecline={() => handleDeny(row.budget_id)}
                                                 statIconName="fas fa-usd-square"
                                                statIconColor= "bg-emerald-500"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <PendingRequestsTable
                                        pendingRequest = {pendingRequest}
                                        handleApprove={handleApprove}
                                        handleDeny={handleDeny}
                                    />
                                )}
                            </>
                        ) : (
                            "No budget request pending"
                        )}

                    </div>
                </div>
            </div>
        </>
    );
}