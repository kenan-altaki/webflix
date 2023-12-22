import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import Credentials from "next-auth/providers/credentials";

import prismadb from "@/lib/prismadb";

import { compare } from "bcrypt";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "API Token", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.password) return null;

        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword)
          throw new Error("Email does not exist!");

        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) throw new Error("Incorrect password!");

        return user;
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  pages: {
    signIn: "/auth",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  theme: {
    logo: "/RelyComply-Logo-2.svg",
  },
  debug: process.env.NODE_ENV === "development",
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
