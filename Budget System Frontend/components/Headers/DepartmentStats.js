import React, {useEffect, useState} from "react";

// components
import DepartmentCardStats from "../Cards/DepartmentCardStats";

export default function DepartmentStats() {

    // useEffect(() => {
    //     async function fetchMinistries() {
    //         try {
    //             const response = await MinistryService.showMinistry();
    //             const data = await response.json();
    //             if (data.status){
    //                 setMinistry(data.data);
    //                 setDataLoad(false);
    //             }
    //             else {
    //                 console.error(data.message);
    //             }
    //         }catch (e) {
    //             console.error(e);
    //         }
    //         setDataLoad(false);
    //     }
    //     fetchMinistries();
    // }, []);


    return (
        <>
            {/*Header */}
            <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
                <div className="px-4 md:px-10 mx-auto w-full">
                    <div>
                        <div className="flex flex-wrap">
                            {/*{dataload === false ? (*/}
                            {/*    <>*/}
                            {/*        {ministry.length > 0 ? (*/}
                            {/*            <>*/}

                                            {/*Card stats*/}
                                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                                    <DepartmentCardStats
                                                           statTitle = {"Department of "}
                                                           statUnit={"Units: " }
                                                           statMinistry={"Ministry of "}
                                                           statIconName="fas fa-building"
                                                           statIconColor="bg-orange-500"
                                                    />
                                            </div>

                            {/*            </>*/}
                            {/*        ) : (*/}
                            {/*            "No department found"*/}
                            {/*        )}*/}
                            {/*    </>*/}
                            {/*) : (*/}
                            {/*    "Loading..."*/}
                            {/*)}*/}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
