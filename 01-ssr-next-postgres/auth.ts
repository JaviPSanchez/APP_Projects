import NextAuth, { type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";
// import GitHub from "next-auth/providers/github";
import authConfig from "@/auth.config";
import { db } from "@/database/db";
import { getUserById } from "@/data/user";
import { UserRole } from "@prisma/client";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole;
    } & DefaultSession["user"];
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  //If somethings goes wrong
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/error",
  },
  // Trigger events when new user logins
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification (Github, Google)
      if (account?.provider !== "credentials") return true;

      // Check if user.id exists and is a string
      if (!user.id) {
        console.error("User ID is missing or undefined.");
        return false;
      }

      //We search for the user
      const existingUser = await getUserById(user.id);

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;

      // TODO add 2FA check (Google and GitHub have their own 2FA)
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) return false;

        // Delete two factor authentification for next sign in

        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    async session({ token, session }) {
      console.log({ sessionToken: token, session: session });
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
  },
  // Integrate PrismaAdapter
  adapter: PrismaAdapter(db) as Adapter,
  // Session strategy
  session: { strategy: "jwt" },

  // Other authentication configurations
  ...authConfig,
  // providers: [GitHub],
});
