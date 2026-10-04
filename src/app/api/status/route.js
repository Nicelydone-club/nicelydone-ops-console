// Aggregate status for the Nicelydone Ops services. Useful as a lightweight
// status page / readiness probe for uptime monitors.
const SERVICES = [
  {id: 'capture-api', name: 'Capture API', status: 'operational'},
  {id: 'asset-cdn', name: 'Asset CDN', status: 'operational'},
  {id: 'billing-api', name: 'Billing API', status: 'operational'},
]

export async function GET() {
  const allOperational = SERVICES.every((s) => s.status === 'operational')
  return Response.json({
    status: allOperational ? 'operational' : 'degraded',
    service: 'Nicelydone Ops',
    channel: process.env.APP_RELEASE_CHANNEL || 'stable',
    services: SERVICES,
    checkedAt: new Date().toISOString(),
  })
}
