import React from "react";
import PropTypes from "prop-types";

export default function RequestCard({
     statDivision,
    statCode,
     statNarration,
     statAmount,
    statAccept,
    statDecline,
     statIconName,
     statIconColor,
 }) {

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg cursor-pointer">
                <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                {statDivision}
                            </h5>
                            <span className="text-blueGray-400  font-medium text-xs">
                                {statCode}
                            </span>
                            <br />
                            <span className="text-blueGray-400  font-medium text-xs">
                                {statNarration}
                            </span>
                            <br />
                            <span className="text-blueGray-400  font-medium text-xs">
                                {statAmount}
                            </span>
                            <br />
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

                    <div className="text-blueGray-400 capitalize font-extralight text-xs mt-4">
                        <button
                            className="bg-emerald-500 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => statAccept()}
                        >
                            Approve
                        </button>
                        <button
                            className="bg-red-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => statDecline()}
                        >
                            Decline
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}

RequestCard.defaultProps = {
    statDivision: "Division of Personnel Cost",
    statNarration: "Handles all personnel staff",
    statAmount: "1,000,000 ",
    statAccept: "Accept",
    statDecline: "Decline",
    statIconName: "fas fa-usd-square",
    statIconColor: "bg-green-500",
};

Request.propTypes = {
    statDivision: PropTypes.string,
    statNarration: PropTypes.string,
    // statAmount: PropTypes.string,

    statAccept: PropTypes.string,
    statDecline: PropTypes.string,

    statIconName: PropTypes.string,
    // can be any of the background color utilities
    // from tailwindcss
    statIconColor: PropTypes.string,
};
