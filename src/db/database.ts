import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "../config/env";

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  database: "postgres",
  port: 5432,
  host: "localhost",
  ssl: false,
});

export const db = drizzle(pool);
