import { eq } from "drizzle-orm";

import { db } from "~/server/db";
import { vehicles } from "~/server/db/schema";

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
