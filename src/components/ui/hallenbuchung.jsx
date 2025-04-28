import Link from "next/link";

function Hallenbuchung() {
  return (
    <Link
      className="bg-red-700 text-white px-4 py-1 rounded-sm uppercase"
      href={"https://tc1928.ebusy.de/"}
      target="_blank"
    >
      Wintersaison:
      <span className="font-bold"> Hallenbuchung</span>
    </Link>
  );
}

export default Hallenbuchung;
