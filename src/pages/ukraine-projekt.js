import Layout from "@/components/ui/layouts/layout";
import Image from "next/image";
import HeaderText from "@/components/ui/header-text";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import MemberRegisterForm from "@/components/member-register-form";

function UkranineProjekt() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-10 my-10 md:my-20 px-5 md:px-0">
      <div className="w-full md:w-1/2">
        <HeaderText text="Das Ukraine-Projekt" />
        <div className="flex flex-col gap-6">
          <h2>
            Das Ukraine-Projekt des TC Holzminden: Eine Erfolgsgeschichte der
            Integration
          </h2>

          <p>
            Nach dem Ausbruch des Ukraine-Kriegs und der Ankunft vieler
            Flüchtlinge in Deutschland hat der TC Holzminden ein Projekt ins
            Leben gerufen, um Kindern aus der Ukraine zu helfen. Mit
            Unterstützung von Sponsoren bietet der Verein allen Kindern aus der
            Ukraine, unabhängig vom Alter, kostenloses Jugendtraining an.
          </p>

          <h2>Talente fördern und integrieren</h2>

          <p>
            Das Projekt zielt darauf ab, Talente zu entdecken und intensiv zu
            fördern. Die Kinder aus der Ukraine sind eine Bereicherung des
            Vereinslebens und haben sich schnell integriert. Mittlerweile
            trainieren etwa 40 Kinder aus der Ukraine im Verein.
          </p>

          <h2>Erfolge und Engagement</h2>

          <p>
            Einige der Kinder haben sich zu Leistungsträgern in diversen
            Mannschaften entwickelt und unterstützen die Trainer bei der Arbeit
            mit anderen Gruppen. Einige haben sogar bereits eigenständig als
            Übungsleiter Tennistraining gegeben und sind somit eine wertvolle
            Bereicherung des Vereinslebens.
          </p>

          <p>
            Das Ukraine-Projekt des TC Holzminden ist ein vorbildliches Beispiel
            für erfolgreiche Integration und Förderung von Kindern mit
            Fluchterfahrung. Der Verein zeigt, dass Sport eine wichtige Rolle
            bei der Integration und Förderung von Kindern spielen kann.
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <div className="flex flex-col gap-8">
          <Image
            src="/images/ukraine/ukraine-projekt.jpg"
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
            slides={[{ src: "/images/ukraine/ukraine-projekt.jpg" }]}
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
