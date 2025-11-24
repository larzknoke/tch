import LayoutAdmin from "@/components/ui/layouts/layout-admin";
import { VStack, Flex } from "@chakra-ui/react";
import BallLoader from "@/components/ui/loading-ball";
import { useState, useEffect } from "react";
import { toaster } from "@/components/ui/toaster";
import { MemberRegistrationTable } from "@/components/member-registration/member-registration-table";
import { MemberRegistrationModalEdit } from "@/components/member-registration/member-registration-modal-edit";

function MemberRegistrations() {
  const [registrationsData, setRegistrationsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);

  async function getRegistrations() {
    try {
      setLoading(true);
      const res = await fetch(`/api/memberRegistrations`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (res.status !== 200) {
        setLoading(false);
        toaster.create({
          description: "Fehler beim Laden der Anträge",
          type: "error",
        });
      } else {
        const resData = await res.json();
        setRegistrationsData(resData);
        setLoading(false);
      }
    } catch (error) {
      console.log("api fetch error");
      console.error("Err", error);
      toaster.create({
        description: "Fehler beim Laden der Anträge",
        type: "error",
      });
      setLoading(false);
    }
  }

  async function deleteRegistration(id) {
    if (!confirm("Möchten Sie diesen Antrag wirklich löschen?")) {
      return;
    }

    setLoading(true);
    try {
      const resData = await fetch("/api/memberRegistrations?id=" + id, {
        method: "DELETE",
      });
      if (resData.status !== 200) {
        toaster.create({
          description: `Ein Fehler ist aufgetreten`,
          type: "error",
        });
      } else {
        toaster.create({
          description: `Antrag gelöscht.`,
          type: "success",
        });
        getRegistrations();
      }
    } catch (error) {
      toaster.create({
        description: `Ein Fehler ist aufgetreten`,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(registration) {
    setSelectedRegistration(registration);
    setOpenEditModal(true);
  }

  useEffect(() => {
    getRegistrations();
  }, []);

  return (
    <VStack py={5} gap={5} placeItems={"flex-start"}>
      <MemberRegistrationTable
        registrationsData={registrationsData}
        loading={loading}
        onEdit={handleEdit}
        onDelete={deleteRegistration}
      />
      <MemberRegistrationModalEdit
        registration={selectedRegistration}
        open={openEditModal}
        setOpen={setOpenEditModal}
        getRegistrations={getRegistrations}
      />
    </VStack>
  );
}

export default MemberRegistrations;

MemberRegistrations.getLayout = function getLayout(page) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
