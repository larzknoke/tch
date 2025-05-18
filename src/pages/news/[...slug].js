import Sidebar from "@/components/sidebar";
import Layout from "@/components/ui/layouts/layout";
import { useRouter } from "next/router";
import HeaderText from "@/components/ui/header-text";
import Image from "next/image";
import { Text } from "@chakra-ui/react";

export default function NewsPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col md:flex-row gap-8 md:gap-16">
        <div className="w-full md:w-2/3">
          <div>
            <Text className="text-gray-500 mb-1">09. September 2025</Text>
            <HeaderText text="Ein Jahr mit neuem Bulli" />
          </div>
          <Image
            src="/news/bulli.jpg"
            alt="Geländer 1"
            width="1000"
            height="645"
            className="w-full rounded-sm hover:cursor-pointer border-b-4 border-tch-blue mb-4"
            onClick={() => setOpen(true)}
          />
          <div className="flex flex-col gap-6">
            <p>
              Seit einem Jahr ist der TC Holzminden von 1928 stolzer Besitzer
              eines acht-sitzigen Bullis. Dieses Fahrzeug wird genutzt, um
              Kinder von der Schule abzuholen und zum Training oder zu
              Punktspielen zu bringen. Der Slogan "Wir bewegen eure Kinder" ist
              dabei besonders hervorzuheben.
            </p>
            <h2>Ein Angebot für die Jugend</h2>
            <p>
              Der TC Holzminden bietet mit diesem Angebot eine praktische Lösung
              für Eltern, deren Kinder am Training oder an Wettkämpfen
              teilnehmen möchten. Der Bulli ermöglicht es, die Kinder sicher und
              bequem zu transportieren.
            </p>
            <p>
              "Wir bewegen eure Kinder" ist zweideutig gemeint und kann sowohl
              als Hinweis auf den Transport der Kinder als auch auf die
              sportliche Aktivität und Bewegung selbst interpretiert werden.
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/3 gap-12 flex flex-col">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

NewsPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
