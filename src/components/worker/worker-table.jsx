import { Tooltip } from "@/components/ui/tooltip";
import { HStack, Table, Icon, Flex, Tabs } from "@chakra-ui/react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Checker } from "@/lib/utils";
import BallLoader from "@/components/ui/loading-ball";
import { useMemo } from "react";

export default function WorkerTable({
  workersData,
  loading,
  onEdit,
  onDelete,
}) {
  const verifiedWorkers = useMemo(() => {
    return workersData?.filter((worker) => worker.verified) || [];
  }, [workersData]);

  const unverifiedWorkers = useMemo(() => {
    return workersData?.filter((worker) => !worker.verified) || [];
  }, [workersData]);

  if (loading) {
    return (
      <Flex justify="center" w={"100%"}>
        <BallLoader />
      </Flex>
    );
  }

  const renderTable = (data) => (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Name</Table.ColumnHeader>
          <Table.ColumnHeader>Email</Table.ColumnHeader>
          <Table.ColumnHeader>Telefon</Table.ColumnHeader>
          <Table.ColumnHeader> Bestätigt</Table.ColumnHeader>
          <Table.ColumnHeader> Einsatz</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data && data.length > 0 ? (
          data.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.email}</Table.Cell>
              <Table.Cell>{item.phone}</Table.Cell>
              <Table.Cell>{Checker(item.verified)}</Table.Cell>
              <Table.Cell>{item.effort?.title || "-"}</Table.Cell>
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
              Keine Teilnehmer vorhanden
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table.Root>
  );

  return (
    <Tabs.Root defaultValue="verified" width="100%">
      <Tabs.List>
        <Tabs.Trigger value="verified">
          Bestätigte Teilnehmer ({verifiedWorkers.length})
        </Tabs.Trigger>
        <Tabs.Trigger value="unverified">
          Unbestätigte Teilnehmer ({unverifiedWorkers.length})
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="verified" pt={4}>
        {renderTable(verifiedWorkers)}
      </Tabs.Content>
      <Tabs.Content value="unverified" pt={4}>
        {renderTable(unverifiedWorkers)}
      </Tabs.Content>
    </Tabs.Root>
  );
}
