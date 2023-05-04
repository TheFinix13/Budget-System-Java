import React, {useEffect, useState} from "react";

// components
import DepartmentCard from "../Cards/DepartmentCard";
import {DepartmentService} from "../../data/api";
import axios from "axios";
import DepartmentTable from "../Cards/DepartmentTable";
import AllDepartmentTable from "../Cards/AllDepartmentTable";

export default function DepartmentStats(ministry_id) {

    const [showAllDepartments, setShowAllDepartments] = useState([]);
    const [orientation, setOrientation] = useState("grid");

    async function fetchDepartments() {
        await axios.get(`${DepartmentService.getAllDepartments()}/${ministry_id}`)
            .then((response) => {
                const {data} = response;
                if (data){
                    setShowAllDepartments(data);
                }else{
                    console.error(data.message);
                }
            })
            .catch((error) => {
                console.error(error);
            })
    };

    useEffect(() => {
        fetchDepartments();
    }, []);


    return (
        <>
            {/*Header */}



            <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">

                <div className="display-flex flex-column-reverse tablet:flex-row flex-items-center tablet:flex-content-between margin-bottom-2xl laptop:margin-bottom-0 laptop:margin-left-lg">
                    <div
                        className="display-flex flex-items-center margin-bottom-lg tablet:margin-bottom-0 tablet:margin-left-lg">
                        <div className="display-flex margin-right-sm tablet:margin-right-lg">

                            <button aria-label="grid" data-balloon-pos="up" className="link flat compact">
                                <i className="fas fa-th cursor-pointer mr-12"
                                   onClick={() => {
                                       setOrientation("grid");
                                   }}
                                ></i>
                            </button>

                            <button aria-label="list" data-balloon-pos="up" className="flat compact">
                                <i className="fas fa-list-ul cursor-pointer mr-12"
                                   onClick={() => {
                                       setOrientation("list");
                                   }}
                                ></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="px-4 md:px-10 mx-auto w-full">
                    <div>
                        {/*Card stats*/}
                        {showAllDepartments.length > 0 ? (
                            <>
                                {orientation === "grid" ? (
                                    <div className="flex flex-wrap">
                                        {showAllDepartments.map((row, index) => (
                                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                                <DepartmentCard
                                                    key={index}
                                                   statTitle = {row.name}
                                                   statUnit={"Units: " + row.units.length}
                                                   statMinistry={row?.ministry?.name || "No ministry"}
                                                   statIconName="fas fa-building"
                                                   statIconColor="bg-orange-500"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <AllDepartmentTable color="dark" />
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
