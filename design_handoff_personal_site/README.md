# Handoff: Alexander Gordash — Personal Developer Website

## Overview
A single-page personal/portfolio website advertising Alexander Gordash, a React & React Native developer. It presents a short intro, a list of selected work (four apps), a toolkit list, and contact links. The visual direction is **warm, editorial, minimal**: a serif typeface on off-white paper with a single blue accent and monospace section labels.

## About the Design Files
The file in this bundle (`personal-site.html`) is a **design reference created in HTML** — a prototype showing the intended look and behavior, not production code to ship directly. The task is to **recreate this design in your target codebase** using its established patterns, component library, and conventions (React, Next, Vue, plain HTML/CSS, etc.). If there is no existing environment, pick the most appropriate framework for a small static personal site and implement it there. `personal-site.html` is fully self-contained (fonts, runtime, images all inlined) so you can open it in any browser as the source of truth for pixel details.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, and layout are intentional and should be reproduced closely. Exact values are listed under Design Tokens below.

## Layout
- Single centered column, `max-width: 560px`, horizontally centered (`margin: 0 auto`).
- Page padding: `110px 32px 120px`.
- Full-height page (`min-height: 100vh`) on a warm off-white background.
- Vertical rhythm between major sections: `margin-top: 56px` (Work section is `64px` below the intro).
- Sections top-to-bottom: **Intro → Work → Toolkit → Contact**.

## Screens / Views

### Single view: Home
**Purpose:** Introduce Alexander, show his work, and provide ways to contact him.

**Components (top to bottom):**

1. **Intro / header**
   - A row (`display:flex; align-items:center; gap:20px`) containing:
     - **Avatar** — a circular image placeholder, `84×84px`, `border-radius:50%`. In the prototype this is an empty drop slot (user supplies a photo). In production, render a circular `<img>`; if empty, show a neutral placeholder.
     - **Name** — "Alexander Gordash", Newsreader serif, weight 420, `27px`, `line-height:1.3`, `letter-spacing:-0.01em`, color `#26221f`.
   - **Bio paragraph** below the row: `margin-top:24px`, `font-size:19px`, `line-height:1.65`, color `#575049`. Copy:
     > "React & React Native developer. Five years building fast, reliable apps for web and mobile — from tools to help small farmers to tools to help local government."

2. **Work section**
   - Section label "Work" — IBM Plex Mono, `11px`, `letter-spacing:0.12em`, uppercase, color `#a39a8d`, `margin-bottom:22px`.
   - A borderless `<ul>` of four list items. Each item: `padding:18px 0`, top border `1px solid #ece7df` (the last item also has a bottom border).
   - Each item is a row: `display:flex; gap:16px; align-items:flex-start` with:
     - **Logo tile** — `46×46px`, `border-radius:10px`, `object-fit: contain` image. (The Sanford item has **no logo** — it uses an empty `46×46` spacer div to keep text aligned.)
     - **Text column** (`flex:1`): a title line (`font-size:19px`) and a description (`font-size:16px`, `line-height:1.55`, color `#7a7269`, `margin-top:4px`).
   - The first three titles are **links** (accent color `#2f5fbf`, no underline) with a trailing "↗" glyph in IBM Plex Mono `13px`. Sanford's title is plain text (`#26221f`), no link.

   **The four work items:**
   - **Civic Leave** *(linked, logo: Civic Leave column mark)* — "Leave management software to help local governments manage FMLA, state leave, and ADA leave with less risk, less stress, and less complexity."
   - **Goat Herd Management Mobile App** *(linked, logo: Bluegrass Acres Farm)* — "Livestock tracking, health records, and daily notes to assist goat owners in managing their herds so that they save time, money, and have goats that are well taken care of."
   - **Kidding Schedule Mobile App** *(linked, logo: Bluegrass Acres Farm)* — "Due-date tracking and reminders to assist goat owners in tracking when their goats are going to give birth."
   - **Sanford Irrigation Mobile App** *(not linked, no logo)* — "Field-service app for irrigation crews to reduce time searching for irrigation system utilities. The app assists in documenting the location of irrigation utilities such as valves, timers, and other critical items of customer's irrigation systems."

3. **Toolkit section**
   - Label "Toolkit" (same mono label style as above), `margin-bottom:16px`.
   - One paragraph, `font-size:17px`, `line-height:1.7`, color `#575049`. Content (middot-separated):
     `React · React Native · Expo · TypeScript · JavaScript · Python · TanStack Query · Node.js · Jest · Vitest · CI/CD`

4. **Contact section**
   - Label "Contact" (mono label style), `margin-bottom:16px`.
   - A wrapping row (`display:flex; flex-wrap:wrap; gap:22px; font-size:17px`) of three text links: **Email**, **GitHub**, **LinkedIn**.
   - Each link: accent color `#2f5fbf`, no text-decoration, a `1px` bottom border at ~35% accent opacity, `padding-bottom:2px`.
   - Targets: Email → `mailto:alexander.gordash@gmail.com`; GitHub → `https://github.com/` (**placeholder — replace with real profile**); LinkedIn → `https://www.linkedin.com/` (**placeholder — replace with real profile**).

## Interactions & Behavior
- **Links:** Work titles (first three) and the three contact links navigate on click. Work-title hrefs are `#` placeholders in the prototype — swap in real project URLs.
- **Accent color** is defined once as a CSS custom property `--accent` on the page root and referenced everywhere via `var(--accent, #2f5fbf)`. Changing one value re-themes the whole page. In the prototype this was an exposed tweak; treat `#2f5fbf` as the default.
- No animations, loading, or error states. No form inputs.
- **Responsive:** The column is capped at `560px` and centered; on narrow screens the `32px` side padding keeps it comfortable. No breakpoint-specific behavior is required beyond natural reflow (the contact links and any tag rows wrap).

## State Management
None required. This is a static content page — no client state, data fetching, or dynamic behavior.

## Design Tokens
**Colors**
- Background (paper): `#fbfaf8`
- Primary text: `#26221f`
- Body / bio text: `#575049`
- Muted description text: `#7a7269`
- Mono section labels: `#a39a8d`
- Hairline borders / dividers: `#ece7df`
- Accent (links, "↗"): `#2f5fbf`
- Accent border (link underline): `#2f5fbf` at ~35% opacity (`color-mix(in oklab, #2f5fbf 35%, transparent)`)

**Typography**
- Serif (headings + body): **Newsreader** (Google Fonts), fallbacks `Georgia, serif`. Weights used: 360 (body), 420 (name).
- Mono (labels + "↗"): **IBM Plex Mono** (Google Fonts) 400.
- Sizes: name 27px; bio 19px; work title 19px; work description 16px; toolkit 17px; contact 17px; section labels 11px (uppercase, letter-spacing 0.12em).

**Spacing**
- Column max-width 560px; page padding `110px 32px 120px`.
- Section gaps: 56px (Toolkit, Contact), 64px (Work); work list item padding 18px vertical.
- Logo/avatar gap in rows: 20px (avatar), 16px (work rows).

**Radius**
- Avatar: 50% (circle, 84px).
- Logo tiles: 10px (46px squares).

**Borders / dividers**
- `1px solid #ece7df` between work items.

## Assets
Located in the `assets/` folder of this bundle:
- `civic-leave-logo.png` — Civic Leave column-and-wordmark logo (navy + gold on white). Used at 46px, `object-fit: contain`.
- `bluegrass-acres-farm-logo.png` — Bluegrass Acres Farm logo (goat playing fiddle + wordmark, navy/gold). Used for both the Goat Herd Management and Kidding Schedule items at 46px, `object-fit: contain`.
- The **avatar** photo is not included — Alexander should supply a headshot.
- Sanford Irrigation intentionally has **no logo**.

Fonts (Newsreader, IBM Plex Mono) are loaded from Google Fonts; use the same or your codebase's equivalents.

## Files
- `personal-site.html` — self-contained, runnable design reference (all fonts/images/runtime inlined). Open in a browser as the visual source of truth.
- `assets/civic-leave-logo.png`, `assets/bluegrass-acres-farm-logo.png` — the two logos, extracted for direct reuse.

## Notes for implementation
- Replace placeholder URLs: GitHub and LinkedIn profile links, and the three work-item hrefs.
- Confirm the email address (`alexander.gordash@gmail.com`) is correct.
- The logos are raster PNGs; if vector versions exist, prefer those.
