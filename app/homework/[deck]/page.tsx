import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { decks, getDeck } from "@/decks";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return decks.filter((d) => d.homework).map((d) => ({ deck: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ deck: string }>;
}): Promise<Metadata> {
  const { deck: slug } = await params;
  const deck = getDeck(slug);
  return deck?.homework ? { title: `${SITE.series} · ${deck.label} homework` } : {};
}

export default async function HomeworkPage({ params }: { params: Promise<{ deck: string }> }) {
  const { deck: slug } = await params;
  const deck = getDeck(slug);
  if (!deck?.homework) notFound();
  const hw = deck.homework;
  return (
    <div className="h-screen overflow-y-auto">
      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          {SITE.series} · {deck.label} homework
        </div>
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-strong">{hw.title}</h1>
        <div className="mb-10 flex flex-wrap gap-3 text-sm">
          <span className="rounded-full border-2 border-accent-2 px-3 py-1 font-semibold text-accent-2">
            Due {hw.due}
          </span>
          <span className="rounded-full border-2 border-line px-3 py-1 text-body">{hw.effort}</span>
          <Link
            href={`/${deck.slug}`}
            className="rounded-full border-2 border-line px-3 py-1 text-body hover:border-accent"
          >
            Slides: {deck.topic}
          </Link>
        </div>
        <div className="homework">{hw.content}</div>
      </main>
    </div>
  );
}
