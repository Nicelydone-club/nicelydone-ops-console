import {getSql, ensureEventsTable} from '@/lib/db'

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({error: 'Invalid JSON body'}, {status: 400})
  }

  const name = body?.name ?? body?.event
  if (!name) {
    return Response.json({error: 'Event name is required'}, {status: 400})
  }

  // Log the event name so it shows up in Runtime Logs / Observability.
  console.log(`[events] received: ${name}`)

  // Persist to Neon Postgres when the integration is configured.
  let persisted = false
  const sql = getSql()
  if (sql) {
    try {
      await ensureEventsTable(sql)
      await sql`
        INSERT INTO events (name, source)
        VALUES (${name}, ${body?.source ?? null})
      `
      persisted = true
    } catch (error) {
      console.error('[events] db insert failed:', error?.message || error)
    }
  }

  return Response.json({
    ...body,
    name,
    persisted,
    receivedAt: new Date().toISOString(),
  })
}

export async function GET() {
  const sql = getSql()
  if (!sql) {
    return Response.json({storage: 'none', count: 0, events: []})
  }

  try {
    await ensureEventsTable(sql)
    const events = await sql`
      SELECT name, source, received_at
      FROM events
      ORDER BY received_at DESC
      LIMIT 20
    `
    const [{count}] = await sql`SELECT count(*)::int AS count FROM events`
    return Response.json({storage: 'neon-postgres', count, events})
  } catch (error) {
    return Response.json(
      {error: error?.message || 'database error'},
      {status: 500},
    )
  }
}
