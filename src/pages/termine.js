import { useState, useEffect } from "react";
import Layout from "@/components/ui/layouts/layout";
import EffortWrapper from "@/components/efforts/effort-wrapper";
import { calendarData } from "@/lib/calendarData";
import GoogleCalendar from "@/components/googlecalendar/GoogleCalendar";

// const geistSans = localFont({
//   src: "../fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "../fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export default function Termine() {
  const [selectedTag, setSelectedTag] = useState(null);
  const [loading, setLoading] = useState(false);
  const [effortsData, setEffortsData] = useState(null);

  async function getEfforts() {
    try {
      setLoading(true);
      const res = await fetch(`/api/active-efforts`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (res.status != 200) {
        setLoading(false);
      } else {
        const resData = await res.json();
        setEffortsData(resData);
        setLoading(false);
      }
    } catch (error) {
      console.log("api fetch error");
      console.error("Err", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getEfforts();
  }, []);

  const hasActiveEfforts = effortsData && effortsData.length > 0;

  // Get unique tags from calendarData
  const uniqueTags = [
    ...new Set(calendarData.map((date) => date.tag || "Allgemein")),
  ];

  // Filter dates based on selected tag
  const filteredDates = selectedTag
    ? calendarData.filter((date) => (date.tag || "Allgemein") === selectedTag)
    : calendarData;

  return (
    <div className="flex flex-col gap-8 md:gap-16 md:p-0 p-5">
      <div
        className={`flex ${hasActiveEfforts ? "flex-col-reverse" : "flex-col"} md:flex-row gap-12 md:gap-16`}
      >
        <div className={`w-full md:w-1/2 ${hasActiveEfforts ? "" : " mt-8"}`}>
          <h2 className="mb-3 uppercase ">Kalender/Termine</h2>

          {/* Tag Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setSelectedTag(null)}
              className={`text-xs rounded-xl px-3 py-1.5 uppercase font-semibold transition-colors hover:cursor-pointer ${
                selectedTag === null
                  ? "bg-tch-blue text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Alle
            </button>
            {uniqueTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`text-xs rounded-xl px-3 py-1.5 uppercase font-semibold transition-colors hover:cursor-pointer ${
                  selectedTag === tag
                    ? "bg-tch-blue text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {filteredDates
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((date) => (
              <div key={date.id} className="mb-6 border-b border-tch-blue pt-3">
                <div className="flex flex-row items-center gap-4">
                  <p
                    className="text-tch-gold font-semibold"
                    suppressHydrationWarning
                  >
                    {new Date(date.date).toLocaleDateString("de-DE", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                  <span className=" text-[9px] bg-tch-blue/50 text-white rounded-xl px-2 py-0.5 uppercase font-semibold tracking-wider">
                    {date.tag || "Allgemein"}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-1 text-tch-blue">
                  {date.title}
                </h3>
                <p className="text-gray-600 mt-1">{date.description}</p>
              </div>
            ))}
          {/* Placeholder items for demonstration */}
        </div>
        <div
          className={`w-full md:w-1/2 gap-12 flex flex-col  md:mx-0 ${hasActiveEfforts ? " mt-8 -mx-4 " : ""}  md:mt-8 mb-8`}
        >
          <EffortWrapper loading={loading} effortsData={effortsData} />
        </div>
      </div>
      <div>
        <GoogleCalendar />
      </div>
    </div>
  );
}

Termine.getLayout = function getLayout(page) {
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
