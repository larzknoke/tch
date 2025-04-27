import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  Image,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Links = ["Home", "About", "Services", "Contact"];

function NavLink({ children }) {
  return (
    <Button variant="ghost" size="sm" _hover={{ bg: "gray.200" }}>
      {children}
    </Button>
  );
}

export default function AdminNavbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      bg="white"
      px={4}
      boxShadow="sm"
      position="sticky"
      top="0"
      zIndex="1000"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Logo */}
        <Box>
          <Image src="/logo.png" alt="Logo" height="40px" />
        </Box>

        {/* Desktop Navigation */}
        <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
          {Links.map((link) => (
            <NavLink key={link}>{link}</NavLink>
          ))}
        </HStack>

        {/* Mobile Menu Button */}
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
      </Flex>

      {/* Mobile Navigation */}
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
