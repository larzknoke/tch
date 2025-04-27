import Layout from "@/components/ui/layouts/layout";
import Image from "next/image";
import HeaderText from "@/components/ui/header-text";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

function ClubGelaende() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-10 my-10 md:my-20 px-5 md:px-0">
      <div className="w-full md:w-1/2">
        <HeaderText text="Clubgelände & Anfahrt" />
        <div className="flex flex-col gap-6">
          <p>
            Umrahmt vom Grün der Isarauen bildet unsere parkähnliche Anlage mit
            seinen 15 gepflegten Sandplätzen, Grünflächen und einem
            Beachvolleyballplatz, einem großzügigen Clubhaus mit gehobener
            italienischer Gastronomie und teilweise überdachter Sonnenterrasse
            ein ansprechendes Ambiente. Unser TennisShop Best of Five unter
            Leitung unserer Tennisschule ist Vertragspartner von Tennis Point!
          </p>
          <p>
            Die 2014 komplett renovierte Tennishalle verfügt über 3 Tennisplätze
            mit gelenkschonendem Teppich-Granulatbelag und moderner Beleuchtung.
          </p>
          <p>
            Unsere Anlage befindet sich nur wenige Minuten entfernt vom
            Freisinger Stadtzentrum, im Stadtteil Lerchenfeld, neben dem Stadion
            des SE Freising und einer Minigolfanlage. In unmittelbarer Nähe
            befindet sich darüberhinaus das neue topmoderne fresch, Freisings
            Erlebnis-Schwimmbad.
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <div className="flex flex-col gap-8">
          <Image
            src="/images/gelaende/gelaende_aussen_4.jpg"
            alt="Geländer 1"
            width="1000"
            height="645"
            className="w-full rounded hover:cursor-pointer border-b-4 border-tch-blue"
            onClick={() => setOpen(true)}
          />
          <Image
            src="/images/gelaende/gelaende_aussen_1.jpg"
            alt="Geländer 1"
            width="1000"
            height="645"
            className="w-full rounded hover:cursor-pointer border-b-4 border-tch-blue"
            onClick={() => setOpen(true)}
          />
          <Lightbox
            controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
            open={open}
            close={() => setOpen(false)}
            plugins={[Thumbnails]}
            slides={[
              { src: "/images/gelaende/gelaende_aussen_1.jpg" },
              { src: "/images/gelaende/gelaende_aussen_2.jpg" },
              { src: "/images/gelaende/gelaende_aussen_3.jpg" },
              { src: "/images/gelaende/gelaende_aussen_4.jpg" },
              { src: "/images/gelaende/gelaende_aussen_5.jpg" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default ClubGelaende;

ClubGelaende.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
