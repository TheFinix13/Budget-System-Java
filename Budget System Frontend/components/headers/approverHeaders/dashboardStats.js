import React, {useEffect, useState} from "react";

// components
import Card from "components/cards/card.js";
import {
    AdminService,
    BudgetRequestServices,
} from "../../../data/api";
import Link from "next/link";
import {useRouter} from "next/router";

export default function DashboardStats() {

    const [approver, setApprover] = useState({})
    const [totalRequests, setTotalRequests] = useState(0);
    const [pendingRequests, setPendingRequests] = useState({});
    const [approvedRequests, setApprovedRequests] = useState({});
    const [rejectedRequests, setRejectedRequests] = useState({});

    const router = useRouter();
    const {id} = router.query

    async function fetchApproverInfo() {
        try {
            const approverResponse = await AdminService.getAnApprover(id);
            const {data: approverData} = approverResponse;

            const budgetRequestsResponse = await BudgetRequestServices.getBudgetRequestInMinistry(approverData.ministryID);
            const budgetRequests = budgetRequestsResponse.data;

            const totalRequests = budgetRequests.length;
            const pendingRequests = budgetRequests.filter(request => request.status === "Created");
            const ApprovedRequests = budgetRequests.filter(request => request.status === "Approved");
            const RejectedRequests = budgetRequests.filter(request => request.status === "Denied");

            setApprover(approverData);
            setTotalRequests(totalRequests);
            setPendingRequests(pendingRequests);
            setApprovedRequests(ApprovedRequests);
            setRejectedRequests(RejectedRequests);
        }
        catch (error) {
            console.error("Error fetching approver data:", error);
        }

    }

    useEffect(() => {
        if (id) {
            fetchApproverInfo();
        }
    }, [id])

    return <>
        {/* Header */}
        <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
            <div className="px-4 md:px-10 mx-auto w-full">
                <div>
                    {/* Card stats */}
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                            {/*<Link href="/approver/department">*/}

                            <Card
                                statSubtitle="ALL REQUESTS"
                                statTitle={totalRequests}
                                statDescription="All requests in This ministry"
                                statIconName="fas fa-file-download"
                                statIconColor="bg-lightBlue-500"
                            />

                            {/*</Link>*/}
                        </div>

                        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                            <Link href={`/approver/requests?id=${id}`}>

                                <Card
                                    statSubtitle="PENDING REQUESTS"
                                    statTitle={pendingRequests.length}
                                    statDescription="Pending requests in This Ministry"
                                    statIconName="fas fa-file"
                                    statIconColor="bg-lightBlue-500"
                                />

                            </Link>
                        </div>

                        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                            <Link href={`/approver/handled?id=${id}`}>
                                <Card
                                    statSubtitle="APPROVED REQUESTS"
                                    statTitle={approvedRequests.length}
                                    statDescription="Handled requests in This Ministry"
                                    statIconName="fas fa-calendar-check"
                                    statIconColor="bg-emerald-500"
                                    />
                            </Link>
                        </div>

                        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                            <Link href="/approver/handled">
                                <Card
                                    statSubtitle="DENIED REQUESTS"
                                    statTitle={rejectedRequests.length}
                                    statDescription="Handled requests in This Ministry"
                                    statIconName="fas fa-times"
                                    statIconColor="bg-red-500"
                                />
                            </Link>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    </>;
}
