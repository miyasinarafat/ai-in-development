import type { HomeworkDef } from "@/lib/deck";
import Worksheet from "./Worksheet";

const homework: HomeworkDef = {
  title: "Trace one agent session",
  due: "Friday, 23 October 2026, 5 PM",
  effort: "About 45 minutes · alone or in a dev + QA pair",
  content: (
    <>
      <p>
        On Monday we saw that an agent is a model in a loop with tools, and that{" "}
        <strong>every step re-sends the whole context</strong>, which is what costs credits. This week
        you watch that loop on a real ticket and write down what happened. Week 2 turns everyone&apos;s
        numbers into our team&apos;s credit rules, so your trace matters.
      </p>

      <h2>Before you start (5 minutes)</h2>
      <ul>
        <li>
          Pick <strong>one small, real task</strong>: under an hour by hand. Best in{" "}
          <strong>Webnext (GP Web)</strong> or <strong>FlexiPlan (Web)</strong>; your current work is
          fine too. QA: see the QA option below.
        </li>
        <li>
          <strong>No customer or subscriber data, and no secrets</strong> in the prompt, logs or files
          you paste. Redact first.
        </li>
        <li>
          Open a <strong>new chat</strong> in Copilot, choose <strong>Agent</strong> mode, and note
          which model is selected.
        </li>
      </ul>

      <h2>Steps (30 minutes)</h2>
      <ol>
        <li>
          <strong>Write one scoped prompt</strong> using this template:
          <pre>{`Goal: <what should be true when you are done>
Files: <the files or folder to work in>
Done when: <test passes / output looks like ...>
Out of scope: <what it must not touch>`}</pre>
        </li>
        <li>
          <strong>Run it.</strong> Do not interrupt unless it is stuck for more than 2 minutes or about
          to do something wrong. Approve commands only if you understand them.
        </li>
        <li>
          <strong>Count while it runs:</strong> each action shown in the chat (read, search, edit,
          terminal) is one step. Note the files it read and the commands it ran.
        </li>
        <li>
          <strong>Review the result like a pull request.</strong> Would you merge it as it is, with
          changes, or not at all?
        </li>
        <li>
          If you can see your AI credit usage, note it before and after. If not, skip it; the credit
          tracker will pull team totals.
        </li>
        <li>
          <strong>Fill the worksheet</strong> below, press <strong>Copy my answers</strong>, and paste
          it in our Teams group chat.
        </li>
      </ol>

      <h2>Worksheet</h2>
      <p>Your draft stays in this browser until you clear it, so you can come back to it.</p>
      <Worksheet />

      <h2>Stretch (optional, 15 minutes)</h2>
      <p>
        Run the <strong>same prompt</strong> in a <strong>new chat</strong> with a cheaper model (for
        example GPT-5 mini). Compare the number of steps and the quality of the result. In the
        calculator we showed on Monday, the same session was about 10 times cheaper.
      </p>

      <h2>QA option</h2>
      <p>
        Use a real story&apos;s acceptance criteria and ask the agent for test cases or an automated
        test. Count steps the same way; &quot;files read&quot; may be zero.
      </p>
      <pre>{`Goal: test cases for the story below, as a table: case, steps, expected result.
Cover happy path, edge cases and negative cases.
Files: none, do not write code.
Done when: at least 10 cases, no duplicates.
Out of scope: anything not in the acceptance criteria.
<paste the acceptance criteria, without customer data>`}</pre>

      <h2>Example prompts</h2>
      <h3>Add a unit test</h3>
      <pre>{`Goal: add tests for calculateDiscount() covering zero, negative and over-100% values.
Files: tests/Unit/PriceTest.php only. Do not change src/.
Done when: vendor/bin/phpunit tests/Unit/PriceTest.php passes.
Out of scope: refactoring, other tests.`}</pre>
      <h3>Find a bug from a log</h3>
      <pre>{`Goal: explain the cause of this error. Do not edit anything until I confirm.
Files: modules/custom/<module>/
Done when: you point to the line and explain why it fails.
Out of scope: fixes in other modules.
<paste 5-10 log lines, redacted>`}</pre>
      <h3>Explain code (no edits)</h3>
      <pre>{`Goal: explain what <function> in <file> does: inputs, outputs, side effects.
Files: <file> only. Do not modify any file.
Done when: under 10 bullet points.`}</pre>

      <h2>A filled example</h2>
      <p>This is an illustration of the level of detail we need, not a real result.</p>
      <pre>{`Repo: Webnext (GP Web)        Ticket: add test for price formatter
Model: <model shown in Copilot>
Agent steps: 9   Files read: 6 (needed: 2)   Commands run: 3
Ran tests: Yes   Finished without help: Yes   Would merge: With changes
Where it wasted steps: searched the whole repo for the formatter instead of opening the file I named.
What I'd change: name the exact file and the test command in the prompt.`}</pre>

      <h2>Why we are doing this</h2>
      <ul>
        <li>To see the loop for yourself: steps, files, commands.</li>
        <li>To find where agents waste steps (and our credits) on our own code.</li>
        <li>To bring real numbers to Week 2, where we write the team&apos;s credit rules.</li>
      </ul>
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
