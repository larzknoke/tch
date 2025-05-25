import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";
import ScoreHeader from "./score-header";
import ScoreItem from "./score-item";
import ScheduleItem from "../schedule/schedule-item";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import Link from "next/link";
import Spinner from "../ui/loading";

const demoData = [
  {
    Datum: "So.",
    Datum2: "17.03.2025 09:00",
    Datum3: "",
    Spielort: "",
    Liga: "D00 RL",
    Heimmannschaft: "TC Holzminden",
    Gastmannschaft: "MTV Almstedt II",
    Matchpunkte: "5:1",
    Sätze: "",
    Spiele: "",
    Spielbericht: "offen",
  },
  {
    Datum: "",
    Datum2: "",
    Datum3: "",
    Spielort: "",
    Liga: "H40 LL",
    Heimmannschaft:
      "TSV Kirchrode Hannover\n              \t  \n                  [Routenplan]",
    Gastmannschaft: "TC Holzminden",
    Matchpunkte: "2:4",
    Sätze: "",
    Spiele: "",
    Spielbericht: "offen",
  },
  {
    Datum: "So.",
    Datum2: "31.03.2025 10:00",
    Datum3: "",
    Spielort: "",
    Liga: "H40 LL",
    Heimmannschaft:
      "TSG Mörse\n              \t  \n                  [Routenplan]",
    Gastmannschaft: "TC Holzminden",
    Matchpunkte: "3:3",
    Sätze: "",
    Spiele: "",
    Spielbericht: "offen",
  },
  {
    Datum: "So.",
    Datum2: "31.03.2025 11:00",
    Datum3: "",
    Spielort: "",
    Liga: "D00 RL",
    Heimmannschaft: "TC Holzminden",
    Gastmannschaft: "TC Lauenstein",
    Matchpunkte: "2:4",
    Sätze: "",
    Spiele: "",
    Spielbericht: "offen",
  },
];

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
    // setScheduleData(demoData);

    setIsLoading(false);
  }

  useEffect(() => {
    getScheduleData();
  }, []);

  return (
    <div className="bg-tch-blue p-5 py-8 md:p-8 relative w-full rounded-sm shadow-2xl">
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
