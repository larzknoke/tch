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

export default function VerifyEmail({ worker, effort }) {
  return (
    <Html>
      <Head />
      <Preview>Arbeitseinsatz bestätigen - TC Holzminden von 1928 e.V.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`https://www.tc1928.com/tch_logo.png`} //TODO: URL in Production ersetzen
            alt="TC Holzminden von 1928 e.V."
            width={250}
            height={66}
            priority
          />

          <Text style={title}>
            Arbeitseinsatz: <br />
            <strong>{effort.title}</strong> <br />
            {effort.content && (
              <>
                <strong>{effort.content}</strong> <br />
              </>
            )}
            <strong>{effort.date}</strong>
          </Text>

          <Section style={section}>
            <Text style={text}>
              Um Ihren Arbeitseinsatz zu aktivieren, klicken Sie bitte auf
              folgenden Link:
            </Text>

            <Button
              style={button}
              href={
                process.env.NEXTAUTH_URL + "/verify?verifyId=" + worker.verifyId
              }
            >
              <Text style={buttonText}>Arbeitseinsatz bestätigen</Text>
            </Button>
            <Text style={text}>
              Wenn der Link oben nicht funktioniert kopieren Sie bitte folgende
              URL in Ihren Browser:
            </Text>
            <Text style={textbold}>
              {process.env.NEXTAUTH_URL + "/verify?verifyId=" + worker.verifyId}
            </Text>
          </Section>

          <Text>
            <strong>Ihr Team vom TC Holzminden von 1928 e.V.</strong> <br />
            presse@tc1928.com <br />
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

const links = {
  textAlign: "center",
};

const link = {
  color: "#0366d6",
  fontSize: "12px",
};

const footer = {
  color: "#6a737d",
  fontSize: "12px",
  textAlign: "center",
  marginTop: "60px",
};
