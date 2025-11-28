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
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

function VerifyNewsletter() {
  const router = useRouter();
  const { verifyId } = router.query;
  const [loading, setLoading] = useState(true);
  const [newsletterData, setNewsletterData] = useState(null);
  const [newsletterError, setNewsletterError] = useState(false);

  async function getLetter(verifyId) {
    try {
      setLoading(true);
      const res = await fetch(`/api/verifyNewsletter?verifyId=${verifyId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (res.status != 200) {
        setLoading(false);
        setNewsletterError(true);
      } else {
        const resData = await res.json();
        setNewsletterData(resData);
        setLoading(false);
        // if (resData?.verified) {
        //   sendConfirmEmail(resData);
        // }
      }
    } catch (error) {
      console.log("api fetch error");
      console.error("Err", error);
      setNewsletterError(true);
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
        setNewsletterError(true);
      } else {
        const resData = await res.json();
      }
    } catch (error) {
      console.log("api fetch error");
      console.error("sendConfirmEmail Error: ", error);
      setNewsletterError(true);
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
      {newsletterData?.verified && (
        <VStack gap={8} align="center">
          <CheckCircleIcon className="size-20 text-green-600" />
          <Heading size="lg" textAlign="center">
            Sie sind nun als Teilnehmer für den Newsletter registriert.
          </Heading>
          <Text textAlign="center" fontSize="lg">
            Vielen Dank für Ihre Bestätigung.
          </Text>
          <Link href="/" className="text-tch-blue underline">
            Zurück zur Startseite
          </Link>
        </VStack>
      )}
      {newsletterError && !newsletterData?.verified && (
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

export default VerifyNewsletter;

VerifyNewsletter.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
