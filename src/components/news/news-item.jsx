import Image from "next/image";

function NewsItem() {
  return (
    <div className="flex pb-10 gap-7">
      <div className=" flex-row hidden md:flex ">
        <Image
          src="/images/news/news-dummy1.jpg"
          alt="TCH Logo"
          width="320"
          height="205"
          className="w-96 object-cover"
        />{" "}
      </div>
      <div className=" self-end pb-5 gap-1 flex flex-col text-tch-blue">
        <div>09. September 2024</div>
        <h2>Sommerfest 2024</h2>
        <div className="max-w-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus nihil
          autem architecto, fugit suscipit harum, voluptatum odio animi neque,
          nostrum quae porro reprehenderit voluptas nisi. Temporibus vel hic
          molestiae enim!
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
