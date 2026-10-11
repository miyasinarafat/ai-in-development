<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project: AI in Development weekly decks

This repo holds one slide deck per weekly session (Mondays 3-4 PM, Grameenphone dev + QA).
When asked to build a new week's presentation:

1. Read `docs/AUTHORING.md` first and follow it. Do not invent a new layout or colours.
2. Branch `week-N`, then `npm run new-deck -- week-N "<Topic>" "<Date>"`.
3. Reuse `components/templates.tsx` and `components/ui.tsx`; use colour tokens only.
4. Every slide needs speaker notes; minutes must total 60.
5. Run `npm run lint && npm run build`, and check the deck in both themes before committing.
6. Ask the user for anything unknown (content, names, numbers); leave visible blanks, don't invent data.
