import Layout from "@/components/ui/layouts/layout";
import Image from "next/image";
import HeaderText from "@/components/ui/header-text";
import { useState } from "react";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

function Satzung() {
  return (
    <div className="flex flex-col md:flex-row gap-10 my-10 md:my-20 px-5 md:px-0">
      <div className="w-full md:w-1/2">
        <HeaderText text="Satzung" />
        <div className="flex flex-col gap-6 satzung">
          <h4>§1 Name und Sitz</h4>
          <p>
            Der Verein führt den Namen Tennisclub Holzminden von 1928 e.V. und
            hat seinen Sitz in Holzminden.
          </p>
          <p>Gründungstag ist der 7. Mai 1928.</p>
          <p>
            Er ist in das Vereinsregister des Amtsgerichts Hildesheim unter Nr.
            VR 150087 eingetragen.
          </p>
          <h4>§2 Zweck des Vereins</h4>
          <p>
            Zweck des Vereins ist es, den Tennissport zu betreiben und zu seiner
            Verbreitung beizutragen.
          </p>
          <p>
            Der Verein verfolgt ausschließlich und unmittelbar gemeinnützige
            Zwecke i. S. des Abschnitts "Steuerbegünstigte Zwecke" der
            Abgabenordnung durch die Pflege und Förderung des Breiten- und
            Leistungssports.
          </p>
          <p>
            Er erstrebt keinen Gewinn, ist selbstlos tätig und verfolgt nicht in
            erster Linie eigenwirtschaftliche Zwecke.
          </p>
          <p>
            Mittel des Vereins dürfen nur für die satzungsgemäßen Zwecke
            verwendet werden, Mitglieder erhalten hieraus keine Zuwendungen. Es
            darf keine Person durch Ausgaben, die den Vereinszwecken fremd sind,
            oder durch unverhältnismäßig hohe Vergütungen begünstigt werden.
          </p>
          <h4>§3 Mitgliedschaft in anderen Organisationen</h4>
          <p>
            Der Verein ist Mitglied des Landessportbundes Niedersachsen e.V. mit
            seinen Gliederungen sowie des Niedersächsischen Tennisverbandes e.V.
            und regelt im Einklang mit deren Satzungen seine Angelegenheiten
            selbständig.
          </p>
          <h4>§4 Rechtsgrundlagen</h4>
          <p>
            Die Rechte und Pflichten der Mitglieder sowie aller Organe des
            Vereins werden ausschließlich durch die vorliegende Satzung
            geregelt.
          </p>
          <h4>§5 Geschäftsjahr</h4>
          <p> Das Geschäftsjahr ist das Kalenderjahr.</p>
          <h4>§6 Erwerb der Mitgliedschaft</h4>
          <p>
            Mitglied des Vereins kann jede natürliche Person werden.
            Voraussetzung für den Erwerb der Mitgliedschaft ist ein
            schriftlicher Aufnahmeantrag.
          </p>
          <p>
            Bei beschränkt Geschäftsfähigen, insbesondere Minderjährigen, ist
            der Antrag auch von dem gesetzlichen Vertreter zu unterschreiben,
            der sich damit zugleich zur Zahlung der Mitgliedsbeiträge für den
            beschränkt Geschäftsfähigen verpflichtet.
          </p>
          <p>Über den Aufnahmeantrag entscheidet der Vorstand.</p>
          <p>
            Bei Ablehnung des Antrags ist er nicht verpflichtet, dem
            Antragsteller die Gründe mitzuteilen. Die Mitgliedschaft beginnt mit
            schriftlicher Bestätigung durch den Vorstand. Der Spielbetrieb darf
            bereits mit Abgabe des Aufnahmeantrags aufgenommen werden, solange
            kein Widerspruch durch den Vorstand erfolgt.
          </p>
          <p>Die Mitgliedschaft im Verein ist möglich als</p>
          <ul>
            <li>aktives Mitglied</li>
            <li>
              passives Mitglied; die passive Mitgliedschaft berechtigt nicht zur
              Benutzung der Einrichtungen des Vereins zur sportlichen
              Betätigung.
            </li>
            <li>Ehrenmitglied</li>
            <li>
              auswärtiges Mitglied. Die auswärtige Mitgliedschaft berechtigt nur
              zur Nutzung der vereinseigenen Tennishalle zur sportlichen
              Betätigung und zur Teilnahme an der Mitgliederversammlung. Ein
              Stimmrecht ist damit nicht verbunden.
            </li>
          </ul>
          <p>
            Auf Antrag kann die passive in eine aktive und eine aktive in eine
            passive Mitgliedschaft umgewandelt werden. Hierüber entscheidet der
            Vorstand.
          </p>
          <h4>§7 Ehrenmitglieder</h4>
          <p>
            Personen, die sich besonders um den Verein verdient gemacht haben,
            können durch Beschluss der Mitgliederversammlung zu Ehrenmitgliedern
            ernannt werden; sie sind nicht zur Beitragsleistung verpflichtet.
            Der Ehepartner wird in die Sonderregelung Beitragsmitgliederleistung
            einbezogen
          </p>
          <h4>§8 Beendigung der Mitgliedschaft</h4>
          <ol>
            <li>
              <p>
                Die Mitgliedschaft endet durch Tod, Ausschluss, Streichung von
                der Mitgliederliste oder Austritt aus dem Verein.
              </p>
            </li>
            <li>
              <p>
                Der Austritt erfolgt durch schriftliche Erklärung gegenüber dem
                Vorstand. Bei beschränkt Geschäftsfähigen, insbesondere
                Minderjährigen, ist die Austritts-Erklärung auch von dem
                gesetzlichen Vertreter zu unterschreiben. Der Austritt kann nur
                zum Ende eines Geschäftsjahres erklärt werden, wobei eine
                Kündigungsfrist von 1 Monat einzuhalten ist.
              </p>
            </li>
            <li>
              <p>
                Ein Mitglied kann durch Beschluss des Vorstands von der
                Mitgliederliste gestrichen werden, wenn es trotz zweimaliger
                schriftlicher Mahnung mit der Zahlung von Mitgliedsbeiträgen
                oder von Umlagen im Rückstand ist. Die
              </p>
              <p>
                Streichung darf erst beschlossen werden, wenn nach der Absendung
                der zweiten Mahnung zwei Monate verstrichen sind und in dieser
                Mahnung die Streichung angedroht wurde. Der Beschluss über die
                Streichung ist dem Mitglied mitzuteilen.
              </p>
            </li>
            <li>
              <p>
                Wenn ein Mitglied schuldhaft in grober Weise seine
                Mitgliedspflichten oder allgemein die Interessen oder das
                Ansehen des Vereins verletzt, kann es durch Beschluss des
                Ehrenrates aus dem Verein ausgeschlossen werden. Den Antrag auf
                Ausschließung eines Mitglieds kann der Vorstand sowie jedes
                Mitglied über den Vorstand an den Ehrenrat richten. Vor der
                Beschlussfassung muss der Ehrenrat dem Betroffenen Gelegenheit
                zu mündlicher oder schriftlicher Stellungnahme innerhalb
                angemessener Zeit geben. Der Ausschließungsbeschluss ist mit
                Begründung durch Einschreiben zuzustellen.
              </p>
            </li>
          </ol>
          <h4>§9 Mitgliedsbeiträge</h4>
          <ol>
            <li>
              <p>
                Bei Aufnahme in den Verein kann eine Aufnahmegebühr erhoben
                werden, über die der Vorstand entscheidet. Von den Mitgliedern
                werden Jahresbeiträge erhoben.
              </p>
            </li>
            <li>
              <p>
                Zur Finanzierung besonderer Vorhaben oder zur Beseitigung
                finanzieller Schwierigkeiten des Vereins können auf Beschluss
                der Mitgliederversammlung zusätzlich Umlagen erhoben werden.
                Höhe und Fälligkeit von Aufnahmegebühren, Jahresbeiträgen und
                Umlagen werden von der Mitgliederversammlung festgesetzt.
              </p>
            </li>
            <li>
              <p>
                Der Vorstand kann in Härtefällen Gebühren, Beiträge und Umlagen
                ganz oder teilweise stunden oder erlassen. Er entscheidet, ob
                und wie lange die Betreibung von Rückständen erfolgt.
              </p>
            </li>
          </ol>
          <h4>§10 Rechte und Pflichten der Mitglieder</h4>
          <p>
            Die Mitglieder sind, soweit sich ihre Rechte und Pflichten nicht aus
            anderen Bestimmungen der Satzung ergeben, berechtigt,
          </p>
          <ol>
            <li>
              <ol>
                <li>
                  <p>die Einrichtungen und Anlagen des Vereins zu benutzen.</p>
                </li>
                <li>
                  <p>
                    die Tennishalle gegen Bezahlung einer separaten
                    Nutzungsgebühr, über deren Höhe der Vorstand entscheidet, zu
                    nutzen.
                  </p>
                </li>
                <li>
                  <p>an Veranstaltungen des Vereins teilzunehmen.</p>
                </li>
              </ol>
            </li>
          </ol>
          <h4>§11 Organe des Vereins</h4>
          <p>
            Organe des Vereins sind die Mitgliederversammlung, der Vorstand und
            der Ehren rat.
          </p>
          <h4>§12 Mitgliederversammlung</h4>
          <p>
            In der Mitgliederversammlung hat jedes volljährige, anwesende
            Mitglied eine Stimme.
          </p>
          <p>Nicht stimmberechtigte Mitglieder haben ein Anhörungsrecht.</p>
          <p>
            Die Mitgliederversammlung ist insbesondere für folgende
            Angelegenheiten zuständig: Genehmigung des Haushaltsplans für das
            nächste Geschäftsjahr; Entgegennahme des Jahresberichts des
            Vorstands; Entlastung des Vorstands über die Geschäfts- und
            Kassenführung.
          </p>
          <p>Wahl des Vorstandes, Ehrenrats und der Kassenprüfer.</p>
          <p>Festsetzung von Gebühren, Beiträgen und Umlagen.</p>
          <p>
            Ernennung von Ehrenmitgliedern. Im Übrigen kann die
            Mitgliederversammlung über jede Angelegenheit des Vereins, so weit
            nicht die Zuständigkeit des Ehrenrats gegeben ist, beschließen.
          </p>
          <h4>§13 Einberufung der Mitgliederversammlung</h4>
          <p>
            Mindestens einmal im Jahr hat eine ordentliche Mitgliederversammlung
            stattzufinden. Sie wird vom Vorstand unter Einhaltung einer Frist
            von zwei Wochen schriftlich oder auf elektronischem Wege per E-Mail
            mit Angabe der Tagesordnung, die der Vorstand festlegt, einberufen.
            Die Frist beginnt mit dem auf die Absendung des Einladungsschreibens
          </p>
          <p>
            folgenden Tag; ein Einladungsschreiben gilt als zugegangen, wenn es
            an die letzte vom Mitglied dem Verein bekannt gegebene Adresse
            gerichtet ist; Familien erhalten nur ein Schreiben.
          </p>
          <p>Die Tagesordnung hat zumindest folgende Punkte zu enthalten:</p>
          <ol>
            <li>
              <p>Rechenschaftsbericht der Vorstandsmitglieder;</p>
            </li>
            <li>
              <p>Bericht der Kassenprüfer;</p>
            </li>
            <li>
              <p>Entlastung des Vorstands;</p>
            </li>
            <li>
              <p>Haushaltsplan;</p>
            </li>
            <li>
              <p>Wahlen.</p>
            </li>
          </ol>
          <p>
            Jedes Mitglied kann bis spätestens eine Woche vor einer
            Mitgliederversammlung beim Vorstand schriftlich eine Ergänzung der
            Tagesordnung beantragen. Der Versammlungsleiter hat zu Beginn der
            Mitgliederversammlung die Ergänzung bekannt zu geben. Über Anträge
            auf Ergänzung der Tagesordnung, die nicht rechtzeitig gestellt sind
            oder erst in der Mitgliederversammlung gestellt werden, beschließt
            die Mitgliederversammlung.
          </p>
          <h4>§14 Außerordentliche Mitgliederversammlung</h4>
          <p>
            Eine außerordentliche Mitgliederversammlung kann vom Vorstand
            einberufen werden, wenn ein wichtiger Grund vorliegt.
          </p>
          <p>
            Sie ist einzuberufen, wenn 20 v. H. der Mitglieder dieses
            schriftlich unter Angabe des Zwecks und der Gründe beantragen oder
            das Interesse des Vereins es erfordert.
          </p>
          <h4>§15 Beschlussverfahren</h4>
          <p>
            Die Mitgliederversammlung wird vom Vorsitzenden, bei dessen
            Verhinderung vom stellvertretenden Vorsitzenden, geleitet. Bei
            weiteren Verhinderungen wird die Leitung von einem anderen
            Vorstandsmitglied übernommen, wobei die Reihenfolge nach4 § h46 der
            Satzung einzuhalten ist. Ist kein Vorstandsmitglied anwesend,
            bestimmt die Versammlung den
          </p>
          <p>
            Versammlungsleiter. Für die Dauer des Wahlganges und der
            vorhergehenden Diskussion kann ein Wahlleiter eingesetzt werden.
          </p>
          <p>
            Bei der Beschlussfassung entscheidet die Mehrheit der abgegebenen
            gültigen Stimmen. Stimmenthaltungen bleiben daher außer Betracht.
            Bei Satzungsänderungen ist die Mehrheit von 3/4 der Stimmen der
            erschienenen Stimmberechtigten erforderlich.
          </p>
          <p>
            Über die Beschlüsse der Mitgliederversammlung ist ein Protokoll
            aufzunehmen, das vom jeweiligen Schriftführer und dem
            Versammlungsleiter zu unterzeichnen ist.
          </p>
          <h4>§16 Vorstand</h4>
          <p>Der Vorstand des Vereins besteht aus</p>
          <ul>
            <li>dem Vorsitzenden</li>
            <li>dem stellvertretenden Vorsitzenden</li>
            <li>dem Kassenwart</li>
            <li>einem oder zwei Sportwart(en)</li>
            <li>einem oder zwei Jugendwart(en)</li>
            <li>dem Pressewart</li>
            <li>dem Schriftwart</li>
          </ul>
          <p>
            Der Verein wird gerichtlich und außergerichtlich vertreten durch den
            Vorsitzenden oder stellvertretenden Vorsitzenden jeweils allein;
            wenn sowohl der Vorsitzende als auch der stellvertretende
            Vorsitzende verhindert sind, durch den Kassenwart.
          </p>
          <h4>§17 Zuständigkeit des Vorstandes</h4>
          <p>
            Der Vorstand ist für alle Angelegenheiten des Vereins zuständig,
            soweit sie durch die Satzung nicht einem anderen Organ des Vereins
            übertragen sind. Er hat insbesondere folgende Aufgaben:
          </p>
          <p>
            Vorbereitung und Einberufung der Mitgliederversammlung sowie
            Aufstellung der Tagesordnung
          </p>
          <p>Ausführung der Beschlüsse der Mitgliederversammlung</p>
          <p>
            Vorbereitung des Haushaltsplans, Kassenführung, Erstellung des
            Jahresberichts
          </p>
          <p>Organisation des Sportbetriebs und des sonstigen Vereinslebens.</p>
          <p>
            In allen Angelegenheiten von besonderer Bedeutung, insbesondere
            großer finanzieller Tragweite, soll der Vorstand eine Entscheidung
            der Mitgliederversammlung herbeiführen.
          </p>
          <p>
            Bei dauernder Verhinderung oder Ausscheiden eines Vorstandsmitglieds
            kann der Vorstand dessen Amt bis zur nächsten Mitgliederversammlung
            durch ein geeignetes Mitglied des Vereins besetzen.
          </p>
          <h4>§18 Wahl des Vorstands</h4>
          <p>
            Der Vorstand wird von der Mitgliederversammlung für die Dauer von
            zwei Jahren gewählt. Er bleibt jedoch bis zur Neuwahl des Vorstands
            im Amt. Zu Vorstandsmitgliedern können nur geschäftsfähige
            Mitglieder des Vereins gewählt werden. Mit Beendigung der
            Mitgliedschaft im Verein endet auch das Amt eines
            Vorstandsmitglieds.
          </p>
          <p>
            In geraden Jahren werden der Vorsitzende, der Kassenwart und der
            (die) Sportwart(e), in ungeraden Jahren der stellvertretende
            Vorsitzende, der Pressewart, der (die) Schriftwarte sowie der (die)
            Jugendwart(e) gewählt.
          </p>
          <p>
            Die Besetzung mehrerer Vorstandsposten mitderselben Person ist nicht
            zulässig.
          </p>
          <h4>§19 Sitzungen und Beschlüsse des Vorstands</h4>
          <p>
            Der Vorstand beschließt in Sitzungen, die vom Vorsitzenden, bei
            dessen Verhinderung vom stellvertretenden Vorsitzenden, einberufen
            werden; die Tagesordnung braucht nicht angekündigt zu werden,
          </p>
          <p>
            Der Vorstand ist beschlussfähig, wenn mindestens der Vorsitzende
            oder der stellvertretende Vorsitzende und diese eingerechnet vier
            seiner Mitglieder anwesend sind. Bei der Beschlussfassung
            entscheidet die Mehrheit der abgegebenen gültigen Stimmen; bei
            Stimmengleichheit entscheidet die Stimme des Vorsitzenden, bei
            dessen Abwesenheit die des stellvertretenden Vorsitzenden.
          </p>
          <p>
            In wichtigen Angelegenheiten ist immer ein Beschluss herbeizuführen.
          </p>
          <h4>§20 Vereinsausschüsse</h4>
          <p>
            Zur Durchführung besonderer Aufgaben können von der
            Mitgliederversammlung Vereinsfachausschüsse auf die Dauer von zwei
            Jahren gewählt werden.
          </p>
          <p>Sie geben sich eine eigene Geschäftsordnung.</p>
          <h4>§21 Ehrenrat</h4>
          <p>
            Der Ehrenrat besteht aus dem Ehrenratsvorsitzenden und zwei weiteren
            Mitgliedern, sowie zwei Ersatzmitgliedern.
          </p>
          <p>
            Er wird von der Mitgliederversammlung für die Dauer von zwei Jahren
            in geraden Jahren gewählt.
          </p>
          <p>Seine Mitglieder dürfen kein anderes Amt im Verein bekleiden.</p>
          <p>
            Bei Beendigung der Mitgliedschaft endet auch das Amt als
            Ehrenratsmitglied.
          </p>
          <h4>§22 Aufgaben des Ehrenrats</h4>
          <p>
            Der Ehrenrat entscheidet über den Ausschluss von Mitgliedern aus dem
            Verein nach4 §8 Abs. 4 der Satzung, sowie allgemein bh4i
            Streitigkeiten im Vereinsleben und Satzungsverstößen.
          </p>
          <p>
            Er wird nur tätig auf Antrag eines Vereinsmitglieds oder des
            Vorstands.
          </p>
          <p>
            Kann die Angelegenheit nach Ansicht des Ehrenrats auch durch den
            Vorstand erledigt werden, kann er den Antragsteller zunächst an
            diesen verweisen. Gegen die Entscheidung des Vorstands oder sofern
            dieser nicht innerhalb von sechs Wochen entscheidet, können die
            Parteien den Ehrenrat erneut anrufen.
          </p>
          <p>
            Bevor der Ehrenrat in der Sache selbst entscheidet, hat er beide
            Parteien anzuhören. Die Entscheidung ist schriftlich bekannt zu
            geben.
          </p>
          <p>Er ist berechtigt:</p>
          <ul>
            <li>ein Mitglied zu verwarnen;</li>
            <li> von einem Amt im Verein zu suspendieren; ;</li>
            <li>
              bis zu zwei Monate davon auszuschließen, die Einrichtungen und
              Anlagen des Vereins zu benutzen;
            </li>
            <li>aus dem Verein auszuschließen.</li>
          </ul>
          <h4>§23 Kassenprüfung</h4>
          <p>
            Mindestens einmal jährlich ist von zwei Kassenprüfern gemeinsam eine
            Kassenprüfung durchzuführen.
          </p>
          <p>
            In jedem Jahr wird ein Kassenprüfer der Mitgliederversammlung auf
            zwei Jahre gewählt.
          </p>
          <p>
            Die Kassenprüfer haben das Ergebnis der Prüfung in einem Bericht dem
            Vorstand und der Mitgliederversammlung vorzulegen.
          </p>
          <h4>§24 Auflösung des Vereins</h4>
          <p>
            Die Auflösung des Vereins kann nur in einer Mitgliederversammlung
            mit einer Mehrheit von 4/5 der abgegebenen gültigen Stimmen
            beschlossen werden, sofern mindestens 4/5 der stimmberechtigten
            Mitglieder anwesend sind.
          </p>
          <p>
            Erscheinen bei der Beschlussfassung über die Vereinsauflösung
            weniger als 4/5 der stimmberechtigten Mitglieder, so ist die
            Abstimmung nach einem Monat zu wiederholen. Die
            Mitgliederversammlung ist dann ohne Rücksicht auf die Anzahl der
            erschienenen Stimmberechtigten beschlussfähig.
          </p>
          <p>
            Falls die Mitgliederversammlung nichts anderes beschließt, sind der
            Vorsitzende und der stellvertretende Vorsitzende gemeinsam
            vertretungsberechtigte Liquidatoren.
          </p>
          <h4>§25 Vereinsvermögen</h4>
          <p>
            Bei Auflösung oder Verlust der Rechtsfähigkeit des Vereins, oder bei
            Wegfall seines bisherigen Zwecks, fällt das Vermögen des Vereins an
            die Stadt
          </p>
          <p>
            Holzminden mit der Zweckbestimmung, es unmittelbar und
            ausschließlich zur Förderung des Sports gemeinnützig zu verwenden.
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <div className="flex flex-col gap-8">
          <Image
            src="/images/gallery/gal8.jpg"
            alt="Geländer 1"
            width="1000"
            height="645"
            className="w-full rounded-sm hover:cursor-pointer border-b-4 border-tch-blue"
          />
          <Image
            src="/images/gallery/gal9.jpg"
            alt="Geländer 1"
            width="1000"
            height="645"
            className="w-full rounded-sm hover:cursor-pointer border-b-4 border-tch-blue"
          />
        </div>
      </div>
    </div>
  );
}

export default Satzung;

Satzung.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
