import { newsData } from "@/lib/newsData";
import { dateFormatter } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
function NewsItem({ news }) {
  return (
    <Link href={`/news/${news.slug}`}>
      <div className="flex flex-col rounded-sm bg-gray-200 hover:cursor-pointer news-item">
        <div className=" md:flex-row flex overflow-hidden ">
          <Image
            src={`/news/${news.image}`}
            alt={news.title}
            width="320"
            height="205"
            className="w-full object-cover h-52"
          />{" "}
        </div>
        <div className=" p-6 gap-1 flex flex-col text-tch-blue relative">
          <div className="absolute -top-3 right-3 uppercase bg-tch-gold text-white rounded-xs inline px-4 w-fit text-sm">
            {dateFormatter(news.date, false)}
          </div>
          <h2>{news.title}</h2>
          <div className="max-w-xl">{news.preview}</div>
        </div>
      </div>
    </Link>
  );
}

export default NewsItem;
