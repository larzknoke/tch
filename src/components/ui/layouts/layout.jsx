import Header from "../../header";
import Footer from "../../footer";
import { Roboto_Condensed } from "next/font/google";
import MobileNav from "./../nav/mobile-nav";
import { useState } from "react";

// If loading a variable font, you don't need to specify the font weight
const roboto_cond = Roboto_Condensed({ subsets: ["latin"] });

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main
        className={`container mx-auto md:mt-10 md:mb-16 ${roboto_cond.className} `}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
