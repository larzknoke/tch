import Image from "next/image";
import { Roboto_Condensed } from "next/font/google";
import Link from "next/link";

const roboto_cond = Roboto_Condensed({ subsets: ["latin"] });

function Footer() {
  return (
    <>
      <div
        className={`bg-tch-blue p-8 md:p-10 text-white ${roboto_cond.className}`}
      >
        <div className="container mx-auto flex flex-col md:flex-row gap-5 md:gap-10">
          <div className="flex flex-col gap-5 w-full md:w-2/4">
            <Image
              src="/tch_logo_full_white2.svg"
              alt="TCH Logo"
              width="307"
              height="77"
              className="w-60"
              priority
            />
            <p>
              <span className="font-bold">
                Tennis Club Holzminden von 1928 e.V.
              </span>{" "}
              <br />
              Liebgstraße 111 <br />
              37603 Holzminden
            </p>
            <p>
              Telefon: +49 170 / 766 2112 <br />
              E-Mail sport@tc1928.com
            </p>
          </div>
          <div className="flex flex-row  md:flex-col w-full md:w-1/4 gap-3">
            <Link href={"/club/ueberuns"}>Der Club</Link>
            <Link href={"/news"}>News & Neuigkeiten</Link>
            <Link href={"/jugend-training"}>Training & Spielen</Link>
            <Link href={"/kontakt"}>Kontakt</Link>
          </div>
          <div className="flex flex-row md:flex-col w-full md:w-1/4 gap-3">
            <Link href={"datenschutz"}>Datenschutz</Link>
            <Link href={"impressum"}>Impressum</Link>
            <Link href={"admin"}>Admin</Link>
          </div>
        </div>
      </div>
      <div
        className={`text-tch-blue px-10 md:px-0 py-3 text-sm1 ${roboto_cond.className}`}
      >
        <div className="container mx-auto flex flex-row gap-10">
          © 2025 TC Holzminden von 1928 e.V.
        </div>
      </div>
    </>
  );
}

export default Footer;
