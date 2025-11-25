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
  Checkbox,
  NativeSelect,
  RadioGroup,
  Accordion,
  Spacer,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { toaster } from "@/components/ui/toaster";
import { useRef, useState } from "react";
import TcButton from "@/components/ui/button2";
import Link from "next/link";
import BallLoader from "./ui/loading-ball";
import {
  InformationCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

function MemberRegisterForm() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      datenschutz: false,
      sepa_einzug: "",
      sepa_lastschriftmandat: false,
    },
  });

  async function onSubmit(values) {
    try {
      setLoading(true);
      const res = await fetch("/api/member-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (res.status != 200) {
        toaster.create({
          description: "Ein Fehler ist aufgetreten",
          type: "error",
        });
      } else {
        toaster.create({
          description: `Ihr Antrag wird bearbeitet. Sie erhalten in Kürze eine Bestätigungs-E-Mail.`,
          type: "success",
        });
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

  // Beitragsgruppen / Mitgliedsarten (aus CSV konvertiert)
  const itemsMitgliedschaft = [
    {
      value: "jugendliche",
      label: "Jugendliche bis 18 Jahre",
      group: "A",
      amount: 100.0,
      amountFormatted: "100,00",
      footnote: "**",
    },
    {
      value: "aktiv-einzel",
      label: "Aktives Einzelmitglied",
      group: "B",
      amount: 230.0,
      amountFormatted: "230,00",
      footnote: "***",
    },
    {
      value: "aktiv-einzel-mit-kindern",
      label: "Aktives Einzelmitglied – mit max. 3 Kindern bis 18 Jahre",
      group: "C",
      amount: 330.0,
      amountFormatted: "330,00",
      footnote: "***",
    },
    {
      value: "aktiv-paar",
      label: "Aktive Ehepaar/Lebensgemeinschaft",
      group: "D",
      amount: 350.0,
      amountFormatted: "350,00",
      footnote: "***",
    },
    {
      value: "aktiv-paar-mit-kindern",
      label:
        "Aktive Ehepaar/Lebensgemeinschaft mit max. 3 Kindern bis 18 Jahre",
      group: "E",
      amount: 450.0,
      amountFormatted: "450,00",
      footnote: "***",
    },
    {
      value: "passiv-foerdernd",
      label: "Passives / Förderndes Mitglied – keine Spielberechtigung",
      group: "F",
      amount: 50.0,
      amountFormatted: "50,00",
    },
    {
      value: "zweitmitgliedschaft-voll",
      label:
        "Zweitmitgliedschaft bei Vollmitgliedschaft in einem anderen Tennisverein",
      group: "G",
      amount: 150.0,
      amountFormatted: "150,00",
      footnote: "*",
    },
    {
      value: "zweitmitgliedschaft-punktspiel",
      label:
        "Zweitmitgliedschaft ausschließlich für den Punktspielbetrieb bei Vollmitgliedschaft in einem anderen Tennisverein",
      group: "H",
      amount: 95.0,
      amountFormatted: "95,00",
      footnote: "*",
    },
  ];
  const itemsStatus = [
    { value: "erwachsener", label: "Erwachsener" },
    {
      value: "jugendlicher-azubi-student",
      label: "Jugendlicher / Auszubildender / Student/in",
    },
  ];

  return (
    <Dialog.Root size={"lg"} open={open} onOpenChange={(e) => setOpen(e.open)}>
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
              {loading ? (
                <div className="flex justify-center">
                  <BallLoader />
                </div>
              ) : (
                <form
                  id="member-register-form"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <VStack gap={4}>
                    <HStack w={"100%"} gap={4}>
                      <Field.Root required invalid={!!errors.vorname}>
                        <Field.Label>
                          Vorname
                          <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                          name="vorname"
                          {...register("vorname", {
                            required: "Vorname ist erforderlich",
                          })}
                        />
                        <Field.ErrorText>
                          {errors.vorname?.message}
                        </Field.ErrorText>
                      </Field.Root>
                      <Field.Root required invalid={!!errors.name}>
                        <Field.Label>
                          Name
                          <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                          name="name"
                          {...register("name", {
                            required: "Name ist erforderlich",
                          })}
                        />
                        <Field.ErrorText>
                          {errors.name?.message}
                        </Field.ErrorText>
                      </Field.Root>
                    </HStack>
                    <Field.Root required invalid={!!errors.strasse}>
                      <Field.Label>
                        Straße
                        <Field.RequiredIndicator />
                      </Field.Label>
                      <Input
                        name="strasse"
                        {...register("strasse", {
                          required: "Straße ist erforderlich",
                        })}
                      />
                      <Field.ErrorText>
                        {errors.strasse?.message}
                      </Field.ErrorText>
                    </Field.Root>
                    <HStack w={"100%"} gap={4}>
                      <Field.Root required invalid={!!errors.plz}>
                        <Field.Label>
                          PLZ
                          <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                          name="plz"
                          {...register("plz", {
                            required: "PLZ ist erforderlich",
                            pattern: {
                              value: /^[0-9]{5}$/,
                              message: "PLZ muss 5 Ziffern haben",
                            },
                          })}
                        />
                        <Field.ErrorText>{errors.plz?.message}</Field.ErrorText>
                      </Field.Root>
                      <Field.Root required invalid={!!errors.ort}>
                        <Field.Label>
                          Ort
                          <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                          name="ort"
                          {...register("ort", {
                            required: "Ort ist erforderlich",
                          })}
                        />
                        <Field.ErrorText>{errors.ort?.message}</Field.ErrorText>
                      </Field.Root>
                    </HStack>
                    <HStack w={"100%"} gap={4}>
                      <Field.Root required invalid={!!errors.email}>
                        <Field.Label>
                          Email
                          <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                          name="email"
                          type="email"
                          {...register("email", {
                            required: "Email ist erforderlich",
                            pattern: {
                              value: /[^@\s]+@[^@\s]+\.[^@\s]+/,
                              message: "Ungültige Email-Adresse",
                            },
                          })}
                        />
                        <Field.ErrorText>
                          {errors.email?.message}
                        </Field.ErrorText>
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>Telefon</Field.Label>
                        <Input
                          name="telefon"
                          {...register("telefon", {
                            pattern: {
                              value: /^[0-9+\s\-/()]{6,}$/,
                              message: "Ungültige Telefonnummer",
                            },
                          })}
                        />
                        <Field.ErrorText>
                          {errors.telefon?.message}
                        </Field.ErrorText>
                      </Field.Root>
                    </HStack>
                    <HStack w={"100%"} gap={4}>
                      <Field.Root required invalid={!!errors.geburtsdatum}>
                        <Field.Label>
                          Geburtsdatum
                          <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                          name="geburtsdatum"
                          placeholder="TT.MM.JJJJ"
                          {...register("geburtsdatum", {
                            required: "Geburtsdatum ist erforderlich",
                            pattern: {
                              value:
                                /^(0?[1-9]|[12][0-9]|3[01])\.(0?[1-9]|1[0-2])\.(19|20)\d{2}$/,
                              message: "Format TT.MM.JJJJ",
                            },
                          })}
                        />
                        <Field.ErrorText>
                          {errors.geburtsdatum?.message}
                        </Field.ErrorText>
                      </Field.Root>

                      <Field.Root invalid={!!errors.status}>
                        <Field.Label>Status</Field.Label>
                        <Controller
                          name="status"
                          control={control}
                          rules={{ required: "Status auswählen" }}
                          render={({ field }) => (
                            <NativeSelect.Root>
                              <NativeSelect.Field
                                name={field.name}
                                value={field.value || ""}
                                onChange={(e) => field.onChange(e.target.value)}
                                onBlur={field.onBlur}
                              >
                                <option value="" disabled>
                                  Bitte wählen...
                                </option>
                                {itemsStatus.map((item) => (
                                  <option key={item.value} value={item.value}>
                                    {item.label}
                                  </option>
                                ))}
                              </NativeSelect.Field>
                              <NativeSelect.Indicator />
                            </NativeSelect.Root>
                          )}
                        />
                        <Field.ErrorText>
                          {errors.status?.message}
                        </Field.ErrorText>
                      </Field.Root>
                    </HStack>
                    <Field.Root invalid={!!errors.mitgliedsart}>
                      <Field.Label>Mitgliedsart</Field.Label>
                      <Controller
                        name="mitgliedsart"
                        control={control}
                        rules={{ required: "Mitgliedsart auswählen" }}
                        render={({ field }) => (
                          <NativeSelect.Root>
                            <NativeSelect.Field
                              name={field.name}
                              value={field.value || ""}
                              onChange={(e) => field.onChange(e.target.value)}
                              onBlur={field.onBlur}
                            >
                              <option value="" disabled>
                                Bitte wählen...
                              </option>
                              {itemsMitgliedschaft.map((item) => (
                                <option key={item.value} value={item.value}>
                                  {item.label} – {item.amountFormatted} €
                                </option>
                              ))}
                            </NativeSelect.Field>
                            <NativeSelect.Indicator />
                          </NativeSelect.Root>
                        )}
                      />
                      {/* <Text mt={2} fontSize="xs" color="gray.500">
                        Preise pro Jahr. Fußnoten (*, **, ***) siehe
                        Beitragsordnung.
                      </Text> */}

                      {/* Accordion for more information */}
                      <Accordion.Root collapsible>
                        <Accordion.Item value="mitgliedsart-info">
                          <Accordion.ItemTrigger>
                            <Button
                              variant={"outline"}
                              className="w-full "
                              color={"red.700"}
                            >
                              <ExclamationTriangleIcon className="w-5 h-5 inline-block " />
                              Beitragsordnung / Bedingungen / Arbeitsdienst /
                              Satzung
                              <Accordion.ItemIndicator color="red.700" />
                            </Button>
                          </Accordion.ItemTrigger>
                          <Accordion.ItemContent>
                            <VStack
                              align="stretch"
                              gap={3}
                              p={3}
                              bg="gray.50"
                              borderRadius="md"
                            >
                              <Text fontSize="sm">
                                <strong>Jugendliche bis 18 Jahre:</strong> Diese
                                Mitgliedschaft richtet sich an alle Jugendlichen
                                bis zum vollendeten 18. Lebensjahr. Sie erhalten
                                vollen Zugang zu allen Plätzen und
                                Trainingsmöglichkeiten.
                              </Text>
                              <Text fontSize="sm">
                                <strong>Aktives Einzelmitglied:</strong> Als
                                aktives Mitglied haben Sie unbegrenzten Zugang
                                zu unseren Tennisplätzen und können an allen
                                Vereinsaktivitäten teilnehmen.
                              </Text>
                              <Text fontSize="sm">
                                <strong>Familienmitgliedschaften:</strong> Bei
                                Familienmitgliedschaften sind bis zu 3 Kinder
                                bis 18 Jahre inklusive. Dies bietet ein
                                ausgezeichnetes Preis-Leistungs-Verhältnis für
                                Familien.
                              </Text>
                              <Text fontSize="sm">
                                <strong>Passives/Förderndes Mitglied:</strong>{" "}
                                Sie unterstützen den Verein, ohne selbst aktiv
                                zu spielen. Keine Spielberechtigung enthalten.
                              </Text>
                              <Text fontSize="sm">
                                <strong>Zweitmitgliedschaft:</strong> Wenn Sie
                                bereits Vollmitglied in einem anderen
                                Tennisverein sind, bieten wir vergünstigte
                                Konditionen für eine Zweitmitgliedschaft.
                              </Text>
                            </VStack>
                          </Accordion.ItemContent>
                        </Accordion.Item>
                      </Accordion.Root>

                      <Field.ErrorText>
                        {errors.mitgliedsart?.message}
                      </Field.ErrorText>
                    </Field.Root>

                    {/* SEPA - Lastschriftmandat Section */}
                    <VStack
                      w="100%"
                      gap={4}
                      align="stretch"
                      mt={4}
                      p={4}
                      borderWidth="1px"
                      borderRadius="md"
                      background="gray.50"
                    >
                      <Text fontWeight="semibold">
                        SEPA - Lastschriftmandat
                      </Text>
                      <HStack w="100%" gap={4}>
                        <Field.Root
                          required
                          w="100%"
                          invalid={!!errors.sepa_vorname}
                        >
                          <Field.Label>
                            Vorname Kontoinhaber
                            <Field.RequiredIndicator />
                          </Field.Label>
                          <Input
                            {...register("sepa_vorname", {
                              required:
                                "Vorname des Kontoinhabers erforderlich",
                            })}
                            name="sepa_vorname"
                          />
                          <Field.ErrorText>
                            {errors.sepa_vorname?.message}
                          </Field.ErrorText>
                        </Field.Root>
                        <Field.Root
                          required
                          w="100%"
                          invalid={!!errors.sepa_name}
                        >
                          <Field.Label>
                            Name Kontoinhaber
                            <Field.RequiredIndicator />
                          </Field.Label>
                          <Input
                            {...register("sepa_name", {
                              required: "Name des Kontoinhabers erforderlich",
                            })}
                            name="sepa_name"
                          />
                          <Field.ErrorText>
                            {errors.sepa_name?.message}
                          </Field.ErrorText>
                        </Field.Root>
                      </HStack>
                      <Field.Root required invalid={!!errors.sepa_strasse}>
                        <Field.Label>
                          Straße
                          <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                          {...register("sepa_strasse", {
                            required: "Straße ist erforderlich",
                          })}
                          name="sepa_strasse"
                        />
                        <Field.ErrorText>
                          {errors.sepa_strasse?.message}
                        </Field.ErrorText>
                      </Field.Root>
                      <HStack w="100%" gap={4}>
                        <Field.Root required invalid={!!errors.sepa_plz}>
                          <Field.Label>
                            PLZ
                            <Field.RequiredIndicator />
                          </Field.Label>
                          <Input
                            {...register("sepa_plz", {
                              required: "PLZ ist erforderlich",
                              pattern: {
                                value: /^[0-9]{5}$/,
                                message: "PLZ muss 5 Ziffern haben",
                              },
                            })}
                            name="sepa_plz"
                          />
                          <Field.ErrorText>
                            {errors.sepa_plz?.message}
                          </Field.ErrorText>
                        </Field.Root>
                        <Field.Root required invalid={!!errors.sepa_ort}>
                          <Field.Label>
                            Ort
                            <Field.RequiredIndicator />
                          </Field.Label>
                          <Input
                            {...register("sepa_ort", {
                              required: "Ort ist erforderlich",
                            })}
                            name="sepa_ort"
                          />
                          <Field.ErrorText>
                            {errors.sepa_ort?.message}
                          </Field.ErrorText>
                        </Field.Root>
                      </HStack>
                      <Field.Root
                        required
                        invalid={!!errors.sepa_kreditinstitut}
                      >
                        <Field.Label>
                          Kreditinstitut
                          <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                          {...register("sepa_kreditinstitut", {
                            required: "Kreditinstitut ist erforderlich",
                          })}
                          name="sepa_kreditinstitut"
                        />
                        <Field.ErrorText>
                          {errors.sepa_kreditinstitut?.message}
                        </Field.ErrorText>
                      </Field.Root>
                      <Field.Root required invalid={!!errors.sepa_iban}>
                        <Field.Label>
                          IBAN
                          <Field.RequiredIndicator />
                        </Field.Label>
                        <Controller
                          name="sepa_iban"
                          control={control}
                          rules={{
                            required: "IBAN ist erforderlich",
                            pattern: {
                              value: /^(?:[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30})$/,
                              message: "Ungültige IBAN",
                            },
                          }}
                          render={({ field }) => (
                            <Input
                              {...field}
                              name="sepa_iban"
                              placeholder="DE..."
                              onChange={(e) =>
                                field.onChange(e.target.value.toUpperCase())
                              }
                            />
                          )}
                        />
                        <Field.ErrorText>
                          {errors.sepa_iban?.message}
                        </Field.ErrorText>
                      </Field.Root>
                      <Field.Root required invalid={!!errors.sepa_einzug}>
                        <Field.Label>
                          Einzug (Zahlungsintervall)
                          <Field.RequiredIndicator />
                        </Field.Label>
                        <Controller
                          name="sepa_einzug"
                          control={control}
                          rules={{ required: "Bitte Einzugsintervall wählen" }}
                          render={({ field }) => (
                            <RadioGroup.Root
                              name={field.name}
                              value={field.value}
                              onValueChange={({ value }) =>
                                field.onChange(value)
                              }
                            >
                              <VStack align="start" gap={2}>
                                <RadioGroup.Item value="halbjaehrlich">
                                  <RadioGroup.ItemHiddenInput
                                    onBlur={field.onBlur}
                                  />
                                  <RadioGroup.ItemIndicator />
                                  <RadioGroup.ItemText>
                                    Halbjährlich
                                  </RadioGroup.ItemText>
                                </RadioGroup.Item>
                                <RadioGroup.Item value="jaehrlich">
                                  <RadioGroup.ItemHiddenInput
                                    onBlur={field.onBlur}
                                  />
                                  <RadioGroup.ItemIndicator />
                                  <RadioGroup.ItemText>
                                    Jährlich
                                  </RadioGroup.ItemText>
                                </RadioGroup.Item>
                              </VStack>
                            </RadioGroup.Root>
                          )}
                        />
                        <Field.ErrorText>
                          {errors.sepa_einzug?.message}
                        </Field.ErrorText>
                      </Field.Root>
                      <Text fontSize="xs" color="gray.500">
                        Ich / Wir ermächtigen den TC Holzminden von 1928 von
                        meinem/ unserem Konto mittels Lastschrift Zahlungen
                        einzuziehen. Zugleich weise ich mein Kreditinstitut an,
                        die vom TC Holzminden von 1928 e. V. auf mein Konto
                        gezogenen Lastschriften einzulösen. Ich / wir können
                        innerhalb von acht Wochen, beginnend mit dem
                        Belastungsdatum, die Erstattung des belasteten Betrages
                        verlangen. Im Falle einer fehlerhaften Deckung des
                        Kontos trage ich die Kosten der Rücklastschrift.
                      </Text>
                      <Field.Root invalid={!!errors.sepa_lastschriftmandat}>
                        <Controller
                          control={control}
                          name="sepa_lastschriftmandat"
                          rules={{
                            validate: (v) =>
                              v || "Bitte SEPA-Lastschriftmandat akzeptieren",
                          }}
                          render={({ field }) => (
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
                                  Ich erteile das SEPA-Lastschriftmandat
                                </Checkbox.Label>
                              </Checkbox.Root>
                              <Field.ErrorText>
                                {errors.sepa_lastschriftmandat?.message}
                              </Field.ErrorText>
                            </Field.Root>
                          )}
                        />
                      </Field.Root>
                    </VStack>
                    <Field.Root
                      className="my-2 mt-4"
                      invalid={!!errors.datenschutz}
                    >
                      {/* <Field.Label>Datenschutz</Field.Label> */}
                      <Controller
                        control={control}
                        name="datenschutz"
                        rules={{
                          validate: (v) => v || "Bitte Datenschutz akzeptieren",
                        }}
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
                                <Link
                                  href={"/datenschutz"}
                                  className="underline underline-offset-4"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Datenschutzerklärung
                                </Link>{" "}
                                akzeptieren
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
              )}
            </Dialog.Body>
            <Dialog.Footer className="flex flex-col md:flex-row gap-3 md:gap-3">
              <Dialog.ActionTrigger asChild>
                <Button
                  variant="outline"
                  disabled={loading}
                  className="w-full md:w-auto"
                >
                  Abrechen
                </Button>
              </Dialog.ActionTrigger>
              <Button
                className="w-full md:w-auto"
                loading={loading}
                colorPalette={"gold"}
                type="submit"
                form="member-register-form"
                disabled={
                  loading ||
                  !watch("datenschutz") ||
                  !watch("sepa_lastschriftmandat")
                }
              >
                Mitgliedsantrag verbindlich absenden
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
}

export default MemberRegisterForm;
