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

## Updates (2026-09-24)
- Mantra changed from णमो अरिहंताणं to अहिंसा परमो धर्मः (hero, contact panel, footer)
- Contact email channel now shows admin@djcraleigh.org (mailto link)
- Temple project roadmap extended: Vision = Completed (gold check); Planning = In Progress ("All legal activities in progress"); Property = In Progress ("Property search in progress")
- Managed Resend email notifications wired: contact/event/interest submissions email admin@djcraleigh.org (ADMIN_EMAIL in backend/.env; EMAIL_FROM_NAME="Digambar Jain Center of Raleigh"). Pipeline verified with delivered@resend.dev (202 + id). NOTE: proxy currently blocks admin@djcraleigh.org as undeliverable (mailbox/domain not live yet) — needs a real working inbox or the djcraleigh.org mailbox to be created; submissions are always saved to MongoDB regardless.

## Updates (2026-09-24, round 2)
- Single contact email everywhere: admin@djcraleigh.org (verified by grep — no placeholders remain)
- All forms converted from backend POSTs to mailto: actions addressed to admin@djcraleigh.org (contact, event registration, get-involved) so the site is fully static-hosting compatible; toast confirms "Opening your email app…"
- New Donate section (chapter 07, maroon) + prominent gold DONATE nav tab (desktop xl+ and mobile) + footer link; CTA "Contact Us to Donate" → mailto with subject "Donation Inquiry - Digambar Jain Center of Raleigh"; contact renumbered to chapter 08; no financial details invented
- Events now load from API with local fallback in frontend/src/components/djcr/eventsData.js (works on static hosting)
- README.md fully rewritten for a non-technical admin: overview, prerequisites, real repo structure, local dev (yarn start), editing guide with file paths, images guide, yarn build → frontend/build/, GitHub workflow, Cloudflare Pages + Squarespace DNS deployment for djcraleigh.org, forms/email explanation
- NOTE: Emergent preview still runs the FastAPI backend (endpoints intact); the static site does not depend on it

## Updates (2026-09-24, round 3 — File & media storage)
- Emergent object storage integrated (playbook-compliant): EMERGENT_LLM_KEY in backend/.env, storage_key init at startup, app-prefix "djcr/media/...", MongoDB index in `media` collection, soft-delete only
- Backend endpoints: POST /api/media/upload (multipart; categories gallery/event/document; images ≤15MB jpg/png/webp/gif, documents PDF-only; event photos validated against known event ids), GET /api/media (?category&event_id), GET /api/media/file/{id} (?download=1 sets attachment header), DELETE /api/media/{id} (soft)
- New "Gallery & Resources" section (chapter 06, id=gallery): Photos/Documents tabs, photo grid, PDF download rows, public "Share a Photo"/"Share a Document" upload dialog (no login, per user default). If backend unreachable (static hosting) the section shows a graceful coming-soon message and hides uploads
- Event cards now display the latest uploaded event photo when one exists
- Nav: GALLERY added after Events; "Support Vision" header CTA removed to fit 9 items (Donate in gold remains the primary CTA); footer link added; chapters renumbered 06 Gallery, 07 Get Involved, 08 Donate, 09 Contact
- Verified via curl: upload/list/serve/download for all 3 categories (test files soft-deleted after); verified via Playwright: tabs, empty states, upload dialog with event picker, real UI upload appears in gallery
- Resend email flow decision: user was asked (mailto-only vs server-side vs hybrid) — no answer given; mailto-only remains in effect. Backend Resend notifications still fire if the backend endpoints are called directly

## Updates (2026-09-26, round 4 — Admin panel, YouTube live, topbar, vibrancy)
- JWT admin auth (integration playbook): POST /api/admin/login (Bearer token, 12h), bcrypt hash, admin seeded from ADMIN_EMAIL + ADMIN_PASSWORD env (reconciles on restart; no in-app password change), 5-attempts/15-min lockout via login_attempts, users.email unique index
- Admin page at /admin (React route): login card + event manager — create/edit/delete daily events with write-up, photo OR video upload (MP4/WEBM up to 60MB via object storage), and YouTube live link; lists all live events with edit/delete
- Events are now DB-backed: db.events seeded once from defaults on first startup (never re-seeds when data exists); public GET /api/events reads DB; eventsData.js remains the static-hosting fallback
- Public event cards: saffron "Watch Live on YouTube" button when youtube_url set; photo/video rendered when media attached; colored category chips (Parv/Puja saffron, Swadhyay/Community gold, Live Stream solid maroon)
- Top bar above header: admin@djcraleigh.org (mailto) + +1 (984) 800-2733 (tel:+19848002733), gold gradient divider strip; phone also added to Contact channels; anchor scroll offset updated to -116, hero pt-44
- Logo lockup now shows full name "Digambar Jain Center of Raleigh" in display serif with small gold DJCR above (mark unchanged: Shikhar + oak leaves)
- Vibrancy pass (tasteful): warmer hero glow (saffron), maroon gradient marquee, saffron icon circles on vision pillars, saffron hover wash on event cards
- Admin credentials: admin@djcraleigh.org / DJCRJaiJinendra@2026 (in /app/memory/test_credentials.md); /app/auth_testing.md saved
- Verified: curl login→list→create→update→public-read→delete chain, 401 without token, 401 wrong password; Playwright UI login + create event with photo + YouTube link visible on public site (test event + media cleaned up)

## Updates (2026-09-26, round 5 — Brand logo assets with name)
- Full logo lockups created in frontend/public/: logo-full.svg/.png (horizontal, ivory bg, 2160x600), logo-full-dark.svg/.png (for maroon backgrounds), logo-stacked.svg/.png (1800x1920, includes अहिंसा परमो धर्मः + DJCR — for social profiles/signage)
- All use the original DJCR mark (Shikhar spire, gold tier arcs, saffron kalasha, oak leaves) with "Digambar Jain Center of Raleigh" in Cormorant Garamond + "RALEIGH • RESEARCH TRIANGLE, NC" caption
- Header/footer lockup continues to use Logo.jsx; README documents all logo files

## Updates (2026-09-26, round 6 — Circular Jain seal logo, per user reference of JSOWR logo)
- New official emblem: circular seal with Jain Prateek-inspired center glyph (stylized, original artwork), 12 saffron lotus petals + gold outer petals, gold ring with 8 diamond ornaments, circular text "DIGAMBAR JAIN CENTER OF RALEIGH" (top), "SAMYAK DARSHAN ✦ SAMYAK GYAN ✦ SAMYAK CHARITRA" (middle ring), "DJCR ✦ NORTH CAROLINA" (bottom) — DJCR palette, not a copy of the reference
- Files: public/logo-seal.svg/.png (1200px), logo.svg favicon replaced with seal, Logo.jsx header/footer mark replaced with simplified seal, logo-full / logo-full-dark / logo-stacked SVG+PNG regenerated with the seal
- Sacred-swastika separators from the reference were deliberately replaced with ✦ diamonds; can add traditional Jain symbols on request
- Verified: all variants rendered at high res and visually inspected; seal live in site header

## Backlog / Next Tasks
- P0: Admin or CMS flow to manage events (currently server-side placeholder list; user mentioned Squarespace — could migrate or keep custom)
- P1: Real contact channels (email/phone/social links) once provided; Resend email notifications for form submissions
- P1: Event image support, past-events archive
- P2: Multi-page expansion (dedicated Temple Project page), donation integration (Stripe) only when user provides details, WhatsApp group invite link, sitemap.xml/robots.txt, favicon variants (PNG/apple-touch)
