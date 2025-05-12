import LayoutAdmin from "@/components/ui/layouts/layout-admin";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Heading,
  Field,
  VStack,
} from "@chakra-ui/react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { PasswordInput } from "@/components/ui/password-input";

function SignIn() {
  // const [showPassword, setShowPassword] = useState(false);
  // const { isOpen: isOpenCollapse, onToggle: onToggleCollapse } = useDisclosure();
  // const { isOpen: isOpenEmail, onToggle: onToggleEmail } = useDisclosure();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(values) {
    console.log(`signing:onsubmit:values`, values);

    try {
      const body = { ...values };
      console.log(`POSTing ${JSON.stringify(body, null, 2)}`);
      let res = await signIn("credentials", {
        ...body,
        callbackUrl: router.query.callbackUrl,
      });
      console.log(`signing:onsubmit:res`, res);
    } catch (error) {
      console.log(error);
    }
  }
  if (status === "authenticated") {
    router.push("/", {
      query: {
        callbackUrl: router.query.callbackUrl,
      },
    });
  }

  return (
    <div>
      <Box
        maxW="md"
        mx="auto"
        mt={10}
        p={6}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="md"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap="4" align="flex-start" maxW="sm">
            <Field.Root invalid={!!errors.email}>
              <Field.Label>Email</Field.Label>
              <Input
                {...register("email", {
                  required: "Email ist erforderlich",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Ungültige Email-Adresse",
                  },
                })}
              />
              <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.password}>
              <Field.Label>Passwort</Field.Label>
              <PasswordInput
                {...register("password", {
                  required: "Passwort ist erforderlich",
                  // minLength: {
                  //   value: 6,
                  //   message: "Mindestens 6 Zeichen",
                  // },
                })}
              />
              <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            </Field.Root>

            <Button type="submit">Login</Button>
          </Stack>
        </form>
      </Box>
    </div>
  );
}

export default SignIn;

SignIn.getLayout = function getLayout(page) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
