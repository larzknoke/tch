import DateWrapper from "./dates/date-wrapper";
import EffortWrapper from "./efforts/effort-wrapper";
import NewsWrapper from "./news/news-wrapper";
import NewsWrapperSidebar from "./news/news-wrapper-sidebar";

function Sidebar() {
  return (
    <div className="gap-12 flex flex-col">
      {/* <NewsWrapperSidebar /> */}
      <DateWrapper />
      <EffortWrapper />
    </div>
  );
}

export default Sidebar;
