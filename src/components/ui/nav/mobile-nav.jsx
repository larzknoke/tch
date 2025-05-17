import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";

function MobileNav({ navOpen = false, setNavOpen }) {
  const [clubNav, setClubNav] = useState(false);
  const [trainingNav, setTrainingNav] = useState(false);
  const [teamsNav, setTeamsNav] = useState(false);

  function resetNav() {
    setTrainingNav(false);
    setTeamsNav(false);
    setClubNav(false);
    setNavOpen(false);
  }

  return (
    <div
      className={`transition-all ${
        navOpen ? "-translate-x-0" : "-translate-x-full"
      } fixed top-0 left-0 bottom-0 right-20 px-8 py-12 bg-tch-blue text-white flex flex-col gap-10 z-50 items-start h-screen justify-between overflow-hidden`}
    >
      <div className="flex flex-col gap-14 ">
        <Link href={"/"}>
          <Image
            src="/tch_logo_full_white2.svg"
            alt="TCH Logo"
            width="307"
            height="77"
            className="w-72 md:w-80 mx-auto"
            priority
          />
        </Link>
        <div className="flex flex-row ">
          <nav
            className={`mobile-nav-item 	 ${
              clubNav || trainingNav || teamsNav
                ? "opacity-0 z-20 -translate-x-10"
                : "opacity-100 z-30 translate-x-0"
            }`}
          >
            <span
              className="flex items-center gap-1"
              onClick={() => setClubNav(true)}
            >
              Club <ChevronRightIcon className="size-5" />
            </span>
            <Link href={"/news"} onClick={() => resetNav()}>
              NEWS & NEUIGKEITEN
            </Link>
            <span
              className="flex items-center gap-1"
              onClick={() => setTeamsNav(true)}
            >
              TEAMS <ChevronRightIcon className="size-5" />
            </span>
            <span
              className="flex items-center gap-1"
              onClick={() => setTrainingNav(true)}
            >
              TRAINING & Spielen <ChevronRightIcon className="size-5" />
            </span>

            <Link href={"/kontakt"} onClick={() => resetNav()}>
              Kontakt
            </Link>
            <Link href={"/impressum"} onClick={() => resetNav()}>
              Impressum
            </Link>
            <Link href={"/datenschutz"} onClick={() => resetNav()}>
              Datenschutzerklärung
            </Link>
          </nav>
          <nav
            className={`mobile-nav-item absolute ${
              clubNav
                ? " opacity-100 z-30 translate-x-0"
                : " opacity-0 z-20  translate-x-10"
            }`}
          >
            <Link href={"/club/ueberuns"} onClick={() => resetNav()}>
              Über uns
            </Link>
            <Link href={"/club/gelaende"} onClick={() => resetNav()}>
              Clubgelände & Anfahrt
            </Link>
            <Link href={"/club/chronik"} onClick={() => resetNav()}>
              Chronik
            </Link>
            <Link href={"/club/vorstand"} onClick={() => resetNav()}>
              Vorstand
            </Link>
            <Link href={"/club/aufnahme"} onClick={() => resetNav()}>
              Aufnahmeantrag
            </Link>
            <Link href={"/club/satzung"} onClick={() => resetNav()}>
              Satzung
            </Link>
            <span
              onClick={() => setClubNav(false)}
              className="font-bold underline underline-offset-4 flex items-center text-sm"
            >
              <ChevronLeftIcon className="size-4" />
              Zurück
            </span>
          </nav>
          <nav
            className={`mobile-nav-item absolute ${
              teamsNav
                ? " opacity-100 z-30 translate-x-0"
                : " opacity-0 z-20  translate-x-10"
            }`}
          >
            <Link href={"/club/gelaende"} onClick={() => resetNav()}>
              Jugend-Teams
            </Link>
            <Link href={"/club/vorstand"} onClick={() => resetNav()}>
              Senioren-Teams
            </Link>
            <span
              onClick={() => setTeamsNav(false)}
              className="font-bold underline underline-offset-4 flex items-center text-sm"
            >
              <ChevronLeftIcon className="size-4" />
              Zurück
            </span>
          </nav>
          <nav
            className={`mobile-nav-item absolute ${
              trainingNav
                ? " opacity-100 z-30 translate-x-0"
                : " opacity-0 z-20  translate-x-10"
            }`}
          >
            <Link href={"/club/gelaende"} onClick={() => resetNav()}>
              Jugendtraining
            </Link>
            <Link href={"/club/vorstand"} onClick={() => resetNav()}>
              Seniorentraining
            </Link>
            <Link href={"/club/vorstand"} onClick={() => resetNav()}>
              Spielen Sommer
            </Link>
            <Link href={"/club/vorstand"} onClick={() => resetNav()}>
              Spielen Winter
            </Link>
            <span
              onClick={() => setTrainingNav(false)}
              className="font-bold underline underline-offset-4 flex items-center text-sm"
            >
              <ChevronLeftIcon className="size-4" />
              Zurück
            </span>
          </nav>
        </div>
      </div>
      <div className="border-t-2 pt-4">
        <span className="font-bold">Tennis Club Holzminden von 1928 e.V.</span>{" "}
        <br />
        Liebgstraße 111 <br />
        37603 Holzminden <br />
        <span className="h-3"></span>
        Telefon: +49 170 / 766 2112 <br />
        E-Mail sport@tc1928.de
      </div>
    </div>
  );
}

export default MobileNav;
