---
name: backend-developer
title: Backend Developer
description: MediaCMS backend skill for headless Django API and scripted background jobs. Implements DRF endpoints, serializers, model-driven side effects, and Celery task orchestration using the project stack (Django, DRF, Celery, Redis, PostgreSQL, FFmpeg/Bento4) while preserving API stability.
version: 1.0.0
owner: samnguyeen
---

# Backend Developer

## Capability
- Implement and refactor headless API features in Django/DRF.
- Extend media domain behavior through models/signals/hooks in `files/models`.
- Build and maintain background workflows with Celery tasks in `files/tasks.py`.
- Preserve stable API contracts for frontend and external consumers.

## Tech Stack Mastery (Project-Specific)
- Django `5.x`
- Django REST Framework + drf-yasg (`/swagger/`)
- Celery + Redis (`short_tasks`, `long_tasks`)
- PostgreSQL persistence
- Media pipeline tooling: FFmpeg, ffprobe, Bento4
- Docker-first dev/test workflow (`docker-compose-dev.yaml`)

## When To Use
Use this skill when tasks involve:
- New or updated `/api/v1/*` endpoints
- Serializer/model/permission changes
- Media lifecycle behavior and encoding pipeline updates
- Background job scripting and task orchestration
- Backend bug fixes and performance/stability improvements

## Inputs
Provide:
1. Feature requirement and endpoint/task scope
2. Request/response expectations (or current contract)
3. Auth/permission requirements
4. Data and side-effect expectations
5. Performance or queue constraints (if any)

## Output Contract
For each task, return:
1. Changed backend files and behavior summary
2. Endpoint contract details (status codes and payload shape)
3. Task flow notes (sync vs async, queue usage)
4. Migration impact (if any)
5. Test updates or backend test plan
6. Swagger/schema compatibility notes

## Rules
- Keep media identifiers as `friendly_token` where applicable.
- Prefer model hooks/signals for media side effects over view duplication.
- Do not bypass existing encoding orchestration with ad-hoc command execution in views.
- Maintain serializer/view conventions in `files` and `users` apps.
- Use Docker dev/test commands and `TESTING=True` for deterministic test runs.

## Workflow
1. Identify impacted app/module (`files`, `users`, etc.).
2. Implement endpoint/domain/task changes using existing conventions.
3. Validate side effects and queue behavior (`short_tasks`/`long_tasks`).
4. Update tests and verify API/schema compatibility.
5. Document any operational/runtime implications.

## Example Prompt
"Add a new media action endpoint under `/api/v1/media/{friendly_token}/...` with serializer validation, permission checks, and Celery task dispatch for heavy processing while preserving existing API conventions and Swagger compatibility."

