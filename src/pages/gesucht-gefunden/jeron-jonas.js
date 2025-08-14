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
          <h2>Der Weg von Jonas und Jeron zum gemeinsamen Tennisspiel</h2>

          <p>
            Jonas und Jeron könnten kaum unterschiedlicher sein – doch genau das
            macht ihre Geschichte so spannend und inspirierend.
          </p>

          <p>
            Jeron war von Anfang an begeistert vom Tennis. Schon in jungen
            Jahren stand der Sport im Mittelpunkt seines Lebens. Er trainierte
            regelmäßig, nahm an Turnieren teil und träumte davon, eines Tages
            ganz oben mitzuspielen. Für ihn war Tennis mehr als nur ein Hobby –
            es war seine Leidenschaft. Seine Familie und Freunde unterstützten
            ihn auf seinem Weg, und er entwickelte sich zu einem echten Talent
            auf dem Platz.
          </p>

          <p>
            Jonas hingegen probierte sich in vielen Sportarten aus, bevor er den
            Weg zum Tennis fand. Er war ein echter Allrounder: Handball,
            Fußball, Basketball – alles hat er ausprobiert. Für ihn war Sport
            vor allem Spaß und Bewegung, und er schätzte die Vielfalt der
            verschiedenen Disziplinen. Tennis war für ihn zunächst nur eine von
            vielen Möglichkeiten, aktiv zu sein.
          </p>

          <p>
            Doch das Schicksal wollte es anders: Durch eine zufällige Begegnung
            auf dem Tennisplatz, bei einem gemeinsamen Freund oder einem
            Schnupperkurs, lernten Jonas und Jeron sich kennen. Anfangs spielten
            sie nur zum Spaß, doch schnell merkten beide, dass sie gemeinsam
            viel Freude am Spiel hatten. Jeron zeigte Jonas die Feinheiten des
            Tennisspiels, während Jonas mit seiner Vielseitigkeit und seinem
            Spaß an Bewegung den Platz mit frischer Energie füllte.
          </p>
          <p>
            Was als lockeres Spiel begann, entwickelte sich zu einer echten
            Freundschaft und zu gemeinsamen Trainingseinheiten. Trotz ihrer
            unterschiedlichen Hintergründe ergänzen sie sich perfekt: Jeron
            bringt die technische Präzision und das Wissen um den Sport mit,
            Jonas sorgt für die nötige Lockerheit und den Spaßfaktor.
          </p>
          <p>
            Heute trainieren Jonas und Jeron regelmäßig zusammen, motivieren
            sich gegenseitig und haben erkannt, dass es im Sport vor allem um
            Freude, Gemeinschaft und das gemeinsame Erlebnis geht. Ihr Weg
            zeigt, dass man manchmal unerwartet zueinander findet – nicht
            gesucht, aber doch gefunden – und dass die besten Freundschaften oft
            dort entstehen, wo man es am wenigsten erwartet.
          </p>
          <p>
            Ihre Geschichte ist ein schönes Beispiel dafür, wie Vielfalt im
            Sport verbindet und wie aus unterschiedlichen Wegen eine gemeinsame
            Leidenschaft entstehen kann.
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <div className="flex flex-col gap-8">
          <Image
            src="/images/gesucht-gefunden/Jeron_Jonas.jpg"
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
