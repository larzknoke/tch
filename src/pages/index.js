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
    <div className="flex flex-col gap-5 md:gap-16">
      <HeaderVideo />
      <NewsWrapper />
      <div className="flex flex-col md:flex-row w-full justify-between gap-4">
        <div className="flex flex-col gap-4 w-2/3">
          <ScoreWrapper />
          <ScheduleWrapper />
        </div>
        <div className=" w-1/3">
          <DateWrapper />
        </div>
      </div>
      <MemberBox />
      <Gallery />
      <NewsLetter />
    </div>
  );
}
