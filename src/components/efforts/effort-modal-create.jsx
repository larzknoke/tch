import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Field,
  Input,
  VStack,
  Textarea,
  Switch
} from "@chakra-ui/react";

export const EffortModalCreate = () => {
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
              <VStack gap={4}>
                <Field.Root required>
                  <Field.Label>Name
                    <Field.RequiredIndicator />
                  </Field.Label>
                  <Input name="title" />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Beschreibung</Field.Label>
                  <Textarea name="content" />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Max. Teilnehmer</Field.Label>
                  <Input name="maxWorker" type="Number" />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Datum</Field.Label>
                  <Input name="date" type="datetime-local" />
                </Field.Root>
                <Field.Root>
                  <Switch.Root>
                    <Switch.HiddenInput />
                    <Switch.Control />
                    <Switch.Label>Aktiv</Switch.Label>
                  </Switch.Root>{" "}
                </Field.Root>
                <Field.Root>
                  <Switch.Root>
                    <Switch.HiddenInput />
                    <Switch.Control />
                    <Switch.Label>Beendet</Switch.Label>
                  </Switch.Root>{" "}
                </Field.Root>
              </VStack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Abbrechen</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette={"green"}>Speichern</Button>
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
