import React, {useEffect, useState} from "react";

// components
import MinistryCard from "../Cards/MinistryCard";
import MinistryDataStats from "./MinistryDataStats";
import MinistryDataNavbar from "../Navbars/MinistryDataNavbar";

//service
import {MinistryService} from "../../data/api";


export default function MinistryStats() {

    const [ministry, setMinistry] = useState([]);
    const [currentMinistry, setCurrentMinistry] = useState({name: "Education"});
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
        // console.log(currentMinistry);
    }, []);

    const handleClick = (row) => {
        setCurrentMinistry(row);
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
                                        // <div className="transform hover:scale-110 transition duration-200 ease-in-out">
                                        <div className="w-full lg:w-6/12 xl:w-3/12 px-2 pb-4">
                                            {/*<Link href={`/admin/ministry/${row.id}`}>*/}
                                            {/*    <a>*/}
                                                    <MinistryCard onClick={() => handleClick(row)}
                                                                  key={index}
                                                                  statTitle = {row.name}
                                                                  statDepartment={"Department: " + row.departmentCount}
                                                                  statUnit={"Unit: " + row.unitCount}
                                                                  statDescription={row.description}
                                                                  statIconName="fas fa-house"
                                                                  statIconColor="bg-red-500"
                                                    />
                                                {/*</a>*/}
                                            {/*</Link>*/}
                                        {/*</div>*/}
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
                    <MinistryDataNavbar
                        currentMinistry={currentMinistry}
                        setMinistryMode={setMinistryMode}
                    />
                    <MinistryDataStats
                        currentMinistry={currentMinistry}
                        setCurrentMinistry={setCurrentMinistry}
                        setMinistryMode={setMinistryMode}
                    />
                </>
            ) : null}
        </>
    );
}
