"use client";

import { useEffect, useState } from "react";

type Field = {
  key: string;
  label: string;
  kind: "text" | "number" | "area" | "choice";
  options?: string[];
  hint?: string;
  optional?: boolean;
};

const fields: Field[] = [
  { key: "name", label: "Your name", kind: "text" },
  { key: "partner", label: "Partner", kind: "text", optional: true },
  { key: "repo", label: "Repo", kind: "text", hint: "Webnext (GP Web), FlexiPlan (Web), or other" },
  { key: "ticket", label: "Ticket", kind: "text", hint: "ID or one line" },
  { key: "prompt", label: "Prompt you used", kind: "area", hint: "Paste it exactly" },
  { key: "model", label: "Model", kind: "text", hint: "As shown in the Copilot model picker" },
  { key: "steps", label: "Agent steps", kind: "number", hint: "Each read, search, edit or terminal action in the chat" },
  { key: "filesRead", label: "Files read", kind: "number" },
  { key: "filesNeeded", label: "Files it actually needed", kind: "number" },
  { key: "commands", label: "Commands run", kind: "number" },
  { key: "tests", label: "Did it run tests?", kind: "choice", options: ["Yes", "No", "No tests exist"] },
  { key: "unaided", label: "Finished without help?", kind: "choice", options: ["Yes", "No"] },
  { key: "merge", label: "Would you merge it?", kind: "choice", options: ["Yes", "With changes", "No"] },
  { key: "credits", label: "AI credits used", kind: "text", optional: true, hint: "Only if you can see your usage" },
  { key: "wasted", label: "Where did it waste steps?", kind: "area" },
  { key: "better", label: "What would you change in your prompt?", kind: "area" },
  { key: "stretch", label: "Stretch: cheaper model, steps, quality", kind: "area", optional: true },
];

const STORE = "worksheet-week-1";

export default function Worksheet() {
  const [v, setV] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  // Restore an unsent draft (per browser only).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORE);
      if (saved) setV(JSON.parse(saved)); // eslint-disable-line react-hooks/set-state-in-effect
    } catch {}
  }, []);

  const set = (k: string, val: string) => {
    const next = { ...v, [k]: val };
    setV(next);
    setCopied(false);
    try {
      localStorage.setItem(STORE, JSON.stringify(next));
    } catch {}
  };

  const missing = fields.filter((f) => !f.optional && !(v[f.key] || "").trim()).length;

  const asText = () =>
    [
      "Week 1 homework: trace one agent session",
      ...fields
        .filter((f) => (v[f.key] || "").trim())
        .map((f) => {
          const label = f.label.endsWith("?") ? f.label : `${f.label}:`;
          return f.kind === "area" ? `${label}\n${v[f.key].trim()}` : `${label} ${v[f.key].trim()}`;
        }),
    ].join("\n");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(asText());
      setCopied(true);
    } catch {
      setCopied(false);
      alert("Copy failed. Select the preview text below and copy it manually.");
    }
  };

  const input =
    "w-full rounded-lg border-2 border-line bg-card px-3 py-2 text-base text-strong outline-none focus:border-accent";

  return (
    <div className="rounded-2xl border-2 border-accent bg-card/50 p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <label key={f.key} className={f.kind === "area" ? "sm:col-span-2" : ""}>
            <div className="mb-1 text-sm font-semibold text-strong">
              {f.label}
              {f.optional && <span className="font-normal text-muted"> (optional)</span>}
            </div>
            {f.kind === "area" ? (
              <textarea
                rows={3}
                className={input}
                value={v[f.key] || ""}
                onChange={(e) => set(f.key, e.target.value)}
              />
            ) : f.kind === "choice" ? (
              <div className="flex flex-wrap gap-2">
                {f.options!.map((o) => (
                  <button
                    type="button"
                    key={o}
                    onClick={() => set(f.key, o)}
                    className={`rounded-lg border-2 px-3 py-1.5 text-sm font-semibold ${
                      v[f.key] === o
                        ? "border-accent bg-accent text-on-accent"
                        : "border-line text-body hover:border-accent"
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            ) : (
              <input
                type={f.kind === "number" ? "number" : "text"}
                min={0}
                className={input}
                value={v[f.key] || ""}
                onChange={(e) => set(f.key, e.target.value)}
              />
            )}
            {f.hint && <div className="mt-1 text-xs text-muted">{f.hint}</div>}
          </label>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={copy}
          className="rounded-lg border-2 border-accent bg-accent px-5 py-2 font-semibold text-on-accent"
        >
          {copied ? "Copied. Paste it in Teams" : "Copy my answers"}
        </button>
        <span className="text-sm text-muted">
          {missing ? `${missing} required field${missing > 1 ? "s" : ""} still empty` : "All required fields filled"}
        </span>
      </div>

      <details className="mt-4">
        <summary className="cursor-pointer text-sm text-muted">Preview what will be copied</summary>
        <pre>{asText()}</pre>
      </details>
    </div>
  );
}
