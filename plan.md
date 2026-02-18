# 📄 Phase 1 — PLAN.md

## Project Overview

This project is a **Task Management System** built with a modern full-stack JavaScript architecture.

## Stack Used

- **Frontend:** Next.js (React framework)
- **Backend:** Express.js (Node.js + TypeScript)
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **Frontend Deployment:** Vercel
- **Backend Deployment:** Render (HTTPS)
- **Version Control:** GitHub

## Repositories

- **Backend:** https://github.com/SanudaKJ/task_managemant_backend.git
- **Frontend:** https://github.com/SanudaKJ/task_managemant_frontend.git

## Architecture Overview

### Frontend (Next.js)

Handles UI rendering and user interactions.

**Pages:**

- Login
- Register
- Dashboard
- Task create/edit form

**API Configuration:**

Calls backend APIs via environment variable:

**Security & UX:**

- Route protection for authenticated users

---

### Backend (Express.js)

**REST API structure:**

**Auth Routes**

- POST /auth/register
- POST /auth/login

**Task Routes (Protected)**

- GET /tasks
- POST /tasks
- PUT /tasks/:id
- DELETE /tasks/:id

**Middleware:**

- JWT authentication middleware
- CORS handling
- Error handling middleware
- Request validation

---

### Database (MongoDB)

**Collections:**

**Users**

- email
- password (bcrypt hash)
- createdAt

**Tasks**

- userId (reference)
- title
- description
- status
- dueDate
- timestamps

---

## Security Considerations

### Client Side

- API base URL stored in environment variables
- Protected routes
- No sensitive logic on frontend

### Server Side

- Password hashing using bcrypt
- JWT authentication
- User authorization (each user accesses only their own tasks)
- Input validation
- CORS restricted to Vercel frontend origin
- Secure HTTPS backend deployment (Render)

---

## Deployment Plan

### Backend Deployment (Render)

**Reason:**

- Free HTTPS hosting
- Solves browser mixed-content issue (HTTPS frontend → HTTPS backend)

**Deployment flow:**

1. Push backend to GitHub
2. Connect repo to Render

**Build command:**
npm install && npm run build

**Start command:**
npm start

---

### Frontend Deployment (Vercel)

**Reason:**

- Native Next.js support
- Fast CI/CD

---

## Technical Challenges 

- CORS with credentials
- HTTPS requirement when frontend uses Vercel
- Environment variable management
