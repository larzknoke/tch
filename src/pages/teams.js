import Layout from "@/components/ui/layouts/layout";
import ScheduleWrapper from "@/components/schedule/schedule-wrapper";
import { useState, useEffect } from "react";

const senioren = [
  {
    name: "Herren 40",
    liga: "Herren 40 Oberliga",
    link: "https://tnb.liga.nu/cgi-bin/WebObjects/nuLigaTENDE.woa/wa/teamPortrait?team=3599542&championship=TNB+Sommer+2026",
  },
  {
    name: "Herren 55 (4er)",
    liga: "Herren 55 Bezirksklasse",
    link: "https://tnb.liga.nu/cgi-bin/WebObjects/nuLigaTENDE.woa/wa/teamPortrait?team=3598153&championship=TNB+Sommer+2026",
  },
  {
    name: "Damen (4er)",
    liga: "Damen Regionsliga",
    link: "https://tnb.liga.nu/cgi-bin/WebObjects/nuLigaTENDE.woa/wa/teamPortrait?team=3600056&championship=TNB+Sommer+2026",
  },
];

const jugend = [
  {
    name: "Junioren C RL (4er)",
    liga: "Junioren C Regionsliga (4er)",
    link: "https://tnb.liga.nu/cgi-bin/WebObjects/nuLigaTENDE.woa/wa/teamPortrait?team=3651530&championship=TNB+Sommer+2026",
  },
  {
    name: "Junioren C RK (2er) II",
    liga: "Junioren C Regionsklasse (2er)",
    link: "https://tnb.liga.nu/cgi-bin/WebObjects/nuLigaTENDE.woa/wa/teamPortrait?team=3651531&championship=TNB+Sommer+2026",
  },
  {
    name: "Juniorinnen A RL (4er)",
    liga: "Juniorinnen A Regionsliga (4er)",
    link: "https://tnb.liga.nu/cgi-bin/WebObjects/nuLigaTENDE.woa/wa/teamPortrait?team=3651259&championship=TNB+Sommer+2026",
  },
  {
    name: "Juniorinnen B RL (4er)",
    liga: "Juniorinnen B Regionsliga (4er)",
    link: "https://tnb.liga.nu/cgi-bin/WebObjects/nuLigaTENDE.woa/wa/teamPortrait?team=3651262&championship=TNB+Sommer+2026",
  },
];

function TeamGroup({ title, teams }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <ul className="flex flex-col gap-3">
        {teams.map((team) => (
          <li
            key={team.name}
            className="flex flex-row items-center gap-4 border-b pb-3 flex-wrap"
          >
            <span className="font-semibold w-52">{team.name}</span>
            <span className="text-gray-600 w-64 hidden sm:inline">
              {team.liga}
            </span>
            <a
              href={team.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm border border-tch-blue text-tch-blue px-3 py-1 rounded hover:bg-tch-blue hover:text-white transition-colors"
            >
              Alle Spiele und Termine
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Teams() {
  return (
    <div className="flex flex-col gap-16 px-4 py-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold mb-8">
          Mannschaften TNB Sommer 2026
        </h1>
        <div className="flex flex-col gap-12">
          <TeamGroup title="Senioren" teams={senioren} />
          <TeamGroup title="Jugend" teams={jugend} />
        </div>
      </div>
      <div className="flex w-1/2">
        <ScheduleWrapper />
      </div>
    </div>
  );
}

Teams.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
