import React, {useState} from "react";

import {MinistryService, sectors} from "../../../data/api";
import {Alert} from "../../../components/Alerts";
import MinistryNavbar from "../../../components/Navbars/MinistryNavbar";
import axios from "axios";

export default function AddMinistry() {

    const [ministryData, setMinistryData] = useState({
        name: "",
        sector: "",
        description: "",
        location: "",
            firstname: "",
            lastname: "",
            email: "",
            password: "",
    });

    const [viewMode, setViewMode] = useState("hide");
    const [notificationsStatus, setNotificationsStatus] = useState(false)
    const [notificationsMessage, setNotificationsMessage] = useState({
        message: "",
        type: "",
    });

    async function addMinistry(e) {
        e.preventDefault();

        await (MinistryService.addMinistry(ministryData))
            .then((res) => {
                // console.log(res)
                const createdMinistry = res.data;
                // console.log(createdMinistry)
                if (createdMinistry){
                    setNotificationsMessage({
                        message: "Ministry added successfully",
                        type: "success",
                    });
                }else {
                    setNotificationsMessage({
                        message: "Error creating Ministry. Mot added",
                        type: "success",
                    });
                };
                setNotificationsStatus(true);
            })
            .catch((error) => {
                if (error.response) {
                    setNotificationsMessage({
                        message: error.response.data.message,
                        type: "error",
                    });
                    setNotificationsStatus(true);
                } else if (error.request) {
                    setNotificationsMessage({
                        message: "Error creating Ministry. Mot added",
                        type: "error",
                    });
                    setNotificationsStatus(true);
                };
            })
    }

    return (
        <>
            {viewMode === "show" ? (

            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Add Ministry</h6>
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

                    {notificationsStatus ? (
                        <Alert alert={notificationsMessage} setAlert={setNotificationsStatus} />
                        // <p>Success</p>
                    ) : null}

                    <form onSubmit={addMinistry}>
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Ministry Information
                        </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Name of Ministry
                                    </label>
                                    <input
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="ministry of education"
                                        name={"name"}
                                        value={ministryData.name}
                                        onChange={(e) => { setMinistryData({
                                                ...ministryData,
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
                                        value={ministryData.sector}
                                        onChange={(e) => { setMinistryData({
                                            ...ministryData,
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
                                        value={ministryData.location}
                                        onChange={(e) => { setMinistryData({
                                                ...ministryData,
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
                                            placeholder="About the ministry"
                                            name={"description"}
                                            value={ministryData.description}
                                            onChange={(e) => {setMinistryData({
                                                    ...ministryData,
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
                                        value={ministryData.firstname}
                                        onChange={(e) => {setMinistryData({
                                                ...ministryData,
                                                firstname: e.target.value
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
                                        value={ministryData.lastname}
                                        onChange={(e) => {setMinistryData({
                                                ...ministryData,
                                                lastname: e.target.value
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
                                        value={ministryData.email}
                                        onChange={(e) => {setMinistryData({
                                                ...ministryData,
                                                email: e.target.value
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
                                        value={ministryData.password}
                                        onChange={(e) => {setMinistryData({
                                                ...ministryData,
                                                password: e.target.value,
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
                                        onClick={addMinistry}
                                    >
                                        ADD MINISTRY
                                    </button>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
                ) : (
                    <MinistryNavbar
                    setViewMode={setViewMode}
                    />
                )
            }
        </>
    );
}
