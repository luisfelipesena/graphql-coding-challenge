import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const makes = pgTable("makes", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 255 }).notNull().unique(),
});
