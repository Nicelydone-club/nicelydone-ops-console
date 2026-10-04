import {neon} from '@neondatabase/serverless'

// The Neon/Vercel integration injects a pooled connection string. Support the
// common names so this works regardless of which the integration set.
const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  ''

export const hasDb = Boolean(connectionString)

let sqlClient
export function getSql() {
  if (!hasDb) return null
  if (!sqlClient) sqlClient = neon(connectionString)
  return sqlClient
}

let tableReady = false
export async function ensureEventsTable(sql) {
  if (tableReady) return
  await sql`
    CREATE TABLE IF NOT EXISTS events (
      id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      source TEXT,
      received_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `
  tableReady = true
}
