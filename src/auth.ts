import NextAuth, { type NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";
import Credentials from "next-auth/providers/credentials";

import { getUserIfSatisfies } from "~/server/api/users";
import type { userCredentials } from "~/utils/types";
export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const dbUser = await getUserIfSatisfies(
            credentials as userCredentials,
          );
          if (!dbUser || typeof dbUser.id !== "number") {
            return null;
          }
          return {
            id: dbUser.id.toString(),
            email: dbUser.email ?? "",
            name: dbUser.username ?? "",
            ...dbUser,
          };
        } catch (error) {
          console.log("Error authorizing user", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    authorized: async ({ request: { nextUrl }, auth: midAuth }) => {
      const isLoggedIn = Boolean(midAuth?.user);
      const isOnDashboard = nextUrl.pathname === "/";

      if (isOnDashboard) {
        // Redirect unauthenticated users to the login page
        return isLoggedIn;
      } else if (isLoggedIn) {
        // Redirect authenticated users to the dashboard
        return NextResponse.redirect(new URL("/", nextUrl));
      }

      // Allow unauthenticated users to access other pages
      return NextResponse.next();
    },
  },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig);
