"use client";

import { useState } from "react";

type Msg = {
  role: "setup" | "user" | "model" | "tool";
  text: string;
  tokens: number;
};

// One illustrative agent session: fix a failing PHP test. Token sizes are rough but realistic.
const steps: Msg[] = [
  { role: "setup", text: "System prompt + 20 tool definitions + instruction file", tokens: 13500 },
  { role: "user", text: "The test for cart_total() fails. Please fix it.", tokens: 50 },
  { role: "model", text: "→ search(\"cart_total\")", tokens: 80 },
  { role: "tool", text: "3 matches: src/Cart.php, tests/CartTest.php, src/Promo.php", tokens: 400 },
  { role: "model", text: "→ read_file(\"src/Cart.php\")", tokens: 60 },
  { role: "tool", text: "<240 lines of Cart.php>", tokens: 2500 },
  { role: "model", text: "→ run_tests(\"CartTest\")", tokens: 60 },
  { role: "tool", text: "FAIL: expected 90.00, got 81.00 (discount applied twice)", tokens: 1200 },
  { role: "model", text: "→ edit_file(\"src/Cart.php\", remove second discount)", tokens: 300 },
  { role: "tool", text: "Edit applied", tokens: 50 },
  { role: "model", text: "→ run_tests(\"CartTest\")", tokens: 60 },
  { role: "tool", text: "PASS: 12 tests", tokens: 300 },
  { role: "model", text: "Fixed: the promo discount was applied twice in cart_total().", tokens: 200 },
];

const roleStyle: Record<Msg["role"], string> = {
  setup: "border-line text-muted",
  user: "border-accent text-strong",
  model: "border-accent-2 text-strong",
  tool: "border-line text-body",
};
const roleLabel: Record<Msg["role"], string> = {
  setup: "Harness",
  user: "You",
  model: "Model",
  tool: "Tool result",
};

const fmt = (n: number) => n.toLocaleString("en-US");

export default function AgentLoop() {
  const [shown, setShown] = useState(2); // setup + user prompt visible at start
  const visible = steps.slice(0, shown);

  // Each model message is one model call. A call sends everything that came before it.
  let calls = 0;
  let billedInput = 0;
  let context = 0;
  visible.forEach((m) => {
    if (m.role === "model") {
      calls += 1;
      billedInput += context;
    }
    context += m.tokens;
  });
  const done = shown >= steps.length;

  return (
    <div className="flex h-full gap-10">
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex-1 space-y-2 overflow-hidden">
          {visible.slice(-9).map((m, i) => (
            <div
              key={`${shown}-${i}`}
              className={`flex items-center gap-5 rounded-xl border-2 bg-card px-5 py-2 ${roleStyle[m.role]}`}
            >
              <span className="w-[170px] shrink-0 text-[20px] font-semibold uppercase tracking-widest text-muted">
                {roleLabel[m.role]}
              </span>
              <span className="flex-1 truncate font-mono text-[24px]">{m.text}</span>
              <span className="shrink-0 font-mono text-[20px] text-muted">+{fmt(m.tokens)}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 flex gap-4">
          <button
            onClick={() => setShown((s) => Math.max(2, s - 1))}
            className="rounded-lg border-2 border-line px-6 py-2 text-[26px] text-body hover:border-accent"
          >
            ◀ Back
          </button>
          <button
            onClick={() => setShown((s) => Math.min(steps.length, s + 1))}
            disabled={done}
            className="rounded-lg border-2 border-accent bg-accent px-8 py-2 text-[26px] font-semibold text-on-accent disabled:opacity-40"
          >
            Next step ▶
          </button>
          <button
            onClick={() => setShown(2)}
            className="rounded-lg border-2 border-line px-6 py-2 text-[26px] text-body hover:border-accent"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="flex w-[430px] flex-col gap-5">
        {[
          ["Model calls", fmt(calls), "one per decision"],
          ["Context now", `${fmt(context)}`, "tokens sent on the next call"],
          ["Input tokens billed", fmt(billedInput), "every call re-sends the context"],
        ].map(([label, value, hint]) => (
          <div key={label} className="rounded-2xl border-2 border-line bg-card px-6 py-4">
            <div className="text-[22px] uppercase tracking-widest text-muted">{label}</div>
            <div className="font-mono text-[60px] font-bold leading-tight text-accent">{value}</div>
            <div className="text-[22px] text-body">{hint}</div>
          </div>
        ))}
        {done && (
          <div className="rounded-2xl border-2 border-accent-2 bg-card px-6 py-4 text-[24px] text-body-hi">
            6 calls and ~19k tokens of context, but about{" "}
            <b className="text-accent-2">{fmt(billedInput)}</b> input tokens billed.
          </div>
        )}
      </div>
    </div>
  );
}
