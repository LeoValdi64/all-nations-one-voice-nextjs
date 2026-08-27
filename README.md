# All Nations One Voice

Public website for All Nations One Voice — a Federal Way nonprofit — and FOUND IT! Thrift Store.

Built with Next.js 16, shadcn/ui, Motion, and Lucide. There is no shopping cart. Classes appear only when the team publishes them. Money gifts go to Stripe, not a bank account on the site.

## Pages

- `/` Home
- `/store` FOUND IT! Thrift Store gallery, hours, map
- `/classes` Upcoming classes and online registration
- `/about` Story, values, team
- `/contact` Email, phone, map, donate, Facebook
- `/admin` Password-protected editor for copy, photos, classes, and registrations

## Local development

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Admin password locally: `anv-admin`.

## Production on Vercel

Set these project environment variables before the first production deploy:

| Variable | Why |
| --- | --- |
| `ADMIN_PASSWORD` | Shared login for `/admin` |
| `BLOB_READ_WRITE_TOKEN` | Persist photo uploads and admin edits. The Vercel filesystem is read-only. |
| `NEXT_PUBLIC_STRIPE_DONATION_URL` | Donate button. Defaults to `https://donate.stripe.com/dR615Z1P6eHrg6c000` |

`metadataBase` is `https://allnationsonevoice.org`.

## Scripts

```bash
npm run lint
npm run build
npm start
```
