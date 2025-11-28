import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";
import Layout from "@/components/ui/layouts/layout";
import Image from "next/image";
import HeaderText from "@/components/ui/header-text";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import MemberRegisterForm from "@/components/member-register-form";
import { Text } from "@chakra-ui/react";
import Button from "@/components/ui/button2";

function Aufnahme() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-10 my-10 md:my-20 px-5 md:px-0">
      <div className="w-full md:w-1/2">
        <HeaderText text="Mitgliedschaft & Antrag" />
        <div className="flex flex-col gap-6">
          <h3>
            Du bist an einer Mitgliedschaft beim TC Holzminden interessiert?
          </h3>
          <h3>Wir freuen uns auf Dich!</h3>
          <p>
            Die gemeinsame Begeisterung für den Tennissport verbindet alle
            unsere Mitglieder und lässt lebenslange Freundschaften entstehen.
            Bei uns findet jeder seine sportliche Herausforderung: ob
            ambitionierter Leistungssportler, geselliger Freizeitsportler oder
            tennisbegeisterte Familie.
          </p>
          <p>
            <a
              className="font-bold underline underline-offset-1"
              href="/kontakt"
            >
              Rufe uns an, schreibe uns eine Email
            </a>{" "}
            oder schaue einfach bei uns vorbei: Liebigstraße 111, 37603
            Holzminden.
          </p>
          <p>
            Gerne kannst Du auch einen Termin zu einem Schnuppertraining bei
            unserer Tennisschule vereinbaren.
          </p>
          <MemberRegisterForm />
          {/* <Button href="/AufnahmeantragTC1928.pdf" className={"mt-8"}>
            So wirst du Mitglied
          </Button> */}
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

export default Aufnahme;

Aufnahme.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
