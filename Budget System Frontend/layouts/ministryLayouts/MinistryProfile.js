import React from "react";

// components
import MinistrySidebar from "../../components/sidebar/ministrySidebar";
import ProfileMinistry from "../../components/profiles/profileMinistry";

export default function MinistryProfile({ children }) {

    return (
        <>
            <MinistrySidebar />

            <div className="relative md:ml-64 bg-blueGray-100">
                <ProfileMinistry />

                {/* Body */}
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    {children}
                </div>
            </div>
        </>
    );
}