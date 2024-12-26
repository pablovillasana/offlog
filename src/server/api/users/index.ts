import { eq } from "drizzle-orm";

import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import type { userCredentials } from "~/utils/types";
import { saltAndHashPassword, comparePasswords } from "~/utils/password";

/**
 * Retrieves a user by their email address
 * @param email - The email address of the user
 * @returns Promise containing the user if found, null otherwise
 */
export async function getUserByEmail(email: string) {
  return await db.query.users.findFirst({ where: eq(users.email, email) });
}

/**
 * Retrieves a user if their credentials satisfy the given credentials
 * @param credentials - The credentials to check
 * @returns Promise containing the user if found, null otherwise
 */
export async function getUserIfSatisfies(credentials: userCredentials) {
  const user = await getUserByEmail(credentials.email);

  if (!user) {
    return null;
  }
  if (!comparePasswords(credentials.password, user.password)) {
    return null;
  }

  return user;
}

/**
 * Creates a new user with the given email and password
 * @param email - The email address for the new user
 * @param password - The password for the new user
 * @returns Promise containing the created user
 */
export async function createUser(email: string, password: string) {
  const hashedPassword = saltAndHashPassword(password);
  return await db
    .insert(users)
    .values({ email, password: hashedPassword })
    .returning();
}

/**
 * Updates a user's password
 * @param email - The email address of the user
 * @param newPassword - The new password to set
 * @returns Promise containing the updated user
 */
export async function updateUserPassword(email: string, newPassword: string) {
  const hashedPassword = saltAndHashPassword(newPassword);
  return await db
    .update(users)
    .set({ password: hashedPassword })
    .where(eq(users.email, email))
    .returning();
}

/**
 * Deletes a user by their email address
 * @param email - The email address of the user to delete
 * @returns Promise containing the deleted user
 */
export async function deleteUser(email: string) {
  return await db.delete(users).where(eq(users.email, email)).returning();
}
