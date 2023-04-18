import React, {useEffect, useState} from "react";

// components

import MinistryCardStats from "../Cards/MinistryCardStats";
import {MinistryService} from "../../data/api";
import Link from "next/link";
import MinistryData from "../../pages/admin/ministry/MinistryData";

export default function MinistryDataStats({currentMinistry, setCurrentMinistry, setMinistryMode}) {

    const [notificationsStatus, setNotificationsStatus] = useState(false)
    const [notificationsMessage, setNotificationsMessage] = useState({
        message: "",
        type: "",
    });

    async function updateMinistry(e) {
        e.preventDefault();

        const response = await MinistryService.updateMinistry(currentMinistry.id, {
            name: currentMinistry.name,
            departmentCount: currentMinistry.departmentCount,
            unitCount: currentMinistry.unitCount,
            description: currentMinistry.description,
        });
        if (response.status === 200) {
            setNotificationsStatus(true);
            setNotificationsMessage({
                message: response.data.message,
                type: response.data.type,
            });
        } else {
            setNotificationsStatus(false);
            setNotificationsMessage({
                message: response.data.message,
                type: response.data.type,
            });
        }
    }

    // return (
    //     <>
    //         {/*Header */}
    //         {ministryMode === "all" ? (
    //             <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
    //                 <div className="px-4 md:px-10 mx-auto w-full">
    //                     <div>
    //                         {/*Card stats*/}
    //                         {ministry.length > 0 ? (
    //                             <div className="flex flex-wrap">
    //                                 {ministry.map((row, index) => (
    //                                     // <div className="transform hover:scale-110 transition duration-200 ease-in-out">
    //                                     <div className="w-full lg:w-6/12 xl:w-3/12 px-2 pb-4 ">
    //                                         {/*<Link href={`/admin/ministry/${row.id}`}>*/}
    //                                         {/*    <a>*/}
    //                                         <MinistryCardStats onClick={() => {
    //                                             setMinistryMode("current");
    //                                             setCurrentMinistry(row)}
    //                                         }
    //                                                            key={index}
    //                                                            statTitle = {row.name}
    //                                                            statDepartment={"Department: " + row.departmentCount}
    //                                                            statUnit={"Unit: " + row.unitCount}
    //                                                            statDescription={row.description}
    //                                                            statIconName="fas fa-house"
    //                                                            statIconColor="bg-red-500"
    //                                         />
    //                                         {/*</a>*/}
    //                                         {/*</Link>*/}
    //                                         {/*</div>*/}
    //                                     </div>
    //                                 ))}
    //                             </div>
    //                         ) : (
    //                             "No Ministries Found"
    //                         )}
    //                     </div>
    //                 </div>
    //             </div>
    //         ) : null }
    //
    //         {ministryMode === "current"? (
    //             <MinistryData
    //                 currentMinistry={currentMinistry}
    //                 setCurrentMinistry={setCurrentMinistry}
    //                 setMinistryMode={setMinistryMode}
    //             />
    //         ) : null}
    //     </>
    // );
}
