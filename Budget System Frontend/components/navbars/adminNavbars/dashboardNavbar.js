import React, {useEffect, useState} from "react";

import UserDropdown from "components/dropdowns/userDropdown.js";
import {useRouter} from "next/router";
import {AdminService, MinistryService} from "../../../data/api";

export default function DashboardNavbar() {
    const [adminName, setAdminName] = useState("")
    const [ministryName, setMinistryName] = useState("")

    const router = useRouter();
    const {id} = router.query

    async function fetchTheAdmin() {
        AdminService.getAnAdmin(id)
            .then((res) => {
                const adminData = res.data;
                setAdminName(adminData.firstname + " " + adminData.lastname)

                return MinistryService.getMinistryFromAdmin(id)
            })
            .then((res) => {
                const ministryData = res.data;
                setMinistryName(ministryData.name);
            })
            .catch((error) => {
                console.error("Error fetching administrator data:", error);
            })
    }

    useEffect(() => {
        if (id) {
            fetchTheAdmin()
        }
    }, [id])

  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
            <div>
                <p className="text-white text-sm uppercase hidden lg:inline-block font-semibold">
                    <span>
                        Welcome {adminName}
                    </span>
                </p>

                {ministryName && (
                    <p className="text-white text-sm mt-2">
                        You are logged in as an Administrator for the {ministryName}
                    </p>
                )}
            </div>

          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown />
          </ul>
        </div>
      </nav>

      {/* End Navbar */}
    </>
  );
}
