"use server";

import { AuthError } from "next-auth";

import { signIn } from "~/auth";

/**
 * Handles the login form submission on the server side.
 * @param formData - The form data to be submitted.
 * @returns A redirect response to the dashboard.
 */
export async function userLogin(formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        console.log("Invalid credentials!");
        throw error;
      }
    }
  }
}

