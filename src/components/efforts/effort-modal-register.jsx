import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Field,
  Input,
  VStack,
  Textarea,
  Switch,
  Alert,
  Flex,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toaster } from "../ui/toaster";
import BallLoader from "../ui/loading-ball";
import { useState, useMemo } from "react";
import { verifiedWorker } from "@/lib/utils";

const schema = yup
  .object({
    title: yup.string().required("Name ist erforderlich"),
    content: yup.string(),
    maxWorker: yup
      .number()
      .typeError("Max. Teilnehmer muss eine Zahl sein")
      // .positive("Max. Teilnehmer muss eine Zahl größer als 0 sein")
      .integer("Max. Teilnehmer muss eine ganze Zahl sein")
      .required("Max. Teilnehmer ist erforderlich"),
    date: yup.string(),
    active: yup.boolean().transform((value) => {
      return value == "on";
    }),
    finished: yup.boolean().transform((value) => {
      return value == "on";
    }),
  })
  .required();

export const EffortModalRegister = ({ effort }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const isFull = useMemo(() => {
    if (!effort?.maxWorker) return false;
    return verifiedWorker(effort.workers) >= effort.maxWorker;
  }, [effort]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
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

      if (resData.email) {
        const resMail = await fetch("/api/verifyWorkerEmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(resData),
        });
      }

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
          description: `Email zur Bestätigung wurde versendet`,
          type: "success",
        });
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
                description: "Dieser Arbeitseinsatz ist bereits voll",
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
                    <Field.Root required>
                      <Field.Label>
                        Email
                        <Field.RequiredIndicator />
                      </Field.Label>
                      <Input name="email" {...register("email")} />
                      {/* <Field.ErrorMessage>
                      {errors.email?.message && errors.email?.message}
                    </Field.ErrorMessage> */}
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>
                        Name
                        <Field.RequiredIndicator />
                      </Field.Label>
                      <Input name="name" {...register("name")} />
                      {/* <Field.ErrorMessage>
                      {errors.title?.message && errors.title?.message}
                    </Field.ErrorMessage> */}
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>
                        Telefon
                        <Field.RequiredIndicator />
                      </Field.Label>
                      <Input name="phone" {...register("phone")} />
                      {/* <Field.ErrorMessage>
                      {errors.phone?.message && errors.phone?.message}
                    </Field.ErrorMessage> */}
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
                  Sie erhalten eine Bestätigungs-E-Mail. Sobald Sie den darin
                  enthaltenen Link angeklickt haben, ist Ihre Registrierung
                  erfolgreich abgeschlossen.
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
