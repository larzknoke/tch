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

export default function GroupOrderPricedEmail({ order, product, finalPrice }) {
  return (
    <Html>
      <Head />
      <Preview>
        Sammelbestellung: Preis für {product.name} steht fest –{" "}
        {parseFloat(finalPrice).toFixed(2)} €
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

          <Text style={title}>Sammelbestellung: Preis steht fest!</Text>

          <Section style={section}>
            <Text style={text}>
              Die Sammelbestellung für <strong>{product.name}</strong> ist
              abgeschlossen. Der Endpreis wurde vom Produzenten festgelegt.
            </Text>
            <Hr style={divider} />
            <Text style={text}>
              <strong>Bestellnummer:</strong> #{order.id}
            </Text>
            <Text style={text}>
              <strong>Produkt:</strong> {product.name}
            </Text>
            <Text style={priceText}>
              <strong>
                Preis pro Stück: {parseFloat(finalPrice).toFixed(2)} €
              </strong>
            </Text>
            {order.items && order.items.length > 0 && (
              <Text style={text}>
                <strong>Deine Menge:</strong>{" "}
                {order.items.reduce((sum, i) => sum + i.quantity, 0)} Stück
              </Text>
            )}
            <Text style={totalText}>
              <strong>
                Gesamtbetrag:{" "}
                {(
                  parseFloat(finalPrice) *
                  order.items.reduce((sum, i) => sum + i.quantity, 0)
                ).toFixed(2)}{" "}
                €
              </strong>
            </Text>
          </Section>

          <Section style={section}>
            <Text style={text}>
              Du wirst in Kürze weitere Informationen zur Abholung und Zahlung
              erhalten. Bei Fragen wende dich an den Verein.
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

const text = {
  margin: "0 0 10px 0",
  textAlign: "left",
  fontSize: "14px",
};

const priceText = {
  margin: "10px 0",
  fontSize: "20px",
  color: "#284879",
};

const totalText = {
  margin: "10px 0 0 0",
  textAlign: "right",
  fontSize: "16px",
  color: "#284879",
};

const divider = {
  borderColor: "#dedede",
  margin: "10px 0",
};
