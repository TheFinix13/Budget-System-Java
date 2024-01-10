import React, {useEffect, useState} from "react";

import UserDropdown from "components/dropdowns/userDropdown.js";
import {useRouter} from "next/router";
import {AdminService} from "../../../data/api";

export default function DashboardNavbar() {
    const [approverName, setApproverName] = useState("")

    const router = useRouter();
    const {id} = router.query

    async function fetchTheApprover() {
        AdminService.getAnApprover(id)
            .then((res) => {
                const approverData = res.data;
                setApproverName(approverData.lastname + " FOR THE MINISTRY OF " + approverData.firstname);
            }).catch((error) => {
                console.error("Error fetching approver data:", error);
            })
    }

    useEffect(() => {
        if (id) {
            fetchTheApprover();
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
                        Welcome {approverName}
                    </span>
                        </p>

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
