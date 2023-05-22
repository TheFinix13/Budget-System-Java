import React, {useEffect, useState} from "react";

// components
import Card from "../Cards/Card";
import BudgetCard from "../Cards/BudgetCard";

//services
import {DepartmentService} from "../../data/api";
import {useRouter} from "next/router";


export default function DepartmentDataStats() {
    const [department, setDepartment] = useState({});

    const router = useRouter();
    const {id} = router.query;
    async function fetchADepartment() {
        await DepartmentService.getADepartment(id)
            .then((res) => {
                const {data} = res;
                setDepartment(data)
            }).catch((error) => {
                console.error("Failed to fetch department", error);
            })
    }

    useEffect(() => {
        if (id) {
            fetchADepartment();
        }
    }, [id]);


    // const [notificationsStatus, setNotificationsStatus] = useState(false)
    // const [notificationsMessage, setNotificationsMessage] = useState({
    //     message: "",
    //     type: "",
    // });
    //
    // async function updateMinistry(e) {
    //     e.preventDefault();
    //
    //     await MinistryService.updateMinistry(ministry.id, {
    //         name: ministry.name,
    //         description: ministry.description,
    //     }).then((response) => {
    //         setNotificationsStatus(true);
    //         setNotificationsMessage({
    //             message: response.data.message,
    //             type: response.data.type,
    //         });
    //     }).catch((error) => {
    //         if (error.response) {
    //             setNotificationsStatus(false);
    //             setNotificationsMessage({
    //                 message: error.response.message,
    //                 type: error.data.type,
    //             });
    //         }
    //     })
    // }

    // console.log(department)
    return (
        <>
            {/* Header */}
            <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
                <div className="px-4 md:px-10 mx-auto w-full">
                    <div>
                        {/* Card stats */}
                        <div className="flex flex-wrap">

                            <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                                <BudgetCard
                                    statSubtitle="BUDGET REQUESTS"
                                    statTitle="TOTAL REQUESTS: "
                                    statApprovedRequests="Approved Requests:"
                                    statPendingRequests="Pending Requests:"
                                    statDisapprovedRequests="Disapproved Requests: "
                                    statDescription="All budgets Accounted for in this department"
                                    statIconName="fas fa-percent"
                                    statIconColor="bg-lightBlue-500"
                                />
                            </div>
                            <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                                <BudgetCard
                                    statSubtitle="BUDGET"
                                    statTitle="TOTAL AMOUNT: "
                                    statApprovedRequests="Amount Approved: "
                                    statPendingRequests="Amount Spent: "
                                    statDisapprovedRequests="Amount Left: "
                                    statDescription={<i className="fas fa-arrow-up text-emerald-500 mr-4"></i>}
                                    statIconName="fas fa-dollar-sign"
                                    statIconColor="bg-emerald-500"
                                />
                            </div>

                            {/*<div className="w-full lg:w-6/12 xl:w-4/12 p-4"></div>*/}

                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <Card
                                    statSubtitle="Divisions"
                                    statTitle={department.divisions?.length}
                                    statDescription="All Divisions in this department"
                                    statIconName="fas fa-boxes"
                                    statIconColor="bg-pink-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
