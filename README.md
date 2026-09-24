# Digambar Jain Center of Raleigh (DJCR) — Website

This repository contains the official website for **Digambar Jain Center of Raleigh (DJCR)**,
an emerging Digambar Jain spiritual organization serving Raleigh, Cary, Morrisville, Durham,
Chapel Hill, and the greater Research Triangle (RTP) area of North Carolina.

- **Primary domain:** djcraleigh.org
- **Contact email (all enquiries, volunteering, donations, events):** admin@djcraleigh.org

अहिंसा परमो धर्मः

---

## 1. Project Overview

The site is a single-page, scroll-based website with these sections:
**Temple (home) → About Us → Temple Vision → Jain Dharma → Temple Project → Events →
Get Involved → Donate → Contact**, plus a footer.

**Technology used (actual stack):**

| Part | Technology |
|---|---|
| Website (frontend) | React 19, built with Create React App + CRACO |
| Styling | Tailwind CSS 3 + custom CSS |
| Animations | framer-motion, lenis (smooth scrolling) |
| UI components | shadcn/ui (Radix UI), lucide-react icons, sonner toasts |
| Package manager | **Yarn 1.22** (do not use npm — see troubleshooting) |
| Optional backend | Python FastAPI + MongoDB (`/app/backend`) — only used on the Emergent preview; **the website does not require it** |
| Forms | All forms (contact, event registration, get involved, donate) open the visitor's email app pre-addressed to **admin@djcraleigh.org** (`mailto:` links), so the site works on any static host |

Because every form uses email directly, the built website is a **pure static site** and can be
hosted on Cloudflare Pages, Netlify, GitHub Pages, Squarespace, or any static host.

---

## 2. Prerequisites

Install these once on your computer:

1. **Git** — to download and publish the code. Download: https://git-scm.com/downloads
2. **A GitHub account** — to store the code online. Sign up: https://github.com
3. **Node.js 18 or newer** — runs the website build tools. Download the LTS version: https://nodejs.org
   - Check your version: `node --version`
4. **Yarn 1.22** — the package manager this project uses. After installing Node, run:
   `npm install -g yarn`
   - Check: `yarn --version` (should print 1.22.x)
5. **A Cloudflare account** (free) — for hosting the live website on Cloudflare Pages: https://dash.cloudflare.com/sign-up
6. **Squarespace account access** — only if the djcraleigh.org domain is managed in Squarespace, to point the domain at the website (see Deployment section)

Optional (only needed if you ever work on the Python backend): Python 3.10+ and MongoDB.
**Most administrators will never need this.**

---

## 3. Repository Structure

```
/app
├── README.md                     ← this file
├── frontend/                     ← THE WEBSITE (everything you normally edit lives here)
│   ├── package.json              ← list of libraries the site uses + build commands
│   ├── tailwind.config.js        ← styling configuration
│   ├── craco.config.js           ← build configuration (CRACO)
│   ├── .env                      ← environment settings (preview URL)
│   ├── public/                   ← static files copied as-is into the final site
│   │   ├── index.html            ← page titles, SEO meta descriptions, fonts
│   │   └── logo.svg              ← the DJCR logo file (also used as favicon)
│   └── src/
│       ├── App.js                ← main page — assembles all sections in order
│       ├── index.css             ← global styles, brand colors, fonts
│       ├── App.css               ← small extra effects (shimmer, glow)
│       └── components/
│           ├── djcr/             ← ALL DJCR page sections (see "Making Changes")
│           │   ├── Header.jsx        ← top navigation menu
│           │   ├── Hero.jsx          ← hero (big headline + अहिंसा परमो धर्मः)
│           │   ├── Marquee.jsx       ← scrolling gold/maroon ribbon
│           │   ├── Welcome.jsx       ← "Jai Jinendra" / About Us section
│           │   ├── Vision.jsx        ← "Our Temple Vision" (4 pillars)
│           │   ├── Dharma.jsx        ← Jain principles (Ahimsa etc.)
│           │   ├── Project.jsx       ← "Our Journey Has Begun" + milestone timeline
│           │   ├── Events.jsx        ← Upcoming Events cards
│           │   ├── eventsData.js     ← ★ THE EVENTS LIST — edit this to update events
│           │   ├── GetInvolved.jsx   ← "Be Part of Our Journey"
│           │   ├── Donate.jsx        ← ★ Donate section
│           │   ├── Contact.jsx       ← contact form + contact details
│           │   ├── Footer.jsx        ← footer
│           │   ├── Logo.jsx          ← logo (SVG) used in header/footer
│           │   ├── ShikharArt.jsx    ← decorative temple line-art
│           │   ├── Reveal.jsx        ← scroll animation helper
│           │   └── SectionHeading.jsx← section heading style helper
│           └── ui/               ← generic building blocks (buttons, dialogs) — rarely edit
├── backend/                      ← optional FastAPI backend (Emergent preview only)
│   ├── server.py
│   └── requirements.txt
├── tests/                        ← test folder (empty for now)
└── scripts/                      ← utility scripts folder
```

---

## 4. Running the Website Locally (on your computer)

Open a terminal (Terminal on Mac, PowerShell or "Terminal" on Windows) and run:

```bash
# 1. Download the code (replace with the actual GitHub URL of this repository)
git clone https://github.com/YOUR-ORG/djcr-website.git
cd djcr-website/frontend

# 2. Install the libraries the site needs (first time only, or after updates)
yarn install

# 3. Start the development server
yarn start
```

Then open your browser to:

```
http://localhost:3000
```

The page automatically reloads whenever you save a change to a file.

**To stop the server:** press `Ctrl + C` in the terminal.

### Troubleshooting

| Problem | Fix |
|---|---|
| `'yarn' is not recognized` | Yarn is not installed: run `npm install -g yarn`, then close and reopen the terminal |
| Errors during `yarn install` | Make sure you are inside the `frontend` folder (`cd frontend`), then retry |
| `Node version` errors | Install Node.js 18 or newer from https://nodejs.org |
| Port 3000 already in use | Another app is using it. Stop the other app, or run `yarn start` and answer `Y` when asked to use another port |
| Strange styling/dependency errors | Delete the `frontend/node_modules` folder and run `yarn install` again |
| Should I use `npm install`? | **No.** This project is managed with Yarn. Using npm can create a conflicting lockfile and break the build |

---

## 5. Making Website Changes

All content lives in `frontend/src/components/djcr/`. Open the file in any text editor
(recommended free editor: **VS Code**, https://code.visualstudio.com), change the text,
save, and the local site updates instantly.

| What you want to change | File to edit |
|---|---|
| Home page hero (headline, buttons) | `frontend/src/components/djcr/Hero.jsx` |
| Navigation menu items | `frontend/src/components/djcr/Header.jsx` (edit the `NAV` list at the top) |
| Donate section text / button | `frontend/src/components/djcr/Donate.jsx` |
| About / "Jai Jinendra" welcome text | `frontend/src/components/djcr/Welcome.jsx` |
| Temple Vision (4 pillars) | `frontend/src/components/djcr/Vision.jsx` |
| Jain Dharma principles | `frontend/src/components/djcr/Dharma.jsx` |
| Temple project text & milestone timeline | `frontend/src/components/djcr/Project.jsx` (edit the `MILESTONES` list — set `status` to `"completed"`, `"in-progress"`, or `"upcoming"`) |
| **Events** (most common update) | `frontend/src/components/djcr/eventsData.js` — each event is a block with `title`, `category`, `date`, `time`, `location`, `description`, and `tentative` (true = shows "Details to be confirmed") |
| Get Involved cards | `frontend/src/components/djcr/GetInvolved.jsx` (edit the `ACTIONS` list) |
| **Contact email** | `frontend/src/components/djcr/Contact.jsx` (the `ADMIN_EMAIL` constant at the top) — it is currently `admin@djcraleigh.org` |
| Footer text and links | `frontend/src/components/djcr/Footer.jsx` |
| Browser tab title & Google search description (SEO) | `frontend/public/index.html` (the `<title>` tag and `<meta name="description">` tag) |
| Logo | `frontend/src/components/djcr/Logo.jsx` and `frontend/public/logo.svg` |
| Brand colors & fonts | `frontend/src/index.css` (colors are defined at the top under `:root`) |

> Tip: to find where any sentence on the site lives, use your editor's "Search in files"
> feature (Ctrl+Shift+F) and search for a few words of that sentence.

---

## 6. Images and Assets

- **Where files live:** everything inside `frontend/public/` is copied unchanged into the
  final website. Create a folder `frontend/public/images/` and put your photos there.
- **How to reference an image:** in a component, use the path starting from `/`, for example:
  `<img src="/images/mahavir-jayanti-2026.jpg" alt="Mahavir Jayanti celebration" />`
  - ✅ Correct: `/images/mahavir-jayanti-2026.jpg`
  - ❌ Wrong: `frontend/public/images/...` or `C:\Users\...` (these break after deployment)
- **Recommended formats:** `.webp` or `.jpg` for photos, `.png` or `.svg` for logos/graphics.
- **Recommended size:** keep each image under ~300 KB and under 2000 px wide so the site
  stays fast. Free compressor: https://squoosh.app
- **Replacing an existing image:** the site currently uses a few carefully chosen
  architectural photos loaded from the web (they appear in `Welcome.jsx`). To replace one
  with your own photo: upload your file to `frontend/public/images/`, then change the
  `src="https://..."` value in the component to `src="/images/your-file.jpg"`.
- **Avoid broken images after deployment:** always use paths that start with `/`, keep
  filenames lowercase with hyphens (no spaces), and check the live site after publishing.

---

## 7. Building the Website for Production

From the `frontend` folder:

```bash
cd frontend
yarn build
```

This creates an optimized, ready-to-host copy of the website in:

```
frontend/build/
```

That `build` folder **is** the website — everything a static host needs is inside it.

**To test the production build on your own computer before publishing:**

```bash
npx serve -s build
```

Then open http://localhost:3000 (it will print the exact address).

---

## 8. GitHub Workflow (saving and publishing your changes)

Always download the latest version **before** you start editing:

```bash
git pull origin main
```

After making your changes and checking them locally, publish them:

```bash
git status                  # shows which files you changed (red = not saved yet)
git add .                   # marks ALL your changed files to be saved
git commit -m "Update events for Dash Lakshan Parv"   # saves a snapshot with a short description
git push origin main        # uploads your snapshot to GitHub
```

In plain language:

- `git pull origin main` — "Download the newest version from GitHub."
- `git status` — "Show me what I changed." (Nothing is uploaded by this command.)
- `git add .` — "Prepare everything I changed for saving."
- `git commit -m "..."` — "Save a labelled snapshot of my changes on this computer."
- `git push origin main` — "Upload my snapshot to GitHub so everyone (and the hosting
  service) gets it."

If you connected Cloudflare Pages to the GitHub repository (next section), every
`git push` automatically rebuilds and republishes the live website within 1–2 minutes.

---

## 9. Deployment (putting the site on djcraleigh.org)

### A. Host the site on Cloudflare Pages (free)

1. Push this repository to GitHub (section 8).
2. Log in to https://dash.cloudflare.com → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git** and choose this repository.
3. Use these exact build settings:
   - **Framework preset:** Create React App
   - **Root directory:** `frontend`
   - **Build command:** `yarn build`
   - **Build output directory:** `build`
4. Click **Save and Deploy**. After ~1–2 minutes Cloudflare gives you a temporary address
   like `djcr-website.pages.dev` — open it and check the site.

### B. Point djcraleigh.org at the site

If the domain was purchased through **Squarespace Domains**:

1. In Cloudflare Pages, open your project → **Custom domains** → **Set up a custom domain** →
   enter `djcraleigh.org` (and also `www.djcraleigh.org`).
2. Cloudflare will show you the DNS records it needs (usually a `CNAME` record pointing to
   your `djcr-website.pages.dev` address).
3. Log in to Squarespace → **Domains** → djcraleigh.org → **DNS settings**, and add exactly
   the records Cloudflare showed you. (Squarespace help: "Forwarding or pointing a
   Squarespace domain".)
4. Wait 5–60 minutes for the internet to pick up the change, then open
   https://djcraleigh.org — the site should load securely (HTTPS is automatic).

### C. After every update

Just follow the GitHub workflow (section 8): `git push` and Cloudflare republishes the site
automatically. There is no step 2.

---

## 10. How Forms & Email Work

There is no backend server to maintain. When a visitor submits the **Contact** form,
an **Event registration**, or a **Get Involved** form, their own email app opens with a
pre-written message addressed to **admin@djcraleigh.org** — they simply press Send.

The **Donate** section intentionally shows no bank or payment details. It asks visitors to
email **admin@djcraleigh.org** for donation information.

So the only operational requirement is: **make sure the admin@djcraleigh.org inbox exists
and someone checks it regularly.**

---

## 11. Quick Reference

| Task | Where / Command |
|---|---|
| Edit events | `frontend/src/components/djcr/eventsData.js` |
| Edit temple project milestones | `frontend/src/components/djcr/Project.jsx` |
| Change contact email | `ADMIN_EMAIL` in `frontend/src/components/djcr/Contact.jsx` (and `Donate.jsx`, `GetInvolved.jsx`, `Events.jsx`) |
| Edit page title / SEO | `frontend/public/index.html` |
| Run locally | `cd frontend && yarn install && yarn start` → http://localhost:3000 |
| Build for production | `cd frontend && yarn build` → `frontend/build/` |
| Publish changes | `git pull origin main` → edit → `git add .` → `git commit -m "..."` → `git push origin main` |

Jai Jinendra 🙏
