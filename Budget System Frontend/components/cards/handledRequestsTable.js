import React, {useEffect, useState} from "react";

// components
import PropTypes from "prop-types";
import {BudgetRequestServices as RequestService} from "../../data/api";

//services
export default function HandledRequestsTable({color, handledRequests, sortOrder, sortBy}) {

    const sortData = (data) => {
        return data.sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];

            // Handle numeric and string comparisons
            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
            } else {
                aValue = aValue ? aValue.toString().toLowerCase() : '';
                bValue = bValue ? bValue.toString().toLowerCase() : '';
                return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }
        });
    };

    const sortedRequests = sortData([...handledRequests]);

    return (
        <>
            {handledRequests.length > 0 ? (
                <div className= {
                    "relative flex flex-col min-w-0 break-words bg-white w-full mt-6 shadow-lg rounded " +
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
                                    History...
                                </h3>
                            </div>
                        </div>
                    </div>


                    <div className="rounded-t w-full overflow-x-auto">
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
                                    Department
                                </th>

                                <th className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                    (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                }
                                >
                                    Division
                                </th>

                                <th className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                    (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                }
                                >
                                    Division Code
                                </th>

                                <th className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                    (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                }
                                >
                                    Narration
                                </th>

                                <th className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                    (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                }
                                >
                                    Amount
                                </th>

                                <th className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                    (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                }
                                >
                                    Status
                                </th>

                                {/*<th*/}
                                {/*    className={*/}
                                {/*        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +*/}
                                {/*        (color === "light"*/}
                                {/*            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"*/}
                                {/*            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")*/}
                                {/*    }*/}
                                {/*></th>*/}
                            </tr>
                            </thead>

                            <tbody>
                            {sortedRequests.map((request) => (
                                <tr key={request.budget_id}>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {request.departmentName}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {request.divisionName}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {request.divisionCode}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {request.narration}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {`₦${request.amount.toLocaleString()} `}
                                    </td>
                                    <td className={`border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 
                                    ${request.status === 'Approved' ? (color === 'light' ? 'text-emerald-500' : 'text-emerald-700') : (color === 'light' ? 'text-red-500' : 'text-red-700')}`}>
                                        {request.status}
                                    </td>

                                </tr>
                            ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            ) : (
                "Loading..."
            )}
        </>
    );
}

HandledRequestsTable.defaultProps = {
    color: "light",
};

HandledRequestsTable.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};
