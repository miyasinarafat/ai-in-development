import type { HomeworkDef } from "@/lib/deck";

const homework: HomeworkDef = {
  title: "One ticket through the whole loop",
  due: "Friday, 6 November 2026, 5 PM",
  effort: "About 1 hour of extra effort on top of a ticket you are doing anyway · alone or in a dev + QA pair",
  content: (
    <>
      <p>
        On Monday we split a big task into four chats: <strong>research, plan, implement, test</strong>.
        Each chat starts fresh, and a short file carries the work to the next one. This week you run
        the whole loop on one real ticket, so we can see whether it saves credits and rework.
      </p>

      <h2>Pick the ticket (5 minutes)</h2>
      <ul>
        <li>
          One <strong>real, medium ticket</strong>: more than one file, ideally with acceptance
          criteria. Too small for the loop? Use <code>/scoped-task</code> instead.
        </li>
        <li>
          <strong>No customer or subscriber data, and no secrets</strong> in prompts or in the two
          files. Redact first.
        </li>
        <li>
          Optional: install <code>/research</code> and <code>/plan</code> from the shared playbook repo
          (<code>scripts/install.sh &lt;your-repo&gt; research plan</code>).
        </li>
      </ul>

      <h2>Run the loop</h2>
      <ol>
        <li>
          <strong>Research</strong> (new chat, strong model). The agent reads and edits nothing:
          <pre>{`Research this ticket. Do not edit any file.
Start in: <folders or files>
Write research.md with: goal, files that matter, how it works today,
open questions, risks.
<paste the ticket text>`}</pre>
          Send the open questions to the ticket owner, or answer them yourself, before you plan.
        </li>
        <li>
          <strong>Plan</strong> (new chat, strong model):
          <pre>{`Read research.md. Propose two different options with trade-offs.
After I pick one, write plan.md with: chosen option and why,
rules and out of scope, numbered steps (each: goal, files, done when),
and a test plan from the acceptance criteria. Do not write code.`}</pre>
          QA (or a colleague) reviews <code>plan.md</code> against the acceptance criteria.
        </li>
        <li>
          <strong>Implement</strong> (a new chat per step, light model first):{" "}
          <code>/scoped-task Do step 1 of plan.md only.</code> Review and commit after each step.
        </li>
        <li>
          <strong>Test</strong>: run the checks from the plan. QA runs the test plan.
        </li>
      </ol>
      <p>
        Keep <code>research.md</code> and <code>plan.md</code> out of the main branch unless your team
        wants them; attach them to the pull request or ticket instead.
      </p>

      <h2>Post in Teams by Friday</h2>
      <pre>{`Week 3 homework: one ticket through the loop
Name:
Ticket type: <one line, no internal details>

Research: model ____  steps ____  open questions found ____
Plan: model ____  steps in plan ____  QA review added: ____
Implement: chats ____  model ____  stepped up to strong? Y / N
Test: checks passed? Y / N   QA found issues? Y / N
Would merge? Y / N / With changes

Compared with one big chat, the loop was: better / same / worse, because:`}</pre>

      <h2>QA option</h2>
      <p>
        Take a story that a developer is about to start. Run the research step on its acceptance
        criteria (no code needed) and post the open questions to the story before development
        begins. Then review the developer&apos;s <code>plan.md</code> and add the test plan.
      </p>

      <p>
        Questions? Ask in the Teams group chat. Slides from every week:{" "}
        <a className="text-accent underline" href="https://ai-in-development.vercel.app">
          ai-in-development.vercel.app
        </a>
        .
      </p>
    </>
  ),
};

export default homework;
