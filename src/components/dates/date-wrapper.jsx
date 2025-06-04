import HeaderText from "../ui/header-text";
import DateHeader from "./date-header";
import DateItem from "./date-item";
import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";
import { calendarData } from "@/lib/calendarData";
import Link from "next/link";

function DateWrapper() {
  return (
    <div className=" relative w-full rounded-sm px-4 md:px-0">
      <DateHeader />
      {/* <HeaderText text="Kalender/Termine" /> */}
      <h2 className="mb-3 uppercase ">Kalender/Termine</h2>
      <div className="flex flex-col gap-4">
        {calendarData
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 4)
          .map((date) => (
            <DateItem key={date.id} date={date} />
          ))}
        {/* Placeholder items for demonstration */}
      </div>
      <Link href="/termine">
        <h3 className="text-tch-blue mt-5 flex items-center gap-1">
          Alle Termine
          <ChevronDoubleRightIcon className="size-5" />
        </h3>
      </Link>
    </div>
  );
}

export default DateWrapper;
