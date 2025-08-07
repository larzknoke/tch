import Header from "../../header";
import Footer from "../../footer";
import { Roboto_Condensed } from "next/font/google";
import MobileNav from "./../nav/mobile-nav";
import { useState } from "react";
import Head from "next/head";

// If loading a variable font, you don't need to specify the font weight
const roboto_cond = Roboto_Condensed({ subsets: ["latin"] });

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Tennis Club Holzminden von 1928 e.V</title>
        <meta
          name="description"
          content="Die Homepage des Tennis Club Holzminden von 1928 e.V."
        />
      </Head>
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
