import {
  Container,
  Flex,
  Button,
  Image,
  HStack,
  Spacer,
  IconButton,
  VStack,
  Box,
} from "@chakra-ui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import LoginBtn from "../admin/login-btn";
import { useState } from "react";

export default function LayoutAdmin({ children }) {
  const router = useRouter();
  const pathname = router.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/admin", label: "Arbeitseinsätze" },
    { href: "/admin/worker", label: "Arbeiter" },
    { href: "/admin/newsletter", label: "Newsletter" },
    { href: "/admin/member-registrations", label: "Mitgliedsanträge" },
    { href: "/admin/articles", label: "Artikel" },
  ];

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <Container>
      <Flex direction={"column"} py={5} gap={5} divideY={{ base: 0, md: 1 }}>
        {/* Desktop Navigation */}
        <HStack display={{ base: "none", md: "flex" }}>
          <Link href="/">
            <Image src="/tch_logo_tiny2.svg" height={10} mr={10} alt="Logo" />
          </Link>
          {navLinks.map((link) => {
            const isActive = pathname == link.href;
            return (
              <Button
                key={link.href}
                variant={isActive ? "surface" : "ghost"}
                asChild
              >
                <Link href={link.href}>{link.label}</Link>
              </Button>
            );
          })}
          <Spacer />
          <LoginBtn />
        </HStack>

        {/* Mobile Navigation */}
        <Box display={{ base: "block", md: "none" }}>
          <HStack justifyContent="space-between">
            <Link href="/">
              <Image src="/tch_logo_tiny2.svg" height={10} alt="Logo" />
            </Link>
            <HStack>
              <LoginBtn />
              <IconButton
                variant="ghost"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </IconButton>
            </HStack>
          </HStack>
          {isMobileMenuOpen && (
            <VStack
              gap={2}
              mt={4}
              alignItems="stretch"
              pb={4}
              borderBottomWidth={0}
            >
              {navLinks.map((link) => {
                const isActive = pathname == link.href;
                return (
                  <Button
                    key={link.href}
                    variant={isActive ? "surface" : "ghost"}
                    colorPalette={isActive ? "gray" : "gray"}
                    asChild
                    onClick={handleNavClick}
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </Button>
                );
              })}
            </VStack>
          )}
        </Box>

        {children}
      </Flex>
    </Container>
  );
}
