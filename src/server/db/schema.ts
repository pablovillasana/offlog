// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `offlog_${name}`);

// Declare tables first to avoid circular reference
export let vehicles: ReturnType<typeof createTable>;
export let users: ReturnType<typeof createTable>;

// Then define the tables
vehicles = createTable(
  "vehicle",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    brand: varchar("brand", { length: 256 }),
    model: varchar("model", { length: 256 }),
    year: integer("year"),
    user_id: integer("user_id").references(() => users.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  })
);

users = createTable(
  "user",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    username: varchar("username", { length: 256 }),
    email: varchar("email", { length: 256 }),
    password: varchar("password", { length: 256 }),
    vehicles_id: integer("vehicles_id").references(() => vehicles.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (example) => ({
    usernameIndex: index("username_idx").on(example.username),
  })
);

export const usersRelations = relations(users, ({ many }) => ({
  vehicles: many(vehicles),
}));

export const vehiclesRelations = relations(vehicles, ({ one }) => ({
  user: one(users, {
    fields: [vehicles.user_id],
    references: [users.id],
  }),
}));
