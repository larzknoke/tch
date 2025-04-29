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
} from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";

import { useState, useEffect } from "react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Checker, dateFormatter } from "@/lib/utils";
import { EffortModalCreate } from "@/components/efforts/effort-modal-create";

function Admin() {
  const [effortsData, setEffortsData] = useState(null);

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

  useEffect(() => {
    getEfforts();
  }, []);

  return (
    <VStack py={5} gap={5} placeItems={"flex-start"}>
      {effortsData ? (
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
                  <Table.Cell>{dateFormatter(item.date, true)}</Table.Cell>
                  <Table.Cell>1 von {item.maxWorker || "-"}</Table.Cell>
                  <Table.Cell>{Checker(item.active)}</Table.Cell>
                  <Table.Cell>{Checker(item.finished)}</Table.Cell>
                  <Table.Cell textAlign="end">
                    <HStack placeContent={"end"} gap={4}>
                      <Tooltip content="Bearbeiten">
                        <Icon size={"sm"}>
                          <PencilSquareIcon />
                        </Icon>
                      </Tooltip>
                      <Tooltip content="Löschen">
                        <Icon size={"sm"} color="red.600">
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
      <EffortModalCreate />
    </VStack>
  );
}

export default Admin;

Admin.getLayout = function getLayout(page) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
