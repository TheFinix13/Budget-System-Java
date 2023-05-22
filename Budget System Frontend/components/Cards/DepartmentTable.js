import React, {useEffect, useState} from "react";

// components
import TableDropdown from "../Dropdowns/TableDropdown";
import PropTypes from "prop-types";

//services
import {DepartmentService} from "../../data/api";
import {useRouter} from "next/router";
import Link from "next/link";

export default function DepartmentTable({color}) {

    const[department, setDepartment] = useState([]);
    const[loading, setLoading] = useState(false);

    const router = useRouter();
    const {id} = router.query;

    async function getDepartment() {
        await DepartmentService.getDepartmentInMinistry(id)
            .then(response => {
                setDepartment(response.data);
                setLoading(true);
            })
            .catch(error => {
                console.error(error);
                setLoading(true);
            });
    }

    useEffect(() => {
        if (id){
            getDepartment();
        }
    }, [id]);


    return (
        <>
            <div className= {
                "relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded " +
                (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
                }
            >
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className={
                                    "font-semibold text-lg " +
                                    (color === "light" ? "text-blueGray-700" : "text-white")
                                }
                            >
                                Departments
                            </h3>
                        </div>
                    </div>
                </div>

                {loading === true ? (
                    <div className="block w-full overflow-x-auto">
                        {/* Projects table */}
                        <table className="items-center w-full bg-transparent border-collapse">
                            <thead>
                            <tr>
                                <th className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                    (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                    }
                                >
                                    Department Name
                                </th>

                                <th className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                    (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                    }
                                >
                                    Total Divisions
                                </th>

                                <th className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                    (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                    }
                                >
                                    Divisions Approved
                                </th>

                                <th className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                    (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                    }
                                >
                                    Total Amount Requested
                                </th>

                                <th className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                    (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                    }
                                >
                                    Total Amount Approved
                                </th>

                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                    }
                                ></th>
                            </tr>
                            </thead>

                            <tbody>
                                {department.map((row, index) => (
                                    <tr key={index}>
                                        <Link href={`/admin/department/${row.id}`}>
                                            <a>
                                                <th key={index} className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                                    {row.name}
                                                </th>
                                            </a>
                                        </Link>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {row.divisions?.length}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <i className="fas fa-circle text-teal-500 mr-2"></i>
                                            {row.ApprovedUnitCount}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {row.AmountRequested}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <div className="flex items-center">
                                                <span className="mr-2">
                                                   {row.AmountApproved}
                                                </span>
                                                <div className="relative w-full">
                                                    <div className="overflow-hidden h-2 text-xs flex rounded bg-teal-200">
                                                        <div
                                                            style={{ width: row.AmountApproved / row.AmountRequested * 100 + " %" }}
                                                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                            <TableDropdown />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                ) : (
                    "Loading..."
                    )}
            </div>
        </>
    );
}

DepartmentTable.defaultProps = {
    color: "light",
};

DepartmentTable.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};
