import Image from "next/image";
import HeaderText from "@/components/ui/header-text";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Button from "@/components/ui/button";

function Satzung() {
  return (
    <div className="flex flex-row gap-10 my-20">
      <div className="w-1/2">
        <HeaderText text="Satzung" />
        <div className="flex flex-col gap-6">
          <h3>Hier findest du unsere aktuelle Satzung</h3>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus
            earum quidem obcaecati aliquam architecto facere est maiores
            accusantium iste eos accusamus explicabo fugit voluptatum harum sed,
            iure officiis culpa repellendus.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus
            earum quidem obcaecati aliquam architecto facere est maiores
            accusantium iste eos accusamus explicabo fugit voluptatum harum sed,
            iure officiis culpa repellendus.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus
            earum quidem obcaecati aliquam architecto facere est maiores
            accusantium iste eos accusamus explicabo fugit voluptatum harum sed,
            iure officiis culpa repellendus.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus
            earum quidem obcaecati aliquam architecto facere est maiores
            accusantium iste eos accusamus explicabo fugit voluptatum harum sed,
            iure officiis culpa repellendus.
          </p>
        </div>
      </div>
      <div className="w-1/2">
        <div className="flex flex-col gap-8">
          <Image
            src="/images/gallery/gal8.jpg"
            alt="Geländer 1"
            width="1000"
            height="645"
            className="w-full rounded hover:cursor-pointer border-b-4 border-tch-blue"
          />
          <Image
            src="/images/gallery/gal9.jpg"
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

export default Satzung;
