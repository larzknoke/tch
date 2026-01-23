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

export default function AdminNotifyOrderEmail({ order }) {
  return (
    <Html>
      <Head />
      <Preview>
        Neue Bestellung #{order.id} - TC Holzminden von 1928 e.V.
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

          <Text style={title}>Neue Bestellung eingegangen</Text>

          <Section style={section}>
            <Text style={sectionTitle}>Bestellinformationen</Text>
            <Text style={text}>
              <strong>Bestellnummer:</strong> #{order.id}
            </Text>
            <Text style={text}>
              <strong>Kunde:</strong> {order.shippingName || order.email}
            </Text>
            <Text style={text}>
              <strong>E-Mail:</strong> {order.email}
            </Text>
            <Text style={text}>
              <strong>Zahlungsmethode:</strong> {order.payment || "Barzahlung"}
            </Text>
            <Text style={text}>
              <strong>Status:</strong> {order.status || "ausstehend"}
            </Text>
            <Text style={text}>
              <strong>Datum:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString("de-DE", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </Section>

          {(order.shippingName ||
            order.shippingStreet ||
            order.shippingCity) && (
            <Section style={section}>
              <Text style={sectionTitle}>Lieferadresse</Text>
              {order.shippingName && (
                <Text style={text}>{order.shippingName}</Text>
              )}
              {order.shippingStreet && (
                <Text style={text}>{order.shippingStreet}</Text>
              )}
              {(order.shippingPlz || order.shippingCity) && (
                <Text style={text}>
                  {order.shippingPlz} {order.shippingCity}
                </Text>
              )}
            </Section>
          )}

          {(order.billingName || order.billingStreet || order.billingCity) && (
            <Section style={section}>
              <Text style={sectionTitle}>Rechnungsadresse</Text>
              {order.billingName && (
                <Text style={text}>{order.billingName}</Text>
              )}
              {order.billingStreet && (
                <Text style={text}>{order.billingStreet}</Text>
              )}
              {(order.billingPlz || order.billingCity) && (
                <Text style={text}>
                  {order.billingPlz} {order.billingCity}
                </Text>
              )}
            </Section>
          )}

          <Section style={section}>
            <Text style={sectionTitle}>Bestellpositionen</Text>
            {order.items &&
              order.items.map((item, index) => (
                <div key={index} style={{ marginBottom: "15px" }}>
                  <Text style={text}>
                    <strong>{item.product?.name || "Produkt"}</strong>
                  </Text>
                  {item.variant && (
                    <Text style={textSmall}>Größe: {item.variant.size}</Text>
                  )}
                  <Text style={textSmall}>
                    Menge: {item.quantity} × {parseFloat(item.price).toFixed(2)}{" "}
                    € = {(parseFloat(item.price) * item.quantity).toFixed(2)} €
                  </Text>
                  {index < order.items.length - 1 && <Hr style={divider} />}
                </div>
              ))}
            <Hr style={divider} />
            <Text style={totalText}>
              <strong>
                Gesamtsumme: {parseFloat(order.total).toFixed(2)} €
              </strong>
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

const textSmall = {
  margin: "0 0 5px 0",
  textAlign: "left",
  fontSize: "12px",
  color: "#6a737d",
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
