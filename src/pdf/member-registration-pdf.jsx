import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  logo: {
    width: 150,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#284879",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#284879",
    borderBottomWidth: 1,
    borderBottomColor: "#dedede",
    paddingBottom: 4,
  },
  row: {
    flexDirection: "row",
    marginBottom: 6,
  },
  label: {
    width: "40%",
    fontWeight: "bold",
    fontSize: 10,
  },
  value: {
    width: "60%",
    fontSize: 10,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 9,
    color: "#666",
    borderTopWidth: 1,
    borderTopColor: "#dedede",
    paddingTop: 10,
  },
  metaInfo: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
  },
  metaText: {
    fontSize: 9,
    color: "#666",
    marginBottom: 3,
  },
});

// Map values to readable labels
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

export const MemberRegistrationPDF = ({ registration }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Mitgliedsantrag</Text>
          <Text style={{ fontSize: 10, color: "#666" }}>
            TC Holzminden von 1928 e.V.
          </Text>
        </View>

        {/* Personal Data */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Persönliche Daten</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Vorname:</Text>
            <Text style={styles.value}>{registration.vorname}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{registration.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Geburtsdatum:</Text>
            <Text style={styles.value}>{registration.geburtsdatum}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Straße:</Text>
            <Text style={styles.value}>{registration.strasse}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>PLZ / Ort:</Text>
            <Text style={styles.value}>
              {registration.plz} {registration.ort}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>E-Mail:</Text>
            <Text style={styles.value}>{registration.email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Telefon:</Text>
            <Text style={styles.value}>{registration.telefon || "—"}</Text>
          </View>
        </View>

        {/* Membership */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mitgliedschaft</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Mitgliedsart:</Text>
            <Text style={styles.value}>
              {mitgliedsartLabels[registration.mitgliedsart] ||
                registration.mitgliedsart}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Status:</Text>
            <Text style={styles.value}>
              {statusLabels[registration.status] || registration.status}
            </Text>
          </View>
        </View>

        {/* SEPA Direct Debit */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SEPA-Lastschriftmandat</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Kontoinhaber:</Text>
            <Text style={styles.value}>
              {registration.sepaVorname} {registration.sepaName}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Straße:</Text>
            <Text style={styles.value}>{registration.sepaStrasse}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>PLZ / Ort:</Text>
            <Text style={styles.value}>
              {registration.sepaPlz} {registration.sepaOrt}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Kreditinstitut:</Text>
            <Text style={styles.value}>{registration.sepaKreditinstitut}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>IBAN:</Text>
            <Text style={styles.value}>{registration.sepaIban}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Zahlungsintervall:</Text>
            <Text style={styles.value}>
              {einzugLabels[registration.sepaEinzug] || registration.sepaEinzug}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Mandat erteilt:</Text>
            <Text style={styles.value}>
              {registration.sepaLastschriftmandat ? "Ja" : "Nein"}
            </Text>
          </View>
        </View>

        {/* Agreements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Zustimmungen</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Datenschutz akzeptiert:</Text>
            <Text style={styles.value}>
              {registration.datenschutz ? "Ja" : "Nein"}
            </Text>
          </View>
        </View>

        {/* Meta Information */}
        <View style={styles.metaInfo}>
          <Text style={styles.metaText}>Antrag-ID: #{registration.id}</Text>
          <Text style={styles.metaText}>
            Status:{" "}
            {registration.verified ? "Bestätigt" : "Wartet auf Bestätigung"}
          </Text>
          <Text style={styles.metaText}>
            Bearbeitet: {registration.processed ? "Ja" : "Nein"}
          </Text>
          <Text style={styles.metaText}>
            Erstellt am: {formatDate(registration.createdAt)}
          </Text>
          {registration.notes && (
            <Text style={styles.metaText}>Notizen: {registration.notes}</Text>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>TC Holzminden von 1928 e.V.</Text>
          <Text>vorstand@tc1928.com • www.tc1928.com</Text>
        </View>
      </Page>
    </Document>
  );
};
