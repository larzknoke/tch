import { Badge, HStack, Table, Icon, Text, Tabs } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Checker, verifiedWorker } from "@/lib/utils";
import { useMemo } from "react";

export const EffortTable = ({ effortsData, onEdit, onDelete }) => {
  const activeEfforts = useMemo(() => {
    return effortsData?.filter((effort) => !effort.finished) || [];
  }, [effortsData]);

  const finishedEfforts = useMemo(() => {
    return effortsData?.filter((effort) => effort.finished) || [];
  }, [effortsData]);

  const renderTable = (data) => (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Einsatz</Table.ColumnHeader>
          <Table.ColumnHeader>Datum</Table.ColumnHeader>
          <Table.ColumnHeader>Teilnehmer</Table.ColumnHeader>
          <Table.ColumnHeader>Aktiv</Table.ColumnHeader>
          <Table.ColumnHeader>Beendet</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data && data.length > 0 ? (
          data.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.title}</Table.Cell>
              <Table.Cell>{item.date}</Table.Cell>
              <Table.Cell>
                {verifiedWorker(item.workers)} von {item.maxWorker || "-"}
                <Text fontSize={"xs"} color={"gray.500"}>
                  {item.workers.length > 0 &&
                    item.workers
                      .filter((worker) => worker.verified == true)
                      .map((worker) => (
                        <Badge
                          key={worker.id}
                          colorScheme="green"
                          fontSize={"xs"}
                          mr={1}
                          mt={1}
                        >
                          {worker.name}
                        </Badge>
                      ))}
                </Text>
              </Table.Cell>
              <Table.Cell>{Checker(item.active)}</Table.Cell>
              <Table.Cell>{Checker(item.finished)}</Table.Cell>
              <Table.Cell textAlign="end">
                <HStack placeContent={"end"} gap={4}>
                  <Tooltip content="Bearbeiten">
                    <Icon
                      size={"sm"}
                      onClick={() => onEdit(item)}
                      className="cursor-pointer"
                    >
                      <PencilSquareIcon />
                    </Icon>
                  </Tooltip>
                  <Tooltip content="Löschen">
                    <Icon
                      size={"sm"}
                      color="red.600"
                      onClick={() => onDelete(item.id)}
                      className="cursor-pointer"
                    >
                      <TrashIcon />
                    </Icon>
                  </Tooltip>
                </HStack>
              </Table.Cell>
            </Table.Row>
          ))
        ) : (
          <Table.Row>
            <Table.Cell colSpan={6} textAlign="center" color="gray.500">
              Keine Arbeitseinsätze vorhanden
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table.Root>
  );

  return (
    <Tabs.Root defaultValue="active" width="100%">
      <Tabs.List>
        <Tabs.Trigger value="active">
          Einsätze ({activeEfforts.length})
        </Tabs.Trigger>
        <Tabs.Trigger value="finished">
          Beendete Einsätze ({finishedEfforts.length})
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="active" pt={4}>
        {renderTable(activeEfforts)}
      </Tabs.Content>
      <Tabs.Content value="finished" pt={4}>
        {renderTable(finishedEfforts)}
      </Tabs.Content>
    </Tabs.Root>
  );
};
