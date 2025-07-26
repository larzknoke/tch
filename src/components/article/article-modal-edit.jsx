import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Field,
  Input,
  VStack,
  Switch,
  DialogContext,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRef, useState, useEffect } from "react";
import { toaster } from "../ui/toaster";
import CKEditorAdmin from "../ui/admin/ckeditor-admin";

const schema = yup
  .object({
    title: yup.string().required("Titel ist erforderlich"),
    content: yup.string(),
    date: yup.date().required("Datum ist erforderlich"),
    active: yup.boolean().required(),
    finished: yup.boolean().required(),
  })
  .required();

export const ArticleModalEdit = ({ article, getArticles, isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const contentRef = useRef(null);
  const dialogRef = useRef(null);

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
      date: "",
      active: false,
      finished: false,
    },
  });

  // Setzt Daten, wenn Modal geöffnet wird oder sich der Artikel ändert
  useEffect(() => {
    if (article) {
      reset({
        title: article.title || "",
        teaser: article.teaser || "",
        slug: article.slug || "",
        content: article.content || "",
        date: article.date
          ? new Date(article.date).toISOString().slice(0, 16)
          : "",
        active: article.active || false,
        finished: article.finished || false,
      });
    }
  }, [article, reset]);

  async function onSubmit(values) {
    try {
      setLoading(true);
      const res = await fetch(`/api/articles/${article.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.status !== 200) {
        toaster.create({
          description: "Ein Fehler ist aufgetreten",
          type: "error",
        });
      } else {
        const resData = await res.json();
        toaster.create({
          description: `Artikel '${resData.title}' aktualisiert.`,
          type: "success",
        });
        getArticles();
        onClose();
        reset();
      }
    } catch (error) {
      console.error("Update-Fehler:", error);
      toaster.create({
        title: "Ein Fehler ist aufgetreten",
        description: JSON.stringify(error),
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(e) => !e.open && onClose()}
      size="xl"
    >
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
                      <Dialog.Title>Artikel bearbeiten</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                      <form
                        id="article-edit-form"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <VStack gap={4}>
                          <Field.Root required>
                            <Field.Label>
                              Titel <Field.RequiredIndicator />
                            </Field.Label>
                            <Input {...register("title")} />
                            <Field.ErrorText>
                              {errors.title?.message}
                            </Field.ErrorText>
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
                                <Field.ErrorText>
                                  {errors.content?.message}
                                </Field.ErrorText>
                              </Field.Root>
                            )}
                          />
                          <Field.Root>
                            <Field.Label>Datum</Field.Label>
                            <Input
                              type="datetime-local"
                              {...register("date")}
                            />
                            <Field.ErrorText>
                              {errors.date?.message}
                            </Field.ErrorText>
                          </Field.Root>
                          <Controller
                            name="active"
                            control={control}
                            render={({ field }) => (
                              <Field.Root>
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
                              </Field.Root>
                            )}
                          />
                        </VStack>
                      </form>
                    </Dialog.Body>
                    <Dialog.Footer>
                      <Button variant="outline" onClick={onClose}>
                        Abbrechen
                      </Button>
                      <Button
                        colorPalette="green"
                        type="submit"
                        form="article-edit-form"
                        isLoading={loading}
                      >
                        Speichern
                      </Button>
                    </Dialog.Footer>
                    <Dialog.CloseTrigger asChild>
                      <CloseButton size="sm" />
                    </Dialog.CloseTrigger>
                  </>
                );
              }}
            </Dialog.Context>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
