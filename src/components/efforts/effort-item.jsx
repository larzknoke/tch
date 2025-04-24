import {
  CalendarIcon,
  WrenchIcon,
  // UserGroupIcon,
} from "@heroicons/react/16/solid";

import { UsersIcon } from "@heroicons/react/24/outline";

function EffortItem({ index }) {
  return (
    <div className="flex flex-row text-tch-blue py-3 px-3 gap-4  border-tch-blue/20 rounded border ">
      <div className="flex flex-row justify-between w-full items-center">
        <div className="flex flex-row gap-2 ">
          <WrenchIcon className="size-5 text-tch-blue mt-1" />
          <div className="flex flex-col">
            <div>0{index}. Juli 2025</div>
            <div className="font-semibold text-xl">Platz Aufbau</div>
          </div>
        </div>
        <div className="px-4 font-bold uppercase text-tch-gold ">
          <div>
            <span className="hover:underline hover:cursor-pointer">
              Anmelden
            </span>
            <div className="font-normal text-sm text-tch-blue flex flex-row gap-1 items-center">
              <UsersIcon className="size-4 text-tch-blue" />
              <span>{index}/3 Pers.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EffortItem;
