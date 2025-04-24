import HeaderText from "../ui/header-text";
import EffortHeader from "./effort-header";
import EffortItem from "./effort-item";
import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";

function EffortWrapper() {
  return (
    <div className=" relative w-full rounded">
      {/* <EffortHeader /> */}
      <HeaderText text="Arbeitseinsätze" />
      <div className="flex flex-col gap-4">
        {[1, 2, 3, 4].map((index) => (
          <EffortItem index={index} />
        ))}
      </div>
      <h3 className="text-tch-blue mt-5 flex items-center gap-1">
        Alle Arbeitseinsätze
        <ChevronDoubleRightIcon className="size-5" />
      </h3>
    </div>
  );
}

export default EffortWrapper;
