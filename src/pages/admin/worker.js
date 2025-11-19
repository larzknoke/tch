import LayoutAdmin from "@/components/ui/layouts/layout-admin";
import { WorkerModalCreate } from "@/components/worker/worker-modal-create";
import { VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { toaster } from "@/components/ui/toaster";
import { WorkerModalEdit } from "@/components/worker/worker-modal-edit";
import WorkerTable from "@/components/worker/worker-table";

function Worker() {
  const [workersData, setWorkersData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);

  async function getWorkers() {
    try {
      setLoading(true);
      const res = await fetch(`/api/workers`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (res.status != 200) {
        setLoading(false);
        // setInviteError(true);
      } else {
        const resData = await res.json();
        setWorkersData(resData);
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
    const resData = await fetch("/api/workers?id=" + id, {
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
        description: `Teilnehmer gelöscht.`,
        type: "success",
      });
      getWorkers();
      setLoading(false);
    }
  }

  useEffect(() => {
    getWorkers();
  }, []);

  return (
    <VStack py={5} gap={5} placeItems={"flex-start"}>
      <WorkerTable
        workersData={workersData}
        loading={loading}
        onEdit={(worker) => {
          setSelectedWorker(worker);
          setOpenEditModal(true);
        }}
        onDelete={deleteWorker}
      />
      <WorkerModalCreate getWorkers={getWorkers} />
      <WorkerModalEdit
        worker={selectedWorker}
        open={openEditModal}
        setOpen={setOpenEditModal}
        getWorkers={getWorkers}
      />
    </VStack>
  );
}

export default Worker;

Worker.getLayout = function getLayout(page) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
