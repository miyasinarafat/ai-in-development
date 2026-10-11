import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Deck from "@/components/Deck";
import { decks, getDeck } from "@/decks";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return decks.map((d) => ({ deck: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ deck: string }>;
}): Promise<Metadata> {
  const { deck: slug } = await params;
  const deck = getDeck(slug);
  return deck ? { title: `${SITE.series} · ${deck.label} · ${deck.topic}` } : {};
}

export default async function DeckPage({ params }: { params: Promise<{ deck: string }> }) {
  const { deck: slug } = await params;
  const deck = getDeck(slug);
  if (!deck) notFound();
  return <Deck deck={deck} />;
}
