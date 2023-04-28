import React from "react";
import PropTypes from "prop-types";

export default function BudgetCard({
    statSubtitle,
    statTitle,
    statApprovedRequests,
    statPendingRequests,
    statDisapprovedRequests,
    statDescription,
    statIconName,
    statIconColor,
}) {
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h4 className="text-blueGray-700 uppercase font-bold text-xs">
                                {statSubtitle}
                            </h4>
                            <span className="font-semibold text-xs text-blueGray-400">
                                {statTitle}
                            </span>
                            <br/>
                            <span className="text-blueGray-400 uppercase font-normal text-xs">
                                {statApprovedRequests}
                            </span>
                            <br/>
                            <span className="text-blueGray-400 uppercase font-normal text-xs">
                                {statPendingRequests}
                            </span>
                            <br/>
                            <span className="text-blueGray-400 uppercase font-normal text-xs">
                                {statDisapprovedRequests}
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

                    <p className="text-blueGray-400 lowercase font-extralight text-xs mt-4">
                        <span className="whitespace-nowrap">{statDescription}</span>
                    </p>

                </div>
            </div>
        </>
    );
}

// BudgetCard.defaultProps = {
//   statSubtitle: "Ministry",
//   statTitle: "30",
//   statDescription: "sections of budgetSystem",
//   statIconName: "fas fa-house",
//   statIconColor: "bg-red-500",
// };

// BudgetCard.propTypes = {
//     statSubtitle: PropTypes.string,
//     statTitle: PropTypes.string,
//     // can be any of the text color utilities
//     // from tailwindcss
//     statDescription: PropTypes.string,
//     statIconName: PropTypes.string,
//     // can be any of the background color utilities
//     // from tailwindcss
//     statIconColor: PropTypes.string,
// };
