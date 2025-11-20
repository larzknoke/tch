import { Text, Button, HStack } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function LoginBtn() {
  const { data: session } = useSession();
  if (session) {
    return (
      <HStack gap={1}>
        <UserCircleIcon className="w-4" />
        <Text className="mr-2 text-sm">{session.user.email}</Text>
        <Button
          onClick={() => signOut()}
          colorPalette={"red"}
          variant={"outline"}
          size={"xs"}
        >
          Logout
        </Button>
      </HStack>
    );
  }
  return (
    <HStack>
      <Button variant={"outline"} onClick={() => signIn()}>
        Login
      </Button>
    </HStack>
  );
}
