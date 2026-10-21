import {
  BulletsSlide,
  CardGridSlide,
  ClosingSlide,
  SlideHeader,
  StepsSlide,
  TableSlide,
  TitleSlide,
} from "@/components/templates";
import { Bullets, Card, Eyebrow, Pill, Title } from "@/components/ui";
import { defineDeck } from "@/lib/deck";
import Scorecard from "./Scorecard";

export default defineDeck({
  slug: "week-0",
  label: "Week 0",
  topic: "Kickoff & Baseline",
  date: "Monday, 12 October 2026",
  slides: [
    {
      title: "Title",
      minutes: 2,
      notes: [
        "Welcome. This is the first of a weekly hour: Monday 3-4 PM, developers and QA together.",
        "Today is kickoff and baseline. No heavy tooling yet; we agree where we are and where we are going.",
      ],
      content: (
        <TitleSlide
          eyebrow="AI in Development · Week 0"
          title={
            <>
              Building an
              <br />
              <span className="text-accent">AI-native</span> engineering team
            </>
          }
          subtitle="Kickoff & baseline: where we are, where we are going, and how we will get there together."
          date="Monday, 12 October 2026"
        />
      ),
    },
    {
      title: "Why we are here",
      minutes: 4,
      notes: [
        "Most of us already use AI. The question is whether the team gets better, not just individuals.",
        "Credits are limited (~3,900/month). Using them well is a team skill, and it affects the monthly bill.",
        "QA is in from week 1: AI changes testing as much as coding.",
      ],
      content: (
        <BulletsSlide
          eyebrow="Why we are here"
          title="AI use is personal. Results should be shared."
          items={[
            "Today each of us has our own prompts, habits and credit burn",
            "Value compounds when we share workflow, setup and guardrails",
            "~3,900 credits a month is not much: efficiency is a team skill",
            "QA is part of the loop from day one",
          ]}
          aside={
            <Card title="By Week 12 we will have" accent>
              <ul className="list-disc space-y-3 pl-7">
                <li>A shared workflow we all use</li>
                <li>Agent-ready pilot repos</li>
                <li>A skills &amp; prompt library</li>
                <li>Written guardrails</li>
                <li>Before / after numbers</li>
              </ul>
            </Card>
          }
        />
      ),
    },
    {
      title: "What AI-native means",
      minutes: 5,
      notes: [
        "Four pillars. Licences alone do not change how a team works.",
        "Shared workflow: research, plan, implement, test, review. We will practise it in weeks 3-4.",
        "Harness: the instruction files, skills and tools around the model. Guardrails: review, data rules. Measurement: so we can prove it helps.",
      ],
      content: (
        <CardGridSlide
          eyebrow="Definition"
          title={<>What &ldquo;AI-native&rdquo; means for us</>}
          cards={[
            {
              title: "1 · Shared workflow",
              accent: true,
              body: "Research → plan → implement → test → review. Same loop, every ticket, every engineer.",
            },
            {
              title: "2 · Shared harness",
              body: "Short instruction files in each repo, a skills library, and a small set of approved tools.",
            },
            {
              title: "3 · Guardrails",
              body: "Human review of AI changes, clear rules on data, and agreed risk levels.",
            },
            {
              title: "4 · Measurement",
              body: "Credits, cycle time, quality and confidence, tracked before and after.",
            },
          ]}
          footnote="Licences don't make a team AI-native. Habits and systems do."
        />
      ),
    },
    {
      title: "Four levels of AI coding",
      minutes: 4,
      notes: [
        "Autonomy goes up left to right, and so does the need for context, review and cost control.",
        "Ask the room: which levels are we using today? Note the answers; they feed the baseline.",
        "We will check what Copilot gives us at each level in week 8.",
      ],
      content: (
        <div className="flex h-full flex-col">
          <SlideHeader eyebrow="Landscape" title="Four levels of AI coding. Where are we?" />
          <div className="grid flex-1 grid-cols-4 gap-6">
            {[
              ["1", "Inline completion", "Suggestions as you type"],
              ["2", "Chat in the IDE", "Ask questions, edit several files"],
              ["3", "Agent mode / CLI", "Plans, runs tools, iterates on results"],
              ["4", "Background agents", "Tasks run async; you review the PR"],
            ].map(([n, t, d], i) => (
              <div
                key={n}
                className="flex flex-col justify-between rounded-2xl border-2 border-line bg-card p-8"
                style={{ marginTop: `${(3 - i) * 36}px` }}
              >
                <div className="text-[84px] font-bold leading-none text-accent">{n}</div>
                <div>
                  <div className="mb-2 text-[36px] font-semibold text-strong">{t}</div>
                  <div className="text-[28px] text-body">{d}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="pt-8 text-[34px] text-body">
            More autonomy needs better context, tighter review and cost control.
          </p>
        </div>
      ),
    },
    {
      title: "How Mondays work",
      minutes: 4,
      notes: [
        "Same shape every week so people know what to expect.",
        "Hands-on is on real tickets, in pairs of one developer and one QA.",
        "Each week leaves one artifact in a shared repo: a prompt, a skill, a template or a rule.",
      ],
      content: (
        <StepsSlide
          eyebrow="Format"
          title="One hour, same shape every Monday"
          steps={[
            { label: "10", unit: "min", title: "Recap + one number", desc: "Last week's commitments and one metric, e.g. credits used" },
            { label: "20", unit: "min", title: "One topic, one demo", desc: "A single idea, shown live on a real repo" },
            { label: "20", unit: "min", title: "Hands-on in pairs", desc: "Developer + QA, real ticket, clear done-criteria" },
            { label: "10", unit: "min", title: "Commit one thing", desc: "Everyone names one habit to try this week" },
          ]}
          footnote="Every session leaves one artifact in a shared repo."
        />
      ),
    },
    {
      title: "12-week roadmap",
      minutes: 5,
      notes: [
        "Three phases. Weeks 1-4: foundations and the workflow. Weeks 5-9: environment and scale. Weeks 10-12: QA, governance, measurement.",
        "Credit and token rules come early, in week 2, because that is our most urgent pain.",
        "The plan is adjustable: we will use the retro question each month to change it.",
      ],
      content: (
        <CardGridSlide
          eyebrow="Roadmap"
          title="12 weeks, three phases"
          columns={3}
          cards={[
            {
              title: "Weeks 1–4 · Foundations",
              accent: true,
              body: (
                <ul className="list-disc space-y-2 pl-7">
                  <li>How coding agents work</li>
                  <li>Credit &amp; token rules</li>
                  <li>Research → plan → implement → test loop</li>
                  <li>Dev + QA pair exercise</li>
                </ul>
              ),
            },
            {
              title: "Weeks 5–9 · Environment & scale",
              body: (
                <ul className="list-disc space-y-2 pl-7">
                  <li>Agent-ready repos &amp; instruction files</li>
                  <li>Skills &amp; prompt library</li>
                  <li>Async and parallel agents</li>
                  <li>Tool landscape and Copilot fit</li>
                  <li>Background-agent trial</li>
                </ul>
              ),
            },
            {
              title: "Weeks 10–12 · Team practice",
              body: (
                <ul className="list-disc space-y-2 pl-7">
                  <li>AI for QA</li>
                  <li>Review, security &amp; governance</li>
                  <li>Measure results &amp; plan next quarter</li>
                </ul>
              ),
            },
          ]}
        />
      ),
    },
    {
      title: "Credits and tokens",
      minutes: 6,
      notes: [
        "Our monthly credit allowance is about 3,900. Please correct the number if it is different for your account.",
        "A published analysis of 287k agent API calls found each doubling of context costs roughly 6x more, while the useful part of the context barely grows (LangWatch, Aug 2026).",
        "These are five habits to start now. Week 2 turns them into a one-page team rule set.",
        "Open question for week 2: how exactly does Copilot count credits and model multipliers? I will verify before then.",
      ],
      content: (
        <BulletsSlide
          eyebrow="Our constraint"
          title="Credits are limited"
          items={[
            <>
              <b className="text-strong">Scope the prompt:</b> name the files, the goal, what is out
              of scope
            </>,
            <>
              <b className="text-strong">Fresh context</b> for each task; trim long sessions
            </>,
            <>
              <b className="text-strong">Right model for the job:</b> strong for planning, lighter
              for routine edits
            </>,
            <>
              <b className="text-strong">Keep instruction files short</b>; they load on every
              request
            </>,
            <>
              <b className="text-strong">Add tools and agents</b> only when they pay for themselves
            </>,
          ]}
          aside={
            <>
              <Card accent>
                <div className="text-[24px] uppercase tracking-widest text-muted">
                  Monthly allowance
                </div>
                <div className="text-[110px] font-bold leading-none text-accent">~3,900</div>
                <div className="text-[28px]">credits per month</div>
              </Card>
              <Card>
                <div className="text-[28px]">
                  Each doubling of context costs roughly{" "}
                  <b className="text-accent-2">6×</b> more (analysis of 287k agent calls).
                </div>
                <div className="mt-2 text-[20px] text-muted">LangWatch, Aug 2026</div>
              </Card>
            </>
          }
        />
      ),
    },
    {
      title: "Baseline: readiness scorecard",
      minutes: 10,
      notes: [
        "Do this live. Everyone rates each area from 1 (ad hoc) to 4 (AI-native). Tap a number to rate; tap again to clear.",
        "Aim for a team consensus on each area, then ask which two areas are lowest and why.",
        "Write down the scores. We rescore in week 12 and compare.",
        "Possible prompts: Where do reviews happen on AI code today? Do our repos have usable run and test commands?",
      ],
      content: (
        <div className="flex h-full flex-col">
          <div className="flex items-start justify-between">
            <div>
              <Eyebrow>Baseline 1 of 2</Eyebrow>
              <h1 className="mb-4 text-[56px] font-bold leading-tight text-strong">
                Readiness scorecard
              </h1>
            </div>
            <Pill>Live · rate together</Pill>
          </div>
          <div className="min-h-0 flex-1">
            <Scorecard />
          </div>
        </div>
      ),
    },
    {
      title: "Baseline: what we measure",
      minutes: 4,
      notes: [
        "We cannot prove improvement without a starting point. This week everyone collects their own numbers.",
        "Start simple: a screenshot or a number is enough. We will refine in week 2.",
        "Confidence is a one-question monthly survey: how confident are you using AI on real work, 1-5?",
      ],
      content: (
        <TableSlide
          eyebrow="Baseline 2 of 2"
          title="What we measure, starting this week"
          headers={["Metric", "Where it comes from", "Baseline"]}
          rows={[
            ["Credits per person / month", "Copilot usage and billing pages", "to collect"],
            ["Credits per merged PR", "Usage ÷ merged PRs (pilot repos)", "to collect"],
            ["Cycle time", "Ticket start → PR merged", "to collect"],
            ["Review rework", "Follow-up commits after review", "to collect"],
            ["Escaped defects", "QA and production bug tickets", "to collect"],
            ["Team confidence", "1-question monthly survey, 1–5", "to collect"],
          ]}
        />
      ),
    },
    {
      title: "Pilot repos and volunteers",
      minutes: 5,
      notes: [
        "Choose two pilot repos today. Criteria on the right: tests that run, active tickets, an owner who is willing, low-risk data.",
        "Find 3-4 volunteers across dev and QA. People who are curious, not only experts.",
        "Write names on the slide or in the meeting chat so we do not lose them.",
      ],
      content: (
        <div className="flex h-full gap-12">
          <div className="flex-1">
            <Eyebrow>Decide today</Eyebrow>
            <Title>Pick 2 pilot repos and 3–4 volunteers</Title>
            <div className="mb-8 flex flex-wrap gap-4">
              {["Repo 1", "Repo 2", "Repo 3", "Repo 4", "Repo 5"].map((r) => (
                <span
                  key={r}
                  className="rounded-xl border-2 border-line bg-card px-7 py-4 text-[36px] font-semibold text-strong"
                >
                  {r}
                </span>
              ))}
            </div>
            <div className="space-y-4 text-[32px] text-body">
              <div className="rounded-xl border-2 border-dashed border-line px-6 py-4">
                Pilot repos: ______________ and ______________
              </div>
              <div className="rounded-xl border-2 border-dashed border-line px-6 py-4">
                Volunteers (dev + QA): ______________________
              </div>
            </div>
          </div>
          <div className="flex w-[560px] flex-col justify-center">
            <Card title="Good pilot repos have…" accent>
              <ul className="list-disc space-y-3 pl-7">
                <li>Tests that run reliably</li>
                <li>Active tickets this quarter</li>
                <li>A willing owner</li>
                <li>Low-risk data to work with</li>
                <li>A mix of old and new code</li>
              </ul>
            </Card>
          </div>
        </div>
      ),
    },
    {
      title: "Ground rules",
      minutes: 3,
      notes: [
        "These are proposed interim rules. We finalize them in the governance session.",
        "Customer and subscriber data in prompts is the one to be strict about.",
        "Ask: anything missing? Anything unrealistic?",
      ],
      content: (
        <div className="flex h-full flex-col">
          <SlideHeader
            eyebrow="Ground rules"
            title="Five rules from day one"
            badge="Proposed · refine in Week 11"
          />
          <div className="flex flex-1 flex-col justify-center">
            <Bullets
              items={[
                "A human reviews every AI-generated change before merge",
                "No customer or subscriber data in prompts",
                "Use approved tools and integrations only",
                "If you can't explain it, don't ship it",
                "Share what works and what failed",
              ]}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Owners and rotation",
      minutes: 2,
      notes: [
        "Name an owner for each. Small roles, light touch.",
        "From about week 6 we rotate who presents the hands-on part.",
      ],
      content: (
        <CardGridSlide
          eyebrow="Ownership"
          title="Who owns what"
          columns={3}
          cards={[
            {
              title: "Skills repo",
              accent: true,
              body: (
                <>
                  Keeps prompts, skills and templates tidy and reviewed.
                  <div className="mt-6 text-[28px] text-accent-2">Owner: ____________</div>
                </>
              ),
            },
            {
              title: "Review rubric",
              body: (
                <>
                  Maintains the checklist for reviewing AI-generated changes.
                  <div className="mt-6 text-[28px] text-accent-2">Owner: ____________</div>
                </>
              ),
            },
            {
              title: "Credit tracker",
              body: (
                <>
                  Collects usage numbers and reports monthly.
                  <div className="mt-6 text-[28px] text-accent-2">Owner: ____________</div>
                </>
              ),
            },
          ]}
          footnote="Presenters rotate from about Week 6. Every hands-on pairs a developer with QA."
        />
      ),
    },
    {
      title: "This week and next Monday",
      minutes: 3,
      notes: [
        "Four small actions. Please do them by Friday.",
        "Next Monday: how coding agents work: the loop, tools and context, with a short live demo.",
      ],
      content: (
        <BulletsSlide
          eyebrow="Commitments"
          title="Before next Monday"
          items={[
            "Note your own credit usage so far this month",
            "Complete your personal scorecard rating",
            "Try the scoped-prompt habit on one real task",
            "Volunteers: bring one ticket you'd like to try with AI",
          ]}
          aside={
            <Card title="Next Monday · Week 1" accent>
              <div className="text-[34px] font-semibold text-strong">How coding agents work</div>
              <ul className="mt-4 list-disc space-y-2 pl-7">
                <li>The agent loop</li>
                <li>Tools and context</li>
                <li>Live demo of a tiny agent</li>
              </ul>
            </Card>
          }
        />
      ),
    },
    {
      title: "Discussion",
      minutes: 3,
      notes: [
        "Keep it open. Write the answers down; they shape weeks 1-4.",
        "Close by confirming the time (Mondays 3-4 PM) and thanking the team.",
      ],
      content: (
        <ClosingSlide
          items={[
            "Where do you use AI today, and where does it let you down?",
            "What worries you most: quality, security, credits or skills?",
            "Which ticket types would make the best first pilots?",
            "What would make this hour worth it for you?",
          ]}
        />
      ),
    },
  ],
});
