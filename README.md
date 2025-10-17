# CipherStudio — Browser-Based React IDE

## Overview
CipherStudio is a browser-based React IDE with file management, Sandpack editor/preview, live console, autosave, and backend persistence.

## Repos & Structure
- `/frontend`: Vite + React app using Sandpack
- `/backend`: Node.js + Express + MongoDB API

Branches: `mvp` (ready) and `complete`.

## Requirements
- Node 18+ and npm
- MongoDB (local or Atlas)

## Setup
```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd ../backend
npm install
cp ENV.EXAMPLE .env  # edit MONGO_URI if needed
npm run start:dev
```

## Production
```bash
# Frontend
cd frontend
npm run build
npm run preview

# Backend
cd ../backend
npm run start:prod
```

## Frontend Features (MVP)
- Create/rename/delete files
- Edit `.js/.jsx/.css/.html`
- Live preview with 300ms debounce
- Console shows logs/errors
- Autosave to `localStorage` by `projectId`

## Backend API
Base URL: `http://localhost:4000`

- POST `/api/projects`
  - body: `{ name, files:[{path,content}], entry, autosaveEnabled }`
  - resp: `{ projectId }`
- GET `/api/projects/:projectId`
  - resp: `{ projectId, name, files, entry, createdAt, updatedAt, autosaveEnabled }`
- PUT `/api/projects/:projectId`
  - body: `{ name, files, entry, autosaveEnabled }`
  - resp: `{ ok: true }`

Example curl
```bash
curl -X POST http://localhost:4000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"name":"Demo","files":[{"path":"/index.jsx","content":"console.log(1)"}],"entry":"/index.jsx"}'

curl http://localhost:4000/api/projects/<PROJECT_ID>

curl -X PUT http://localhost:4000/api/projects/<PROJECT_ID> \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated","files":[{"path":"/index.jsx","content":"console.log(2)"}],"entry":"/index.jsx","autosaveEnabled":true}'
```

## Manual Test Plan
- Create/rename/delete files in sidebar
- Edit files; see live preview update
- Open console; see logs/errors
- Refresh page; project reloads via `projectId`
- Use API to save/load to MongoDB

## Scripts
- Frontend: `npm run dev`, `npm run build`, `npm run preview`
- Backend: `npm run start:dev`, `npm run start:prod`, `npm test`

## ENV
See `backend/ENV.EXAMPLE`.

## Deployment
- Frontend: Vercel (build command `npm run build`, output `dist`)
- Backend: Render/Railway (set `PORT` and `MONGO_URI`)
