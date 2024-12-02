import Link from "next/link";
import Image from "next/image";
import NavItemClub from "./ui/nav/nav-item-club";
import { Roboto_Condensed } from "next/font/google";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import MobileNav from "./ui/nav/mobile-nav";
import { useState } from "react";

const roboto_cond = Roboto_Condensed({ subsets: ["latin"] });

function Header() {
  const [navOpen, setNavOpen] = useState(false);

  function handleNav() {
    setNavOpen(!navOpen);
  }

  return (
    <header
      className={`${roboto_cond.className} container mx-auto text-tch-blue sticky -top-4 md:-top-24 bg-tch-blue-light md:pb-4 z-10`}
    >
      <div className="hidden md:flex flex-col md:flex-row px-5 md:px-0 items-start md:items-center gap-6 font-light py-5 md:py-10 justify-between">
        <Link
          className="bg-red-700 text-white px-4 py-1 rounded uppercase"
          href={"https://tc1928.ebusy.de/"}
          target="_blank"
        >
          Wintersaison:
          <span className="font-bold"> Hallenbuchung</span>
        </Link>
        <div className="gap-4 flex">
          <Link href={"datenschutz"}>Datenschutz</Link>
          <Link href={"impressum"}>Impressum</Link>
        </div>
      </div>
      <div className="flex flex-row justify-between pt-9 pb-4 md:pt-0 md:pb-0 px-5 md:px-0">
        <Link href={"/"}>
          <Image
            src="/tch_logo_full.svg"
            alt="TCH Logo"
            width="307"
            height="77"
            className="w-72 md:w-80 mx-auto"
            priority
          />
        </Link>
        <nav className="hidden md:flex font-light gap-7 text-lg self-center main-nav uppercase">
          <NavItemClub />
          <Link href={"/news"}>NEWS & NEUIGKEITEN</Link>
          <span>TEAMS</span>
          <span>TRAINING</span>
          <Link href={"/kontakt"}>Kontakt</Link>
        </nav>
        <div
          className=" md:hidden cursor-pointer w-10"
          onClick={() => handleNav()}
        >
          <XMarkIcon
            className={`absolute size-10 pt-1 transition-all  ${
              navOpen ? "rotate-0 " : "rotate-90 opacity-0"
            }`}
          />
          <Bars3Icon
            className={`absolute size-10 pt-1 transition-all  ${
              navOpen ? "rotate-90 opacity-0" : "rotate-0  "
            }`}
          />
        </div>
      </div>
      <MobileNav navOpen={navOpen} setNavOpen={setNavOpen} />
    </header>
  );
}

export default Header;
