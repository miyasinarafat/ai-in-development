# Week 2 presenter guide: Credit and token rules

Monday 26 October 2026, 3:00-4:00 PM · Deck: https://ai-in-development.vercel.app/week-2
Press `N` on any slide for speaker notes, `O` for the overview, `T` for the light theme.

**Goal for the hour:** the team agrees six credit rules (v1) and everyone has run `/scoped-task` once.
**Artifacts:** credit rules v1 and the `scoped-task` skill (`skills/scoped-task/SKILL.md`), both in the
shared repo.

**Lesson from Week 1:** the hands-on did not happen because the talk ran over. This time the hands-on
starts by **3:32** whatever happens. The cut list is below.

## Before 3 PM (about 90 minutes of prep)
| When | What |
|---|---|
| Morning | Watch Maven Week 2 ("the AI dev workflow") if not done. Note one point for Week 3. |
| 12:30 PM | Read the Week 1 worksheets in Teams. Work out the four numbers for slide 2 (below). |
| 1:00 PM | Copy `skills/scoped-task/` into the demo pilot repo at `.github/skills/scoped-task/`. In VS Code, Agent mode, type `/` and check that **scoped-task** shows up. |
| 1:15 PM | **Run the demo once** with a light model (prompt below). Note the steps, files read and the report. |
| 1:45 PM | Check your own **Usage this cycle** (profile picture → Copilot settings → Usage) so you can show where it is. |
| 2:00 PM | Prepare 3-4 small tickets (one per pair), including one QA story with acceptance criteria. |
| 2:15 PM | Click through the deck once with notes on (`N`). Fill the slide 2 blanks on a local copy, or plan to say them aloud. |
| 2:45 PM | Open: the deck, VS Code with Copilot on the demo repo, the Teams chat, and `skills/scoped-task/SKILL.md` to share. |

### Slide 2 numbers from the worksheets
| Blank | How to get it |
|---|---|
| Traces shared `__ / __` | Worksheets posted in Teams / people in the team |
| Agent steps, median and range | Sort the "Agent steps" answers; take the middle one, then lowest and highest |
| Files read vs needed `__ / __` | Median of "Files read" / median of "Files it actually needed" |
| Would merge `__ / __` | "Yes" + "With changes" answers / total traces |

Also pick two stories from the "Where did it waste steps?" answers to read out. If only a few traces
came in, say so plainly and move on; the hands-on covers the same ground.

## Run of show
| Clock | Slide | Min | What you do |
|---|---|---|---|
| 3:00 | 1 Title | 1 | One-sentence goal: rules plus our first skill. |
| 3:01 | 2 Recap | 8 | Read the four numbers. Two people tell their trace story in one minute each. |
| 3:09 | 3 Today | 1 | Agenda. Promise the hands-on starts by 3:32. |
| 3:10 | 4 Where credits go | 3 | Four cost drivers. Show where "Usage this cycle" is. |
| 3:13 | 5 Six rules | 5 | One sentence per rule. Link rule 2 to the read vs needed gap from slide 2. |
| 3:18 | 6 Model per task | 3 | "Start light, step up when it fails twice." Prices are in the notes. |
| 3:21 | 7 What a skill is | 2 | Folder + SKILL.md; only name and description load up front. |
| 3:23 | 8 Instructions, skill or MCP | 3 | Context cost comparison. Why our first piece is a skill. |
| 3:26 | 9 Our first skill | 2 | Walk the three steps. Show the real `SKILL.md` for 20 seconds. |
| 3:28 | 10 Live demo | 4 | `/scoped-task` in Copilot; count steps aloud. |
| 3:32 | 11 Hands-on | 19 | Pairs run one ticket (14 min), then share (5 min). |
| 3:51 | 12 Agree the rules | 3 | Keep / change / drop each rule. Name the open owners. |
| 3:54 | 13 Commitments | 2 | Homework: three scoped tasks, numbers by Friday. |
| 3:56 | 14 Discussion | 4 | One habit each. Close on time. |

**Running late? Cut in this order:** slide 8 to one sentence (30 s); slide 7 merged into slide 9;
recap stories down to one. Never cut the hands-on; if it is 3:35 when the demo ends, skip straight to it.

## Key facts to say (with sources)
- **Plan:** Copilot Enterprise, **3,900 AI credits per user per month**, pooled; 1 credit = $0.01;
  resets on the 1st. Code completions and next-edit suggestions are not billed.
- **Your own usage:** profile picture → **Copilot settings** → **Usage** → **Usage this cycle**.
  If credits run out, GitHub shows a banner to request more budget from the admin.
  (GitHub Docs, "Monitor your AI usage".)
- **Prices per 1M tokens (in / out):** GPT-5 mini $0.25 / $2; Claude Haiku 4.5 $1 / $5; GPT-5.4
  $2.50 / $15; Claude Sonnet 4.6 $3 / $15; cached input about 10x cheaper. (GitHub Docs, "Models and
  pricing". Re-check before quoting; prices change.)
- **Same session, two models:** about 97 credits on Sonnet 4.6 vs about 10 on GPT-5 mini (last week's
  calculator: 20 steps, 40k context).
- **Context cost:** each doubling of context costs roughly 6x more while the useful part barely grows
  (LangWatch analysis of 287k agent calls, Aug 2026).
- **Skills in Copilot:** project skills live in `.github/skills/<name>/SKILL.md` (also `.claude/skills/`
  and `.agents/skills/`); personal ones in `~/.copilot/skills/`. Only `name` and `description` are read
  up front; the body loads when relevant or with `/<name>`. `name` must be lowercase-with-hyphens and
  match the folder, or the skill silently fails to load. (VS Code docs, "Agent skills"; GitHub Docs,
  "Create skills".)
- **Tool bloat:** every MCP tool definition is sent on every call; early GitHub MCP exposed 100+ tools.

## Demo script (slide 10)
1. VS Code, Copilot Chat, **new chat**, **Agent** mode, a **light model** (for example GPT-5 mini).
2. Type `/` and show **scoped-task** in the menu.
3. Paste (fill the brackets with what you tested this morning):
   ```
   /scoped-task Add a unit test for [function] in [test file] covering an empty input.
   Test command: [command].
   ```
4. Point out: it shows **Goal / Files / Done when / Out of scope** before reading anything. Confirm it.
5. Count steps aloud. At the end, read its five-line report: files read vs needed.
6. Ask: "How does this compare with the Week 1 demo?"

**Fallbacks:** not in the `/` menu → check the folder is `.github/skills/scoped-task/` and the file
is `SKILL.md`, then reload the window. Still nothing → attach the file with `#file:` and say
"follow this skill". If the model ignores it, that is a good discussion point: skills are loaded by
relevance, not guaranteed.

## Hands-on (slide 11)
Paste this in the Teams chat at 3:32:
```
Hands-on (14 min): run one scoped task in pairs
1. Copy skills/scoped-task/ into your repo at .github/skills/scoped-task/
2. New chat, Agent mode, light model. Type /scoped-task + your ticket
3. Check the scope it proposes, confirm, let it run, review the result
4. Post here:
Pair: ____ + ____
Model: ____   Steps: ____   Files read: ____ (needed: ____)
Check passed? Y / N   Would merge? Y / N
One change to the skill or the rules: ____
```
QA pairs: paste acceptance criteria (no customer data) and ask for test cases as a table.
Early finishers: run the same ticket without the skill in a new chat and compare the steps.

## Likely questions
- **"Is a skill the same as copilot-instructions.md?"** No. Instructions load on every request; a skill
  loads only when relevant or when you call it. Facts in instructions, workflows in skills.
- **"Does the skill work in Claude Code or Codex too?"** The SKILL.md format is shared. Claude Code reads
  `.claude/skills/`; VS Code reads `.github/skills/`, `.claude/skills/` and `.agents/skills/`.
- **"Will a light model do worse work?"** Sometimes. Start light; switch to a strong model in a fresh
  chat after two failed tries. Our numbers will tell us where the line is.
- **"Why ask before reading files? It feels slower."** One question costs one short step; searching a
  repo for the right file costs many steps, each re-sending a growing context.
- **"Who changes the skill?"** Anyone, through a pull request to the shared repo. The skills owner merges.
- **"Can I see team totals?"** Your own usage is under Copilot settings. Team totals come from the org admins; the credit tracker owner collects them.

## After the session
1. Write the agreed rules (with any changes from the vote) into the shared repo as credit rules v1.
2. Apply the skill changes the pairs suggested, if the room agreed.
3. Post the homework link in Teams (message below).
4. Note who owns the credit tracker and review rubric.
5. Optional: LinkedIn and X posts with the `diagram-social-post` skill (for example, "6 Rules That Cut
   AI Coding Costs", public facts only).
6. Prepare Week 3: the research → plan → implement → test loop.

Message to post in Teams:
```
Week 2 homework: three scoped tasks (about 30 min extra, due Friday 5 PM)
https://ai-in-development.vercel.app/homework/week-2

1. Copy skills/scoped-task/ into your repo's .github/skills/
2. Use /scoped-task for three real tasks this week (new chat each time, light model first)
3. Note your Usage this cycle on Monday and Friday
4. Post the numbers here (template on the page)

No customer data or secrets in prompts.
```
