import React, {useEffect, useState} from "react";

// components

//services
import {DepartmentService} from "../../data/api";
import {Alert} from "../Alerts";
import TableDropdown from "../Dropdowns/TableDropdown";
import PropTypes from "prop-types";
import axios from "axios";
export default function DepartmentTable({color, ministry_id}) {

    const[department, setDepartment] = useState([]);
    const[loading, setLoading] = useState(true);

    const[notificationDetails, setNotificationDetails] = useState({
        message: '',
        type: '',
    })


    async function getDepartment() {
        await axios.get(`${DepartmentService.getDepartmentInMinistry()}/${ministry_id}`)
            .then(response => {
                setDepartment(response.data);
                setLoading(false);
            })
            .catch(error => {
                setNotificationDetails({
                    message: 'Error loading department' + error,
                    type: 'error'
                })
                setLoading(false);
            });
    }

    useEffect(() => {
        getDepartment();
    }, []);

    return (
        <>
            {Alert(notificationDetails)}
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

                {loading === false ? (
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
                                    Total Units
                                </th>

                                <th className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                    (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                    }
                                >
                                    Units Approved
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
                                        <th key={index} className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                            {row.name}
                                        </th>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {row.UnitCount}
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
