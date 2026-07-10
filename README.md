# language_tracker

A full-stack web application for tracking personal language-learning resources and activities. Log books, articles, videos, and podcasts with metadata like time spent, pages read, and media type. Includes a community forum for sharing posts.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Elixir, Phoenix, Ecto, PostgreSQL |
| Frontend | TypeScript, Angular 21, NgRx, SSR |
| Database | PostgreSQL 16 |
| Auth | Guardian (JWT), Bcrypt |
| CI/CD | Jenkins, Docker |

## Getting Started

### Prerequisites

- Docker & Docker Compose
- Elixir 1.17+
- Node.js 22+

### Development Setup

**1. Start the database:**

```bash
docker-compose up -d
```

**2. Backend:**

```bash
cd api
mix setup
mix phx.server
```

API runs on `http://localhost:4000`.

**3. Frontend:**

```bash
cd language_frontend
npm install
ng serve
```

Frontend runs on `http://localhost:4200`.

## API Endpoints

### Public

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/login` | Login, returns JWT |
| POST | `/api/signup` | Register new user |
| GET | `/api/healthcheck` | Health check |

### Authenticated

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/tokenlogin` | Re-authenticate from stored token |
| GET | `/api/posts` | List forum posts |
| POST | `/api/post` | Create a forum post |
| POST | `/api/resource` | Create a tracked resource |
| GET | `/api/resources` | Get paginated user resources |
| DELETE | `/api/resource/:id` | Delete a resource |
| GET | `/api/video/:id` | Fetch YouTube video metadata |

## Features

- **Resource Tracking** -- Log language-learning materials with type (text/video/audio), time spent, and pages read.
- **YouTube Integration** -- Auto-fill video title and duration from YouTube URLs.
- **User Authentication** -- JWT-based auth with automatic re-login from stored tokens.
- **Community Forum** -- Create and browse posts.
- **Server-Side Rendering** -- Angular SSR for better SEO and initial load performance.

## Project Structure

```
language_tracker/
├── api/                  # Elixir/Phoenix REST API
│   ├── lib/api/          # Domain logic, entities, services
│   ├── lib/api_web/      # Controllers, router, pipelines
│   └── priv/repo/migrations/
├── language_frontend/    # Angular 21 SPA
│   └── src/app/
│       ├── components/   # UI components
│       ├── services/     # HTTP services & interceptors
│       └── store/        # NgRx state management
├── docker-compose.yml    # PostgreSQL for development
└── Jenkinsfile           # CI/CD pipeline
```

## Database Schema

| Table | Description |
|-------|-------------|
| `users` | User accounts (username, hashed password) |
| `role` | User roles |
| `user_roles` | Many-to-many user-role association |
| `resource` | Tracked language-learning resources |
| `post` | Community forum posts |

## Production Environment Variables

| Variable | Description |
|----------|-------------|
| `SECRET_KEY_BASE` | Phoenix secret key |
| `LANGUAGES_DB_USER` | PostgreSQL user |
| `LANGUAGES_DB_PASS` | PostgreSQL password |
| `LANGUAGES_DB_HOST` | PostgreSQL host |
| `LANGUAGES_DB_NAME` | PostgreSQL database name |
| `PORT` | API port (default: 4000) |
| `PHX_HOST` | Hostname |
| `POOL_SIZE` | DB connection pool size |

## License

MIT - Copyright 2026 Anton
