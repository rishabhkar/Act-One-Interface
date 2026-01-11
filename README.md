# Prarambh Theatre Group — Interface

Welcome to the public-facing site and booking UI for **Prarambh Theatre Group**. It’s a dark, cinematic, glassy experience built to stay lean on phones while keeping the stage-light vibe on desktop.

## Stack
- React + TypeScript
- Vite
- Tailwind CSS
- React Router
- lucide-react

## What’s inside
- Home: cross-fading hero, music toggle, upcoming shows, members, press, galleries
- Shows: pulled from the backend show API
- Book seats: UPI-first flow with sold-out handling, validation, and summaries
- Members + guest actors
- Galleries: plays, backstage, workshops
- Support / Feedback forms

## Prereqs
- Node.js (LTS)
- npm

## Install
```powershell
npm install
```

## Environment
Vite requires client vars to be prefixed with `VITE_`.
Create two files (not committed):
- `.env` (local dev)
- `.env.production` (production builds)

Example (edit with your own endpoints):
```bash
VITE_API_BASE_URL=https://your-backend-host
```

The UI calls API endpoints relative to `VITE_API_BASE_URL`, e.g.
- `GET  ${VITE_API_BASE_URL}/api/auditoriums`
- `POST ${VITE_API_BASE_URL}/api/tickets/issue`

## Run (dev)
```powershell
npm run dev
```

## Build
```powershell
npm run build
```
Outputs to `dist/`.

## Preview production build locally
```powershell
npm run preview
```

## Deploy (Firebase Hosting)
Hosting is configured to serve `dist/` via `firebase.json`.
1) Build
```powershell
npm run build
```
2) Deploy
```powershell
firebase deploy --only hosting
```

## Notes
- Front-end only; bring your own backend endpoints and secrets via env files. Do **not** commit keys or passwords.
- Gallery/image assets are already optimized to WebP; additional scripts under `scripts/` can help re-encode if needed.
- For mobile smoothness, prefer the mobile layout (auto-switches via media query helper) and keep heavy effects disabled client-side.