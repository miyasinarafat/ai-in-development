import {
  BulletsSlide,
  CardGridSlide,
  ClosingSlide,
  StepsSlide,
  TableSlide,
  TitleSlide,
} from "@/components/templates";
import { Card } from "@/components/ui";
import { defineDeck } from "@/lib/deck";
import homework from "./homework";

export default defineDeck({
  slug: "week-2",
  label: "Week 2",
  topic: "Credit and token rules",
  date: "Monday, 26 October 2026",
  homework,
  slides: [
    {
      title: "Title",
      minutes: 1,
      notes: [
        "Last week we saw why agent sessions cost credits. This week we turn that into rules the whole team follows, and we ship our first shared skill.",
        "By 4 PM: everyone knows the six credit rules, which model to pick for which task, and has run /scoped-task once.",
      ],
      content: (
        <TitleSlide
          eyebrow="AI in Development · Week 2"
          title={
            <>
              Credit and <span className="text-accent">token</span> rules
            </>
          }
          subtitle="Six habits that cut credit use, and our first shared skill."
          date="Monday, 26 October 2026"
        />
      ),
    },
    {
      title: "Recap: your traces",
      minutes: 8,
      notes: [
        "Fill these blanks from the worksheets pasted in Teams before the session. Keep internal numbers out of the committed deck if you edit it; fill them live or on a local copy.",
        "Median steps and files read vs needed are the two numbers to dwell on: the gap between 'read' and 'needed' is wasted context we paid for on every later step.",
        "Ask two people to tell their story in one minute each: where the agent wasted steps, and what they would change in the prompt.",
        "If few traces came in: ask why (time, access, unclear task), and say the hands-on today covers the same ground.",
      ],
      content: (
        <CardGridSlide
          eyebrow="Recap · Week 1 homework"
          title="What your traces showed"
          columns={4}
          cards={[
            {
              title: "Traces shared",
              accent: true,
              body: (
                <>
                  Worksheets in Teams
                  <div className="mt-4 text-[64px] font-bold text-accent">__ / __</div>
                  people
                </>
              ),
            },
            {
              title: "Agent steps",
              body: (
                <>
                  Median per task
                  <div className="mt-4 text-[64px] font-bold text-accent">__</div>
                  range __ to __
                </>
              ),
            },
            {
              title: "Files read",
              body: (
                <>
                  Read vs needed
                  <div className="mt-4 text-[64px] font-bold text-accent-2">__ / __</div>
                  median per task
                </>
              ),
            },
            {
              title: "Would merge",
              body: (
                <>
                  As is or with changes
                  <div className="mt-4 text-[64px] font-bold text-accent">__ / __</div>
                  traces
                </>
              ),
            },
          ]}
          footnote="Where did the agent waste steps? What would you change in the prompt?"
        />
      ),
    },
    {
      title: "Today",
      minutes: 1,
      notes: [
        "Same shape as every Monday. Today's artifacts: the team's credit rules (v1) and the scoped-task skill, both in the shared repo.",
        "Last week we ran out of time before the hands-on. Today the hands-on starts by 3:32 at the latest, whatever happens.",
      ],
      content: (
        <StepsSlide
          eyebrow="Today"
          title="From numbers to rules"
          steps={[
            { label: "10", unit: "min", title: "Recap + one number", desc: "What your Week 1 traces showed" },
            { label: "20", unit: "min", title: "Credit rules + first skill", desc: "Six rules, model per task, and /scoped-task" },
            { label: "20", unit: "min", title: "Hands-on: one scoped task", desc: "Dev + QA pairs run /scoped-task on a real ticket" },
            { label: "10", unit: "min", title: "Agree the rules + commit", desc: "Vote on v1 and pick one habit" },
          ]}
        />
      ),
    },
    {
      title: "Where credits go",
      minutes: 3,
      notes: [
        "Recall last week: every step re-sends the whole context, and we pay per token at the model's price. Code completions and next-edit suggestions are free.",
        "So four things drive cost: how many steps, how big the context is on each step, how expensive the model is, and what is loaded on every call (instructions, tool list).",
        "The context-cost finding: an analysis of 287k agent API calls found each doubling of context costs roughly 6x more, while the useful part of the context barely grows (LangWatch, Aug 2026).",
        "Show where to check your own usage: profile picture, Copilot settings, Usage, 'Usage this cycle'. Our plan: 3,900 AI credits per user per month, pooled, reset on the 1st. (GitHub Docs, 'Monitor AI usage'.)",
      ],
      content: (
        <BulletsSlide
          eyebrow="Cost drivers"
          title="Four things set the bill"
          items={[
            <>
              <b className="text-strong">Steps:</b> each one re-sends the whole context
            </>,
            <>
              <b className="text-strong">Context size:</b> files read, long chats, pasted logs
            </>,
            <>
              <b className="text-strong">Model price:</b> about 10x between light and strong
            </>,
            <>
              <b className="text-strong">Always-loaded extras:</b> instructions, tool list
            </>,
          ]}
          aside={
            <>
              <Card title="Check your usage" accent>
                Profile picture → <b className="text-strong">Copilot settings</b> →{" "}
                <b className="text-strong">Usage this cycle</b>
              </Card>
              <Card>
                <div className="text-[110px] font-bold leading-none text-accent">3,900</div>
                <div className="text-[28px]">AI credits per user per month, pooled</div>
              </Card>
            </>
          }
        />
      ),
    },
    {
      title: "Six credit rules",
      minutes: 5,
      notes: [
        "This is the one-page rule set, version 1. We vote on it at the end; anything we change goes in the shared repo.",
        "1. Fresh chat per task: an old chat carries every earlier file and reply into each new step.",
        "2. Scope the prompt: goal, files, done when, out of scope. Naming the file saves the agent searching the repo. Your traces showed the read vs needed gap.",
        "3. Model per task: next slide.",
        "4. Plan big tasks first: use plan mode with a strong model, check the plan, then implement in a fresh chat, often with a cheaper model.",
        "5. Short instruction files: AGENTS.md or .github/copilot-instructions.md loads on every request. Facts that are always true; everything else goes in a skill.",
        "6. Only the tools we use: every MCP tool definition is sent on every call. Turn off servers and tools you do not need.",
      ],
      content: (
        <CardGridSlide
          eyebrow="Team rules · v1"
          title="Six credit rules"
          columns={3}
          cards={[
            { title: "1 · Fresh chat", accent: true, body: "New chat for each task. Old history is paid for on every step." },
            { title: "2 · Scope it", body: "Goal, files, done when, out of scope. Name the files." },
            { title: "3 · Right model", body: "Light model for routine work, strong for planning and hard bugs." },
            { title: "4 · Plan first", body: "Big task: plan mode, check the plan, then implement fresh." },
            { title: "5 · Short instructions", body: "Instruction files load every call. Keep them to facts." },
            { title: "6 · Few tools", body: "Every tool definition is sent every call. Turn off the rest." },
          ]}
        />
      ),
    },
    {
      title: "Which model for which task",
      minutes: 3,
      notes: [
        "A starting point, not a law. We adjust it from our own traces and the credit tracker.",
        "Prices per 1M tokens, input / output (GitHub Docs, 'Models and pricing', October 2026): GPT-5 mini $0.25 / $2; Claude Haiku 4.5 $1 / $5; GPT-5.4 $2.50 / $15; Claude Sonnet 4.6 $3 / $15. Cached input is about 10x cheaper. Check the docs before quoting again; prices change.",
        "From last week's calculator: the same 20-step session was about 97 credits on Sonnet 4.6 and about 10 on GPT-5 mini.",
        "Rule of thumb: start light. Switch up only when the light model fails twice, and switch in a fresh chat with a scoped prompt.",
      ],
      content: (
        <TableSlide
          eyebrow="Rule 3"
          title="Start light, step up when needed"
          headers={["Task", "Why", "Start with"]}
          rows={[
            ["Explain code", "Reading and summarising, no edits", "Light"],
            ["Unit test, clear spec", "Named file, known test command", "Light"],
            ["QA test cases", "From acceptance criteria, no code", "Light"],
            ["Small edit in one file", "Change is known, agent just types", "Light"],
            ["Plan a feature", "Many files, trade-offs to weigh", "Strong"],
            ["Unclear bug", "Needs search and reasoning", "Strong"],
          ]}
        />
      ),
    },
    {
      title: "What a skill is",
      minutes: 2,
      notes: [
        "A skill is a folder with a SKILL.md file: a name, a description, and instructions. Copilot supports them in VS Code and in the cloud agent (GitHub Docs and VS Code docs, 'Agent skills').",
        "Project skills live in the repo under .github/skills/<name>/SKILL.md, so the whole team gets the same one. Personal skills go in ~/.copilot/skills/.",
        "Only the name and description are loaded up front. The body loads when the task matches, or when you type /<name>. That is why a skill is cheaper than putting the same text in the instruction file.",
        "The name must be lowercase with hyphens and match the folder name, or it silently fails to load.",
      ],
      content: (
        <BulletsSlide
          eyebrow="Skills"
          title="A skill is a recipe the agent loads on demand"
          items={[
            "A folder with one SKILL.md: name, description, steps",
            "Lives in the repo, so the whole team shares it",
            "Only name and description load up front",
            "The body loads when needed, or with /name",
          ]}
          aside={
            <Card title=".github/skills/scoped-task/SKILL.md" accent>
              <pre className="font-mono text-[24px] leading-relaxed text-body-hi">
                {`---
name: scoped-task
description: Turn a ticket
  into a scoped task, confirm
  it, then do only that...
---
# Scoped task
1. Scope it first
2. Do only that
3. Report`}
              </pre>
            </Card>
          }
        />
      ),
    },
    {
      title: "Instructions, skill or MCP?",
      minutes: 3,
      notes: [
        "Three ways to give the agent knowledge or abilities, with very different context cost.",
        "Instruction file: loaded on every request. Only facts that are always true: stack, test command, folder layout, hard rules.",
        "Skill: only a one-line description is always loaded; the rest when used. Repeatable workflows: write a test, triage a log, make QA cases.",
        "MCP server: every tool definition is loaded on every call. Use it only when the agent needs a live system (Jira, a database, a browser). Early GitHub MCP exposed 100+ tools and crowded the context.",
        "That is why our first shared piece is a skill, not an MCP server.",
      ],
      content: (
        <TableSlide
          eyebrow="Context cost"
          title="Instructions, skill or MCP server?"
          headers={["Option", "Use for", "Loaded"]}
          rows={[
            ["Instruction file", "Always-true facts: stack, test command", "Every call"],
            ["Skill", "Repeatable workflows: tests, triage, QA cases", "When used"],
            ["MCP server", "Live systems: tracker, database, browser", "Every call"],
          ]}
        />
      ),
    },
    {
      title: "Our first skill",
      minutes: 2,
      notes: [
        "Our first shared skill puts rules 1 and 2 into the agent itself: it scopes the task before reading any files, waits for you to confirm, does only that, and reports the numbers we traced last week.",
        "It works for developers (tests, bugs, small edits) and QA (test cases from acceptance criteria).",
        "The source is in the shared repo under skills/scoped-task/SKILL.md. To use it in a project, copy the folder to that repo's .github/skills/.",
        "Owner: the skills repo owner. Changes go through a pull request, like code.",
      ],
      content: (
        <CardGridSlide
          eyebrow="Shared skill · v1"
          title="/scoped-task"
          columns={3}
          cards={[
            {
              title: "1 · Scope it first",
              accent: true,
              body: "Goal, files, done when, out of scope. Asks if anything is missing. No file reads yet.",
            },
            {
              title: "2 · Do only that",
              body: "Reads the named files, runs the done-when check, stops when it passes.",
            },
            {
              title: "3 · Report",
              body: "Five lines: done, files read vs needed, commands, check, next step.",
            },
          ]}
          footnote="Copy skills/scoped-task/ into a repo's .github/skills/, then type /scoped-task."
        />
      ),
    },
    {
      title: "Live demo",
      minutes: 4,
      notes: [
        "VS Code on a pilot repo that already has .github/skills/scoped-task/SKILL.md (copy it in before the session). New chat, Agent mode, a light model.",
        "Type / and show scoped-task in the menu. Then run it with the ticket on the right (fill in a real file and function you tested this morning).",
        "Point out: it shows the scope before reading files; you confirm; it reads only the named file; it reports files read vs needed at the end.",
        "Compare with last week's demo: fewer steps, fewer files. Count the steps aloud.",
        "Fallback if it does not show in the / menu: check the name matches the folder, or paste the skill path as context with #file. If it still fails, walk the three cards on the previous slide.",
      ],
      content: (
        <BulletsSlide
          eyebrow="Live demo"
          title="/scoped-task in Copilot"
          items={[
            "New chat, Agent mode, a light model",
            "Watch it scope before it reads anything",
            "Confirm, then count the steps aloud",
            "Compare files read vs needed with last week",
          ]}
          aside={
            <Card title="Demo prompt" accent>
              <div className="font-mono text-[24px] leading-snug text-body-hi">
                /scoped-task Add a unit test for{" "}
                <span className="text-accent-2">[function]</span> in{" "}
                <span className="text-accent-2">[test file]</span> covering an empty input. Test
                command: <span className="text-accent-2">[command]</span>.
              </div>
            </Card>
          }
        />
      ),
    },
    {
      title: "Hands-on: one scoped task",
      minutes: 19,
      notes: [
        "Pairs: one developer, one QA. 14 minutes to run, 5 minutes to share. Start no later than 3:32.",
        "Each pair copies skills/scoped-task into their pilot repo's .github/skills/ (or uses the demo repo), picks one small real ticket, and runs /scoped-task with a light model.",
        "QA pairs: paste acceptance criteria (no customer data) and ask for test cases.",
        "Record the numbers on the right and paste them in the Teams chat. Compare with your Week 1 trace if you did one.",
        "Each pair also suggests one change to the skill or to the rules. That feeds the vote.",
      ],
      content: (
        <BulletsSlide
          eyebrow="Hands-on · 19 min · pairs"
          title="Run one scoped task"
          items={[
            "Copy the skill into your repo's .github/skills/",
            "Pick one small, real ticket (QA: acceptance criteria)",
            "Run /scoped-task with a light model",
            "Post the numbers in Teams; suggest one change",
          ]}
          aside={
            <Card title="Post in Teams" accent>
              <ul className="space-y-2">
                <li>Model: ________</li>
                <li>Steps: ____</li>
                <li>Files read: ____ (needed: ____)</li>
                <li>Check passed? Y / N</li>
                <li>Would merge? Y / N</li>
                <li>One change: ________</li>
              </ul>
            </Card>
          }
        />
      ),
    },
    {
      title: "Agree the rules",
      minutes: 3,
      notes: [
        "Quick vote by show of hands (or reactions in Teams) on each of the six rules: keep, change, drop.",
        "Write down any changes live; they go into the shared repo as credit rules v1 after the session.",
        "Name the credit-tracker and review-rubric owners now if they are still open. Fill the blanks on the slide live.",
      ],
      content: (
        <BulletsSlide
          eyebrow="Decide"
          title="Credit rules v1: keep, change or drop?"
          items={[
            "Vote on each of the six rules",
            "Add one rule from today's hands-on, if any",
            "Rules and skill live in the shared repo",
            "We review both in Week 4 with real usage",
          ]}
          aside={
            <Card title="Owners" accent>
              <div>Credit tracker: _______</div>
              <div className="mt-3">Review rubric: _______</div>
              <div className="mt-3">Skill: AI-in-Development</div>
            </Card>
          }
        />
      ),
    },
    {
      title: "This week and next Monday",
      minutes: 2,
      notes: [
        "Homework is light: use /scoped-task for three real tasks and note the numbers. Details on the homework page.",
        "Next week: the research, plan, implement, test loop for bigger tasks, where rule 4 (plan first) becomes a workflow.",
      ],
      content: (
        <BulletsSlide
          eyebrow="Commitments"
          title="Before next Monday"
          items={[
            "Use /scoped-task for three real tasks",
            "Check Usage this cycle on Monday and Friday",
            "Post your numbers in Teams by Friday, 5 PM",
            <>
              Details: <span className="text-accent">ai-in-development.vercel.app/homework/week-2</span>
            </>,
          ]}
          aside={
            <Card title="Next Monday · Week 3" accent>
              <div className="text-[34px] font-semibold text-strong">Research, plan, implement, test</div>
              <ul className="mt-4 list-disc space-y-2 pl-7">
                <li>A loop for bigger tasks</li>
                <li>Plan with a strong model</li>
                <li>Implement fresh and cheap</li>
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
        "Close by asking everyone for one habit from the six rules they will follow this week.",
        "Remind: homework at ai-in-development.vercel.app/homework/week-2, numbers in Teams by Friday 5 PM.",
      ],
      content: (
        <ClosingSlide
          items={[
            "Which rule will be hardest to keep, and why?",
            "Did /scoped-task save steps on your ticket?",
            "What should our second skill be?",
            "One habit you will follow this week?",
          ]}
        />
      ),
    },
  ],
});
