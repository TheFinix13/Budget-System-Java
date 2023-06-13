import React, {useEffect, useState} from "react";

// components
import Card from "components/Cards/Card.js";
import {BudgetRequestServices, MinistryService} from "../../../data/api";
import Link from "next/link";
import {useRouter} from "next/router";
import BudgetCard from "../../Cards/BudgetCard";

export default function DashboardStats() {

    const [ministry, setMinistry] = useState({});
    const [requests, setRequests] = useState([]);

    const router = useRouter();
    const {id} = router.query;
    async function fetchAMinistry() {
        await MinistryService.getAMinistry(id)
            .then((res) => {
                const {data} = res;
                setMinistry(data)
            }).catch((error) => {
                console.error("Failed to fetch ministries", error);
            })
    }
    async function getRequestsInMinistry(){
        await BudgetRequestServices.getBudgetRequestInMinistry(id)
            .then((res) => {
                const { data } = res;
                setRequests(data);
            })
            .catch((error) => {
                console.error("Failed to fetch requests in ministry", error);
            });
    }

    useEffect(() => {
        if (id) {
            fetchAMinistry();
            getRequestsInMinistry()
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

    return (
        <>
            {/* Header */}
            <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
                <div className="px-4 md:px-10 mx-auto w-full">
                    <div>
                        {/* Card stats */}
                        <div className="flex flex-wrap">

                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <Link href={`/ministry/department/department?id=${id}`}>
                                    <a>
                                        <Card
                                            statSubtitle="DEPARTMENT"
                                            statTitle={ministry.totalDepartments}
                                            statDescription="All departments in This ministry"
                                            statIconName="fas fa-building"
                                            statIconColor="bg-orange-500"
                                        />
                                    </a>
                                </Link>
                            {/*</div>*/}

                                <div className="mt-4"/>
                                    <Link href="/ministry/division/division">
                                        <a>
                                            <Card
                                                statSubtitle="DIVISIONS"
                                                statTitle={ministry.totalDivisions}
                                                statDescription="All divisions in This Ministry"
                                                statIconName="fas fa-boxes"
                                                statIconColor="bg-pink-500"
                                            />
                                        </a>
                                    </Link>
                                {/*</div>*/}
                            </div>

                            <div className="w-full lg:w-6/12 xl:w-4/12 p-4">
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

                            <div className="w-full lg:w-6/12 xl:w-4/12 p-4">
                                <BudgetCard
                                    statSubtitle="BUDGET REQUESTS"
                                    statTitle={`TOTAL: ${requests.length}`}
                                    statApprovedRequests={`Approved: ${approvedRequestsCount}`}
                                    statDisapprovedRequests={`Denied: ${disapprovedRequestsCount}`}
                                    statPendingRequests={`Pending: ${pendingRequestsCount}`}
                                    statDescription="All budget Requests Created in this Ministry"
                                    statIconName="fas fa-percent"
                                    statIconColor="bg-lightBlue-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
