---
name: scoped-task
description: Turn a ticket or rough request into a scoped task (goal, where, rules, out of scope, done when, if unsure), confirm it, then do only that and report the steps used. Use when starting work on a ticket, bug, test or QA test-case request, or when the user types /scoped-task.
argument-hint: "[ticket text or one-line request]"
---

# Scoped task

Work on exactly one task, with the smallest context that gets it done. Every step re-sends the whole
conversation, so fewer files and fewer steps means fewer credits. Any decision the scope leaves open,
you will make silently, so the scope must say which decisions are already made.
Background and examples: `references/scoping-guide.md`.

## 1. Scope it first (no file reads yet)

Rewrite the request as (most important first):

```
Goal: <one checkable sentence: what is true when you are done>
Where: <repo / folder / files, and the branch the change lands on>
Rules: <decisions already made: pattern to follow, packages not to add, functions others rely on>
Out of scope: <what you must not touch>
Done when: <the check: test command passes, output looks like ..., diff touches only ...>
If unsure: <ask me | pick a reasonable option and report it>
```

- **Goal must be checkable.** A direction ("make it faster", "clean up X") is not a goal. Propose a
  checkable version ("p95 of /cart under 300 ms in the existing benchmark") and ask the user to confirm.
- **Size check.** If the goal needs "and then", spans two parts that could ship separately, or cannot
  be said in one sentence, propose a split and scope only the first part. If the task is faster to
  type than to describe, say so.
- Take files, rules and commands from the request. If a field is missing, ask one short question for
  all missing fields together. Do not search the repository to guess them. If the user cannot fill
  `Rules`, say the decision has not been made yet and ask them to decide it first.
- Leave out how to implement it (unless it is a rule), facts the code already shows, and filler like
  "be careful".
- For QA requests (test cases from acceptance criteria), `Where` is usually `none` and the output is a
  table: case, steps, expected result. Cover happy path, edge cases and negative cases.
- Show the scope and wait for the user to confirm or edit it.

## 2. Do only that

- Read the named files first. Open other files only when a named file points to them.
- Follow every `Rule`. Do not refactor, rename, reformat or "clean up" anything outside the goal; an
  unrequested change bundled in cannot be accepted separately.
- When a decision comes up that the scope does not cover, follow `If unsure`. Ask with one short
  question, or pick the simplest option that fits the rules and note it for the report.
- Run the `Done when` check (the test command, `git diff --stat` for the files touched, or a check of
  the output) and stop when it passes.
- If the task turns out bigger than the scope, stop and say what you found. Do not widen the scope
  yourself.
- Never paste customer or subscriber data, secrets or tokens into the chat or into files.

## 3. Report

End with at most six lines:

```
Done: <yes / partly / no> - <one line on what changed>
Files read: <n> (needed: <n>)   Files changed: <list>
Commands run: <list>
Check: <the Done when check and its result>
Decisions: <choices you made under "If unsure", or "none">
Next: <one suggestion, or "none">
```
