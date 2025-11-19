import LayoutAdmin from "@/components/ui/layouts/layout-admin";
import BallLoader from "@/components/ui/loading-ball";
import { VStack, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { verifiedWorker } from "@/lib/utils";
import { EffortModalCreate } from "@/components/efforts/effort-modal-create";
import { toaster } from "@/components/ui/toaster";
import { EffortModalEdit } from "@/components/efforts/effort-modal-edit";
import { EffortTable } from "@/components/efforts/effort-table";

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
      toaster.create({
        description: `Arbeitseinsatz gelöscht.`,
        type: "success",
      });
      setLoading(false);
      getEfforts();
    }
  }

  function handleEdit(effort) {
    setSelectedEffort(effort);
    setOpenEditModal(true);
  }

  useEffect(() => {
    getEfforts();
  }, []);

  return (
    <VStack py={5} gap={5} placeItems={"flex-start"}>
      {effortsData && !loading ? (
        <EffortTable
          effortsData={effortsData}
          onEdit={handleEdit}
          onDelete={deleteEffort}
        />
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
