import LayoutAdmin from "@/components/ui/layouts/layout-admin";
import BallLoader from "@/components/ui/loading-ball";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Alert,
  HStack,
  Menu,
  VStack,
  Flex,
  Spacer,
  Image,
  Table,
  Icon,
  Text,
} from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";

import { useState, useEffect } from "react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Checker, dateFormatter, verifiedWorker } from "@/lib/utils";
import { EffortModalCreate } from "@/components/efforts/effort-modal-create";
import { toaster } from "@/components/ui/toaster";
import { EffortModalEdit } from "@/components/efforts/effort-modal-edit";

function Admin() {
  const [effortsData, setEffortsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedEffort, setSelectedEffort] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);

  async function getEfforts() {
    try {
      // setLoading(true);
      const res = await fetch(`/api/efforts`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (res.status != 200) {
        // setLoading(false);
        // setInviteError(true);
      } else {
        const resData = await res.json();
        setEffortsData(resData);
        // setLoading(false);
      }
    } catch (error) {
      console.log("api fetch error");
      console.error("Err", error);
      // setInviteError(true);
    }
  }

  async function deleteEffort(id) {
    setLoading(true);
    const resData = await fetch("/api/efforts?id=" + id, {
      method: "DELETE",
    });
    if (resData.status != 200) {
      toaster.create({
        description: `Ein Fehler ist aufgetreten`,
        type: "error",
      });
      setLoading(false);
    } else {
      // const resData = await res.json();
      toaster.create({
        description: `Arbeotseinsatz gelöscht.`,
        type: "success",
      });
      setLoading(false);
      getEfforts();
    }
  }

  useEffect(() => {
    getEfforts();
  }, []);

  return (
    <VStack py={5} gap={5} placeItems={"flex-start"}>
      {effortsData && !loading ? (
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
            {effortsData &&
              effortsData.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.title}</Table.Cell>
                  <Table.Cell>{item.date}</Table.Cell>
                  <Table.Cell>
                    {verifiedWorker(item.workers)} von {item.maxWorker || "-"}
                    <Text fontSize={"xs"} color={"gray.500"}>
                      {/* {item.workers.length} Teilnehmer */}
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
                          onClick={() => {
                            setSelectedEffort(item);
                            setOpenEditModal(true);
                          }}
                        >
                          <PencilSquareIcon />
                        </Icon>
                      </Tooltip>
                      <Tooltip content="Löschen">
                        <Icon
                          size={"sm"}
                          color="red.600"
                          onClick={() => deleteEffort(item.id)}
                        >
                          <TrashIcon />
                        </Icon>
                      </Tooltip>
                    </HStack>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table.Root>
      ) : (
        <Flex justify="center" w={"100%"}>
          <BallLoader />
        </Flex>
      )}
      <EffortModalCreate getEfforts={getEfforts} />
      <EffortModalEdit
        effort={selectedEffort}
        open={openEditModal}
        setOpen={setOpenEditModal}
        getEfforts={getEfforts}
      />
    </VStack>
  );
}

export default Admin;

Admin.getLayout = function getLayout(page) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
