import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserIfSatisfies } from "~/server/adapter";
import type { userCredentials } from "~/utils/types";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null;

          // logic to verify if the user exists and if the password is correct
          user = await getUserIfSatisfies(credentials as userCredentials);

          // return user object with their profile data
          return user;
        } catch (error) {
          console.error("Error authorizing user", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
});
