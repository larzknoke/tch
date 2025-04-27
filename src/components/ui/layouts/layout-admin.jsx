import Header from "../../header";
import Footer from "../../footer";
import { Roboto_Condensed } from "next/font/google";
import MobileNav from "../nav/mobile-nav";
import { useState } from "react";

// If loading a variable font, you don't need to specify the font weight
const roboto_cond = Roboto_Condensed({ subsets: ["latin"] });

export default function LayoutAdmin({ children }) {
  return <>{children}</>;
}
