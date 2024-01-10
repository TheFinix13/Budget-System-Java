import React, {useEffect, useState} from "react";
import {AdminService, BudgetRequestServices as RequestService, BudgetRequestServices} from "../../../data/api";
import PendingRequestsTable from "../../cards/pendingRequestsTable";
import RequestCard from "../../cards/requestCard";
import {Alert, AlertTitle} from "@mui/material";
import {amber} from "@mui/material/colors";
import HandledRequestsTable from "../../cards/handledRequestsTable";
import HandledRequestCard from "../../cards/handledRequestCard";
import RequestStats from "./requestStats";
import {useRouter} from "next/router";

export default function HandledStats() {

    const [handledRequests, setHandledRequests] = useState([]);

    const [orientation, setOrientation] = useState("grid");

    const [sortBy, setSortBy] = useState("divisionName");
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortIconType, setSortIconType] = useState("alpha");

    const router = useRouter();
    const {id} = router.query

    async function fetchHandledRequests (){
        try {
            const approverResponse = await AdminService.getAnApprover(id);
            const {data: approverData} = approverResponse;

            const handledResponse = await RequestService.getHandledRequestsInMinistry(approverData.ministryID);
            const handledRequests = handledResponse.data;

            setHandledRequests(handledRequests);
        }
        catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchHandledRequests();
    }, []);

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

    function sortHandledRequests() {
        const sortedRequests = [...handledRequests];
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

    return (
        <>
            {/*Header */}
            <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">

                <div className="flex justify-between px-4 md:px-10 mx-auto mb-2 w-full">
                    {/*<sort buttons*/}
                    <div className="flex items-center">
                        <select
                            className="text-white bg-blueGray-700 rounded-md outline-none text-xs appearance-none border border-blueGray-700 focus:border-blueGray-500"
                            value={sortBy}
                            onChange={handleSortByChange}
                        >
                            <option value="narration">Name</option>
                            <option value="amount">Amount</option>
                            <option value="divisionName">Division</option>
                            <option value="divisionCode">Code</option>
                            <option value="departmentName">Department</option>
                            <option value="status">Status</option>

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

                </div>

                <div className="px-4 md:px-10 mx-auto w-full">
                    <div>
                        {/*Card stats*/}
                        {handledRequests.length > 0 ? (
                            <>
                                {orientation === "grid" ? (
                                    <div className="flex flex-wrap">
                                        {sortHandledRequests().map((row) => (
                                            <div className="w-full lg:w-6/12 xl:w-3/12 p-2">
                                                <HandledRequestCard
                                                    key={row.budget_id}
                                                    statDivision={row.divisionName}
                                                    statCode={row.divisionCode}
                                                    statNarration={row.narration}
                                                    statAmount={`₦${row.amount.toLocaleString()}`}
                                                    statStatus={row.status}
                                                    statIconName={row.status === "Approved" ? "fas fa-check-circle" : "fas fa-times-circle"}
                                                    statIconColor={row.status === "Approved" ? "bg-emerald-500" : "bg-red-500"}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <HandledRequestsTable
                                        handledRequests = {handledRequests}
                                        sortOrder={sortOrder}
                                        sortBy={sortBy}
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