import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 28,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#1f2937",
  },
  title: {
    fontSize: 16,
    color: "#1e3a8a",
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 9,
    color: "#4b5563",
    marginBottom: 14,
  },
  summaryBox: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
    backgroundColor: "#f9fafb",
  },
  summaryText: {
    fontSize: 9,
    marginBottom: 2,
  },
  typeHeader: {
    marginTop: 8,
    marginBottom: 6,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
    fontSize: 12,
    color: "#1e3a8a",
    fontWeight: "bold",
  },
  sizeHeader: {
    marginTop: 6,
    marginBottom: 3,
    fontSize: 10,
    fontWeight: "bold",
    color: "#111827",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    paddingVertical: 3,
  },
  colProduct: {
    width: "45%",
    fontSize: 9,
    paddingRight: 8,
  },
  colSku: {
    width: "40%",
    fontSize: 8,
    color: "#4b5563",
  },
  colQty: {
    width: "15%",
    fontSize: 9,
    textAlign: "right",
    fontWeight: "bold",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#9ca3af",
    borderTopWidth: 1,
    borderTopColor: "#9ca3af",
    paddingVertical: 4,
    marginBottom: 2,
  },
  tableHeaderText: {
    fontSize: 9,
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 18,
    left: 28,
    right: 28,
    fontSize: 8,
    color: "#6b7280",
    textAlign: "center",
  },
  orderSection: {
    marginBottom: 14,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  orderHeading: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1e3a8a",
    marginBottom: 2,
  },
  customerText: {
    fontSize: 9,
    color: "#4b5563",
    marginBottom: 6,
  },
  detailRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    paddingVertical: 3,
  },
  detailColProduct: {
    width: "42%",
    fontSize: 9,
    paddingRight: 6,
  },
  detailColSize: {
    width: "18%",
    fontSize: 9,
    color: "#374151",
    paddingRight: 6,
  },
  detailColSku: {
    width: "28%",
    fontSize: 8,
    color: "#4b5563",
    paddingRight: 6,
  },
  detailColQty: {
    width: "12%",
    fontSize: 9,
    textAlign: "right",
    fontWeight: "bold",
  },
});

function formatDate(date) {
  return new Date(date).toLocaleString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function OrderProductionSummaryPDF({
  generatedAt,
  orderCount,
  totalQuantity,
  grouped,
  ordersDetailed,
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Bestellzusammenfassung Produktion</Text>
        <Text style={styles.subtitle}>TC Holzminden von 1928 e.V.</Text>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryText}>
            Erstellt am: {formatDate(generatedAt)}
          </Text>
          <Text style={styles.summaryText}>
            Beruecksichtigte Bestellungen: {orderCount}
          </Text>
          <Text style={styles.summaryText}>
            Gesamtmenge Positionen: {totalQuantity}
          </Text>
        </View>

        {grouped.map((typeGroup) => (
          <View key={typeGroup.type} wrap={false}>
            <Text style={styles.typeHeader}>
              Typ: {typeGroup.type} (Menge: {typeGroup.totalQuantity})
            </Text>

            {typeGroup.sizes.map((sizeGroup) => (
              <View key={`${typeGroup.type}-${sizeGroup.size}`}>
                <Text style={styles.sizeHeader}>
                  Groesse: {sizeGroup.size} (Menge: {sizeGroup.totalQuantity})
                </Text>

                <View style={styles.tableHeader}>
                  <Text style={[styles.colProduct, styles.tableHeaderText]}>
                    Produkt
                  </Text>
                  <Text style={[styles.colSku, styles.tableHeaderText]}>
                    Artikel-Nr.
                  </Text>
                  <Text style={[styles.colQty, styles.tableHeaderText]}>
                    Menge
                  </Text>
                </View>

                {sizeGroup.items.map((item) => (
                  <View
                    key={`${typeGroup.type}-${sizeGroup.size}-${item.key}`}
                    style={styles.row}
                  >
                    <Text style={styles.colProduct}>{item.productName}</Text>
                    <Text style={styles.colSku}>{item.sku || "-"}</Text>
                    <Text style={styles.colQty}>{item.quantity}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ))}

        <Text style={styles.footer}>
          Produktionsuebersicht fuer alle Bestellungen mit Status "ausstehend".
        </Text>
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Bestellungen im Detail</Text>
        <Text style={styles.subtitle}>Bestellung-ID, Kunde und Positionen</Text>

        {ordersDetailed.map((order) => (
          <View key={order.id} style={styles.orderSection}>
            <Text style={styles.orderHeading}>Bestellung #{order.id}</Text>
            {/* <Text style={styles.customerText}>Kunde: {order.customer}</Text> */}

            <View style={styles.tableHeader}>
              <Text style={[styles.detailColProduct, styles.tableHeaderText]}>
                Produkt
              </Text>
              <Text style={[styles.detailColSize, styles.tableHeaderText]}>
                Groesse
              </Text>
              <Text style={[styles.detailColSku, styles.tableHeaderText]}>
                Artikel-Nr.
              </Text>
              <Text style={[styles.detailColQty, styles.tableHeaderText]}>
                Menge
              </Text>
            </View>

            {order.items.map((item) => (
              <View key={`${order.id}-${item.id}`} style={styles.detailRow}>
                <Text style={styles.detailColProduct}>{item.productName}</Text>
                <Text style={styles.detailColSize}>{item.size}</Text>
                <Text style={styles.detailColSku}>{item.sku}</Text>
                <Text style={styles.detailColQty}>{item.quantity}</Text>
              </View>
            ))}
          </View>
        ))}

        <Text style={styles.footer}>
          Detailansicht der beruecksichtigten Bestellungen.
        </Text>
      </Page>
    </Document>
  );
}
