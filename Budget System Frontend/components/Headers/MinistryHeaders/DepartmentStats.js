import React, {useEffect, useState} from "react";

// components
import DepartmentCard from "../../Cards/DepartmentCard";
import DepartmentTableForMinistry from "../../Cards/DepartmentTableForMinistry";

//services
import {DepartmentService} from "../../../data/api";
import Link from "next/link";
import {useRouter} from "next/router";

export default function DepartmentStats() {

    const [showDepartments, setShowDepartments] = useState([]);
    const [orientation, setOrientation] = useState("grid");

    const router = useRouter();
    const {id} = router.query;
    async function fetchDepartments() {
        await DepartmentService.getDepartmentInMinistry(id)
            .then((response) => {
                const {data} = response;
                if (data){
                    setShowDepartments(data);
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
                        {showDepartments.length > 0 ? (
                            <>
                                {orientation === "grid" ? (
                                    <div className="flex flex-wrap">
                                        {showDepartments.map((row) => (
                                            <div className="w-full lg:w-6/12 xl:w-3/12 p-2">
                                                <Link
                                                    href={`/ministry/department/[id]?ministryId=${id}&departmentId=${row.id}`}
                                                    as={`/ministry/department/${id}?ministryId=${id}&departmentId=${row.id}`}
                                                >
                                                    <a>
                                                        <DepartmentCard key={row.id}
                                                            statTitle = {row.name}
                                                            statCode={row.code}
                                                            statUnit={"Divisions: " + row.divisionCount}
                                                            statDescription={row.description}
                                                            statIconName="fas fa-building"
                                                            statIconColor="bg-orange-500"
                                                        />
                                                    </a>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <DepartmentTableForMinistry
                                        showDepartments = {showDepartments}
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
