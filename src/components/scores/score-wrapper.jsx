import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";
import ScoreHeader from "./score-header";
import ScoreItem from "./score-item";
import ScheduleItem from "../schedule/schedule-item";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import Link from "next/link";
import Spinner from "../ui/loading";

function ScoreWrapper() {
  const [isLoading, setIsLoading] = useState(true);
  const [scheduleData, setScheduleData] = useState();

  async function getScheduleData() {
    const data = await fetch("api/schedule/16529");
    const tableData = await data.json();
    const fiterTableData = tableData.filter((e) => {
      return (
        dayjs(e.Datum2, "DD.MM.YYYY HH:mm") < dayjs() &&
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
    <div className="bg-tch-blue p-5 py-8 md:p-8 relative w-full rounded shadow-2xl">
      <ScoreHeader />
      <h1 className="text-white mb-5">Aktuelle Ergebnisse</h1>
      {!isLoading && scheduleData ? (
        scheduleData.slice(-5).map((schedule, index) => {
          return <ScheduleItem key={index} schedule={schedule} />;
        })
      ) : (
        <Spinner />
      )}
      <div className="flex flex-row gap-10">
        <h3 className="text-white mt-10 flex items-center gap-1 uppercase">
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

export default ScoreWrapper;
