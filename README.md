# nicelydone-ops-console

A Next.js (App Router, JavaScript, Tailwind) operations console for Nicelydone,
with Vercel Analytics.

## Features

- Dashboard (`/`) with three service cards: **Capture API**, **Asset CDN**, **Billing API**
- `GET /api/health` → `{ "status": "ok", "service": "Nicelydone Ops" }`
- `POST /api/events` → logs the event name and echoes the body with a timestamp

## Run

```bash
npm install
npm run dev
```

Verify:

```bash
curl http://localhost:3000/api/health
# {"status":"ok","service":"Nicelydone Ops"}

curl -X POST http://localhost:3000/api/events \
  -H 'Content-Type: application/json' \
  -d '{"name":"capture.started"}'
# {"name":"capture.started","receivedAt":"..."}
```

## Environment variables

| Variable | Example |
| --- | --- |
| `NEXT_PUBLIC_APP_NAME` | `Nicelydone` |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | `support@nicelydone.club` |
| `APP_RELEASE_CHANNEL` | `stable` |

Deployed on Vercel.
