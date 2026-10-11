import type { DeckDef } from "@/lib/deck";
import week0 from "./week-0";
// <decks:imports> (scripts/new-deck.mjs inserts new imports above this line)

/** Oldest first. The index page (/) shows them newest first. */
export const decks: DeckDef[] = [
  week0,
  // <decks:list> (scripts/new-deck.mjs inserts new entries above this line)
];

export function getDeck(slug: string): DeckDef | undefined {
  return decks.find((d) => d.slug === slug);
}
