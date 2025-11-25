import { Tooltip } from "@/components/ui/tooltip";
import {
  Badge,
  Table,
  Icon,
  Input,
  Tabs,
  VStack,
  Box,
  HStack,
  Flex,
} from "@chakra-ui/react";
import {
  TrashIcon,
  PencilSquareIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Checker } from "@/lib/utils";
import BallLoader from "@/components/ui/loading-ball";
import { useState, useMemo } from "react";
import { dateFormatter } from "@/lib/utils";
import { pdf } from "@react-pdf/renderer";
import { MemberRegistrationPDF } from "@/pdf/member-registration-pdf";
import { toaster } from "@/components/ui/toaster";

export function MemberRegistrationTable({
  registrationsData,
  loading,
  onEdit,
  onDelete,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [downloadingId, setDownloadingId] = useState(null);

  const filteredRegistrations = useMemo(() => {
    if (!searchQuery.trim()) return registrationsData;

    const query = searchQuery.toLowerCase();
    return registrationsData?.filter((reg) => {
      return (
        reg.name?.toLowerCase().includes(query) ||
        reg.vorname?.toLowerCase().includes(query) ||
        reg.email?.toLowerCase().includes(query) ||
        reg.mitgliedsart?.toLowerCase().includes(query) ||
        reg.ort?.toLowerCase().includes(query)
      );
    });
  }, [registrationsData, searchQuery]);

  const verifiedRegistrations = useMemo(() => {
    return filteredRegistrations?.filter((reg) => reg.verified) || [];
  }, [filteredRegistrations]);

  const unverifiedRegistrations = useMemo(() => {
    return filteredRegistrations?.filter((reg) => !reg.verified) || [];
  }, [filteredRegistrations]);

  if (loading) {
    return (
      <Flex justify="center" w={"100%"}>
        <BallLoader />
      </Flex>
    );
  }

  async function handleDownloadPDF(registration) {
    try {
      setDownloadingId(registration.id);

      // Generate PDF document
      const blob = await pdf(
        <MemberRegistrationPDF registration={registration} />
      ).toBlob();

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Mitgliedsantrag_${registration.vorname}_${registration.name}_${registration.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toaster.create({
        description: "PDF erfolgreich heruntergeladen",
        type: "success",
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      toaster.create({
        description: "Fehler beim Erstellen der PDF",
        type: "error",
      });
    } finally {
      setDownloadingId(null);
    }
  }

  const renderTable = (data) => (
    <Box overflowX="auto" width="100%">
      <Table.Root minWidth={{ base: "1200px", md: "100%" }}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Email</Table.ColumnHeader>
            <Table.ColumnHeader>Geburtsdatum</Table.ColumnHeader>
            <Table.ColumnHeader>Ort</Table.ColumnHeader>
            <Table.ColumnHeader>Mitgliedsart</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader>Bearbeitet</Table.ColumnHeader>
            <Table.ColumnHeader>Erstellt</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data && data.length > 0 ? (
            data.map((registration) => (
              <Table.Row key={registration.id}>
                <Table.Cell>
                  {registration.vorname} {registration.name}
                </Table.Cell>
                <Table.Cell>{registration.email}</Table.Cell>
                <Table.Cell>{registration.geburtsdatum}</Table.Cell>
                <Table.Cell>
                  {registration.plz} {registration.ort}
                </Table.Cell>
                <Table.Cell>{registration.mitgliedsart}</Table.Cell>
                <Table.Cell>{registration.status}</Table.Cell>
                <Table.Cell>
                  <Badge
                    colorPalette={registration.processed ? "green" : "gray"}
                  >
                    {registration.processed ? "Ja" : "Nein"}
                  </Badge>
                </Table.Cell>
                <Table.Cell>{dateFormatter(registration.createdAt)}</Table.Cell>
                <Table.Cell textAlign="end">
                  <HStack placeContent={"end"} gap={4}>
                    <Tooltip content="PDF herunterladen">
                      <Icon
                        size={"sm"}
                        onClick={() => handleDownloadPDF(registration)}
                        className="cursor-pointer"
                        opacity={downloadingId === registration.id ? 0.5 : 1}
                      >
                        <ArrowDownTrayIcon />
                      </Icon>
                    </Tooltip>
                    <Tooltip content="Bearbeiten">
                      <Icon
                        size={"sm"}
                        onClick={() => onEdit(registration)}
                        className="cursor-pointer"
                      >
                        <PencilSquareIcon />
                      </Icon>
                    </Tooltip>
                    <Tooltip content="Löschen">
                      <Icon
                        size={"sm"}
                        color="red.600"
                        onClick={() => onDelete(registration.id)}
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
              <Table.Cell colSpan={9} textAlign="center" color="gray.500">
                Keine Anträge vorhanden
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
          placeholder="Suche nach Name, Email, Mitgliedsart oder Ort..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          paddingLeft="10"
        />
      </Flex>
      <Tabs.Root defaultValue="verified" width="100%">
        <Tabs.List>
          <Tabs.Trigger value="verified">
            Bestätigte Anträge ({verifiedRegistrations.length})
          </Tabs.Trigger>
          <Tabs.Trigger value="unverified">
            Unbestätigte Anträge ({unverifiedRegistrations.length})
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="verified" pt={4}>
          {renderTable(verifiedRegistrations)}
        </Tabs.Content>
        <Tabs.Content value="unverified" pt={4}>
          {renderTable(unverifiedRegistrations)}
        </Tabs.Content>
      </Tabs.Root>
    </VStack>
  );
}
