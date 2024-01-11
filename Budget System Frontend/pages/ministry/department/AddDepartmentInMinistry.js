import React, {useState} from "react";

//components
import {Alert, AlertTitle, Dialog, DialogContent} from "@mui/material";

// services
import {DepartmentService} from "../../../data/api";
import {useRouter} from "next/router";
import DepartmentNavbar from "../../../components/navbars/ministryNavbars/departmentNavbar";

export default function AddDepartmentInMinistry() {

    const [DepartmentData, setDepartmentData] = useState({
        name: "",
        code: "",
        description: "",
    });

    const [viewMode, setViewMode] = useState(false);


    const [alert, setAlert] = useState({
        type: '',
        message: ''
    });

    const [incompleteForm, setIncompleteForm] = useState(false);

    const handleHideMode = () => {
        setViewMode(false);
    };

    const handleShowMode = () => {
        setViewMode(true);
    }

    const router = useRouter();
    const { ministryId, departmentId } = router.query;

    async function addDepartment(e) {
        e.preventDefault();

        const requiredFields = ['name', 'code', 'description'];
        const hasEmptyField = requiredFields.some((field) => !DepartmentData[field]);

        if (hasEmptyField) {
            setIncompleteForm(true);
            return;
        }

        await DepartmentService.addDepartment(ministryId, DepartmentData)
            .then((response) => {
                if (response.data){
                    setAlert({ type: 'success',
                        message: 'Department added successfully!' });
                }
                window.location.reload();
            })
            .catch((error) => {
                if (error.response) {
                    setAlert({ type: 'error',
                        message: 'An error occurred while adding the department.' });
                }
            });

        setDepartmentData({
            name: "",
            code: "",
            description: "",
        });
    }

    return (
        <>
            <DepartmentNavbar
                handleShowMode = {handleShowMode}
            />

            {viewMode ? (
                <Dialog open={viewMode} onClose={handleHideMode}>
                    <DialogContent>
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                            <div className="rounded-t bg-white mb-0 px-6 py-6">
                                <div className="text-center flex justify-between">
                                    <h6 className="text-blueGray-700 text-xl font-bold">Add Department</h6>
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
                                <form name="add-department" onSubmit={addDepartment}>

                                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                        Department Information
                                    </h6>

                                    <div className="flex flex-wrap">
                                        <div className="w-full lg:w-8/12 px-4">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    htmlFor="add-department"
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

                                        <div className="w-full lg:w-4/12 px-4">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    htmlFor="add-department"
                                                >
                                                   Department Code
                                                </label>
                                                <input
                                                    type="text"
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    placeholder="AGR-100"
                                                    name={"name"}
                                                    value={DepartmentData.code}
                                                    onChange={(e) => { setDepartmentData({
                                                        ...DepartmentData,
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
            ) : "" }
        </>
    );
}
