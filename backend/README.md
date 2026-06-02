# ARCHINEPAL Backend

Production-ready Express API for ARCHINEPAL, designed as a standalone deployable backend for the frontend in this repository.

## Stack

- Node.js, TypeScript, Express
- PostgreSQL with Prisma ORM
- Redis caching and token blacklist
- JWT access and refresh auth with secure cookies
- Socket.IO realtime notifications
- Zod validation
- Cloudinary or AWS S3 storage adapters
- Helmet, CORS, compression, rate limiting, CSRF protection
- Pino logging
- Swagger/OpenAPI docs
- Jest and Supertest
- Docker and docker-compose

## Quick Start

```powershell
cd C:\Users\Dell\Documents\kushal\backend
copy .env.example .env
npm install
docker compose up -d postgres redis
npm run prisma:migrate
npm run dev
```

API: `http://localhost:4000/api`

Docs: `http://localhost:4000/api/docs`

Health: `http://localhost:4000/health`

## Production Notes

- Use strong unique secrets for `JWT_SECRET`, `REFRESH_SECRET`, `COOKIE_SECRET`, and `CSRF_SECRET`.
- Use managed PostgreSQL and Redis for production.
- Store media in Cloudinary or S3, never on the API disk.
- Run `npm run prisma:deploy` during deployment.
- Put the API behind HTTPS and a trusted reverse proxy.
