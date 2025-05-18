import LayoutHome from "@/components/ui/layouts/layout-home";
import localFont from "next/font/local";
import { HeaderVideo } from "@/components/header-video";
import NewsWrapper from "@/components/news/news-wrapper";
import DateWrapper from "@/components/dates/date-wrapper";
import ScoreWrapper from "@/components/scores/score-wrapper";
import MemberBox from "@/components/member-box";
import Gallery from "@/components/gallery/gallery";
import NewsLetter from "@/components/newsletter/newsletter";
import ScheduleItem from "@/components/schedule/schedule-item";
import ScheduleWrapper from "@/components/schedule/schedule-wrapper";
import Image from "next/image";
import Sponsor from "@/components/sponsor";
import { ColorModeButton } from "@/components/ui/color-mode";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <div className="flex flex-col  gap-20 md:gap-24 py-5 md:py-10">
      <Sponsor />
      <div className="flex flex-col md:flex-row gap-8 md:gap-16">
        <div className="w-full md:w-2/3">
          <NewsWrapper />
        </div>
        <div className="w-full md:w-1/3">
          <ScoreWrapper />
        </div>
      </div>
      {/* <HeaderVideo /> */}
      <MemberBox />
      <div className="flex flex-col md:flex-row w-full justify-between gap-10 md:gap-12">
        <div className="flex flex-col gap-10 w-full md:w-2/3 px-5 md:px-0">
          {/* <ScheduleWrapper /> */}
          <Link href={"/play-stay"}>
            <div className="flex flex-col md:flex-row rounded-sm  hover:cursor-pointer min-h-48">
              <Image
                src={`/images/news/news-dummy2.jpg`}
                alt="TCH Logo"
                width="320"
                height="205"
                className=" object-cover rounded-t md:rounded-t-none md:rounded-l w-full md:w-80"
              />{" "}
              <div className=" p-6 gap-1 flex flex-col text-tch-blue relative bg-gray-200 md:rounded-r  rounded-b">
                <div className="absolute -top-2 left-5 md:right-3 uppercase bg-tch-gold text-white rounded-xs inline px-4 w-fit text-sm">
                  Training
                </div>
                <h2 className="text-balance">
                  Play & Stay - kostenloses Training
                </h2>
                <div className="max-w-xl">
                  Der Tennisclub Holzminden von 1928 bietet eine großartige
                  Gelegenheit für Kinder im Alter zwischen drei und acht Jahren,
                  den Tennissport zu entdecken. Dienstags und donnerstags von
                  15:00 bis 16:00 Uhr findet an der Liebigstraße ein kostenloses
                  Tennistraining statt, das allen interessierten Kindern
                  offensteht.
                </div>
              </div>
            </div>
          </Link>
          <div className="flex flex-col md:flex-row rounded-sm  hover:cursor-pointer min-h-48">
            <Image
              src={`/images/halle1.jpg`}
              alt="TCH Logo"
              width="320"
              height="205"
              className=" object-cover rounded-t md:rounded-l md:rounded-t-none w-full md:w-80"
            />{" "}
            <div className=" p-6 gap-1 flex flex-col text-tch-blue relative bg-gray-200 md:rounded-r rounded-b">
              <div className="absolute -top-2 left-5 md:right-3 uppercase bg-tch-gold text-white rounded-xs inline px-4 w-fit text-sm">
                Halle
              </div>
              <h2>Hallenbuchung / Hallenordnung</h2>
              <div className="max-w-xl">
                Wir möchten Euch auf die Einhaltung der Hallenordnung Bitte
                leitet die entsprechenden Informationen auch an Eure Mitspieler
                weiter.
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 px-5">
          <DateWrapper />
        </div>
      </div>
      <ScheduleWrapper />
      <Gallery />
      <NewsLetter />
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <LayoutHome>{page}</LayoutHome>;
};
