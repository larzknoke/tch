import { CalendarIcon } from "@heroicons/react/16/solid";

function DateItem() {
  return (
    <div className="flex flex-row text-tch-blue py-3 px-3 gap-4  border-tch-blue/20 rounded-sm border ">
      <CalendarIcon className="size-5 text-tch-blue mt-1" />
      <div className="flex flex-col">
        <div>14. Juli 2024</div>
        <div className="font-semibold text-xl">Sommerfest 2024</div>
      </div>
    </div>
  );
}

export default DateItem;
