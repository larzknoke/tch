import Link from "next/link";
import DateHeader from "../dates/date-header";
import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";
import NewsItemSidebar from "./news-item-sidebar";

function NewsWrapperSidebar() {
  return (
    <div className=" relative w-full rounded-sm px-4 md:px-0">
      <DateHeader />
      <h2 className="mb-3 uppercase ">weitere News</h2>
      <div className="flex flex-col gap-4">
        <NewsItemSidebar />
        <NewsItemSidebar />
        <NewsItemSidebar />
      </div>
      <Link href="/news">
        <h3 className="text-tch-blue mt-5 flex items-center gap-1">
          Alle News
          <ChevronDoubleRightIcon className="size-5" />
        </h3>
      </Link>
    </div>
  );
}

export default NewsWrapperSidebar;
