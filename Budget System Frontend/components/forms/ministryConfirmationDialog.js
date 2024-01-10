import {Dialog, DialogContent} from "@mui/material";
import React from "react";

export default function MinistryConfirmationDialog({onProceed, onCancel}) {
    return (
        <Dialog open={true} onClose={onCancel} maxWidth="sm" fullWidth
                className="fixed inset-0 flex items-center justify-center z-50 pl-4">

            <DialogContent>
                <div
                    className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                        <h6 className="text-blueGray-700 text-xl font-bold">Confirmation</h6>
                    </div>

                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            You can only create one ministry, and your account will be linked to that ministry.
                        </h6>
                        <h6 className="text-red-500 text-sm mt-3 mb-6 uppercase font-bold">
                            Are you sure you want to proceed?
                        </h6>

                        <button
                            className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="submit"
                            onClick={onProceed}
                        >
                            PROCEED
                        </button>

                        <button
                            className="bg-red-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="submit"
                            onClick={onCancel}
                        >
                            CANCEL
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};