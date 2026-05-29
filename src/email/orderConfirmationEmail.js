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

function formatDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatMoney(value) {
  const amount = Number.parseFloat(value ?? 0);
  return `${amount.toFixed(2)} EUR`;
}

export default function OrderConfirmationEmail({ order }) {
  const customerName = order.shippingName || order.billingName || order.email;

  return (
    <Html>
      <Head />
      <Preview>
        Bestellbestaetigung #{order.id} - TC Holzminden von 1928 e.V.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://www.tc1928.com/tch_logo.png"
            alt="TC Holzminden von 1928 e.V."
            width={250}
            height={66}
            priority
          />

          <Text style={title}>Vielen Dank fuer Ihre Bestellung!</Text>

          <Section style={section}>
            <Text style={text}>Hallo {customerName},</Text>
            <Text style={text}>
              wir haben Ihre Bestellung erfolgreich erhalten. Nachfolgend finden
              Sie alle wichtigen Informationen.
            </Text>
            <Hr style={divider} />
            <Text style={text}>
              <strong>Bestellnummer:</strong> #{order.id}
            </Text>
            <Text style={text}>
              <strong>Datum:</strong> {formatDate(order.createdAt)}
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
          </Section>

          {(order.shippingName ||
            order.shippingStreet ||
            order.shippingPlz ||
            order.shippingCity) && (
            <Section style={section}>
              <Text style={sectionTitle}>Lieferadresse</Text>
              {order.shippingName && <Text style={text}>{order.shippingName}</Text>}
              {order.shippingStreet && (
                <Text style={text}>{order.shippingStreet}</Text>
              )}
              {(order.shippingPlz || order.shippingCity) && (
                <Text style={text}>
                  {order.shippingPlz || ""} {order.shippingCity || ""}
                </Text>
              )}
            </Section>
          )}

          {(order.billingName ||
            order.billingStreet ||
            order.billingPlz ||
            order.billingCity) && (
            <Section style={section}>
              <Text style={sectionTitle}>Rechnungsadresse</Text>
              {order.billingName && <Text style={text}>{order.billingName}</Text>}
              {order.billingStreet && <Text style={text}>{order.billingStreet}</Text>}
              {(order.billingPlz || order.billingCity) && (
                <Text style={text}>
                  {order.billingPlz || ""} {order.billingCity || ""}
                </Text>
              )}
            </Section>
          )}

          <Section style={section}>
            <Text style={sectionTitle}>Ihre Bestellpositionen</Text>
            {order.items?.map((item, index) => {
              const itemName = item.product?.name || "Produkt";
              const itemPrice = Number.parseFloat(item.price ?? 0);
              const lineTotal = itemPrice * Number(item.quantity || 0);

              return (
                <Section key={`${item.productId || itemName}-${index}`}>
                  <Text style={itemTitle}>{itemName}</Text>
                  {item.variant?.size && (
                    <Text style={textSmall}>Groesse: {item.variant.size}</Text>
                  )}
                  <Text style={textSmall}>
                    SKU: {item.variant?.sku || item.product?.sku || "-"}
                  </Text>
                  <Text style={textSmall}>
                    Menge: {item.quantity} x {formatMoney(itemPrice)}
                  </Text>
                  <Text style={textSmall}>
                    Positionssumme: {formatMoney(lineTotal)}
                  </Text>
                  {item.product?.isGroupOrder && (
                    <Text style={groupOrderHint}>
                      Hinweis: Dies ist eine Sammelbestellung. Der finale Preis
                      kann erst nach Abschluss der Sammelphase feststehen.
                    </Text>
                  )}
                  {index < (order.items?.length || 0) - 1 && <Hr style={divider} />}
                </Section>
              );
            })}
            <Hr style={divider} />
            <Text style={totalText}>
              <strong>Gesamtsumme: {formatMoney(order.total)}</strong>
            </Text>
          </Section>

          <Section style={section}>
            <Text style={text}>
              Bei Fragen antworten Sie gerne direkt auf diese E-Mail oder
              schreiben Sie an vorstand@tc1928.com.
            </Text>
            <Text style={text}>
              Freundliche Gruesse
              <br />
              Ihr Team vom TC Holzminden von 1928 e.V.
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

const itemTitle = {
  margin: "0 0 6px 0",
  fontSize: "14px",
  color: "#1f2937",
  fontWeight: "bold",
};

const textSmall = {
  margin: "0 0 5px 0",
  textAlign: "left",
  fontSize: "12px",
  color: "#6a737d",
};

const groupOrderHint = {
  margin: "6px 0 5px 0",
  textAlign: "left",
  fontSize: "12px",
  color: "#92400e",
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
