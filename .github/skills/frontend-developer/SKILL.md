---
name: frontend-developer
title: Frontend Developer
description: MediaCMS frontend skill for React template-embedded bundles. Builds and refactors UI using the existing frontend stack (React 17, TypeScript, mediacms-scripts, Jest), keeps compatibility with Django templates/static bundles, and delivers implementation-ready changes with responsive and accessible behavior.
version: 1.0.0
owner: samnguyeen
---

# Frontend Developer

## Capability
- Implement and refactor frontend features in `frontend/` with React + TypeScript.
- Maintain compatibility with Django template entrypoints and static bundle loading.
- Build reusable UI patterns aligned with existing MediaCMS design direction.
- Add/adjust unit tests using Jest in `frontend/tests`.

## Tech Stack Mastery (Project-Specific)
- React `17.x`
- TypeScript `5.x`
- Build tooling via `mediacms-scripts` (`frontend/package.json`)
- Jest test setup (`frontend/jest.config.js`)
- Template integration through Django-rendered pages in `templates/`

## When To Use
Use this skill when tasks involve:
- New frontend pages/components or page revamps
- Updating existing React logic and state management
- Integrating UI behavior with existing `/api/v1/*` endpoints
- Fixing frontend bugs, regressions, and UX inconsistencies

## Inputs
Provide:
1. Requirement/user story and target page(s)
2. Expected behavior and acceptance criteria
3. API endpoint(s) used by the feature
4. Device priorities (desktop/mobile)
5. Any design constraints (HeroUI-aligned, minimal/flat)

## Output Contract
For each task, return:
1. Changed files with implementation details
2. Component/page behavior summary
3. API integration notes (request/response expectations)
4. State coverage (`loading`, `empty`, `error`, `success`)
5. Test updates or test plan
6. Build/deploy-to-static notes for Django integration

## Rules
- Preserve existing template-to-bundle contracts (example: template script entries).
- Keep frontend work API-consumer focused; do not alter backend contracts silently.
- Avoid introducing new frontend frameworks without explicit request.
- Keep styling and component behavior consistent across pages.
- Ensure keyboard navigation and visible focus states for interactive elements.

## Workflow
1. Inspect existing page/component and related template entrypoints.
2. Implement changes in `frontend/src` using existing patterns.
3. Validate API usage against current backend responses.
4. Add/update Jest tests where meaningful.
5. Build and verify bundle compatibility with Django static flow.

## Example Prompt
"Implement a revamp of the media listing page in `frontend/src` with modern minimal UI, preserving current API usage and template integration, including loading/empty/error states and Jest coverage updates."

