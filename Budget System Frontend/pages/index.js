/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import Link from "next/link";

// layout for page
import IndexLayout from "layouts/index.js";

import Register from "./auth/register";


export default function Index() {
    return (
        <>
            <Register fixed/>

        </>
    );
}

Index.layout = IndexLayout;
