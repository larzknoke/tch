import { WrenchIcon } from "@heroicons/react/16/solid";
import BallLoader from "../ui/loading-ball";
import EffortHeader from "./effort-header";
import EffortItem from "./effort-item";
import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";

function EffortWrapper({ loading, effortsData }) {
  return (
    <div className=" relative w-full rounded-sm px-4 md:px-0">
      {/* <EffortHeader /> */}
      {/* <HeaderText text="Arbeitseinsätze" /> */}
      <h2 className="mb-3 uppercase ">Arbeitseinsätze</h2>
      {loading && (
        <div className="flex justify-start relative items-center">
          <BallLoader />
        </div>
      )}
      {!loading && effortsData && effortsData.length > 0 && (
        <div className="flex flex-col gap-4">
          {effortsData &&
            effortsData.map((effort) => (
              <EffortItem key={effort.id} effort={effort} />
            ))}
        </div>
      )}
      {!loading && effortsData && effortsData.length === 0 && (
        <div className="flex flex-row gap-2">
          <WrenchIcon className="size-4 text-gray-400 mt-1" />
          <h4 className="text-gray-400">Momentan keine Arbeitseinsätze</h4>
        </div>
      )}
      {/* <BallLoader />
      <div className="flex flex-col gap-4">
        {effortsData &&
          effortsData.map((effort) => (
            <EffortItem key={effort.id} effort={effort} />
          ))}
      </div> */}
      {/* <h3 className="text-tch-blue mt-5 flex items-center gap-1">
        Alle Arbeitseinsätze
        <ChevronDoubleRightIcon className="size-5" />
      </h3> */}
    </div>
  );
}

export default EffortWrapper;
