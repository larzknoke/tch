import LayoutAdmin from "@/components/ui/layouts/layout-admin";
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
  Card,
  Center,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRef, useState } from "react";
import { toaster } from "@/components/ui/toaster";
import CKEditorAdmin from "@/components/ui/admin/ckeditor-admin";

const schema = yup
  .object({
    title: yup.string().required("Titel ist erforderlich"),
    content: yup.string(),
    date: yup.date().required("Datum ist erforderlich"),
    active: yup.boolean().required(),
    finished: yup.boolean().required(),
  })
  .required();

function NewArticle() {
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
      setLoading(true);
      const res = await fetch("/api/articles", {
        method: "POST",
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
          description: `Artikel '${resData.title}' erstellt.`,
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
    <Center>
      <Card.Root my={5} maxWidth={"4xl"}>
        <Card.Header>
          <Card.Title>Neuer Artikel</Card.Title>
          <Card.Description>Erstelle einen neuen Artikel</Card.Description>
        </Card.Header>
        <Card.Body>
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
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <Field.Root>
                    <Field.Label>Inhalt</Field.Label>
                    <CKEditorAdmin
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <Field.ErrorText>{errors.content?.message}</Field.ErrorText>
                  </Field.Root>
                )}
              />
              <Field.Root>
                <Field.Label>Datum</Field.Label>
                <Input
                  name="date"
                  type="date"
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
                      onCheckedChange={({ checked }) => field.onChange(checked)}
                    >
                      <Switch.HiddenInput onBlur={field.onBlur} />
                      <Switch.Control />
                      <Switch.Label>Aktiv</Switch.Label>
                    </Switch.Root>
                    <Field.ErrorText>{errors.active?.message}</Field.ErrorText>
                  </Field.Root>
                )}
              />
            </VStack>
          </form>
        </Card.Body>
        <Card.Footer>
          <Button
            colorPalette="green"
            type="submit"
            form="article-form"
            isLoading={loading}
          >
            Artikel erstellen
          </Button>
        </Card.Footer>
      </Card.Root>
    </Center>
  );
}

export default NewArticle;

NewArticle.getLayout = function getLayout(page) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
