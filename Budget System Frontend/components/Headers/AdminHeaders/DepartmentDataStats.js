import React, {useEffect, useState} from "react";

// components
import Card from "../../Cards/Card";
import BudgetCard from "../../Cards/BudgetCard";

//services
import {BudgetRequestServices, DepartmentService} from "../../../data/api";
import {useRouter} from "next/router";


export default function DepartmentDataStats() {
    const [department, setDepartment] = useState({});
    const [requests, setRequests] = useState([]);

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

    async function getRequestsInDepartment(){
        await BudgetRequestServices.getBudgetRequestInDepartment(id)
            .then((res) => {
                const { data } = res;
                setRequests(data);
            })
            .catch((error) => {
                console.error("Failed to fetch requests in department", error);
            });
    }

    useEffect(() => {
        if (id) {
            fetchADepartment();
            getRequestsInDepartment()
        }
    }, [id]);

    const approvedRequestsCount = requests.filter(
        (request) => request.status === "Approved").length;
    const pendingRequestsCount = requests.filter(
        (request) => request.status === "Created").length;
    const disapprovedRequestsCount = requests.filter(
        (request) => request.status === "Denied").length;

    const totalAmount = requests.reduce(
        (total, request) => total + request.amount, 0)
        .toLocaleString("en-NG", {
            style: "currency",
            currency: "NGN",
        });
    const amountApproved = requests
        .filter((request) => request.status === "Approved")
        .reduce((total, request) => total + request.amount, 0)
        .toLocaleString("en-NG", {
            style: "currency",
            currency: "NGN",
        });

    // const amountSpent = /* Calculate the total amount spent from requests */;
    // const amountLeft = /* Calculate the total amount left from requests */;


    return (
        <>
            {/* Header */}
            <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
                <div className="px-4 md:px-10 mx-auto w-full">
                    <div>
                        {/* Card stats */}
                        <div className="flex flex-wrap">

                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <Card
                                    statSubtitle="Divisions"
                                    statTitle={department.divisions?.length}
                                    statDescription="All Divisions in this department"
                                    statIconName="fas fa-boxes"
                                    statIconColor="bg-pink-500"
                                />
                            </div>

                            <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                                <BudgetCard
                                    statSubtitle="BUDGET"
                                    statTitle={`TOTAL: ${totalAmount}`}
                                    statApprovedRequests={`Amount Approved: ${amountApproved}`}
                                    statPendingRequests="Amount Spent: "
                                    statDisapprovedRequests="Amount Left: "
                                    statDescription="Budgeted Amount"
                                    statIconName="fas fa-dollar-sign"
                                    statIconColor="bg-emerald-500"
                                /*<i className="fas fa-arrow-up text-emerald-500 mr-4"/>*/
                                />
                            </div>

                            <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                                <BudgetCard
                                    statSubtitle="BUDGET REQUESTS"
                                    statTitle={`TOTAL: ${requests.length}`}
                                    statApprovedRequests={`Approved: ${approvedRequestsCount}`}
                                    statDisapprovedRequests={`Denied: ${disapprovedRequestsCount}`}
                                    statPendingRequests={`Pending: ${pendingRequestsCount}`}
                                    statDescription="All budget Requests Created in this department"
                                    statIconName="fas fa-percent"
                                    statIconColor="bg-lightBlue-500"
                                />
                            </div>
                            {/*<div className="w-full lg:w-6/12 xl:w-4/12 p-4"></div>*/}


                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
