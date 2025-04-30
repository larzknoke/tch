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
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
    date: yup.date().required("Datum ist erforderlich"),
    active: yup.boolean().transform((value) => {
      return value == "on";
    }),
    finished: yup.boolean().transform((value) => {
      return value == "on";
    }),
  })
  .required();

export const EffortModalRegister = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      content: "",
      maxWorker: 1,
      // date: new Date(),
      active: "on",
      finished: false,
    },
  });

  async function onSubmit(values) {
    try {
      console.log("values", values);

      const res = await fetch("/api/efforts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      // if (res.status != 200) {
      //   toast({
      //     title: "Ein Fehler ist aufgetreten",
      //     status: "error",
      //     duration: 4000,
      //     isClosable: true,
      //   });
      // } else {
      //   const resData = await res.json();
      //   toast({
      //     title: `Ansprechpartner ${resData.result.name} erstellt.`,
      //     status: "success",
      //     duration: 4000,
      //     isClosable: true,
      //   });
      //   onClose();
      //   reset();
      //   router.replace(router.asPath);
      // }
    } catch (error) {
      console.log("api fetch error");
      console.error("Err", error);
      toast({
        title: "Ein Fehler ist aufgetreten",
        description: JSON.stringify(error),
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <span className="font-bold uppercase text-tch-gold hover:underline hover:cursor-pointer">
          Anmelden
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
                    <Input name="title" {...register("title")} />
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
              <Button colorPalette={"gold"} type="submit" form="effort-form">
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
