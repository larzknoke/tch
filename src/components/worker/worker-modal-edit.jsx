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
  DialogContext,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { EffortSelect } from "./effort-select";
import { toaster } from "../ui/toaster";
import { use, useEffect, useRef, useState } from "react";

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

export const WorkerModalEdit = ({ worker, open, onOpenChange }) => {
  const [loading, setLoading] = useState(false);
  const contentRef = useRef(null);
  const dialogRef = useRef(null);
  // const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   if (openEditModal) {
  //     setOpen(true);
  //   } else {
  //     setOpen(false);
  //   }
  // }, [openEditModal]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(schema),
    defaultValues: worker,
  });

  async function onSubmit(values) {
    try {
      console.log("values", values);

      const res = await fetch("/api/workers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.status != 200) {
        toaster.create({
          description: "Ein Fehler ist aufgetreten",
          type: "error",
        });
      } else {
        const resData = await res.json();
        toaster.create({
          description: `Teilnehmer gespeichert.`,
          type: "success",
        });
        getWorkers();
        dialogEditRef.current.close();
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
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content ref={contentRef}>
            <Dialog.Context>
              {(store) => {
                dialogRef.current = store;
                return (
                  <>
                    <Dialog.Header>
                      <Dialog.Title>Arbeiter bearbeiten</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                      <form
                        id="worker-form-edit"
                        onSubmit={handleSubmit(onSubmit)}
                      >
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
                  </>
                );
              }}
            </Dialog.Context>
            <Dialog.Footer>
              <Button onClick={() => onOpenChange(false)} variant="outline">
                Abbrechen
              </Button>
              <Button
                colorPalette={"green"}
                type="submit"
                form="worker-form-edit"
              >
                Speichern
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton onClick={() => onOpenChange(false)} size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
