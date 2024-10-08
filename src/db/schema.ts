import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const makes = pgTable('makes', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const vehicleTypes = pgTable('vehicle_types', {
  id: serial('id').primaryKey(),
  makeId: serial('make_id').notNull().unique(),
  name: text('name').notNull(),
});
