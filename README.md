# GoalSetter Web App (JWT + Redux Toolkit)

This repository now contains a full-stack **GoalSetter** application with:

1. **JWT-based user authentication** (register/login/logout)
2. **Goal management** (create/list/delete personal goals)
3. **Redux Toolkit** for frontend state management of both auth and goals

## Tech stack

- **Frontend:** React + Vite + Redux Toolkit
- **Backend:** Express + JWT + bcryptjs
- **Persistence:** JSON file database (`server/data/db.json`)

## Project structure

- `client/` React frontend
- `server/` Express API

## Run locally

```bash
npm install
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## API endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Goals (requires `Authorization: Bearer <token>`)
- `GET /api/goals`
- `POST /api/goals`
- `DELETE /api/goals/:id`
