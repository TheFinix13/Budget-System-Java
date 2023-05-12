import React from "react";
import PropTypes from "prop-types";

export default function DivisionCard({
       statTitle,
        statCode,
       statBudgetRequest,
       statBudgetDescription,
       statDepartment,
       statIconName,
       statIconColor,
   }) {

    return (
        <>
            <div className="relative flex min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                {statTitle}
                            </h5>
                            <span className="text-blueGray-400 uppercase font-bold text-xs">
                                {statCode}
                            </span>
                            <br/>
                            <span className="text-blueGray-400 font-medium text-xs">
                                {statBudgetRequest}
                            </span>
                            <br />
                            <span className="text-blueGray-400 font-normal text-xs">
                                {statBudgetDescription}
                            </span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                            <div
                                className={
                                    "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full " +
                                    statIconColor
                                }
                            >
                                <i className={statIconName}></i>
                            </div>
                        </div>
                    </div>

                    <p className="text-blueGray-400 uppercase font-bold text-xs  mt-4">
                        <span className="whitespace-nowrap">{statDepartment}</span>
                    </p>

                </div>
            </div>
        </>
    );
}

DivisionCard.defaultProps = {
    statTitle: "Division to handle salaries",
    statCode: "EDU-101-01",
    statBudgetRequest: "Budget Request: 10,000,000",
    statBudgetDescription: "To handle salaries for the year",
    statDepartment: "Department of Education",
    statIconName: "fas fa-boxes",
    statIconColor: "bg-pink-500"
};

DivisionCard.propTypes = {
    statTitle: PropTypes.string,
    statCode: PropTypes.string,
    statBudgetRequest: PropTypes.string,
    statBudgetDescription: PropTypes.string,
    // can be any of the text color utilities
    // from tailwindcss
    statDepartment: PropTypes.string,
    statIconName: PropTypes.string,
    // can be any of the background color utilities
    // from tailwindcss
    statIconColor: PropTypes.string,
};
