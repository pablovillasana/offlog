"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "~/auth";

/**
 * Handles the login form submission on the server side.
 * @param formData - The form data to be submitted.
 * @returns A redirect response to the dashboard.
 */
export async function userLogin(
  formData: FormData,
): Promise<{ error: AuthError } | { error: "CredentialsSignin" }> {
  try {
    return await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "CredentialsSignin" };
        default:
          throw error;
      }
    }
    throw error;
  }
}

/**
 * Handles the logout process on the server side.
 */
export async function userLogout() {
  await signOut({ redirectTo: "/" });
}
