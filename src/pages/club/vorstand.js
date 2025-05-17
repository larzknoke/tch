import Layout from "@/components/ui/layouts/layout";
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
      name: "Rolf Gans",
      taetigkeit: "Leitung der Vereinsgeschäfte",
      email: "info@tc1928.com",
    },
    {
      position: "2. Vorsitzender",
      name: "Erdal Kilic",
      taetigkeit: "Sponsoring",
      email: "info@tc1928.com",
    },
    {
      position: "Kassenwart",
      name: "Uta Holz",
      taetigkeit: "Finanzen",
      email: "kasse@tc1928.com",
    },
    {
      position: "Sportwart",
      name: "Christian Henning",
      taetigkeit: "Organisation des Spielbetriebs",
      email: "sportwart@tc1928.com",
    },
    {
      position: "2. Sportwart",
      name: "Karsten Jung",
      taetigkeit: "Unterstützung des Sportwarts",
      email: "sportwart@tc1928.com",
    },
    {
      position: "Jugendwart",
      name: "Frank Klingspor",
      taetigkeit: "Betreuung der Jugendabteilung",
      email: "sport@tc1928.com",
    },
    {
      position: "Pressewart",
      name: "Lars Knoke",
      taetigkeit: "Öffentlichkeitsarbeit und Online-Kommunikation",
      email: "presse@tc1928.com",
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
                className="rounded-sm my-2 w-full mb-4"
              />
              <h4 className="text-tch-blue">{position.position}</h4>
              <h3>{position.name}</h3>
              <p className="mt-2">{position.taetigkeit}</p>
              <a
                className="text-tch-blue mt-3 text-xs md:text-base"
                href="mailto:max.mustermann@tc1928.de"
              >
                {position.email}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Vorstand;

Vorstand.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
