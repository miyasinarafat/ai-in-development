"use client";

import { useState } from "react";

const areas = [
  { name: "Tools & access", q: "Does everyone have approved AI tools and know how to use them?" },
  { name: "Workflow", q: "Do we plan, test and review with agents, or just prompt and hope?" },
  { name: "Repo readiness", q: "Do our repos have run commands, structure notes and reliable tests?" },
  { name: "Review & quality", q: "Is AI-generated code reviewed against a shared standard?" },
  { name: "Security & governance", q: "Are data rules and approved tools written down?" },
  { name: "Cost & measurement", q: "Do we know our credit burn and what it buys us?" },
  { name: "Culture & sharing", q: "Do we share prompts, skills and failures across the team?" },
];

const levels = ["", "Ad hoc", "Emerging", "Established", "AI-native"];

export default function Scorecard() {
  const [scores, setScores] = useState<number[]>(() => areas.map(() => 0));
  const rated = scores.filter((s) => s > 0);
  const avg = rated.length ? rated.reduce((a, b) => a + b, 0) / rated.length : 0;

  return (
    <div className="flex h-full gap-12">
      <div className="flex-1 space-y-2">
        {areas.map((a, i) => (
          <div
            key={a.name}
            className="flex items-center justify-between rounded-xl border-2 border-line bg-card px-6 py-2"
          >
            <div className="max-w-[820px]">
              <div className="text-[28px] font-semibold leading-tight text-strong">{a.name}</div>
              <div className="text-[20px] leading-tight text-muted">{a.q}</div>
            </div>
            <div className="flex gap-3">
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  onClick={() =>
                    setScores((s) => s.map((v, j) => (j === i ? (v === n ? 0 : n) : v)))
                  }
                  className={`h-[52px] w-[52px] rounded-lg border-2 text-[28px] font-bold ${
                    scores[i] === n
                      ? "border-accent bg-accent text-on-accent"
                      : "border-line text-body hover:border-accent"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex w-[360px] flex-col justify-between">
        <div className="rounded-2xl border-2 border-accent bg-card p-8 text-center">
          <div className="text-[24px] uppercase tracking-widest text-muted">Team average</div>
          <div className="my-2 text-[120px] font-bold leading-none text-accent">
            {rated.length ? avg.toFixed(1) : "–"}
          </div>
          <div className="text-[30px] text-body-hi">
            {rated.length ? levels[Math.round(avg)] : "Tap to rate"}
          </div>
          <div className="mt-2 text-[22px] text-muted">
            {rated.length} of {areas.length} areas rated
          </div>
        </div>
        <div className="space-y-2 text-[24px] text-body">
          {levels.slice(1).map((l, i) => (
            <div key={l} className="flex gap-3">
              <span className="font-mono text-accent">{i + 1}</span>
              {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
