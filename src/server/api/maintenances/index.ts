import { eq } from "drizzle-orm";

import { db } from "~/server/db";
import { maintenanceRecords } from "~/server/db/schema";
import type { MaintenanceRecord } from "~/server/db/types";

/**
 * Retrieves all maintenance records
 * @returns Promise containing all maintenance records
 */
export async function getAllMaintenanceRecords() {
  return await db.query.maintenanceRecords.findMany();
}

/**
 * Retrieves a maintenance record by its ID
 * @param id - The ID of the maintenance record
 * @returns Promise containing the maintenance record if found, null otherwise
 */
export async function getMaintenanceRecordById(id: string) {
  return await db.query.maintenanceRecords.findFirst({
    where: eq(maintenanceRecords.id, id),
  });
}

/**
 * Creates a new maintenance record
 * @param maintenanceRecord - The maintenance record to create
 * @returns Promise containing the created maintenance record
 */
export async function createMaintenanceRecord(
  maintenanceRecord: MaintenanceRecord,
) {
  return await db.insert(maintenanceRecords).values(maintenanceRecord);
}

/**
 * Updates a maintenance record
 * @param id - The ID of the maintenance record to update
 * @param maintenanceRecord - The updated maintenance record
 * @returns Promise containing the updated maintenance record
 */
export async function updateMaintenanceRecord(
  id: string,
  maintenanceRecord: MaintenanceRecord,
) {
  return await db
    .update(maintenanceRecords)
    .set(maintenanceRecord)
    .where(eq(maintenanceRecords.id, id));
}

/**
 * Deletes a maintenance record
 * @param id - The ID of the maintenance record to delete
 */
export async function deleteMaintenanceRecord(id: string) {
  return await db
    .delete(maintenanceRecords)
    .where(eq(maintenanceRecords.id, id));
}

/**
 * Retrieves all maintenance records for a specific bike
 * @param bikeId - The ID of the bike
 * @returns Promise containing all maintenance records for the bike
 */
export async function getMaintenanceRecordsByBikeId(bikeId: string) {
  return await db.query.maintenanceRecords.findMany({
    where: eq(maintenanceRecords.bikeId, bikeId),
  });
}

/**
 * Retrieves all maintenance records for a specific user
 * @param userId - The ID of the user
 * @returns Promise containing all maintenance records for the user
 */
export async function getMaintenanceRecordsByUserId(userId: string) {
  return await db.query.maintenanceRecords.findMany({
    where: eq(maintenanceRecords.userId, userId),
  });
}
