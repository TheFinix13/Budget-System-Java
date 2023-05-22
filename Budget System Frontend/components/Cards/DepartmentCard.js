import React from "react";
import PropTypes from "prop-types";

export default function DepartmentCard({
  statTitle,
    statCode,
  statUnit,
   statDescription,
  statMinistry,
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
                                {statUnit}
                            </span>
                            <br />
                            <span className="text-blueGray-400 capitalize font-normal text-xs">
                                {statDescription}
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
                        <span className="whitespace-nowrap">{statMinistry}</span>
                    </p>

                </div>
            </div>
        </>
    );
}

DepartmentCard.defaultProps = {
    statTitle: "Department of Private Health",
    statUnit: "Units: ",
    statMinistry: "Ministry of Health",
    statIconName: "fas fa-building",
    statIconColor: "bg-orange-500"
};

DepartmentCard.propTypes = {
    statTitle: PropTypes.string,
    statUnit: PropTypes.string,
    // can be any of the text color utilities
    // from tailwindcss
    statMinistry: PropTypes.string,
    statIconName: PropTypes.string,
    // can be any of the background color utilities
    // from tailwindcss
    statIconColor: PropTypes.string,
};
