import React, {useState} from "react";

//components
import {Alert, AlertTitle, Dialog, DialogContent} from "@mui/material";

// services
import {BudgetRequestServices} from "../../../data/api";
import DivisionTable from "../../../components/cards/divisionTable";

export default function AddBudgetRequestInMinistry() {

    const [BudgetRequestData, setBudgetRequestData] = useState({
        narration: "",
        amount: "",
    });

    const parseAmountWithoutCommas = (formattedAmount) => {
        return formattedAmount.replace(/,/g, '');
    };

    const [viewMode, setViewMode] = useState(false);

    const [divisionId, setDivisionId] = useState(null);
    const [divisionName, setDivisionName] = useState("");

    const [alert, setAlert] = useState({
        type: '',
        message: ''
    });

    const [incompleteForm, setIncompleteForm] = useState(false);

    const handleHideMode = () => {
        setViewMode(false);
    };

    const handleShowMode = (divisionId, divisionName) => {
        setDivisionId(divisionId);
        setDivisionName(divisionName);
        setViewMode(true);
    }

    async function createBudgetRequest(e, divisionId) {
        e.preventDefault();

        const requiredFields = ['narration', 'amount'];
        const hasEmptyField = requiredFields.some((field) => !BudgetRequestData[field]);

        if (hasEmptyField) {
            setIncompleteForm(true);
            return;
        }
        // Remove comma separators and convert back to a valid double value
        const amount = parseAmountWithoutCommas(BudgetRequestData.amount);

        const requestData = {
            narration: BudgetRequestData.narration,
            amount: parseFloat(amount),
            status: BudgetRequestData.status
        };

        await BudgetRequestServices.addBudgetRequest(divisionId, requestData)
            .then((response) => {
                if (response.data){
                    setAlert({ type: 'success',
                        message: 'Budget Created successfully!' });
                }
            })
            .catch((error) => {
                if (error.response) {
                    setAlert({ type: 'error',
                        message: 'An error occurred while creating the budget request.' });
                }
            });

        setBudgetRequestData({
            narration: "",
            amount: "",
        });
    }

    return <>

        <DivisionTable
            handleShowMode={(divisionId, divisionName) =>
                handleShowMode(divisionId, divisionName)}
        />

        {viewMode ? (
            <Dialog open={viewMode} onClose={handleHideMode}>
                <DialogContent>
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                                <h6 className="text-blueGray-700 text-xl font-bold">Create Request</h6>
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
                            <form name="create-request" onSubmit={createBudgetRequest}>
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    Budget Request
                                </h6>

                                <div className="flex flex-wrap">

                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="create-request"
                                            >
                                                Budget Narration
                                            </label>
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Teaching Staff Salary"
                                                name={"narration"}
                                                value={BudgetRequestData.narration}
                                                onChange={(e) => {setBudgetRequestData({
                                                    ...BudgetRequestData,
                                                    narration: e.target.value});
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="create-request"
                                            >
                                                Budget Amount
                                            </label>
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="1,000,000"
                                                name={"amount"}
                                                value={BudgetRequestData.amount}
                                                onChange={(e) => {
                                                    const formattedAmount = e.target.value
                                                        .replace(/,/g, '')
                                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                                                    setBudgetRequestData({
                                                        ...BudgetRequestData,
                                                        amount: formattedAmount,
                                                    });
                                                }}
                                            />
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
                                            onClick={(e) =>
                                                createBudgetRequest(e, divisionId)}
                                        >
                                            Create Request
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
    </>;
}
