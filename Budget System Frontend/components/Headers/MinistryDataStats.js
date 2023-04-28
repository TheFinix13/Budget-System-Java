import React, {useEffect, useState} from "react";

// components
import Card from "../Cards/Card";

//services
import {MinistryService} from "../../data/api";
import BudgetCard from "../Cards/BudgetCard";

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

    return (
        <>
            {/* Header */}
            <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
                <div className="px-4 md:px-10 mx-auto w-full">
                    <div>
                        {/* Card stats */}
                        <div className="flex flex-wrap">

                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                            <BudgetCard
                                statSubtitle="BUDGET REQUESTS"
                                statTitle="TOTAL REQUESTS: "
                                statApprovedRequests="APPROVED REQUESTS:"
                                statPendingRequests="PENDING REQUESTS:"
                                statDisapprovedRequests="DISAPPROVED REQUESTS: "
                                statDescription="All budgets Accounted for in this ministry"
                                statIconName="fas fa-percent"
                                statIconColor="bg-lightBlue-500"
                            />
                            </div>
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <BudgetCard
                                    statSubtitle="BUDGET"
                                    statTitle="TOTAL AMOUNT: "
                                    statApprovedRequests="AMOUNT APPROVED: "
                                    statPendingRequests="AMOUNT SPENT: "
                                    statDisapprovedRequests="AMOUNT LEFT: "
                                    statDescription={<i className="fas fa-arrow-up text-emerald-500 mr-4"></i>}
                                    statIconName="fas fa-dollar-sign"
                                    statIconColor="bg-emerald-500"
                                />
                            </div>

                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <Card
                                    statSubtitle="DEPARTMENTS"
                                    statTitle=" "
                                    statDescription="All departments in this ministry"
                                    statIconName="fas fa-building"
                                    statIconColor="bg-orange-500"
                                />
                            </div>
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <Card
                                    statSubtitle="UNITS"
                                    statTitle=" "
                                    statDescription="All Units in this ministry"
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
