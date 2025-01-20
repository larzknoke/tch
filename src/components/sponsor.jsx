import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

function Sponsor() {
  const [emblaRef] = useEmblaCarousel({ loop: true, slidesToScroll: 2 }, [
    Autoplay({ delay: 3000, stopOnHover: true }),
  ]);

  return (
    <div className=" py-0 relative w-full hidden md:block">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container sponsor-slide-container items-end  md:px-0">
          <div className=" sponsor-slide">
            <Image
              src="/images/sponsor/gronemeyer_1c.svg"
              alt="Gronemeyer Sponsor"
              width="282"
              height="69"
              className="w-48 mx-auto  object-contain"
            />
          </div>
          <div className=" sponsor-slide">
            <Image
              src="/images/sponsor/stadtwerke.png"
              alt="Stadtwerke Sponsor"
              width="300"
              height="149"
              className="w-36 mx-auto object-contain"
            />
          </div>
          <div className=" sponsor-slide">
            <Image
              src="/images/sponsor/kilic_1c.png"
              alt="Kilic Sponsor"
              width="183"
              height="80"
              className="w-32 mx-auto  object-contain"
            />
          </div>
          <div className=" sponsor-slide">
            <Image
              src="/images/sponsor/tnb_1c.svg"
              alt="TNB Sponsor"
              width="146"
              height="70"
              className="w-40 mx-auto object-contain"
            />
          </div>
          <div className=" sponsor-slide">
            <Image
              src="/images/sponsor/allersheimer_1c.png"
              alt="Allersheimer Sponsor"
              width="500"
              height="95"
              className="w-48 mx-auto object-contain"
            />
          </div>
          <div className=" sponsor-slide">
            <Image
              src="/images/sponsor/tnb_1c.svg"
              alt="TNB Sponsor"
              width="146"
              height="70"
              className="w-40 mx-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sponsor;
