import type { ReactNode } from "react";

export type SlideDef = {
  /** Short name, used in the overview grid (key: O). */
  title: string;
  /** Planned minutes for this slide. Keep the deck total at 60. */
  minutes: number;
  /** Speaker notes shown with key N. */
  notes: string[];
  content: ReactNode;
};

export type DeckDef = {
  /** URL slug and folder name, e.g. "week-1". Served at /week-1. */
  slug: string;
  /** Short label, e.g. "Week 1". */
  label: string;
  /** Topic, e.g. "How coding agents work". Used in the footer and the index. */
  topic: string;
  /** Human-readable session date, e.g. "Monday, 19 October 2026". */
  date: string;
  /** Overrides SITE.presenter when someone else presents. */
  presenter?: string;
  slides: SlideDef[];
};

export function defineDeck(deck: DeckDef): DeckDef {
  return deck;
}
