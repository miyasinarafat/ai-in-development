import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 text-[26px] font-semibold uppercase tracking-[0.2em] text-accent">
      {children}
    </div>
  );
}

export function Title({ children }: { children: ReactNode }) {
  return (
    <h1 className="mb-10 text-[72px] font-bold leading-[1.05] tracking-tight text-white">
      {children}
    </h1>
  );
}

export function Card({
  title,
  children,
  accent = false,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border-2 bg-card p-8 ${
        accent ? "border-accent" : "border-line"
      } ${className}`}
    >
      {title && <div className="mb-3 text-[34px] font-semibold text-white">{title}</div>}
      <div className="text-[30px] leading-snug text-slate-300">{children}</div>
    </div>
  );
}

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-4 text-[38px] leading-snug text-slate-200">
      {items.map((it, i) => (
        <li key={i} className="flex gap-5">
          <span className="mt-[18px] h-3 w-3 shrink-0 rounded-full bg-accent" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border-2 border-accent-2 px-4 py-1 text-[24px] font-semibold text-accent-2">
      {children}
    </span>
  );
}
