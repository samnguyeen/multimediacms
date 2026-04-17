# 🤖 AGENTS.md — AI Agent Master Instruction File

> **Version:** 1.1.0
> **Project:** `multimediacms` (MediaCMS)
> **Architecture:** Headless Django API + scripted background jobs (Celery) + Redis + PostgreSQL
> **Last Updated:** 2026-04-14
> **Maintainer:** MediaCMS contributors

---

## ⚠️ 1. Mandatory Reading Contract

Before generating, modifying, or reviewing code in this repository:

1. Read this file end to end before implementation
2. Prefer repository-documented workflows (`README.md`, `docs/dev_exp.md`, `docs/developers_docs.md`)
3. Keep changes inside this repository only
4. If a request conflicts with documented project behavior, call it out before changing code
5. Do not bypass Docker-first development and test flows unless explicitly requested
6. Never commit code changes automatically; only commit when the user explicitly requests it after review

## 🤖 2. Role & Persona

You are a senior full-stack engineer working on MediaCMS.

### What This Application Is

- MediaCMS is an open-source media CMS for video/audio/image/pdf hosting and sharing
- The system is headless-first: API contracts and background job scripting are the primary integration surfaces
- Django provides REST APIs (`/api/v1/*`), admin, and templates; React bundles are consumers of those APIs
- Async processing is handled by Celery workers with Redis as broker

### What This App Owns

- Media upload and lifecycle management
- Encoding/transcoding orchestration (FFmpeg/Bento4)
- User/channel/playlists/comments domain behavior
- Scripted background processing for media and maintenance workflows
- API endpoints under `/api/v1/*`

### Behavior Rules

- Keep API behavior and serializer contracts stable for headless consumers
- Preserve `friendly_token` route/API patterns where media identifiers are used
- Keep media side effects in existing model signals/hooks instead of duplicating logic in views
- Use documented Docker and test commands for reproducible behavior

## 🏗️ 3. Project Overview

### Identity

| Field | Value |
| --- | --- |
| **App Name** | `MediaCMS` |
| **Folder Name** | `multimediacms` |
| **Type** | Headless Django media platform with optional template-rendered UI |
| **Primary Backend Apps** | `files`, `users`, `actions`, `rbac`, `identity_providers`, `uploader` |
| **API Docs** | `/swagger/` |
| **Dev Mode** | `docker compose -f docker-compose-dev.yaml up` |

### Runtime Map

```text
API clients (React templates, external clients, scripts)
  -> Django API/Admin (:80)
      -> urls in cms/urls.py
          -> files.urls / users.urls

Background path:
  API/model hooks/script entry points
    -> Celery queues (short_tasks / long_tasks)
    -> FFmpeg/Bento4 worker execution
    -> media artifacts persisted to filesystem

State services:
  Redis: broker/cache
  PostgreSQL: persistence
```

### Core Capabilities

- Headless media and user APIs for video/audio/image/pdf operations
- Scripted upload, encoding profiles, adaptive streaming (HLS), subtitles workflow
- Channels/playlists/comments/actions domain behavior
- RBAC and optional SAML identity-provider integration
- Background job orchestration for transcoding and media post-processing

## 🛠️ 4. Tech Stack

### Core Runtime & Language

| Tool | Notes |
| --- | --- |
| Python | Django backend |
| JavaScript/TypeScript | React frontend in `frontend/` |
| Docker Compose | Preferred local development path |

### Framework & Infrastructure

| Layer | Technology |
| --- | --- |
| Web framework | Django |
| API | Django REST Framework + drf-yasg |
| Queue/async | Celery |
| Broker/cache | Redis |
| Database | PostgreSQL |
| Media tools | FFmpeg, ffprobe, Bento4 |

### Frontend

| Layer | Technology |
| --- | --- |
| UI | React |
| Build/dev | `mediacms-scripts` in `frontend/package.json` |
| Test | Jest (`frontend/tests`) |

## 📂 5. Project Structure

```text
multimediacms/
├── cms/                      # Django settings, root urls, celery wiring
├── files/                    # Media domain, APIs, tasks, models
├── users/                    # User/channel APIs and views
├── templates/                # Django templates loading React bundles
├── frontend/                 # React source and build config
├── docs/                     # Admin/dev/transcoding documentation
├── deploy/docker/            # Container entrypoint/start/prestart scripts
├── docker-compose-dev.yaml   # Main Docker development stack
└── AGENTS.md                 # AI coding agent instruction file
```

## 🧱 6. Module Architecture Pattern

### Request to Domain Flow

```text
Headless consumer or script
  -> cms/urls.py
      -> files/urls.py or users/urls.py
          -> DRF views/views
              -> serializers/models/helpers
                  -> Celery tasks for async/background processing
```

### Media Processing Flow

```text
Upload media via API/admin/script
  -> Media model init + signals
  -> Media.encode()
  -> files/tasks.py (chunkize_media, encode_media, create_hls)
  -> Encoding records update status/progress
  -> stream/download artifacts served by Django/static setup
```

## 📐 7. Coding Conventions & Rules

- Preserve `friendly_token` in route patterns for media resources
- Prefer extending behavior in `files/models/media.py` hooks/signals for media side effects
- Do not bypass encoding orchestration by invoking ad-hoc FFmpeg commands in views
- Keep backend changes compatible with Swagger schema generation
- Treat templates/React as API consumers; prioritize stable headless API behavior

## 🌐 8. API & Response Standards

- API documentation entrypoint: `/swagger/`
- Primary routes are under `/api/v1/*` in `files/urls.py` and `users/urls.py`
- Media detail endpoints use `friendly_token` rather than numeric IDs
- For new endpoints, follow existing serializer/view conventions and URL regex style

## ⚙️ 9. Background Job Scripting & Transcoding Specification

- Celery queues separate short and long tasks (`short_tasks`, `long_tasks`)
- Large videos can be chunked, encoded per profile, then reassembled
- Successful non-chunk encodings trigger HLS creation tasks
- Use existing task entry points in `files/tasks.py` for scripted/background execution
- Workers assume shared filesystem visibility for media artifacts

## 🐳 10. Docker Development Workflow

- Start stack:
  - `docker compose -f docker-compose-dev.yaml build`
  - `docker compose -f docker-compose-dev.yaml up`
- App endpoints:
  - Django: `http://localhost`
  - React dev server: `http://localhost:8088`
- Frontend release-to-Django flow:
  - `docker compose -f docker-compose-dev.yaml exec frontend npm run dist`
  - `cp -r frontend/dist/static/* static/`
  - `docker compose -f docker-compose-dev.yaml restart web`

### 🖥️ Frontend Dev Server (`:8088`) vs Django Static Build (`:80`)

Understanding which port to use and why is critical for efficient development.

#### Frontend Dev Server — `http://localhost:8088`

- Served by `npm run start` inside the `frontend` container via `mediacms-scripts` (webpack-dev-server)
- Reads live from `frontend/src/` — **no build step required**
- Supports **hot module replacement (HMR)**: file saves appear in the browser within seconds automatically
- JS/CSS are served directly by the webpack dev server, **not** through Django
- Only calls Django's `/api/v1/*` endpoints for data
- Django-specific features (session auth, CSRF, form POSTs, admin) still require port `:80`
- **Use during development** to preview React UI changes instantly

```text
Browser :8088
  → webpack-dev-server (frontend container)
      → reads live from frontend/src/
      → fetches data from Django :80 /api/v1/*
```

#### Django-Served Static Build — `http://localhost:80`

- Served by `python manage.py runserver` in dev (uWSGI + nginx in production)
- Serves **compiled bundles** from `static/` — output of `npm run dist` copied via `cp -r frontend/dist/static/* static/`
- **No hot reload** — source changes require a full rebuild + copy + Django restart
- Renders full Django templates (auth, CSRF, session, admin, permissions all work correctly)
- This is the **final truth** before committing — identical to what users see in production

```text
Browser :80
  → Django runserver
      → renders templates/cms/index.html
          → loads static/js/home.js (compiled bundle)
              → calls /api/v1/* for data
```

#### Side-by-side Comparison

| | Dev Server `:8088` | Django Static `:80` |
|---|---|---|
| **Source** | Live `frontend/src/` | Compiled `static/` bundles |
| **Hot reload** | ✅ Instant (HMR) | ❌ Manual rebuild required |
| **Auth / CSRF / session** | ❌ Limited | ✅ Full Django behaviour |
| **Django templates** | ❌ Not rendered | ✅ Full template rendering |
| **Always reflects latest code** | ✅ Yes | ❌ Only after `npm run dist` + copy |
| **Used for** | Fast UI iteration | Final verification + production |

#### Recommended Development Workflow

```text
Edit frontend/src/
      ↓
Check on :8088          ← fast, instant hot reload
      ↓
Happy with result?
      ↓
npm run dist            ← compile to static/
cp -r frontend/dist/static/* static/
docker compose -f docker-compose-dev.yaml restart web
      ↓
Verify on :80           ← final confirmation before commit
```

> **Rule:** Always do a final check on `:80` before committing frontend changes.
> The dev server at `:8088` is your fast feedback loop; `:80` is your final truth.

---

## 🚀 11. Production Build Workflow

The production build is a **separate process** that runs after development is complete and all changes have been verified on the dev stack.

### When to Trigger

- All feature/bug-fix development is finished and verified at `http://localhost:80` on the dev stack
- All tests pass (see Section 12 — Testing & Quality Standards)
- Code has been reviewed and merged to the production branch

### Build Steps

```bash
# 1. Compile the React frontend into optimised static bundles
docker compose -f docker-compose-dev.yaml exec frontend npm run dist

# 2. Copy compiled assets into the Django static directory
cp -r frontend/dist/static/* static/

# 3. Collect static files for production serving
docker compose -f docker-compose-dev.yaml exec web python manage.py collectstatic --noinput

# 4. Build the production Docker image
docker compose -f docker-compose.yaml build

# 5. Start the production stack
docker compose -f docker-compose.yaml up -d
```

### Production vs Development Stack

| | Development (`docker-compose-dev.yaml`) | Production (`docker-compose.yaml`) |
|---|---|---|
| **Web server** | Django `runserver` | uWSGI + nginx |
| **Static files** | Served by Django dev server | Served directly by nginx |
| **Frontend** | webpack-dev-server HMR at `:8088` | Pre-compiled bundles only |
| **Debug mode** | `DEBUG=True` | `DEBUG=False` |
| **Purpose** | Local iteration | Live deployment |

### Production Checklist

- [ ] All tests pass on the dev stack
- [ ] Frontend verified at `http://localhost:80` (static build)
- [ ] `npm run dist` compiled without errors
- [ ] `collectstatic` ran successfully
- [ ] Environment variables / secrets set for production (`.env` or secrets manager)
- [ ] Database migrations applied (`python manage.py migrate`)
- [ ] Production image built and smoke-tested before full rollout

> **Do not** use `docker-compose-dev.yaml` for production deployments.
> The production compose file (`docker-compose.yaml`) uses hardened settings, nginx, and uWSGI.

---

## ✅ 12. Testing & Quality Standards

- Backend tests run with eager Celery via `TESTING=True`
- Canonical backend test command:
  - `docker compose -f docker-compose-dev.yaml exec --env TESTING=True -T web pytest`
- Frontend tests:
  - `cd frontend && npm run test`
  - `cd frontend && npm run test-coverage`
- Formatting/linting uses repo hooks: `black`, `isort`, `flake8` (`.pre-commit-config.yaml`)
