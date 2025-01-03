import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import NavItemClub from "./ui/nav/nav-item-club";
import { Roboto_Condensed } from "next/font/google";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import MobileNav from "./ui/nav/mobile-nav";
import { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const roboto_cond = Roboto_Condensed({ subsets: ["latin"] });

function Header2() {
  const [navOpen, setNavOpen] = useState(false);
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnHover: true }),
  ]);

  function handleNav() {
    setNavOpen(!navOpen);
  }

  return (
    <header className={`${roboto_cond.className} `}>
      <div className="absolute z-10 flex flex-col justify-between w-full">
        <div className="flex flex-row flex-nowrap  justify-between text-white items-center px-10 border-opacity-50 border-b border-tch-blue-light pt-7 pb-6">
          <div className="h-5 text-white/85  flex flex-row gap-8 flex-1 flex-grow justify-start">
            <svg
              className="hover:text-white hover:cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                fill="currentColor"
                d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"
              />
            </svg>
            <svg
              className="hover:text-white hover:cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
              />
            </svg>
            <svg
              className="hover:text-white hover:cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z"
              />
            </svg>
          </div>
          <Link href={"/"} className="cursor-pointer">
            <Image
              src="/tch_logo_full_white.svg"
              alt="TCH Logo"
              width="307"
              height="77"
              className="w-72 mx-auto "
              priority
            />
          </Link>
          <div className="gap-4 flex flex-1 flex-grow justify-end">
            <Link
              className="border border-white border-opacity-50 rounded px-4 py-1 uppercase text-xs"
              href={"datenschutz"}
            >
              Datenschutz
            </Link>
            <Link
              className="border border-white border-opacity-50 rounded px-4 py-1 uppercase text-xs"
              href={"impressum"}
            >
              Impressum
            </Link>
          </div>
        </div>
        <nav className="hidden md:flex font-bold gap-7 text-lg self-center main-nav uppercase text-white py-6">
          <NavItemClub />
          <Link href={"/news"}>NEWS & NEUIGKEITEN</Link>
          <Link href={"/teams"}>TEAMS</Link>
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
      <div className="embla" ref={emblaRef}>
        <div className="embla__container  min-h-screen">
          <div className="embla__slide header-slide relative bg-cover bg-[url('/images/header/header1.jpg')]">
            <div className="absolute bottom-32 left-32">
              <h1 className="text-white uppercase text-7xl font-black">
                Header <br />
                Hero Text
              </h1>
              <p className=" font-bold uppercase text-xl subline-hero px-2 inline-block">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </div>
          <div className="embla__slide header-slide relative bg-cover bg-[url('/images/header/header3.jpg')]">
            <div className="absolute bottom-32 left-32">
              <h1 className="text-white uppercase text-7xl font-black">
                Text <br />
                Header Hero
              </h1>
              <p className=" font-bold uppercase text-xl subline-hero px-2 inline-block">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </div>
          <div className="embla__slide header-slide relative bg-cover bg-[url('/images/header/header2.jpg')]">
            <div className="absolute bottom-32 left-32">
              <h1 className="text-white uppercase text-7xl font-black">
                Lorem <br />
                Ipsum Text
              </h1>
              <p className=" font-bold uppercase text-xl subline-hero px-2 inline-block">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header2;