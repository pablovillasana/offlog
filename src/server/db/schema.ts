// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import type { Relations } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  text,
  timestamp,
  varchar,
  serial,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `offlog_${name}`);

// Declare tables first to avoid circular reference
export const vehicles: ReturnType<typeof createTable> = createTable(
  "vehicle",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    brand: varchar("brand", { length: 256 }),
    model: varchar("model", { length: 256 }),
    year: integer("year"),
    user_id: integer("user_id"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const users: ReturnType<typeof createTable> = createTable(
  "user",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    username: varchar("username", { length: 256 }),
    email: varchar("email", { length: 256 }),
    password: varchar("password", { length: 256 }),
    vehiclesId: integer("vehicles_id"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    usernameIndex: index("username_idx").on(example.username),
  }),
);

export const usersRelations: Relations<typeof users> = relations(
  users,
  ({ many }) => ({
    vehicles: many(vehicles),
  }),
);

export const vehiclesRelations = relations(vehicles, ({ one }) => ({
  user: one(users, {
    fields: [vehicles.user_id],
    references: [users.id],
  }),
}));

export const bikes: ReturnType<typeof createTable> = createTable("bikes", {
  id: serial("id").primaryKey(),
  year: integer("year").notNull(),
  brand: varchar("brand", { length: 50 }).notNull(),
  model: varchar("model", { length: 100 }).notNull(),
  category: varchar("category", { length: 20 }).notNull(),
  engineCc: integer("engine_cc"),
  engineSize: varchar("engine_size", { length: 10 }),
  strokeType: varchar("stroke_type", { length: 10 }),
  startType: varchar("start_type", { length: 20 }),
  fuelSystem: varchar("fuel_system", { length: 30 }),
  productionStatus: varchar("production_status", { length: 20 }),
  marketRegions: varchar("market_regions", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const maintenanceRecords: ReturnType<typeof createTable> = createTable(
  "maintenance_records",
  {
    id: serial("id").primaryKey(),
    bikeId: integer("bike_id").references(bikes.id),
    userId: integer("user_id").references(users.id),
    maintenanceType: varchar("maintenance_type", { length: 20 }),
    maintenanceDate: timestamp("maintenance_date").defaultNow(),
    maintenanceCost: integer("maintenance_cost"),
    maintenanceHours: integer("maintenance_hours"),
    maintenanceDescription: text("maintenance_description"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
);
