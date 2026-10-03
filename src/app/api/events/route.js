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

  return Response.json({
    ...body,
    name,
    receivedAt: new Date().toISOString(),
  })
}
