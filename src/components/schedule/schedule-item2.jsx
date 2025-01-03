import { TrophyIcon, CalendarIcon } from "@heroicons/react/16/solid";
import dayjs from "dayjs";

function ScheduleItem2({ schedule }) {
  function winner(schedule, side) {
    if (side == "heim") {
      return schedule.Matchpunkte.split(":")[0] >
        schedule.Matchpunkte.split(":")[1]
        ? " underline underline-offset-4	decoration-0	"
        : "";
    } else {
      return schedule.Matchpunkte.split(":")[0] <
        schedule.Matchpunkte.split(":")[1]
        ? " underline underline-offset-4	decoration-0	"
        : "";
    }
  }

  return (
    <div className="flex flex-row bg-tch-blue text-white py-6 px-7 gap-4 rounded-xl shadow-xl">
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            {/* {dayjs(schedule.Datum2, "DD.MM.YYYY HH:mm") >
            dayjs().subtract(1, "day") ? (
              <CalendarIcon className="size-4 text-tch-blue-semi mt-1" />
            ) : (
              <TrophyIcon className="size-4 text-tch-blue-semi mt-1" />
            )} */}
            <div className="text-tch-blue-semi">
              {schedule.Liga} /{" "}
              {`${schedule.Datum} ${schedule.Datum2} ${schedule.Datum3}`}
            </div>
          </div>
          <div className="flex justify-between flex-row ">
            <div className="flex flex-col gap-0">
              <div
                className={`font-semibold text-xl ${winner(schedule, "heim")}`}
              >
                {schedule.Heimmannschaft.replace("[Routenplan]", "").trim()}
              </div>
              <span className="text-white text-xs">vs</span>
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

export default ScheduleItem2;
