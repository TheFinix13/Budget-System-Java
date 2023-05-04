import React, {useEffect, useState} from "react";
import axios from "axios";

// components
import TableDropdown from "../Dropdowns/TableDropdown";
import PropTypes from "prop-types";

//services
import {DepartmentService} from "../../data/api";
import {Alert} from "../Alerts";

export default function AllDepartmentTable({color, ministry_id}) {

    const [showAllDepartments, setShowAllDepartments] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchDepartments() {
        await axios.get(`${DepartmentService.getAllDepartments()}/${ministry_id}`)
            .then((response) => {
                const {data} = response;
                if (data){
                    setShowAllDepartments(data);
                    setLoading(true);
                }else{
                    console.error(data.message);
                    setLoading(true);
                }
            })
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    return (
        <>
            {loading === true ? (
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
                                Ministry Its Under
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
                        {showAllDepartments.map((row, index) => (
                            <tr key={index}>
                                <th key={index} className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                    {row.name}
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {row?.ministry?.name}
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

AllDepartmentTable.defaultProps = {
    color: "light",
};

AllDepartmentTable.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};
