import { eq } from "drizzle-orm";

import { db } from "~/server/db";
import type { userCredentials } from "~/utils/types";
import { users, vehicles } from "~/server/db/schema";
import { saltAndHashPassword, comparePasswords } from "~/utils/password";

// User Adapter Methods

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
    throw new Error("User not found!");
  }
  if (!comparePasswords(credentials.password, user.password)) {
    //throw new Error("Invalid credentials!");
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

// Vehicle Adapter Methods

/**
 * Retrieves a vehicle by its ID
 * @param vehicleId - The ID of the vehicle
 * @returns Promise containing the vehicle if found, null otherwise
 */
export async function getVehicleById(vehicleId: string) {
  return await db.query.vehicles.findFirst({
    where: eq(vehicles.id, vehicleId),
  });
}

/**
 * Creates a new vehicle
 * @param userId - The ID of the user who owns the vehicle
 * @param make - The manufacturer of the vehicle
 * @param model - The model of the vehicle
 * @param year - The year the vehicle was manufactured
 * @returns Promise containing the created vehicle
 */
export async function createVehicle(
  userId: string,
  make: string,
  model: string,
  year: number,
) {
  return await db
    .insert(vehicles)
    .values({ userId, make, model, year })
    .returning();
}

/**
 * Updates a vehicle's details
 * @param vehicleId - The ID of the vehicle to update
 * @param make - The new manufacturer of the vehicle
 * @param model - The new model of the vehicle
 * @param year - The new year of the vehicle
 * @returns Promise containing the updated vehicle
 */
export async function updateVehicle(
  vehicleId: string,
  make: string,
  model: string,
  year: number,
) {
  return await db
    .update(vehicles)
    .set({ make, model, year })
    .where(eq(vehicles.id, vehicleId))
    .returning();
}

/**
 * Deletes a vehicle by its ID
 * @param vehicleId - The ID of the vehicle to delete
 * @returns Promise containing the deleted vehicle
 */
export async function deleteVehicle(vehicleId: string) {
  return await db
    .delete(vehicles)
    .where(eq(vehicles.id, vehicleId))
    .returning();
}
