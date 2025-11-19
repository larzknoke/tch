import { dateFormatter } from "@/lib/utils";
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export default function AdminConfirmWorkerEmail({ worker, effort }) {
  return (
    <Html>
      <Head />
      <Preview>
        Neuer Teilnehmer bestätigt - TC Holzminden von 1928 e.V.
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

          <Text style={title}>
            Neuer Teilnehmer für Arbeitseinsatz bestätigt
          </Text>

          <Section style={section}>
            <Text style={sectionTitle}>Arbeitseinsatz</Text>
            <Text style={text}>
              <strong>Titel:</strong> {effort.title}
            </Text>
            {effort.content && (
              <Text style={text}>
                <strong>Beschreibung:</strong> {effort.content}
              </Text>
            )}
            {effort.date && (
              <Text style={text}>
                <strong>Datum:</strong> {effort.date}
              </Text>
            )}
          </Section>

          <Section style={section}>
            <Text style={sectionTitle}>Teilnehmer</Text>
            <Text style={text}>
              <strong>Name:</strong> {worker.name || "Nicht angegeben"}
            </Text>
            <Text style={text}>
              <strong>Email:</strong> {worker.email || "Nicht angegeben"}
            </Text>
            <Text style={text}>
              <strong>Telefon:</strong> {worker.phone || "Nicht angegeben"}
            </Text>
            <Text style={text}>
              <strong>Status:</strong> Bestätigt
            </Text>
          </Section>
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
  fontSize: "24px",
  lineHeight: 1.25,
  color: "#284879",
  fontWeight: "bold",
  marginBottom: "20px",
};

const section = {
  padding: "24px",
  border: "solid 1px #dedede",
  borderRadius: "5px",
  marginBottom: "20px",
  backgroundColor: "#f6f8fa",
};

const sectionTitle = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#284879",
  marginBottom: "10px",
  marginTop: "0",
};

const text = {
  margin: "0 0 10px 0",
  textAlign: "left",
  fontSize: "14px",
};

const footer = {
  color: "#6a737d",
  fontSize: "12px",
  textAlign: "center",
  marginTop: "40px",
  fontStyle: "italic",
};
