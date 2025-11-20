import { Tooltip } from "@/components/ui/tooltip";
import LayoutAdmin from "@/components/ui/layouts/layout-admin";
import { WorkerModalCreate } from "@/components/worker/worker-modal-create";
import { VStack, Flex } from "@chakra-ui/react";
import BallLoader from "@/components/ui/loading-ball";
import { useState, useEffect } from "react";
import { toaster } from "@/components/ui/toaster";
import { WorkerModalEdit } from "@/components/worker/worker-modal-edit";
import { NewsletterTable } from "@/components/newsletter/newsletter-table";

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

  function handleEdit(newsletter) {
    setSelectedWorker(newsletter);
    setOpenEditModal(true);
  }

  useEffect(() => {
    getNewsletters();
  }, []);

  return (
    <VStack py={5} gap={5} placeItems={"flex-start"}>
      {newsletterData && !loading ? (
        <NewsletterTable
          newsletterData={newsletterData}
          onEdit={handleEdit}
          onDelete={deleteWorker}
        />
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
