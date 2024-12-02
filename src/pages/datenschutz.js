import Image from "next/image";
import HeaderText from "@/components/ui/header-text";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Button from "@/components/ui/button";

function Datenschutz() {
  return (
    <div className="flex flex-row gap-10 my-20">
      <div className="w-2/3">
        <HeaderText text="Datenschutz" />
        <div className="flex flex-col gap-6 my-10">
          <p>
            <span className="flex flex-col gap-8">
              Wir freuen uns sehr über Ihr Interesse an unserem Verein.
              Datenschutz hat einen besondershohen Stellenwert für den Vorstand
              des Tennisverein Holzminden von 1928 e.V.. Eine
              <br />
              Nutzung der Internetseiten des Tennisverein Holzminden von 1928
              e.V.. ist grundsätzlich
              <br />
              ohne jede Angabe personenbezogener Daten möglich. Sofern eine
              betroffene Person
              <br />
              besondere Services unseres Unternehmens über unsere Internetseite
              in Anspruch nehmen
              <br />
              möchte, könnte jedoch eine Verarbeitung personenbezogener Daten
              erforderlich werden. Ist
              <br />
              die Verarbeitung personenbezogener Daten erforderlich und besteht
              für eine solche
              <br />
              Verarbeitung keine gesetzliche Grundlage, holen wir generell eine
              Einwilligung der
              <br />
              betroffenen Person ein.
              <br />
              Die Verarbeitung personenbezogener Daten, beispielsweise des
              Namens, der Anschrift, EMail-
              <br />
              Adresse oder Telefonnummer einer betroffenen Person, erfolgt stets
              im Einklang mit der
              <br />
              Datenschutz-Grundverordnung und in Übereinstimmung mit den für die
              Tennisverein
              <br />
              Holzminden von 1928 e.V.. geltenden landesspezifischen
              Datenschutzbestimmungen. Mittels
              <br />
              dieser Datenschutzerklärung möchte unser Unternehmen die
              Öffentlichkeit über Art, Umfang
              <br />
              und Zweck der von uns erhobenen, genutzten und verarbeiteten
              personenbezogenen Daten
              <br />
              informieren. Ferner werden betroffene Personen mittels dieser
              Datenschutzerklärung über die
              <br />
              ihnen zustehenden Rechte aufgeklärt.
              <br />
              Die Tennisverein Holzminden von 1928 e.V.. hat als für die
              Verarbeitung Verantwortlicher
              <br />
              zahlreiche technische und organisatorische Maßnahmen umgesetzt, um
              einen möglichst
              <br />
              lückenlosen Schutz der über diese Internetseite verarbeiteten
              personenbezogenen Daten
              <br />
              sicherzustellen. Dennoch können Internetbasierte
              Datenübertragungen grundsätzlich
              <br />
              Sicherheitslücken aufweisen, sodass ein absoluter Schutz nicht
              gewährleistet werden kann.
              <br />
              Aus diesem Grund steht es jeder betroffenen Person frei,
              personenbezogene Daten auch auf
              <br />
              alternativen Wegen, beispielsweise telefonisch, an uns zu
              übermitteln.
              <br />
              1. Begriffsbestimmungen
              <br />
              Die Datenschutzerklärung der Tennisverein Holzminden von 1928
              e.V.. beruht auf den
              <br />
              Begrifflichkeiten, die durch den Europäischen Richtlinien- und
              Verordnungsgeber beim
              <br />
              Erlass der Datenschutz-Grundverordnung (DS-GVO) verwendet wurden.
              Unsere
              <br />
              Datenschutzerklärung soll sowohl für die Öffentlichkeit als auch
              für unsere Kunden und
              <br />
              Geschäftspartner einfach lesbar und verständlich sein. Um dies zu
              gewährleisten, möchten wir
              <br />
              vorab die verwendeten Begrifflichkeiten erläutern.
              <br />
              Wir verwenden in dieser Datenschutzerklärung unter anderem die
              folgenden Begriffe:
              <br />• a) personenbezogene Daten
              <br />
              Personenbezogene Daten sind alle Informationen, die sich auf eine
              identifizierte oder
              <br />
              identifizierbare natürliche Person (im Folgenden „betroffene
              Person“) beziehen. Als
              <br />
              identifizierbar wird eine natürliche Person angesehen, die direkt
              oder indirekt,
              <br />
              insbesondere mittels Zuordnung zu einer Kennung wie einem Namen,
              zu einer
              <br />
              Kennnummer, zu Standortdaten, zu einer Online-Kennung oder zu
              einem oder
              <br />
              mehreren besonderen Merkmalen, die Ausdruck der physischen,
              physiologischen,
              <br />
              genetischen, psychischen, wirtschaftlichen, kulturellen oder
              sozialen Identität dieser
              <br />
              natürlichen Person sind, identifiziert werden kann.
              <br />• b) betroffene Person
              <br />
              Betroffene Person ist jede identifizierte oder identifizierbare
              natürliche Person, deren
              <br />
              personenbezogene Daten von dem für die Verarbeitung
              Verantwortlichen verarbeitet
              <br />
              werden.
              <br />• c) Verarbeitung
              <br />
              Verarbeitung ist jeder mit oder ohne Hilfe automatisierter
              Verfahren ausgeführte
              <br />
              Vorgang oder jede solche Vorgangsreihe im Zusammenhang mit
              personenbezogenen
              <br />
              Daten wie das Erheben, das Erfassen, die Organisation, das Ordnen,
              die Speicherung,
              <br />
              die Anpassung oder Veränderung, das Auslesen, das Abfragen, die
              Verwendung, die
              <br />
              Offenlegung durch Übermittlung, Verbreitung oder eine andere Form
              der
              <br />
              Bereitstellung, den Abgleich oder die Verknüpfung, die
              Einschränkung, das Löschen
              <br />
              oder die Vernichtung.
              <br />• d) Einschränkung der Verarbeitung
              <br />
              Einschränkung der Verarbeitung ist die Markierung gespeicherter
              personenbezogener
              <br />
              Daten mit dem Ziel, ihre künftige Verarbeitung einzuschränken.
              <br />• e) Profiling
              <br />
              Profiling ist jede Art der automatisierten Verarbeitung
              personenbezogener Daten, die
              <br />
              darin besteht, dass diese personenbezogenen Daten verwendet
              werden, um bestimmte
              <br />
              persönliche Aspekte, die sich auf eine natürliche Person beziehen,
              zu bewerten,
              <br />
              insbesondere, um Aspekte bezüglich Arbeitsleistung,
              wirtschaftlicher Lage,
              <br />
              Gesundheit, persönlicher Vorlieben, Interessen, Zuverlässigkeit,
              Verhalten,
              <br />
              Aufenthaltsort oder Ortswechsel dieser natürlichen Person zu
              analysieren oder
              <br />
              vorherzusagen.
              <br />• f) Pseudonymisierung
              <br />
              Pseudonymisierung ist die Verarbeitung personenbezogener Daten in
              einer Weise, auf
              <br />
              welche die personenbezogenen Daten ohne Hinzuziehung zusätzlicher
              Informationen
              <br />
              nicht mehr einer spezifischen betroffenen Person zugeordnet werden
              können, sofern
              <br />
              diese zusätzlichen Informationen gesondert aufbewahrt werden und
              technischen und
              <br />
              organisatorischen Maßnahmen unterliegen, die gewährleisten, dass
              die
              <br />
              personenbezogenen Daten nicht einer identifizierten oder
              identifizierbaren natürlichen
              <br />
              Person zugewiesen werden.
              <br />• g) Verantwortlicher oder für die Verarbeitung
              Verantwortlicher
              <br />
              Verantwortlicher oder für die Verarbeitung Verantwortlicher ist
              die natürliche oder
              <br />
              juristische Person, Behörde, Einrichtung oder andere Stelle, die
              allein oder gemeinsam
              <br />
              mit anderen über die Zwecke und Mittel der Verarbeitung von
              personenbezogenen
              <br />
              Daten entscheidet. Sind die Zwecke und Mittel dieser Verarbeitung
              durch das
              <br />
              Unionsrecht oder das Recht der Mitgliedstaaten vorgegeben, so kann
              der
              <br />
              Verantwortliche beziehungsweise können die bestimmten Kriterien
              seiner Benennung
              <br />
              nach dem Unionsrecht oder dem Recht der Mitgliedstaaten vorgesehen
              werden.
              <br />• h) Auftragsverarbeiter
              <br />
              Auftragsverarbeiter ist eine natürliche oder juristische Person,
              Behörde, Einrichtung
              <br />
              oder andere Stelle, die personenbezogene Daten im Auftrag des
              Verantwortlichen
              <br />
              verarbeitet.
              <br />• i) Empfänger
              <br />
              Empfänger ist eine natürliche oder juristische Person, Behörde,
              Einrichtung oder
              <br />
              andere Stelle, der personenbezogene Daten offengelegt werden,
              unabhängig davon, ob
              <br />
              es sich bei ihr um einen Dritten handelt oder nicht. Behörden, die
              im Rahmen eines
              <br />
              bestimmten Untersuchungsauftrags nach dem Unionsrecht oder dem
              Recht der
              <br />
              Mitgliedstaaten möglicherweise personenbezogene Daten erhalten,
              gelten jedoch nicht
              <br />
              als Empfänger.
              <br />• j) Dritter
              <br />
              Dritter ist eine natürliche oder juristische Person, Behörde,
              Einrichtung oder andere
              <br />
              Stelle außer der betroffenen Person, dem Verantwortlichen, dem
              Auftragsverarbeiter
              <br />
              und den Personen, die unter der unmittelbaren Verantwortung des
              Verantwortlichen
              <br />
              oder des Auftragsverarbeiters befugt sind, die personenbezogenen
              Daten zu
              <br />
              verarbeiten.
              <br />• k) Einwilligung
              <br />
              Einwilligung ist jede von der betroffenen Person freiwillig für
              den bestimmten Fall in
              <br />
              informierter Weise und unmissverständlich abgegebene
              Willensbekundung in Form
              <br />
              einer Erklärung oder einer sonstigen eindeutigen bestätigenden
              Handlung, mit der die
              <br />
              betroffene Person zu verstehen gibt, dass sie mit der Verarbeitung
              der sie betreffenden
              <br />
              personenbezogenen Daten einverstanden ist.
              <br />
              2. Name und Anschrift des für die Verarbeitung Verantwortlichen
              <br />
              Verantwortlicher im Sinne der Datenschutz-Grundverordnung,
              sonstiger in den
              <br />
              Mitgliedstaaten der Europäischen Union geltenden
              Datenschutzgesetze und anderer
              <br />
              Bestimmungen mit datenschutzrechtlichem Charakter ist die:
              <br />
              Tennisverein Holzminden von 1928 e.V..
              <br />
              Liebigstraße 111
              <br />
              37603 Holzminden
              <br />
              Deutschland
              <br />
              Tel.: 01707662112
              <br />
              E-Mail: sport@tc1928.de
              <br />
              Website: www.tc1928.de
              <br />
              3. Erfassung von allgemeinen Daten und Informationen
              <br />
              Die Internetseite der Tennisverein Holzminden von 1928 e.V..
              erfasst mit jedem Aufruf der
              <br />
              Internetseite durch eine betroffene Person oder ein
              automatisiertes System eine Reihe von
              <br />
              allgemeinen Daten und Informationen. Diese allgemeinen Daten und
              Informationen werden in
              <br />
              den Logfiles des Servers gespeichert. Erfasst werden können die
              (1) verwendeten
              <br />
              Browsertypen und Versionen, (2) das vom zugreifenden System
              verwendete Betriebssystem,
              <br />
              (3) die Internetseite, von welcher ein zugreifendes System auf
              unsere Internetseite gelangt
              <br />
              (sogenannte Referrer), (4) die Unterwebseiten, welche über ein
              zugreifendes System auf
              <br />
              unserer Internetseite angesteuert werden, (5) das Datum und die
              Uhrzeit eines Zugriffs auf die
              <br />
              Internetseite, (6) eine Internet-Protokoll-Adresse (IP-Adresse),
              (7) der Internet-Service-
              <br />
              Provider des zugreifenden Systems und (8) sonstige ähnliche Daten
              und Informationen, die
              <br />
              der Gefahrenabwehr im Falle von Angriffen auf unsere
              informationstechnologischen Systeme
              <br />
              dienen.
              <br />
              Bei der Nutzung dieser allgemeinen Daten und Informationen zieht
              die Tennisverein
              <br />
              Holzminden von 1928 e.V.. keine Rückschlüsse auf die betroffene
              Person. Diese
              <br />
              Informationen werden vielmehr benötigt, um (1) die Inhalte unserer
              Internetseite korrekt
              <br />
              auszuliefern, (2) die Inhalte unserer Internetseite sowie die
              Werbung für diese zu optimieren,
              <br />
              (3) die dauerhafte Funktionsfähigkeit unserer
              informationstechnologischen Systeme und der
              <br />
              Technik unserer Internetseite zu gewährleisten sowie (4) um
              Strafverfolgungsbehörden im
              <br />
              Falle eines Cyberangriffes die zur Strafverfolgung notwendigen
              Informationen
              <br />
              bereitzustellen. Diese anonym erhobenen Daten und Informationen
              werden durch die
              <br />
              Tennisverein Holzminden von 1928 e.V.. daher einerseits
              statistisch und ferner mit dem Ziel
              <br />
              ausgewertet, den Datenschutz und die Datensicherheit in unserem
              Unternehmen zu erhöhen,
              <br />
              um letztlich ein optimales Schutzniveau für die von uns
              verarbeiteten personenbezogenen
              <br />
              Daten sicherzustellen. Die anonymen Daten der Server-Logfiles
              werden getrennt von allen
              <br />
              durch eine betroffene Person angegebenen personenbezogenen Daten
              gespeichert.
              <br />
              4. Kontaktmöglichkeit über die Internetseite
              <br />
              Die Internetseite der Tennisverein Holzminden von 1928 e.V..
              enthält aufgrund von
              <br />
              gesetzlichen Vorschriften Angaben, die eine schnelle elektronische
              Kontaktaufnahme zu
              <br />
              unserem Unternehmen sowie eine unmittelbare Kommunikation mit uns
              ermöglichen, was
              <br />
              ebenfalls eine allgemeine Adresse der sogenannten elektronischen
              Post (E-Mail-Adresse)
              <br />
              umfasst. Sofern eine betroffene Person per E-Mail oder über ein
              Kontaktformular den Kontakt
              <br />
              mit dem für die Verarbeitung Verantwortlichen aufnimmt, werden die
              von der betroffenen
              <br />
              Person übermittelten personenbezogenen Daten automatisch
              gespeichert. Solche auf
              <br />
              freiwilliger Basis von einer betroffenen Person an den für die
              Verarbeitung Verantwortlichen
              <br />
              übermittelten personenbezogenen Daten werden für Zwecke der
              Bearbeitung oder der
              <br />
              Kontaktaufnahme zur betroffenen Person gespeichert. Es erfolgt
              keine Weitergabe dieser
              <br />
              personenbezogenen Daten an Dritte.
              <br />
              5. Kommentarfunktion im Blog auf der Internetseite
              <br />
              Die Tennisverein Holzminden von 1928 e.V.. bietet den Nutzern auf
              einem Blog, der sich auf
              <br />
              der Internetseite des für die Verarbeitung Verantwortlichen
              befindet, die Möglichkeit,
              <br />
              individuelle Kommentare zu einzelnen Blog-Beiträgen zu
              hinterlassen. Ein Blog ist ein auf
              <br />
              einer Internetseite geführtes, in der Regel öffentlich einsehbares
              Portal, in welchem eine oder
              <br />
              mehrere Personen, die Blogger oder Web-Blogger genannt werden,
              Artikel posten oder
              <br />
              Gedanken in sogenannten Blogposts niederschreiben können. Die
              Blogposts können in der
              <br />
              Regel von Dritten kommentiert werden.
              <br />
              Hinterlässt eine betroffene Person einen Kommentar in dem auf
              dieser Internetseite
              <br />
              veröffentlichten Blog, werden neben den von der betroffenen Person
              hinterlassenen
              <br />
              Kommentaren auch Angaben zum Zeitpunkt der Kommentareingabe sowie
              zu dem von der
              <br />
              betroffenen Person gewählten Nutzernamen (Pseudonym) gespeichert
              und veröffentlicht.
              <br />
              Ferner wird die vom Internet-Service-Provider (ISP) der
              betroffenen Person vergebene IPAdresse
              <br />
              mitprotokolliert. Diese Speicherung der IP-Adresse erfolgt aus
              Sicherheitsgründen
              <br />
              und für den Fall, dass die betroffene Person durch einen
              abgegebenen Kommentar die Rechte
              <br />
              Dritter verletzt oder rechtswidrige Inhalte postet. Die
              Speicherung dieser personenbezogenen
              <br />
              Daten erfolgt daher im eigenen Interesse des für die Verarbeitung
              Verantwortlichen, damit
              <br />
              sich dieser im Falle einer Rechtsverletzung gegebenenfalls
              exkulpieren könnte. Es erfolgt
              <br />
              keine Weitergabe dieser erhobenen personenbezogenen Daten an
              Dritte, sofern eine solche
              <br />
              Weitergabe nicht gesetzlich vorgeschrieben ist oder der
              Rechtsverteidigung des für die
              <br />
              Verarbeitung Verantwortlichen dient.
              <br />
              6. Routinemäßige Löschung und Sperrung von personenbezogenen Daten
              <br />
              Der für die Verarbeitung Verantwortliche verarbeitet und speichert
              personenbezogene Daten
              <br />
              der betroffenen Person nur für den Zeitraum, der zur Erreichung
              des Speicherungszwecks
              <br />
              erforderlich ist oder sofern dies durch den Europäischen
              Richtlinien- und Verordnungsgeber
              <br />
              oder einen anderen Gesetzgeber in Gesetzen oder Vorschriften,
              welchen der für die
              <br />
              Verarbeitung Verantwortliche unterliegt, vorgesehen wurde.
              <br />
              Entfällt der Speicherungszweck oder läuft eine vom Europäischen
              Richtlinien- und
              <br />
              Verordnungsgeber oder einem anderen zuständigen Gesetzgeber
              vorgeschriebene
              <br />
              Speicherfrist ab, werden die personenbezogenen Daten routinemäßig
              und entsprechend den
              <br />
              gesetzlichen Vorschriften gesperrt oder gelöscht.
              <br />
              7. Rechte der betroffenen Person
              <br />• a) Recht auf Bestätigung
              <br />
              Jede betroffene Person hat das vom Europäischen Richtlinien- und
              Verordnungsgeber
              <br />
              eingeräumte Recht, von dem für die Verarbeitung Verantwortlichen
              eine Bestätigung
              <br />
              darüber zu verlangen, ob sie betreffende personenbezogene Daten
              verarbeitet werden.
              <br />
              Möchte eine betroffene Person dieses Bestätigungsrecht in Anspruch
              nehmen, kann sie
              <br />
              sich hierzu jederzeit an einen Mitarbeiter des für die
              Verarbeitung Verantwortlichen
              <br />
              wenden.
              <br />• b) Recht auf Auskunft
              <br />
              Jede von der Verarbeitung personenbezogener Daten betroffene
              Person hat das vom
              <br />
              Europäischen Richtlinien- und Verordnungsgeber gewährte Recht,
              jederzeit von dem
              <br />
              für die Verarbeitung Verantwortlichen unentgeltliche Auskunft über
              die zu seiner
              <br />
              Person gespeicherten personenbezogenen Daten und eine Kopie dieser
              Auskunft zu
              <br />
              erhalten. Ferner hat der Europäische Richtlinien- und
              Verordnungsgeber der
              <br />
              betroffenen Person Auskunft über folgende Informationen
              zugestanden:
              <br />o die Verarbeitungszwecke
              <br />o die Kategorien personenbezogener Daten, die verarbeitet
              werden
              <br />o die Empfänger oder Kategorien von Empfängern, gegenüber
              denen die
              <br />
              personenbezogenen Daten offengelegt worden sind oder noch
              offengelegt
              <br />
              werden, insbesondere bei Empfängern in Drittländern oder bei
              internationalen
              <br />
              Organisationen
              <br />o falls möglich die geplante Dauer, für die die
              personenbezogenen Daten
              <br />
              gespeichert werden, oder, falls dies nicht möglich ist, die
              Kriterien für die
              <br />
              Festlegung dieser Dauer
              <br />o das Bestehen eines Rechts auf Berichtigung oder Löschung
              der sie
              <br />
              betreffenden personenbezogenen Daten oder auf Einschränkung der
              <br />
              Verarbeitung durch den Verantwortlichen oder eines
              Widerspruchsrechts
              <br />
              gegen diese Verarbeitung
              <br />o das Bestehen eines Beschwerderechts bei einer
              Aufsichtsbehörde
              <br />o wenn die personenbezogenen Daten nicht bei der betroffenen
              Person erhoben
              <br />
              werden: Alle verfügbaren Informationen über die Herkunft der Daten
              <br />o das Bestehen einer automatisierten Entscheidungsfindung
              einschließlich
              <br />
              Profiling gemäß Artikel 22 Abs.1 und 4 DS-GVO und — zumindest in
              diesen
              <br />
              Fällen — aussagekräftige Informationen über die involvierte Logik
              sowie die
              <br />
              Tragweite und die angestrebten Auswirkungen einer derartigen
              Verarbeitung
              <br />
              für die betroffene Person
              <br />
              Ferner steht der betroffenen Person ein Auskunftsrecht darüber zu,
              ob
              <br />
              personenbezogene Daten an ein Drittland oder an eine
              internationale Organisation
              <br />
              übermittelt wurden. Sofern dies der Fall ist, so steht der
              betroffenen Person im
              <br />
              Übrigen das Recht zu, Auskunft über die geeigneten Garantien im
              Zusammenhang mit
              <br />
              der Übermittlung zu erhalten.
              <br />
              Möchte eine betroffene Person dieses Auskunftsrecht in Anspruch
              nehmen, kann sie
              <br />
              sich hierzu jederzeit an einen Mitarbeiter des für die
              Verarbeitung Verantwortlichen
              <br />
              wenden.
              <br />• c) Recht auf Berichtigung
              <br />
              Jede von der Verarbeitung personenbezogener Daten betroffene
              Person hat das vom
              <br />
              Europäischen Richtlinien- und Verordnungsgeber gewährte Recht, die
              unverzügliche
              <br />
              Berichtigung sie betreffender unrichtiger personenbezogener Daten
              zu verlangen.
              <br />
              Ferner steht der betroffenen Person das Recht zu, unter
              Berücksichtigung der Zwecke
              <br />
              der Verarbeitung, die Vervollständigung unvollständiger
              personenbezogener Daten —<br />
              auch mittels einer ergänzenden Erklärung — zu verlangen.
              <br />
              Möchte eine betroffene Person dieses Berichtigungsrecht in
              Anspruch nehmen, kann
              <br />
              sie sich hierzu jederzeit an einen Mitarbeiter des für die
              Verarbeitung
              <br />
              Verantwortlichen wenden.
              <br />• d) Recht auf Löschung (Recht auf Vergessen werden)
              <br />
              Jede von der Verarbeitung personenbezogener Daten betroffene
              Person hat das vom
              <br />
              Europäischen Richtlinien- und Verordnungsgeber gewährte Recht, von
              dem
              <br />
              Verantwortlichen zu verlangen, dass die sie betreffenden
              personenbezogenen Daten
              <br />
              unverzüglich gelöscht werden, sofern einer der folgenden Gründe
              zutrifft und soweit
              <br />
              die Verarbeitung nicht erforderlich ist:
              <br />o Die personenbezogenen Daten wurden für solche Zwecke
              erhoben oder auf
              <br />
              sonstige Weise verarbeitet, für welche sie nicht mehr notwendig
              sind.
              <br />o Die betroffene Person widerruft ihre Einwilligung, auf die
              sich die
              <br />
              Verarbeitung gemäß Art. 6 Abs. 1 Buchstabe a DS-GVO oder Art. 9
              Abs. 2<br />
              Buchstabe a DS-GVO stützte, und es fehlt an einer anderweitigen
              <br />
              Rechtsgrundlage für die Verarbeitung.
              <br />o Die betroffene Person legt gemäß Art. 21 Abs. 1 DS-GVO
              Widerspruch gegen
              <br />
              die Verarbeitung ein, und es liegen keine vorrangigen berechtigten
              Gründe für
              <br />
              die Verarbeitung vor, oder die betroffene Person legt gemäß Art.
              21 Abs. 2<br />
              DS-GVO Widerspruch gegen die Verarbeitung ein.
              <br />o Die personenbezogenen Daten wurden unrechtmäßig
              verarbeitet.
              <br />o Die Löschung der personenbezogenen Daten ist zur Erfüllung
              einer rechtlichen
              <br />
              Verpflichtung nach dem Unionsrecht oder dem Recht der
              Mitgliedstaaten
              <br />
              erforderlich, dem der Verantwortliche unterliegt.
              <br />o Die personenbezogenen Daten wurden in Bezug auf angebotene
              Dienste der
              <br />
              Informationsgesellschaft gemäß Art. 8 Abs. 1 DS-GVO erhoben.
              <br />
              Sofern einer der oben genannten Gründe zutrifft und eine
              betroffene Person die
              <br />
              Löschung von personenbezogenen Daten, die bei der Tennisverein
              Holzminden von
              <br />
              1928 e.V.. gespeichert sind, veranlassen möchte, kann sie sich
              hierzu jederzeit an
              <br />
              einen Mitarbeiter des für die Verarbeitung Verantwortlichen
              wenden. Der Mitarbeiter
              <br />
              der Tennisverein Holzminden von 1928 e.V.. wird veranlassen, dass
              dem
              <br />
              Löschverlangen unverzüglich nachgekommen wird.
              <br />
              Wurden die personenbezogenen Daten von der Tennisverein Holzminden
              von 1928
              <br />
              e.V.. öffentlich gemacht und ist unser Unternehmen als
              Verantwortlicher gemäß Art.
              <br />
              17 Abs. 1 DS-GVO zur Löschung der personenbezogenen Daten
              verpflichtet, so trifft
              <br />
              die Tennisverein Holzminden von 1928 e.V.. unter Berücksichtigung
              der verfügbaren
              <br />
              Technologie und der Implementierungskosten angemessene Maßnahmen,
              auch
              <br />
              technischer Art, um andere für die Datenverarbeitung
              Verantwortliche, welche die
              <br />
              veröffentlichten personenbezogenen Daten verarbeiten, darüber in
              Kenntnis zu setzen,
              <br />
              dass die betroffene Person von diesen anderen für die
              Datenverarbeitung
              <br />
              Verantwortlichen die Löschung sämtlicher Links zu diesen
              personenbezogenen Daten
              <br />
              oder von Kopien oder Replikationen dieser personenbezogenen Daten
              verlangt hat,
              <br />
              soweit die Verarbeitung nicht erforderlich ist. Der Mitarbeiter
              der Tennisverein
              <br />
              Holzminden von 1928 e.V.. wird im Einzelfall das Notwendige
              veranlassen.
              <br />• e) Recht auf Einschränkung der Verarbeitung
              <br />
              Jede von der Verarbeitung personenbezogener Daten betroffene
              Person hat das vom
              <br />
              Europäischen Richtlinien- und Verordnungsgeber gewährte Recht, von
              dem
              <br />
              Verantwortlichen die Einschränkung der Verarbeitung zu verlangen,
              wenn eine der
              <br />
              folgenden Voraussetzungen gegeben ist:
              <br />o Die Richtigkeit der personenbezogenen Daten wird von der
              betroffenen Person
              <br />
              bestritten, und zwar für eine Dauer, die es dem Verantwortlichen
              ermöglicht,
              <br />
              die Richtigkeit der personenbezogenen Daten zu überprüfen.
              <br />o Die Verarbeitung ist unrechtmäßig, die betroffene Person
              lehnt die Löschung
              <br />
              der personenbezogenen Daten ab und verlangt stattdessen die
              Einschränkung
              <br />
              der Nutzung der personenbezogenen Daten.
              <br />o Der Verantwortliche benötigt die personenbezogenen Daten
              für die Zwecke
              <br />
              der Verarbeitung nicht länger, die betroffene Person benötigt sie
              jedoch zur
              <br />
              Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.
              <br />o Die betroffene Person hat Widerspruch gegen die
              Verarbeitung gem. Art. 21
              <br />
              Abs. 1 DS-GVO eingelegt und es steht noch nicht fest, ob die
              berechtigten
              <br />
              Gründe des Verantwortlichen gegenüber denen der betroffenen Person
              <br />
              überwiegen.
              <br />
              Sofern eine der oben genannten Voraussetzungen gegeben ist und
              eine betroffene
              <br />
              Person die Einschränkung von personenbezogenen Daten, die bei der
              Tennisverein
              <br />
              Holzminden von 1928 e.V.. gespeichert sind, verlangen möchte, kann
              sie sich hierzu
              <br />
              jederzeit an einen Mitarbeiter des für die Verarbeitung
              Verantwortlichen wenden. Der
              <br />
              Mitarbeiter der Tennisverein Holzminden von 1928 e.V.. wird die
              Einschränkung der
              <br />
              Verarbeitung veranlassen.
              <br />• f) Recht auf Datenübertragbarkeit
              <br />
              Jede von der Verarbeitung personenbezogener Daten betroffene
              Person hat das vom
              <br />
              Europäischen Richtlinien- und Verordnungsgeber gewährte Recht, die
              sie betreffenden
              <br />
              personenbezogenen Daten, welche durch die betroffene Person einem
              <br />
              Verantwortlichen bereitgestellt wurden, in einem strukturierten,
              gängigen und
              <br />
              maschinenlesbaren Format zu erhalten. Sie hat außerdem das Recht,
              diese Daten
              <br />
              einem anderen Verantwortlichen ohne Behinderung durch den
              Verantwortlichen, dem
              <br />
              die personenbezogenen Daten bereitgestellt wurden, zu übermitteln,
              sofern die
              <br />
              Verarbeitung auf der Einwilligung gemäß Art. 6 Abs. 1 Buchstabe a
              DS-GVO oder
              <br />
              Art. 9 Abs. 2 Buchstabe a DS-GVO oder auf einem Vertrag gemäß Art.
              6 Abs. 1<br />
              Buchstabe b DS-GVO beruht und die Verarbeitung mithilfe
              automatisierter Verfahren
              <br />
              erfolgt, sofern die Verarbeitung nicht für die Wahrnehmung einer
              Aufgabe
              <br />
              erforderlich ist, die im öffentlichen Interesse liegt oder in
              Ausübung öffentlicher
              <br />
              Gewalt erfolgt, welche dem Verantwortlichen übertragen wurde.
              <br />
              Ferner hat die betroffene Person bei der Ausübung ihres Rechts auf
              <br />
              Datenübertragbarkeit gemäß Art. 20 Abs. 1 DS-GVO das Recht, zu
              erwirken, dass die
              <br />
              personenbezogenen Daten direkt von einem Verantwortlichen an einen
              anderen
              <br />
              Verantwortlichen übermittelt werden, soweit dies technisch machbar
              ist und sofern
              <br />
              hiervon nicht die Rechte und Freiheiten anderer Personen
              beeinträchtigt werden.
              <br />
              Zur Geltendmachung des Rechts auf Datenübertragbarkeit kann sich
              die betroffene
              <br />
              Person jederzeit an einen Mitarbeiter der Tennisverein Holzminden
              von 1928 e.V..
              <br />
              wenden.
              <br />• g) Recht auf Widerspruch
              <br />
              Jede von der Verarbeitung personenbezogener Daten betroffene
              Person hat das vom
              <br />
              Europäischen Richtlinien- und Verordnungsgeber gewährte Recht, aus
              Gründen, die
              <br />
              sich aus ihrer besonderen Situation ergeben, jederzeit gegen die
              Verarbeitung sie
              <br />
              betreffender personenbezogener Daten, die aufgrund von Art. 6 Abs.
              1 Buchstaben e<br />
              oder f DS-GVO erfolgt, Widerspruch einzulegen. Dies gilt auch für
              ein auf diese
              <br />
              Bestimmungen gestütztes Profiling.
              <br />
              Die Tennisverein Holzminden von 1928 e.V.. verarbeitet die
              personenbezogenen
              <br />
              Daten im Falle des Widerspruchs nicht mehr, es sei denn, wir
              können zwingende
              <br />
              schutzwürdige Gründe für die Verarbeitung nachweisen, die den
              Interessen, Rechten
              <br />
              und Freiheiten der betroffenen Person überwiegen, oder die
              Verarbeitung dient der
              <br />
              Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.
              <br />
              Verarbeitet die Tennisverein Holzminden von 1928 e.V..
              personenbezogene Daten,
              <br />
              um Direktwerbung zu betreiben, so hat die betroffene Person das
              Recht, jederzeit
              <br />
              Widerspruch gegen die Verarbeitung der personenbezogenen Daten zum
              Zwecke
              <br />
              derartiger Werbung einzulegen. Dies gilt auch für das Profiling,
              soweit es mit solcher
              <br />
              Direktwerbung in Verbindung steht. Widerspricht die betroffene
              Person gegenüber der
              <br />
              Tennisverein Holzminden von 1928 e.V.. der Verarbeitung für Zwecke
              der
              <br />
              Direktwerbung, so wird die Tennisverein Holzminden von 1928 e.V..
              die
              <br />
              personenbezogenen Daten nicht mehr für diese Zwecke verarbeiten.
              <br />
              Zudem hat die betroffene Person das Recht, aus Gründen, die sich
              aus ihrer
              <br />
              besonderen Situation ergeben, gegen die sie betreffende
              Verarbeitung
              <br />
              personenbezogener Daten, die bei der Tennisverein Holzminden von
              1928 e.V.. zu
              <br />
              wissenschaftlichen oder historischen Forschungszwecken oder zu
              statistischen
              <br />
              Zwecken gemäß Art. 89 Abs. 1 DS-GVO erfolgen, Widerspruch
              einzulegen, es sei
              <br />
              denn, eine solche Verarbeitung ist zur Erfüllung einer im
              öffentlichen Interesse
              <br />
              liegenden Aufgabe erforderlich.
              <br />
              Zur Ausübung des Rechts auf Widerspruch kann sich die betroffene
              Person direkt
              <br />
              jeden Mitarbeiter der Tennisverein Holzminden von 1928 e.V.. oder
              einen anderen
              <br />
              Mitarbeiter wenden. Der betroffenen Person steht es ferner frei,
              im Zusammenhang
              <br />
              mit der Nutzung von Diensten der Informationsgesellschaft,
              ungeachtet der Richtlinie
              <br />
              2002/58/EG, ihr Widerspruchsrecht mittels automatisierter
              Verfahren auszuüben, bei
              <br />
              denen technische Spezifikationen verwendet werden.
              <br />• h) Automatisierte Entscheidungen im Einzelfall
              einschließlich Profiling
              <br />
              Jede von der Verarbeitung personenbezogener Daten betroffene
              Person hat das vom
              <br />
              Europäischen Richtlinien- und Verordnungsgeber gewährte Recht,
              nicht einer
              <br />
              ausschließlich auf einer automatisierten Verarbeitung —
              einschließlich Profiling —<br />
              beruhenden Entscheidung unterworfen zu werden, die ihr gegenüber
              rechtliche
              <br />
              Wirkung entfaltet oder sie in ähnlicher Weise erheblich
              beeinträchtigt, sofern die
              <br />
              Entscheidung (1) nicht für den Abschluss oder die Erfüllung eines
              Vertrags zwischen
              <br />
              der betroffenen Person und dem Verantwortlichen erforderlich ist,
              oder (2) aufgrund
              <br />
              von Rechtsvorschriften der Union oder der Mitgliedstaaten, denen
              der Verantwortliche
              <br />
              unterliegt, zulässig ist und diese Rechtsvorschriften angemessene
              Maßnahmen zur
              <br />
              Wahrung der Rechte und Freiheiten sowie der berechtigten
              Interessen der betroffenen
              <br />
              Person enthalten oder (3) mit ausdrücklicher Einwilligung der
              betroffenen Person
              <br />
              erfolgt.
              <br />
              Ist die Entscheidung (1) für den Abschluss oder die Erfüllung
              eines Vertrags zwischen
              <br />
              der betroffenen Person und dem Verantwortlichen erforderlich oder
              (2) erfolgt sie mit
              <br />
              ausdrücklicher Einwilligung der betroffenen Person, trifft die
              Tennisverein
              <br />
              Holzminden von 1928 e.V.. angemessene Maßnahmen, um die Rechte und
              Freiheiten
              <br />
              sowie die berechtigten Interessen der betroffenen Person zu
              wahren, wozu mindestens
              <br />
              das Recht auf Erwirkung des Eingreifens einer Person seitens des
              Verantwortlichen,
              <br />
              auf Darlegung des eigenen Standpunkts und auf Anfechtung der
              Entscheidung gehört.
              <br />
              Möchte die betroffene Person Rechte mit Bezug auf automatisierte
              Entscheidungen
              <br />
              geltend machen, kann sie sich hierzu jederzeit an einen
              Mitarbeiter des für die
              <br />
              Verarbeitung Verantwortlichen wenden.
              <br />• i) Recht auf Widerruf einer datenschutzrechtlichen
              Einwilligung
              <br />
              Jede von der Verarbeitung personenbezogener Daten betroffene
              Person hat das vom
              <br />
              Europäischen Richtlinien- und Verordnungsgeber gewährte Recht,
              eine Einwilligung
              <br />
              zur Verarbeitung personenbezogener Daten jederzeit zu widerrufen.
              <br />
              Möchte die betroffene Person ihr Recht auf Widerruf einer
              Einwilligung geltend
              <br />
              machen, kann sie sich hierzu jederzeit an einen Mitarbeiter des
              für die Verarbeitung
              <br />
              Verantwortlichen wenden.
              <br />
              8. Datenschutzbestimmungen zu Einsatz und Verwendung von Facebook
              <br />
              Der für die Verarbeitung Verantwortliche hat auf dieser
              Internetseite Komponenten des
              <br />
              Unternehmens Facebook integriert. Facebook ist ein soziales
              Netzwerk.
              <br />
              Ein soziales Netzwerk ist ein im Internet betriebener sozialer
              Treffpunkt, eine Online-
              <br />
              Gemeinschaft, die es den Nutzern in der Regel ermöglicht,
              untereinander zu kommunizieren
              <br />
              und im virtuellen Raum zu interagieren. Ein soziales Netzwerk kann
              als Plattform zum
              <br />
              Austausch von Meinungen und Erfahrungen dienen oder ermöglicht es
              der
              <br />
              Internetgemeinschaft, persönliche oder unternehmensbezogene
              Informationen bereitzustellen.
              <br />
              Facebook ermöglicht den Nutzern des sozialen Netzwerkes unter
              anderem die Erstellung von
              <br />
              privaten Profilen, den Upload von Fotos und eine Vernetzung über
              Freundschaftsanfragen.
              <br />
              Betreibergesellschaft von Facebook ist die Facebook, Inc., 1
              Hacker Way, Menlo Park, CA
              <br />
              94025, USA. Für die Verarbeitung personenbezogener Daten
              Verantwortlicher ist, wenn eine
              <br />
              betroffene Person außerhalb der USA oder Kanada lebt, die Facebook
              Ireland Ltd., 4 Grand
              <br />
              Canal Square, Grand Canal Harbour, Dublin 2, Ireland.
              <br />
              Durch jeden Aufruf einer der Einzelseiten dieser Internetseite,
              die durch den für die
              <br />
              Verarbeitung Verantwortlichen betrieben wird und auf welcher eine
              Facebook-Komponente
              <br />
              (Facebook-Plug-In) integriert wurde, wird der Internetbrowser auf
              dem
              <br />
              informationstechnologischen System der betroffenen Person
              automatisch durch die jeweilige
              <br />
              Facebook-Komponente veranlasst, eine Darstellung der
              entsprechenden Facebook-
              <br />
              Komponente von Facebook herunterzuladen. Eine Gesamtübersicht über
              alle Facebook-Plug-
              <br />
              Ins kann unter
              https://developers.facebook.com/docs/plugins/?locale=de_DE
              abgerufen
              <br />
              werden. Im Rahmen dieses technischen Verfahrens erhält Facebook
              Kenntnis darüber, welche
              <br />
              konkrete Unterseite unserer Internetseite durch die betroffene
              Person besucht wird.
              <br />
              Sofern die betroffene Person gleichzeitig bei Facebook eingeloggt
              ist, erkennt Facebook mit
              <br />
              jedem Aufruf unserer Internetseite durch die betroffene Person und
              während der gesamten
              <br />
              Dauer des jeweiligen Aufenthaltes auf unserer Internetseite,
              welche konkrete Unterseite
              <br />
              unserer Internetseite die betroffene Person besucht. Diese
              Informationen werden durch die
              <br />
              Facebook-Komponente gesammelt und durch Facebook dem jeweiligen
              Facebook-Account
              <br />
              der betroffenen Person zugeordnet. Betätigt die betroffene Person
              einen der auf unserer
              <br />
              Internetseite integrierten Facebook-Buttons, beispielsweise den
              „Gefällt mir“-Button, oder
              <br />
              gibt die betroffene Person einen Kommentar ab, ordnet Facebook
              diese Information dem
              <br />
              persönlichen Facebook-Benutzerkonto der betroffenen Person zu und
              speichert diese
              <br />
              personenbezogenen Daten.
              <br />
              Facebook erhält über die Facebook-Komponente immer dann eine
              Information darüber, dass
              <br />
              die betroffene Person unsere Internetseite besucht hat, wenn die
              betroffene Person zum
              <br />
              Zeitpunkt des Aufrufs unserer Internetseite gleichzeitig bei
              Facebook eingeloggt ist; dies
              <br />
              findet unabhängig davon statt, ob die betroffene Person die
              Facebook-Komponente anklickt
              <br />
              oder nicht. Ist eine derartige Übermittlung dieser Informationen
              an Facebook von der
              <br />
              betroffenen Person nicht gewollt, kann diese die Übermittlung
              dadurch verhindern, dass sie
              <br />
              sich vor einem Aufruf unserer Internetseite aus ihrem
              Facebook-Account ausloggt.
              <br />
              Die von Facebook veröffentlichte Datenrichtlinie, die unter
              https://dede.
              <br />
              facebook.com/about/privacy/ abrufbar ist, gibt Aufschluss über die
              Erhebung,
              <br />
              Verarbeitung und Nutzung personenbezogener Daten durch Facebook.
              Ferner wird dort
              <br />
              erläutert, welche Einstellungsmöglichkeiten Facebook zum Schutz
              der Privatsphäre der
              <br />
              betroffenen Person bietet. Zudem sind unterschiedliche
              Applikationen erhältlich, die es
              <br />
              ermöglichen, eine Datenübermittlung an Facebook zu unterdrücken.
              Solche Applikationen
              <br />
              können durch die betroffene Person genutzt werden, um eine
              Datenübermittlung an Facebook
              <br />
              zu unterdrücken.
              <br />
              9. Datenschutzbestimmungen zu Einsatz und Verwendung von Google
              AdSense
              <br />
              Der für die Verarbeitung Verantwortliche hat auf dieser
              Internetseite Google AdSense
              <br />
              integriert. Google AdSense ist ein Online-Dienst, über welchen
              eine Vermittlung von
              <br />
              Werbung auf Drittseiten ermöglicht wird. Google AdSense beruht auf
              einem Algorithmus,
              <br />
              welcher die auf Drittseiten angezeigten Werbeanzeigen passend zu
              den Inhalten der
              <br />
              jeweiligen Drittseite auswählt. Google AdSense gestattet ein
              interessenbezogenes Targeting
              <br />
              des Internetnutzers, welches mittels Generierung von individuellen
              Benutzerprofilen
              <br />
              umgesetzt wird.
              <br />
              Betreibergesellschaft der Google-AdSense-Komponente ist die
              Alphabet Inc., 1600
              <br />
              Amphitheatre Pkwy, Mountain View, CA 94043-1351, USA.
              <br />
              Der Zweck der Google-AdSense-Komponente ist die Einbindung von
              Werbeanzeigen auf
              <br />
              unserer Internetseite. Google-AdSense setzt ein Cookie auf dem
              informationstechnologischen
              <br />
              System der betroffenen Person. Was Cookies sind, wurde oben
              bereits erläutert. Mit der
              <br />
              Setzung des Cookies wird der Alphabet Inc. eine Analyse der
              Benutzung unserer Internetseite
              <br />
              ermöglicht. Durch jeden Aufruf einer der Einzelseiten dieser
              Internetseite, die durch den für
              <br />
              die Verarbeitung Verantwortlichen betrieben wird und auf welcher
              eine Google-AdSense-
              <br />
              Komponente integriert wurde, wird der Internetbrowser auf dem
              informationstechnologischen
              <br />
              System der betroffenen Person automatisch durch die jeweilige
              Google-AdSense-
              <br />
              Komponente veranlasst, Daten zum Zwecke der Online-Werbung und der
              Abrechnung von
              <br />
              Provisionen an die Alphabet Inc. zu übermitteln. Im Rahmen dieses
              technischen Verfahrens
              <br />
              erhält die Alphabet Inc. Kenntnis über personenbezogene Daten, wie
              der IP-Adresse der
              <br />
              betroffenen Person, die der Alphabet Inc. unter anderem dazu
              dienen, die Herkunft der
              <br />
              Besucher und Klicks nachzuvollziehen und in der Folge
              Provisionsabrechnungen zu
              <br />
              ermöglichen.
              <br />
              Die betroffene Person kann die Setzung von Cookies durch unsere
              Internetseite, wie oben
              <br />
              bereits dargestellt, jederzeit mittels einer entsprechenden
              Einstellung des genutzten
              <br />
              Internetbrowsers verhindern und damit der Setzung von Cookies
              dauerhaft widersprechen.
              <br />
              Eine solche Einstellung des genutzten Internetbrowsers würde auch
              verhindern, dass die
              <br />
              Alphabet Inc. ein Cookie auf dem informationstechnologischen
              System der betroffenen
              <br />
              Person setzt. Zudem kann ein von der Alphabet Inc. bereits
              gesetzter Cookie jederzeit über
              <br />
              den Internetbrowser oder andere Softwareprogramme gelöscht werden.
              <br />
              Google AdSense verwendet zudem sogenannte Zählpixel. Ein Zählpixel
              ist eine
              <br />
              Miniaturgrafik, die in Internetseiten eingebettet wird, um eine
              Logdatei-Aufzeichnung und
              <br />
              eine Logdatei-Analyse zu ermöglichen, wodurch eine statistische
              Auswertung durchgeführt
              <br />
              werden kann. Anhand des eingebetteten Zählpixels kann die Alphabet
              Inc. erkennen, ob und
              <br />
              wann eine Internetseite von einer betroffenen Person geöffnet
              wurde und welche Links von
              <br />
              der betroffenen Person angeklickt wurden. Zählpixel dienen unter
              anderem dazu, den
              <br />
              Besucherfluss einer Internetseite auszuwerten.
              <br />
              Über Google AdSense werden personenbezogene Daten und
              Informationen, was auch die IPAdresse
              <br />
              umfasst und zur Erfassung und Abrechnung der angezeigten
              Werbeanzeigen
              <br />
              notwendig ist, an die Alphabet Inc. in die Vereinigten Staaten von
              Amerika übertragen. Diese
              <br />
              personenbezogenen Daten werden in den Vereinigten Staaten von
              Amerika gespeichert und
              <br />
              verarbeitet. Die Alphabet Inc. gibt diese über das technische
              Verfahren erhobenen
              <br />
              personenbezogenen Daten unter Umständen an Dritte weiter.
              <br />
              Google-AdSense wird unter diesem Link
              https://www.google.de/intl/de/adsense/start/ genauer
              <br />
              erläutert.
              <br />
              10. Datenschutzbestimmungen zu Einsatz und Verwendung von Google
              Analytics (mit
              <br />
              Anonymisierungsfunktion)
              <br />
              Der für die Verarbeitung Verantwortliche hat auf dieser
              Internetseite die Komponente Google
              <br />
              Analytics (mit Anonymisierungsfunktion) integriert. Google
              Analytics ist ein Web-Analyse-
              <br />
              Dienst. Web-Analyse ist die Erhebung, Sammlung und Auswertung von
              Daten über das
              <br />
              Verhalten von Besuchern von Internetseiten. Ein Web-Analyse-Dienst
              erfasst unter anderem
              <br />
              Daten darüber, von welcher Internetseite eine betroffene Person
              auf eine Internetseite
              <br />
              gekommen ist (sogenannte Referrer), auf welche Unterseiten der
              Internetseite zugegriffen
              <br />
              oder wie oft und für welche Verweildauer eine Unterseite
              betrachtet wurde. Eine Web-
              <br />
              Analyse wird überwiegend zur Optimierung einer Internetseite und
              zur Kosten-Nutzen-
              <br />
              Analyse von Internetwerbung eingesetzt.
              <br />
              Betreibergesellschaft der Google-Analytics-Komponente ist die
              Google Inc., 1600
              <br />
              Amphitheatre Pkwy, Mountain View, CA 94043-1351, USA.
              <br />
              Der für die Verarbeitung Verantwortliche verwendet für die
              Web-Analyse über Google
              <br />
              Analytics den Zusatz „_gat._anonymizeIp“. Mittels dieses Zusatzes
              wird die IP-Adresse des
              <br />
              Internetanschlusses der betroffenen Person von Google gekürzt und
              anonymisiert, wenn der
              <br />
              Zugriff auf unsere Internetseiten aus einem Mitgliedstaat der
              Europäischen Union oder aus
              <br />
              einem anderen Vertragsstaat des Abkommens über den Europäischen
              Wirtschaftsraum
              <br />
              erfolgt.
              <br />
              Der Zweck der Google-Analytics-Komponente ist die Analyse der
              Besucherströme auf
              <br />
              unserer Internetseite. Google nutzt die gewonnenen Daten und
              Informationen unter anderem
              <br />
              dazu, die Nutzung unserer Internetseite auszuwerten, um für uns
              Online-Reports, welche die
              <br />
              Aktivitäten auf unseren Internetseiten aufzeigen,
              zusammenzustellen, und um weitere mit der
              <br />
              Nutzung unserer Internetseite in Verbindung stehende
              Dienstleistungen zu erbringen.
              <br />
              Google Analytics setzt ein Cookie auf dem
              informationstechnologischen System der
              <br />
              betroffenen Person. Was Cookies sind, wurde oben bereits
              erläutert. Mit Setzung des Cookies
              <br />
              wird Google eine Analyse der Benutzung unserer Internetseite
              ermöglicht. Durch jeden
              <br />
              Aufruf einer der Einzelseiten dieser Internetseite, die durch den
              für die Verarbeitung
              <br />
              Verantwortlichen betrieben wird und auf welcher eine
              Google-Analytics-Komponente
              <br />
              integriert wurde, wird der Internetbrowser auf dem
              informationstechnologischen System der
              <br />
              betroffenen Person automatisch durch die jeweilige
              Google-Analytics-Komponente
              <br />
              veranlasst, Daten zum Zwecke der Online-Analyse an Google zu
              übermitteln. Im Rahmen
              <br />
              dieses technischen Verfahrens erhält Google Kenntnis über
              personenbezogene Daten, wie der
              <br />
              IP-Adresse der betroffenen Person, die Google unter anderem dazu
              dienen, die Herkunft der
              <br />
              Besucher und Klicks nachzuvollziehen und in der Folge
              Provisionsabrechnungen zu
              <br />
              ermöglichen.
              <br />
              Mittels des Cookies werden personenbezogene Informationen,
              beispielsweise die Zugriffszeit,
              <br />
              der Ort, von welchem ein Zugriff ausging und die Häufigkeit der
              Besuche unserer
              <br />
              Internetseite durch die betroffene Person, gespeichert. Bei jedem
              Besuch unserer
              <br />
              Internetseiten werden diese personenbezogenen Daten,
              einschließlich der IP-Adresse des von
              <br />
              der betroffenen Person genutzten Internetanschlusses, an Google in
              den Vereinigten Staaten
              <br />
              von Amerika übertragen. Diese personenbezogenen Daten werden durch
              Google in den
              <br />
              Vereinigten Staaten von Amerika gespeichert. Google gibt diese
              über das technische
              <br />
              Verfahren erhobenen personenbezogenen Daten unter Umständen an
              Dritte weiter.
              <br />
              Die betroffene Person kann die Setzung von Cookies durch unsere
              Internetseite, wie oben
              <br />
              bereits dargestellt, jederzeit mittels einer entsprechenden
              Einstellung des genutzten
              <br />
              Internetbrowsers verhindern und damit der Setzung von Cookies
              dauerhaft widersprechen.
              <br />
              Eine solche Einstellung des genutzten Internetbrowsers würde auch
              verhindern, dass Google
              <br />
              ein Cookie auf dem informationstechnologischen System der
              betroffenen Person setzt. Zudem
              <br />
              kann ein von Google Analytics bereits gesetzter Cookie jederzeit
              über den Internetbrowser
              <br />
              oder andere Softwareprogramme gelöscht werden.
              <br />
              Ferner besteht für die betroffene Person die Möglichkeit, einer
              Erfassung der durch Google
              <br />
              Analytics erzeugten, auf eine Nutzung dieser Internetseite
              bezogenen Daten sowie der
              <br />
              Verarbeitung dieser Daten durch Google zu widersprechen und eine
              solche zu verhindern.
              <br />
              Hierzu muss die betroffene Person ein Browser-Add-On unter dem
              Link
              <br />
              https://tools.google.com/dlpage/gaoptout herunterladen und
              installieren. Dieses Browser-Add-
              <br />
              On teilt Google Analytics über JavaScript mit, dass keine Daten
              und Informationen zu den
              <br />
              Besuchen von Internetseiten an Google Analytics übermittelt werden
              dürfen. Die Installation
              <br />
              des Browser-Add-Ons wird von Google als Widerspruch gewertet. Wird
              das
              <br />
              informationstechnologische System der betroffenen Person zu einem
              späteren Zeitpunkt
              <br />
              gelöscht, formatiert oder neu installiert, muss durch die
              betroffene Person eine erneute
              <br />
              Installation des Browser-Add-Ons erfolgen, um Google Analytics zu
              deaktivieren. Sofern das
              <br />
              Browser-Add-On durch die betroffene Person oder einer anderen
              Person, die ihrem
              <br />
              Machtbereich zuzurechnen ist, deinstalliert oder deaktiviert wird,
              besteht die Möglichkeit der
              <br />
              Neuinstallation oder der erneuten Aktivierung des Browser-Add-Ons.
              <br />
              Weitere Informationen und die geltenden Datenschutzbestimmungen
              von Google können
              <br />
              unter https://www.google.de/intl/de/policies/privacy/ und unter
              <br />
              http://www.google.com/analytics/terms/de.html abgerufen werden.
              Google Analytics wird
              <br />
              unter diesem Link https://www.google.com/intl/de_de/analytics/
              genauer erläutert.
              <br />
              11. Datenschutzbestimmungen zu Einsatz und Verwendung von Google
              Remarketing
              <br />
              Der für die Verarbeitung Verantwortliche hat auf dieser
              Internetseite Dienste von Google
              <br />
              Remarketing integriert. Google Remarketing ist eine Funktion von
              Google-AdWords, die es
              <br />
              einem Unternehmen ermöglicht, bei solchen Internetnutzern Werbung
              einblenden zu lassen,
              <br />
              die sich zuvor auf der Internetseite des Unternehmens aufgehalten
              haben. Die Integration von
              <br />
              Google Remarketing gestattet es einem Unternehmen demnach,
              nutzerbezogene Werbung zu
              <br />
              erstellen und dem Internetnutzer folglich interessenrelevante
              Werbeanzeigen anzeigen zu
              <br />
              lassen.
              <br />
              Betreibergesellschaft der Dienste von Google Remarketing ist die
              Google Inc., 1600
              <br />
              Amphitheatre Pkwy, Mountain View, CA 94043-1351, USA.
              <br />
              Zweck von Google Remarketing ist die Einblendung von
              interessenrelevanter Werbung.
              <br />
              Google Remarketing ermöglicht es uns, Werbeanzeigen über das
              Google-Werbenetzwerk
              <br />
              anzuzeigen oder auf anderen Internetseiten anzeigen zu lassen,
              welche auf die individuellen
              <br />
              Bedürfnisse und Interessen von Internetnutzern abgestimmt sind.
              <br />
              Google Remarketing setzt ein Cookie auf dem
              informationstechnologischen System der
              <br />
              betroffenen Person. Was Cookies sind, wurde oben bereits
              erläutert. Mit der Setzung des
              <br />
              Cookies wird Google eine Wiedererkennung des Besuchers unserer
              Internetseite ermöglicht,
              <br />
              wenn dieser in der Folge Internetseiten aufruft, die ebenfalls
              Mitglied des Google-
              <br />
              Werbenetzwerks sind. Mit jedem Aufruf einer Internetseite, auf
              welcher der Dienst von
              <br />
              Google Remarketing integriert wurde, identifiziert sich der
              Internetbrowser der betroffenen
              <br />
              Person automatisch bei Google. Im Rahmen dieses technischen
              Verfahrens erhält Google
              <br />
              Kenntnis über personenbezogene Daten, wie der IP-Adresse oder des
              Surfverhaltens des
              <br />
              Nutzers, welche Google unter anderem zur Einblendung
              interessenrelevanter Werbung
              <br />
              verwendet.
              <br />
              Mittels des Cookies werden personenbezogene Informationen,
              beispielsweise die durch die
              <br />
              betroffene Person besuchten Internetseiten, gespeichert. Bei jedem
              Besuch unserer
              <br />
              Internetseiten werden demnach personenbezogene Daten,
              einschließlich der IP-Adresse des
              <br />
              von der betroffenen Person genutzten Internetanschlusses, an
              Google in den Vereinigten
              <br />
              Staaten von Amerika übertragen. Diese personenbezogenen Daten
              werden durch Google in
              <br />
              den Vereinigten Staaten von Amerika gespeichert. Google gibt diese
              über das technische
              <br />
              Verfahren erhobenen personenbezogenen Daten unter Umständen an
              Dritte weiter.
              <br />
              Die betroffene Person kann die Setzung von Cookies durch unsere
              Internetseite, wie oben
              <br />
              bereits dargestellt, jederzeit mittels einer entsprechenden
              Einstellung des genutzten
              <br />
              Internetbrowsers verhindern und damit der Setzung von Cookies
              dauerhaft widersprechen.
              <br />
              Eine solche Einstellung des genutzten Internetbrowsers würde auch
              verhindern, dass Google
              <br />
              ein Cookie auf dem informationstechnologischen System der
              betroffenen Person setzt. Zudem
              <br />
              kann ein von Google Analytics bereits gesetzter Cookie jederzeit
              über den Internetbrowser
              <br />
              oder andere Softwareprogramme gelöscht werden.
              <br />
              Ferner besteht für die betroffene Person die Möglichkeit, der
              interessenbezogenen Werbung
              <br />
              durch Google zu widersprechen. Hierzu muss die betroffene Person
              von jedem der von ihr
              <br />
              genutzten Internetbrowser aus den Link www.google.de/settings/ads
              aufrufen und dort die
              <br />
              gewünschten Einstellungen vornehmen.
              <br />
              Weitere Informationen und die geltenden Datenschutzbestimmungen
              von Google können
              <br />
              unter https://www.google.de/intl/de/policies/privacy/ abgerufen
              werden.
              <br />
              12. Datenschutzbestimmungen zu Einsatz und Verwendung von
              Google-AdWords
              <br />
              Der für die Verarbeitung Verantwortliche hat auf dieser
              Internetseite Google AdWords
              <br />
              integriert. Google AdWords ist ein Dienst zur Internetwerbung, der
              es Werbetreibenden
              <br />
              gestattet, sowohl Anzeigen in den Suchmaschinenergebnissen von
              Google als auch im
              <br />
              Google-Werbenetzwerk zu schalten. Google AdWords ermöglicht es
              einem Werbetreibenden,
              <br />
              vorab bestimmte Schlüsselwörter festzulegen, mittels derer eine
              Anzeige in den
              <br />
              Suchmaschinenergebnissen von Google ausschließlich dann angezeigt
              wird, wenn der Nutzer
              <br />
              mit der Suchmaschine ein schlüsselwortrelevantes Suchergebnis
              abruft. Im Google-
              <br />
              Werbenetzwerk werden die Anzeigen mittels eines automatischen
              Algorithmus und unter
              <br />
              Beachtung der zuvor festgelegten Schlüsselwörter auf
              themenrelevanten Internetseiten
              <br />
              verteilt.
              <br />
              Betreibergesellschaft der Dienste von Google AdWords ist die
              Google Inc., 1600
              <br />
              Amphitheatre Pkwy, Mountain View, CA 94043-1351, USA.
              <br />
              Der Zweck von Google AdWords ist die Bewerbung unserer
              Internetseite durch die
              <br />
              Einblendung von interessenrelevanter Werbung auf den
              Internetseiten von Drittunternehmen
              <br />
              und in den Suchmaschinenergebnissen der Suchmaschine Google und
              eine Einblendung von
              <br />
              Fremdwerbung auf unserer Internetseite.
              <br />
              Gelangt eine betroffene Person über eine Google-Anzeige auf unsere
              Internetseite, wird auf
              <br />
              dem informationstechnologischen System der betroffenen Person
              durch Google ein
              <br />
              sogenannter Conversion-Cookie abgelegt. Was Cookies sind, wurde
              oben bereits erläutert.
              <br />
              Ein Conversion-Cookie verliert nach dreißig Tagen seine Gültigkeit
              und dient nicht zur
              <br />
              Identifikation der betroffenen Person. Über den Conversion-Cookie
              wird, sofern das Cookie
              <br />
              noch nicht abgelaufen ist, nachvollzogen, ob bestimmte
              Unterseiten, beispielsweise der
              <br />
              Warenkorb von einem Online-Shop-System, auf unserer Internetseite
              aufgerufen wurden.
              <br />
              Durch den Conversion-Cookie können sowohl wir als auch Google
              nachvollziehen, ob eine
              <br />
              betroffene Person, die über eine AdWords-Anzeige auf unsere
              Internetseite gelangt ist, einen
              <br />
              Umsatz generierte, also einen Warenkauf vollzogen oder abgebrochen
              hat.
              <br />
              Die durch die Nutzung des Conversion-Cookies erhobenen Daten und
              Informationen werden
              <br />
              von Google verwendet, um Besuchsstatistiken für unsere
              Internetseite zu erstellen. Diese
              <br />
              Besuchsstatistiken werden durch uns wiederum genutzt, um die
              Gesamtanzahl der Nutzer zu
              <br />
              ermitteln, welche über AdWords-Anzeigen an uns vermittelt wurden,
              also um den Erfolg oder
              <br />
              Misserfolg der jeweiligen AdWords-Anzeige zu ermitteln und um
              unsere AdWords-Anzeigen
              <br />
              für die Zukunft zu optimieren. Weder unser Unternehmen noch andere
              Werbekunden von
              <br />
              Google-AdWords erhalten Informationen von Google, mittels derer
              die betroffene Person
              <br />
              identifiziert werden könnte.
              <br />
              Mittels des Conversion-Cookies werden personenbezogene
              Informationen, beispielsweise die
              <br />
              durch die betroffene Person besuchten Internetseiten, gespeichert.
              Bei jedem Besuch unserer
              <br />
              Internetseiten werden demnach personenbezogene Daten,
              einschließlich der IP-Adresse des
              <br />
              von der betroffenen Person genutzten Internetanschlusses, an
              Google in den Vereinigten
              <br />
              Staaten von Amerika übertragen. Diese personenbezogenen Daten
              werden durch Google in
              <br />
              den Vereinigten Staaten von Amerika gespeichert. Google gibt diese
              über das technische
              <br />
              Verfahren erhobenen personenbezogenen Daten unter Umständen an
              Dritte weiter.
              <br />
              Die betroffene Person kann die Setzung von Cookies durch unsere
              Internetseite, wie oben
              <br />
              bereits dargestellt, jederzeit mittels einer entsprechenden
              Einstellung des genutzten
              <br />
              Internetbrowsers verhindern und damit der Setzung von Cookies
              dauerhaft widersprechen.
              <br />
              Eine solche Einstellung des genutzten Internetbrowsers würde auch
              verhindern, dass Google
              <br />
              einen Conversion-Cookie auf dem informationstechnologischen System
              der betroffenen
              <br />
              Person setzt. Zudem kann ein von Google AdWords bereits gesetzter
              Cookie jederzeit über
              <br />
              den Internetbrowser oder andere Softwareprogramme gelöscht werden.
              <br />
              Ferner besteht für die betroffene Person die Möglichkeit, der
              interessenbezogenen Werbung
              <br />
              durch Google zu widersprechen. Hierzu muss die betroffene Person
              von jedem der von ihr
              <br />
              genutzten Internetbrowser aus den Link www.google.de/settings/ads
              aufrufen und dort die
              <br />
              gewünschten Einstellungen vornehmen.
              <br />
              Weitere Informationen und die geltenden Datenschutzbestimmungen
              von Google können
              <br />
              unter https://www.google.de/intl/de/policies/privacy/ abgerufen
              werden.
              <br />
              13. Datenschutzbestimmungen zu Einsatz und Verwendung von
              Instagram
              <br />
              Der für die Verarbeitung Verantwortliche hat auf dieser
              Internetseite Komponenten des
              <br />
              Dienstes Instagram integriert. Instagram ist ein Dienst, der als
              audiovisuelle Plattform zu
              <br />
              qualifizieren ist und den Nutzern das Teilen von Fotos und Videos
              und zudem eine
              <br />
              Weiterverbreitung solcher Daten in anderen sozialen Netzwerken
              ermöglicht.
              <br />
              Betreibergesellschaft der Dienste von Instagram ist die Instagram
              LLC, 1 Hacker Way,
              <br />
              Building 14 First Floor, Menlo Park, CA, USA.
              <br />
              Durch jeden Aufruf einer der Einzelseiten dieser Internetseite,
              die durch den für die
              <br />
              Verarbeitung Verantwortlichen betrieben wird und auf welcher eine
              Instagram-Komponente
              <br />
              (Insta-Button) integriert wurde, wird der Internetbrowser auf dem
              <br />
              informationstechnologischen System der betroffenen Person
              automatisch durch die jeweilige
              <br />
              Instagram-Komponente veranlasst, eine Darstellung der
              entsprechenden Komponente von
              <br />
              Instagram herunterzuladen. Im Rahmen dieses technischen Verfahrens
              erhält Instagram
              <br />
              Kenntnis darüber, welche konkrete Unterseite unserer Internetseite
              durch die betroffene
              <br />
              Person besucht wird.
              <br />
              Sofern die betroffene Person gleichzeitig bei Instagram eingeloggt
              ist, erkennt Instagram mit
              <br />
              jedem Aufruf unserer Internetseite durch die betroffene Person und
              während der gesamten
              <br />
              Dauer des jeweiligen Aufenthaltes auf unserer Internetseite,
              welche konkrete Unterseite die
              <br />
              betroffene Person besucht. Diese Informationen werden durch die
              Instagram-Komponente
              <br />
              gesammelt und durch Instagram dem jeweiligen Instagram-Account der
              betroffenen Person
              <br />
              zugeordnet. Betätigt die betroffene Person einen der auf unserer
              Internetseite integrierten
              <br />
              Instagram-Buttons, werden die damit übertragenen Daten und
              Informationen dem
              <br />
              persönlichen Instagram-Benutzerkonto der betroffenen Person
              zugeordnet und von Instagram
              <br />
              gespeichert und verarbeitet.
              <br />
              Instagram erhält über die Instagram-Komponente immer dann eine
              Information darüber, dass
              <br />
              die betroffene Person unsere Internetseite besucht hat, wenn die
              betroffene Person zum
              <br />
              Zeitpunkt des Aufrufs unserer Internetseite gleichzeitig bei
              Instagram eingeloggt ist; dies
              <br />
              findet unabhängig davon statt, ob die betroffene Person die
              Instagram-Komponente anklickt
              <br />
              oder nicht. Ist eine derartige Übermittlung dieser Informationen
              an Instagram von der
              <br />
              betroffenen Person nicht gewollt, kann diese die Übermittlung
              dadurch verhindern, dass sie
              <br />
              sich vor einem Aufruf unserer Internetseite aus ihrem
              Instagram-Account ausloggt.
              <br />
              Weitere Informationen und die geltenden Datenschutzbestimmungen
              von Instagram können
              <br />
              unter https://help.instagram.com/155833707900388 und
              <br />
              https://www.instagram.com/about/legal/privacy/ abgerufen werden.
              <br />
              14. Datenschutzbestimmungen zu Einsatz und Verwendung von LinkedIn
              <br />
              Der für die Verarbeitung Verantwortliche hat auf dieser
              Internetseite Komponenten der
              <br />
              LinkedIn Corporation integriert. LinkedIn ist ein
              Internetbasiertes soziales Netzwerk, das eine
              <br />
              Konnektierung der Nutzer mit bestehenden Geschäftskontakten sowie
              das Knüpfen von neuen
              <br />
              Businesskontakten ermöglicht. Über 400 Millionen registrierte
              Personen nutzen LinkedIn in
              <br />
              mehr als 200 Ländern. Damit ist LinkedIn derzeit die größte
              Plattform für Businesskontakte
              <br />
              und eine der meistbesuchten Internetseiten der Welt.
              <br />
              Betreibergesellschaft von LinkedIn ist die LinkedIn Corporation,
              2029 Stierlin Court
              <br />
              Mountain View, CA 94043, USA. Für Datenschutzangelegenheiten
              außerhalb der USA ist
              <br />
              LinkedIn Ireland, Privacy Policy Issues, Wilton Plaza, Wilton
              Place, Dublin 2, Ireland,
              <br />
              zuständig.
              <br />
              Bei jedem einzelnen Abruf unserer Internetseite, die mit einer
              LinkedIn-Komponente
              <br />
              (LinkedIn-Plug-In) ausgestattet ist, veranlasst diese Komponente,
              dass der von der
              <br />
              betroffenen Person verwendete Browser eine entsprechende
              Darstellung der Komponente von
              <br />
              LinkedIn herunterlädt. Weitere Informationen zu den
              LinkedIn-Plug-Ins können unter
              <br />
              https://developer.linkedin.com/plugins abgerufen werden. Im Rahmen
              dieses technischen
              <br />
              Verfahrens erhält LinkedIn Kenntnis darüber, welche konkrete
              Unterseite unserer
              <br />
              Internetseite durch die betroffene Person besucht wird.
              <br />
              Sofern die betroffene Person gleichzeitig bei LinkedIn eingeloggt
              ist, erkennt LinkedIn mit
              <br />
              jedem Aufruf unserer Internetseite durch die betroffene Person und
              während der gesamten
              <br />
              Dauer des jeweiligen Aufenthaltes auf unserer Internetseite,
              welche konkrete Unterseite
              <br />
              unserer Internetseite die betroffene Person besucht. Diese
              Informationen werden durch die
              <br />
              LinkedIn-Komponente gesammelt und durch LinkedIn dem jeweiligen
              LinkedIn-Account der
              <br />
              betroffenen Person zugeordnet. Betätigt die betroffene Person
              einen auf unserer Internetseite
              <br />
              integrierten LinkedIn-Button, ordnet LinkedIn diese Information
              dem persönlichen LinkedIn-
              <br />
              Benutzerkonto der betroffenen Person zu und speichert diese
              personenbezogenen Daten.
              <br />
              LinkedIn erhält über die LinkedIn-Komponente immer dann eine
              Information darüber, dass
              <br />
              die betroffene Person unsere Internetseite besucht hat, wenn die
              betroffene Person zum
              <br />
              Zeitpunkt des Aufrufes unserer Internetseite gleichzeitig bei
              LinkedIn eingeloggt ist; dies
              <br />
              findet unabhängig davon statt, ob die betroffene Person die
              LinkedIn-Komponente anklickt
              <br />
              oder nicht. Ist eine derartige Übermittlung dieser Informationen
              an LinkedIn von der
              <br />
              betroffenen Person nicht gewollt, kann diese die Übermittlung
              dadurch verhindern, dass sie
              <br />
              sich vor einem Aufruf unserer Internetseite aus ihrem
              LinkedIn-Account ausloggt.
              <br />
              LinkedIn bietet unter
              https://www.linkedin.com/psettings/guest-controls die Möglichkeit,
              EMail-
              <br />
              Nachrichten, SMS-Nachrichten und zielgerichtete Anzeigen
              abzubestellen sowie
              <br />
              Anzeigen-Einstellungen zu verwalten. LinkedIn nutzt ferner Partner
              wie Quantcast, Google
              <br />
              Analytics, BlueKai, DoubleClick, Nielsen, Comscore, Eloqua und
              Lotame, die Cookies setzen
              <br />
              können. Solche Cookies können unter
              https://www.linkedin.com/legal/cookie-policy
              <br />
              abgelehnt werden. Die geltenden Datenschutzbestimmungen von
              LinkedIn sind unter
              <br />
              https://www.linkedin.com/legal/privacy-policy abrufbar. Die
              Cookie-Richtlinie von LinkedIn
              <br />
              ist unter https://www.linkedin.com/legal/cookie-policy abrufbar.
              <br />
              15. Datenschutzbestimmungen zu Einsatz und Verwendung von Twitter
              <br />
              Der für die Verarbeitung Verantwortliche hat auf dieser
              Internetseite Komponenten von
              <br />
              Twitter integriert. Twitter ist ein multilingualer öffentlich
              zugänglicher Mikroblogging-
              <br />
              Dienst, auf welchem die Nutzer sogenannte Tweets, also
              Kurznachrichten, die auf 280
              <br />
              Zeichen begrenzt sind, veröffentlichen und verbreiten können.
              Diese Kurznachrichten sind für
              <br />
              jedermann, also auch für nicht bei Twitter angemeldete Personen
              abrufbar. Die Tweets
              <br />
              werden aber auch den sogenannten Followern des jeweiligen Nutzers
              angezeigt. Follower
              <br />
              sind andere Twitter-Nutzer, die den Tweets eines Nutzers folgen.
              Ferner ermöglicht Twitter
              <br />
              über Hashtags, Verlinkungen oder Retweets die Ansprache eines
              breiten Publikums.
              <br />
              Betreibergesellschaft von Twitter ist die Twitter, Inc., 1355
              Market Street, Suite 900, San
              <br />
              Francisco, CA 94103, USA.
              <br />
              Durch jeden Aufruf einer der Einzelseiten dieser Internetseite,
              die durch den für die
              <br />
              Verarbeitung Verantwortlichen betrieben wird und auf welcher eine
              Twitter-Komponente
              <br />
              (Twitter-Button) integriert wurde, wird der Internetbrowser auf
              dem
              <br />
              informationstechnologischen System der betroffenen Person
              automatisch durch die jeweilige
              <br />
              Twitter-Komponente veranlasst, eine Darstellung der entsprechenden
              Twitter-Komponente
              <br />
              von Twitter herunterzuladen. Weitere Informationen zu den
              Twitter-Buttons sind unter
              <br />
              https://about.twitter.com/de/resources/buttons abrufbar. Im Rahmen
              dieses technischen
              <br />
              Verfahrens erhält Twitter Kenntnis darüber, welche konkrete
              Unterseite unserer Internetseite
              <br />
              durch die betroffene Person besucht wird. Zweck der Integration
              der Twitter-Komponente ist
              <br />
              es, unseren Nutzern eine Weiterverbreitung der Inhalte diese
              Internetseite zu ermöglichen,
              <br />
              diese Internetseite in der digitalen Welt bekannt zu machen und
              unsere Besucherzahlen zu
              <br />
              erhöhen.
              <br />
              Sofern die betroffene Person gleichzeitig bei Twitter eingeloggt
              ist, erkennt Twitter mit jedem
              <br />
              Aufruf unserer Internetseite durch die betroffene Person und
              während der gesamten Dauer des
              <br />
              jeweiligen Aufenthaltes auf unserer Internetseite, welche konkrete
              Unterseite unserer
              <br />
              Internetseite die betroffene Person besucht. Diese Informationen
              werden durch die Twitter-
              <br />
              Komponente gesammelt und durch Twitter dem jeweiligen
              Twitter-Account der betroffenen
              <br />
              Person zugeordnet. Betätigt die betroffene Person einen der auf
              unserer Internetseite
              <br />
              integrierten Twitter-Buttons, werden die damit übertragenen Daten
              und Informationen dem
              <br />
              persönlichen Twitter-Benutzerkonto der betroffenen Person
              zugeordnet und von Twitter
              <br />
              gespeichert und verarbeitet.
              <br />
              Twitter erhält über die Twitter-Komponente immer dann eine
              Information darüber, dass die
              <br />
              betroffene Person unsere Internetseite besucht hat, wenn die
              betroffene Person zum Zeitpunkt
              <br />
              des Aufrufs unserer Internetseite gleichzeitig bei Twitter
              eingeloggt ist; dies findet
              <br />
              unabhängig davon statt, ob die betroffene Person die
              Twitter-Komponente anklickt oder nicht.
              <br />
              Ist eine derartige Übermittlung dieser Informationen an Twitter
              von der betroffenen Person
              <br />
              nicht gewollt, kann diese die Übermittlung dadurch verhindern,
              dass sie sich vor einem
              <br />
              Aufruf unserer Internetseite aus ihrem Twitter-Account ausloggt.
              <br />
              Die geltenden Datenschutzbestimmungen von Twitter sind unter
              <br />
              https://twitter.com/privacy?lang=de abrufbar.
              <br />
              16. Datenschutzbestimmungen zu Einsatz und Verwendung von YouTube
              <br />
              Der für die Verarbeitung Verantwortliche hat auf dieser
              Internetseite Komponenten von
              <br />
              YouTube integriert. YouTube ist ein Internet-Videoportal, dass
              Video-Publishern das
              <br />
              kostenlose Einstellen von Videoclips und anderen Nutzern die
              ebenfalls kostenfreie
              <br />
              Betrachtung, Bewertung und Kommentierung dieser ermöglicht.
              YouTube gestattet die
              <br />
              Publikation aller Arten von Videos, weshalb sowohl komplette Film-
              und Fernsehsendungen,
              <br />
              aber auch Musikvideos, Trailer oder von Nutzern selbst
              angefertigte Videos über das
              <br />
              Internetportal abrufbar sind.
              <br />
              Betreibergesellschaft von YouTube ist die YouTube, LLC, 901 Cherry
              Ave., San Bruno, CA
              <br />
              94066, USA. Die YouTube, LLC ist einer Tochtergesellschaft der
              Google Inc., 1600
              <br />
              Amphitheatre Pkwy, Mountain View, CA 94043-1351, USA.
              <br />
              Durch jeden Aufruf einer der Einzelseiten dieser Internetseite,
              die durch den für die
              <br />
              Verarbeitung Verantwortlichen betrieben wird und auf welcher eine
              YouTube-Komponente
              <br />
              (YouTube-Video) integriert wurde, wird der Internetbrowser auf dem
              <br />
              informationstechnologischen System der betroffenen Person
              automatisch durch die jeweilige
              <br />
              YouTube-Komponente veranlasst, eine Darstellung der entsprechenden
              YouTube-
              <br />
              Komponente von YouTube herunterzuladen. Weitere Informationen zu
              YouTube können
              <br />
              unter https://www.youtube.com/yt/about/de/ abgerufen werden. Im
              Rahmen dieses
              <br />
              technischen Verfahrens erhalten YouTube und Google Kenntnis
              darüber, welche konkrete
              <br />
              Unterseite unserer Internetseite durch die betroffene Person
              besucht wird.
              <br />
              Sofern die betroffene Person gleichzeitig bei YouTube eingeloggt
              ist, erkennt YouTube mit
              <br />
              dem Aufruf einer Unterseite, die ein YouTube-Video enthält, welche
              konkrete Unterseite
              <br />
              unserer Internetseite die betroffene Person besucht. Diese
              Informationen werden durch
              <br />
              YouTube und Google gesammelt und dem jeweiligen YouTube-Account
              der betroffenen
              <br />
              Person zugeordnet.
              <br />
              YouTube und Google erhalten über die YouTube-Komponente immer dann
              eine Information
              <br />
              darüber, dass die betroffene Person unsere Internetseite besucht
              hat, wenn die betroffene
              <br />
              Person zum Zeitpunkt des Aufrufs unserer Internetseite
              gleichzeitig bei YouTube eingeloggt
              <br />
              ist; dies findet unabhängig davon statt, ob die betroffene Person
              ein YouTube-Video anklickt
              <br />
              oder nicht. Ist eine derartige Übermittlung dieser Informationen
              an YouTube und Google von
              <br />
              der betroffenen Person nicht gewollt, kann diese die Übermittlung
              dadurch verhindern, dass
              <br />
              sie sich vor einem Aufruf unserer Internetseite aus ihrem
              YouTube-Account ausloggt.
              <br />
              Die von YouTube veröffentlichten Datenschutzbestimmungen, die
              unter
              <br />
              https://www.google.de/intl/de/policies/privacy/ abrufbar sind,
              geben Aufschluss über die
              <br />
              Erhebung, Verarbeitung und Nutzung personenbezogener Daten durch
              YouTube und Google.
              <br />
              17. Rechtsgrundlage der Verarbeitung
              <br />
              Art. 6 I lit. a DS-GVO dient unserem Unternehmen als
              Rechtsgrundlage für
              <br />
              Verarbeitungsvorgänge, bei denen wir eine Einwilligung für einen
              bestimmten
              <br />
              Verarbeitungszweck einholen. Ist die Verarbeitung
              personenbezogener Daten zur Erfüllung
              <br />
              eines Vertrags, dessen Vertragspartei die betroffene Person ist,
              erforderlich, wie dies
              <br />
              beispielsweise bei Verarbeitungsvorgängen der Fall ist, die für
              eine Lieferung von Waren
              <br />
              oder die Erbringung einer sonstigen Leistung oder Gegenleistung
              notwendig sind, so beruht
              <br />
              die Verarbeitung auf Art. 6 I lit. b DS-GVO. Gleiches gilt für
              solche Verarbeitungsvorgänge
              <br />
              die zur Durchführung vorvertraglicher Maßnahmen erforderlich sind,
              etwa in Fällen von
              <br />
              Anfragen zur unseren Produkten oder Leistungen. Unterliegt unser
              Unternehmen einer
              <br />
              rechtlichen Verpflichtung durch welche eine Verarbeitung von
              personenbezogenen Daten
              <br />
              erforderlich wird, wie beispielsweise zur Erfüllung steuerlicher
              Pflichten, so basiert die
              <br />
              Verarbeitung auf Art. 6 I lit. c DS-GVO. In seltenen Fällen könnte
              die Verarbeitung von
              <br />
              personenbezogenen Daten erforderlich werden, um lebenswichtige
              Interessen der betroffenen
              <br />
              Person oder einer anderen natürlichen Person zu schützen. Dies
              wäre beispielsweise der Fall,
              <br />
              wenn ein Besucher in unserem Betrieb verletzt werden würde und
              daraufhin sein Name, sein
              <br />
              Alter, seine Krankenkassendaten oder sonstige lebenswichtige
              Informationen an einen Arzt,
              <br />
              ein Krankenhaus oder sonstige Dritte weitergegeben werden müssten.
              Dann würde die
              <br />
              Verarbeitung auf Art. 6 I lit. d DS-GVO beruhen.
              <br />
              Letztlich könnten Verarbeitungsvorgänge auf Art. 6 I lit. f DS-GVO
              beruhen. Auf dieser
              <br />
              Rechtsgrundlage basieren Verarbeitungsvorgänge, die von keiner der
              vorgenannten
              <br />
              Rechtsgrundlagen erfasst werden, wenn die Verarbeitung zur Wahrung
              eines berechtigten
              <br />
              Interesses unseres Unternehmens oder eines Dritten erforderlich
              ist, sofern die Interessen,
              <br />
              Grundrechte und Grundfreiheiten des Betroffenen nicht überwiegen.
              Solche
              <br />
              Verarbeitungsvorgänge sind uns insbesondere deshalb gestattet,
              weil sie durch den
              <br />
              Europäischen Gesetzgeber besonders erwähnt wurden. Er vertrat
              insoweit die Auffassung,
              <br />
              dass ein berechtigtes Interesse anzunehmen sein könnte, wenn die
              betroffene Person ein
              <br />
              Kunde des Verantwortlichen ist (Erwägungsgrund 47 Satz 2 DS-GVO).
              <br />
              18. Berechtigte Interessen an der Verarbeitung, die von dem
              Verantwortlichen oder
              <br />
              einem Dritten verfolgt werden
              <br />
              Basiert die Verarbeitung personenbezogener Daten auf Artikel 6 I
              lit. f DS-GVO ist unser
              <br />
              berechtigtes Interesse die Durchführung unserer Geschäftstätigkeit
              zugunsten des
              <br />
              Wohlergehens all unserer Mitarbeiter und unserer Anteilseigner.
              <br />
              19. Dauer, für die die personenbezogenen Daten gespeichert werden
              <br />
              Das Kriterium für die Dauer der Speicherung von personenbezogenen
              Daten ist die jeweilige
              <br />
              gesetzliche Aufbewahrungsfrist. Nach Ablauf der Frist werden die
              entsprechenden Daten
              <br />
              routinemäßig gelöscht, sofern sie nicht mehr zur Vertragserfüllung
              oder Vertragsanbahnung
              <br />
              erforderlich sind.
              <br />
              20. Gesetzliche oder vertragliche Vorschriften zur Bereitstellung
              der personenbezogenen
              <br />
              Daten; Erforderlichkeit für den Vertragsabschluss; Verpflichtung
              der betroffenen
              <br />
              Person, die personenbezogenen Daten bereitzustellen; mögliche
              Folgen der
              <br />
              Nichtbereitstellung
              <br />
              Wir klären Sie darüber auf, dass die Bereitstellung
              personenbezogener Daten zum Teil
              <br />
              gesetzlich vorgeschrieben ist (z.B. Steuervorschriften) oder sich
              auch aus vertraglichen
              <br />
              Regelungen (z.B. Angaben zum Vertragspartner) ergeben kann.
              <br />
              Mitunter kann es zu einem Vertragsschluss erforderlich sein, dass
              eine betroffene Person uns
              <br />
              personenbezogene Daten zur Verfügung stellt, die in der Folge
              durch uns verarbeitet werden
              <br />
              müssen. Die betroffene Person ist beispielsweise verpflichtet uns
              personenbezogene Daten
              <br />
              bereitzustellen, wenn unser Unternehmen mit ihr einen Vertrag
              abschließt. Eine
              <br />
              Nichtbereitstellung der personenbezogenen Daten hätte zur Folge,
              dass der Vertrag mit dem
              <br />
              Betroffenen nicht geschlossen werden könnte.
              <br />
              Vor einer Bereitstellung personenbezogener Daten durch den
              Betroffenen muss sich der
              <br />
              Betroffene an einen unserer Mitarbeiter wenden. Unser Mitarbeiter
              klärt den Betroffenen
              <br />
              einzelfallbezogen darüber auf, ob die Bereitstellung der
              personenbezogenen Daten gesetzlich
              <br />
              oder vertraglich vorgeschrieben oder für den Vertragsabschluss
              erforderlich ist, ob eine
              <br />
              Verpflichtung besteht, die personenbezogenen Daten
              bereitzustellen, und welche Folgen die
              <br />
              Nichtbereitstellung der personenbezogenen Daten hätte.
              <br />
              21. Bestehen einer automatisierten Entscheidungsfindung
              <br />
              Als verantwortungsbewusstes Unternehmen verzichten wir auf eine
              automatische
              <br />
              Entscheidungsfindung oder ein Profiling..
              <br />
              <a href="https://docs.zeta-producer.com/datenschutz.html#a5446">
                e-Handbuch.
              </a>
            </span>
          </p>
        </div>
      </div>
      <div className="w-1/3">
        <div className="flex flex-col gap-8">
          <Image
            src="/images/gallery/gal9.jpg"
            alt="Geländer 1"
            width="1000"
            height="645"
            className="w-full rounded hover:cursor-pointer border-b-4 border-tch-blue"
          />
          <Image
            src="/images/gallery/gal8.jpg"
            alt="Geländer 1"
            width="1000"
            height="645"
            className="w-full rounded hover:cursor-pointer border-b-4 border-tch-blue"
          />
        </div>
      </div>
    </div>
  );
}

export default Datenschutz;
