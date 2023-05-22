import React, {useEffect, useState} from "react";

// components
import PropTypes from "prop-types";

//services
import {BudgetRequestServices as BudgetService, DivisionService} from "../../data/api";
import {useRouter} from "next/router";

export default function DivisionTable({color, handleShowMode}) {

    const[division, setDivision] = useState([]);
    const[loading, setLoading] = useState(false);

    const router = useRouter();
    const {id} = router.query;

    const [budgetRequest, setBudgetRequest] = useState([]);

    async function getDivisions() {
        setLoading(true);
        try {
            const divisionResponse = await DivisionService.getDivisionInDepartment(id);
            setDivision(divisionResponse.data);

            // console.log(divisionResponse.data);

            // Fetch budget requests for each division
            const requestPromises = divisionResponse.data.map((division) =>
                BudgetService.getBudgetRequestInDivision(division.id)
            );

            const requestResponse = await Promise.all(requestPromises);

            const budgetRequestData = requestResponse
                .map((response) => response.data);
            setBudgetRequest(budgetRequestData);

            // console.log(budgetRequestData);

        } catch (error) {
            console.log(error)
            setLoading(true);
        }

    }

    useEffect(() => {
        if (id){
            getDivisions();
        }
    }, [id]);

    const handleAddBudget = (divisionId, divisionName) => {
        handleShowMode(divisionId, divisionName);
    }

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
                                Divisions
                            </h3>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <>
                    <div className="block w-full overflow-x-auto">
                        {/* Projects table */}
                        <table className="items-cen+ter w-full bg-transparent border-collapse">
                            <thead>
                            <tr>
                                <th className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                    (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                }
                                >
                                    Division Name
                                </th>

                                <th className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                    (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                }
                                >
                                    Budget Requests
                                </th>

                                <th className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                    (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                }
                                >
                                    Budget Amount
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
                                {division.map((row, index) => {
                                    const divisionId = row.id;
                                    const budgetReq = budgetRequest[index] || []

                                    return (
                                        <tr key={divisionId}>
                                            {/*<Link href={`/admin/division/${row.id}`}>*/}
                                            {/*    <a>*/}
                                            <td key={index}
                                                className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                                {row.name}
                                            </td>
                                            {/*    </a>*/}
                                            {/*</Link>*/}

                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {budgetReq.map((req) => (
                                                    <div key={req.id} className="mb-2">
                                                        {req.narration}
                                                    </div>
                                                ))}
                                            </td>

                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {budgetReq.map((req) => (
                                                    <div key={req.id} className="mb-2">
                                                        &#8358;{req.amount.toLocaleString()}
                                                    </div>
                                                ))}
                                            </td>

                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {/*<i className="fas fa-circle text-orange-500 mr-2"></i>*/}
                                                {budgetReq.map((req) => (
                                                    <div key={req.id} className="mb-2">
                                                        {req.status}
                                                    </div>
                                                ))}
                                            </td>

                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                <div className="flex items-center">
                                                        <span className="mr-2">
                                                            {budgetReq.map((req) => (
                                                                <div key={req.id} className="mb-2">
                                                                    {/*{req.amountApproved}*/}
                                                                </div>
                                                            ))}
                                                        </span>

                                                    {budgetReq.every((req) => req.status === "Approved") && (
                                                        <div className="relative w-full">
                                                            <div className="overflow-hidden h-2 text-xs flex rounded bg-teal-200">
                                                                <div
                                                                    // style={{ width: `${totalAmountApproved / totalAmount * 100}%`, }}
                                                                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>

                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                                <button
                                                    className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={() => handleAddBudget(row.id, row.name)}
                                                >
                                                    ADD BUDGET
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>

                        </table>
                    </div>
                    </>
                ) : (
                    "Loading..."
                )}
            </div>
        </>
    );
}

DivisionTable.defaultProps = {
    color: "light",
};

DivisionTable.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};
