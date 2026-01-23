import LayoutAdmin from "@/components/ui/layouts/layout-admin";
import { Tooltip } from "@/components/ui/tooltip";
import {
  HStack,
  VStack,
  Table,
  Button,
  Badge,
  Box,
  Text,
  Dialog,
  Portal,
  CloseButton,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { toaster } from "@/components/ui/toaster";
import Link from "next/link";
import BallLoader from "@/components/ui/loading-ball";

export default function OrdersAdmin() {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  async function getOrders() {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/orders`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (res.status !== 200) {
        toaster.create({
          description: "Fehler beim Laden der Bestellungen",
          type: "error",
        });
        setLoading(false);
      } else {
        const data = await res.json();
        setOrders(data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      toaster.create({
        description: "Fehler beim Laden der Bestellungen",
        type: "error",
      });
      setLoading(false);
    }
  }

  async function deleteOrder(id) {
    if (!confirm(`Bestellung #${id} wirklich löschen?`)) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/orders?id=${id}`, {
        method: "DELETE",
      });

      if (res.status !== 200) {
        toaster.create({
          description: "Fehler beim Löschen",
          type: "error",
        });
      } else {
        toaster.create({
          description: `Bestellung #${id} gelöscht`,
          type: "success",
        });
        getOrders();
      }
    } catch (error) {
      console.error("Error:", error);
      toaster.create({
        description: "Fehler beim Löschen",
        type: "error",
      });
    }
    setLoading(false);
  }

  useEffect(() => {
    getOrders();
  }, []);

  function statusColor(status) {
    if (!status) return "gray";
    const s = String(status).toLowerCase();
    if (s === "paid" || s === "completed" || s === "shipped") return "green";
    if (s === "cancelled" || s === "canceled" || s === "refunded") return "red";
    return "gray";
  }

  return (
    <VStack py={5} gap={5} placeItems="flex-start">
      <HStack>
        <Link href="/admin/orders/create">
          <Button colorPalette="blue">Neue Bestellung</Button>
        </Link>
      </HStack>

      {orders && !loading ? (
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>ID</Table.ColumnHeader>
              <Table.ColumnHeader>Kunde</Table.ColumnHeader>
              <Table.ColumnHeader>Betrag</Table.ColumnHeader>
              <Table.ColumnHeader>Positionen</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader>Datum</Table.ColumnHeader>
              <Table.ColumnHeader>Aktionen</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {orders.map((order) => (
              <Table.Row
                key={order.id}
                onClick={() => {
                  setSelectedOrder(order);
                  setIsDialogOpen(true);
                }}
                style={{ cursor: "pointer" }}
                _hover={{ bg: "gray.50" }}
              >
                <Table.Cell>{order.id}</Table.Cell>
                <Table.Cell>
                  {order.user?.name || order.shippingName || order.email || "-"}
                </Table.Cell>
                <Table.Cell>
                  {order.total != null
                    ? parseFloat(order.total).toFixed(2) + " €"
                    : "-"}
                </Table.Cell>
                <Table.Cell>
                  {order.items?.length ?? order.itemCount ?? "-"}
                </Table.Cell>
                <Table.Cell>
                  <Badge colorPalette={statusColor(order.status)}>
                    {order.status ? String(order.status) : "-"}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString()
                    : "-"}
                </Table.Cell>
                <Table.Cell onClick={(e) => e.stopPropagation()}>
                  <HStack>
                    <Link href={`/admin/orders/edit/${order.id}`}>
                      <Tooltip content="Bearbeiten">
                        <Button size="sm" variant="ghost">
                          <PencilSquareIcon className="h-5 w-5" />
                        </Button>
                      </Tooltip>
                    </Link>
                    <Tooltip content="Löschen">
                      <Button
                        size="sm"
                        variant="ghost"
                        colorPalette="red"
                        onClick={() => deleteOrder(order.id)}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </Button>
                    </Tooltip>
                  </HStack>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      ) : (
        <BallLoader />
      )}

      <Dialog.Root
        open={isDialogOpen}
        onOpenChange={(e) => setIsDialogOpen(e.open)}
        size="xl"
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Bestellung #{selectedOrder?.id}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                {selectedOrder && (
                  <VStack gap={10} align="stretch">
                    <Grid templateColumns="repeat(2, 1fr)" gap={10}>
                      <GridItem>
                        <Box>
                          <Text
                            fontWeight="bold"
                            mb={2}
                            className="text-tch-blue uppercase text-sm"
                          >
                            Kundeninformationen
                          </Text>
                          <VStack align="stretch" gap={0} fontSize="sm">
                            <Text>
                              <strong>Name:</strong>{" "}
                              {selectedOrder.user?.name ||
                                selectedOrder.shippingName ||
                                "-"}
                            </Text>
                            <Text>
                              <strong>E-Mail:</strong>{" "}
                              {selectedOrder.email || "-"}
                            </Text>
                          </VStack>
                        </Box>
                      </GridItem>

                      <GridItem>
                        <Box>
                          <Text
                            fontWeight="bold"
                            mb={2}
                            className="text-tch-blue uppercase text-sm"
                          >
                            Bestelldetails
                          </Text>
                          <VStack align="stretch" gap={0} fontSize="sm">
                            <Text>
                              <strong>Status:</strong>{" "}
                              <Badge
                                colorPalette={statusColor(selectedOrder.status)}
                              >
                                {selectedOrder.status || "-"}
                              </Badge>
                            </Text>
                            <Text>
                              <strong>Datum:</strong>{" "}
                              {selectedOrder.createdAt
                                ? new Date(
                                    selectedOrder.createdAt,
                                  ).toLocaleString()
                                : "-"}
                            </Text>
                            <Text>
                              <strong>Zahlungsmethode:</strong>{" "}
                              {selectedOrder.payment || "-"}
                            </Text>
                          </VStack>
                        </Box>
                      </GridItem>

                      {(selectedOrder.shippingStreet ||
                        selectedOrder.shippingCity) && (
                        <GridItem>
                          <Box>
                            <Text
                              fontWeight="bold"
                              mb={2}
                              className="text-tch-blue uppercase text-sm"
                            >
                              Lieferadresse
                            </Text>
                            <VStack align="stretch" gap={0} fontSize="sm">
                              {selectedOrder.shippingName && (
                                <Text>{selectedOrder.shippingName}</Text>
                              )}
                              {selectedOrder.shippingStreet && (
                                <Text>{selectedOrder.shippingStreet}</Text>
                              )}
                              {(selectedOrder.shippingPlz ||
                                selectedOrder.shippingCity) && (
                                <Text>
                                  {selectedOrder.shippingPlz}{" "}
                                  {selectedOrder.shippingCity}
                                </Text>
                              )}
                            </VStack>
                          </Box>
                        </GridItem>
                      )}

                      {(selectedOrder.billingStreet ||
                        selectedOrder.billingCity) && (
                        <GridItem>
                          <Box>
                            <Text
                              fontWeight="bold"
                              mb={2}
                              className="text-tch-blue uppercase text-sm"
                            >
                              Rechnungsadresse
                            </Text>
                            <VStack align="stretch" gap={0} fontSize="sm">
                              {selectedOrder.billingName && (
                                <Text>{selectedOrder.billingName}</Text>
                              )}
                              {selectedOrder.billingStreet && (
                                <Text>{selectedOrder.billingStreet}</Text>
                              )}
                              {(selectedOrder.billingPlz ||
                                selectedOrder.billingCity) && (
                                <Text>
                                  {selectedOrder.billingPlz}{" "}
                                  {selectedOrder.billingCity}
                                </Text>
                              )}
                            </VStack>
                          </Box>
                        </GridItem>
                      )}
                    </Grid>

                    {selectedOrder.items && selectedOrder.items.length > 0 && (
                      <Box>
                        <Text fontWeight="bold" mb={2}>
                          Bestellpositionen
                        </Text>
                        <Table.Root size="sm">
                          <Table.Header>
                            <Table.Row>
                              <Table.ColumnHeader>Produkt</Table.ColumnHeader>
                              <Table.ColumnHeader>Variante</Table.ColumnHeader>
                              <Table.ColumnHeader>Menge</Table.ColumnHeader>
                              <Table.ColumnHeader textAlign={"end"}>
                                Preis
                              </Table.ColumnHeader>
                              <Table.ColumnHeader textAlign={"end"}>
                                Gesamt
                              </Table.ColumnHeader>
                            </Table.Row>
                          </Table.Header>
                          <Table.Body>
                            {selectedOrder.items.map((item) => (
                              <Table.Row key={item.id}>
                                <Table.Cell>
                                  {item.product?.name || "-"}
                                </Table.Cell>
                                <Table.Cell>
                                  {item.product?.sku ? (
                                    <Text fontSize="xs">
                                      {item.variant
                                        ? `SKU: ${item.variant.sku} / `
                                        : `SKU: ${item.product.sku}`}
                                      {item.variant?.size
                                        ? `Größe: ${item.variant.size}`
                                        : ""}
                                    </Text>
                                  ) : (
                                    "-"
                                  )}
                                </Table.Cell>
                                <Table.Cell>{item.quantity}</Table.Cell>
                                <Table.Cell textAlign={"end"}>
                                  {item.price != null
                                    ? parseFloat(item.price).toFixed(2) + " €"
                                    : "-"}
                                </Table.Cell>
                                <Table.Cell textAlign={"end"}>
                                  {item.price != null && item.quantity
                                    ? (
                                        parseFloat(item.price) * item.quantity
                                      ).toFixed(2) + " €"
                                    : "-"}
                                </Table.Cell>
                              </Table.Row>
                            ))}
                          </Table.Body>
                        </Table.Root>
                      </Box>
                    )}

                    <Box borderTop="1px" borderColor="gray.200" pt={4}>
                      <HStack
                        justify="space-between"
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        <Text>Gesamtbetrag:</Text>
                        <Text>
                          {selectedOrder.total != null
                            ? parseFloat(selectedOrder.total).toFixed(2) + " €"
                            : "-"}
                        </Text>
                      </HStack>
                    </Box>
                  </VStack>
                )}
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Schließen
                  </Button>
                </Dialog.ActionTrigger>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </VStack>
  );
}

OrdersAdmin.getLayout = function getLayout(page) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
