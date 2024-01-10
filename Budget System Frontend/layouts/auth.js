import React from "react";

// components
import Navbar from "components/navbars/authNavbar.js";

export default function Auth({ children }) {
  return (
    <>
      <Navbar transparent />

      <main>
        <section className="relative w-full h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-cover"
            style={{
              backgroundImage: "url('/img/register_bg_2.png')",
            }}
          ></div>

            <div className="flex items-center justify-center h-full">
                <div className="container mx-auto">
                     {children}
                </div>
            </div>
        </section>
      </main>
    </>
  );
}
