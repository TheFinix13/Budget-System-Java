import React from "react";

// components
import TableDropdown from "../dropdowns/tableDropdown";
import PropTypes from "prop-types";
import Link from "next/link";

//services

export default function DepartmentTableForMinistry({color, showDepartments, sortBy, sortOrder, id}) {

    // Function to sort departments
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

    const sortedDepartments = sortData([...showDepartments]);

    return (
        <>
            {showDepartments.length > 0 ? (
                <div className= {
                    "relative flex flex-col min-w-0 break-words bg-white w-full mt-6 shadow-lg rounded " +
                    (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
                }
                >
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
                                    Department Name
                                </th>

                                <th className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                    (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                }
                                >
                                    Department Code
                                </th>

                                <th className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                    (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                }
                                >
                                    Description
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
                            {sortedDepartments.map((row, index) => (
                                <tr key={index}>
                                    <Link
                                        href={`/ministry/department/[id]?ministryId=${id}&departmentId=${row.id}`}
                                        as={`/ministry/department/${id}?ministryId=${id}&departmentId=${row.id}`}
                                    >
                                            <th key={index} className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                                {row.name}
                                            </th>
                                    </Link>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {row.code}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {row.description}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                        <TableDropdown />
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

DepartmentTableForMinistry.defaultProps = {
    color: "light",
};

DepartmentTableForMinistry.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};
