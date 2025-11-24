import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";

export default function ConfirmMemberRegistrationEmail({ registration }) {
  // Map mitgliedsart values to readable labels
  const mitgliedsartLabels = {
    jugendliche: "Jugendliche bis 18 Jahre",
    "aktiv-einzel": "Aktives Einzelmitglied",
    "aktiv-einzel-mit-kindern":
      "Aktives Einzelmitglied – mit max. 3 Kindern bis 18 Jahre",
    "aktiv-paar": "Aktive Ehepaar/Lebensgemeinschaft",
    "aktiv-paar-mit-kindern":
      "Aktive Ehepaar/Lebensgemeinschaft mit max. 3 Kindern bis 18 Jahre",
    "passiv-foerdernd":
      "Passives / Förderndes Mitglied – keine Spielberechtigung",
    "zweitmitgliedschaft-voll":
      "Zweitmitgliedschaft bei Vollmitgliedschaft in einem anderen Tennisverein",
    "zweitmitgliedschaft-punktspiel":
      "Zweitmitgliedschaft ausschließlich für den Punktspielbetrieb",
  };

  const statusLabels = {
    erwachsener: "Erwachsener",
    "jugendlicher-azubi-student": "Jugendlicher / Auszubildender / Student/in",
  };

  const einzugLabels = {
    halbjaehrlich: "Halbjährlich",
    jaehrlich: "Jährlich",
  };

  return (
    <Html>
      <Head />
      <Preview>
        Bestätigung Ihres Mitgliedsantrags - TC Holzminden von 1928 e.V.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`https://www.tc1928.com/tch_logo.png`}
            alt="TC Holzminden von 1928 e.V."
            width={250}
            height={66}
            priority
          />

          <Section style={section}>
            <Text style={title}>
              Vielen Dank für Ihre Bestätigung, {registration.vorname}{" "}
              {registration.name}!
            </Text>

            <Text style={text}>
              Ihr Mitgliedsantrag wurde erfolgreich bei uns eingereicht. Hier
              ist eine Zusammenfassung Ihrer Angaben:
            </Text>

            <Hr style={hr} />

            <Text style={sectionTitle}>Persönliche Daten</Text>
            <Text style={dataText}>
              <strong>Name:</strong> {registration.vorname} {registration.name}
            </Text>
            <Text style={dataText}>
              <strong>Geburtsdatum:</strong> {registration.geburtsdatum}
            </Text>
            <Text style={dataText}>
              <strong>Adresse:</strong> {registration.strasse},{" "}
              {registration.plz} {registration.ort}
            </Text>
            <Text style={dataText}>
              <strong>E-Mail:</strong> {registration.email}
            </Text>
            {registration.telefon && (
              <Text style={dataText}>
                <strong>Telefon:</strong> {registration.telefon}
              </Text>
            )}

            <Hr style={hr} />

            <Text style={sectionTitle}>Mitgliedschaft</Text>
            <Text style={dataText}>
              <strong>Mitgliedsart:</strong>{" "}
              {mitgliedsartLabels[registration.mitgliedsart] ||
                registration.mitgliedsart}
            </Text>
            <Text style={dataText}>
              <strong>Status:</strong>{" "}
              {statusLabels[registration.status] || registration.status}
            </Text>

            <Hr style={hr} />

            <Text style={sectionTitle}>SEPA-Lastschriftmandat</Text>
            <Text style={dataText}>
              <strong>Kontoinhaber:</strong> {registration.sepaVorname}{" "}
              {registration.sepaName}
            </Text>
            <Text style={dataText}>
              <strong>Adresse:</strong> {registration.sepaStrasse},{" "}
              {registration.sepaPlz} {registration.sepaOrt}
            </Text>
            <Text style={dataText}>
              <strong>Kreditinstitut:</strong> {registration.sepaKreditinstitut}
            </Text>
            <Text style={dataText}>
              <strong>IBAN:</strong> {registration.sepaIban}
            </Text>
            <Text style={dataText}>
              <strong>Zahlungsintervall:</strong>{" "}
              {einzugLabels[registration.sepaEinzug] || registration.sepaEinzug}
            </Text>

            <Hr style={hr} />

            <Text style={text}>
              Wir werden Ihren Antrag nun prüfen und schnellstmöglich
              bearbeiten. Bei Fragen stehen wir Ihnen gerne zur Verfügung.
            </Text>
          </Section>

          <Text>
            <strong>Ihr Team vom TC Holzminden von 1928 e.V.</strong> <br />
            vorstand@tc1928.com <br />
            www.tc1928.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#ffffff",
  color: "#24292e",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
  width: "700px",
  maxWidth: "700px",
  margin: "0 auto",
  padding: "20px 0 48px",
};

const title = {
  fontSize: "20px",
  lineHeight: 1.25,
  color: "#284879",
  fontWeight: "bold",
  marginBottom: "20px",
};

const sectionTitle = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#284879",
  marginTop: "10px",
  marginBottom: "10px",
};

const section = {
  padding: "24px",
  border: "solid 1px #dedede",
  borderRadius: "5px",
  marginBottom: "10px",
};

const text = {
  margin: "0 0 10px 0",
  textAlign: "left",
};

const dataText = {
  margin: "0 0 5px 0",
  textAlign: "left",
  fontSize: "14px",
};

const hr = {
  borderColor: "#dedede",
  margin: "20px 0",
};
