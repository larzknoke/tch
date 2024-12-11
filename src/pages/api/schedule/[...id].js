const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { JSONFromTable } = require("jsonfromtable");

export default async function handler(req, res) {
  const { id } = req.query;

  const resData = await fetch(
    "https://tnb.liga.nu/cgi-bin/WebObjects/nuLigaTENDE.woa/wa/clubMeetings?club=16529"
  );
  const dataServer = await resData.text();
  const dom = new JSDOM(dataServer);
  const tableData = dom.window.document.querySelector(".result-set").outerHTML;

  const tableObj = JSONFromTable.fromString(tableData);
  console.log("tableObj", typeof tableObj);

  res.status(200).json(tableObj);
}
