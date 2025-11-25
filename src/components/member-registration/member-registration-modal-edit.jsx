import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  VStack,
  Field,
  Input,
  Checkbox,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { toaster } from "@/components/ui/toaster";
import { useState, useEffect } from "react";

export function MemberRegistrationModalEdit({
  registration,
  open,
  setOpen,
  getRegistrations,
}) {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, control, reset } = useForm({
    mode: "onSubmit",
    defaultValues: {
      processed: false,
      notes: "",
    },
  });

  useEffect(() => {
    if (registration && open) {
      reset({
        processed: registration.processed || false,
        notes: registration.notes || "",
      });
    }
  }, [registration, open, reset]);

  async function onSubmit(values) {
    try {
      setLoading(true);
      const res = await fetch(
        "/api/memberRegistrations?id=" + registration.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (res.status !== 200) {
        toaster.create({
          description: "Ein Fehler ist aufgetreten",
          type: "error",
        });
      } else {
        toaster.create({
          description: "Antrag aktualisiert",
          type: "success",
        });
        setOpen(false);
        getRegistrations();
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

  if (!registration) return null;

  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)} size="xl">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Mitgliedsantrag bearbeiten</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <VStack gap={4} align="stretch">
                {/* Display member info (read-only) */}
                <VStack
                  align="stretch"
                  gap={2}
                  p={4}
                  bg="gray.50"
                  borderRadius="md"
                >
                  <Text fontWeight="bold">Antragsteller</Text>
                  <Text fontSize="sm">
                    <strong>Name:</strong> {registration.vorname}{" "}
                    {registration.name}
                  </Text>
                  <Text fontSize="sm">
                    <strong>Email:</strong> {registration.email}
                  </Text>
                  <Text fontSize="sm">
                    <strong>Telefon:</strong> {registration.telefon || "—"}
                  </Text>
                  <Text fontSize="sm">
                    <strong>Adresse:</strong> {registration.strasse},{" "}
                    {registration.plz} {registration.ort}
                  </Text>
                  <Text fontSize="sm">
                    <strong>Geburtsdatum:</strong> {registration.geburtsdatum}
                  </Text>
                  <Text fontSize="sm">
                    <strong>Mitgliedsart:</strong> {registration.mitgliedsart}
                  </Text>
                  <Text fontSize="sm">
                    <strong>Status:</strong> {registration.status}
                  </Text>
                </VStack>

                <VStack
                  align="stretch"
                  gap={2}
                  p={4}
                  bg="gray.50"
                  borderRadius="md"
                >
                  <Text fontWeight="bold">SEPA-Lastschriftmandat</Text>
                  <Text fontSize="sm">
                    <strong>Kontoinhaber:</strong> {registration.sepaVorname}{" "}
                    {registration.sepaName}
                  </Text>
                  <Text fontSize="sm">
                    <strong>IBAN:</strong> {registration.sepaIban}
                  </Text>
                  <Text fontSize="sm">
                    <strong>Kreditinstitut:</strong>{" "}
                    {registration.sepaKreditinstitut}
                  </Text>
                  <Text fontSize="sm">
                    <strong>Einzug:</strong> {registration.sepaEinzug}
                  </Text>
                </VStack>

                <form
                  id="edit-registration-form"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <VStack gap={4}>
                    <Field.Root>
                      <Controller
                        control={control}
                        name="processed"
                        render={({ field }) => (
                          <Checkbox.Root
                            checked={field.value}
                            onCheckedChange={({ checked }) =>
                              field.onChange(checked)
                            }
                          >
                            <Checkbox.HiddenInput />
                            <Checkbox.Control />
                            <Checkbox.Label>
                              Als bearbeitet markieren
                            </Checkbox.Label>
                          </Checkbox.Root>
                        )}
                      />
                    </Field.Root>

                    <Field.Root>
                      <Field.Label>Notizen (intern)</Field.Label>
                      <Input
                        {...register("notes")}
                        placeholder="Interne Notizen..."
                      />
                    </Field.Root>
                  </VStack>
                </form>
              </VStack>
            </Dialog.Body>
            <Dialog.Footer className="flex flex-col md:flex-row gap-3">
              <Dialog.ActionTrigger asChild>
                <Button
                  variant="outline"
                  disabled={loading}
                  className="w-full md:w-auto"
                >
                  Abbrechen
                </Button>
              </Dialog.ActionTrigger>
              <Button
                className="w-full md:w-auto"
                loading={loading}
                type="submit"
                form="edit-registration-form"
              >
                Speichern
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
