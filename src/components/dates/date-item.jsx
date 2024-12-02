import { CalendarIcon } from "@heroicons/react/16/solid";

function DateItem() {
  return (
    <div className="flex flex-row text-white py-4 gap-4">
      <CalendarIcon className="size-5 text-white mt-1" />
      <div className="flex flex-col">
        <div>14. Juli 2024</div>
        <div className="font-semibold text-xl">Sommerfest 2024</div>
      </div>
    </div>
  );
}

export default DateItem;
