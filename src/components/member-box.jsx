import React from "react";
import Button from "./ui/button2";

function MemberBox() {
  return (
    <div className="w-full flex p-10 md:p-20 md:px-30 member-box flex-col text-tch-blue rounded border-b-4 md:border-tch-gold">
      <p className="uppercase text-2xl font-bold text-tch-gold underline underline-offset-4 mb-3">
        Teil der Mannschaft werden
      </p>
      <h2 className="text-4xl">MITGLIED WERDEN</h2>
      <p
        className="text-lg max-w-xl mt-2
      "
      >
        Um Mitglied zu werden, fülle bitte das Online Anmeldeformular aus und
        sende es an uns zurück. Gerne kannst du auch persönlich bei uns
        vorbeikommen, um mehr über den Verein zu erfahren und uns
        kennenzulernen.
      </p>
      <Button href="/club/aufnahme" className={"mt-8"}>
        Antrag stellen
      </Button>
    </div>
  );
}

export default MemberBox;
