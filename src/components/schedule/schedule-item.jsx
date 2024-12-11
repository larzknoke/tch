import { TrophyIcon, CalendarIcon } from "@heroicons/react/16/solid";
import dayjs from "dayjs";

function ScheduleItem({ schedule }) {
  function winner(schedule, side) {
    if (side == "heim") {
      return schedule.Matchpunkte.split(":")[0] >
        schedule.Matchpunkte.split(":")[1]
        ? " underline underline-offset-4	decoration-1	"
        : "";
    } else {
      return schedule.Matchpunkte.split(":")[0] <
        schedule.Matchpunkte.split(":")[1]
        ? " underline underline-offset-4	decoration-1	"
        : "";
    }
  }

  return (
    <div className="flex flex-row text-white py-4 gap-4">
      {dayjs(schedule.Datum2, "DD.MM.YYYY HH:mm") >
      dayjs().subtract(1, "day") ? (
        <CalendarIcon className="size-5 text-white mt-1" />
      ) : (
        <TrophyIcon className="size-5 text-white mt-1" />
      )}
      <div className="flex flex-col w-full">
        <div className="flex flex-col">
          <div>
            {schedule.Liga} /{" "}
            {`${schedule.Datum} ${schedule.Datum2} ${schedule.Datum3}`}
          </div>
          <div className="flex justify-between flex-row ">
            <div className="flex flex-col  md:flex-row gap-1 md:gap-4">
              <div
                className={`font-semibold text-xl ${winner(schedule, "heim")}`}
              >
                {schedule.Heimmannschaft.replace("[Routenplan]", "").trim()}
              </div>
              vs
              <div
                className={`font-semibold text-xl ${winner(schedule, "gast")}`}
              >
                {schedule.Gastmannschaft.replace("[Routenplan]", "").trim()}
              </div>
            </div>
            {schedule.Matchpunkte && (
              <div className="font-semibold text-xl">
                {schedule.Matchpunkte || "-"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleItem;
