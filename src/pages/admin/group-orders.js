import LayoutAdmin from "@/components/ui/layouts/layout-admin";
import {
  Badge,
  Button,
  Card,
  Field,
  Input,
  Table,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { toaster } from "@/components/ui/toaster";
import BallLoader from "@/components/ui/loading-ball";

const STATUS_LABELS = {
  open: { label: "Offen", color: "blue" },
  closed: { label: "Geschlossen", color: "orange" },
  priced: { label: "Preis gesetzt", color: "green" },
  fulfilled: { label: "Abgeschlossen", color: "gray" },
  cancelled: { label: "Abgebrochen", color: "red" },
};

export default function GroupOrdersAdmin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceInputs, setPriceInputs] = useState({});
  const [submitting, setSubmitting] = useState({});

  useEffect(() => {
    fetchGroupOrders();
  }, []);

  async function fetchGroupOrders() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/group-orders");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSetPrice(productId) {
    const price = priceInputs[productId];
    if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      toaster.create({
        description: "Bitte einen gültigen Preis eingeben",
        type: "error",
      });
      return;
    }

    setSubmitting((s) => ({ ...s, [productId]: true }));
    try {
      const res = await fetch("/api/admin/group-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, finalPrice: parseFloat(price) }),
      });

      if (res.ok) {
        const data = await res.json();
        toaster.create({
          description: `Preis gesetzt. ${data.updatedOrders} Bestellungen aktualisiert, E-Mails versendet.`,
          type: "success",
        });
        fetchGroupOrders();
      } else {
        const err = await res.json();
        toaster.create({ description: err.error || "Fehler", type: "error" });
      }
    } catch (error) {
      toaster.create({
        description: "Fehler beim Setzen des Preises",
        type: "error",
      });
    } finally {
      setSubmitting((s) => ({ ...s, [productId]: false }));
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <BallLoader />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-tch-blue mb-6">
        Sammelbestellungen
      </h1>

      {products.length === 0 ? (
        <Card.Root p={6}>
          <Text color="gray.500">Keine Sammelbestellungen vorhanden.</Text>
        </Card.Root>
      ) : (
        <VStack gap={6} alignItems="stretch">
          {products.map((product) => {
            const status =
              STATUS_LABELS[product.groupOrderStatus] || STATUS_LABELS.open;
            const canSetPrice =
              product.groupOrderStatus === "open" ||
              product.groupOrderStatus === "closed";

            return (
              <Card.Root key={product.id}>
                <Card.Header>
                  <HStack justify="space-between" alignItems="flex-start">
                    <div>
                      <Text fontWeight="bold" fontSize="lg">
                        {product.name}
                      </Text>
                      {product.groupOrderDeadline && (
                        <Text fontSize="sm" color="gray.500">
                          Bestellschluss:{" "}
                          {new Date(
                            product.groupOrderDeadline,
                          ).toLocaleDateString("de-DE", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Text>
                      )}
                    </div>
                    <Badge colorPalette={status.color}>{status.label}</Badge>
                  </HStack>
                </Card.Header>
                <Card.Body>
                  <HStack mb={4} gap={6}>
                    <div>
                      <Text fontSize="sm" color="gray.500">
                        Bestellungen
                      </Text>
                      <Text fontWeight="bold" fontSize="xl">
                        {product.totalOrdered} Stück
                      </Text>
                    </div>
                    <div>
                      <Text fontSize="sm" color="gray.500">
                        Teilnehmer
                      </Text>
                      <Text fontWeight="bold" fontSize="xl">
                        {product.participantCount}
                      </Text>
                    </div>
                    {product.groupOrderFinalPrice && (
                      <div>
                        <Text fontSize="sm" color="gray.500">
                          Finalpreis
                        </Text>
                        <Text fontWeight="bold" fontSize="xl" color="green.600">
                          {parseFloat(product.groupOrderFinalPrice).toFixed(2)}{" "}
                          €
                        </Text>
                      </div>
                    )}
                  </HStack>

                  {/* Teilnehmerliste */}
                  {product.orderItems && product.orderItems.length > 0 && (
                    <div className="mb-4">
                      <Text fontWeight="semibold" mb={2}>
                        Teilnehmer
                      </Text>
                      <Table.Root size="sm" variant="outline">
                        <Table.Header>
                          <Table.Row>
                            <Table.ColumnHeader>E-Mail</Table.ColumnHeader>
                            <Table.ColumnHeader>Variante</Table.ColumnHeader>
                            <Table.ColumnHeader>Menge</Table.ColumnHeader>
                            <Table.ColumnHeader>
                              Bestellung #
                            </Table.ColumnHeader>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {product.orderItems.map((item) => (
                            <Table.Row key={item.id}>
                              <Table.Cell>{item.order.email}</Table.Cell>
                              <Table.Cell>
                                {item.variant?.size || "—"}
                              </Table.Cell>
                              <Table.Cell>{item.quantity}</Table.Cell>
                              <Table.Cell>#{item.order.id}</Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body>
                      </Table.Root>
                    </div>
                  )}

                  {/* Preis setzen */}
                  {canSetPrice && (
                    <div className="border-t pt-4 mt-4">
                      <Text fontWeight="semibold" mb={2}>
                        Finalpreis setzen
                      </Text>
                      <HStack gap={3}>
                        <Field.Root maxW="200px">
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            value={priceInputs[product.id] || ""}
                            onChange={(e) =>
                              setPriceInputs((p) => ({
                                ...p,
                                [product.id]: e.target.value,
                              }))
                            }
                          />
                        </Field.Root>
                        <Text>€</Text>
                        <Button
                          colorPalette="green"
                          loading={submitting[product.id]}
                          loadingText="Wird gesetzt..."
                          onClick={() => handleSetPrice(product.id)}
                        >
                          Preis bestätigen & E-Mails senden
                        </Button>
                      </HStack>
                    </div>
                  )}
                </Card.Body>
              </Card.Root>
            );
          })}
        </VStack>
      )}
    </div>
  );
}

GroupOrdersAdmin.getLayout = function getLayout(page) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
