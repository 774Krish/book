# BooksOnline

A curated directory of UK online bookstores that sell storybooks and novels.

- React + Vite frontend, no UI framework
- Two serverless API routes (contact form + newsletter) that work on Vercel
- Hash routing, so it deploys to any static host with no rewrite rules

## Running it locally

You need **Node 20 or newer**.

```
npm install
```

Then run **two** terminals:

```
# Terminal 1 — the API (contact form + newsletter), port 3001
npm run dev:api

# Terminal 2 — the site, port 5173
npm run dev
```

Open http://localhost:5173

Vite proxies `/api/*` to port 3001, so frontend code always calls
`fetch('/api/contact')` — the same path it uses in production.

> Only need the site and not the forms? `npm run dev` on its own is enough.
> The forms will show "Could not reach the server" until the API is running.

## How the contact form works

```
Browser  ──POST /api/contact──▶  api/contact.js  ──▶  Resend  ──▶  your inbox
```

1. The form POSTs JSON: `{ name, email, topic, message, website }`
2. `api/contact.js` validates it, rate-limits by IP, and checks a honeypot
3. If valid, it calls Resend's REST API to email you
4. The visitor sees "Message sent"

The `website` field is a **honeypot**: it is hidden off-screen, so a human never
fills it in. Bots fill every field they find, so any value there means "not a
human" — the endpoint then returns success without doing anything.

## Configuration

Copy `.env.example` to `.env` and edit it:

```
cp .env.example .env
```

| Variable | What it does |
|---|---|
| `CONTACT_TO` | Your email — where messages are delivered |
| `RESEND_API_KEY` | Lets the server send mail. **Leave blank to test** |
| `MAIL_FROM` | The From address on outgoing mail |
| `API_PORT` | Port for `npm run dev:api` (default 3001) |

**If `RESEND_API_KEY` is blank**, emails are printed to the terminal instead of
being sent. That is the quickest way to check everything works — you do not need
an account to test.

`.env` is git-ignored. Never commit it.

## Getting real email delivery

1. Sign up at https://resend.com (free tier: 3,000 emails/month)
2. Create an API key → put it in `.env` as `RESEND_API_KEY`
3. Set `CONTACT_TO` to your inbox
4. Send a test message

**Note about `MAIL_FROM`:** with the default `onboarding@resend.dev`, Resend
only delivers to the address that owns your Resend account. To email anyone
else, verify your own domain in Resend and change `MAIL_FROM` to something like
`BooksOnline <hello@yourdomain.com>`.

## Deploying

Works on **Vercel** or **Netlify** with no config file:

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist` |

Files in `api/` become URLs automatically on Vercel (`api/contact.js` →
`/api/contact`). Any file or folder starting with `_` is treated as a module,
not a route — that is why the shared helpers live in `api/_lib/`.

Remember to add `CONTACT_TO`, `RESEND_API_KEY` and `MAIL_FROM` in the hosting
dashboard's environment variables. `.env` is **not** uploaded — and shouldn't be.

## Before going live

- [ ] Replace `CONTACT_EMAIL` in `src/data/pages.js` — it is currently the
      placeholder `hello@booksonline.example`
- [ ] Add the three env vars to your host
- [ ] Verify every store URL in `src/data/sites.js` actually loads
- [ ] Refresh the bestseller list and update `checked` in `src/data/bestsellers.js`
- [ ] Confirm the NYT rank order in `src/data/bestsellers.js` matches the source

## Where things live

| Path | Purpose |
|---|---|
| `src/data/sites.js` | The 16 stores + `searchUrl` templates |
| `src/data/bestsellers.js` | The 5 NYT children's bestsellers |
| `src/data/pages.js` | Text for About / Terms / Privacy / etc. |
| `src/components/` | UI pieces |
| `api/contact.js` | Contact form endpoint |
| `api/subscribe.js` | Newsletter endpoint |
| `api/_lib/email.js` | Shared validation, rate limiting, sending |
| `server/dev-api.js` | Local stand-in for Vercel's function runtime |

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the site (port 5173) |
| `npm run dev:api` | Start the local API (port 3001) |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built output locally |
| `npm run lint` | Check code with oxlint |

