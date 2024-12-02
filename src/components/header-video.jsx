import Image from "next/image";

export function HeaderVideo() {
  return (
    <>
      <div className="md:hidden h-60 relative">
        <Image
          src={"/images/header-mobile.jpg"}
          alt="Header Mobile"
          width="800"
          height="600"
          className="h-60 object-cover absolute"
          priority
        />
        <h2 className="text-white absolute bottom-5 left-5">
          100 Jahre Tennis <br /> in Holzminden
        </h2>
      </div>
      <video
        width="1200"
        height="350"
        muted
        controlsOFF
        autoPlay
        loop
        playsInline
        preload="auto"
        className="hidden md:block"
      >
        <source src="/images/header-web-high-tiny.mp4" type="video/mp4" />
        Dein Browser unterstützt keine Videos.
      </video>
    </>
  );
}
