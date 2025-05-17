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
            Die Anlage des TC Holzminden liegt an der Liebigstraße 111 und
            verfügt über sechs gepflegte Sandplätze in zentraler, grüner
            Umgebung. Ergänzt wird das Angebot seit 2022 durch eine moderne
            Tennishalle am Stahler Ufer 11 mit weiteren vier Plätzen, die
            ganzjähriges Training und Spielbetrieb ermöglicht – auch im Winter.
            Die Kombination aus Außen- und Hallenplätzen macht den Verein zu
            einem attraktiven Standort für Freizeit- und Mannschaftsspieler
            jeder Altersklasse.
          </p>
          <p>
            Besonders vorteilhaft ist die zentrale Lage der Anlage: Sie befindet
            sich direkt zwischen dem Campe-Gymnasium, dem Liebigstadion und der
            Astrid-Lindgren-Grundschule. Diese Nähe zu mehreren
            Bildungseinrichtungen fördert eine enge Zusammenarbeit im Schul- und
            Jugendsport und macht den Verein besonders attraktiv für Kinder,
            Jugendliche und Familien.
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
            className="w-full rounded-sm hover:cursor-pointer border-b-4 border-tch-blue"
            onClick={() => setOpen(true)}
          />
          <Image
            src="/images/gelaende/gelaende_aussen_1.jpg"
            alt="Geländer 1"
            width="1000"
            height="645"
            className="w-full rounded-sm hover:cursor-pointer border-b-4 border-tch-blue"
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
