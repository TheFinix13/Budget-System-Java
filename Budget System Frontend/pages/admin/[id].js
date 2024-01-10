import React, {useEffect, useState} from "react";

// components
import CardLineChart from "components/cards/cardLineChart.js";
import CardBarChart from "components/cards/cardBarChart.js";
import CardPageVisits from "components/cards/cardPageVisits.js";
import CardSocialTraffic from "components/cards/cardSocialTraffic.js";

// layout for page
import AdminDashboard from "layouts/adminLayouts/adminDashboard.js";
import {MinistryService} from "../../data/api";
import {useRouter} from "next/router";

export default function Dashboard() {
    const [ministry, setMinistry] = useState(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const {id} = router.query;

    // Fetch ministry information
    async function fetchMinistryInfo() {
        try {
            const response = await MinistryService.getMinistryFromAdmin(id);
            const { data } = response;
            if (data) {
                setMinistry(data);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching ministry data", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (id) {
            fetchMinistryInfo();
        }
    }, []);

    return (
        <>
            {loading && <p>Loading...</p>}

            {!loading && !ministry && <p>Nothing to see here yet. Please create a ministry.</p>}

            {!loading && ministry && (
                <>
                    <div className="flex flex-wrap">
                        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                            <CardLineChart />
                        </div>
                        <div className="w-full xl:w-4/12 px-4">
                            <CardBarChart />
                        </div>
                    </div>
                    <div className="flex flex-wrap mt-4">
                        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                            <CardPageVisits />
                        </div>
                        <div className="w-full xl:w-4/12 px-4">
                            <CardSocialTraffic />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

Dashboard.layout = AdminDashboard;
