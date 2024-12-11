import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";
import ScheduleItem from "./schedule-item";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Link from "next/link";
import Spinner from "../ui/loading";
dayjs.extend(customParseFormat);

function ScheduleWrapper() {
  const [isLoading, setIsLoading] = useState(true);
  const [scheduleData, setScheduleData] = useState();

  async function getScheduleData() {
    const data = await fetch("api/schedule/16529");
    const tableData = await data.json();
    const fiterTableData = tableData.filter((e) => {
      return (
        dayjs(e.Datum2, "DD.MM.YYYY HH:mm") > dayjs().subtract(1, "day") &&
        e.Spielbericht != "zurückgezogen"
      );
    });

    setScheduleData(fiterTableData);
    setIsLoading(false);
  }

  useEffect(() => {
    getScheduleData();
  }, []);

  return (
    <div className="bg-tch-blue p-5 py-8 md:p-10 relative w-full ">
      <h1 className="text-white mb-5">Nächsten Spiele</h1>
      {!isLoading && scheduleData ? (
        scheduleData.map((schedule, index) => {
          return <ScheduleItem key={index} schedule={schedule} />;
        })
      ) : (
        <Spinner />
      )}
      <div className="flex flex-row gap-10">
        <h3 className="text-white mt-16 flex items-center gap-1">
          <Link
            target="_blank"
            href={
              "https://tnb.liga.nu/cgi-bin/WebObjects/nuLigaTENDE.woa/wa/clubMeetings?club=16529"
            }
          >
            Alle Spiele
          </Link>

          <ChevronDoubleRightIcon className="size-5" />
        </h3>
      </div>
    </div>
  );
}

export default ScheduleWrapper;
