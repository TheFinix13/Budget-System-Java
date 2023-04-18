import React from "react";
import PropTypes from "prop-types";

export default function MinistryCardStats({
      statTitle,
      statDepartment,
      statUnit,
      // statBudget,
      statDescription,
      statIconName,
      statIconColor,
      // ministry
  }) {

    // const{name, departmentCount, unitCount} = ministry
    // statTitle = name
    // statDepartment = departmentCount
    // statUnit = unitCount

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg cursor-pointer ministry__box hover:bg-[green]">
                <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                {statTitle}
                            </h5>
                            <span className="text-blueGray-400 uppercase font-normal text-xs">
                                {statDepartment}
                            </span>
                            <br />
                            <span className="text-blueGray-400 uppercase font-normal text-xs">
                                {statUnit}
                            </span>
                            <br />
                            {/*<span className="text-blueGray-400 uppercase font-normal text-xs">*/}
                            {/*    {statBudget}*/}
                            {/*</span>*/}
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

                    <p className="text-blueGray-400 lowercase font-extralight text-xs  mt-4">
                        <span className="whitespace-nowrap">{statDescription}</span>
                    </p>

                </div>
            </div>
        </>
    );
}

MinistryCardStats.defaultProps = {
    statTitle: "Index of Health",
    statDepartment: "Department: ",
    statUnit: "Unit: ",
    statDescription: "Everything about the ministry",
    statIconName: "fas fa-house",
    statIconColor: "bg-red-500",
};

MinistryCardStats.propTypes = {
    statTitle: PropTypes.string,
    statDepartment: PropTypes.number,
    statUnit: PropTypes.string,
    // can be any of the text color utilities
    // from tailwindcss
    statDescription: PropTypes.string,
    statIconName: PropTypes.string,
    // can be any of the background color utilities
    // from tailwindcss
    statIconColor: PropTypes.string,
};
