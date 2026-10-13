import type { ReactNode } from "react";
import { SITE } from "@/lib/site";
import { Bullets, Card, Eyebrow, Pill, Title } from "./ui";

/**
 * Reusable slide layouts. Each returns the *content* of one slide; wrap it in a
 * SlideDef ({ title, minutes, notes, content }) inside decks/<slug>/index.tsx.
 * Stage is 1920x1080 with 120px side padding, so content has ~1680x900.
 */

function Header({
  eyebrow,
  title,
  badge,
}: {
  eyebrow: string;
  title: ReactNode;
  badge?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-8">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <Title>{title}</Title>
      </div>
      {badge && <Pill>{badge}</Pill>}
    </div>
  );
}

/** Opening slide. `title` may contain <span className="text-accent"> for emphasis. */
export function TitleSlide({
  eyebrow,
  title,
  subtitle,
  date,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  date: string;
}) {
  return (
    <div className="flex h-full flex-col justify-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mb-8 text-[132px] font-bold leading-[1.0] tracking-tight text-strong">
        {title}
      </h1>
      <p className="mb-12 max-w-[1300px] text-[44px] leading-snug text-body">{subtitle}</p>
      <div className="mb-8 h-[10px] w-[220px] rounded-full bg-lime" />
      <div className="mb-3 text-[40px] font-semibold text-strong">
        Presented by {SITE.presenter}
      </div>
      <div className="flex items-center gap-6 text-[32px] text-muted">
        <span>{SITE.org}</span>
        <span>·</span>
        <span>{date}</span>
        <span>·</span>
        <span>{SITE.audience}</span>
      </div>
    </div>
  );
}

/** Title + up to ~5 bullets, with an optional card or stat column on the right. */
export function BulletsSlide({
  eyebrow,
  title,
  items,
  aside,
  badge,
}: {
  eyebrow: string;
  title: ReactNode;
  items: ReactNode[];
  /** Right column, ~520px wide. Use <Card> blocks. */
  aside?: ReactNode;
  badge?: string;
}) {
  return (
    <div className="flex h-full gap-14">
      <div className="flex-1">
        <Header eyebrow={eyebrow} title={title} badge={aside ? undefined : badge} />
        <Bullets items={items} />
      </div>
      {aside && <div className="flex w-[520px] flex-col justify-center gap-6">{aside}</div>}
    </div>
  );
}

/** A row of cards (columns 2-4). Use `columns: 2` with 4 cards for a 2x2 grid. */
export function CardGridSlide({
  eyebrow,
  title,
  cards,
  columns = 2,
  footnote,
}: {
  eyebrow: string;
  title: ReactNode;
  cards: { title: string; body: ReactNode; accent?: boolean }[];
  columns?: 2 | 3 | 4;
  footnote?: string;
}) {
  const cols = { 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4" }[columns];
  return (
    <div className="flex h-full flex-col">
      <Header eyebrow={eyebrow} title={title} />
      <div className={`grid flex-1 gap-8 ${cols}`}>
        {cards.map((c) => (
          <Card key={c.title} title={c.title} accent={c.accent}>
            {c.body}
          </Card>
        ))}
      </div>
      {footnote && <p className="pt-8 text-[34px] text-body">{footnote}</p>}
    </div>
  );
}

/** Stacked rows with a big left label: agendas, timelines, numbered steps. */
export function StepsSlide({
  eyebrow,
  title,
  steps,
  footnote,
}: {
  eyebrow: string;
  title: ReactNode;
  /** `label` is the big left value, e.g. "10" with `unit` "min". */
  steps: { label: string; unit?: string; title: string; desc: string }[];
  footnote?: string;
}) {
  return (
    <div className="flex h-full flex-col">
      <Header eyebrow={eyebrow} title={title} />
      <div className="flex flex-1 flex-col justify-center gap-5">
        {steps.map((s) => (
          <div
            key={s.title}
            className="flex items-center gap-8 rounded-2xl border-2 border-line bg-card px-8 py-5"
          >
            <div className="w-[150px] text-[64px] font-bold text-accent">
              {s.label}
              {s.unit && <span className="text-[30px] text-muted"> {s.unit}</span>}
            </div>
            <div>
              <div className="text-[38px] font-semibold text-strong">{s.title}</div>
              <div className="text-[28px] text-body">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
      {footnote && <p className="pt-6 text-[32px] text-body">{footnote}</p>}
    </div>
  );
}

/** Three-column table. Last column is highlighted (good for "to collect" / status). */
export function TableSlide({
  eyebrow,
  title,
  headers,
  rows,
}: {
  eyebrow: string;
  title: ReactNode;
  headers: [string, string, string];
  rows: [string, string, string][];
}) {
  const grid = "grid grid-cols-[1.2fr_1.6fr_0.8fr]";
  return (
    <div className="flex h-full flex-col">
      <Header eyebrow={eyebrow} title={title} />
      <div className="overflow-hidden rounded-2xl border-2 border-line text-[30px]">
        <div
          className={`${grid} bg-card px-8 py-4 text-[24px] font-semibold uppercase tracking-widest text-muted`}
        >
          {headers.map((h) => (
            <div key={h}>{h}</div>
          ))}
        </div>
        {rows.map(([a, b, c]) => (
          <div key={a} className={`${grid} border-t-2 border-line px-8 py-[18px]`}>
            <div className="font-semibold text-strong">{a}</div>
            <div className="text-body">{b}</div>
            <div className="text-accent-2">{c}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Final discussion / questions slide. */
export function ClosingSlide({
  eyebrow = "Discussion",
  title = "Your turn.",
  items,
}: {
  eyebrow?: string;
  title?: string;
  items: ReactNode[];
}) {
  return (
    <div className="flex h-full flex-col justify-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mb-12 text-[96px] font-bold leading-tight text-strong">{title}</h1>
      <Bullets items={items} />
    </div>
  );
}

export { Header as SlideHeader };
