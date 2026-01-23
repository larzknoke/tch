import LayoutAdmin from "@/components/ui/layouts/layout-admin";
import {
  Button,
  Field,
  Input,
  VStack,
  Textarea,
  Card,
  Center,
  HStack,
  NativeSelect,
  Heading,
  Table,
  IconButton,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { toaster } from "@/components/ui/toaster";
import { useRouter } from "next/router";
import BallLoader from "@/components/ui/loading-ball";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Ungültige E-Mail-Adresse")
      .required("E-Mail ist erforderlich"),
    total: yup
      .number()
      .typeError("Betrag muss eine Zahl sein")
      .required("Betrag ist erforderlich"),
    status: yup.string().required("Status ist erforderlich"),
    payment: yup.string(),
    shippingName: yup.string(),
    shippingStreet: yup.string(),
    shippingPlz: yup.string(),
    shippingCity: yup.string(),
    billingName: yup.string(),
    billingStreet: yup.string(),
    billingPlz: yup.string(),
    billingCity: yup.string(),
  })
  .required();

export default function EditOrder() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(true);
  const [orderItems, setOrderItems] = useState([]);
  const [products, setProducts] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      total: "",
      status: "",
      payment: "",
      shippingName: "",
      shippingStreet: "",
      shippingPlz: "",
      shippingCity: "",
      billingName: "",
      billingStreet: "",
      billingPlz: "",
      billingCity: "",
    },
  });

  useEffect(() => {
    if (id) {
      fetchOrder();
      fetchProducts();
    }
  }, [id]);

  async function fetchOrder() {
    try {
      setLoadingOrder(true);
      const res = await fetch(`/api/admin/orders?id=${id}`);

      if (res.status !== 200) {
        toaster.create({
          description: "Bestellung nicht gefunden",
          type: "error",
        });
        router.push("/admin/orders");
      } else {
        const data = await res.json();
        reset({
          email: data.email || "",
          total: data.total != null ? parseFloat(data.total) : "",
          status: data.status || "",
          payment: data.payment || "",
          shippingName: data.shippingName || "",
          shippingStreet: data.shippingStreet || "",
          shippingPlz: data.shippingPlz || "",
          shippingCity: data.shippingCity || "",
          billingName: data.billingName || "",
          billingStreet: data.billingStreet || "",
          billingPlz: data.billingPlz || "",
          billingCity: data.billingCity || "",
        });
        setOrderItems(data.items || []);
      }
    } catch (error) {
      console.error("Error:", error);
      toaster.create({ description: "Fehler beim Laden", type: "error" });
      router.push("/admin/orders");
    } finally {
      setLoadingOrder(false);
    }
  }

  async function fetchProducts() {
    try {
      const res = await fetch("/api/admin/products");
      if (res.status === 200) {
        const data = await res.json();
        const productsArray = Array.isArray(data) ? data : data.products || [];
        setProducts(productsArray);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  async function onSubmit(values) {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/orders?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          items: orderItems,
        }),
      });

      if (res.status !== 200) {
        const error = await res.json();
        toaster.create({
          description: error.error || "Ein Fehler ist aufgetreten",
          type: "error",
        });
      } else {
        const data = await res.json();
        toaster.create({
          description: `Bestellung #${data.id} aktualisiert`,
          type: "success",
        });
        router.push("/admin/orders");
      }
    } catch (error) {
      console.error("Error:", error);
      toaster.create({
        description: "Ein Fehler ist aufgetreten",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  function addOrderItem() {
    setOrderItems([...orderItems, { productId: "", quantity: 1, price: 0 }]);
  }

  function removeOrderItem(index) {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  }

  function updateOrderItem(index, field, value) {
    const updated = [...orderItems];
    updated[index] = { ...updated[index], [field]: value };

    // Auto-fill price when product is selected
    if (field === "productId") {
      const product = products.find((p) => p.id === parseInt(value));
      if (product) {
        updated[index].price = parseFloat(product.price);
      }
    }

    setOrderItems(updated);
  }

  if (loadingOrder) {
    return (
      <Center py={10}>
        <BallLoader />
      </Center>
    );
  }

  return (
    <Center>
      <Card.Root my={5} maxWidth="6xl" width="full">
        <Card.Header>
          <Card.Title>Bestellung bearbeiten</Card.Title>
        </Card.Header>
        <Card.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={6} alignItems="stretch">
              {/* Kontaktdaten */}
              <Field.Root invalid={!!errors.email}>
                <Field.Label>E-Mail *</Field.Label>
                <Input {...register("email")} />
                {errors.email && (
                  <Field.ErrorText>{errors.email.message}</Field.ErrorText>
                )}
              </Field.Root>

              {/* Bestellstatus und Betrag */}
              <HStack gap={4} alignItems="flex-start">
                <Field.Root invalid={!!errors.total} flex={1}>
                  <Field.Label>Betrag (€) *</Field.Label>
                  <Input
                    {...register("total")}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                  />
                  {errors.total && (
                    <Field.ErrorText>{errors.total.message}</Field.ErrorText>
                  )}
                </Field.Root>

                <Field.Root invalid={!!errors.status} flex={1}>
                  <Field.Label>Status *</Field.Label>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <NativeSelect.Root>
                        <NativeSelect.Field {...field}>
                          <option value="">Bitte wählen</option>
                          <option value="ausstehend">Ausstehend</option>
                          <option value="bezahlt">Bezahlt</option>
                          <option value="versendet">Versendet</option>
                          <option value="abgeschlossen">Abgeschlossen</option>
                          <option value="storniert">Storniert</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                      </NativeSelect.Root>
                    )}
                  />
                  {errors.status && (
                    <Field.ErrorText>{errors.status.message}</Field.ErrorText>
                  )}
                </Field.Root>

                <Field.Root invalid={!!errors.payment} flex={1}>
                  <Field.Label>Zahlungsart</Field.Label>
                  <Controller
                    name="payment"
                    control={control}
                    render={({ field }) => (
                      <NativeSelect.Root>
                        <NativeSelect.Field {...field}>
                          <option value="">Bitte wählen</option>
                          <option value="Barzahlung">Barzahlung</option>
                          <option value="Ueberweisung">Überweisung</option>
                          <option value="PayPal">PayPal</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                      </NativeSelect.Root>
                    )}
                  />
                  {errors.payment && (
                    <Field.ErrorText>{errors.payment.message}</Field.ErrorText>
                  )}
                </Field.Root>
              </HStack>

              {/* Lieferadresse */}
              <div>
                <Heading size="md" mb={3}>
                  Lieferadresse
                </Heading>
                <VStack gap={3} alignItems="stretch">
                  <Field.Root invalid={!!errors.shippingName}>
                    <Field.Label>Name</Field.Label>
                    <Input {...register("shippingName")} />
                    {errors.shippingName && (
                      <Field.ErrorText>
                        {errors.shippingName.message}
                      </Field.ErrorText>
                    )}
                  </Field.Root>

                  <Field.Root invalid={!!errors.shippingStreet}>
                    <Field.Label>Straße</Field.Label>
                    <Input {...register("shippingStreet")} />
                    {errors.shippingStreet && (
                      <Field.ErrorText>
                        {errors.shippingStreet.message}
                      </Field.ErrorText>
                    )}
                  </Field.Root>

                  <HStack gap={3}>
                    <Field.Root invalid={!!errors.shippingPlz} flex={1}>
                      <Field.Label>PLZ</Field.Label>
                      <Input {...register("shippingPlz")} />
                      {errors.shippingPlz && (
                        <Field.ErrorText>
                          {errors.shippingPlz.message}
                        </Field.ErrorText>
                      )}
                    </Field.Root>

                    <Field.Root invalid={!!errors.shippingCity} flex={2}>
                      <Field.Label>Ort</Field.Label>
                      <Input {...register("shippingCity")} />
                      {errors.shippingCity && (
                        <Field.ErrorText>
                          {errors.shippingCity.message}
                        </Field.ErrorText>
                      )}
                    </Field.Root>
                  </HStack>
                </VStack>
              </div>

              {/* Rechnungsadresse */}
              <div>
                <Heading size="md" mb={3}>
                  Rechnungsadresse
                </Heading>
                <VStack gap={3} alignItems="stretch">
                  <Field.Root invalid={!!errors.billingName}>
                    <Field.Label>Name</Field.Label>
                    <Input {...register("billingName")} />
                    {errors.billingName && (
                      <Field.ErrorText>
                        {errors.billingName.message}
                      </Field.ErrorText>
                    )}
                  </Field.Root>

                  <Field.Root invalid={!!errors.billingStreet}>
                    <Field.Label>Straße</Field.Label>
                    <Input {...register("billingStreet")} />
                    {errors.billingStreet && (
                      <Field.ErrorText>
                        {errors.billingStreet.message}
                      </Field.ErrorText>
                    )}
                  </Field.Root>

                  <HStack gap={3}>
                    <Field.Root invalid={!!errors.billingPlz} flex={1}>
                      <Field.Label>PLZ</Field.Label>
                      <Input {...register("billingPlz")} />
                      {errors.billingPlz && (
                        <Field.ErrorText>
                          {errors.billingPlz.message}
                        </Field.ErrorText>
                      )}
                    </Field.Root>

                    <Field.Root invalid={!!errors.billingCity} flex={2}>
                      <Field.Label>Ort</Field.Label>
                      <Input {...register("billingCity")} />
                      {errors.billingCity && (
                        <Field.ErrorText>
                          {errors.billingCity.message}
                        </Field.ErrorText>
                      )}
                    </Field.Root>
                  </HStack>
                </VStack>
              </div>

              {/* Bestellpositionen */}
              <div>
                <HStack justify="space-between" mb={3}>
                  <Heading size="md">Bestellpositionen</Heading>
                  <Button size="sm" onClick={addOrderItem} type="button">
                    Position hinzufügen
                  </Button>
                </HStack>

                {orderItems.length > 0 ? (
                  <Table.Root size="sm">
                    <Table.Header>
                      <Table.Row>
                        <Table.ColumnHeader>Produkt</Table.ColumnHeader>
                        <Table.ColumnHeader>Menge</Table.ColumnHeader>
                        <Table.ColumnHeader>Preis (€)</Table.ColumnHeader>
                        <Table.ColumnHeader>Gesamt (€)</Table.ColumnHeader>
                        <Table.ColumnHeader width="50px"></Table.ColumnHeader>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {orderItems.map((item, index) => (
                        <Table.Row key={index}>
                          <Table.Cell>
                            <NativeSelect.Root size="sm">
                              <NativeSelect.Field
                                value={item.productId || ""}
                                onChange={(e) =>
                                  updateOrderItem(
                                    index,
                                    "productId",
                                    e.target.value,
                                  )
                                }
                              >
                                <option value="">Produkt wählen</option>
                                {Array.isArray(products) &&
                                products.length > 0 ? (
                                  products.map((product) => (
                                    <option key={product.id} value={product.id}>
                                      {product.name}
                                    </option>
                                  ))
                                ) : (
                                  <option disabled>
                                    Keine Produkte verfügbar
                                  </option>
                                )}
                              </NativeSelect.Field>
                              <NativeSelect.Indicator />
                            </NativeSelect.Root>
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              size="sm"
                              type="number"
                              min="1"
                              value={item.quantity || 1}
                              onChange={(e) =>
                                updateOrderItem(
                                  index,
                                  "quantity",
                                  parseInt(e.target.value) || 1,
                                )
                              }
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              size="sm"
                              type="number"
                              step="0.01"
                              value={item.price || 0}
                              onChange={(e) =>
                                updateOrderItem(
                                  index,
                                  "price",
                                  parseFloat(e.target.value) || 0,
                                )
                              }
                            />
                          </Table.Cell>
                          <Table.Cell>
                            {((item.quantity || 1) * (item.price || 0)).toFixed(
                              2,
                            )}
                          </Table.Cell>
                          <Table.Cell>
                            <IconButton
                              size="sm"
                              variant="ghost"
                              colorPalette="red"
                              onClick={() => removeOrderItem(index)}
                              type="button"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </IconButton>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Root>
                ) : (
                  <p>Keine Bestellpositionen</p>
                )}
              </div>

              <HStack gap={3} mt={4}>
                <Button
                  type="submit"
                  colorPalette="blue"
                  loading={loading}
                  loadingText="Wird gespeichert..."
                >
                  Änderungen speichern
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin/orders")}
                  disabled={loading}
                >
                  Abbrechen
                </Button>
              </HStack>
            </VStack>
          </form>
        </Card.Body>
      </Card.Root>
    </Center>
  );
}

EditOrder.getLayout = function getLayout(page) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
