function JugendtrainingKostenplan({
  title = "Kostenplan für das Jugendtraining",
}) {
  return (
    <div className="flex flex-col gap-4">
      <h2>{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-3 py-2 border border-gray-200">
                Trainingsform
              </th>
              <th className="px-3 py-2 border border-gray-200">Trainer</th>
              <th className="px-3 py-2 border border-gray-200">
                Kosten/ Monat
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-3 py-2 border border-gray-200">
                Einzelunterricht
              </td>
              <td className="px-3 py-2 border border-gray-200">B-Trainer</td>
              <td className="px-3 py-2 border border-gray-200">200,00 €</td>
            </tr>
            <tr>
              <td className="px-3 py-2 border border-gray-200 border-b-gray-400">
                Einzelunterricht
              </td>
              <td className="px-3 py-2 border border-gray-200 border-b-gray-400">
                C-Trainer/ Übungsleiter
              </td>
              <td className="px-3 py-2 border border-gray-200 border-b-gray-400">
                139,00 €
              </td>
            </tr>
            <tr>
              <td className="px-3 py-2 border border-gray-200">
                Gruppenunterricht 2er-Gruppe
              </td>
              <td className="px-3 py-2 border border-gray-200">B-Trainer</td>
              <td className="px-3 py-2 border border-gray-200">105,00 €</td>
            </tr>
            <tr>
              <td className="px-3 py-2 border border-gray-200 border-b-gray-400">
                Gruppenunterricht 2er-Gruppe
              </td>
              <td className="px-3 py-2 border border-gray-200 border-b-gray-400">
                C-Trainer/ Übungsleiter
              </td>
              <td className="px-3 py-2 border border-gray-200 border-b-gray-400">
                72,00 €
              </td>
            </tr>
            <tr>
              <td className="px-3 py-2 border border-gray-200">
                Gruppenunterricht 3er-Gruppe
              </td>
              <td className="px-3 py-2 border border-gray-200">B-Trainer</td>
              <td className="px-3 py-2 border border-gray-200">71,00 €</td>
            </tr>
            <tr>
              <td className="px-3 py-2 border border-gray-200 border-b-gray-400">
                Gruppenunterricht 3er-Gruppe
              </td>
              <td className="px-3 py-2 border border-gray-200 border-b-gray-400">
                C-Trainer/ Übungsleiter
              </td>
              <td className="px-3 py-2 border border-gray-200 border-b-gray-400">
                50,00 €
              </td>
            </tr>
            <tr>
              <td className="px-3 py-2 border border-gray-200">
                Gruppenunterricht 4er-Gruppe
              </td>
              <td className="px-3 py-2 border border-gray-200">B-Trainer</td>
              <td className="px-3 py-2 border border-gray-200">55,00 €</td>
            </tr>
            <tr>
              <td className="px-3 py-2 border border-gray-200">
                Gruppenunterricht 4er-Gruppe
              </td>
              <td className="px-3 py-2 border border-gray-200">
                C-Trainer/ Übungsleiter
              </td>
              <td className="px-3 py-2 border border-gray-200">39,00 €</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Preise pro Person</p>
      <p>Trainingseinheit je 60 Minuten</p>
      <p>40 Trainingseinheiten pro Jahr</p>
      <p>
        Die im Kostenplan ausgewiesenen Beträge gelten für die jeweilige
        Trainingsform und werden ab der Wintersaison 2026/2027 im kommerziellen
        Trainingsbereich abgerechnet.
      </p>
    </div>
  );
}

export default JugendtrainingKostenplan;
