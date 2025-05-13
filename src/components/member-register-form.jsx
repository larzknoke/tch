import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";
import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Text,
  VStack,
  Field,
  Input,
  Switch,
  HStack,
  RadioGroup,
  Checkbox,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { toaster } from "@/components/ui/toaster";
import { useRef, useState } from "react";
import TcButton from "@/components/ui/button2";

function MemberRegisterForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(schema),
    // defaultValues: worker,
  });

  async function onSubmit(values) {
    delete values.effort;
    try {
      setLoading(true);
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

  const itemsMitgliedschaft = [
    { value: "aktiv", label: "aktiv" },
    { value: "passiv", label: "passiv" },
  ];

  return (
    <Dialog.Root size={"lg"}>
      <Dialog.Trigger asChild>
        <Text className="button bg-white text-tch-blue mt-5 hover:cursor-pointer">
          So wirst du Mitglied
          <ChevronDoubleRightIcon className="size-5 pt-1" />
        </Text>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Mitgliedschaft beantragen</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <form id="worker-form-edit" onSubmit={handleSubmit(onSubmit)}>
                <VStack gap={4}>
                  <HStack w={"100%"} gap={4}>
                    <Field.Root required>
                      <Field.Label>
                        Vorname
                        <Field.RequiredIndicator />
                      </Field.Label>
                      <Input name="vorname" {...register("vorname")} />
                    </Field.Root>
                    <Field.Root required>
                      <Field.Label>
                        Name
                        <Field.RequiredIndicator />
                      </Field.Label>
                      <Input name="name" {...register("name")} />
                    </Field.Root>
                  </HStack>
                  <Field.Root>
                    <Field.Label>
                      Straße
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Input name="strasse" {...register("strasse")} />
                  </Field.Root>
                  <HStack w={"100%"} gap={4}>
                    <Field.Root required>
                      <Field.Label>
                        PLZ
                        <Field.RequiredIndicator />
                      </Field.Label>
                      <Input name="plz" {...register("plz")} />
                    </Field.Root>
                    <Field.Root required>
                      <Field.Label>
                        Ort
                        <Field.RequiredIndicator />
                      </Field.Label>
                      <Input name="ort" {...register("ort")} />
                    </Field.Root>
                  </HStack>
                  <HStack w={"100%"} gap={4}>
                    <Field.Root required>
                      <Field.Label>
                        Email
                        <Field.RequiredIndicator />
                      </Field.Label>
                      <Input name="email" {...register("email")} />
                    </Field.Root>
                    <Field.Root required>
                      <Field.Label>
                        Telefon
                        <Field.RequiredIndicator />
                      </Field.Label>
                      <Input name="telefon" {...register("telefon")} />
                    </Field.Root>
                  </HStack>
                  <HStack w={"100%"} gap={4}>
                    <Field.Root required>
                      <Field.Label>
                        Geburtsdatum
                        <Field.RequiredIndicator />
                      </Field.Label>
                      <Input
                        name="geburtsdatum"
                        {...register("geburtsdatum")}
                      />
                    </Field.Root>
                    <Field.Root required>
                      <Field.Label>
                        Staatangehörigkeit
                        <Field.RequiredIndicator />
                      </Field.Label>
                      <Input name="staat" {...register("staat")} />
                    </Field.Root>
                  </HStack>

                  <Field.Root>
                    <Field.Label>Mitgliedsart</Field.Label>
                    <Controller
                      name="mitgliedsart"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup.Root
                          name={field.name}
                          value={field.value}
                          onValueChange={({ value }) => {
                            field.onChange(value);
                          }}
                        >
                          <HStack gap="6">
                            {itemsMitgliedschaft.map((item) => (
                              <RadioGroup.Item
                                key={item.value}
                                value={item.value}
                              >
                                <RadioGroup.ItemHiddenInput
                                  onBlur={field.onBlur}
                                />
                                <RadioGroup.ItemIndicator />
                                <RadioGroup.ItemText>
                                  {item.label}
                                </RadioGroup.ItemText>
                              </RadioGroup.Item>
                            ))}
                          </HStack>
                        </RadioGroup.Root>
                      )}
                    />
                  </Field.Root>
                  <Field.Root className="my-2">
                    {/* <Field.Label>Datenschutz</Field.Label> */}
                    <Controller
                      control={control}
                      name="datenschutz"
                      render={({ field }) => (
                        // <Field.Root invalid={invalid} disabled={field.disabled}>
                        <Field.Root>
                          <Checkbox.Root
                            checked={field.value}
                            onCheckedChange={({ checked }) =>
                              field.onChange(checked)
                            }
                          >
                            <Checkbox.HiddenInput />
                            <Checkbox.Control />
                            <Checkbox.Label>
                              Datenschutz akzeptieren
                            </Checkbox.Label>
                          </Checkbox.Root>
                          <Field.ErrorText>
                            {errors.datenschutz?.message}
                          </Field.ErrorText>
                        </Field.Root>
                      )}
                    />
                  </Field.Root>
                </VStack>
              </form>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Abrechen</Button>
              </Dialog.ActionTrigger>
              <Button>Senden</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default MemberRegisterForm;
