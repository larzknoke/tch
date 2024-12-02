import { TrophyIcon } from "@heroicons/react/16/solid";

function ScoreItem() {
  return (
    <div className="flex flex-row text-white py-4 gap-4">
      <TrophyIcon className="size-5 text-white mt-1" />
      <div className="flex flex-col w-full">
        <div className="flex flex-col">
          <div>Herren 40 / Sa. 02.11.2024, 11:00</div>
          <div className="flex justify-between flex-row ">
            <div className="flex flex-col  md:flex-row gap-1 md:gap-4">
              <div className="font-semibold text-xl">
                TV BW Neustadt a. Rbge.
              </div>
              vs
              <div className="font-semibold text-xl">TC Holzminden</div>
            </div>
            <div className="font-semibold text-xl">5 : 1</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScoreItem;
