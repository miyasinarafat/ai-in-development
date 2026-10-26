import type { HomeworkDef } from "@/lib/deck";

const homework: HomeworkDef = {
  title: "Three scoped tasks",
  due: "Friday, 30 October 2026, 5 PM",
  effort: "About 30 minutes on top of your normal work",
  content: (
    <>
      <p>
        On Monday we agreed six credit rules and shipped our first shared skill,{" "}
        <strong>/scoped-task</strong>. This week you use it on real work, so we can see whether it
        actually saves steps and credits. Your numbers decide whether we keep, change or drop it.
      </p>

      <h2>Set up (5 minutes, once)</h2>
      <ol>
        <li>
          Copy the <code>skills/scoped-task/</code> folder from our shared repo into your project
          repo at <code>.github/skills/scoped-task/</code>. The folder name must stay{" "}
          <code>scoped-task</code>.
        </li>
        <li>
          In VS Code, open Copilot Chat in <strong>Agent</strong> mode and type <code>/</code>. You
          should see <strong>scoped-task</strong> in the list.
        </li>
        <li>
          On Monday, note your <strong>Usage this cycle</strong>: profile picture,{" "}
          <strong>Copilot settings</strong>, <strong>Usage</strong>.
        </li>
      </ol>

      <h2>Each task (about 5 minutes of extra effort)</h2>
      <ol>
        <li>Start a <strong>new chat</strong> and pick a light model unless the task needs planning.</li>
        <li>
          Type <code>/scoped-task</code> followed by the ticket text. Check the scope it proposes and
          correct it before you confirm.
        </li>
        <li>Let it work. Review the result like a pull request.</li>
        <li>Copy the five-line report it ends with.</li>
      </ol>
      <p>
        <strong>No customer or subscriber data, and no secrets</strong> in prompts, logs or files you
        paste. Redact first.
      </p>

      <h2>Post in Teams by Friday</h2>
      <p>One message with all three tasks, plus your usage on Monday and Friday:</p>
      <pre>{`Week 2 homework: three scoped tasks
Name:
Usage this cycle, Monday: ____   Friday: ____

Task 1: <one line>
Model: ____   Steps: ____   Files read: ____ (needed: ____)
Check passed? Y / N   Would merge? Y / N / With changes

Task 2: <one line>
Model: ____   Steps: ____   Files read: ____ (needed: ____)
Check passed? Y / N   Would merge? Y / N / With changes

Task 3: <one line>
Model: ____   Steps: ____   Files read: ____ (needed: ____)
Check passed? Y / N   Would merge? Y / N / With changes

One change I would make to the skill or the rules:`}</pre>

      <h2>QA option</h2>
      <p>Use a real story&apos;s acceptance criteria (without customer data):</p>
      <pre>{`/scoped-task Write test cases for the story below as a table:
case, steps, expected result. Happy path, edge and negative cases.
Do not write code.
<paste the acceptance criteria>`}</pre>

      <h2>The six credit rules (v1)</h2>
      <ol>
        <li><strong>Fresh chat</strong> for each task.</li>
        <li><strong>Scope it:</strong> goal, files, done when, out of scope.</li>
        <li><strong>Right model:</strong> light for routine work, strong for planning and hard bugs.</li>
        <li><strong>Plan first</strong> for big tasks, then implement in a fresh chat.</li>
        <li><strong>Short instruction files:</strong> they load on every call.</li>
        <li><strong>Few tools:</strong> every tool definition is sent on every call.</li>
      </ol>

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
