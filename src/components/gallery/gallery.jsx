import HeaderText from "../ui/header-text";
import GalleryItem from "./gallery-item";

function Gallery() {
  return (
    <div className="p-5 md:p-0">
      <HeaderText text="GALLERY" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
        <div className="grid gap-4">
          <GalleryItem img={"news/Sommerfest2025/19.jpg"} />
          <GalleryItem img={"news/MichaelKoehne800.jpg"} />
          <GalleryItem img={"news/Sommerfest2025/01.jpg"} />
          <GalleryItem img={"news/Sommerfest2025/09.jpg"} />
          <GalleryItem img={"news/Sommerfest2025/04.jpg"} />
        </div>
        <div className="grid gap-4">
          <GalleryItem img={"news/Sommerfest2025/11.jpg"} />
          <GalleryItem img={"news/Sommerfest2025/16.jpg"} />
          <GalleryItem img={"news/Sommerfest2025/14.jpg"} />
          <GalleryItem img={"news/Sommerfest2025/06.jpg"} />
          <GalleryItem img={"news/Sommerfest2025/10.jpg"} />
        </div>
        <div className="grid gap-4">
          <GalleryItem img={"news/Erfolgreicher-Start.jpg"} />
          <GalleryItem img={"news/blo25_opener.jpg"} />
          <GalleryItem img={"news/Sommerfest2025/18.jpg"} />
          <GalleryItem img={"news/Sommerfest2025/22.jpg"} />
          <GalleryItem img={"news/Sommerfest2025/15.jpg"} />
        </div>
        <div className="grid gap-4">
          <GalleryItem img={"news/Sommerfest2025/23.jpg"} />
          <GalleryItem img={"news/Spring-Junior-Challenge-2025.jpg"} />
          <GalleryItem img={"news/Sommerfest2025/24.jpg"} />
          <GalleryItem img={"news/Sommerfest2025/12.jpg"} />
          <GalleryItem img={"news/Sommerfest2025/28.jpg"} />
        </div>
      </div>
    </div>
  );
}

export default Gallery;
