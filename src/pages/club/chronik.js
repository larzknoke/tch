import Layout from "@/components/ui/layouts/layout";
import Image from "next/image";
import HeaderText from "@/components/ui/header-text";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

function Chronik() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-10 my-10 md:my-20 px-5 md:px-0">
      <div className="w-full md:w-1/2">
        <HeaderText text="Chronik" />
        <div className="flex flex-col gap-6">
          <p>
            Der TC Holzminden blickt auf eine lange Geschichte zurück: Gegründet
            wurde der Verein am 7. Mai 1928 mit gerade einmal 40 Mitgliedern.
            Gespielt wurde damals auf zwei Sandplätzen am Victoria-Luisen-Weg –
            ganz bescheiden, aber mit viel Leidenschaft.
          </p>
          <p>
            In den 1970er-Jahren musste der Verein das ursprüngliche Gelände
            abgeben. Doch statt lange zu hadern, packte man die Chance beim
            Schopf und baute an der Liebigstraße 111 eine komplett neue Anlage –
            mit sechs Sandplätzen als Start. Mitte der 80er boomte der
            Tennissport, und der Verein wuchs mit: Zwei weitere Plätze kamen
            dazu, sodass ab 1987 auf insgesamt acht Sandplätzen aufgeschlagen
            werden konnte.
          </p>
          <p>
            Ein kleiner Ausflug ins Namenschaos folgte 1988 mit der Umbenennung
            in TC Blau-Weiß Holzminden. Doch die Tradition siegte: 1993 kehrte
            man zum ursprünglichen Namen TC Holzminden von 1928 zurück.
          </p>
          <p>
            2022 kam erneut Bewegung ins Vereinsleben: Zwei Plätze mussten dem
            Neubau der Astrid-Linken-Schule weichen. Aber auch daraus machte der
            Verein das Beste. Mit einer Kompensationszahlung der Stadt wurde die
            Tennishalle am Stahler Ufer 11 gekauft – ein echter Meilenstein!
            Seitdem ist Tennis in Holzminden nicht mehr nur eine
            Sommerangelegenheit, sondern geht auch im Winter weiter.
          </p>
          <p>
            Was die Mitgliederzahlen angeht, ging es über die Jahrzehnte auf und
            ab. 1987 hatte der Verein stolze 535 Mitglieder – der bisherige
            Rekord. Danach ging es erst mal bergab, bis 2012 waren nur noch 165
            Mitglieder dabei. Doch durch engagierte Jugendarbeit hat sich das
            Blatt gewendet: Heute zählt der Verein wieder 505 Mitglieder, von
            denen über die Hälfte Kinder und Jugendliche sind. Da wächst also
            die nächste Tennisgeneration schon heran!
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

export default Chronik;

Chronik.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
