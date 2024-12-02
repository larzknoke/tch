import HeaderText from "../ui/header-text";
import GalleryItem from "./gallery-item";

function Gallery() {
  return (
    <div className="p-5 md:p-0">
      <HeaderText text="GALLERY" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
        <div className="grid gap-4">
          <GalleryItem img={"images/gallery/gal1.jpg"} />
          <GalleryItem img={"images/gallery/gal2.jpg"} />
          <GalleryItem img={"images/gallery/gal3.jpg"} />
        </div>
        <div className="grid gap-4">
          <GalleryItem img={"images/gallery/gal4.jpg"} />
          <GalleryItem img={"images/gallery/gal5.jpg"} />
          <GalleryItem img={"images/gallery/gal6.jpg"} />
        </div>
        <div className="grid gap-4">
          <GalleryItem img={"images/gallery/gal7.jpg"} />
          <GalleryItem img={"images/gallery/gal8.jpg"} />
          <GalleryItem img={"images/gallery/gal2.jpg"} />
        </div>
        <div className="grid gap-4">
          <GalleryItem img={"images/gallery/gal4.jpg"} />
          <GalleryItem img={"images/gallery/gal5.jpg"} />
          <GalleryItem img={"images/gallery/gal6.jpg"} />
        </div>
      </div>
    </div>
  );
}

export default Gallery;
