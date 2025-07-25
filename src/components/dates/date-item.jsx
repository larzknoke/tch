import { dateFormatter } from "@/lib/utils";
import { CalendarIcon } from "@heroicons/react/16/solid";

function DateItem({ date }) {
  return (
    <div className="flex flex-row text-tch-blue py-3 px-3 gap-4  border-tch-blue/20 rounded-sm border ">
      <CalendarIcon className="size-5 text-tch-blue mt-1" />
      <div className="flex flex-col">
        <div>{dateFormatter(date.date, false)}</div>
        <div className="font-semibold text-xl">{date.title}</div>
      </div>
    </div>
  );
}

export default DateItem;
