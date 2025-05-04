import { type InferSelectModel } from "drizzle-orm";
import { type vehicles, type users, type maintenanceRecords } from "./schema";

export type User = InferSelectModel<typeof users>;

export type Vehicle = InferSelectModel<typeof vehicles>;

export type MaintenanceRecord = InferSelectModel<typeof maintenanceRecords>;
