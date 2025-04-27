import localFont from "next/font/local";
import { HeaderVideo } from "@/components/header-video";
import NewsWrapper from "@/components/news/news-wrapper";
import DateWrapper from "@/components/dates/date-wrapper";
import ScoreWrapper from "@/components/scores/score-wrapper";
import MemberBox from "@/components/member-box";
import Gallery from "@/components/gallery/gallery";
import NewsLetter from "@/components/newsletter/newsletter";
import Layout from "@/components/ui/layouts/layout";
import EffortWrapper from "@/components/efforts/effort-wrapper";

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

export default function News() {
  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col md:flex-row gap-8 md:gap-16">
        <div className="w-full md:w-2/3">
          <NewsWrapper />
        </div>
        <div className="w-full md:w-1/3 gap-12 flex flex-col">
          <DateWrapper />
          <EffortWrapper />
        </div>
      </div>
      <MemberBox />
      <NewsLetter />
    </div>
  );
}

News.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// export const getServerSideProps = async () => {
//   const efforts = await prisma.effort.findMany({});
//   console.log("efforts: ", efforts);
//   return {
//     props: {
//       efforts,
//     },
//   };
// };
