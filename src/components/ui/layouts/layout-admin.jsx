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
import { useRouter } from "next/router";
import LoginBtn from "../admin/login-btn";

// If loading a variable font, you don't need to specify the font weight
const roboto_cond = Roboto_Condensed({ subsets: ["latin"] });

export default function LayoutAdmin({ children }) {
  const router = useRouter();
  const pathname = router.pathname;

  const navLinks = [
    { href: "/admin", label: "Arbeitseinsätze" },
    { href: "/admin/worker", label: "Arbeiter" },
    { href: "/admin/newsletter", label: "Newsletter" },
  ];

  return (
    <Container>
      <Flex direction={"column"} py={5} gap={5} divideY={1}>
        <HStack>
          <Link href="/">
            <Image src="/tch_logo_tiny2.svg" height={10} mr={10} alt="Logo" />
          </Link>
          {navLinks.map((link) => {
            const isActive = pathname == link.href;
            return (
              <Button
                key={link.href}
                variant={isActive ? "solid" : "outline"}
                colorPalette={isActive ? "gray" : "gray"}
                asChild
              >
                <Link href={link.href}>{link.label}</Link>
              </Button>
            );
          })}
          <Spacer />
          {/* <Button variant="outline" colorScheme="red">
            Logout
          </Button> */}
          <LoginBtn />
        </HStack>
        {children}
      </Flex>
    </Container>
  );
}
