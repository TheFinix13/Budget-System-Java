import React from "react";

const PhotoConfirmationDialog = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal-container bg-white w-1/3 rounded-lg shadow-lg p-4">
                <p className="text-blueGray-700 text-lg mb-4">{message}</p>
                <div className="flex justify-end">
                    <button
                        onClick={onConfirm}
                        className="bg-blueGray-700 text-white font-bold hover:bg-blueGray-600 px-4 py-2 rounded mr-2"
                    >
                        Yes
                    </button>
                    <button
                        onClick={onCancel}
                        className="bg-blueGray-200 text-blueGray-700 hover:bg-blueGray-300 px-4 py-2 rounded"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PhotoConfirmationDialog;