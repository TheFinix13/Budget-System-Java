import React, {useEffect, useState} from "react";

//components
import {Alert, AlertTitle, Dialog, DialogContent} from "@mui/material";

// services
import {DepartmentService, DivisionService} from "../../../data/api";
import {useRouter} from "next/router";
import DepartmentDataNavbar from "../../../components/navbars/adminNavbars/departmentDataNavbar";

export default function AddDivision() {

    const [DivisionData, setDivisionData] = useState({
        name: "",
        code: "",
        description: "",
    });

    const [viewMode, setViewMode] = useState(false);

    const handleHideMode = () => {
        setViewMode(false);
    };

    const handleShowMode = () => {
        setViewMode(true);
    }

    const [department, setDepartment] = useState(null);

    const router = useRouter();
    const {id: departmentId} = router.query;

    const [alert, setAlert] = useState({
        type: '',
        message: ''
    });

    const [incompleteForm, setIncompleteForm] = useState(false);

    async function addDivision(e) {
        e.preventDefault();

        const requiredFields = ['name', 'code', 'description'];
        const hasEmptyField = requiredFields.some((field) => !DivisionData[field]);

        if (hasEmptyField) {
            setIncompleteForm(true);
            return;
        }

        await DivisionService.addDivision(departmentId, DivisionData)
            .then((response) => {
                if (response.data){
                    setAlert({ type: 'success',
                        message: 'Division created successfully!' });
                }

                // Clear the form after a short delay (e.g., 500ms) to ensure the user sees the success message
                setTimeout(() => {
                    window.location.reload();

                    setDivisionData({
                        name: "",
                        code: "",
                        description: "",
                    });
                }, 500);
            })

            .catch((error) => {
                if (error.response) {
                    setAlert({ type: 'error',
                        message: 'An error occurred while creating the division.' });
                }
            });

        setTimeout(() => {
            setAlert({ type: '',
                message: '' });
        }, 3000);
    }

    async function fetchDepartmentName() {
        await DepartmentService.getADepartment(departmentId)
            .then((res) => {
                const {data} = res;
                if (data){
                    setDepartment(data)
                }
            }).catch((error) => {
                console.error("Failed to fetch department name", error);
            })
    }

    useEffect(() => {
        if (departmentId) {
            fetchDepartmentName();
        }
        // Set the default value for the Division Code when the department changes
        setDivisionData((prevData) => ({
            ...prevData,
            code: `${department?.code || ""}-`, // Include the department code as a prefix
        }));

    }, [departmentId]);

    return (
        <>
            <DepartmentDataNavbar
                handleShowMode={handleShowMode}
            />

            {viewMode ? (
                <Dialog open={viewMode} onClose={handleHideMode}>
                    <DialogContent>
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                            <div className="rounded-t bg-white mb-0 px-6 py-6">
                                <div className="text-center flex justify-between">
                                    <h6 className="text-blueGray-700 text-xl font-bold">Add Division</h6>
                                    <button
                                        className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => handleHideMode()}
                                    >
                                        <i className="fas fa-times">
                                        </i>
                                    </button>
                                </div>
                            </div>

                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <form name="add-department" onSubmit={addDivision}>
                                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                        Division Information
                                    </h6>

                                    <div className="flex flex-wrap">

                                        <div className="w-full lg:w-12/12 px-4">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    htmlFor={"department"}
                                                >
                                                    Department
                                                </label>
                                                <div
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-white bg-blueGray-800 rounded text-sm shadow">
                                                    {department?.name}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    htmlFor="add-department"
                                                >
                                                    Name of Division
                                                </label>
                                                <input
                                                    type="text"
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    placeholder="Division of Overhead Cost"
                                                    name={"name"}
                                                    value={DivisionData.name}
                                                    onChange={(e) => { setDivisionData({
                                                        ...DivisionData,
                                                        name: e.target.value});
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="w-full lg:w-6/12 px-4">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    htmlFor="add-division-code"
                                                >
                                                    Division Code
                                                </label>
                                                <input
                                                    type="text"
                                                    id="add-division-code"
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    placeholder="EDU-100-01"
                                                    name={"code"}
                                                    value={DivisionData.code}
                                                    onChange={(e) => { setDivisionData({
                                                        ...DivisionData,
                                                        code: e.target.value});
                                                    }}
                                                />
                                            </div>
                                        </div>



                                        <div className="w-full lg:w-12/12 px-4">
                                            <div className="relative w-full">
                                                <label
                                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    htmlFor="add-department"
                                                >
                                                    Description
                                                </label>
                                                <textarea
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    placeholder="About the Division"
                                                    name={"description"}
                                                    value={DivisionData.description}
                                                    onChange={(e) => {setDivisionData({
                                                        ...DivisionData,
                                                        description: e.target.value});
                                                    }}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full lg:w-1/12 px-4">
                                        <div className="relative w-full mb-3">

                                        </div>
                                    </div>

                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <button
                                                className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                                type="submit"
                                                onClick={addDivision}
                                            >
                                                ADD Division
                                            </button>
                                        </div>
                                    </div>
                                </form>

                                {alert.type === 'success' && (
                                    <div className="absolute top-4 right-4">
                                        <Alert severity="success">
                                            <AlertTitle>Success</AlertTitle>
                                            {alert.message}
                                        </Alert>
                                    </div>
                                )}

                                {alert.type === 'error' && (
                                    <div className="absolute top-4 right-4">
                                        <Alert severity="error">
                                            <AlertTitle>Error</AlertTitle>
                                            {alert.message}
                                        </Alert>
                                    </div>
                                )}

                                {incompleteForm && (
                                    <div className="absolute top-4 right-4">
                                        <Alert severity="warning">
                                            <AlertTitle>Warning</AlertTitle>
                                            Please fill in all the required fields.
                                        </Alert>
                                    </div>
                                )}

                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            ) : " " }
        </>
    );
}
