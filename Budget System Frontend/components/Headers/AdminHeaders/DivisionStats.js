import React, {useEffect, useState} from "react";

// components
import AllDivisionsTable from "../../Cards/AllDivisionsTable";
import DivisionCard from "../../Cards/DivisionCard";

//services
import {DivisionService} from "../../../data/api";

export default function DivisionStats() {

    const [showAllDivisions, setShowAllDivisions] = useState([]);
    const [orientation, setOrientation] = useState("grid");

    async function fetchDivisions() {
        await DivisionService.getAllDivisions()
            .then((response) => {
                const {data} = response;
                if (data){
                    setShowAllDivisions(data);
                }else{
                    console.error(data.message);
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    useEffect(() => {
        fetchDivisions();
    }, []);


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
                        {showAllDivisions.length > 0 ? (
                            <>
                                {orientation === "grid" ? (
                                    <div className="flex flex-wrap">
                                        {showAllDivisions.map((row, index) => (
                                            <div className="w-full lg:w-6/12 xl:w-3/12 p-2">
                                                <DivisionCard key={index}
                                                    statTitle = {row.name}
                                                    statCode={row.code}
                                                    statBudgetRequest={"Budget Request: " + row.budgetRequest}
                                                    statBudgetDescription={row.description}
                                                    statDepartment={row.departmentName || "No department"}
                                                    statIconName="fas fa-boxes"
                                                    statIconColor="bg-pink-500"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <AllDivisionsTable
                                        showAllDivisions = {showAllDivisions}
                                    />
                                )}
                            </>
                        ) : (
                            "No department found"
                        )}

                    </div>
                </div>
            </div>
        </>
    );
}
