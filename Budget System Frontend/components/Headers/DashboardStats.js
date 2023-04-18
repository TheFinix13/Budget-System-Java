import React, {useState} from "react";

// components

import CardStats from "components/Cards/CardStats.js";

export default function DashboardStats() {

  const [count, setCount] = useState(0);

  async function getMinistryCount() {
    const response = await fetch('http://localhost:3000/api/ministry');
    const data = await response.json();
    setCount(data.length);
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
                <CardStats
                  statSubtitle="MINISTRY"
                  statTitle=""
                  statDescription="All ministries Added"
                  statIconName="fas fa-house"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="DEPARTMENT"
                  statTitle=" "
                  statDescription="All departments in Each ministry"
                  statIconName="fas fa-building"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="UNITS"
                  statTitle="924"
                  statDescription="All units in Each department"
                  statIconName="fas fa-boxes"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
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
