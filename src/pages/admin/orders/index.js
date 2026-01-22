import LayoutAdmin from "@/components/ui/layouts/layout-admin";
import { Tooltip } from "@/components/ui/tooltip";
import { HStack, VStack, Table, Button, Badge } from "@chakra-ui/react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { toaster } from "@/components/ui/toaster";
import Link from "next/link";
import BallLoader from "@/components/ui/loading-ball";

export default function OrdersAdmin() {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);

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
              <Table.Row key={order.id}>
                <Table.Cell>{order.id}</Table.Cell>
                <Table.Cell>
                  {order.customer?.name ||
                    order.customer_name ||
                    order.email ||
                    "-"}
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
                <Table.Cell>
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
    </VStack>
  );
}

OrdersAdmin.getLayout = function getLayout(page) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
