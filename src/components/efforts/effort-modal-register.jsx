import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Field,
  Input,
  VStack,
  Textarea,
  Alert,
  Flex,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { toaster } from "../ui/toaster";
import BallLoader from "../ui/loading-ball";
import { useState, useMemo } from "react";
import { verifiedWorker } from "@/lib/utils";

export const EffortModalRegister = ({ effort }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const isFull = useMemo(() => {
    if (!effort?.maxWorker) return false;
    return verifiedWorker(effort.workers) >= effort.maxWorker;
  }, [effort]);

  const { register, handleSubmit } = useForm({
    // resolver: yupResolver(schema),
    defaultValues: {
      effortId: effort.id,
    },
  });

  async function onSubmit(values) {
    try {
      console.log("values", values);
      setLoading(true);
      const res = await fetch("/api/workers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const resData = await res.json();
      console.log("resData", resData);

      // Double-Opt-In ist vorerst deaktiviert.
      // Für eine spätere Reaktivierung diesen Block wieder aktivieren:
      // if (resData.email) {
      //   await fetch("/api/verifyWorkerEmail", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(resData),
      //   });
      // }

      if (res.status != 200) {
        toaster.create({
          description: "Ein Fehler ist aufgetreten",
          type: "error",
        });
        setLoading(false);
        setOpen(false);
      } else {
        console.log("resData", resData);
        toaster.create({
          description: "Anmeldung erfolgreich",
          type: "success",
        });

        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("efforts:updated"));
        }

        setLoading(false);
        setOpen(false);
      }
    } catch (error) {
      console.log("api fetch error");
      console.error("Err", error);
      toaster.create({
        description: JSON.stringify(error),
        type: "error",
      });
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <span
          className={`font-bold uppercase ${
            isFull
              ? "text-gray-400 cursor-not-allowed"
              : "text-tch-gold hover:underline hover:cursor-pointer"
          }`}
          onClick={(e) => {
            if (isFull) {
              e.preventDefault();
              toaster.create({
                description: "Dieser Arbeitseinsatz ist bereits ausgebucht.",
                type: "error",
              });
            }
          }}
        >
          {isFull ? "Ausgebucht" : "Anmelden"}
        </span>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Für Arbeitseinsatz registrieren</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              {!loading ? (
                <form id="effort-form" onSubmit={handleSubmit(onSubmit)}>
                  <VStack gap={4}>
                    <Field.Root>
                      <Field.Label>Email</Field.Label>
                      <Input name="email" {...register("email")} />
                      {/* <Field.ErrorMessage>
                      {errors.email?.message && errors.email?.message}
                    </Field.ErrorMessage> */}
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Name</Field.Label>
                      <Input name="name" {...register("name")} />
                      {/* <Field.ErrorMessage>
                      {errors.title?.message && errors.title?.message}
                    </Field.ErrorMessage> */}
                    </Field.Root>
                    {/* Telefon ist vorerst deaktiviert und ausgeblendet. */}
                    <Field.Root>
                      <Field.Label>Notiz/Bemerkung</Field.Label>
                      <Textarea name="note" {...register("note")} />
                    </Field.Root>
                  </VStack>
                </form>
              ) : (
                <Flex justifyContent={"center"} alignItems={"center"} pb={5}>
                  <BallLoader />
                </Flex>
              )}
              <Alert.Root
                status="neutral"
                variant={"surface"}
                size={"sm"}
                mt={5}
              >
                <Alert.Indicator />
                <Alert.Title>
                  Nach dem Absenden ist Ihre Registrierung direkt abgeschlossen.
                </Alert.Title>
              </Alert.Root>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Abbrechen</Button>
              </Dialog.ActionTrigger>
              <Button
                loading={loading}
                colorPalette={"gold"}
                type="submit"
                form="effort-form"
              >
                Anmelden
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
};
