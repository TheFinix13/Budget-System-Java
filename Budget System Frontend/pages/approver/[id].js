import React from "react";

// components
import CardLineChart from "components/cards/cardLineChart.js";
import CardBarChart from "components/cards/cardBarChart.js";
import CardPageVisits from "components/cards/cardPageVisits.js";
import CardSocialTraffic from "components/cards/cardSocialTraffic.js";

// layout for page
import ApproverDashboard from "../../layouts/approverLayouts/approverDashboard";

export default function Dashboard() {
  return (
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
  );
}

Dashboard.layout = ApproverDashboard;
