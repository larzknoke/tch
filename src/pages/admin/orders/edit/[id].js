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
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { toaster } from "@/components/ui/toaster";
import { useRouter } from "next/router";
import BallLoader from "@/components/ui/loading-ball";

const schema = yup
  .object({
    customer_name: yup.string().required("Kundenname ist erforderlich"),
    email: yup
      .string()
      .email("Ungültige E-Mail-Adresse")
      .required("E-Mail ist erforderlich"),
    total: yup
      .number()
      .typeError("Betrag muss eine Zahl sein")
      .required("Betrag ist erforderlich"),
    status: yup.string().required("Status ist erforderlich"),
    shipping_address: yup.string(),
    notes: yup.string(),
  })
  .required();

export default function EditOrder() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      customer_name: "",
      email: "",
      total: "",
      status: "",
      shipping_address: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (id) fetchOrder();
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
          customer_name: data.customer?.name || data.customer_name || "",
          email: data.customer?.email || data.email || "",
          total: data.total != null ? parseFloat(data.total) : "",
          status: data.status || "",
          shipping_address: data.shippingAddress || data.shipping_address || "",
          notes: data.notes || "",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toaster.create({ description: "Fehler beim Laden", type: "error" });
      router.push("/admin/orders");
    } finally {
      setLoadingOrder(false);
    }
  }

  async function onSubmit(values) {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/orders?id=${id}`, {
        method: "PUT",
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

  if (loadingOrder) {
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
          <Card.Title>Bestellung bearbeiten</Card.Title>
        </Card.Header>
        <Card.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={4} alignItems="stretch">
              <Field.Root invalid={!!errors.customer_name}>
                <Field.Label>Kundenname *</Field.Label>
                <Input {...register("customer_name")} />
                {errors.customer_name && (
                  <Field.ErrorText>
                    {errors.customer_name.message}
                  </Field.ErrorText>
                )}
              </Field.Root>

              <Field.Root invalid={!!errors.email}>
                <Field.Label>E-Mail *</Field.Label>
                <Input {...register("email")} />
                {errors.email && (
                  <Field.ErrorText>{errors.email.message}</Field.ErrorText>
                )}
              </Field.Root>

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
                          <option value="pending">Ausstehend</option>
                          <option value="paid">Bezahlt</option>
                          <option value="shipped">Versendet</option>
                          <option value="completed">Abgeschlossen</option>
                          <option value="cancelled">Storniert</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                      </NativeSelect.Root>
                    )}
                  />
                  {errors.status && (
                    <Field.ErrorText>{errors.status.message}</Field.ErrorText>
                  )}
                </Field.Root>
              </HStack>

              <Field.Root invalid={!!errors.shipping_address}>
                <Field.Label>Lieferadresse</Field.Label>
                <Textarea {...register("shipping_address")} rows={3} />
                {errors.shipping_address && (
                  <Field.ErrorText>
                    {errors.shipping_address.message}
                  </Field.ErrorText>
                )}
              </Field.Root>

              <Field.Root invalid={!!errors.notes}>
                <Field.Label>Notizen</Field.Label>
                <Textarea {...register("notes")} rows={3} />
                {errors.notes && (
                  <Field.ErrorText>{errors.notes.message}</Field.ErrorText>
                )}
              </Field.Root>

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
