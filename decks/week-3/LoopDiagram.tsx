const STEPS = [
  { n: "1", title: "Research", desc: "Read the code, edit nothing", model: "Strong", out: "research.md" },
  { n: "2", title: "Plan", desc: "Two options, pick one, write steps", model: "Strong", out: "plan.md" },
  { n: "3", title: "Implement", desc: "One plan step per fresh chat", model: "Light", out: "small diffs" },
  { n: "4", title: "Test", desc: "Plan checks + QA cases from the AC", model: "Light", out: "pass / gaps" },
];

/** Week 3: the four chats of the loop and the file each one hands to the next. */
export default function LoopDiagram() {
  return (
    <div className="flex flex-1 items-stretch gap-4 py-2">
      {STEPS.map((s, i) => (
        <div key={s.title} className="flex flex-1 items-stretch gap-4">
          <div className="flex flex-1 flex-col rounded-2xl border-2 border-line bg-card p-7">
            <div className="mb-4 flex items-center gap-4">
              <span className="flex h-[60px] w-[60px] items-center justify-center rounded-full border-2 border-accent text-[32px] font-bold text-accent">
                {s.n}
              </span>
              <span className="text-[40px] font-semibold text-strong">{s.title}</span>
            </div>
            <div className="mb-6 flex-1 text-[30px] leading-snug text-body">{s.desc}</div>
            <div className="mb-3 text-[24px] uppercase tracking-widest text-muted">
              Model · <span className="text-strong">{s.model}</span>
            </div>
            <div className="rounded-xl border-2 border-accent-2 px-4 py-2 text-center font-mono text-[28px] text-accent-2">
              {s.out}
            </div>
          </div>
          {i < STEPS.length - 1 && <div className="self-center text-[56px] text-accent">→</div>}
        </div>
      ))}
    </div>
  );
}
