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
    <div className="flex flex-col  gap-24 py-20">
      <div className="flex gap-16">
        <div className="w-2/3">
          <NewsWrapper />
        </div>
        <div className="w-1/3">
          <ScoreWrapper />
        </div>
      </div>
      {/* <HeaderVideo /> */}
      <MemberBox />
      <div className="flex flex-col md:flex-row w-full justify-between gap-20">
        <div className="flex flex-col gap-10 w-2/3">
          {/* <ScheduleWrapper /> */}
          <div className="flex flex-row rounded bg-gray-200 hover:cursor-pointer min-h-48">
            <Image
              src={`/images/news/news-dummy2.jpg`}
              alt="TCH Logo"
              width="320"
              height="205"
              className=" object-cover rounded-l w-80"
            />{" "}
            <div className=" p-6 gap-1 flex flex-col text-tch-blue relative">
              <div className="absolute -top-2 right-3 uppercase bg-tch-gold text-white rounded-sm inline px-4 w-fit text-sm">
                Training
              </div>
              <h2>Kinder und Jugend Training</h2>
              <div className="max-w-xl">
                Unser Jugend-Tennistraining bietet jungen Spielern die perfekte
                Gelegenheit, ihre Fähigkeiten zu verbessern und Spaß am Spiel zu
                haben. Unter der Anleitung erfahrener Trainer lernen die Kinder
                und Jugendlichen die Grundlagen des Tennissports sowie
                fortgeschrittene Techniken.
              </div>
            </div>
          </div>
          <div className="flex flex-row rounded bg-gray-200 hover:cursor-pointer min-h-48">
            <Image
              src={`/images/halle1.jpg`}
              alt="TCH Logo"
              width="320"
              height="205"
              className=" object-cover w-80 rounded-l"
            />{" "}
            <div className=" p-6 gap-1 flex flex-col text-tch-blue relative">
              <div className="absolute -top-2 right-3 uppercase bg-tch-gold text-white rounded-sm inline px-4 w-fit text-sm">
                Halle
              </div>
              <h2>Hallenbuchung/Hallenordnung</h2>
              <div className="max-w-xl">
                Wir möchten Euch auf die Einhaltung der Hallenordnung Bitte
                leitet die entsprechenden Informationen auch an Eure Mitspieler
                weiter.
              </div>
            </div>
          </div>
        </div>
        <div className=" w-1/3 px-5">
          <DateWrapper />
        </div>
      </div>
      <ScheduleWrapper />
      <Gallery />
      <NewsLetter />
    </div>
  );
}
