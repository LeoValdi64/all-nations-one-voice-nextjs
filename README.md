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

Use the project that already serves the custom domain: **all-nations-one-voice**.

Do not move `allnationsonevoice.org` to the duplicate project `all-nations-one-voice-nextjs`. DNS is on Cloudflare; MX is Google (`smtp.google.com`). Leave those records alone.

Dashboard:

- Project: https://vercel.com/leovaldis-projects/all-nations-one-voice
- Environment variables: https://vercel.com/leovaldis-projects/all-nations-one-voice/settings/environment-variables
- Blob store: https://vercel.com/leovaldis-projects/all-nations-one-voice/stores
- Domains: https://vercel.com/leovaldis-projects/all-nations-one-voice/settings/domains
- Disconnect the extra Git project: https://vercel.com/leovaldis-projects/all-nations-one-voice-nextjs/settings/git

Set these environment variables on **Production + Preview** before (or right after) merge:

| Variable | Why |
| --- | --- |
| `ADMIN_PASSWORD` | Shared login for `/admin` |
| `BLOB_READ_WRITE_TOKEN` | Persist photo uploads and admin edits. The Vercel filesystem is read-only. Create a Blob store on the project above if this is empty. |
| `NEXT_PUBLIC_STRIPE_DONATION_URL` | Donate button. Defaults to `https://donate.stripe.com/dR615Z1P6eHrg6c000` if unset. |

Public pages work without those secrets. `/admin` will not sign in, and edits will not persist, until they are set. Redeploy Production after saving env vars.

`metadataBase` is `https://allnationsonevoice.org`. `*.vercel.app` hosts send `X-Robots-Tag: noindex`.

## Scripts

```bash
npm run lint
npm run build
npm start
```
