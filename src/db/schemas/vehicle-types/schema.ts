import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { makes } from "../makes/schema";

export const vehicleTypes = pgTable("vehicle_types", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 255 }).notNull().unique(),
	makeId: integer("make_id").references(() => makes.id).notNull(),
});
