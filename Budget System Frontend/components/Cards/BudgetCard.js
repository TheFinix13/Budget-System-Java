import React from "react";

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
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg h-40">
                <div className="flex-auto p-4 flex flex-col justify-center">
                    <div className="text-center">
                        {/*<div className="relative w-full h-full pr-4 max-w-full max-h-full flex-grow flex-1">*/}
                            <h4 className="text-blueGray-700 uppercase font-bold text-xs">
                                {statSubtitle}
                            </h4>
                            <span className="font-bold capitalize text-xs text-blueGray-700">
                                {statTitle}
                            </span>
                            <br/>
                            <span className="text-blueGray-400 capitalize font-normal text-xs">
                                {statApprovedRequests}
                            </span>
                            <br/>
                            <span className="text-blueGray-400 capitalize font-normal text-xs">
                                {statDisapprovedRequests}
                            </span>
                            <br/>
                            <span className="text-blueGray-400 capitalize font-normal text-xs">
                                {statPendingRequests}
                            </span>
                        </div>
                        <div className="absolute top-0 right-0 mr-4 mt-4">
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

                    <p className="text-blueGray-400 capitalize font-extralight text-xs mb-4 pl-4">
                        {statDescription}
                    </p>

                {/*</div>*/}
            </div>
        </>
    );
}

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
