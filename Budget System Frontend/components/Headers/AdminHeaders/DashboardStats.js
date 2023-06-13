import React, {useEffect, useState} from "react";

// components
import Card from "components/Cards/Card.js";
import {DepartmentService, DivisionService, MinistryService} from "../../../data/api";
import Link from "next/link";

export default function DashboardStats() {

  const [ministry, setMinistry] = useState([])
  const [departments, setDepartments] = useState([])
  const [divisions, setDivisions] = useState([])

  async function fetchMinistries() {
    await MinistryService.getMinistry()
        .then((res) => {
          const {data} = res;
          console.log(data)
          if (data){
            setMinistry(data);
          }else {
            console.error(data.message);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch ministries", error);
        })
  }

  async function fetchDepartments() {
    await DepartmentService.getAllDepartments()
        .then((response) => {
          const {data} = response;
          if (data){
            setDepartments(data);
          }else{
            console.error(data.message);
          }
        })
        .catch((error) => {
          console.error(error);
        })
  }

  async function fetchDivisions() {
    await DivisionService.getAllDivisions()
        .then((response) => {
          const {data} = response;
          if (data){
            setDivisions(data);
          }else{
            console.error(data.message);
          }
        })
        .catch((error) => {
          console.error(error);
        })
  }

  useEffect(() => {
    fetchMinistries();
    fetchDepartments();
    fetchDivisions()

  }, []);

  return (
    <>
      {/* Header */}
      <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <Link href="/admin/ministry">
                      <a>
                          <Card
                              statSubtitle="MINISTRY"
                              statTitle={ministry?.length}
                              statDescription="All ministries Added"
                              statIconName="fas fa-house"
                              statIconColor="bg-red-500"
                          />
                      </a>
                  </Link>
              </div>

              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <Link href="/admin/department">
                      <a>
                          <Card
                              statSubtitle="DEPARTMENT"
                              statTitle={departments?.length}
                              statDescription="All departments in Each ministry"
                              statIconName="fas fa-building"
                              statIconColor="bg-orange-500"
                          />
                      </a>
                  </Link>
              </div>

              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <Link href="/admin/division">
                        <a>
                            <Card
                              statSubtitle="DIVISIONS"
                              statTitle={divisions?.length}
                              statDescription="All divisions in Every department"
                              statIconName="fas fa-boxes"
                              statIconColor="bg-pink-500"
                            />
                        </a>
                  </Link>
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
