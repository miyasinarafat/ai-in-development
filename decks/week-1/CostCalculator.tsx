"use client";

import { useState } from "react";

// GitHub Copilot usage-based billing, per 1M tokens (docs.github.com, "Models and pricing", Oct 2026).
// 1 AI credit = $0.01. Cache-write charges are ignored to keep the estimate simple.
const models = [
  { name: "GPT-5 mini", input: 0.25, cached: 0.025, output: 2 },
  { name: "Claude Haiku 4.5", input: 1, cached: 0.1, output: 5 },
  { name: "GPT-5.4", input: 2.5, cached: 0.25, output: 15 },
  { name: "Claude Sonnet 4.6", input: 3, cached: 0.3, output: 15 },
];

const MONTHLY_CREDITS = 3900; // Copilot Enterprise, per user per month (pooled)
const CACHE_HIT = 0.8; // share of each call's input served from cache
const OUTPUT_PER_STEP = 1000;

const fmt = (n: number, d = 0) =>
  n.toLocaleString("en-US", { maximumFractionDigits: d, minimumFractionDigits: d });

export default function CostCalculator() {
  const [m, setM] = useState(3);
  const [steps, setSteps] = useState(20);
  const [ctx, setCtx] = useState(40000);
  const model = models[m];

  const perStepUsd =
    (ctx * ((1 - CACHE_HIT) * model.input + CACHE_HIT * model.cached) +
      OUTPUT_PER_STEP * model.output) /
    1_000_000;
  const credits = perStepUsd * steps * 100;
  const sessions = credits > 0 ? MONTHLY_CREDITS / credits : 0;

  return (
    <div className="flex h-full flex-col gap-5 rounded-2xl border-2 border-accent bg-card p-7">
      <div>
        <div className="mb-2 text-[22px] uppercase tracking-widest text-muted">Model</div>
        <div className="grid grid-cols-2 gap-2">
          {models.map((x, i) => (
            <button
              key={x.name}
              onClick={() => setM(i)}
              className={`rounded-lg border-2 px-3 py-2 text-[22px] font-semibold ${
                i === m ? "border-accent bg-accent text-on-accent" : "border-line text-body hover:border-accent"
              }`}
            >
              {x.name}
            </button>
          ))}
        </div>
      </div>

      <label className="block">
        <div className="flex justify-between text-[22px] text-muted">
          <span className="uppercase tracking-widest">Model calls (steps)</span>
          <span className="font-mono text-strong">{steps}</span>
        </div>
        <input
          type="range"
          min={5}
          max={60}
          step={1}
          value={steps}
          onChange={(e) => setSteps(+e.target.value)}
          className="h-12 w-full cursor-pointer accent-[var(--accent)]"
        />
      </label>

      <label className="block">
        <div className="flex justify-between text-[22px] text-muted">
          <span className="uppercase tracking-widest">Average context per call</span>
          <span className="font-mono text-strong">{fmt(ctx / 1000)}k tokens</span>
        </div>
        <input
          type="range"
          min={10000}
          max={200000}
          step={5000}
          value={ctx}
          onChange={(e) => setCtx(+e.target.value)}
          className="h-12 w-full cursor-pointer accent-[var(--accent)]"
        />
      </label>

      <div className="mt-auto grid grid-cols-2 gap-4">
        <div>
          <div className="text-[20px] uppercase tracking-widest text-muted">Credits / session</div>
          <div className="font-mono text-[64px] font-bold leading-none text-accent">
            {fmt(credits, credits < 10 ? 1 : 0)}
          </div>
        </div>
        <div>
          <div className="text-[20px] uppercase tracking-widest text-muted">Sessions in 3,900</div>
          <div className="font-mono text-[64px] font-bold leading-none text-accent-2">
            {fmt(sessions)}
          </div>
        </div>
      </div>
      <div className="text-[18px] text-muted">
        Estimate: 80% of input cached, 1k output tokens per call, cache writes ignored. GitHub
        Copilot prices, Oct 2026.
      </div>
    </div>
  );
}
