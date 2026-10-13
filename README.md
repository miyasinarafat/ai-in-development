# AI in Development

Slides for the weekly **AI in Development** session (Mondays, 3-4 PM): building an AI-native engineering team at Grameenphone.

One deck per week in `decks/<slug>/`, served at `/<slug>`; the index at `/` lists them. One git branch per week.

New week: `npm run new-deck -- week-1 "Topic" "Monday, 19 October 2026"`. See [docs/AUTHORING.md](docs/AUTHORING.md).

## Run

```bash
npm install
npm run build && npm start   # http://localhost:3000  (index), /week-0 (deck)
```

(`npm run dev` also works on machines with enough file-watcher capacity.)

## Presenting

| Key | Action |
|---|---|
| `→` / `Space` / `PageDown` | Next slide |
| `←` / `PageUp` | Previous slide |
| `Home` / `End` | First / last slide |
| `N` | Toggle speaker notes |
| `O` | Slide overview |
| `T` | Switch dark / light theme (remembered) |
| `F` | Fullscreen |

The URL hash is the slide number (`/week-0#8` is the readiness scorecard), so a refresh keeps your place.
The deck is a fixed 1920x1080 stage scaled to fit any screen.

## Structure

- `decks/<slug>/index.tsx`: slides and speaker notes for one week
- `decks/index.ts`: registry of decks
- `components/templates.tsx`: reusable slide layouts
- `components/ui.tsx`: shared building blocks
- `components/Deck.tsx`: player (navigation, scaling, notes, overview, theme)
- `lib/site.ts`: series, organisation, presenter
- `app/globals.css`: Grameenphone-inspired colour tokens for both themes
