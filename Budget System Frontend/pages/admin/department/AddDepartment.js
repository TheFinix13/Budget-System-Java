import React, {useState} from "react";

import {MinistryService, sectors} from "../../../data/api";
import {Alert} from "../../../components/Alerts";
import DepartmentNavbar from "../../../components/Navbars/DepartmentNavbar";

export default function AddDepartment() {

    const [DepartmentData, setDepartmentData] = useState({
        name: "",
        description: "",
        ministry: ""

    });

    const [viewMode, setViewMode] = useState("hide");
    const [notificationsStatus, setNotificationsStatus] = useState(false)
    const [notificationsMessage, setNotificationsMessage] = useState({
        message: "",
        type: "",
    });

    async function addDepartment(e) {

        e.preventDefault();

        try {
            const response = DepartmentService.addDepartment(DepartmentData)
            if (response.data){
                setNotificationsMessage({
                    message: "Index added successfully",
                    type: "success",
                });
            }else {
                setNotificationsMessage({
                    message: "Error creating Index. Mot added",
                    type: "success",
                });
            };
            setNotificationsStatus(true);
        } catch (error) {
            if (error.response) {
                setNotificationsMessage({
                    message: error.response.data.message,
                    type: "error",
                });
                setNotificationsStatus(true);
            } else if (error.request) {
                setNotificationsMessage({
                    message: "Error creating Index. Mot added",
                    type: "error",
                });
                setNotificationsStatus(true);
            };
        }
    }

    return (
        <>
            {notificationsStatus ? (
                <Alert alert={notificationsMessage} setAlert={setNotificationsStatus} />
            ) : null}

            {viewMode === "show" ? (

                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                        <div className="text-center flex justify-between">
                            <h6 className="text-blueGray-700 text-xl font-bold">Add Department</h6>
                            <button
                                className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setViewMode("hide")}
                            >
                                <i className="fa-sharp fa-solid fa-xmark fa-xs">

                                </i>
                            </button>
                        </div>
                    </div>

                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <form onSubmit={addDepartment}>
                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                Department Information
                            </h6>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Name of Department
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Department of education"
                                            name={"name"}
                                            value={DepartmentData.name}
                                            onChange={(e) => { setDepartmentData({
                                                ...DepartmentData,
                                                name: e.target.value});
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Sector
                                        </label>
                                        <select
                                            type="select"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Select Sector"
                                            name={"sector"}
                                            value={DepartmentData.sector}
                                            onChange={(e) => { setDepartmentData({
                                                ...DepartmentData,
                                                sector: e.target.value});
                                            }}
                                        >
                                            <option value="" className="text-blueGray-300">Select Sector</option>

                                            {sectors.map((sector) => {
                                                return (
                                                    <option key={sector.id} value={sector.name}>
                                                        {sector.name}
                                                    </option>
                                                );
                                            })
                                            }
                                        </select>

                                    </div>
                                </div>

                                <div className="w-full lg:w-12/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Magodo Phase 1, Lagos"
                                            name={"location"}
                                            value={DepartmentData.location}
                                            onChange={(e) => { setDepartmentData({
                                                ...DepartmentData,
                                                location: e.target.value});
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-12/12 px-4">
                                    <div className="relative w-full">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="About the Department"
                                            name={"description"}
                                            value={DepartmentData.description}
                                            onChange={(e) => {setDepartmentData({
                                                ...DepartmentData,
                                                description: e.target.value});
                                            }}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            <hr className="mt-6 border-b-1 border-blueGray-300" />

                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                User Information
                            </h6>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Fiyin"
                                            name={"firstname"}
                                            value={DepartmentData.user.firstname}
                                            onChange={(e) => {setDepartmentData({
                                                ...DepartmentData,
                                                user: {
                                                    ...DepartmentData.user,
                                                    firstname: e.target.value},
                                            })}}
                                        />
                                    </div>
                                </div>

                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Akano"
                                            name={"lastname"}
                                            value={DepartmentData.user.lastname}
                                            onChange={(e) => {setDepartmentData({
                                                ...DepartmentData,
                                                user: {
                                                    ...DepartmentData.user,
                                                    lastname: e.target.value},
                                            })}}
                                        />
                                    </div>
                                </div>


                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            aria-placeholder="jesse@example.com"
                                            name={"email"}
                                            value={DepartmentData.user.email}
                                            onChange={(e) => {setDepartmentData({
                                                ...DepartmentData,
                                                user: {
                                                    ...DepartmentData.user,
                                                    email: e.target.value},
                                            })}}
                                        />
                                    </div>
                                </div>


                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="akano"
                                            name={"password"}
                                            value={DepartmentData.user.password}
                                            onChange={(e) => {setDepartmentData({
                                                ...DepartmentData,
                                                user: {
                                                    ...DepartmentData.user,
                                                    password: e.target.value},
                                            })}}
                                        />
                                    </div>
                                </div>
                                <br/>

                                <div className="w-full lg:w-1/12 px-4">
                                    <div className="relative w-full mb-3">

                                    </div>
                                </div>

                                <div className="w-full lg:w-12/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <button
                                            className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                            type="submit"
                                            onClick={addDepartment}
                                        >
                                            ADD Department
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <DepartmentNavbar
                    setViewMode={setViewMode}
                />
            )
            }
        </>
    );
}
