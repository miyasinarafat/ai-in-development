import Link from "next/link";
import { decks } from "@/decks";
import { SITE } from "@/lib/site";

export default function Home() {
  const list = [...decks].reverse();
  return (
    <main className="mx-auto flex h-full max-w-3xl flex-col justify-center overflow-auto px-6 py-12">
      <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
        {SITE.org} · {SITE.cadence}
      </div>
      <h1 className="mb-10 text-4xl font-bold tracking-tight text-strong">{SITE.series}</h1>
      <ul className="space-y-3">
        {list.map((d) => (
          <li key={d.slug}>
            <Link
              href={`/${d.slug}`}
              className="block rounded-xl border-2 border-line bg-card px-6 py-4 hover:border-accent"
            >
              <div className="text-xs font-semibold uppercase tracking-widest text-muted">
                {d.label} · {d.date}
              </div>
              <div className="text-xl font-semibold text-strong">{d.topic}</div>
              <div className="text-sm text-muted">{d.slides.length} slides</div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
