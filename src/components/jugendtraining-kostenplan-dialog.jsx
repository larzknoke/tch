import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";
import { CloseButton, Dialog, Portal, Text } from "@chakra-ui/react";
import { useState } from "react";
import JugendtrainingKostenplan from "@/components/jugendtraining-kostenplan";

function JugendtrainingKostenplanDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root size="xl" open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <Text className="button bg-white text-tch-blue hover:cursor-pointer">
          Kostenplan Jugendtraining
          <ChevronDoubleRightIcon className="size-5 pt-1" />
        </Text>
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Kostenplan Jugendtraining</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <JugendtrainingKostenplan title="" />
            </Dialog.Body>

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default JugendtrainingKostenplanDialog;
