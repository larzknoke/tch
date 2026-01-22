import LayoutAdmin from "@/components/ui/layouts/layout-admin";
import { Tooltip } from "@/components/ui/tooltip";
import { HStack, VStack, Table, Button, Badge } from "@chakra-ui/react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { toaster } from "@/components/ui/toaster";
import Link from "next/link";
import BallLoader from "@/components/ui/loading-ball";

export default function ProductsAdmin() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getProducts() {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/products`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (res.status !== 200) {
        toaster.create({
          description: "Fehler beim Laden der Produkte",
          type: "error",
        });
        setLoading(false);
      } else {
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      toaster.create({
        description: "Fehler beim Laden der Produkte",
        type: "error",
      });
      setLoading(false);
    }
  }

  async function deleteProduct(id, name) {
    if (!confirm(`Produkt "${name}" wirklich löschen?`)) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, {
        method: "DELETE",
      });

      if (res.status !== 200) {
        toaster.create({
          description: "Fehler beim Löschen",
          type: "error",
        });
      } else {
        toaster.create({
          description: `Produkt "${name}" gelöscht`,
          type: "success",
        });
        getProducts();
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
    getProducts();
  }, []);

  return (
    <VStack py={5} gap={5} placeItems="flex-start">
      <HStack>
        <Link href="/admin/products/create">
          <Button colorPalette="blue">Neues Produkt</Button>
        </Link>
      </HStack>

      {products && !loading ? (
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>ID</Table.ColumnHeader>
              <Table.ColumnHeader>Name</Table.ColumnHeader>
              <Table.ColumnHeader>SKU</Table.ColumnHeader>
              <Table.ColumnHeader>Preis</Table.ColumnHeader>
              <Table.ColumnHeader>Lager</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader>Aktionen</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {products.map((product) => (
              <Table.Row key={product.id}>
                <Table.Cell>{product.id}</Table.Cell>
                <Table.Cell>{product.name}</Table.Cell>
                <Table.Cell>{product.sku || "-"}</Table.Cell>
                <Table.Cell>
                  {parseFloat(product.price).toFixed(2)} €
                </Table.Cell>
                <Table.Cell>
                  <Badge colorPalette={product.stock > 0 ? "green" : "red"}>
                    {product.stock}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Badge colorPalette={product.active ? "green" : "gray"}>
                    {product.active ? "Aktiv" : "Inaktiv"}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <HStack>
                    <Link href={`/admin/products/edit/${product.id}`}>
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
                        onClick={() => deleteProduct(product.id, product.name)}
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

ProductsAdmin.getLayout = function getLayout(page) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
