import DateHeader from "./date-header";
import DateItem from "./date-item";
import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";

function DateWrapper() {
  return (
    <div className=" relative w-full rounded">
      <DateHeader />
      <h1 className="text-tch-blue mb-5">Kalender/Termine</h1>
      <div className="flex flex-col gap-4">
        <DateItem />
        <DateItem />
        <DateItem />
        <DateItem />
      </div>
      <h3 className="text-tch-blue mt-5 flex items-center gap-1">
        Alle Termine
        <ChevronDoubleRightIcon className="size-5" />
      </h3>
    </div>
  );
}

export default DateWrapper;
