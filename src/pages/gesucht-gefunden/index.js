import Button from "@/components/ui/button2";
import Layout from "@/components/ui/layouts/layout";
import Image from "next/image";
import HeaderText from "@/components/ui/header-text";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

function GesuchtGefunden() {
  return (
    <>
      <div className="mt-10 md:mt-20 px-5 md:px-0">
        <HeaderText text="Nicht gesucht, doch gefunden" />
      </div>
      <div className="flex flex-col md:flex-row gap-10 md:gap-30 my-10 md:my-10 px-5 md:px-0">
        <div className="w-full md:w-1/2">
          <div className="flex flex-col gap-6">
            <h2 className="text-balance">
              Vlada, Sina und Johanna – Gemeinsam auf dem Tennisplatz
            </h2>

            <Image
              src="/images/gesucht-gefunden/Vlada_Sina_und_Johanna.jpg"
              alt="Geländer 1"
              width="1000"
              height="645"
              className="w-full h-96 object-cover rounded-sm  border-b-4 border-tch-blue"
            />
            <p>
              Vlada, Sina und Johanna haben unterschiedliche Hintergründe und
              Wege, doch ihre gemeinsame Leidenschaft für Tennis verbindet sie
              auf besondere Weise.
            </p>
            <Button href="/gesucht-gefunden/vlada-sina-johanna">
              Zur ganzen Geschichte
            </Button>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="flex flex-col gap-6">
            <h2 className="text-balance">
              Der Weg von Jonas und Jeron zum gemeinsamen Tennisspiel
            </h2>

            <Image
              src="/images/gesucht-gefunden/Jeron_Jonas.jpg"
              alt="Geländer 1"
              width="1000"
              height="645"
              className="w-full h-96 object-cover object-top rounded-sm  border-b-4 border-tch-blue"
            />
            <p>
              Jonas und Jeron könnten kaum unterschiedlicher sein – doch genau
              das macht ihre Geschichte so spannend und inspirierend.
            </p>
            <Button href="/gesucht-gefunden/jeron-jonas">
              Zur ganzen Geschichte
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default GesuchtGefunden;

GesuchtGefunden.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
