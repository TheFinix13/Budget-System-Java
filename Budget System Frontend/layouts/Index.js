import React from "react";

// components
import Navbar from "components/Navbars/IndexNavbar.js";

export default function IndexLayout({ children }) {
    return (
        <>
            <Navbar fixed />

            <main>
                <section className="header relative pt-16 h-screen">
                        <div className="w-full sm:w-1/2">
                            <img
                                className="absolute top-0 right-0 mt-20 sm:mt-0 w-full sm:w-1/2 z-0"
                                src="/img/pattern_nextjs.png"
                                alt="..."
                            />
                        </div>

                    {children}
                </section>
            </main>
        </>
    );
}

