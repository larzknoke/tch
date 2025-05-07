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
import { toaster } from "@/components/ui/toaster";
import { useRef, useState, useEffect } from "react";
import dayjs from "dayjs";
import 'dayjs/locale/de'

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
    // active: yup.boolean().transform((value) => {
    //   return value == "on";
    // }),
    // finished: yup.boolean().transform((value) => {
    //   return value == "on";
    // }),
  })
  .required();

export const EffortModalEdit = ({ effort, open, setOpen, getEfforts }) => {
  const [loading, setLoading] = useState(false);
  const dialogRef = useRef(null);
  console.log("effort", effort);

  // useEffect(() => {
  //   if (effort && effort.date) {
  //     reset({ ...effort, date: dayjs(effort.date).format("YYYY-MM-DDThh:mm") });
  //   }
  // }, [effort]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: effort,
    values: {...effort, date: dayjs(effort.date).format("YYYY-MM-DDThh:mm")}
  });

  async function onSubmit(values) {
    delete values.workers;
    try {
      setLoading(true);
      console.log("values", values);
      const res = await fetch("/api/efforts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.status != 200) {
        toaster.create({
          description: "Ein Fehler ist aufgetreten",
          type: "error",
        });
        setLoading(false);
      } else {
        const resData = await res.json();
        toaster.create({
          description: `Arbeitseinsatz  gespeichert.`,
          type: "success",
        });
        getEfforts();
        setOpen(false);
        reset();
        setLoading(false);
      }
    } catch (error) {
      console.log("api fetch error");
      console.error("Err", error);
      toaster.create({
        title: "Ein Fehler ist aufgetreten",
        description: JSON.stringify(error),
        type: "error",
      });
      setLoading(false);
    }
  }
  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Context>
              {(store) => {
                dialogRef.current = store;
                return (
                  <>
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
                  </>
                );
              }}
            </Dialog.Context>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Abbrechen</Button>
              </Dialog.ActionTrigger>
              <Button
                loading={loading}
                colorPalette={"green"}
                type="submit"
                form="effort-form"
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
};
