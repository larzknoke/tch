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
} from "@chakra-ui/react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { toaster } from "@/components/ui/toaster";
import { useRouter } from "next/router";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

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
    // image: yup.string().url("Bitte geben Sie eine gültige URL ein"),
    image: yup.string(),
    active: yup.boolean().required(),
    hasVariants: yup.boolean().required(),
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

export default function CreateProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
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
      active: true,
      hasVariants: false,
      variants: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const hasVariants = watch("hasVariants");

  async function onSubmit(values) {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
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
          description: `Produkt "${data.name}" erstellt`,
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

  return (
    <Center>
      <Card.Root my={5} maxWidth="4xl" width="full">
        <Card.Header>
          <Card.Title>Neues Produkt erstellen</Card.Title>
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
                <Field.Label>SKU</Field.Label>
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
                  loadingText="Wird erstellt..."
                >
                  Produkt erstellen
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

CreateProduct.getLayout = function getLayout(page) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
