import { type InferSelectModel } from "drizzle-orm";
import { type vehicles, type users } from "./schema";

export type User = InferSelectModel<typeof users>;

export type Vehicle = InferSelectModel<typeof vehicles>;
