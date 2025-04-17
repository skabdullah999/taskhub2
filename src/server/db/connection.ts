import { Pool } from "pg"
import { Kysely, PostgresDialect } from "kysely"
import type { DB } from "./types"
import dotenv from "dotenv"

dotenv.config()

// Database connection configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 2000, // How long to wait for a connection to become available
})

// Initialize Kysely query builder with PostgreSQL dialect
export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool,
  }),
})

// Test database connection
export async function connectToDatabase() {
  try {
    const { rows } = await pool.query("SELECT NOW()")
    console.log("Database connected successfully at:", rows[0].now)
    return true
  } catch (error) {
    console.error("Database connection failed:", error)
    process.exit(1)
  }
}

// Handle pool errors
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err)
  process.exit(-1)
})

// Handle process termination
process.on("SIGINT", () => {
  pool.end()
  console.log("Database pool closed")
  process.exit(0)
})
