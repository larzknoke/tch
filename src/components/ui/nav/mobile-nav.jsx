import Image from "next/image";
import Link from "next/link";

function MobileNav({ navOpen = false }) {
  return (
    <div
      className={`transition-all ${
        navOpen ? "-translate-x-0" : "-translate-x-full"
      } fixed top-0 left-0 bottom-0 right-20 px-8 py-12 bg-tch-blue text-white flex flex-col gap-10 z-50 items-start h-screen justify-between`}
    >
      <div className="flex flex-col gap-14">
        <Image
          src="/tch_logo_full_white.svg"
          alt="TCH Logo"
          width="307"
          height="77"
          className="w-72 md:w-80 mx-auto"
          priority
        />
        <nav className="flex flex-col gap-7 text-xl  uppercase text-white">
          <Link href={"/news"}>Club</Link>
          <Link href={"/news"}>NEWS & NEUIGKEITEN</Link>
          <span>TEAMS</span>
          <span>TRAINING</span>
          <Link href={"/kontakt"}>Kontakt</Link>
          <Link href={"/impressum"}>Impressum</Link>
          <Link href={"/datenschutz"}>Datenschutzerklärung</Link>
        </nav>
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
