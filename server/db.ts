import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

// Default to a dummy connection string if not set, to allow build to pass in CI/CD without DB
// In production, DATABASE_URL must be set
const connectionString = process.env.DATABASE_URL || "postgres://user:password@localhost:5432/dbname";

export const pool = new Pool({ connectionString });
export const db = drizzle(pool, { schema });
