import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      id: "credentials",
      name: "credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "max.mustermann@server.de",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        console.log("credentials: ", credentials);
        const authBaseUrl =
          process.env.NEXTAUTH_URL || process.env.AUTH_URL || "http://localhost:3000";
        const user = await fetch(`${authBaseUrl}/api/user/check-credentials`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            accept: "application/json",
          },
          body: Object.entries(credentials)
            .map((e) => e.join("="))
            .join("&"),
        })
          .then((res) => res.json())
          .catch((err) => {
            return null;
          });

        if (user) {
          console.log("user: ", user);
          return user;
        } else {
          console.log("no user");
          throw new Error("Email oder Passwort ist falsch");
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }

      try {
        const parsedUrl = new URL(url);
        if (parsedUrl.origin === baseUrl) {
          return url;
        }
      } catch (error) {
        // ignore invalid URLs and fall back to baseUrl
      }

      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
};

export default NextAuth(authOptions);
