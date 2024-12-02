import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";
import ScoreHeader from "./score-header";
import ScoreItem from "./score-item";

function ScoreWrapper() {
  return (
    <div className="bg-tch-blue p-5 py-8 md:p-10 relative w-full md:w-2/3">
      <ScoreHeader />
      <h1 className="text-white mb-5">Aktuelle Ergebnisse</h1>
      <ScoreItem />
      <ScoreItem />
      <ScoreItem />
      <div className="flex flex-row gap-10">
        <h3 className="text-white mt-16 flex items-center gap-1">
          Alle Ergebnisse
          <ChevronDoubleRightIcon className="size-5" />
        </h3>
        <h3 className="text-white mt-16 flex items-center gap-1">
          Tabellen
          <ChevronDoubleRightIcon className="size-5" />
        </h3>
      </div>
    </div>
  );
}

export default ScoreWrapper;
