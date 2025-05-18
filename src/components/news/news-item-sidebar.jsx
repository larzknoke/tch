import { NewspaperIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function NewsItemSidebar() {
  return (
    <Link href="/news/test-2024">
      <div className="flex flex-row text-tch-blue py-3 px-3 gap-4  border-tch-blue/20 rounded-sm border ">
        <NewspaperIcon className="size-5 text-tch-blue mt-1" />
        <div className="flex flex-col">
          <div>14. Juli 2024</div>
          <div className="font-semibold text-xl">Test 2024</div>
        </div>
      </div>
    </Link>
  );
}

export default NewsItemSidebar;
