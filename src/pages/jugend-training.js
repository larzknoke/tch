import Link from "next/link";
import Layout from "@/components/ui/layouts/layout";
import Image from "next/image";
import HeaderText from "@/components/ui/header-text";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import MemberRegisterForm from "@/components/member-register-form";

function JugendTraining() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-10 my-10 md:my-20 px-5 md:px-0">
      <div className="w-full md:w-1/2">
        <HeaderText text="Jugendtraining & Kooperationen" />
        <Link
          href="Jugendleitlinie_2025.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-tch-blue underline text-2xl mb-8 d-block"
        >
          Jugendleitlinie des TC Holzminden (PDF)
        </Link>
        <div className="flex flex-col gap-6">
          <h2>
            Intensive Kooperation mit Schulen und Betreuungstätten: Ein
            Erfolgsmodell des TC Holzminden
          </h2>
          <p>
            Der TC Holzminden kann auf eine langjährige und erfolgreiche
            Kooperation mit der Astrid-Lind-Kind-Schule und Betreuungsstelle
            sowie dem Campe-Gymnasium in Holzminden zurückblicken.
          </p>

          <h2>Acht Jahre Kooperation mit der Astrid-Lind-Kind-Schule</h2>
          <p>
            Seit acht Jahren bietet der TC Holzminden an zwei Tagen in der Woche
            kostenloses Tennistraining für die ersten und zweiten Klassen der
            Astrid-Lind-Kind-Schule an. Diese Kooperation hat bereits viele
            Talente in den Verein integriert und fördert die sportliche
            Entwicklung der jungen Mitglieder.
          </p>

          <h2>Kooperation mit dem Campe-Gymnasium</h2>
          <p>
            Zusätzlich besteht eine Kooperation mit dem Campe-Gymnasium in
            Holzminden, wo einmal wöchentlich kostenloses Tennistraining
            angeboten wird. In den Wintermonaten, wenn der Spielbetrieb in die
            eigene Halle am Stahler Ufer verlegt wird, werden die Kinder mit dem
            Vereinsbus zum Training gefahren.
          </p>

          <p>
            Diese Kooperationen sind ein wichtiger Bestandteil der Jugendarbeit
            des TC Holzminden und tragen dazu bei, junge Talente zu fördern und
            die Liebe zum Tennissport zu wecken.
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <div className="flex flex-col gap-8">
          <Image
            src="/images/jugendtraining/Asli-Hort-2017.jpg"
            alt="Beginn Asli Hort 2017"
            width="1000"
            height="645"
            className="w-full rounded-sm hover:cursor-pointer border-b-4 border-tch-blue"
            onClick={() => setOpen(true)}
          />
          <Image
            src="/images/jugendtraining/Campe-in-Halle.jpg"
            alt="Campe in der Halle"
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
              { src: "/images/jugendtraining/Campe-in-Halle.jpg" },
              { src: "/images/jugendtraining/Asli-Hort-2017.jpg" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default JugendTraining;

JugendTraining.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
