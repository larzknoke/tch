import Image from "next/image";
import Link from "next/link";
function NewsItem({ index }) {
  return (
    <Link href="/news/test">
      <div className="flex flex-col rounded-sm bg-gray-200 hover:cursor-pointer news-item">
        <div className=" md:flex-row flex overflow-hidden ">
          <Image
            src={`/images/news/news-dummy${index}.jpg`}
            alt="TCH Logo"
            width="320"
            height="205"
            className="w-full object-cover h-52"
          />{" "}
        </div>
        <div className=" p-6 gap-1 flex flex-col text-tch-blue relative">
          <div className="absolute -top-3 right-3 uppercase bg-tch-gold text-white rounded-xs inline px-4 w-fit text-sm">
            09. September 2024
          </div>
          <h2>Sommerfest 2024</h2>
          <div className="max-w-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus nihil
            autem architecto...
          </div>
        </div>
      </div>
    </Link>
  );
}

export default NewsItem;
