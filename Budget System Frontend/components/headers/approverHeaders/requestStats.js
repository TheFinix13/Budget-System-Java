import React, {useEffect, useState} from "react";
import {AdminService, BudgetRequestServices} from "../../../data/api";
import PendingRequestsTable from "../../cards/pendingRequestsTable";
import RequestCard from "../../cards/requestCard";
import {Alert, AlertTitle} from "@mui/material";
import {amber} from "@mui/material/colors";
import HandledRequestsTable from "../../cards/handledRequestsTable";
import {useRouter} from "next/router";

export default function RequestStats({handledRequests}) {

    const [pendingRequest, setPendingRequest] = useState({});
    const [orientation, setOrientation] = useState("grid");

    const [sortBy, setSortBy] = useState("divisionName");
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortIconType, setSortIconType] = useState("alpha");

    const [alert, setAlert] = useState({
        type: '',
        message: ''
    });

    const [showTable, setShowTable] = useState(false)

    const router = useRouter();
    const {id} = router.query

    async function fetchBudgetRequest() {
        try {
            const approverResponse = await AdminService.getAnApprover(id);
            const {data: approverData} = approverResponse;

            const budgetRequestsResponse= await BudgetRequestServices.getPendingRequestsInMinistry(approverData.ministryID)
            const budgetRequests = budgetRequestsResponse.data;

            setPendingRequest(budgetRequests);
        } catch (error) {
            console.error("Error fetching approver data:", error);
        }
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

            setAlert({
                type: 'success',
                message: 'Budget Request Approved successfully!'
            });

            // Reload the page
            setTimeout(() => {
                window.location.reload();
            }, 500);

        } catch (error) {
            setAlert({
                type: 'error',
                message: 'An error occurred while approving the request.'
            });
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
            setAlert({
                type: 'success',
                message: 'Budget Request Denied successfully!',
            });

            // Reload the page
            setTimeout(() => {
                window.location.reload();
            }, 500);

        } catch (error) {
            setAlert({
                type: 'error',
                message: 'An error occurred while denying the request.'
            });
        }
    };

    setTimeout(() => {
        setAlert({ type: '',
            message: '' });
    }, 3000);

    const handleSortByChange = (e) => {
        setSortBy(e.target.value);

        if (e.target.value === "code" || e.target.value === "amount") {
            setSortIconType("number");
        } else {
            setSortIconType("alpha");
        }
    };

    function handleSortOrderChange() {
        setSortOrder(prevSortOrder => (prevSortOrder === "asc" ? "desc" : "asc"));
    }

    function sortPendingRequests() {
        const sortedRequests = [...pendingRequest];
        sortedRequests.sort((a, b) => {
            if (sortBy === "amount") {
                // Assuming amount is a number. Adjust for ascending or descending order.
                return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
            }
            else {
                const aValue = getSortValue(a[sortBy]);
                const bValue = getSortValue(b[sortBy]);

                if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
                if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
                return 0;
            }
        });
        return sortedRequests;
    }

    function getSortValue(value) {
        if (typeof value !== "string") {
            return "";
        }
        const ignoredWords = ["for", "of"];
        const words = value.toLowerCase().split(" ");
        const filteredWords = words.filter((word) => !ignoredWords.includes(word));
        return filteredWords.join(" ");
    }

    const handleToggleTable = () => {
        setShowTable((prevState) => !prevState)
    }

    return (
        <>
            {/*Header */}
            <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
                {/*<Alert System*/}
                <div className="px-4 md:px-10 mx-auto w-full">
                    {alert.type === 'success' && (
                        <div className="flex justify-center">
                            <div className="w-72">
                                <Alert severity="success">
                                    <AlertTitle>Success</AlertTitle>
                                    {alert.message}
                                </Alert>
                            </div>
                        </div>
                    )}

                    {alert.type === 'error' && (
                        <div className="flex justify-center">
                            <div className="w-72">
                                <Alert severity="error">
                                    <AlertTitle>Error</AlertTitle>
                                    {alert.message}
                                </Alert>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-between px-4 md:px-10 mx-auto mb-2 w-full">
                    {/*<sort buttons*/}
                    <div className="flex items-center">
                        <select
                            className="text-white bg-blueGray-700 rounded-md outline-none text-xs appearance-none border border-blueGray-700 focus:border-blueGray-500"
                            value={sortBy}
                            onChange={handleSortByChange}
                        >
                            <option value="divisionName">Name</option>
                            <option value="divisionCode">Code</option>
                            <option value="departmentName">Department</option>
                            <option value="amount">Amount</option>
                        </select>

                        <button
                            className="bg-white text-blueGray-800 active:bg-indigo-600 text-sm px-3 py-1 rounded outline-none focus:outline-none ml-2"
                            type="button"
                            onClick={handleSortOrderChange}
                        >
                            {sortIconType === "alpha" ? (
                            <i
                                className={`fas fa-sort-alpha-${
                                    sortOrder === "asc" ? "down" : "up"
                                } cursor-pointer`}
                            ></i>
                            ) : (
                            <i
                                className={`fas fa-sort-numeric-${
                                    sortOrder === "asc" ? "down" : "up"
                                } cursor-pointer`}
                            ></i>
                            )}
                        </button>
                    </div>

                    {/* View buttons */}
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                        <button
                            className="bg-white text-blueGray-800 active:bg-indigo-600 text-sm px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                        >
                            <i className="fas fa-th cursor-pointer mx-2"
                               onClick={() => {
                                   setOrientation("grid");
                               }}
                            ></i>
                        </button>

                        <button
                            className="bg-white text-blueGray-800 active:bg-indigo-600 text-sm px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                        >
                            <i className="fas fa-list-ul cursor-pointer mx-2"
                               onClick={() => {
                                   setOrientation("list");
                               }}
                            ></i>
                        </button>
                    </div>

                    {/* Show History button */}
                    <div className= "-ml-2 text-right">
                        <button
                            className="bg-white text-blueGray-800 font-bold active:bg-indigo-600 text-sm px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={handleToggleTable}
                        >
                            {showTable ? (
                                <span>Show History</span>
                            ) : (
                                <span> Hide History</span>
                            )}
                        </button>
                    </div>

                </div>

                <div className="px-4 md:px-10 mx-auto w-full">
                    <div>
                        {/*Card stats*/}
                        {pendingRequest.length > 0 ? (
                            <>
                                {orientation === "grid" ? (
                                    <div className="flex flex-wrap">
                                        {sortPendingRequests().map((row) => (
                                            <div className="w-full lg:w-6/12 xl:w-3/12 p-2">
                                                <RequestCard
                                                    key={row.budget_id}
                                                 statDivision={row.divisionName}
                                                statCode={row.divisionCode}
                                                 statNarration={row.narration}
                                                statAmount={`₦${row.amount.toLocaleString()}`}
                                                statDepartment={row.departmentName}
                                                 statAccept={() => handleApprove(row.budget_id)}
                                                statDecline={() => handleDeny(row.budget_id)}
                                                 statIconName="fas fa-file-download"
                                                statIconColor= "bg-emerald-500"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <PendingRequestsTable
                                        sortBy={sortBy}
                                        sortOrder={sortOrder}
                                        pendingRequest = {pendingRequest}
                                        handleApprove={handleApprove}
                                        handleDeny={handleDeny}
                                    />
                                )}
                            </>
                        ) : (
                            "No budget request pending"
                        )}
                        {showTable && <HandledRequestsTable/>}
                    </div>
                </div>
            </div>
        </>
    );
}