function GalleryItem({ img }) {
  return (
    <div className="relative gallery-item">
      <img className="max-w-full md:h-full object-cover" src={img} alt="" />
      <div className="gallery-caption">Bildunterschrift</div>
    </div>
  );
}

export default GalleryItem;
