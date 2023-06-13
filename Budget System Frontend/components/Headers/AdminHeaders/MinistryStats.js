import React, {useEffect, useState} from "react";

// components
import MinistryCard from "../../Cards/MinistryCard";
import MinistryDataStats from "./MinistryDataStats";
import MinistryDataNavbar from "../../Navbars/AdminNavbars/MinistryDataNavbar";

//service
import {MinistryService} from "../../../data/api";
import Link from "next/link";


export default function MinistryStats() {

    const [ministry, setMinistry] = useState([]);
    const [ministryMode, setMinistryMode] = useState("all");

    async function fetchMinistries() {
        await MinistryService.getMinistry()
            .then((res) => {
                const {data} = res;
                console.log(data)
                if (data){
                    setMinistry(data);
                }else {
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

    return (
        <>
            {/*Header */}
            {ministryMode === "all" ? (
                <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
                    <div className="px-4 md:px-10 mx-auto w-full">
                        <div>
                            {/*Card stats*/}
                            {ministry.length > 0 ? (
                                <div className="flex flex-wrap">
                                    {ministry.map((row, index) => (
                                        <div className="w-full lg:w-6/12 xl:w-3/12 px-2 pb-4">
                                            <div className="duration-200; ease-in-out transform:transition hover:scale-110">
                                                <Link href={`/admin/ministry/${row.ministry_id}`}>
                                                    <a>
                                                        <MinistryCard onClick={() => handleClick()}
                                                              key={index}
                                                              statTitle = {row.name}
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
            ) : null }

            {ministryMode === "current"? (
                <>
                    <MinistryDataNavbar/>

                    <MinistryDataStats
                        ministry={ministry}
                    />
                </>
            ) : null}
        </>
    );
}
