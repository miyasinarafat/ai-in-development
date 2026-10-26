import type { DeckDef } from "@/lib/deck";
import week0 from "./week-0";
import week1 from "./week-1";
import week2 from "./week-2";
// <decks:imports> (scripts/new-deck.mjs inserts new imports above this line)

/** Oldest first. The index page (/) shows them newest first. */
export const decks: DeckDef[] = [
  week0,
  week1,
  week2,
  // <decks:list> (scripts/new-deck.mjs inserts new entries above this line)
];

export function getDeck(slug: string): DeckDef | undefined {
  return decks.find((d) => d.slug === slug);
}
