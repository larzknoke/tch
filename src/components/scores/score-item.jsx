import { TrophyIcon } from "@heroicons/react/16/solid";

function ScoreItem({ schedule }) {
  return (
    <div className="flex flex-row text-white py-4 gap-4">
      <TrophyIcon className="size-5 text-white mt-1" />
      <div className="flex flex-col w-full">
        <div className="flex flex-col">
          <div>
            {schedule.Liga} /{" "}
            {`${schedule.Datum} ${schedule.Datum2} ${schedule.Datum3}`}
          </div>
          <div className="flex justify-between flex-row ">
            <div className="flex flex-col  md:flex-row gap-1 md:gap-4">
              <div className="font-semibold text-xl">
                {schedule.Heimmannschaft.replace("[Routenplan]", "").trim()}
              </div>
              vs
              <div className="font-semibold text-xl">
                {schedule.Gastmannschaft.replace("[Routenplan]", "").trim()}
              </div>
            </div>
            <div className="font-semibold text-xl">5 : 1</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScoreItem;
