import Layout from "@/components/ui/layouts/layout";
import Image from "next/image";
import HeaderText from "@/components/ui/header-text";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import MemberRegisterForm from "@/components/member-register-form";

function Spielordnung() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-10 my-10 md:my-20 px-5 md:px-0">
      <div className="w-full">
        <HeaderText text="Spielordnung" />
        <div className="flex flex-col gap-10 spielordnung max-w-3xl">
          <div>
            <h3>Platzbuchung</h3>
            <ul className="list-disc list-outside pl-5">
              <li>
                Ein Platz muss vor dem Spielen gebucht werden:{" "}
                <a className="text-tch-gold" href="https://tc1928.ebusy.de/">
                  Online Platzbuchung
                </a>
              </li>
              <li>
                Die Spielzeit für Einzel und Doppel ist bei der Online
                Platzbuchung beschrieben (siehe oben)
              </li>
              <li>Es gelten die Regeln zur Platzbuchung</li>
            </ul>
          </div>
          <div>
            <h3>Spielen für Mitglieder</h3>
            <ul className="list-disc list-outside pl-5">
              <li>Vereinsmitglieder können auf allen Plätzen spielen</li>
              <li>
                Auf Platz 9 und 10 haben Gäste oder Mitglieder, die mit einem
                Gast spielen, Vorrang
              </li>
              <li>
                Spielt ein Mitglied mit einem Gast, dann gilt die folgende
                Regelung
              </li>
            </ul>
          </div>
          <div className="bg-gray-200 p-8 rounded-md">
            <h3>Spielen für Gäste</h3>
            <ul className="list-disc list-outside pl-5">
              <li>Alle Gäste können nur auf den Plätzen 9 und 10 spielen</li>
              <li>Die Buchung muss elektronisch im Buchungsportal erfolgen</li>
              <li>
                Spielt ein Gast mit einem Mitglied, kann das Mitglied den Platz
                günstiger buchen. Das Mitglied ist für die ordnungsmäßige
                Platzbelegung und die Bezahlung der Gastgebühr verantwortlich.
              </li>
              <li>
                Zudem müssen die Gastspielerschilder benutzt werden, um die
                Belegung auf der Spieltafel anzuzeigen
              </li>
              <li>
                Alle Gäste können erst ab dem 01.05. eines Kalenderjahres bei
                uns spielen
              </li>
              <li>
                Wie buche ich einen Gastspieler-Platz:{" "}
                <a href="https://tc1928.ebusy.de/">
                  <b>Bitte hier klicken</b>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3>Platzpflege</h3>
            <ul className="list-disc list-outside pl-5 mb-4">
              <li>Der Platz muss vor und nach dem Spielen gepflegt werden</li>
              <li>Dabei gelten die Regeln zu Platzpflege</li>
            </ul>
            <h4>Regeln zur Platzpflege</h4>
            <ul className="list-disc list-outside pl-5">
              <li>
                Der Platz muss vor dem Spiel für mindestens 3 Minuten bewässert
                werden
              </li>
              <li>Der Platz muss pfleglich behandelt werden</li>
              <li>
                Der Platz muss nach dem Spiel abgezogen und die Linien gekehrt
                werden
                <ul className="list-disc list-outside pl-5">
                  <li>
                    Beim Abziehen muss die gesamte Platzfläche erfasst werden
                  </li>
                  <li>
                    Die Regner müssen ausgespart werden, damit sie nicht
                    verschmutzen
                  </li>
                  <li>
                    Die Matten und Besen müssen nach der Benutzung aufgehängt
                    werden
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="bg-gray-200 p-8 rounded-md">
            <h3 className="mb-3">Regeln zur Platzbuchung</h3>
            <ul className="list-disc list-outside pl-5 mb-0">
              <li>
                Die Buchung erfolgt ausschließlich über das Online
                Buchungssystem
              </li>
              <li>
                Es sind nur nächstmögliche Platzreservierungen erlaubt, außer
                den im Online System beschriebenen Ausnahmen
              </li>
              <li>Reservierungen über Leerzeiten sind nicht möglich</li>
              <li>Ablösungen sind nur möglich, wenn alle Plätze belegt sind</li>
              <li>Der Platz kann nur für das Tennisspiel benutzt werden</li>
            </ul>
          </div>
          <div>
            <h3>Regeln auf der Anlage</h3>
            <ul className="list-disc list-outside pl-5">
              <li>
                Wir bitten alle Benutzer unserer Plätze um gegenseitige
                Rücksichtnahme: Vermeidet Lärm oder lautstarke Gespräche auf dem
                Spielfeld und wartet beim Durchqueren eines Platzes, bis die
                anderen Spieler den Punkt beendet haben.
              </li>
              <li>
                Das Betreten des Clubgebäudes und der Halle mit schmutzigen
                Tennisschuhen ist ausdrücklich untersagt. Spieler auf dem Weg
                zur Umkleide werden gebeten, ihre Schuhe an den Bänken im
                Eingangsbereich zu wechseln.
              </li>
              <li>
                Auf dem Gelände des TC Rot-Weiss müssen Hunde an der Leine
                geführt werden – egal ob deren Besitzer Vereinsmitglieder sind
                oder nicht.
              </li>
              <li>
                Tennisbälle bestehen zum großen Teil aus Gummi und verrotten
                extrem schlecht. Sollte Euch einmal ein Ball ins „Grüne“
                fliegen, macht Euch bitte die Mühe und sammelt ihn wieder ein.
                Für Müll jeder Art stehen auf den Plätzen Abfallbehälter bereit.
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <p>
              Der Verstoß gegen unsere Spielordnung führt zu einer Geldstrafe in
              Höhe von 150 € und kann zur Platz- und Spielsperre führen.
            </p>
            <p>
              Wir bedanken uns für Ihr Verständnis und wünschen viel Spaß beim
              Tennisspielen!
            </p>
            <p>Eure Vorstandschaft</p>
          </div>
        </div>
      </div>
      {/* <div className="w-full md:w-1/3">
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
      </div> */}
    </div>
  );
}

export default Spielordnung;

Spielordnung.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
