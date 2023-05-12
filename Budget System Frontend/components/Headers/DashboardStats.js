import React from "react";

// components
import Card from "components/Cards/Card.js";

export default function DashboardStats() {

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
                  statSubtitle="MINISTRY"
                  statTitle=""
                  statDescription="All ministries Added"
                  statIconName="fas fa-house"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <Card
                  statSubtitle="DEPARTMENT"
                  statTitle=" "
                  statDescription="All departments in Each ministry"
                  statIconName="fas fa-building"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <Card
                  statSubtitle="DIVISIONS"
                  statTitle="924"
                  statDescription="All divisions in Every department"
                  statIconName="fas fa-boxes"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <Card
                  statSubtitle="BUDGET"
                  statTitle=""
                  statDescription="All budget in Accounted for"
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
