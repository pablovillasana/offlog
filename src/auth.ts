import NextAuth, { type NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";
import Credentials from "next-auth/providers/credentials";

import { getUserIfSatisfies } from "~/server/api/users";
import type { userCredentials } from "~/utils/types";

export const { handlers, signIn, signOut, auth } = NextAuth({
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
      const isOnLoginPage = nextUrl.pathname === "/login";
      const isOnPublicRoute = ["/login"].includes(nextUrl.pathname);

      // Allow access to public routes
      if (isOnPublicRoute) {
        // If user is logged in and tries to access login page, redirect to dashboard
        if (isLoggedIn && isOnLoginPage) {
          return NextResponse.redirect(new URL("/", nextUrl));
        }
        return true;
      }

      // Protect all other routes
      if (!isLoggedIn) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
          callbackUrl += nextUrl.search;
        }

        const encodedCallbackUrl = encodeURIComponent(callbackUrl);
        return NextResponse.redirect(
          new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
        );
      }

      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig);
