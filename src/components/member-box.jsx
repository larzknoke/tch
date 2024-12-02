import React from "react";
import Button from "./ui/button";

function MemberBox() {
  return (
    <div className="w-full flex p-10 md:p-20 member-box flex-col text-tch-blue">
      <p>Teil der Mannschaft werden</p>
      <h2>MITGLIED WERDEN</h2>
      <p
        className=" max-w-xl mt-2
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
