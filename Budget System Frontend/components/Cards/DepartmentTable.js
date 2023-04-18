import React, {useEffect, useState} from "react";

// components

//services
import {DepartmentService} from "../../data/api";
import {Alert} from "../Alerts";
export default function DepartmentTable() {

    const[department, setDepartment] = useState([]);
    const[loading, setLoading] = useState(true);

    const[notificationDetails, setNotificationDetails] = useState({
        message: '',
        type: '',
    })


    async function getDepartment() {
        await DepartmentService.getDepartmentInMinistry()
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
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="font-semibold text-base text-blueGray-700">
                               Departments
                            </h3>
                        </div>
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                            <button
                                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                            >
                                See all
                            </button>
                        </div>
                    </div>
                </div>

                {loading === false ? (
                    <div className="block w-full overflow-x-auto">
                        {/* Projects table */}
                        <table className="items-center w-full bg-transparent border-collapse">
                            <thead>
                            <tr>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Department Name
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Total Units
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Units Approved
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Total Amount Requested
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Total Amount Approved
                                </th>
                            </tr>
                            </thead>

                            <tbody>
                                {department.map((row, index) => (
                                    <tr key={index}>
                                        <th key={index} className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                            {row.Name}
                                        </th>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {row.UnitCount}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                                            {row.ApprovedUnitCount}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {row.AmountRequested}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <i className="fas fa-arrow-down text-orange-500 mr-4"></i>
                                            {row.AmountApproved}
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
