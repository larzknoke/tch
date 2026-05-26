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
  Switch,
  IconButton,
  NativeSelect,
} from "@chakra-ui/react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { toaster } from "@/components/ui/toaster";
import { useRouter } from "next/router";
import BallLoader from "@/components/ui/loading-ball";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { normalizeSku } from "@/lib/utils";
import { PRODUCT_TYPE_OPTIONS, AUDIENCE_OPTIONS } from "@/lib/product-taxonomy";

const schema = yup
  .object({
    name: yup.string().required("Name ist erforderlich"),
    description: yup.string(),
    price: yup
      .number()
      .typeError("Preis muss eine Zahl sein")
      .positive("Preis muss positiv sein")
      .required("Preis ist erforderlich"),
    stock: yup
      .number()
      .typeError("Lager muss eine Zahl sein")
      .integer("Lager muss eine ganze Zahl sein")
      .min(0, "Lager kann nicht negativ sein")
      .required("Lager ist erforderlich"),
    sku: yup.string(),
    image: yup.string(),
    productType: yup.string().oneOf(["", ...PRODUCT_TYPE_OPTIONS.map((o) => o.value)]),
    audiences: yup.array().of(yup.string().oneOf(AUDIENCE_OPTIONS.map((o) => o.value))),
    active: yup.boolean().required(),
    hasVariants: yup.boolean().required(),
    isGroupOrder: yup.boolean().required(),
    groupOrderDeadline: yup.string(),
    variants: yup.array().of(
      yup.object({
        size: yup.string().required("Größe ist erforderlich"),
        stock: yup
          .number()
          .typeError("Lager muss eine Zahl sein")
          .integer("Lager muss eine ganze Zahl sein")
          .min(0, "Lager kann nicht negativ sein")
          .required("Lager ist erforderlich"),
        sku: yup.string(),
      }),
    ),
  })
  .required();

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      stock: 0,
      sku: "",
      image: "",
      productType: "",
      audiences: [],
      active: true,
      hasVariants: false,
      isGroupOrder: false,
      groupOrderDeadline: "",
      variants: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const hasVariants = watch("hasVariants");
  const isGroupOrder = watch("isGroupOrder");

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  async function fetchProduct() {
    try {
      setLoadingProduct(true);
      const res = await fetch(`/api/admin/products?id=${id}`);

      if (res.status !== 200) {
        toaster.create({
          description: "Produkt nicht gefunden",
          type: "error",
        });
        router.push("/admin/products");
      } else {
        const data = await res.json();
        reset({
          name: data.name,
          description: data.description || "",
          price: parseFloat(data.price),
          stock: data.stock,
          sku: data.sku || "",
          image: data.image || "",
          productType: data.productType || "",
          audiences: data.audiences || [],
          active: data.active,
          hasVariants: data.hasVariants || false,
          isGroupOrder: data.isGroupOrder || false,
          groupOrderDeadline: data.groupOrderDeadline
            ? new Date(data.groupOrderDeadline).toISOString().slice(0, 16)
            : "",
          variants: data.variants || [],
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toaster.create({
        description: "Fehler beim Laden",
        type: "error",
      });
    } finally {
      setLoadingProduct(false);
    }
  }

  async function onSubmit(values) {
    try {
      setLoading(true);

      // Transform SKU to uppercase and replace spaces with dashes
      const transformedValues = {
        ...values,
        productType: values.productType || null,
        audiences: values.audiences || [],
        sku: normalizeSku(values.sku),
        variants:
          values.variants?.map((variant) => ({
            ...variant,
            sku: normalizeSku(variant.sku),
          })) || [],
      };

      const res = await fetch(`/api/admin/products?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transformedValues),
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
          description: `Produkt "${data.name}" aktualisiert`,
          type: "success",
        });
        router.push("/admin/products");
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

  if (loadingProduct) {
    return (
      <Center py={10}>
        <BallLoader />
      </Center>
    );
  }

  return (
    <Center>
      <Card.Root my={5} maxWidth="4xl" width="full">
        <Card.Header>
          <Card.Title>Produkt bearbeiten</Card.Title>
        </Card.Header>
        <Card.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={4} alignItems="stretch">
              <Field.Root invalid={!!errors.name}>
                <Field.Label>Name *</Field.Label>
                <Input {...register("name")} />
                {errors.name && (
                  <Field.ErrorText>{errors.name.message}</Field.ErrorText>
                )}
              </Field.Root>

              <Field.Root invalid={!!errors.description}>
                <Field.Label>Beschreibung</Field.Label>
                <Textarea {...register("description")} rows={4} />
                {errors.description && (
                  <Field.ErrorText>
                    {errors.description.message}
                  </Field.ErrorText>
                )}
              </Field.Root>

              <HStack gap={4} alignItems="flex-start">
                <Field.Root invalid={!!errors.price} flex={1}>
                  <Field.Label>Preis (€) *</Field.Label>
                  <Input
                    {...register("price")}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                  />
                  {errors.price && (
                    <Field.ErrorText>{errors.price.message}</Field.ErrorText>
                  )}
                </Field.Root>

                <Field.Root invalid={!!errors.stock} flex={1}>
                  <Field.Label>Lagerbestand *</Field.Label>
                  <Input {...register("stock")} type="number" placeholder="0" />
                  {errors.stock && (
                    <Field.ErrorText>{errors.stock.message}</Field.ErrorText>
                  )}
                </Field.Root>
              </HStack>

              <Field.Root invalid={!!errors.sku}>
                <Field.Label>SKU / Artikelnummer</Field.Label>
                <Input {...register("sku")} placeholder="z.B. TCH-001" />
                {errors.sku && (
                  <Field.ErrorText>{errors.sku.message}</Field.ErrorText>
                )}
              </Field.Root>

              <Field.Root invalid={!!errors.image}>
                <Field.Label>Bild URL</Field.Label>
                <Input
                  {...register("image")}
                  placeholder="https://example.com/image.jpg"
                />
                <Field.HelperText>
                  Geben Sie die vollständige URL zum Produktbild ein
                </Field.HelperText>
                {errors.image && (
                  <Field.ErrorText>{errors.image.message}</Field.ErrorText>
                )}
              </Field.Root>

              <Field.Root invalid={!!errors.productType}>
                <Field.Label>Produktart</Field.Label>
                <Controller
                  name="productType"
                  control={control}
                  render={({ field }) => (
                    <NativeSelect.Root>
                      <NativeSelect.Field
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                      >
                        <option value="">Bitte auswählen</option>
                        {PRODUCT_TYPE_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  )}
                />
                {errors.productType && (
                  <Field.ErrorText>{errors.productType.message}</Field.ErrorText>
                )}
              </Field.Root>

              <Field.Root invalid={!!errors.audiences}>
                <Field.Label>Geschlecht / Zielgruppe (Tags)</Field.Label>
                <Controller
                  name="audiences"
                  control={control}
                  render={({ field }) => {
                    const values = Array.isArray(field.value) ? field.value : [];

                    return (
                      <HStack wrap="wrap" gap={3} align="start">
                        {AUDIENCE_OPTIONS.map((option) => (
                          <label
                            key={option.value}
                            className="inline-flex items-center gap-2 rounded border border-gray-200 px-3 py-2"
                          >
                            <input
                              type="checkbox"
                              checked={values.includes(option.value)}
                              onChange={(event) => {
                                if (event.target.checked) {
                                  field.onChange(
                                    Array.from(new Set([...values, option.value])),
                                  );
                                  return;
                                }
                                field.onChange(
                                  values.filter((value) => value !== option.value),
                                );
                              }}
                            />
                            <span>{option.label}</span>
                          </label>
                        ))}
                      </HStack>
                    );
                  }}
                />
                <Field.HelperText>
                  Mehrfachauswahl möglich, z.B. Unisex + Jugend.
                </Field.HelperText>
                {errors.audiences && (
                  <Field.ErrorText>{errors.audiences.message}</Field.ErrorText>
                )}
              </Field.Root>

              <Field.Root>
                <Controller
                  name="isGroupOrder"
                  control={control}
                  render={({ field }) => (
                    <Switch.Root
                      checked={field.value}
                      onCheckedChange={(e) => field.onChange(e.checked)}
                    >
                      <Switch.HiddenInput />
                      <Switch.Control />
                      <Switch.Label>Sammelbestellung</Switch.Label>
                    </Switch.Root>
                  )}
                />
                <Field.HelperText>
                  Preis wird erst nach Bestellschluss vom Produzenten festgelegt
                </Field.HelperText>
              </Field.Root>

              {isGroupOrder && (
                <Field.Root invalid={!!errors.groupOrderDeadline}>
                  <Field.Label>Bestellschluss</Field.Label>
                  <Input
                    {...register("groupOrderDeadline")}
                    type="datetime-local"
                  />
                  {errors.groupOrderDeadline && (
                    <Field.ErrorText>
                      {errors.groupOrderDeadline.message}
                    </Field.ErrorText>
                  )}
                </Field.Root>
              )}

              <Field.Root>
                <Controller
                  name="active"
                  control={control}
                  render={({ field }) => (
                    <Switch.Root
                      checked={field.value}
                      onCheckedChange={(e) => field.onChange(e.checked)}
                    >
                      <Switch.HiddenInput />
                      <Switch.Control />
                      <Switch.Label>Produkt aktiv</Switch.Label>
                    </Switch.Root>
                  )}
                />
              </Field.Root>

              <Field.Root>
                <Controller
                  name="hasVariants"
                  control={control}
                  render={({ field }) => (
                    <Switch.Root
                      checked={field.value}
                      onCheckedChange={(e) => field.onChange(e.checked)}
                    >
                      <Switch.HiddenInput />
                      <Switch.Control />
                      <Switch.Label>Hat Varianten (z.B. Größen)</Switch.Label>
                    </Switch.Root>
                  )}
                />
                <Field.HelperText>
                  Aktivieren Sie dies für Produkte mit Größen oder anderen
                  Varianten
                </Field.HelperText>
              </Field.Root>

              {hasVariants && (
                <Field.Root>
                  <HStack justify="space-between" mb={2}>
                    <Field.Label>Varianten</Field.Label>
                    <Button
                      size="sm"
                      onClick={() => append({ size: "", stock: 0, sku: "" })}
                      colorPalette="blue"
                      variant="outline"
                    >
                      <PlusIcon className="h-4 w-4 mr-1" />
                      Variante hinzufügen
                    </Button>
                  </HStack>

                  <VStack gap={3} alignItems="stretch">
                    {fields.map((field, index) => (
                      <Card.Root key={field.id} p={3} bg="gray.50">
                        <HStack gap={3} alignItems="flex-start">
                          <Field.Root
                            invalid={!!errors.variants?.[index]?.size}
                            flex={1}
                          >
                            <Field.Label>Größe *</Field.Label>
                            <Input
                              {...register(`variants.${index}.size`)}
                              placeholder="z.B. M, L, XL"
                            />
                            {errors.variants?.[index]?.size && (
                              <Field.ErrorText>
                                {errors.variants[index].size.message}
                              </Field.ErrorText>
                            )}
                          </Field.Root>

                          <Field.Root
                            invalid={!!errors.variants?.[index]?.stock}
                            flex={1}
                          >
                            <Field.Label>Lager *</Field.Label>
                            <Input
                              {...register(`variants.${index}.stock`)}
                              type="number"
                              placeholder="0"
                            />
                            {errors.variants?.[index]?.stock && (
                              <Field.ErrorText>
                                {errors.variants[index].stock.message}
                              </Field.ErrorText>
                            )}
                          </Field.Root>

                          <Field.Root
                            invalid={!!errors.variants?.[index]?.sku}
                            flex={1}
                          >
                            <Field.Label>SKU</Field.Label>
                            <Input
                              {...register(`variants.${index}.sku`)}
                              placeholder="TCH-001-M"
                            />
                            {errors.variants?.[index]?.sku && (
                              <Field.ErrorText>
                                {errors.variants[index].sku.message}
                              </Field.ErrorText>
                            )}
                          </Field.Root>

                          <IconButton
                            aria-label="Variante entfernen"
                            onClick={() => remove(index)}
                            colorPalette="red"
                            variant="ghost"
                            size="sm"
                            mt={7}
                          >
                            <TrashIcon className="h-5 w-5" />
                          </IconButton>
                        </HStack>
                      </Card.Root>
                    ))}
                    {fields.length === 0 && (
                      <Card.Root p={4} bg="gray.50">
                        <p className="text-sm text-gray-600 text-center">
                          Keine Varianten vorhanden. Klicken Sie auf "Variante
                          hinzufügen".
                        </p>
                      </Card.Root>
                    )}
                  </VStack>
                </Field.Root>
              )}

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
                  onClick={() => router.push("/admin/products")}
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

EditProduct.getLayout = function getLayout(page) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
