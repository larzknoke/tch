import Layout from "@/components/ui/layouts/layout";
import Image from "next/image";
import HeaderText from "@/components/ui/header-text";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import MemberRegisterForm from "@/components/member-register-form";

function PlayStay() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-10 my-10 md:my-20 px-5 md:px-0">
      <div className="w-full md:w-1/2">
        <HeaderText text="Play & Stay" />
        <div className="flex flex-col gap-6">
          <h2>
            Kostenloses Tennistraining für Kinder: Der TC Holzminden von 1928
            öffnet seine Pforten
          </h2>

          <p>
            Der Tennisclub Holzminden von 1928 bietet eine großartige
            Gelegenheit für Kinder im Alter zwischen drei und acht Jahren, den
            Tennissport zu entdecken. Dienstags und donnerstags von 15:00 bis
            16:00 Uhr findet an der Liebigstraße ein kostenloses Tennistraining
            statt, das allen interessierten Kindern offensteht.
          </p>

          <h2>Großes Interesse in den ersten Wochen</h2>

          <p>
            In den ersten zwei Wochen konnten wir bereits ein großes Interesse
            an diesem Angebot feststellen. Bis zu 30 Kinder nutzten die
            Gelegenheit, um unter Anleitung erfahrener Trainer erste Gehversuche
            im Tennis zu machen. Die Atmosphäre war geprägt von viel Spaß und
            Leidenschaft, was zeigt, wie viel Freude der Tennissport den jungen
            Teilnehmern bereitet.
          </p>

          <h2>Ein Angebot für die Zukunft</h2>

          <p>
            Der TC Holzminden von 1928 freut sich darauf, weiterhin jungen
            Talenten eine Plattform zu bieten, um den Tennissport zu erlernen
            und zu lieben. Das kostenlose Training ist nicht nur eine Chance für
            die Kinder, neue Fähigkeiten zu erwerben, sondern auch,
            Freundschaften zu schließen und aktiv zu sein.
          </p>

          <h2>Offene Pforten für neue Teilnehmer</h2>

          <p>
            Der Tennisclub lädt alle interessierten Kinder herzlich ein, am
            Training teilzunehmen. Es ist keine Anmeldung erforderlich, und die
            Kinder können einfach vorbeikommen, um den Spaß am Tennis zu
            entdecken. Wir freuen uns darauf, viele neue Gesichter auf unserer
            Anlage begrüßen zu können!
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <div className="flex flex-col gap-8">
          <Image
            src="/images/gelaende/gelaende_aussen_2.jpg"
            alt="Geländer 1"
            width="1000"
            height="645"
            className="w-full rounded-sm hover:cursor-pointer border-b-4 border-tch-blue"
            onClick={() => setOpen(true)}
          />
          <Image
            src="/images/gelaende/gelaende_aussen_3.jpg"
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

export default PlayStay;

PlayStay.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
