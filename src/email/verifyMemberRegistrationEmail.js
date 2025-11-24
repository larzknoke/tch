import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export default function VerifyMemberRegistrationEmail({ registration }) {
  return (
    <Html>
      <Head />
      <Preview>
        Mitgliedsantrag bestätigen - TC Holzminden von 1928 e.V.
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
              Hallo {registration.vorname} {registration.name},
            </Text>
            <Text style={text}>
              vielen Dank für Ihren Mitgliedsantrag beim TC Holzminden von 1928
              e.V.!
            </Text>
            <Text style={text}>
              Um Ihren Antrag zu bestätigen und den Prozess abzuschließen,
              klicken Sie bitte auf folgenden Link:
            </Text>

            <Button
              style={button}
              href={
                process.env.NEXTAUTH_URL +
                "/verifyMemberRegistration?verifyId=" +
                registration.verifyId
              }
            >
              <Text style={buttonText}>Mitgliedsantrag bestätigen</Text>
            </Button>

            <Text style={text}>
              Wenn der Link oben nicht funktioniert, kopieren Sie bitte folgende
              URL in Ihren Browser:
            </Text>
            <Text style={textbold}>
              {process.env.NEXTAUTH_URL +
                "/verifyMemberRegistration?verifyId=" +
                registration.verifyId}
            </Text>

            <Text style={text}>
              Nach Bestätigung wird Ihr Antrag geprüft und bearbeitet.
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

const section = {
  padding: "24px",
  border: "solid 1px #dedede",
  borderRadius: "5px",
  textAlign: "center",
  marginBottom: "10px",
};

const text = {
  margin: "0 0 10px 0",
  textAlign: "left",
};

const textbold = {
  margin: "0 0 10px 0",
  textAlign: "left",
  fontWeight: "bold",
};

const button = {
  fontSize: "14px",
  backgroundColor: "#284879",
  color: "#fff",
  lineHeight: 1.5,
  borderRadius: "0.5em",
  marginBottom: "10px",
};

const buttonText = {
  margin: 0,
  lineHeight: 1,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 15,
  paddingRight: 15,
};
