# AI in Development

Slides for the weekly **AI in Development** session (Mondays, 3-4 PM): building an AI-native engineering team.

One branch per session. `week-0` holds the kickoff and baseline deck.

## Run

```bash
npm install
npm run build && npm start   # http://localhost:3000
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

The URL hash is the slide number (`/#8` is the readiness scorecard), so a refresh keeps your place.
The deck is a fixed 1920x1080 stage scaled to fit any screen.

## Structure

- `components/slides.tsx`: slide content and speaker notes
- `components/Deck.tsx`: navigation, scaling, notes, overview
- `components/Scorecard.tsx`: interactive readiness scorecard (slide 8)
- `components/ui.tsx`: shared slide building blocks
- `app/globals.css`: Grameenphone-inspired colour tokens for both themes
