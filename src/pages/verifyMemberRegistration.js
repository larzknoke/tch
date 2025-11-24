import Layout from "@/components/ui/layouts/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container, Heading, Text, Spinner, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import BallLoader from "@/components/ui/loading-ball";

function VerifyMemberRegistration() {
  const router = useRouter();
  const { verifyId } = router.query;
  const [status, setStatus] = useState("loading"); // loading, success, error

  useEffect(() => {
    if (verifyId) {
      verifyRegistration();
    }
  }, [verifyId]);

  async function verifyRegistration() {
    try {
      const res = await fetch(
        `/api/verifyMemberRegistration?verifyId=${verifyId}`
      );

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setStatus("error");
    }
  }

  return (
    <Container maxW="container.md" py={20}>
      <VStack gap={8} align="center">
        {status === "loading" && (
          <>
            <BallLoader />
            <Heading size="lg">Mitgliedsantrag wird bestätigt...</Heading>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircleIcon className="size-20 text-green-600" />
            <Heading size="lg" textAlign="center">
              Mitgliedsantrag erfolgreich bestätigt!
            </Heading>
            <Text textAlign="center" fontSize="lg">
              Vielen Dank für Ihre Bestätigung. Wir haben Ihren Antrag erhalten
              und werden ihn in Kürze bearbeiten.
            </Text>
            <Link href="/" className="text-blue-500 underline">
              Zurück zur Startseite
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <XCircleIcon className="size-20 text-red-500" />
            <Heading size="lg" textAlign="center">
              Bestätigung fehlgeschlagen
            </Heading>
            <Text textAlign="center" fontSize="lg">
              Der Bestätigungslink ist ungültig oder wurde bereits verwendet.
            </Text>
            <Link href="/mitgliedschaft" className="text-blue-500 underline">
              Neuen Antrag stellen
            </Link>
          </>
        )}
      </VStack>
    </Container>
  );
}

export default VerifyMemberRegistration;

VerifyMemberRegistration.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
