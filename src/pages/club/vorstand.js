import Image from "next/image";
import HeaderText from "@/components/ui/header-text";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

function Vorstand() {
  const vorstand = [
    {
      position: "1. Vorsitzender",
      name: "Max Mustermann",
      taetigkeit: "Leitung der Vereinsgeschäfte",
    },
    {
      position: "2. Vorsitzender",
      name: "Max Mustermann",
      taetigkeit: "Sponsoring",
    },
    {
      position: "3. Vorsitzender",
      name: "Max Mustermann",
      taetigkeit: "Jugendwart",
    },
    {
      position: "4. Vorsitzender",
      name: "Max Mustermann",
      taetigkeit: "Partywart",
    },
    {
      position: "5. Vorsitzender",
      name: "Max Mustermann",
      taetigkeit: "Leitung der Vereinsgeschäfte",
    },
  ];

  return (
    <div className=" my-20 px-5 md:px-0">
      <HeaderText text="Vorstand" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 my-10">
        {vorstand.map((position) => {
          return (
            <div className="text-center">
              <img
                src="https://dummyimage.com/300x310/fff/aaa"
                alt=""
                className="rounded my-2 w-full mb-4"
              />
              <h4 className="text-tch-blue">{position.position}</h4>
              <h3>{position.name}</h3>
              <p className="mt-2">{position.taetigkeit}</p>
              <a
                className="text-tch-blue mt-3 text-xs md:text-base"
                href="mailto:max.mustermann@tc1928.de"
              >
                max.mustermann@tc1928.de
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Vorstand;
