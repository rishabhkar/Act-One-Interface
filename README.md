# Prarambh Theatre Group Interface

A theatre-themed public website and lightweight booking flow UI for **Prarambh Theatre Group**.

Built with:
- React + TypeScript
- Vite
- Tailwind CSS
- React Router
- lucide-react

## Features
- Home page with cross-fading background slideshow
- Shows listing (driven by backend `/api/auditoriums`)
- Booking flow (UPI-first) with sold-out handling
- Members pages + galleries
- Support / Feedback forms

## Prerequisites
- Node.js (LTS recommended)
- npm

## Install
```powershell
npm install
```

## Environment variables
This is a Vite app, so client-side variables must be prefixed with `VITE_`.

Create:
- `.env` for local development
- `.env.production` for production builds

Example `.env`:
```bash
VITE_API_BASE_URL=http://localhost:8080
```

Example `.env.production`:
```bash
VITE_API_BASE_URL=https://YOUR-PROD-BACKEND-HOST
```

The UI calls API endpoints relative to this base URL, e.g.
- `GET  ${VITE_API_BASE_URL}/api/auditoriums`
- `POST ${VITE_API_BASE_URL}/api/tickets/issue`

## Run locally (dev)
```powershell
npm run dev
```

## Build
```powershell
npm run build
```

This generates `dist/`.

## Preview the production build locally
```powershell
npm run preview
```

## Firebase Hosting deploy
This repo is configured for Firebase Hosting (`firebase.json` points to `dist/`).

1) Build:
```powershell
npm run build
```

2) Deploy hosting:
```powershell
firebase deploy --only hosting
```

## Notes
- This repo is **front-end only**. The backend should expose the booking/show APIs.
- Client-side code cannot be truly protected from source viewing in a browser; basic deterrents (e.g. disabling right-click on gallery images) are implemented only as UX friction.