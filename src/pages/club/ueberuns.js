import Layout from "@/components/ui/layouts/layout";
import Image from "next/image";
import HeaderText from "@/components/ui/header-text";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Head from "next/head";

function UeberUns() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Über uns | Tennis Club Holzminden von 1928 e.V</title>
        <meta
          name="description"
          content="Die Homepage des Tennis Club Holzminden von 1928 e.V."
        />
      </Head>

      <div className="flex flex-col md:flex-row gap-10 my-10 md:my-20 px-5 md:px-0">
        <div className="w-full md:w-1/2">
          <HeaderText text="Über uns" />
          <div className="flex flex-col gap-6">
            <p>
              Der Tennisclub Holzminden von 1928 ist ein dynamischer Verein, der
              in den letzten Jahren eine enorme Entwicklung hingelegt hat. Die
              Anzahl der Kinder, die regelmäßig Tennis spielen, konnte von sechs
              auf über 200 gesteigert werden. Zusätzlich kommen durch
              Kooperationen mit Schulen und Betreuungseinrichtungen weitere 60
              Kinder hinzu, die die Anlage jeden Tag nutzen.
            </p>

            <div className="flex flex-col gap-2">
              <h2>Trainingsbetrieb und Tennishalle</h2>
              <p>
                Der Trainingsbetrieb für Kinder findet täglich von 14:00 bis
                18:00 Uhr auf der Anlage an der Liebigstraße 111 statt. Ein
                wichtiger Meilenstein in der Entwicklung des Vereins war der
                Kauf der Tennishalle am Stahler Ufer, der vor zwei Jahren dank
                Sponsorengeldern der Stadt Holzminden und der
                "Tramitz-Borchers-Stiftung" realisiert werden konnte. Diese
                Tennishalle ermöglicht es, den Trainingsbetrieb auch im Winter
                anzubieten.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h2>Trainerteam</h2>
              <p>
                Der Verein verfügt über ein hervorragend ausgebildetes
                Trainerteam, bestehend aus Constantin Meier, Martin Krzempek,
                Claudia Gronemeyer, Lena Timmermann und Yannick Klingspor. Diese
                Trainer arbeiten eng mit den Kindern zusammen, um ihre
                Fähigkeiten zu verbessern. Im Erwachsenenbereich konnte Mischa
                Pietrzyk als Trainer gewonnen werden, was zu einer starken
                Steigerung der Mitgliederzahlen geführt hat.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h2>Zukunftspläne</h2>
              <p>
                Der Tennisclub Holzminden von 1928 ist bestrebt, seine
                Erfolgsgeschichte fortzuschreiben und weiterhin eine wichtige
                Rolle im Tennis-Sport in der Region zu spielen. Durch die
                Kombination von qualifiziertem Training, moderner Infrastruktur
                und einem engagierten Vorstand ist der Verein gut aufgestellt,
                um seine Ziele zu erreichen.
              </p>
            </div>
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
    </>
  );
}

export default UeberUns;

UeberUns.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
