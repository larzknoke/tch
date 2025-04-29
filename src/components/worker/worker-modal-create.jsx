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
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { EffortSelect } from "./effort-select";
import { useRef } from "react";

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

export const WorkerModalCreate = () => {
  const contentRef = useRef(null);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(schema),
    // defaultValues: {
    //   title: "",
    //   content: "",
    //   maxWorker: 1,
    //   // date: new Date(),
    //   active: "on",
    //   finished: false,
    // },
  });

  async function onSubmit(values) {
    try {
      console.log("values", values);

      const res = await fetch("/api/workers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, effortId: values.effortId[0] }),
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
        <Button colorPalette={"green"}>Neuer Arbeiter</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content ref={contentRef}>
            <Dialog.Header>
              <Dialog.Title>Neuer Arbeiter</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <form id="worker-form" onSubmit={handleSubmit(onSubmit)}>
                <VStack gap={4}>
                  <Field.Root required>
                    <Field.Label>
                      Name
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Input name="name" {...register("name")} />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>
                      Email
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Input name="email" {...register("email")} />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>
                      Telefon
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Input name="phone" {...register("phone")} />
                  </Field.Root>
                  <EffortSelect
                    errors={errors}
                    control={control}
                    contentRef={contentRef}
                  />
                  <Controller
                    name="verified"
                    control={control}
                    render={({ field }) => (
                      <Field.Root invalid={!!errors.verified}>
                        <Switch.Root
                          name={field.name}
                          checked={field.value}
                          onCheckedChange={({ checked }) =>
                            field.onChange(checked)
                          }
                        >
                          <Switch.HiddenInput onBlur={field.onBlur} />
                          <Switch.Control />
                          <Switch.Label>Bestätigt</Switch.Label>
                        </Switch.Root>
                        <Field.ErrorText>
                          {errors.verified?.message}
                        </Field.ErrorText>
                      </Field.Root>
                    )}
                  />
                </VStack>
              </form>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Abbrechen</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette={"green"} type="submit" form="worker-form">
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
};
