import Layout from "@/components/ui/layouts/layout";
import EffortWrapper from "@/components/efforts/effort-wrapper";
import { calendarData } from "@/lib/calendarData";

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
  return (
    <div className="flex flex-col gap-16 md:p-0 p-5">
      <div className="flex flex-col md:flex-row gap-4 md:gap-16">
        <div className="w-full md:w-1/2">
          <h2 className="mb-3 uppercase ">Kalender/Termine</h2>
          {calendarData
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((date) => (
              <div key={date.id} className="mb-6 border-b border-tch-blue pt-3">
                <p className="text-tch-gold font-semibold">
                  {new Date(date.date).toLocaleDateString()}
                </p>
                <h3 className="text-xl font-semibold mb-1 text-tch-blue">
                  {date.title}
                </h3>
                <p className="text-gray-600 mt-1">{date.description}</p>
              </div>
            ))}
          {/* Placeholder items for demonstration */}
        </div>
        <div className="w-full md:w-1/2 gap-12 flex flex-col -mx-4 md:mx-0">
          <EffortWrapper />
        </div>
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
