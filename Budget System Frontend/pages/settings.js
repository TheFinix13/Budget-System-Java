import React from "react";

// components
import CardSettings from "components/cards/cardSettings.js";
import CardProfile from "components/cards/cardProfile.js";

// layout for page
import AdminDashboard from "layouts/adminLayouts/adminDashboard.js";

export default function Settings() {
    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12 px-4">
                    <CardSettings/>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                    <CardProfile/>
                </div>
            </div>
        </>
    );
}

Settings.layout = AdminDashboard;
