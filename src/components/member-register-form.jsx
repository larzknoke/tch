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
  Heading,
  Table,
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
                                  {item.label} – {item.amountFormatted} €{" "}
                                  {item.footnote}
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
                              <Text
                                fontSize="sm"
                                fontWeight="bold"
                                className="underline"
                              >
                                Bedingungen
                              </Text>
                              <Text fontSize="sm">
                                Der jeweilige Jahresbeitrag ergibt sich aus der
                                vorstehenden Beitragsordnung. <br />
                                Eine schriftliche Beitragsrechnung erfolgt nur
                                auf schriftlichen Antrag beim Kassenwart.
                              </Text>

                              <Table.Root size="sm" variant="outline">
                                <Table.Body>
                                  <Table.Row>
                                    <Table.Cell
                                      fontWeight="medium"
                                      verticalAlign={"top"}
                                    >
                                      *{" "}
                                    </Table.Cell>
                                    <Table.Cell>
                                      Der Nachweis einer Vollmitgliedschaft ist
                                      dem Kassenwart bis zum Ende des lfd.
                                      Kalenderjahres für das Folgejahr
                                      unaufgefordert vorzulegen. <br />
                                      <strong>
                                        Die Voraussetzung für eine der o.g.
                                        Zweitmitgliedschaften ist die aktive
                                        Teilnahme am Punktspielbetrieb des TC
                                        Holzminden v. 1928 e.V.
                                      </strong>
                                    </Table.Cell>
                                  </Table.Row>
                                  <Table.Row>
                                    <Table.Cell
                                      fontWeight="medium"
                                      verticalAlign={"top"}
                                    >
                                      ***{" "}
                                    </Table.Cell>
                                    <Table.Cell>
                                      Schüler und Studenten, die das 18.
                                      Lebensjahr vollendet haben, müssen dem
                                      Kassenwart unaufgefordert bis zum Ende des
                                      lfd. Kalenderjahres eine Bescheinigung
                                      ihres Status für das Folgejahr vorlegen,
                                      wenn der Beitrag auch im Folgejahr gelten
                                      soll.{" "}
                                      <span className="underline">
                                        Im Eintrittsjahr ist die Mitgliedschaft
                                        einmalig beitragsfrei.
                                      </span>
                                    </Table.Cell>
                                  </Table.Row>
                                  <Table.Row>
                                    <Table.Cell fontWeight="medium">
                                      ***
                                    </Table.Cell>
                                    <Table.Cell verticalAlign={"top"}>
                                      Im Eintrittsjahr reduziert sich der
                                      Mitgliedsbeitrag einmalig um 100,00 €
                                    </Table.Cell>
                                  </Table.Row>
                                </Table.Body>
                              </Table.Root>
                              <Text fontSize="sm">
                                Der Jahresbeitrag wird jeweils zum{" "}
                                <strong>01.03.</strong> und{" "}
                                <strong>01.08.</strong> eines jeden Jahres
                                fällig. Jedes Mitglied hat dazu die vom Club
                                vorgedruckte Einzugsermächtigung auszufüllen
                                oder digital einzureichen.
                              </Text>
                              <Text
                                fontSize="sm"
                                fontWeight="bold"
                                marginTop={3}
                                className="underline"
                              >
                                Arbeitsdienst
                              </Text>
                              <VStack align="stretch" gap={2}>
                                <Text fontSize="sm">
                                  Verpflichtet zum Arbeitsdienst sind alle
                                  aktiven Mitglieder vom <strong>16.</strong>{" "}
                                  bis zum <strong>70.</strong> Lebensjahr. Die
                                  Teilnahme kann zum Frühjahrs- oder zum
                                  Herbstarbeitsdienst erfolgen.{" "}
                                </Text>
                                <Text fontSize="sm">
                                  Die zu leistende Arbeitszeit beträgt{" "}
                                  <strong>4,00 Stunden.</strong>
                                </Text>
                                <Text fontSize="sm">
                                  Bei Nichtteilnahme wird eine Gebühr von{" "}
                                  <strong>60,00 € </strong>
                                  erhoben. Die Termine werden auf der Homepage
                                  des Clubs (
                                  <a
                                    href="https://www.tc1928.com/termine"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    www.tc1928.com/termine
                                  </a>
                                  ) veröffentlicht.
                                </Text>
                              </VStack>
                              <Text
                                fontSize="sm"
                                fontWeight="bold"
                                marginTop={3}
                                className="underline"
                              >
                                Satzung
                              </Text>
                              <Text fontSize={"sm"}>
                                Die aktuelle Fassung der Satzung ist auf unserer
                                Homepage{" "}
                                <a
                                  className="underline"
                                  href="https://www.tc1928.com/club/satzung/"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  www.tc1928.com
                                </a>{" "}
                                einsehbar.
                              </Text>
                              <Text
                                fontSize="sm"
                                fontWeight="bold"
                                className="underline"
                                marginTop={3}
                              >
                                Beitragsordnung
                              </Text>
                              <Table.Root size="sm" variant="outline">
                                <Table.Header>
                                  <Table.Row>
                                    <Table.ColumnHeader fontWeight="medium">
                                      Mitgliedsart
                                    </Table.ColumnHeader>
                                    <Table.ColumnHeader fontWeight="medium">
                                      Beitragsgruppe
                                    </Table.ColumnHeader>
                                    <Table.ColumnHeader fontWeight="medium">
                                      Betrag (Euro)
                                    </Table.ColumnHeader>
                                  </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                  <Table.Row>
                                    <Table.Cell>
                                      Jugendliche bis 18 Jahre **
                                    </Table.Cell>
                                    <Table.Cell>A</Table.Cell>
                                    <Table.Cell>100,00</Table.Cell>
                                  </Table.Row>
                                  <Table.Row>
                                    <Table.Cell>
                                      Aktives Einzelmitglied ***
                                    </Table.Cell>
                                    <Table.Cell>B</Table.Cell>
                                    <Table.Cell>230,00</Table.Cell>
                                  </Table.Row>
                                  <Table.Row>
                                    <Table.Cell>
                                      Aktives Einzelmitglied – mit max. 3
                                      Kindern bis 18 Jahre ***
                                    </Table.Cell>
                                    <Table.Cell>C</Table.Cell>
                                    <Table.Cell>330,00</Table.Cell>
                                  </Table.Row>
                                  <Table.Row>
                                    <Table.Cell>
                                      Aktive Ehepaar/Lebensgemeinschaft ***
                                    </Table.Cell>
                                    <Table.Cell>D</Table.Cell>
                                    <Table.Cell>350,00</Table.Cell>
                                  </Table.Row>
                                  <Table.Row>
                                    <Table.Cell>
                                      Aktive Ehepaar/Lebensgemeinschaft mit max.
                                      3 Kindern bis 18 Jahre ***
                                    </Table.Cell>
                                    <Table.Cell>E</Table.Cell>
                                    <Table.Cell>450,00</Table.Cell>
                                  </Table.Row>
                                  <Table.Row>
                                    <Table.Cell>
                                      Passives / Förderndes Mitglied –{" "}
                                      <Text as="u">
                                        keine Spielberechtigung
                                      </Text>
                                    </Table.Cell>
                                    <Table.Cell>F</Table.Cell>
                                    <Table.Cell>50,00</Table.Cell>
                                  </Table.Row>
                                  <Table.Row>
                                    <Table.Cell>
                                      Zweitmitgliedschaft bei Vollmitgliedschaft
                                      in einem anderen Tennisverein *
                                    </Table.Cell>
                                    <Table.Cell>G</Table.Cell>
                                    <Table.Cell>150,00</Table.Cell>
                                  </Table.Row>
                                  <Table.Row>
                                    <Table.Cell>
                                      Zweitmitgliedschaft ausschließlich für den
                                      Punktspielbetrieb bei Vollmitgliedschaft
                                      in einem anderen Tennisverein *
                                    </Table.Cell>
                                    <Table.Cell>H</Table.Cell>
                                    <Table.Cell>95,00</Table.Cell>
                                  </Table.Row>
                                </Table.Body>
                              </Table.Root>
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
                      <Text fontSize={"sm"} fontWeight={"bold"}>
                        Gläubiger ID-Nr.: DE 60ZZZ00001202950
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
                                    Halbjährlich (01.03. und 01.08.)
                                  </RadioGroup.ItemText>
                                </RadioGroup.Item>
                                <RadioGroup.Item value="jaehrlich">
                                  <RadioGroup.ItemHiddenInput
                                    onBlur={field.onBlur}
                                  />
                                  <RadioGroup.ItemIndicator />
                                  <RadioGroup.ItemText>
                                    Jährlich (01.03.)
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
