# DJCR — Digambar Jain Center of Raleigh — PRD

## Original Problem Statement
Build a complete, sophisticated, peaceful, spiritually inspiring website and brand identity for Digambar Jain Center of Raleigh (DJCR), an emerging Digambar Jain organization serving Raleigh, Cary, Morrisville, Durham, Chapel Hill, and the greater Research Triangle (RTP), NC. Vision: establish a dedicated traditional Digambar Jain Temple in Raleigh–RTP. Strict palette (Deep Maroon #6F1D1B, Saffron #E87524, Muted Gold #C99A30, Warm Ivory #FFF9ED, Charcoal #292929), original Shikhar + oak leaf logo, single "Temple" landing with sections: Hero (with णमो अरिहंताणं), Jai Jinendra welcome, Temple Vision (4 pillars), Jain Dharma (Ahimsa/Anekantavada/Aparigraha), Temple Project ("Our Journey Has Begun", milestone roadmap, never imply construction), Events, Get Involved, Contact, Footer. Award-worthy motion (framer-motion, lenis, kinetic hero, marquee, parallax). Accurate Digambar Jain identity only.

## Architecture
- Frontend: React 19 (CRA/craco) single-page scroll site, Tailwind, framer-motion (kinetic masked line reveal hero, scroll reveals), lenis smooth scrolling, canvas golden-dust hero particles + mouse parallax Shikhar line art, shadcn Dialog + sonner toasts.
- Backend: FastAPI (`/app/backend/server.py`), MongoDB via motor. Endpoints: GET /api/, GET /api/events (placeholder events), POST /api/contact, POST /api/events/register, POST /api/interest. All writes stored with uuid + ISO timestamp.
- Brand: custom SVG logo (Shikhar spire, tier arcs, flanking domes, oak leaves, saffron kalasha) at `public/logo.svg` + `components/djcr/Logo.jsx`; decorative `ShikharArt.jsx` line-art; jali lattice CSS patterns; Cormorant Garamond / Rozha One / Plus Jakarta Sans / JetBrains Mono fonts.
- SEO: title/meta/OG in `public/index.html` targeting Jain Temple Raleigh NC / RTP searches.

## User Personas
- RTP-area Jain families seeking community, pathshala for kids, event info
- Devotees wanting swadhyay/vidhan/parv observances
- Sangh members who want to volunteer/support the temple project

## Core Requirements (static)
Single-page site; nav Temple | About Us | Temple Vision | Events | Jain Dharma | Get Involved | Contact; hero with exact heading/subheading/mantra/CTAs; welcome with sacred activities list; 4 vision pillars; 3 Jain principles with Devanagari; temple project roadmap (Vision→Planning→Property→Design→Fundraising→Construction→Pratishtha), clearly upcoming; events with date/time/location/description/registration; get involved (join/volunteer/support/updates/WhatsApp); contact form + placeholder channels; footer with Jai Jinendra 🙏 + copyright; no invented contact info or donation claims; responsive.

## Implemented (2026-09-22)
- Full brand identity + SVG logo, jali patterns, Shikhar line art
- Kinetic hero (masked line-by-line reveal, golden-dust canvas, mouse parallax Shikhar)
- Slow editorial marquee ribbon (maroon/gold)
- All 7 content sections + numbered manifesto chapters (01–07)
- Milestone timeline with "Vision = Current Phase"
- Events served from API; registration dialog → POST /api/events/register → toast
- Get Involved dialog → POST /api/interest (kinds: join/volunteer/support/updates/whatsapp)
- Contact form → POST /api/contact → toast; placeholder channels ("To be announced")
- Lenis smooth scroll + anchor offset scrolling; mobile glass header + drawer menu
- All data-testids on interactive elements

## Verification Done
- curl: GET /api/, GET /api/events (7 events), POST /api/contact, /api/events/register, /api/interest — all 200 ok
- Playwright: hero reveal, CTA scroll, event registration dialog submit + toast, interest submit + toast, contact submit + toast, mobile hero/menu/events — all pass; console clean (only platform overlay noise)

## Backlog / Next Tasks
- P0: Admin or CMS flow to manage events (currently server-side placeholder list; user mentioned Squarespace — could migrate or keep custom)
- P1: Real contact channels (email/phone/social links) once provided; Resend email notifications for form submissions
- P1: Event image support, past-events archive
- P2: Multi-page expansion (dedicated Temple Project page), donation integration (Stripe) only when user provides details, WhatsApp group invite link, sitemap.xml/robots.txt, favicon variants (PNG/apple-touch)
