import { Roboto_Condensed } from "next/font/google";
import {
  Container,
  Flex,
  Button,
  Image,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import Link from "next/link";

// If loading a variable font, you don't need to specify the font weight
const roboto_cond = Roboto_Condensed({ subsets: ["latin"] });

export default function LayoutAdmin({ children }) {
  return (
    <Container>
      <Flex direction={"column"} py={5} gap={5} divideY={1}>
        <HStack>
          <Link href="/">
            <Image src="/tch_logo_tiny.svg" height={10} mr={10} />
          </Link>
          <Button variant="outline" asChild>
            <Link href="/admin">
              Arbeitseinsätze
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/worker">
              Arbeiter
            </Link>
          </Button>
          <Spacer />
          <Button variant={"outline"} colorPalette={"red"}>
            Logout
          </Button>
        </HStack>
        {children}
      </Flex>
    </Container>
  );
}
