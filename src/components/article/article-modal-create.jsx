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
import { toaster } from "../ui/toaster";
import { useRef, useState } from "react";

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

export const ArticleModalCreate = ({ getArticles }) => {
  const [loading, setLoading] = useState(false);
  const contentRef = useRef(null);
  const dialogRef = useRef(null);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
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

      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, effortId: values.effortId[0] }),
      });
      if (res.status != 200) {
        toaster.create({
          description: "Ein Fehler ist aufgetreten",
          type: "error",
        });
      } else {
        const resData = await res.json();
        toaster.create({
          description: `Teilnehmer '${resData.email}' erstellt.`,
          type: "success",
        });
        getArticles();
        setOpen(false);
        // dialogRef.current.close();
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
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)} size={"xl"}>
      <Dialog.Trigger asChild>
        <Button colorPalette={"green"}>Neuer Artikel</Button>
      </Dialog.Trigger>
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
                      <Dialog.Title>Neuer Artikel</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                      <form id="article-form" onSubmit={handleSubmit(onSubmit)}>
                        <VStack gap={4}>
                          <Field.Root required>
                            <Field.Label>
                              Titel
                              <Field.RequiredIndicator />
                            </Field.Label>
                            <Input name="title" {...register("title")} />
                          </Field.Root>
                          <Field.Root>
                            <Field.Label>
                              Teaser
                              <Field.RequiredIndicator />
                            </Field.Label>
                            <Input name="teaser" {...register("teaser")} />
                          </Field.Root>
                          <Field.Root>
                            <Field.Label>
                              Slug
                              <Field.RequiredIndicator />
                            </Field.Label>
                            <Input name="slug" {...register("slug")} />
                          </Field.Root>
                          <Field.Root>
                            <Field.Label>Inhalt</Field.Label>
                            <Textarea name="content" {...register("content")} />
                          </Field.Root>
                          <Field.Root>
                            <Field.Label>Datum</Field.Label>
                            <Input
                              name="date"
                              type="datetime-local"
                              {...register("date", { valueAsDate: true })}
                            />
                          </Field.Root>
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
              <Button colorPalette={"green"} type="submit" form="article-form">
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
