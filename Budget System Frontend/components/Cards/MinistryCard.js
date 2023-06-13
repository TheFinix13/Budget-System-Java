import React from "react";
import PropTypes from "prop-types";

export default function MinistryCard({
      statTitle,
      statDepartment,
      statUnit,
      statDescription,
      statIconName,
      statIconColor,
  }) {

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg cursor-pointer">
                <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="text-blueGray-400 uppercase font-bold text-xs whitespace-nowrap">
                                {statTitle}
                            </h5>
                            <span className="text-blueGray-400  font-medium text-xs">
                                {statDepartment}
                            </span>
                            <br />
                            <span className="text-blueGray-400  font-medium text-xs">
                                {statUnit}
                            </span>
                            <br />
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

                    <p className="text-blueGray-400 capitalize font-extralight text-xs mt-4">
                        <span className="whitespace-nowrap">{statDescription}</span>
                    </p>

                </div>
            </div>
        </>
    );
}


MinistryCard.propTypes = {
    statTitle: PropTypes.string,
    statDepartment: PropTypes.string,
    statUnit: PropTypes.string,
    // can be any of the text color utilities
    // from tailwindcss
    statDescription: PropTypes.string,
    statIconName: PropTypes.string,
    // can be any of the background color utilities
    // from tailwindcss
    statIconColor: PropTypes.string,
};
