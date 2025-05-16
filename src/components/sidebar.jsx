import DateWrapper from "./dates/date-wrapper";
import EffortWrapper from "./efforts/effort-wrapper";

function Sidebar() {
  return (
    <div className="gap-12 flex flex-col">
      <DateWrapper />
      <EffortWrapper />
    </div>
  );
}

export default Sidebar;
