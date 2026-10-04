const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Nicelydone'

const services = [
  {
    name: 'Capture API',
    description: 'Ingests capture events and screenshots from client workflows.',
    status: 'Operational',
  },
  {
    name: 'Asset CDN',
    description: 'Serves processed assets and thumbnails to downstream apps.',
    status: 'Operational',
  },
  {
    name: 'Billing API',
    description: 'Handles invoices, refunds, and subscription state.',
    status: 'Operational',
  },
  {
    name: 'Search Worker',
    description: 'Indexes captures and assets for fast cross-project search.',
    status: 'Operational',
  },
]

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <header className="mb-10">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          {APP_NAME}
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">Ops Console</h1>
        <p className="mt-2 text-slate-600">
          Live status for the core Nicelydone services.
        </p>
      </header>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.name}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{service.name}</h2>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {service.status}
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-600">{service.description}</p>
          </article>
        ))}
      </section>

      <footer className="mt-12 text-sm text-slate-500">
        API routes: <code className="rounded bg-slate-100 px-1.5 py-0.5">/api/health</code>{' '}
        · <code className="rounded bg-slate-100 px-1.5 py-0.5">/api/events</code>
      </footer>
    </main>
  )
}
