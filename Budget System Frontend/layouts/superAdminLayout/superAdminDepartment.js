// import React from "react";
//
// // components
// import SuperAdminSidebar from "../../components/sidebar/superAdminSidebar";
// import SuperDepartmentNavbar from "../../components/navbars/superAdminNavbars/superDepartmentNavbar";
// import SuperDepartmentStats from "../../components/headers/superAdminHeaders/superDepartmentStats";
//
// export default function SuperAdminDepartment({children}) {
//
//     return (
//         <>
//             <SuperAdminSidebar/>
//
//             <div className="relative md:ml-64 bg-blueGray-100">
//                 <SuperDepartmentNavbar/>
//
//                 {/* Header */}
//                 <SuperDepartmentStats/>
//
//                 {/* Body */}
//                 <div className="px-4 md:px-10 mx-auto w-full -m-24">
//                     {children}
//                 </div>
//             </div>
//         </>
//     );
// }