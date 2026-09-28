# BMSBrainBank (BMSCE Academic Intelligence Vault)

## Overview
BMSBrainBank is an open-access, full-stack academic resource hub built specifically for **B.M.S. College of Engineering (BMSCE)** students. It centralizes 250+ lecture notes, CIE midterm papers, SEE final question paper solutions, and lab manuals categorized by department, semester (1-8), scheme (2022 NEP, 2021, 2025), and module (1-5).

## Architecture
- **Frontend**: React 18, Vite 5, Tailwind CSS v3 (custom BMS palette, glassmorphic UI, Outfit & Plus Jakarta Sans typography), Lucide Icons.
- **Backend**: Node.js v24 (ES Modules), Express REST API (`/api/resources`, `/api/departments`, `/api/subjects`, `/api/requests`, `/api/leaderboard`).
- **Database**: SQLite3 relational database (`server/bmsce_resources.db`).
- **Deployment**: Unified Express static serving on single port `5001` or instant Netlify drag-and-drop SPA deployment.

## Project Structure
- `/client/` - React frontend source code, components (`/components`), pages (`/pages`), theme context, and public static assets (`/public`).
- `/server/` - Express server (`index.js`), SQLite initializer (`db.js`), seed script (`seed.js`), and NoteGo data ingestion pipeline (`import_notego_dataset.js`).
- `package.json` - Root full-stack orchestration scripts.

## Development & Production Commands
- `npm start` - Builds React client and launches unified Express server on `http://localhost:5001`.
- `cd client && npm run dev` - Launch Vite development server on `http://localhost:3000`.
- `cd client && npm run build` - Compile production bundle to `client/dist`.
- `cd server && node import_notego_dataset.js` - Re-sync 250+ resources from NoteGo dataset into SQLite database.

## Key Patterns
- REST API response format: JSON objects or arrays.
- Static file fallback: Express catch-all `app.get('*')` routes non-API requests to `client/dist/index.html`.
- Netlify SPA routing: `client/public/_redirects` contains `/* /index.html 200`.
