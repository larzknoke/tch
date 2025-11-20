import {
  HStack,
  Table,
  Icon,
  Tabs,
  Input,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Checker } from "@/lib/utils";
import { useMemo, useState } from "react";

export const NewsletterTable = ({ newsletterData, onEdit, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNewsletters = useMemo(() => {
    if (!searchQuery.trim()) return newsletterData;

    const query = searchQuery.toLowerCase();
    return newsletterData?.filter((newsletter) => {
      return newsletter.email?.toLowerCase().includes(query);
    });
  }, [newsletterData, searchQuery]);

  const verifiedNewsletters = useMemo(() => {
    return (
      filteredNewsletters?.filter((newsletter) => newsletter.verified) || []
    );
  }, [filteredNewsletters]);

  const unverifiedNewsletters = useMemo(() => {
    return (
      filteredNewsletters?.filter((newsletter) => !newsletter.verified) || []
    );
  }, [filteredNewsletters]);

  const renderTable = (data) => (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Email</Table.ColumnHeader>
          <Table.ColumnHeader>Bestätigt</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data && data.length > 0 ? (
          data.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.email}</Table.Cell>
              <Table.Cell>{Checker(item.verified)}</Table.Cell>
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
            <Table.Cell colSpan={3} textAlign="center" color="gray.500">
              Keine Newsletter-Abonnenten vorhanden
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table.Root>
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
          placeholder="Suche nach Email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          paddingLeft="10"
        />
      </Flex>
      <Tabs.Root defaultValue="verified" width="100%">
        <Tabs.List>
          <Tabs.Trigger value="verified">
            Bestätigt ({verifiedNewsletters.length})
          </Tabs.Trigger>
          <Tabs.Trigger value="unverified">
            Unbestätigt ({unverifiedNewsletters.length})
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="verified" pt={4}>
          {renderTable(verifiedNewsletters)}
        </Tabs.Content>
        <Tabs.Content value="unverified" pt={4}>
          {renderTable(unverifiedNewsletters)}
        </Tabs.Content>
      </Tabs.Root>
    </VStack>
  );
};
