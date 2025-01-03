import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";
// import ScheduleItem from "./schedule-item";
import ScheduleItem2 from "./schedule-item2";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Link from "next/link";
import Spinner from "../ui/loading";
import HeaderText from "../ui/header-text";
dayjs.extend(customParseFormat);

function ScheduleWrapper() {
  const [isLoading, setIsLoading] = useState(true);
  const [scheduleData, setScheduleData] = useState();

  const [emblaRef] = useEmblaCarousel({ loop: true, slidesToScroll: 1 }, [
    Autoplay({ delay: 3000, stopOnHover: true }),
  ]);

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
    <div className=" py-8 md:py-10 relative w-full">
      {/* <h1 className="text-tch-blue   mb-5">Nächsten Spiele</h1> */}
      <HeaderText text={"Nächsten Spiele"} />
      {!isLoading && scheduleData ? (
        <div className="embla" ref={emblaRef}>
          <div className="embla__container schedule-slide-container">
            {scheduleData.map((schedule, index) => {
              return (
                <div className="embla__slide schedule-slide" key={index}>
                  <ScheduleItem2 key={index} schedule={schedule} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <Spinner />
      )}
      <div className="flex flex-row gap-10">
        <h3 className="text-tch-blue mt-6 flex items-center gap-1">
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
