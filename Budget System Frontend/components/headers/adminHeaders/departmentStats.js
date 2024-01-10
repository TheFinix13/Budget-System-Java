import React, {useEffect, useState} from "react";

// components
import DepartmentCard from "../../cards/departmentCard";
import AllDepartmentTable from "../../cards/allDepartmentTable";

//services
import {DepartmentService, UserService} from "../../../data/api";
import Link from "next/link";
import {useRouter} from "next/router";
import DepartmentTableForMinistry from "../../cards/departmentTableForMinistry";

export default function DepartmentStats() {

    const [showDepartmentsinMinistry, setShowDepartmentsinMinistry] = useState([]);
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


    async function fetchDepartments() {
        await DepartmentService.getDepartmentInMinistry(ministryId)
            .then((response) => {
                const {data} = response;
                if (data){
                    setShowDepartmentsinMinistry(data);
                }else{
                    console.error(data.message);
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    useEffect(() => {
        fetchDepartments();
    }, [ministryId]);

    useEffect(() => {
        sortDepartments();
    }, [sortBy, sortOrder]);

    function handleSortByChange(e) {
        setSortBy(e.target.value);

        if (e.target.value === "code" || e.target.value === "divisionCount") {
            setSortIconType("number");
        } else {
            setSortIconType("alpha");
        }
    }
    function handleSortOrderChange() {
        setSortOrder(prevSortOrder => (prevSortOrder === "asc" ? "desc" : "asc"));
    }

    // Sort the divisions based on the selected sorting options
    function sortDepartments() {
        const sortedDepartments = [...showDepartmentsinMinistry];
        sortedDepartments.sort((a, b) => {
            if (sortBy === "divisionCount") {
                const aValue = a.divisionCount || 0;
                const bValue = b.divisionCount || 0;

                if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
                if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
            } else {
                const aValue = getSortValue(a[sortBy]);
                const bValue = getSortValue(b[sortBy]);

                if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
                if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
            }
            return 0;
        });
        setShowDepartmentsinMinistry(sortedDepartments);
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

    return <>
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
                        <option value="divisionCount">Division</option>

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

                {/*{view buttons}*/}
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                    <button
                        className="bg-white text-blueGray-800 active:bg-indigo-600 text-sm px-3 py-1 rounded outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
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
                    {showDepartmentsinMinistry.length > 0 ? (
                        <>
                            {orientation === "grid" ? (
                                <div className="flex flex-wrap">
                                    {showDepartmentsinMinistry.map((row, index) => (
                                        <div className="w-full lg:w-6/12 xl:w-3/12 p-2">
                                            <Link href={`/admin/department/${row.id}`}>

                                                <DepartmentCard key={index}
                                                   statTitle = {row.name}
                                                    statCode={row.code}
                                                   statUnit={"Divisions: " + row.divisionCount}
                                                    statDescription={row.description}
                                                   // statMinistry={row.ministryName || "No ministry"}
                                                   statIconName="fas fa-building"
                                                   statIconColor="bg-orange-500"
                                                />

                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <DepartmentTableForMinistry
                                    showDepartments={showDepartmentsinMinistry}
                                    sortBy={sortBy}
                                    sortOrder={sortOrder}
                                    id = {id}
                                />
                            )}
                        </>
                    ) : (
                        "No departments found"
                    )}

                </div>
            </div>
        </div>
    </>;
}
