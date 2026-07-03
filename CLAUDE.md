# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A single-page personal/portfolio website for Alexander Gordash (React & React Native developer). Built with Next.js (App Router). The intended design is a warm, editorial, minimal single column — full spec, copy, colors, and typography live in `design_handoff_personal_site/README.md`, with a self-contained, pixel-accurate reference at `design_handoff_personal_site/personal-site.html` (open in a browser as the visual source of truth). The scaffold currently still shows the default Next.js starter page; the site itself has not been built yet.

## Commands

```bash
npm run dev      # start dev server at http://localhost:3000
npm run build    # production build (also runs `tsc` type-check)
npm run start    # serve the production build
npm run lint     # ESLint (flat config, next/core-web-vitals + next/typescript)
```

There is no test runner configured yet. `npm run build` is the closest thing to CI validation — it fails on type errors, so run it after non-trivial changes.

## Stack & conventions

- **Next.js 16 App Router** with the `src/` directory. All routes/layouts live under `src/app/`.
- **React 19**, **TypeScript** in `strict` mode.
- **Tailwind CSS v4** — configured via `@tailwindcss/postcss` in `postcss.config.mjs`. There is no `tailwind.config.js`; Tailwind is imported and configured directly in `src/app/globals.css` via `@import "tailwindcss"` and `@theme`. Add design tokens (the colors/fonts from the handoff) in `globals.css`, not a JS config.
- **Import alias**: `@/*` → `./src/*`.

## Implementing the design

When building the actual site, reproduce `design_handoff_personal_site/README.md` closely (it is marked high-fidelity). Key points that require reading the handoff to get right:

- Fonts are **Newsreader** (serif) and **IBM Plex Mono** (labels) — load via `next/font/google`.
- The accent color `#2f5fbf` is a single CSS custom property (`--accent`) referenced everywhere; keep it as one token.
- Logo assets are in `design_handoff_personal_site/assets/` (`civic-leave-logo.png`, `bluegrass-acres-farm-logo.png`) — move to `public/` for use with `next/image`.
- Several links are **placeholders** to replace with real values: GitHub and LinkedIn profile URLs, and the three work-item hrefs. Confirm the email address before shipping.

## npm cache note

The shared npm cache (`~/.npm/_cacache`) contains root-owned files from a past `sudo npm`, which breaks installs with `EACCES`. Work around it by pointing to a fresh cache: `npm install --cache /tmp/npm-cache-pw` (or `sudo chown -R $(whoami) ~/.npm` to fix permanently).
