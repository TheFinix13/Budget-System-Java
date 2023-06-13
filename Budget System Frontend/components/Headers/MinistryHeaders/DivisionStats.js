import React, {useEffect, useState} from "react";

// components
import DivisionCard from "../../Cards/DivisionCard";

//services
import {MinistryService} from "../../../data/api";
import {useRouter} from "next/router";
import DivisionTableForMinistry from "../../Cards/DivisionTableForMinistry";

export default function DivisionStats() {

    const [showDivisions, setShowDivisions] = useState([]);
    const [orientation, setOrientation] = useState("grid");

    const router = useRouter();
    const {id } = router.query;

    async function fetchDivisions() {
        await MinistryService.getDivisionsinMinistry(id)
            .then((response) => {
                const {data} = response;
                if (data){
                    setShowDivisions(data);
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
                        {showDivisions.length > 0 ? (
                            <>
                                {orientation === "grid" ? (
                                    <div className="flex flex-wrap">
                                        {showDivisions.map((row) => (
                                            <div className="w-full lg:w-6/12 xl:w-3/12 p-2">
                                                <DivisionCard key={row.id}
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
                                    <DivisionTableForMinistry
                                        showDivisions = {showDivisions}
                                    />
                                )}
                            </>
                        ) : (
                            "No division found"
                        )}

                    </div>
                </div>
            </div>
        </>
    );
}
