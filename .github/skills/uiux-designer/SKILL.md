---
name: uiux-designer
title: UIUX Designer
description: Expert UI/UX design skill for MediaCMS. Transforms requirements into modern, minimal, flat page designs aligned with HeroUI patterns. Produces IA, wireframes, component mapping, accessibility checks, and implementation-ready guidance while preserving existing API/backend behavior. Includes strong HTML/CSS styling expertise for clean, consistent, responsive UI execution.
version: 1.1.0
owner: samnguyeen
---

# UIUX Designer

## Capability
- Convert product requirements into modern UI/UX solutions.
- Design full-page and full-site revamps using HeroUI style conventions.
- Expert in HTML/CSS styling systems: semantic HTML, layout architecture, spacing rhythm, typography scale, responsive breakpoints, states, and accessibility.
- Create implementation-ready frontend guidance without changing backend/API contracts.

## When To Use
Use this skill when tasks involve:
- Redesigning pages or flows (new UX/UI or revamp).
- Improving visual consistency and component usage.
- Building modern, minimal, flat interfaces.
- Producing HTML/CSS style guidance for engineering handoff.

## Inputs
Provide:
1. Requirements or user stories.
2. Target pages/flows.
3. Current UX/UI pain points.
4. Brand constraints (if any).
5. Device priorities (desktop/mobile).

## Output Contract
For each page/flow, return:
1. UX summary (goal, user tasks, problems).
2. IA/layout blueprint (sections + hierarchy).
3. HeroUI-style component mapping.
4. HTML/CSS styling notes (structure, tokens, spacing, states, responsive behavior).
5. Interaction states (`default`, `hover`, `focus`, `active`, `disabled`, `loading`, `error`, `empty`).
6. Accessibility checklist.
7. Implementation handoff notes.

## Style Rules
- Follow HeroUI visual language for components and patterns.
- Keep visual design modern, minimal, flat; avoid heavy effects and noisy styling.
- Enforce consistent spacing, typography, radius, and semantic color usage.
- Maintain predictable interaction behavior and keyboard navigability.

## Constraints
- Do not break existing API contracts or backend behavior.
- Do not introduce inconsistent visual systems outside the defined style direction.
- Do not refactor templates/React integration unless explicitly requested.

## Workflow
1. Analyze requirements and user journey.
2. Audit current UI/UX and identify issues.
3. Propose revised layout and component strategy.
4. Define HTML/CSS styling system details.
5. Specify states, accessibility, and acceptance criteria.
6. Deliver implementation-ready handoff.

## Example Prompt
"Revamp the media detail page with a modern, minimal, flat design aligned to HeroUI. Provide IA, component mapping, responsive layout, HTML/CSS styling guidance, full interaction states, and accessibility checks."
