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

export default function AdminNotifyMemberRegistrationEmail({ registration }) {
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
        Neuer bestätigter Mitgliedsantrag - TC Holzminden von 1928 e.V.
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
            <Text style={title}>Neuer Mitgliedsantrag bestätigt</Text>

            <Text style={text}>
              Ein neuer Mitgliedsantrag wurde vom Antragsteller bestätigt:
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
              <strong>Einzug:</strong>{" "}
              {einzugLabels[registration.sepaEinzug] || registration.sepaEinzug}
            </Text>
            <Text style={dataText}>
              <strong>Mandat erteilt:</strong>{" "}
              {registration.sepaLastschriftmandat ? "Ja" : "Nein"}
            </Text>

            <Hr style={hr} />

            <Text style={dataText}>
              <strong>Datenschutz akzeptiert:</strong>{" "}
              {registration.datenschutz ? "Ja" : "Nein"}
            </Text>
            <Text style={dataText}>
              <strong>Bestätigt am:</strong>{" "}
              {new Date(registration.updatedAt).toLocaleString("de-DE")}
            </Text>
          </Section>

          <Text style={footer}>Diese E-Mail wurde automatisch generiert.</Text>
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

const footer = {
  color: "#6a737d",
  fontSize: "12px",
  textAlign: "center",
  marginTop: "20px",
};
