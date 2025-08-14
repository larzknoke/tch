import Layout from "@/components/ui/layouts/layout";
import Image from "next/image";
import HeaderText from "@/components/ui/header-text";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

function UkranineProjekt() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-10 my-10 md:my-20 px-5 md:px-0">
      <div className="w-full md:w-1/2">
        <HeaderText text="Nicht gesucht, doch gefunden" />
        <div className="flex flex-col gap-6">
          <h2>Vlada, Sina und Johanna – Gemeinsam auf dem Tennisplatz</h2>

          <p>
            Vlada, Sina und Johanna haben unterschiedliche Hintergründe und
            Wege, doch ihre gemeinsame Leidenschaft für Tennis verbindet sie auf
            besondere Weise.
          </p>

          <p>
            Vlada kam vor drei Jahren aus der Ukraine nach Deutschland. Für sie
            war es eine große Umstellung, doch der Tennisplatz wurde schnell zu
            einem Ort, an dem sie sich zuhause fühlte. Das Spiel half ihr, neue
            Freunde zu finden und sich in ihrer neuen Heimat zurechtzufinden.
            Heute spielt Vlada in den B-Juniorinnen und Damenmannschaften und
            zeigt dort ihr Können und ihre Freude am Sport.
          </p>

          <p>
            Sina kam erst im letzten Jahr zu uns, nachdem sie in einem anderen
            Verein nicht mehr weiterkam. Sie suchte nach neuen Herausforderungen
            und wollte ihr Spiel verbessern. Beim Training entdeckte sie die
            Freude am Tennissport neu. Sina spielt ebenfalls in den
            B-Juniorinnen und Damenmannschaften und bringt viel Energie und
            Motivation mit auf den Platz.
          </p>

          <p>
            Johanna wechselte im letzten Jahr vom Fußball zum Tennis. Für sie
            ist es eine spannende neue Erfahrung, den Schläger in die Hand zu
            nehmen. Sie spielt in den A-Juniorinnen und Damenmannschaften und
            nutzt die Chance, ihre Beweglichkeit und ihr Spielverständnis auf
            eine neue Art zu trainieren.
          </p>
          <p>
            Obwohl ihre Wege unterschiedlich sind, haben sich Vlada, Sina und
            Johanna auf dem Tennisplatz gefunden. Sie trainieren gemeinsam,
            lachen zusammen und unterstützen sich gegenseitig. Ihre
            unterschiedlichen Erfahrungen und Spielklassen bereichern das
            Training und machen es zu etwas Besonderem.
          </p>
          <p>
            Heute sind sie nicht nur Teamkollegen, sondern auch Freunde
            geworden. Ihr gemeinsamer Weg zeigt, dass Sport Brücken bauen kann –
            egal, woher man kommt oder welchen Weg man bisher gegangen ist. Für
            sie ist Tennis mehr als nur ein Spiel: Es ist eine Gemeinschaft, die
            verbindet und inspiriert.
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <div className="flex flex-col gap-8">
          <Image
            src="/images/gesucht-gefunden/Vlada_Sina_und_Johanna.jpg"
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
              { src: "/images/gesucht-gefunden/Vlada_Sina_und_Johanna.jpg" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default UkranineProjekt;

UkranineProjekt.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
