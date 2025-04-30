import {
  CalendarIcon,
  WrenchIcon,
  // UserGroupIcon,
} from "@heroicons/react/16/solid";
import { dateFormatter } from "@/lib/utils";

import { UsersIcon } from "@heroicons/react/24/outline";
import { EffortModalRegister } from "./effort-modal-register";

function EffortItem({ effort }) {
  return (
    <div className="flex flex-row text-tch-blue py-3 px-3 gap-4  border-tch-blue/20 rounded-sm border ">
      <div className="flex flex-row justify-between w-full items-center">
        <div className="flex flex-row gap-2 ">
          <WrenchIcon className="size-5 text-tch-blue mt-1" />
          <div className="flex flex-col">
            <div>{dateFormatter(effort.date,false)}</div>
            <div className="font-semibold text-xl">{effort.title}</div>
          </div>
        </div>
        <div className="px-4 font-bold uppercase text-tch-gold ">
          <div>
            {/* <span className="hover:underline hover:cursor-pointer">
              Anmelden
            </span> */}
            <EffortModalRegister />
            <div className="font-normal text-sm text-tch-blue flex flex-row gap-1 items-center">
              <UsersIcon className="size-4 text-tch-blue" />
              <span>{effort.id}/3 Pers.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EffortItem;
