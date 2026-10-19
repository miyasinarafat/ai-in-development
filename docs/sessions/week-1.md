# Week 1 presenter guide: How coding agents work

Monday 19 October 2026, 3:00-4:00 PM · Deck: https://ai-in-development.vercel.app/week-1
Press `N` on any slide for speaker notes, `O` for the overview, `T` for the light theme.

**Goal for the hour:** everyone can explain the agent loop in one sentence and say why a long agent
session burns credits. **Artifact:** one filled worksheet per pair (data for Week 2's credit rules).

## Before 3 PM (about 90 minutes of prep)
| When | What |
|---|---|
| Morning | Watch the Maven Week 1 lessons if not done ("How Coding Agents Use Tools", "Building a Coding Agent From Scratch"). Note one example you liked; mention it on slide 4. |
| 1:00 PM | Fill the Week 0 blanks on slide 2 (scorecard average, pilot repos, owners), or plan to fill them live. |
| 1:15 PM | Pick the **demo task** in a pilot repo (below) and **run it once**. Note the steps and files read, so you can predict what happens live. |
| 1:45 PM | Prepare 3-4 **small tickets** for the pairs (one per pair) in the pilot repos. |
| 2:15 PM | Click through the deck once with notes on (`N`). Try slide 6 (Next step) and slide 8 (calculator). |
| 2:45 PM | Open: the deck, VS Code with Copilot agent mode on the demo repo, the worksheet to share in chat. |

## Run of show
| Clock | Slide | Minutes | What you do |
|---|---|---|---|
| 3:00 | 1 Title | 1 | One-sentence goal for today. |
| 3:01 | 2 Recap | 7 | Read Week 0 results; go round for "your one number" (credits used). Ask who tried scoped prompts. |
| 3:08 | 3 Today | 2 | Agenda; explain the worksheet is today's artifact. |
| 3:10 | 4 The big idea | 2 | "An agent is an LLM in a loop with tools." Point at the 6-line loop. |
| 3:12 | 5 Four parts | 2 | Model, tools, context, harness. "When it goes wrong, which part caused it?" |
| 3:14 | 6 Step by step | 5 | Click **Next step** 11 times and narrate. Land on: ~19k context, ~99k input tokens billed. |
| 3:19 | 7 Harness | 3 | Everything here is tokens on every call: system prompt, instructions, tool list. |
| 3:22 | 8 Cost | 4 | Calculator: Sonnet default (~97 credits), switch to GPT-5 mini (~10), then drag context up. |
| 3:26 | 9 Live demo | 4 | Run the demo prompt in Copilot agent mode; count steps aloud. |
| 3:30 | 10 Hands-on | 20 | Pairs run one ticket each (15 min), share (5 min). Collect worksheets. |
| 3:50 | 11 Takeaways | 3 | Ask what surprised them first, then show the five points. |
| 3:53 | 12 Homework | 3 | One traced session each; bring numbers next Monday. |
| 3:56 | 13 Discussion | 4 | One habit each. Close on time. |

Running late? Shorten slide 7 to one sentence and the share-back to 3 minutes. Never cut the hands-on.

## Key facts to say (with sources)
- **Our plan**: Copilot Enterprise includes **3,900 AI credits per user per month**, pooled across the
  organisation; 1 credit = $0.01; unused credits reset on the 1st. Code completions and next-edit
  suggestions are **not** billed. (GitHub Docs, "Billing for organizations and enterprises".)
- **How it is charged**: per token (input, cached input, output) at each model's price.
  Examples per 1M tokens: GPT-5 mini $0.25 in / $2 out; Claude Haiku 4.5 $1 / $5; GPT-5.4 $2.50 / $15;
  Claude Sonnet 4.6 $3 / $15; cached input is about 10x cheaper. (GitHub Docs, "Models and pricing".)
  Check the docs before quoting prices again; they change.
- **The loop**: Stanford CS146S builds a working coding agent in about 200 lines with three tools
  (read file, list files, edit file). Everything else in a product is the harness around it.
- **Tool bloat**: Claude Code ships about 40 built-in tools; early MCP servers such as GitHub's exposed
  100+ tools, which crowded the context and confused models.
- **Context cost**: an analysis of 287k agent API calls (LangWatch, Aug 2026) found each doubling of
  context costs roughly 6x more, while the useful part of the context barely grows.

## Demo script (slide 9)
1. VS Code, Copilot Chat, **Agent** mode, on a pilot repo. Choose the model you want to show.
2. Paste (fill the brackets with a real file and function you tested this morning):
   ```
   In [tests/ExampleTest.php], add a unit test for [function name] covering an empty input.
   Only touch the test file. Run the tests and stop when they pass.
   ```
3. While it runs, point at each tool call (search, read, terminal), each approval, and the final edit.
   Count steps aloud.
4. Ask: "Which files did it read that it did not need?" Link back to slide 6's billed tokens.

Fallback if it hangs or fails: go back to slide 6 and walk the loop again. A failure is a good lesson:
ask what context it was missing.

## Hands-on worksheet (paste in the meeting chat)
```
Pair: ____________ + ____________   Repo: __________   Ticket: __________
Prompt used (goal, files, done-when, out of scope):
______________________________________________________
Model used: ________
Model steps (decisions it made): ____
Files read: ____   (files it actually needed: ____)
Commands run: ____     Did it run tests?  Y / N
Did it finish without help?  Y / N     Would you merge it?  Y / N
One thing that surprised us: __________________________
```

## Scoped prompt examples (for pairs who get stuck)
- **Test**: "In `tests/Unit/PriceTest.php`, add tests for `calculateDiscount()` covering zero, negative
  and over-100% values. Do not change `src/`. Run `vendor/bin/phpunit tests/Unit/PriceTest.php` and stop
  when it passes."
- **Bug from a log**: "This error appears in the log: `[paste 5 lines]`. Find the cause in
  `modules/custom/[module]/`. Explain it first; do not edit until I confirm."
- **Explain code (no edits)**: "Explain what `[function]` in `[file]` does, its inputs, outputs and side
  effects, in under 10 bullet points. Do not modify any file."
- **QA**: "From the acceptance criteria below, list the test cases (happy path, edge cases, negative
  cases) as a table. Do not write code. `[paste criteria]`"

## Likely questions
- **"Does every tool call cost credits?"** Yes. Each step is a model call that re-sends the context,
  billed per token. That is why a 30-step session costs far more than a 5-step one. (Older Copilot
  plans billed per prompt; our Enterprise plan bills tokens.)
- **"Are autocompletions free?"** Yes, code completions and next-edit suggestions are not billed.
- **"Which model should I use?"** Cheaper models for routine edits, tests and explanations; stronger
  ones for planning and tricky bugs. Week 2 turns this into team rules.
- **"Is it safe to paste production logs?"** Not if they contain customer or subscriber data. Redact
  first (ground rule from Week 0).
- **"Why did it read so many files?"** It builds its own context by searching. A scoped prompt that
  names files saves steps.
- **"What is MCP?"** A standard way to plug extra tools into an agent. Each tool adds to the context,
  so only add the ones we use. Covered properly later.

## After the session
1. Collect worksheets (or photos) and send them to the credit tracker.
2. Note the Week 0 numbers you filled live and keep them for the Week 12 comparison.
3. Merge the `week-1` branch so the deck stays at /week-1.
4. Optional: write a LinkedIn and X post with the `diagram-social-post` skill
   (for example, "Why Agent Sessions Cost Credits", using public facts only).
5. Prepare Week 2: credit and token rules, plus the team's first shared skill.
