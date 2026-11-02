import {
  BulletsSlide,
  CardGridSlide,
  ClosingSlide,
  SlideHeader,
  StepsSlide,
  TableSlide,
  TitleSlide,
} from "@/components/templates";
import { Card } from "@/components/ui";
import { defineDeck } from "@/lib/deck";
import homework from "./homework";
import LoopDiagram from "./LoopDiagram";

export default defineDeck({
  slug: "week-3",
  label: "Week 3",
  topic: "Research, plan, implement, test",
  date: "Monday, 2 November 2026",
  homework,
  slides: [
    {
      title: "Title",
      minutes: 1,
      notes: [
        "Two weeks of habits for small tasks: fresh chat, scoped task, right model. Today: what to do when the task is too big for one prompt.",
        "By 4 PM: everyone can take a medium ticket through research and plan, in separate chats, with a short file carrying the work from one chat to the next.",
      ],
      content: (
        <TitleSlide
          eyebrow="AI in Development · Week 3"
          title={
            <>
              Research, <span className="text-accent">plan</span>, implement, test
            </>
          }
          subtitle="A loop for tasks too big for one prompt."
          date="Monday, 2 November 2026"
        />
      ),
    },
    {
      title: "Recap: three scoped tasks",
      minutes: 8,
      notes: [
        "Fill these blanks from the Week 2 homework posted in Teams. Fill them live or on a local copy; keep internal numbers out of the committed deck.",
        "Compare files read vs needed with the Week 1 traces. If /scoped-task closed the gap, say so: that is rule 2 working.",
        "Read out the rule changes from last week's vote, if any, and the most common 'one change to the skill' suggestion.",
        "Ask one or two people: which task was too big for /scoped-task? That is today's topic.",
      ],
      content: (
        <CardGridSlide
          eyebrow="Recap · Week 2 homework"
          title="What /scoped-task did"
          columns={4}
          cards={[
            {
              title: "Tasks posted",
              accent: true,
              body: (
                <>
                  In Teams
                  <div className="mt-4 text-[64px] font-bold text-accent">__</div>
                  from __ people
                </>
              ),
            },
            {
              title: "Agent steps",
              body: (
                <>
                  Median per task
                  <div className="mt-4 text-[64px] font-bold text-accent">__</div>
                  Week 1: __
                </>
              ),
            },
            {
              title: "Files read",
              body: (
                <>
                  Read vs needed
                  <div className="mt-4 text-[64px] font-bold text-accent-2">__ / __</div>
                  Week 1: __ / __
                </>
              ),
            },
            {
              title: "Would merge",
              body: (
                <>
                  As is or with changes
                  <div className="mt-4 text-[64px] font-bold text-accent">__ / __</div>
                  tasks
                </>
              ),
            },
          ]}
          footnote="Which task was too big for one scoped prompt?"
        />
      ),
    },
    {
      title: "Today",
      minutes: 1,
      notes: [
        "Same shape as every Monday. Today's artifact: one research.md and one plan.md per pair, for a real ticket.",
        "The hands-on starts by 3:32 at the latest.",
      ],
      content: (
        <StepsSlide
          eyebrow="Today"
          title="From one prompt to a loop"
          steps={[
            { label: "10", unit: "min", title: "Recap + one number", desc: "What your three scoped tasks showed" },
            { label: "20", unit: "min", title: "The loop + demo", desc: "Research, plan, implement, test on a real ticket" },
            { label: "20", unit: "min", title: "Hands-on: research and plan", desc: "Dev + QA pairs; QA reviews the plan" },
            { label: "10", unit: "min", title: "Takeaways + homework", desc: "Take one ticket through the whole loop" },
          ]}
        />
      ),
    },
    {
      title: "Why one chat fails",
      minutes: 2,
      notes: [
        "Picture a medium ticket: two apps, a new endpoint, a daily job, a file format, edge cases. Ask for it in one prompt and four things go wrong.",
        "The context fills with everything the agent read while exploring, and every later step pays for it again (Week 1).",
        "The agent makes design decisions on its own, silently: how to split a discount, which ID to use. You find out in review, if at all.",
        "The result is one huge diff that nobody can review properly. And when it goes wrong, you start again from zero.",
      ],
      content: (
        <BulletsSlide
          eyebrow="The problem"
          title="A big task in one chat"
          items={[
            <>
              <b className="text-strong">Context fills up</b> with everything it explored
            </>,
            <>
              <b className="text-strong">Decisions happen silently</b>, inside the code
            </>,
            <>
              <b className="text-strong">One huge diff</b> nobody can review well
            </>,
            <>
              <b className="text-strong">A wrong turn</b> means starting again
            </>,
          ]}
          aside={
            <Card title="Rule 4 from Week 2" accent>
              Big task: plan first, check the plan, then implement in a fresh chat.
              <div className="mt-4 text-strong">Today it becomes a workflow.</div>
            </Card>
          }
        />
      ),
    },
    {
      title: "The loop",
      minutes: 3,
      notes: [
        "Four steps, each in its own fresh chat. What carries over between chats is a short file, not the conversation.",
        "Research: a strong model reads the code and edits nothing. It writes research.md: which files matter, how it works today, open questions.",
        "Plan: a strong model proposes two options, we pick one, and it writes plan.md: steps, files, checks, and what is out of scope.",
        "Implement: a fresh chat per plan step, often with a light model, using /scoped-task with the step as input.",
        "Test: run the checks from the plan; QA tests against the acceptance criteria.",
        "Why it saves credits: the long research history is thrown away. Only one or two pages move on, so implementation starts small and cheap.",
        "Source: the research, propose, plan, implement, test loop taught in Stanford CS146S and in the course I am following.",
      ],
      content: (
        <div className="flex h-full flex-col">
          <SlideHeader eyebrow="The loop" title="Four chats, two files" />
          <LoopDiagram />
          <p className="pt-8 text-[32px] text-body">
            The chat is thrown away. The <span className="text-accent-2">file</span> carries the work
            forward.
          </p>
        </div>
      ),
    },
    {
      title: "Research",
      minutes: 2,
      notes: [
        "Research is reading, not writing. Tell the agent explicitly: do not edit any file.",
        "Give it the ticket and the places to start. Ask for a short research.md, not a chat answer, so the next chat can read it.",
        "The most valuable section is Open questions. Every question you answer now is a decision the agent will not make silently later.",
        "Use a strong model here: it reads many files and has to reason about how they connect. This is where the money is well spent.",
      ],
      content: (
        <BulletsSlide
          eyebrow="Step 1 · strong model · no edits"
          title="Research: understand before you change"
          items={[
            "Give it the ticket and where to start",
            "It reads the code and edits nothing",
            "It writes research.md, one or two pages",
            "Open questions go to the ticket owner",
          ]}
          aside={
            <Card title="research.md" accent>
              <pre className="font-mono text-[24px] leading-relaxed text-body-hi">
                {`# Goal (from the ticket)
# Files that matter
# How it works today
# Open questions
# Risks`}
              </pre>
            </Card>
          }
        />
      ),
    },
    {
      title: "Questions before code",
      minutes: 2,
      notes: [
        "A real ticket from our team, described generically: a daily report of all placed orders, one row per product, sent to a data warehouse. One app exposes an orders API; another builds the daily file.",
        "Before any code, the team sent two rounds of questions to the product owner: 11 in total. Four examples on the slide.",
        "Each one would otherwise have been a silent decision in the code. For example, a discount stored per order has to be split across products somehow; the agent would pick a rule and nobody would notice until the numbers did not add up.",
        "This is exactly what research is for. The team did it by hand; the agent can find most of these questions for us.",
      ],
      content: (
        <CardGridSlide
          eyebrow="A real ticket · daily order report"
          title="11 questions answered before any code"
          columns={2}
          cards={[
            {
              title: "Order discount, many products",
              accent: true,
              body: "How is one order-level discount split across product rows?",
            },
            {
              title: "Which amount",
              body: "Device price or the full order? With or without tax?",
            },
            {
              title: "Cancelled later",
              body: "Already reported on day 1. Is a reversal row needed?",
            },
            {
              title: "Which ID",
              body: "Internal order ID or the customer-facing order number?",
            },
          ]}
          footnote="Each one would have been a silent decision inside the code."
        />
      ),
    },
    {
      title: "Propose and plan",
      minutes: 3,
      notes: [
        "Propose: in a fresh chat, give the agent research.md and ask for two genuinely different options, with trade-offs. Not two variants of the same idea.",
        "For our ticket: A, the first app exposes an orders API and the second calls it; B, the first app writes its own daily file and the second merges it. The team chose A. Write down why in one line.",
        "Plan: the same chat writes plan.md. Each step is small enough to be one /scoped-task: goal, files, done when.",
        "Out of scope is explicit: for us, the existing report stays unchanged, cashback is excluded, and the file location is not decided yet.",
        "QA reviews the plan before any code: does it cover every acceptance criterion and the edge cases? This is where QA joins the loop early.",
      ],
      content: (
        <BulletsSlide
          eyebrow="Step 2 · strong model · fresh chat"
          title="Two options, one plan"
          items={[
            "Input: research.md and the answered questions",
            "Two different options with trade-offs; pick one",
            "Each step is one scoped task",
            "Out of scope written down",
            "QA reviews the plan before any code",
          ]}
          aside={
            <Card title="plan.md" accent>
              <pre className="font-mono text-[24px] leading-relaxed text-body-hi">
                {`# Chosen option + why
# Rules / out of scope
# Steps
  1. goal · files · done when
  2. ...
# Test plan (from the AC)`}
              </pre>
            </Card>
          }
        />
      ),
    },
    {
      title: "Implement and test",
      minutes: 2,
      notes: [
        "Implement one plan step per fresh chat. Paste or attach plan.md and say: do step 2 only. /scoped-task fits exactly: the step already has goal, files and done when.",
        "Start with a light model: the thinking happened in the plan. Step up only if it fails twice (rule 3).",
        "Commit after each step, so a wrong turn costs one step, not the whole task.",
        "Test: run the checks the plan names. QA turns the acceptance criteria into cases; for our ticket, for example: two products in one order give two rows; the same product twice gives quantity 2; row amounts add up to the order total; a later cancellation gives a reversal row on that day.",
      ],
      content: (
        <TableSlide
          eyebrow="Steps 3 and 4 · light model first"
          title="One step per chat, then prove it"
          headers={["Step", "How", "Model"]}
          rows={[
            ["Implement", "Fresh chat, /scoped-task with one plan step", "Light"],
            ["Commit", "After each step, so a wrong turn is cheap", "-"],
            ["Check", "Run the done-when check from the plan", "Light"],
            ["QA cases", "Every AC, plus edge and negative cases", "Light"],
            ["Stuck twice", "Step up in a fresh chat with the plan", "Strong"],
          ]}
        />
      ),
    },
    {
      title: "Live demo",
      minutes: 6,
      notes: [
        "VS Code, Copilot, Agent mode, a strong model, on the repo for the demo ticket. Use the private demo script (not in the public deck).",
        "Chat 1: run the research prompt on the right. Point out: it only reads. Open research.md when it finishes and read the open questions aloud. Compare them with the questions the team actually asked.",
        "Chat 2 (new chat): give it research.md, ask for two options and then plan.md. Show the steps and the out-of-scope list.",
        "Do not implement live; that is the homework. If time is short, show a research.md and plan.md you prepared this morning.",
        "Count the steps of each chat aloud, and compare the size of research.md with the length of the research chat.",
      ],
      content: (
        <BulletsSlide
          eyebrow="Live demo"
          title="Research and plan a real ticket"
          items={[
            "Chat 1: research, no edits, writes research.md",
            "Read its open questions aloud",
            "Chat 2: two options, then plan.md",
            "Compare the file size with the chat length",
          ]}
          aside={
            <Card title="Research prompt" accent>
              <div className="font-mono text-[24px] leading-snug text-body-hi">
                Research this ticket. Do not edit any file. Start in{" "}
                <span className="text-accent-2">[folders]</span>. Write research.md: files that
                matter, how it works today, open questions, risks.
                <br />
                <span className="text-accent-2">[ticket text]</span>
              </div>
            </Card>
          }
        />
      ),
    },
    {
      title: "Hands-on: research and plan",
      minutes: 20,
      notes: [
        "Pairs: one developer, one QA. Pick one real, medium ticket: more than one file, ideally with acceptance criteria. No customer data.",
        "8 minutes: research chat, strong model, no edits, research.md. 7 minutes: new chat, two options, plan.md. 5 minutes: QA reviews the plan against the acceptance criteria and adds the test plan.",
        "Use /research and /plan from the shared playbook repo if you installed them; otherwise type the prompt from the demo slide.",
        "Post in Teams: the open questions it found, the number of plan steps, and what QA added. Do not implement today.",
      ],
      content: (
        <BulletsSlide
          eyebrow="Hands-on · 20 min · pairs"
          title="Research and plan one real ticket"
          items={[
            "8 min: research chat, no edits, research.md",
            "7 min: new chat, two options, plan.md",
            "5 min: QA reviews the plan against the AC",
            "Post the numbers in Teams; no code today",
          ]}
          aside={
            <Card title="Post in Teams" accent>
              <ul className="space-y-2">
                <li>Ticket type: ________</li>
                <li>Research steps: ____</li>
                <li>Open questions found: ____</li>
                <li>Plan steps: ____</li>
                <li>QA added: ________</li>
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
        "Ask first: what surprised you in the research? Then go through the five points.",
        "The key habit: for anything bigger than one scoped task, the file carries the work, not the chat.",
      ],
      content: (
        <BulletsSlide
          eyebrow="Takeaways"
          title="What to keep"
          items={[
            "Big task: research, plan, implement, test",
            "A fresh chat for each step; files carry the work",
            "Strong model to think, light model to type",
            "Questions answered before code, not in review",
            "QA reviews the plan, not just the result",
          ]}
        />
      ),
    },
    {
      title: "This week and next Monday",
      minutes: 3,
      notes: [
        "Homework: take one real medium ticket through the whole loop. Details on the homework page.",
        "Next week (Week 4) we run the loop again in dev + QA pairs and review the credit rules with real usage.",
      ],
      content: (
        <BulletsSlide
          eyebrow="Commitments"
          title="Before next Monday"
          items={[
            "Take one medium ticket through the whole loop",
            "Keep research.md and plan.md with the PR",
            "Post your numbers in Teams by Friday, 5 PM",
            <>
              Details: <span className="text-accent">ai-in-development.vercel.app/homework/week-3</span>
            </>,
          ]}
          aside={
            <Card title="Next Monday · Week 4" accent>
              <div className="text-[34px] font-semibold text-strong">Dev + QA pair exercise</div>
              <ul className="mt-4 list-disc space-y-2 pl-7">
                <li>The loop on a shared ticket</li>
                <li>Credit rules with real usage</li>
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
        "Close by asking everyone which ticket on their board they will run through the loop this week.",
        "Remind: homework at ai-in-development.vercel.app/homework/week-3, numbers in Teams by Friday 5 PM.",
      ],
      content: (
        <ClosingSlide
          items={[
            "Which question did the research find that you would have missed?",
            "When is a task too small for the loop?",
            "Who should review a plan: the developer, QA or both?",
            "Which ticket will you run through the loop this week?",
          ]}
        />
      ),
    },
  ],
});
