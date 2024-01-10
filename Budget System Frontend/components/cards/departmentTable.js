import React, {useEffect, useState} from "react";

// components
import TableDropdown from "../dropdowns/tableDropdown";
import PropTypes from "prop-types";

//services
import {BudgetRequestServices, DepartmentService} from "../../data/api";
import {useRouter} from "next/router";
import Link from "next/link";

export default function DepartmentTable({color}) {

    const[department, setDepartment] = useState([]);
    const[loading, setLoading] = useState(false);
    const [budgetRequest, setBudgetRequest] = useState([]);

    const router = useRouter();
    const {id} = router.query;

    async function getDepartment() {
        await DepartmentService.getDepartmentInMinistry(id)
            .then(response => {
                setDepartment(response.data);
                setLoading(true);

                response.data.forEach(department =>{
                    getRequestInDepartment(department.id)
                        .then(response => {
                            setBudgetRequest(response.data);
                        })
                        .catch(error => {
                            console.error(error);
                        });
                })
            })
            .catch(error => {
                console.error(error);
                setLoading(true);
            });
    }

    async function getRequestInDepartment(departmentId) {
        return BudgetRequestServices.getBudgetRequestInDepartment(departmentId);
    }

    useEffect(() => {
        if (id){
            getDepartment();
        }
    }, [id]);


    return <>
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
                                Total Budget Requests
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

                            <th className={
                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                (color === "light"
                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                    : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                            }
                            >
                                Progress Bar
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
                            {department.map((row, index) => {
                                const requestData = budgetRequest.filter(item => item.departmentName === row.name);
                                const totalAmount = requestData.reduce(
                                                    (sum, item) => sum + item.amount, 0);
                                const totalApproved = requestData.reduce(
                                                    (sum, item) => {
                                                        if (item.status === 'Approved') {
                                                            return sum + item.amount;
                                                        }
                                                        return sum;
                                                    }, 0);

                                const percentage = totalAmount > 0 ? totalApproved / totalAmount : 0;

                                let progressBarColorClass;
                                    if (percentage <= 0.4) {
                                        progressBarColorClass = 'bg-red-500';
                                    } else if (percentage <= 0.79) {
                                        progressBarColorClass = 'bg-orange-500';
                                    } else {
                                        progressBarColorClass = 'bg-teal-500';
                                    }

                                return (
                                    <tr key={index}>
                                        <Link href={`/admin/department/${row.id}`} legacyBehavior>
                                            <th key={index}
                                                className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                                <a className = "hover:text-blue-500 hover:bg-blue-100 rounded-lg p-2" >
                                                    {row.name}
                                                </a>
                                            </th>
                                        </Link>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                                            {row.divisionCount}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                                            {requestData.length}
                                        </td>

                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                                            {requestData.length > 0 ? `₦${totalAmount.toLocaleString()}` : '₦0'}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                                                   {requestData.length > 0 ? `₦${totalApproved.toLocaleString()}` : '₦0'}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <div className="relative w-full h-2">
                                                <div className="overflow-hidden h-full text-xs flex rounded-full bg-gray-200">
                                                    <div
                                                        style={{ width: `${percentage * 100}%` }}
                                                        className={`shadow-none flex flex-col text-center whitespace-nowrap justify-center ${progressBarColorClass}`}
                                                    ></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                            <TableDropdown/>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>

                    </table>
                </div>
            ) : (
                "Loading..."
                )}
        </div>
    </>;
}

DepartmentTable.defaultProps = {
    color: "light",
};

DepartmentTable.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};
