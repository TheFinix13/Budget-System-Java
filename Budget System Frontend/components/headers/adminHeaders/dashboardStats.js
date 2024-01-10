import React, {useEffect, useState} from "react";

// components
import Card from "components/cards/card.js";
import {AdminService, DepartmentService, DivisionService, MinistryService} from "../../../data/api";
import Link from "next/link";
import {useRouter} from "next/router";

export default function DashboardStats() {

  const [ministry, setMinistry] = useState(null)
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const {id} = router.query

  async function fetchMinistryInfo() {
      await MinistryService.getMinistryFromAdmin(id)
          .then((response) => {
              const {data} = response;
              if (data) {
                  setMinistry(data);
              } else {
                  console.error(data.message);
              }

          })
          .catch((error) => {
              console.error("Error fetching ministry data", error);
          })
          .finally(() => {
              setLoading(false);
          });
  }

  useEffect(() => {
      if (id) {
          fetchMinistryInfo();
      }
  }, [id]);

  return <>
    {/* Header */}
    <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
      <div className="px-4 md:px-10 mx-auto w-full">
        <div>
          {/* Card stats */}
          <div className="flex flex-wrap">
              {!loading && !ministry && (
                  <p className="text-white text-center w-full">
                      Nothing to see here yet. Please create a ministry.
                  </p>
              )}

              {ministry && (
                  <>
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                        <Link href="/admin/department">

                            <Card
                                statSubtitle="DEPARTMENTS"
                                statTitle={ministry.totalDepartments}
                                statDescription="All departments in This ministry"
                                statIconName="fas fa-building"
                                statIconColor="bg-orange-500"
                            />

                        </Link>
                    </div>

                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                        <Link href="/admin/division">

                            <Card
                              statSubtitle="DIVISIONS"
                              statTitle={ministry.totalDivisions}
                              statDescription="All divisions in This Ministry"
                              statIconName="fas fa-boxes"
                              statIconColor="bg-pink-500"
                            />

                        </Link>
                    </div>

                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                        <Link href="/admin/budget">

                            <Card
                                statSubtitle="BUDGET REQUESTS"
                                statTitle={ministry.totalBudgetRequests}
                                statDescription="Budget Count in This Ministry"
                                statIconName="fas fa-percent"
                                statIconColor="bg-lightBlue-500"
                              />

                        </Link>
                    </div>

                      <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                          <Card
                              statSubtitle="REQUESTED AMOUNT"
                              statTitle={`₦${ministry?.totalBudgetAmount?.toLocaleString() || ''}`}
                              statDescription="Requested Budget Amount in This Ministry"
                              statIconName="fas fa-percent"
                              statIconColor="bg-lightBlue-500"
                          />
                      </div>
                  </>
              )}

          </div>
        </div>
      </div>
    </div>
  </>;
}
