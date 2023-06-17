import React, {useEffect, useState} from "react";
import {BudgetRequestServices as RequestService, BudgetRequestServices} from "../../../data/api";
import PendingRequestsTable from "../../Cards/PendingRequestsTable";
import RequestCard from "../../Cards/RequestCard";
import {Alert, AlertTitle} from "@mui/material";
import {amber} from "@mui/material/colors";
import HandledRequestsTable from "../../Cards/HandledRequestsTable";
import HandledRequestCard from "../../Cards/HandledRequestCard";
import RequestStats from "./RequestStats";

export default function HandledStats() {

    const [handledRequests, setHandledRequests] = useState([]);

    const [orientation, setOrientation] = useState("grid");

    const [sortBy, setSortBy] = useState("divisionName");
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortIconType, setSortIconType] = useState("alpha");

    const [alert, setAlert] = useState({
        type: '',
        message: ''
    });

    async function fetchHandledRequests (){
        await RequestService.getHandledRequests()
            .then((response) => {
                const {data} = response;
                if (data){
                    setHandledRequests(data);
                }
            })
            .catch((error) => {
                console.error(error);
            })
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

    const sortHandledRequests = () => {
        let sortedRequests = [...handledRequests];

        if (sortBy === "divisionName") {
            sortedRequests.sort((a, b) =>
                sortOrder === "asc"
                    ? a.divisionName.localeCompare(b.divisionName)
                    : b.divisionName.localeCompare(a.divisionName)
            );
        } else if (sortBy === "divisionCode") {
            sortedRequests.sort((a, b) =>
                sortOrder === "asc"
                    ? a.divisionCode.localeCompare(b.divisionCode)
                    : b.divisionCode.localeCompare(a.divisionCode)
            );
        } else if (sortBy === "amount") {
            sortedRequests.sort((a, b) =>
                sortOrder === "asc"
                    ? getSortValue(a.amount) - getSortValue(b.amount)
                    : getSortValue(b.amount) - getSortValue(a.amount)
            );
        } else if (sortBy === "status") {
            sortedRequests.sort((a, b) =>
                sortOrder === "asc"
                    ? a.status.localeCompare(b.status)
                    : b.status.localeCompare(a.status)
            );
        } else if (sortBy === "narration") {
            sortedRequests.sort((a, b) =>
                sortOrder === "asc"
                    ? (a.narration).localeCompare(b.narration)
                    : (b.narration).localeCompare(a.narration)
            );
        }

        return sortedRequests;
    };

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
                            className="text-white bg-blueGray-700 px-8 py-1 rounded-md outline-none text-sm w-auto"
                            value={sortBy}
                            onChange={handleSortByChange}
                        >
                            <option value="narration">Name</option>
                            <option value="amount">Amount</option>
                            <option value="divisionName">Division</option>
                            <option value="divisionCode">Code</option>
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
                                    <HandledRequestsTable/>
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