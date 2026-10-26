---
name: scoped-task
description: Turn a ticket or rough request into a scoped task (goal, files, done when, out of scope), confirm it, then do only that and report the steps used. Use when starting work on a ticket, bug, test or QA test-case request, or when the user types /scoped-task.
argument-hint: "[ticket text or one-line request]"
---

# Scoped task

Work on exactly one task, with the smallest context that gets it done. Every step re-sends the whole
conversation, so fewer files and fewer steps means fewer credits.

## 1. Scope it first (no file reads yet)

Rewrite the request as:

```
Goal: <what should be true when you are done>
Files: <the files or folder to work in>
Done when: <test passes / output looks like ...>
Out of scope: <what you must not touch>
```

- Take files and commands from the request. If a field is missing, ask one short question for all
  missing fields together. Do not search the repository to guess them.
- For QA requests (test cases from acceptance criteria), `Files` is usually `none` and the output is a
  table: case, steps, expected result. Cover happy path, edge cases and negative cases.
- Show the scope and wait for the user to confirm or edit it.

## 2. Do only that

- Read the named files first. Open other files only when a named file points to them.
- Do not refactor, rename or reformat anything outside the goal.
- Run the `Done when` check (the test command, or a check of the output) and stop when it passes.
- If the task turns out bigger than the scope, stop and say what you found. Do not widen the scope
  yourself.
- Never paste customer or subscriber data, secrets or tokens into the chat or into files.

## 3. Report

End with at most five lines:

```
Done: <yes / partly / no> - <one line on what changed>
Files read: <n> (needed: <n>)   Files changed: <list>
Commands run: <list>
Check: <the Done when check and its result>
Next: <one suggestion, or "none">
```
