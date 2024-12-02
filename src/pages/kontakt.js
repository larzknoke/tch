import Image from "next/image";
import HeaderText from "@/components/ui/header-text";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Button from "@/components/ui/button";

function Kontakt() {
  return (
    <div className="flex flex-row gap-10 my-20">
      <div className="w-1/2">
        <HeaderText text="Kontakt" />
        <div className="flex flex-col gap-6 my-10">
          <h3>Kontaktiere uns gerne!</h3>
          <div className="flex flex-col gap-4">
            <h4>Tennis Club Holzminden von 1928 e.V </h4>
            <p>
              Liebigstraße 111 <br />
              37603 Holzminden <br />
            </p>
            <p>
              Telefon: +49 1707662112 <br /> E-Mail: sport@tc1928.de <br />
              Internet: www.tc1928.de
              <br />
            </p>
            <p>Vertretungsberechtigter: Rolf Gans</p>
            <p>
              Inhaltlich Verantwortlicher gemäß § 55 Abs. 2 RStV: Frank
              Klingspor
            </p>
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <div className="flex flex-col gap-8">
          <Image
            src="/images/gallery/gal9.jpg"
            alt="Geländer 1"
            width="1000"
            height="645"
            className="w-full rounded hover:cursor-pointer border-b-4 border-tch-blue"
          />
          <Image
            src="/images/gallery/gal8.jpg"
            alt="Geländer 1"
            width="1000"
            height="645"
            className="w-full rounded hover:cursor-pointer border-b-4 border-tch-blue"
          />
        </div>
      </div>
    </div>
  );
}

export default Kontakt;
