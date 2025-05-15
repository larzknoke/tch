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
        <div className="embla__container sponsor-slide-container items-center  md:px-0">
          <div className=" sponsor-slide">
            <Image
              src="/images/sponsor/babolat.svg"
              alt="Babolat Sponsor"
              width="225"
              height="35"
              // objectFit="contain"
              className=" mx-auto  object-contain"
            />
          </div>

          <div className=" sponsor-slide">
            <Image
              src="/images/sponsor/rathmann.svg"
              alt="Rathmann Sponsor"
              width="146"
              height="70"
              className="w-52 mx-auto object-contain"
            />
          </div>
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
              src="/images/sponsor/kilic_1c.png"
              alt="Kilic Sponsor"
              width="183"
              height="80"
              className="w-32 mx-auto  object-contain"
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
              src="/images/sponsor/tnb_1c.svg"
              alt="TNB Sponsor"
              width="146"
              height="70"
              className="w-40 mx-auto object-contain"
            />
          </div>
          <div className=" sponsor-slide">
            <Image
              src="/images/sponsor/borchers.svg"
              alt="Borchers Sponsor"
              width="146"
              height="70"
              className="w-40 mx-auto object-contain"
            />
          </div>
          <div className=" sponsor-slide">
            <Image
              src="/images/sponsor/gehl.svg"
              alt="Gehl Sponsor"
              width="146"
              height="70"
              className="w-40 mx-auto object-contain"
            />
          </div>
          <div className=" sponsor-slide">
            <Image
              src="/images/sponsor/hachenberg.svg"
              alt="Hachenberg Sponsor"
              width="146"
              height="70"
              className="w-32 mx-auto object-contain"
            />
          </div>
          <div className=" sponsor-slide">
            <Image
              src="/images/sponsor/galabau.svg"
              alt="Galabau Sponsor"
              width="545"
              height="416"
              className="w-32 mx-auto  object-contain"
            />
          </div>
          <div className=" sponsor-slide">
            <Image
              src="/images/sponsor/sportbund.svg"
              alt="Sportbund Sponsor"
              width="146"
              height="70"
              className="w-40 mx-auto object-contain"
            />
          </div>

          <div className=" sponsor-slide">
            <Image
              src="/images/sponsor/blsk.svg"
              alt="BLSK Sponsor"
              width="146"
              height="70"
              className="w-52 mx-auto object-contain"
            />
          </div>
          <div className=" sponsor-slide">
            <Image
              src="/images/sponsor/vb.svg"
              alt="VB Südniedersachen Sponsor"
              width="146"
              height="70"
              className="w-52 mx-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sponsor;
