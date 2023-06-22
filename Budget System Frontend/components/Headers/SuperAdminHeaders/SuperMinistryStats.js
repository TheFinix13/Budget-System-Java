import React, {useEffect, useState} from "react";

// components
import MinistryCard from "../../Cards/MinistryCard";
import SuperMinistryDataStats from "./SuperMinistryDataStats";
import MinistryDataNavbar from "../../Navbars/AdminNavbars/MinistryDataNavbar";

//service
import {MinistryService} from "../../../data/api";
import Link from "next/link";


export default function SuperMinistryStats() {

    const [ministry, setMinistry] = useState([]);
    const [ministryMode, setMinistryMode] = useState("all");
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortIconType, setSortIconType] = useState("alpha");

    async function fetchMinistries() {
        await MinistryService.getMinistry()
            .then((res) => {
                const {data} = res;
                if (data) {
                    setMinistry(data);
                } else {
                    console.error(data.message);
                }
            })
            .catch((error) => {
                console.error("Failed to fetch ministries", error);
            })
    }

    useEffect(() => {
        fetchMinistries();
    }, []);

    const handleClick = () => {
        setMinistryMode("current");
    }

    function handleSortByChange(e) {
        setSortBy(e.target.value);

        if (e.target.value === "totalDepartments" || e.target.value === "totalDivisions") {
            setSortIconType("number");
        } else {
            setSortIconType("alpha");
        }
    }

    function handleSortOrderChange() {
        setSortOrder(prevSortOrder => (prevSortOrder === "asc" ? "desc" : "asc"));
    }

    // Sort the divisions based on the selected sorting options
    function sortMinistry() {
        const sortedMinistry = [...ministry];
        sortedMinistry.sort((a, b) => {
            const aValue = getSortValue(a[sortBy]);
            const bValue = getSortValue(b[sortBy]);

            if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
            if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;

            if (sortBy === "totalDepartments") {
                const aDepartmentCount = a.totalDepartments || 0;
                const bDepartmentCount = b.totalDepartments || 0;

                if (aDepartmentCount < bDepartmentCount)
                    return sortOrder === "asc" ? -1 : 1;
                if (aDepartmentCount > bDepartmentCount)
                    return sortOrder === "asc" ? 1 : -1;
            }

            if (sortBy === "totalDivisions") {
                const aDivisionCount = a.totalDivisions || 0;
                const bDivisionCount = b.totalDivisions || 0;

                if (aDivisionCount < bDivisionCount)
                    return sortOrder === "asc" ? -1 : 1;
                if (aDivisionCount > bDivisionCount)
                    return sortOrder === "asc" ? 1 : -1;
            }

            return 0;
        });
        return sortedMinistry;
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
            {ministryMode === "all" ? (
                <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">

                    {/*<sort buttons*/}
                    <div className="flex px-4 md:px-10 mx-auto mb-4 w-full">
                        <select
                            className="text-white bg-blueGray-700 px-4 py-1 rounded-md outline-none text-sm"
                            value={sortBy}
                            onChange={handleSortByChange}
                        >
                            <option value="name">Name</option>
                            <option value="totalDepartments">Department</option>
                            <option value="totalDivisions">Division</option>
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

                    <div className="px-4 md:px-10 mx-auto w-full">
                        <div>
                            {/*Card stats*/}
                            {ministry.length > 0 ? (
                                <div className="flex flex-wrap">
                                    {sortMinistry().map((row, index) => (
                                        <div className="w-full lg:w-6/12 xl:w-3/12 px-2 pb-4">
                                            <div
                                                className="duration-200; ease-in-out transform:transition hover:scale-110">
                                                <Link href={`/admin/ministry/${row.ministry_id}`}>
                                                    <a>
                                                        <MinistryCard onClick={() => handleClick()}
                                                                      key={index}
                                                                      statTitle={row.name}
                                                                      statDepartment={"Departments: " + row.totalDepartments}
                                                                      statUnit={"Divisions: " + row.totalDivisions}
                                                                      statDescription={row.description}
                                                                      statIconName="fas fa-house"
                                                                      statIconColor="bg-red-500"
                                                        />
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                "No Ministries Found"
                            )}
                        </div>
                    </div>
                </div>
            ) : null}

            {ministryMode === "current" ? (
                <>
                    <MinistryDataNavbar/>

                    <SuperMinistryDataStats
                        ministry={ministry}
                    />
                </>
            ) : null}
        </>
    );
}
