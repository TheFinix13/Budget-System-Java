import React from "react";

// components
import Navbar from "components/Navbars/IndexNavbar.js";

export default function IndexLayout({ children }) {
    return (
        <>
            <Navbar fixed/>
            <main>
                <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
                    {/*<div className="container mx-auto items-center flex flex-wrap">*/}
                    {/*    <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">*/}
                    {/*        <div className="pt-32 sm:pt-0">*/}
                                <img
                                    className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860-px"
                                    src="/img/pattern_nextjs.png"
                                    alt="..."
                                />
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {children}
                </section>
            </main>
        </>
    );
}
