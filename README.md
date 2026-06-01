# TypeScript Simple API

A simple REST API built with TypeScript, Express, TypeORM, PostgreSQL, Redis, and MongoDB.

## Features

- User registration and authentication (JWT)
- Profile routes
- Todo CRUD routes
- File upload route for user avatar
- Queue consumer support with Redis/Bull

## Tech stack

- Node.js + TypeScript
- Express
- TypeORM + PostgreSQL
- Redis (cache/queue)
- MongoDB
- Jest + Supertest

## Prerequisites

- Node.js
- npm
- Docker + Docker Compose (recommended for local services)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start local infrastructure (PostgreSQL, MongoDB, Redis):

```bash
docker-compose up -d
```

3. Configure environment variables (for example, in a `.env` file):

```env
TYPEORM_HOST=localhost
TYPEORM_PORT=5432
TYPEORM_USERNAME=username
TYPEORM_PASSWORD=password
TYPEORM_DATABASE=todo

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

MAIL_HOST=
MAIL_PORT=
MAIL_SECURE=
MAIL_USER=
MAIL_PASS=
MAIL_FROM_NAME=
MAIL_FROM_EMAIL=
```

4. Run database migrations:

```bash
npm run migration:run
```

## Running the project

Start API server (port `3333`):

```bash
npm run dev
```

Optional queue consumer:

```bash
npm run queue
# or
npm run consumer
```

## Scripts

- `npm test` — run test suite
- `npm run build` — compile/transpile to `dist`
- `npm run start` — start server with ts-node
- `npm run dev` — start server with nodemon
- `npm run migration:generate -- <name>` — generate migration
- `npm run migration:run` — run migrations
- `npm run migration:create -- <name>` — create empty migration
- `npm run migration:revert` — revert migration
- `npm run migration:show` — show migrations status

## API docs

Detailed request/response examples are in:

- `docs/concepts.md`
- `docs/auth.md`
- `docs/create-todo.md`
- `docs/update-todo.md`
- `docs/delete-todo.md`
