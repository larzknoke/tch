import { Tooltip } from "@/components/ui/tooltip";
import LayoutAdmin from "@/components/ui/layouts/layout-admin";
import { WorkerModalCreate } from "@/components/worker/worker-modal-create";
import { HStack, VStack, Flex, Table, Icon } from "@chakra-ui/react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Checker, dateFormatter } from "@/lib/utils";
import BallLoader from "@/components/ui/loading-ball";
import { useState, useEffect, useRef } from "react";
import { toaster } from "@/components/ui/toaster";
import { WorkerModalEdit } from "@/components/worker/worker-modal-edit";

function Newsletter() {
  const [newsletterData, setNewsletterData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);

  async function getNewsletters() {
    try {
      setLoading(true);
      const res = await fetch(`/api/newsletters`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (res.status != 200) {
        setLoading(false);
        // setInviteError(true);
      } else {
        const resData = await res.json();
        setNewsletterData(resData);
        setLoading(false);
      }
    } catch (error) {
      console.log("api fetch error");
      console.error("Err", error);
      // setInviteError(true);
    }
  }

  async function deleteWorker(id) {
    setLoading(true);
    const resData = await fetch("/api/newsletters?id=" + id, {
      method: "DELETE",
    });
    if (resData.status != 200) {
      toaster.create({
        description: `Ein Fehler ist aufgetreten`,
        type: "error",
      });
      setLoading(false);
    } else {
      toaster.create({
        description: `Newsletter gelöscht.`,
        type: "success",
      });
      getNewsletters();
      setLoading(false);
    }
  }

  useEffect(() => {
    getNewsletters();
  }, []);

  return (
    <VStack py={5} gap={5} placeItems={"flex-start"}>
      {newsletterData && !loading ? (
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Email</Table.ColumnHeader>
              <Table.ColumnHeader> Bestätigt</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {newsletterData &&
              newsletterData.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.email}</Table.Cell>
                  <Table.Cell>{Checker(item.verified)}</Table.Cell>
                  <Table.Cell textAlign="end">
                    <HStack placeContent={"end"} gap={4}>
                      <Tooltip content="Bearbeiten">
                        <Icon
                          size={"sm"}
                          onClick={() => {
                            setSelectedWorker(item);
                            // setDialogOpen(true);
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
                          onClick={() => deleteWorker(item.id)}
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
      {/* <WorkerModalCreate getNewsletters={getNewsletters} />
      <WorkerModalEdit
        worker={selectedWorker}
        open={openEditModal}
        setOpen={setOpenEditModal}
        getNewsletters={getNewsletters}
      /> */}
    </VStack>
  );
}

export default Newsletter;

Newsletter.getLayout = function getLayout(page) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
