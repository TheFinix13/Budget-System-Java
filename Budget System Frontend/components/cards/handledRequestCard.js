import React from "react";
import PropTypes from "prop-types";

export default function HandledRequestCard({
    statDivision,
    statCode,
    statNarration,
    statAmount,
    statStatus,
    statIconName,
    statIconColor,
}) {

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg cursor-pointer h-40">
                <div className="flex-auto p-4">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5
                                className="text-blueGray-400 uppercase font-bold text-xs overflow-hidden"
                                style={{
                                    maxWidth: "12rem",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {statNarration}
                            </h5>
                            <span className="text-blueGray-400 font-medium text-xs">
                                {statAmount}
                            </span>
                        </div>

                        <div className="absolute top-0 right-0 mt-2 mr-2">
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

                    <div className="mt-2">
                        <div className="flex items-center">
                              <span className="text-blueGray-400 capitalize font-normal text-xs mr-1">
                                {statDivision},
                              </span>
                            <br/>
                            <span className="text-blueGray-400 capitalize font-normal text-xs">
                                {statCode}
                            </span>
                        </div>
                    </div>

                    <div>
                        {statStatus === "Approved" ? (
                            <span className="text-emerald-500 font-medium text-xs">
                                Approved
                            </span>
                        ) : statStatus === "Denied" ? (
                            <span className="text-red-500 font-medium text-xs">
                                Denied
                            </span>
                        ) : (
                            <span className="text-blueGray-400 font-medium text-xs">
                                {statStatus}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

HandledRequestCard.propTypes = {
    statDivision: PropTypes.string,
    statCode: PropTypes.string,
    statNarration: PropTypes.string,
    // statAmount: PropTypes.string,

    statStatus: PropTypes.string,
    statIconName: PropTypes.string,
    // can be any of the background color utilities
    // from tailwindcss
    statIconColor: PropTypes.string,
};
