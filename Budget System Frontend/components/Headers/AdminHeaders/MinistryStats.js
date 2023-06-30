import React, {useEffect, useState} from "react";

// components
import MinistryCard from "../../Cards/MinistryCard";
import {RingLoader} from "react-spinners";
//service
import {MinistryService} from "../../../data/api";
import Link from "next/link";
import {useRouter} from "next/router";
import AddMinistry from "../../../pages/admin/ministry/AddMinistry";


export default function MinistryStats({handleShowMode}) {

    const [ministry, setMinistry] = useState({});

    const [showAddMinistry, setShowAddMinistry] = useState(false);

    const [alert, setAlert] = useState({
        type: '',
        message: ''
    });

    const [isLoading, setIsLoading] = useState(true); // Loading state

    const router = useRouter();
    const {id} = router.query

    async function fetchTheMinistry() {
        setIsLoading(true) // Set loading state to true

        try {
            const res = await MinistryService.getMinistryFromAdmin(id);
            const {data} = res;
            if (data) {
                setMinistry(data);
            } else {
                setAlert({
                    type: 'error',
                    message: 'An error occurred while getting your ministry.'
                });
            }
        } catch (error) {
            setAlert({
                type: 'error',
                message: 'An error occurred.', error
            });
        } finally {
            setIsLoading(false); // Set loading state to false after fetching data
        }
    }

    useEffect(() => {
        fetchTheMinistry();
    }, [id]);
    const handleAddMinistry = () => {
        setShowAddMinistry(true);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-blueGray-800">
            {showAddMinistry ? (
                <AddMinistry
                    handleHideMode={() => setShowAddMinistry(false)}
                    handleShowMode={handleShowMode}
                />
            ) : (
                <>
                    {isLoading ? ( // Display loading animation while fetching data
                        <div className="flex justify-center items-center">
                            <RingLoader color="#ffffff" loading={isLoading} size={150} className="display-block m-0"/>
                        </div>
                    ) : Object.keys(ministry).length > 0 ? (
                        <div className="py-4 md:px-10 mx-auto w-full">
                            <Link href={`/admin/ministry/${ministry.ministry_id}`}>
                                <a>
                                    <MinistryCard
                                        key={ministry.ministry_id}
                                        statTitle={ministry.name}
                                        statDepartment={"Departments: " + ministry.totalDepartments}
                                        statUnit={"Divisions: " + ministry.totalDivisions}
                                        statDescription={ministry.description}
                                        statIconName="fas fa-house"
                                        statIconColor="bg-red-500"
                                    />
                                </a>
                            </Link>
                        </div>
                    ) : (
                        <div className="bg-white p-8 rounded shadow-lg text-center">
                            <p className="text-lg font-semibold mb-4 break-words">
                                No ministry has been created yet.
                            </p>
                            <p className="text-sm text-gray-500 mb-8 break-words">
                                As an administrator, it is crucial for you to create a ministry and handle its account.
                            </p>
                            <button
                                className="bg-blueGray-700 text-white font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mx-auto block transform transition duration-500 ease-in-out hover:scale-110"
                                type="button"
                                onClick={() => handleAddMinistry()}
                            >
                                <div className="text-center">
                                    <i className="fas fa-user-plus mr-2"></i> Add a ministry
                                </div>
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

