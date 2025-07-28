import LayoutAdmin from "@/components/ui/layouts/layout-admin";
import { Button, Field, Input, VStack, Switch, Card } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { toaster } from "@/components/ui/toaster";
import CKEditorAdmin from "@/components/ui/admin/ckeditor-admin";
import { useRouter } from "next/router";
import BallLoader from "@/components/ui/loading-ball";
import dayjs from "dayjs";

const schema = yup
  .object({
    title: yup.string().required("Titel ist erforderlich"),
    content: yup.string(),
    teaser: yup.string(),
    slug: yup.string(),
    date: yup.date().required("Datum ist erforderlich"),
    active: yup.boolean().required(),
  })
  .required();

function EditArticle() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      teaser: "",
      slug: "",
      content: "",
      date: new Date().toISOString().split("T")[0],
      active: true,
    },
  });

  // Fetch existing article
  useEffect(() => {
    setLoading(true);
    if (!id) return;
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/articles?id=${id}`);
        if (!res.ok) throw new Error("Fehler beim Laden des Artikels");
        const data = await res.json();
        reset({
          ...data,
          date: dayjs(data.date).format("YYYY-MM-DD"),
        });
      } catch (error) {
        toaster.create({
          description: "Fehler beim Laden des Artikels",
          type: "error",
        });
        console.error(error);
      }
    };
    fetchData();
    setLoading(false);
  }, [id, reset]);

  async function onSubmit(values) {
    try {
      setLoading(true);
      const res = await fetch(`/api/articles?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        toaster.create({
          description: "Fehler beim Speichern",
          type: "error",
        });
      } else {
        const updated = await res.json();
        toaster.create({
          description: `Artikel '${updated.title}' aktualisiert.`,
          type: "success",
        });
        router.push("/admin/articles"); // Zurück zur Übersicht
      }
    } catch (error) {
      console.error(error);
      toaster.create({
        title: "Ein Fehler ist aufgetreten",
        description: JSON.stringify(error),
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  return loading ? (
    <BallLoader />
  ) : (
    <Card.Root my={5} size={"lg"} maxWidth={"4xl"}>
      <Card.Header>
        <Card.Title>Artikel bearbeiten</Card.Title>
        <Card.Description>Bearbeite einen bestehenden Artikel</Card.Description>
      </Card.Header>
      <Card.Body>
        <form id="article-form" onSubmit={handleSubmit(onSubmit)}>
          <VStack gap={4}>
            <Field.Root required>
              <Field.Label>
                Titel <Field.RequiredIndicator />
              </Field.Label>
              <Input {...register("title")} />
            </Field.Root>

            <Field.Root>
              <Field.Label>Teaser</Field.Label>
              <Input {...register("teaser")} />
            </Field.Root>

            <Field.Root>
              <Field.Label>Slug</Field.Label>
              <Input {...register("slug")} />
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
              <Input type="date" {...register("date")} />
            </Field.Root>

            <Controller
              name="active"
              control={control}
              render={({ field }) => (
                <Field.Root>
                  <Switch.Root
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
          Änderungen speichern
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}

export default EditArticle;

EditArticle.getLayout = function getLayout(page) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
