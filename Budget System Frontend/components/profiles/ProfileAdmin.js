import React, {useEffect, useRef, useState} from "react";

import {useRouter} from "next/router";
import {AdminService, MinistryService, UserService} from "../../data/api";
import {Alert, AlertTitle} from "@mui/material";
import {Dropdown, DropdownButton, DropdownItem, DropdownMenu, DropdownToggle} from "react-bootstrap";

export default function ProfileAdmin() {

  const [profilePhoto, setProfilePhoto] = useState("/img/team-2-800x800.jpg");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const fileInputRef = useRef(null);

  const [alert, setAlert] = useState({
    type: '',
    message: ''
  });

  const [adminDetails, setAdminDetails] = useState({})
  const [ministryDetails , setMinistryDetails] = useState({})

  const [showDropdown, setShowDropdown] = useState(false);

  // const [editingName, setEditingName] = useState(false);
  // const [newFirstName, setNewFirstName] = useState(adminDetails.firstname);
  // const [newLastName, setNewLastName] = useState(adminDetails.lastname);

  const [isEmailEditing, setIsEmailEditing] = useState(false);
  const [editedEmail, setEditedEmail] = useState(adminDetails.email);



  const router = useRouter();
  const {id} = router.query

  async function fetchTheAdmin() {
    AdminService.getAnAdmin(id)
        .then((res) => {
          const adminData = res.data;
          setAdminDetails(adminData);

          return MinistryService.getMinistryFromAdmin(id)
        })
        .then((res) => {
          const ministryData = res.data;
          setMinistryDetails(ministryData);
        })
        .catch((error) => {
          console.error("Error fetching administrator data:", error);
        })
  }

  useEffect(() => {
    if (id) {
      fetchTheAdmin()
    }
  }, [id])


  const toggleConfirmation = () => {
    setShowConfirmation(!showConfirmation);
  };

  // const handleDropdownSelection = (eventKey) => {
  //   // Handle the dropdown item selection
  //   switch (eventKey) {
  //     case "changePhoto":
  //       handleProfilePhotoChange();
  //       break;
  //     case "changeName":
  //       handleNameChange();
  //       break;
  //     case "changeEmail":
  //       handleEmailChange();
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // async function handleNameChange() {
  //   const nameDetails = {
  //     firstname: adminDetails.firstname, // assuming this state holds the updated first name
  //     lastname: adminDetails.lastname,   // assuming this state holds the updated last name
  //   };
  //
  //   try {
  //     const response = await UserService.updateName(id, nameDetails);
  //     if (response.data.success) {
  //       setAdminDetails({...adminDetails, ...nameDetails});
  //       setAlert({
  //         type: 'success',
  //         message: 'Name updated successfully!'
  //       });
  //     } else {
  //       setAlert({
  //         type: 'error',
  //         message: 'Failed to update name. Please try again.'
  //       });
  //     }
  //   } catch (error) {
  //     setAlert({
  //       type: 'error',
  //       message: `Error occurred: ${error.message}`
  //     });
  //   }
  // }
  //
  //
  // const handleEmailChange = async () => {
  //   try {
  //     const newEmail = prompt("Enter the new email:");
  //     if (newEmail !== null) {
  //       const emailDetails = { newEmail };
  //       const response = await UserService.updateEmail(id, emailDetails);
  //
  //       setAlert({
  //         type: "success",
  //         message: "Email updated successfully.",
  //       });
  //
  //       // Fetch the updated admin details after a successful update
  //       await fetchTheAdmin();
  //     }
  //   } catch (error) {
  //     console.error("Error updating email:", error);
  //     setAlert({
  //       type: "error",
  //       message: "An error occurred while updating the email.",
  //     });
  //   }
  // };

  const handleProfilePhotoChange = (e) => {
    const selectedFile = e.target.files && e.target.files.length > 0 ? e.target.files[0] : null; // Get the selected file from the input

    const formData = new FormData();
    formData.append("profilePhoto", selectedFile);

    const isValidImageType = (fileType) => { // List of valid image file types
      const validImageTypes = ["image/jpeg", "image/png", "image/gif", /* Add more as needed */];
      return validImageTypes.includes(fileType); // Check if the fileType is in the list of valid image types
    };

    const processAndUploadImage = (selectedFile) => {
      const reader = new FileReader();
      reader.onload = (event) => {

        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Calculate the dimensions to fit within 800x800 square
          const maxSize = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width *= maxSize / height;
              height = maxSize;
            }
          }
          // Set canvas size to 800x800 pixels
          canvas.width = maxSize;
          canvas.height = maxSize;

          // Center the image within the square
          const x = (maxSize - width) / 2;
          const y = (maxSize - height) / 2;

          ctx.drawImage(img, x, y, width, height); // Draw the image on the canvas (resized and centered)

          UserService.updateProfilePhoto(id, formData)
              .then((response) => {
                console.log('Profile photo updated successfully:', response.data);
                const newProfilePhoto = canvas.toDataURL("image/jpeg"); // Convert canvas content to a data URL (base64)
                setProfilePhoto(newProfilePhoto); // Update the profile photo with the new image

                setShowConfirmation(false); // Hide the confirmation message

                setAlert({
                  type: 'success',
                  message: 'Profile photo updated successfully.'
                });
              })
              .catch((error) => {
                console.error("Error updating profile photo:", error);

                setAlert({
                  type: "error",
                  message: "An error occurred while updating the profile photo.",
                });
              });
        };
      };
      reader.readAsDataURL(selectedFile);
    }

    if (selectedFile) {
      if (!isValidImageType(selectedFile.type)) { // Check if the selected file is an image
        setAlert({ // Display an error message and return
          type: "error",
          message: "Please select a valid image file (e.g., JPG, PNG).",
        });
        return;
      }
      processAndUploadImage(selectedFile)
    }
  };

  const handleSelectFile = () => {
    fileInputRef.current.click(); // Trigger the file input when the "Change Photo" button is clicked
  };


  return (
      <>
        {/*<Navbar transparent />*/}

        <main className="profile-page">
          <section className="relative block h-500-px">
            <div
                className="absolute top-0 w-full h-full bg-center bg-cover"
                style={{
                  backgroundImage:
                      "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
                }}
            >
            <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
            >
              {showConfirmation && (
                  <div className="inset-0 flex items-center justify-center z-50 pt-20">
                    <div className="bg-white w-96 p-4 rounded-lg shadow-lg">
                      <p className="text-gray-800 mb-4">
                        Do you want to change your profile photo?
                      </p>
                      <div className="flex justify-end">
                        <button
                            onClick={handleSelectFile}
                            className="bg-blueGray-700 text-white px-4 py-2 rounded-md mr-2"
                        >
                          Yes
                        </button>
                        <button
                            onClick={toggleConfirmation}
                            className="bg-red-600 text-white px-4 py-2 rounded-md"
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>
              )}

              {/*// <Alert System*/}
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
            </span>
            </div>

            <div
                className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
                style={{ transform: "translateZ(0)" }}
            >
              <svg
                  className="absolute bottom-0 overflow-hidden"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
              >
                <polygon
                    className="text-blueGray-200 fill-current"
                    points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
          </section>

          <section className="relative py-16 bg-blueGray-200">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">

                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative">
                        <img
                            alt="..."
                            src={profilePhoto}
                            className="shadow-xl rounded-full h-auto w-36 lg:w-44 object-cover object-center border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                        />
                      </div>
                    </div>

                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-32 sm:mt-0">

                        {/* Use react-bootstrap DropdownButton for the dropdown */}
                        <Dropdown
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                            show={showDropdown}
                        >

                          <DropdownToggle
                              variant="outline-primary"
                              id="edit-dropdown"
                              className="bg-blueGray-700 active:bg-blueGray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          >
                            Edit Information
                          </DropdownToggle>

                          {/* Use custom styling to make the options appear vertically */}
                          <DropdownMenu style={
                            { display: showDropdown ? "flex" : "none",
                              flexDirection: "column",
                              opacity: showDropdown ? 1 : 0,
                              transition: "opacity 0.3s ease-in-out",
                            }}
                          >

                            {/* Each Dropdown.Item represents an edit option */}
                            <DropdownItem eventKey="changePhoto"
                                          className="bg-blueGray-700 active:bg-blueGray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150">
                              Change Photo
                            </DropdownItem>
                            <DropdownItem eventKey="changeName"
                                          className="bg-blueGray-700 active:bg-blueGray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150">
                              Change Name
                            </DropdownItem>
                            <DropdownItem eventKey="changeEmail"
                                          className="bg-blueGray-700 active:bg-blueGray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150">
                              Change Email
                            </DropdownItem>
                            {/* Add more options as needed */}
                          </DropdownMenu>

                        </Dropdown>

                      </div>

                    </div>

                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8">

                        <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          {ministryDetails.totalDepartments}
                        </span>
                          <span className="text-sm text-blueGray-400">
                          Departments
                        </span>
                        </div>

                        <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          {ministryDetails.totalDivisions}
                        </span>
                          <span className="text-sm text-blueGray-400">
                          Divisions
                        </span>
                        </div>

                        <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          {ministryDetails.totalBudgetRequests}
                        </span>
                          <span className="text-sm text-blueGray-400">
                          Budget Request Count
                        </span>
                        </div>
                      </div>
                    </div>

                  </div>

                  <div className="text-center mt-2">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                          {adminDetails.firstname} {adminDetails.lastname}
                    </h3>

                    <div className="flex justify-between mt-8">
                      <div className="text-left">
                        <h3 className="text-blueGray-600 mb-6">
                          ADMINISTRATOR DETAILS
                        </h3>
                        
                        <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                <i className="fas fa-envelope mr-2 text-lg text-blue-800"></i>{" "}
                                {adminDetails.email}
                        </div>

                        <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                          <i  className={`fas ${
                              adminDetails.status === "active"
                                  ? "fa-thumbs-up text-emerald-800" // Green color for active
                                  : "fa-thumbs-down text-red-800" // Red color for inactive
                          } mr-2 text-lg text-blueGray-400`}
                        ></i>{" "}
                              Status : {adminDetails.status}
                        </div>
                      </div>

                      <div className="text-right">
                        <h3 className="text-blueGray-600 mb-6">
                          ADMINISTRATOR IN CHARGE OF
                        </h3>

                        <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                          <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                          {ministryDetails.name}
                        </div>

                        <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                          <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
                          {ministryDetails.location}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>
          <input
              type="file"
              accept="image/*"
              onChange={handleProfilePhotoChange}
              style={{display: "none"}}
              ref={fileInputRef}
          />
        </main>

      </>
  );
}
