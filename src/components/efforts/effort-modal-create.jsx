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

export const EffortModalCreate = () => {
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
        <Button colorPalette={"green"}>Neuer Arbeitseinsatz</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Neuer Arbeitseinsatz</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <form id="effort-form" onSubmit={handleSubmit(onSubmit)}>
                <VStack gap={4}>
                  <Field.Root required>
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
                    <Field.Label>Beschreibung</Field.Label>
                    <Textarea name="content" {...register("content")} />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Max. Teilnehmer</Field.Label>
                    <Input
                      name="maxWorker"
                      type="Number"
                      {...register("maxWorker", {
                        valueAsNumber: true,
                      })}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Datum</Field.Label>
                    <Input
                      name="date"
                      type="datetime-local"
                      {...register("date", { valueAsDate: true })}
                    />
                  </Field.Root>{" "}
                  <Controller
                    name="active"
                    control={control}
                    render={({ field }) => (
                      <Field.Root invalid={!!errors.active}>
                        <Switch.Root
                          name={field.name}
                          checked={field.value}
                          onCheckedChange={({ checked }) =>
                            field.onChange(checked)
                          }
                        >
                          <Switch.HiddenInput onBlur={field.onBlur} />
                          <Switch.Control />
                          <Switch.Label>Aktiv</Switch.Label>
                        </Switch.Root>
                        <Field.ErrorText>
                          {errors.active?.message}
                        </Field.ErrorText>
                      </Field.Root>
                    )}
                  />
                  {/* <Field.Root>
                    <Switch.Root {...register("active", {})}>
                      <Switch.HiddenInput />
                      <Switch.Control />
                      <Switch.Label>Aktiv</Switch.Label>
                    </Switch.Root>{" "}
                  </Field.Root> */}
                  <Controller
                    name="finished"
                    control={control}
                    render={({ field }) => (
                      <Field.Root invalid={!!errors.active}>
                        <Switch.Root
                          name={field.name}
                          checked={field.value}
                          onCheckedChange={({ checked }) =>
                            field.onChange(checked)
                          }
                        >
                          <Switch.HiddenInput onBlur={field.onBlur} />
                          <Switch.Control />
                          <Switch.Label>Beendet</Switch.Label>
                        </Switch.Root>
                        <Field.ErrorText>
                          {errors.active?.message}
                        </Field.ErrorText>
                      </Field.Root>
                    )}
                  />
                  {/* <Field.Root>
                    <Switch.Root {...register("finished", {})}>
                      <Switch.HiddenInput />
                      <Switch.Control />
                      <Switch.Label>Beendet</Switch.Label>
                    </Switch.Root>{" "}
                  </Field.Root> */}
                </VStack>
              </form>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Abbrechen</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette={"green"} type="submit" form="effort-form">
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
