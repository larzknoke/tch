import DateHeader from "./date-header";
import DateItem from "./date-item";
import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";

function DateWrapper() {
  return (
    <div className="bg-tch-blue p-5 py-8 md:p-10 relative w-full h-fullOFF">
      <DateHeader />
      <h1 className="text-white mb-5">Kalender/Termine</h1>
      <DateItem />
      <DateItem />
      <DateItem />
      <h3 className="text-white mt-16 flex items-center gap-1">
        Alle Termine
        <ChevronDoubleRightIcon className="size-5" />
      </h3>
    </div>
  );
}

export default DateWrapper;
