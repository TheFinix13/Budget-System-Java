import React, {useEffect, useState} from "react";

// components
import AllDivisionsTable from "../../cards/allDivisionsTable";
import DivisionCard from "../../cards/divisionCard";

//services
import {DivisionService, UserService} from "../../../data/api";
import {useRouter} from "next/router";
import DivisionTableForMinistry from "../../cards/divisionTableForMinistry";

export default function DivisionStats() {

    const [showDivisionsinMinistry, setShowDivisionsinMinistry] = useState([]);
    const [orientation, setOrientation] = useState("grid");

    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortIconType, setSortIconType] = useState("alpha");

    const router = useRouter();
    const { id } = router.query;
    const [ministryId, setMinistryId] = useState(null); // Added state for ministryId

    async function fetchMinistryId(id) {
        try {
            const response = await UserService.getMinistryIdFromAdminId(id);
            const { data } = response;
            if (data) {
                setMinistryId(data); // Set the retrieved ministryId in state
            } else {
                console.error("Failed to fetch ministryId");
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Fetch ministryId on component mount
    useEffect(() => {
        if (id) {
            fetchMinistryId(id);
        }
    }, [id]);


    async function fetchDivisionsInMinistry() {
        await DivisionService.getDivisionsInMinistry(ministryId)
            .then((response) => {
                const {data} = response;
                if (data){
                    setShowDivisionsinMinistry(data);
                }else{
                    console.error(data.message);
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    useEffect(() => {
        fetchDivisionsInMinistry();
    }, [ministryId]);

    useEffect(() => {
        sortDivisions();
    }, [sortBy, sortOrder]);

    function handleSortByChange(e) {
        setSortBy(e.target.value);

        if (e.target.value === "code" || e.target.value === "budgetRequestCount") {
            setSortIconType("number");
        } else {
            setSortIconType("alpha");
        }
    }
    function handleSortOrderChange() {
        setSortOrder(prevSortOrder => (prevSortOrder === "asc" ? "desc" : "asc"));
    }

    // Sort the divisions based on the selected sorting options
    function sortDivisions() {
        const sortedDivisions = [...showDivisionsinMinistry];
        sortedDivisions.sort((a, b) => {
            const aValue = getSortValue(a[sortBy]);
            const bValue = getSortValue(b[sortBy]);

            if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
            if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
        return sortedDivisions;
    }
    function getSortValue(value) {
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
                            <option value="name">Name</option>
                            <option value="code">Code</option>
                            <option value="budgetRequestCount">Request</option>
                            <option value="departmentName">Department</option>
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
                    <div>
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
                        {showDivisionsinMinistry.length > 0 ? (
                            <>
                                {orientation === "grid" ? (
                                    <div className="flex flex-wrap">
                                        {sortDivisions().map((row, index) => (
                                            <div className="w-full lg:w-6/12 xl:w-3/12 p-2">
                                                <DivisionCard key={index}
                                                    statTitle = {row.name}
                                                    statCode={row.code}
                                                    statBudgetRequest={"Budget Request: " + row.budgetRequestCount}
                                                    statBudgetDescription={row.description}
                                                    statDepartment={row.departmentName || "No department"}
                                                    statIconName="fas fa-boxes"
                                                    statIconColor="bg-pink-500"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <DivisionTableForMinistry
                                        showDivisions = {showDivisionsinMinistry}
                                        sortBy = {sortBy}
                                        sortOrder = {sortOrder}
                                        id = {id}
                                    />
                                )}
                            </>
                        ) : (
                            "No divisions found"
                        )}

                    </div>
                </div>
            </div>
        </>
    );
}
