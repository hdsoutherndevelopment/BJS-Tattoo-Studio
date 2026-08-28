# BJ's Tattoo Studio — website concept

A premium, dark, editorial website concept for **BJ's Tattoo Studio**, 59 Bridge Rd,
Southampton SO19 7GR — built by **HD Southern Development**.

> **This is an unofficial concept build.** Business name, address, phone number and
> opening hours come from the studio's public listing. Everything else — artist
> profiles, portfolio artwork, reviews, pricing, social handles and the established
> year — is clearly-labelled demonstration content. Anything unverified is marked
> `CONFIRM` in `lib/site.ts`.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS ·
Framer Motion · Lucide · Zod · Supabase (optional) · Resend (optional) · Vercel

Requires Node 20.9 or newer. `npm audit` reports zero vulnerabilities.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — the site runs in demo mode without it
npm run dev
```

`npm run build` · `npm run lint` · `npm run typecheck` all pass clean.

### Environment variables

Every variable is optional. **Do not add them to Vercel with blank values** —
set a real value or leave the variable out entirely. `NEXT_PUBLIC_SITE_URL`
falls back to the default if it is missing, empty or whitespace, and a trailing
slash is stripped, so a blank variable can no longer break the build.

## Brand

| Token | Value | Use |
| --- | --- | --- |
| Near black | `#0B0B0B` | Page ground |
| Charcoal | `#181818` | Alternate sections |
| Dark grey | `#252525` | Gradient stops, tiles |
| Off white | `#F2F0EA` | All typography |
| Deep red | `#8F1D1D` | Buttons, rules, accents |
| Muted gold | `#B89B5E` | Stars, notices |

Type: **Anton** (display) · **Instrument Serif** italic (editorial accent) ·
**Barlow Condensed** (labels, UI) · **Barlow** (body).

Logo assets live in `public/brand/`:

- `logo-horizontal.svg` — primary lockup
- `logo-stacked.svg` — square formats
- `logo-icon.svg` / `logo-icon-simple.svg` — compact BJ mark (simple version for ≤32px)
- `logo-horizontal-mono.svg` / `logo-horizontal-mono-dark.svg` — one-colour, light and dark grounds
- `logo-horizontal-accent.svg` — red/white on black
- `logo-icon-gold.svg`, `favicon.svg`

All wordmarks are outlined vectors, so the files work for signage, apparel,
embroidery and print without font licensing.

## Imagery

Every image slot is a `<Plate>` — original SVG flash artwork over a procedural
dark ground. To drop in the studio's photography, add `photo: '/portfolio/x.jpg'`
to a piece in `lib/portfolio.ts` (or pass `photo` to `<Plate>`); the artwork stays
underneath as the fallback layer. Add the image host to `next.config.mjs` if the
photos are remote.

## Booking form

The form validates client-side and again on the server with Zod, has a honeypot
field and basic per-IP rate limiting, and reports real loading, success and error
states.

- **No env vars** → demo mode. Nothing is stored or sent; the success message says so.
- **Supabase configured** → enquiries insert into the `enquiries` table
  (`supabase/schema.sql`).
- **Resend configured** → the studio is notified and the customer gets a confirmation.

Both switch on automatically the moment the environment variables exist.

## SEO

Metadata, Open Graph and Twitter cards, `LocalBusiness` + `TattooParlor` +
`FAQPage` JSON-LD, `sitemap.xml`, `robots.txt`, semantic headings and descriptive
alt text. Local targets: *Southampton tattoo studio, tattoo artist Southampton,
tattoo shop Southampton, custom tattoos Southampton, black and grey tattoos
Southampton, fine line tattoos Southampton*.

## Pre-launch checklist

- [ ] Confirm every `CONFIRM` value in `lib/site.ts`
- [ ] Replace demo pricing with the studio's confirmed rates
- [ ] Replace artist profiles and Instagram handles with real ones
- [ ] Swap portfolio artwork for the studio's photography
- [ ] Replace placeholder reviews with real Google reviews
- [ ] Swap the map placeholder for an embedded map
- [ ] Add `og.jpg` (1200×630) to `public/`
- [ ] Set env vars in Vercel and run a live form test end to end
- [ ] Point `NEXT_PUBLIC_SITE_URL` at the production domain
- [ ] Replace the placeholder privacy policy and terms
