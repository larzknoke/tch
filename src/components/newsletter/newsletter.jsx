import Button from "../ui/button2";

function NewsLetter() {
  return (
    <div className="bg-tch-blue p-8 md:p-10 relative text-white flex flex-col md:flex-row gap-12 md:gap-4 rounded-sm mx-5 md:mx-0">
      <div className="flex flex-col gap-5 w-full md:w-1/2">
        <h1 className="text-white">
          TENNIS IN HOLZMINDEN SEIT 1928. <br /> TRADITION. ENGAGEMENT. ERFOLG.
        </h1>
        <ul className="list-square md:list-inside	">
          <li>über 600 Mitglieder</li>
          <li>15 Freiplätze</li>
          <li>3 moderne Hallenplätze (online buchbar)</li>
          <li>Beachvolleyball</li>
          <li>
            Mannschaften in allen AlterklassenSpielertreff für Hobbyspieler
          </li>
          <li>Professionelle Tennisschule für alle Leistungsstärken</li>
          <li>Fast Learning Kurse für Anfänger und Wiedereinsteiger</li>
          <li>Gruppen- und Individualtraining</li>
        </ul>
      </div>
      <div className="flex w-full md:w-1/2 items-center justify-center flex-col gap-4">
        <h3 className="text-white">TC HOLZMINDEN NEWSLETTER</h3>
        <input
          type="text"
          placeholder="Email eintragen"
          className="px-3 py-2 m-3 text-tch-blue rounded-md w-full md:w-3/4"
        />
        <Button className={"w-1/2"}>Newsletter abbonieren</Button>
        <p className="text-sm text-center">
          Wir senden keinen Spam! <br /> Erfahre mehr in unserer
          Datenschutzerklärung.
        </p>
      </div>
    </div>
  );
}

export default NewsLetter;
