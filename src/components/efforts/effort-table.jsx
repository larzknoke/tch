import {
  Badge,
  HStack,
  Table,
  Icon,
  Text,
  Tabs,
  Input,
  VStack,
  Flex,
  Box,
} from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Checker, verifiedWorker } from "@/lib/utils";
import { useMemo, useState } from "react";

export const EffortTable = ({
  effortsData,
  onEdit,
  onDelete,
  onDeleteWorker,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEfforts = useMemo(() => {
    if (!searchQuery.trim()) return effortsData;

    const query = searchQuery.toLowerCase();
    return effortsData?.filter((effort) => {
      return (
        effort.title?.toLowerCase().includes(query) ||
        effort.date?.toLowerCase().includes(query) ||
        effort.content?.toLowerCase().includes(query) ||
        effort.workers?.some((worker) =>
          worker.name?.toLowerCase().includes(query)
        )
      );
    });
  }, [effortsData, searchQuery]);

  const activeEfforts = useMemo(() => {
    return filteredEfforts?.filter((effort) => !effort.finished) || [];
  }, [filteredEfforts]);

  const finishedEfforts = useMemo(() => {
    return filteredEfforts?.filter((effort) => effort.finished) || [];
  }, [filteredEfforts]);

  const renderTable = (data) => (
    <Box overflowX="auto" width="100%">
      <Table.Root minWidth={{ base: "800px", md: "100%" }}>
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
                            className="cursor-pointer hover:bg-red-400"
                            onClick={() => {
                              if (
                                confirm(
                                  `Möchten Sie ${worker.name} wirklich löschen?`
                                )
                              ) {
                                onDeleteWorker(worker.id);
                              }
                            }}
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
    </Box>
  );

  return (
    <VStack width="100%" gap={4}>
      <Flex width="100%" position="relative">
        <Icon
          position="absolute"
          left="3"
          top="50%"
          transform="translateY(-50%)"
          color="gray.400"
          size="sm"
        >
          <MagnifyingGlassIcon />
        </Icon>
        <Input
          placeholder="Suche nach Einsatz, Datum, Beschreibung oder Teilnehmer..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          paddingLeft="10"
        />
      </Flex>
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
    </VStack>
  );
};
