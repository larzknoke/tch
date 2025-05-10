import Layout from "@/components/ui/layouts/layout";
import HeaderText from "@/components/ui/header-text";
import {
  Flex,
  Container,
  Text,
  Alert,
  Box,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
  Card,
  CardBody,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { dateFormatter } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import BallLoader from "@/components/ui/loading-ball";

function VerifyWorker() {
  const router = useRouter();
  const { verifyId } = router.query;
  const [loading, setLoading] = useState(true);
  const [workerData, setWorkerData] = useState(null);
  const [workerError, setWorkerError] = useState(false);

  async function getLetter(verifyId) {
    try {
      setLoading(true);
      const res = await fetch(`/api/verifyWorker?verifyId=${verifyId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (res.status != 200) {
        setLoading(false);
        setWorkerError(true);
      } else {
        const resData = await res.json();
        setWorkerData(resData);
        setLoading(false);
        // if (resData?.verified) {
        //   sendConfirmEmail(resData);
        // }
      }
    } catch (error) {
      console.log("api fetch error");
      console.error("Err", error);
      setWorkerError(true);
    }
  }

  async function sendConfirmEmail(letter) {
    try {
      const res = await fetch("/api/letter/confirmEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ letter }),
      });
      if (res.status != 200) {
        setWorkerError(true);
      } else {
        const resData = await res.json();
      }
    } catch (error) {
      console.log("api fetch error");
      console.error("sendConfirmEmail Error: ", error);
      setWorkerError(true);
    }
  }

  useEffect(() => {
    if (verifyId) {
      getLetter(verifyId);
    }
  }, [verifyId]);

  return (
    <Container display={"flex"} flexDirection={"column"} maxWidth={"6xl"}>
      {loading && (
        <Flex justifyContent={"center"} my={16}>
          <BallLoader />
        </Flex>
      )}
      {workerData?.verified && (
        <VStack>
          <HeaderText text={"Sie sind nun als Teilnehmer registriert."} />
          <Text fontSize={"lg"} fontWeight={700} mb={4}>
            Sie erhalten in Kürze eine Bestätigungs-Email.
          </Text>
        </VStack>
      )}
      {workerError && !workerData?.verified && (
        <VStack>
          <HeaderText text={"Bestätigungs Fehler"} />
          <Text>
            Der Verifizierungs-Link wurde entweder schon bestätigt und ist nun
            ungültig oder ein Fehler ist aufgetreten.
          </Text>
          <Text textAlign={"center"} fontWeight={700} my={4}>
            Bitte kontaktieren Sie uns hier: <br />
            <Link href="mailto:presse@tc1928.com">presse@tc1928.com</Link>
          </Text>
        </VStack>
      )}
    </Container>
  );
}

export default VerifyWorker;

VerifyWorker.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
