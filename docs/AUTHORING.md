# Authoring a weekly deck

One repo, one deck per week. Each deck lives in `decks/<slug>/` and is served at `/<slug>`
(`/week-0`, `/week-1`, ...). The index page `/` lists them.

## Create a new week

```bash
git checkout -b week-1            # one branch per week, branched from the previous week
npm run new-deck -- week-1 "How coding agents work" "Monday, 19 October 2026"
```

This creates `decks/week-1/index.tsx` (title + closing slide) and registers it in `decks/index.ts`.
Then add slides, and check:

```bash
npm run lint && npm run build && npm start   # http://localhost:3000/week-1
```

## Anatomy

```
lib/site.ts            series name, org, default presenter, audience (change once, applies to all)
lib/deck.ts            DeckDef / SlideDef types, defineDeck()
decks/index.ts         registry of all decks
decks/<slug>/index.tsx slides for one week (+ any week-specific components, e.g. Scorecard.tsx)
components/templates.tsx  reusable slide layouts
components/ui.tsx      small building blocks (Eyebrow, Title, Card, Bullets, Pill)
components/Deck.tsx    player: navigation, scaling, notes, overview, theme
app/globals.css        colour tokens for dark and light themes
```

A slide is `{ title, minutes, notes, content }`:

- `title`: short name for the overview grid (key `O`)
- `minutes`: planned time. **Slides in a deck should add up to 60.**
- `notes`: talking points shown with key `N`
- `content`: a template below, or custom JSX

## Templates (`components/templates.tsx`)

| Template | Use for |
|---|---|
| `TitleSlide` | Opening slide. Presenter, org, audience come from `lib/site.ts` |
| `BulletsSlide` | Title + up to 5 bullets, optional right-hand `aside` (cards, stats) |
| `CardGridSlide` | 2x2, or 3 or 4 columns of cards, optional footnote |
| `StepsSlide` | Timed agenda or numbered steps |
| `TableSlide` | Three-column table, last column highlighted |
| `ClosingSlide` | Discussion questions |
| `SlideHeader` | Eyebrow + title (+ badge) for custom slides |

Anything else: write custom JSX with the blocks in `components/ui.tsx`. Interactive pieces
(like the Week 0 scorecard) go in the deck folder as a `"use client"` component.

## Design rules

- Stage is a fixed **1920x1080**, scaled to fit. Size text in px, not rem.
- Use colour **tokens only** (`text-strong`, `text-body`, `text-muted`, `text-accent`,
  `text-accent-2`, `bg-card`, `border-line`, `bg-lime`). Never hard-code hex or `text-white`,
  or the light theme breaks. Tokens are defined in `app/globals.css`.
- One idea per slide. At most 5 bullets, at most about 12 words each.
- Body text is never below 28px; footnotes never below 20px.
- Every slide has speaker notes.
- Check both themes (`T`) and one narrow window before presenting.

## Homework page (optional)

Add a `homework` field to the deck (see `decks/week-1/homework.tsx`): `{ title, due, effort, content }`.
It is served at `/homework/<slug>` and linked from the index page. Write the content with plain
`h2`, `p`, `ul`/`ol` and `pre` elements; the `.homework` styles in `app/globals.css` handle the rest.
Interactive pieces (like the Week 1 worksheet that copies answers for Teams) go in the deck folder.

If styles look missing after a CSS change, run `rm -rf .next` and build again (Turbopack cache).

## Presenting

`→ / Space` next, `←` previous, `N` notes, `O` overview, `T` theme, `F` fullscreen.
The URL hash is the slide number (`/week-1#4`).

## Week-by-week checklist

1. New branch `week-N`, run `npm run new-deck`.
2. Fill slides and notes; total minutes = 60.
3. `npm run lint && npm run build`; open `/week-N`, click through in both themes.
4. Commit on the `week-N` branch.
