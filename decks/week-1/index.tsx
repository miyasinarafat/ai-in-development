import {
  BulletsSlide,
  CardGridSlide,
  ClosingSlide,
  SlideHeader,
  StepsSlide,
  TitleSlide,
} from "@/components/templates";
import { Bullets, Card, Eyebrow } from "@/components/ui";
import { defineDeck } from "@/lib/deck";
import AgentLoop from "./AgentLoop";
import CostCalculator from "./CostCalculator";
import homework from "./homework";

export default defineDeck({
  slug: "week-1",
  label: "Week 1",
  topic: "How coding agents work",
  date: "Monday, 19 October 2026",
  homework,
  slides: [
    {
      title: "Title",
      minutes: 1,
      notes: [
        "Welcome back. Last week we agreed where we are. This week we open the box: what actually happens when you press Enter in agent mode.",
        "By 4 PM everyone should be able to explain the agent loop in one sentence, and say why a long agent session burns credits.",
      ],
      content: (
        <TitleSlide
          eyebrow="AI in Development · Week 1"
          title={
            <>
              How coding <span className="text-accent">agents</span> work
            </>
          }
          subtitle="The loop, the tools, the context, and why every step costs credits."
          date="Monday, 19 October 2026"
        />
      ),
    },
    {
      title: "Recap: Week 0",
      minutes: 7,
      notes: [
        "Fill the blanks live, or before the session if you have the numbers.",
        "Readiness: read out the team average from last week's scorecard and the two lowest areas.",
        "Ask each person for their one number: credits used so far this month, if they found it. If few people did, that is fine; we will show where to find it in week 2.",
        "Ask: did anyone try the scoped-prompt habit? One or two quick stories, good or bad.",
      ],
      content: (
        <CardGridSlide
          eyebrow="Recap · last week"
          title="Where we started"
          columns={4}
          cards={[
            {
              title: "Readiness",
              accent: true,
              body: (
                <>
                  Team average
                  <div className="mt-4 text-[64px] font-bold text-accent">1.4 / 4</div>
                  Lowest: ____________
                </>
              ),
            },
            {
              title: "Pilot repos",
              body: (
                <>
                  <div className="mt-2">1. Webnext (GP Web)</div>
                  <div className="mt-4">2. FlexiPlan (Web)</div>
                </>
              ),
            },
            {
              title: "Owners",
              body: (
                <>
                  <div>Skills repo: AI-in-Development</div>
                  <div className="mt-3">Review rubric: _______</div>
                  <div className="mt-3">Credit tracker: _______</div>
                </>
              ),
            },
            {
              title: "Your one number",
              body: (
                <>
                  Credits used this month
                  <div className="mt-4 text-[64px] font-bold text-accent-2">__ / __</div>
                  people reported
                </>
              ),
            },
          ]}
          footnote="Who tried the scoped-prompt habit? What happened?"
        />
      ),
    },
    {
      title: "Today",
      minutes: 2,
      notes: [
        "Same shape as every Monday. Today's artifact: a filled-in 'trace the loop' sheet from every pair, which feeds next week's credit rules.",
      ],
      content: (
        <StepsSlide
          eyebrow="Today"
          title="One hour, one idea: the agent loop"
          steps={[
            { label: "10", unit: "min", title: "Recap + one number", desc: "Week 0 results and your credit usage" },
            { label: "20", unit: "min", title: "How agents work", desc: "The loop, tools, context and cost, with a live demo" },
            { label: "20", unit: "min", title: "Hands-on: trace the loop", desc: "Developer + QA pairs, one real ticket, one worksheet" },
            { label: "10", unit: "min", title: "Takeaways + commit", desc: "What changes in how we prompt from tomorrow" },
          ]}
        />
      ),
    },
    {
      title: "The big idea",
      minutes: 2,
      notes: [
        "This is the one sentence to remember: a coding agent is a language model in a loop with tools.",
        "The model never touches your files. It only writes a request like 'read this file'; the app (Copilot, Claude Code, Cursor) runs it and sends the result back.",
        "Stanford's CS146S builds a working agent like this in about 200 lines, with three tools: read file, list files, edit file. Everything else in a product is around that loop.",
      ],
      content: (
        <BulletsSlide
          eyebrow="The big idea"
          title="An agent is an LLM in a loop with tools"
          items={[
            "The model reads everything it has been sent so far",
            "It either answers, or asks for a tool: read, search, edit, run",
            "The app runs the tool and adds the result to the conversation",
            "Repeat until the model answers without a tool call",
          ]}
          aside={
            <Card title="The whole loop" accent>
              <pre className="font-mono text-[24px] leading-relaxed text-body-hi">
                {`messages = [system, user]
while True:
  reply = llm(messages, tools)
  if no tool call: break
  result = run(reply.tool)
  messages += [reply, result]`}
              </pre>
            </Card>
          }
        />
      ),
    },
    {
      title: "Four parts",
      minutes: 2,
      notes: [
        "Every agent product has these four parts. When an agent does something odd, ask which part caused it.",
        "Model: the brain, and the thing we pay for per token. Tools: its hands. Context: its working memory, and it is everything sent on each call. Harness: the product around it.",
      ],
      content: (
        <CardGridSlide
          eyebrow="Anatomy"
          title="Four parts of every coding agent"
          cards={[
            {
              title: "1 · Model",
              accent: true,
              body: "Decides the next step. Billed per token in and out. Different models, very different prices.",
            },
            {
              title: "2 · Tools",
              body: "Read, search, edit, run commands, call MCP servers. The model only asks; the app executes.",
            },
            {
              title: "3 · Context",
              body: "Everything sent on each call: system prompt, instructions, tool list, history, tool results.",
            },
            {
              title: "4 · Harness",
              body: "The app around the loop: Copilot, Claude Code, Cursor. Modes, permissions, approvals, memory.",
            },
          ]}
          footnote="When an agent goes wrong, ask: which part caused it?"
        />
      ),
    },
    {
      title: "The loop, step by step",
      minutes: 5,
      notes: [
        "Click 'Next step' (on the slide, not the arrow key) and narrate each step. Example: a failing PHP test.",
        "Watch the right side. Model calls go up by one per decision. 'Context now' grows a little each step.",
        "The key number is 'Input tokens billed'. Each call re-sends the whole context, so at the end we have about 19k tokens of context but about 99k input tokens billed. That is the hidden cost of long agent sessions.",
        "Ask: what would happen to that number if the agent read 10 files instead of 1? Or if we kept chatting in the same session for an hour?",
      ],
      content: (
        <div className="flex h-full flex-col">
          <SlideHeader eyebrow="Walkthrough" title="One agent session, step by step" badge="Click Next step" />
          <div className="min-h-0 flex-1">
            <AgentLoop />
          </div>
        </div>
      ),
    },
    {
      title: "What the harness adds",
      minutes: 3,
      notes: [
        "Everything the product adds around the loop also becomes tokens on every call.",
        "System prompt: written by the vendor; you never see it, but you pay for it each call. Instruction files: written by us (AGENTS.md or .github/copilot-instructions.md). Keep them short.",
        "Tool list: every tool's name, description and parameters are sent each call. Claude Code ships about 40 built-in tools; early MCP servers such as GitHub's exposed 100+ tools, which crowded the context. More tools means more cost and more confusion.",
        "Modes: Copilot has ask, edit, agent and plan modes. Subagents start with a fresh context and return only a summary. Compaction summarises a long history when it gets too big.",
      ],
      content: (
        <CardGridSlide
          eyebrow="Harness"
          title="What the app adds around the loop"
          columns={3}
          cards={[
            { title: "System prompt", accent: true, body: "Vendor's instructions. Invisible, sent every call." },
            { title: "Instruction files", body: "Ours: AGENTS.md or copilot-instructions.md. Keep them short." },
            { title: "Tool list", body: "Every tool's description, every call. More tools, more tokens." },
            { title: "Modes", body: "Ask, edit, agent, plan. Plan first for bigger tasks." },
            { title: "Subagents", body: "Fresh context for a side task; only a summary comes back." },
            { title: "Compaction", body: "Long history summarised to fit. Details can get lost." },
          ]}
          footnote="Everything on this slide becomes tokens on every call."
        />
      ),
    },
    {
      title: "Why sessions cost credits",
      minutes: 4,
      notes: [
        "Our plan is Copilot Enterprise: 3,900 AI credits per user per month, pooled across the organisation. 1 credit = $0.01. Code completions and next-edit suggestions are free.",
        "Agent and chat usage is billed per token: input, cached input and output, at each model's price. Source: GitHub Docs, 'Models and pricing'.",
        "Demo the calculator: default is Claude Sonnet 4.6, 20 steps, 40k context: about 97 credits a session, about 40 sessions a month. Switch to GPT-5 mini: about 10 credits. Same session, about 10x cheaper.",
        "Then drag the context slider up: a session that drags on with a big context costs several times more. A study of 287k agent calls found each doubling of context costs roughly 6x more, while the useful part barely grows.",
        "Caveat: it is an estimate. It assumes 80% of the input is cached and ignores cache-write charges.",
      ],
      content: (
        <div className="flex h-full gap-12">
          <div className="flex-1">
            <Eyebrow>Cost</Eyebrow>
            <h1 className="mb-8 text-[64px] font-bold leading-[1.05] tracking-tight text-strong">
              Why agent sessions cost credits
            </h1>
            <Bullets
              items={[
                "Every step re-sends the whole context",
                "Billed per token, at each model's price",
                "Model choice changes cost about 10x",
                "Code completions are free",
              ]}
            />
            <p className="mt-8 text-[28px] text-body">
              Copilot Enterprise: <b className="text-strong">3,900 AI credits</b> per user per
              month, pooled. 1 credit = $0.01.
            </p>
          </div>
          <div className="w-[700px]">
            <CostCalculator />
          </div>
        </div>
      ),
    },
    {
      title: "Live demo in Copilot",
      minutes: 4,
      notes: [
        "Switch to VS Code on a pilot repo. Use agent mode with the prompt on the right (fill in a real file and test before the session).",
        "Narrate while it runs: point at each tool call (read, search, terminal), each approval prompt, and the final edit. Count the steps aloud.",
        "If it fails or takes too long, that is a good lesson too: say what context it was missing.",
        "Back-up if the live demo breaks: go back to the step-by-step slide and walk it again.",
      ],
      content: (
        <BulletsSlide
          eyebrow="Live demo"
          title="The same loop inside Copilot"
          items={[
            "Agent mode, on one of our pilot repos",
            "Watch each tool call: read, search, terminal",
            "Count the model steps aloud",
            "Note what it read that it did not need",
          ]}
          aside={
            <Card title="Demo prompt" accent>
              <div className="font-mono text-[24px] leading-snug text-body-hi">
                In <span className="text-accent-2">[file]</span>, add a unit test for{" "}
                <span className="text-accent-2">[function]</span> covering an empty input. Only
                touch the test file. Run the tests and stop when they pass.
              </div>
            </Card>
          }
        />
      ),
    },
    {
      title: "Hands-on: trace the loop",
      minutes: 20,
      notes: [
        "Pairs: one developer, one QA. Each pair picks one small, real ticket in a pilot repo. 15 minutes to run it, 5 minutes to share.",
        "Rules: one scoped prompt; do not interrupt the agent unless it is clearly stuck; review everything before keeping it.",
        "Each pair fills the worksheet on the right (also in the presenter guide, docs/sessions/week-1.md). Collect the sheets: they are the data for next week's credit rules.",
        "If a pair finishes early: run the same prompt with a cheaper model and compare the result.",
      ],
      content: (
        <BulletsSlide
          eyebrow="Hands-on · 20 min · pairs"
          title="Trace the loop"
          items={[
            "Pick one small, real ticket in a pilot repo",
            "Write one scoped prompt: goal, files, done-when, out of scope",
            "Run it in agent mode; interrupt only if stuck",
            "Fill the worksheet, then share in 2 minutes",
          ]}
          aside={
            <Card title="Worksheet" accent>
              <ul className="space-y-2">
                <li>Model used: ________</li>
                <li>Model steps: ____</li>
                <li>Files read: ____ (needed: ____)</li>
                <li>Commands run: ____</li>
                <li>Did it run tests? Y / N</li>
                <li>Would you merge it? Y / N</li>
              </ul>
            </Card>
          }
        />
      ),
    },
    {
      title: "Takeaways",
      minutes: 3,
      notes: [
        "Ask the pairs what surprised them before showing this slide, then link their answers to these five points.",
        "These become the first draft of the team's credit rules next week.",
      ],
      content: (
        <BulletsSlide
          eyebrow="Takeaways"
          title="What changes from tomorrow"
          items={[
            "Short, focused sessions: start fresh for each task",
            "Scope every prompt: goal, files, done-when",
            "Short instruction files and only the tools we need",
            "Pick the model for the job; completions are free",
            "The agent sounds confident; review it anyway",
          ]}
        />
      ),
    },
    {
      title: "This week and next Monday",
      minutes: 3,
      notes: [
        "Homework is small: one observed session each, same worksheet. Bring the numbers next Monday.",
        "Next week: credit and token rules for the team, and our first shared skill.",
        "Slides for every week stay at ai-in-development.vercel.app.",
      ],
      content: (
        <BulletsSlide
          eyebrow="Commitments"
          title="Before next Monday"
          items={[
            "Trace one real agent session (homework, ~45 min)",
            "Paste your worksheet in Teams by Friday, 5 PM",
            "Start a fresh chat for each new task",
            <>
              Details: <span className="text-accent">ai-in-development.vercel.app/homework/week-1</span>
            </>,
          ]}
          aside={
            <Card title="Next Monday · Week 2" accent>
              <div className="text-[34px] font-semibold text-strong">Credit and token rules</div>
              <ul className="mt-4 list-disc space-y-2 pl-7">
                <li>Our one-page credit rules</li>
                <li>Which model for which task</li>
                <li>Our first shared skill</li>
              </ul>
            </Card>
          }
        />
      ),
    },
    {
      title: "Discussion",
      minutes: 4,
      notes: [
        "Close by asking everyone to say or write one habit they will try this week.",
        "Remind: homework at ai-in-development.vercel.app/homework/week-1, worksheet pasted in Teams by Friday 5 PM.",
      ],
      content: (
        <ClosingSlide
          items={[
            "What surprised you in your trace?",
            "Where did the agent waste steps?",
            "Which task would you never give an agent, and why?",
            "One habit you will try this week?",
          ]}
        />
      ),
    },
  ],
});
