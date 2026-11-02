# Week 3 presenter guide: Research, plan, implement, test

Monday 2 November 2026, 3:00-4:00 PM · Deck: https://ai-in-development.vercel.app/week-3
Press `N` on any slide for speaker notes, `O` for the overview, `T` for the light theme.

**Goal for the hour:** everyone can take a ticket that is too big for one prompt through research and
plan, in separate chats, with a short file carrying the work forward.
**Artifacts:** one `research.md` and one `plan.md` per pair, and the `/research` and `/plan` prompts
in the shared playbook repo.

The demo uses a real team ticket. Its details are in the private demo script
(`.claude/week-3-demo.md`, gitignored), not in this file or the public deck.

## Before 3 PM (about 90 minutes of prep)
| When | What |
|---|---|
| Morning | Read the Week 2 homework posts in Teams. Work out the four numbers for slide 2. |
| 12:30 PM | Install the prompts in the demo repo: `scripts/install.sh <demo-repo> research plan scoped-task` from the playbook. Type `/` in Copilot and check `research` and `plan` show up. |
| 12:45 PM | **Run the demo once** (private demo script): research chat, then plan chat, strong model. Keep the `research.md` and `plan.md` it writes as the fallback. Note the step counts. |
| 1:45 PM | Compare its open questions with the questions the team actually asked on the ticket. Pick two to read out. |
| 2:00 PM | Prepare 3-4 medium tickets for the pairs (more than one file, with acceptance criteria). |
| 2:15 PM | Click through the deck once with notes on (`N`). Fill slide 2 on a local copy or plan to say it aloud. |
| 2:45 PM | Open: the deck, VS Code with Copilot on the demo repo, the Teams chat, the fallback files. |

### Slide 2 numbers from the Week 2 homework
| Blank | How to get it |
|---|---|
| Tasks posted, from `__` people | Count the tasks in the Teams posts, and the people who posted |
| Agent steps, median (Week 1: `__`) | Middle value of all "Steps" answers; Week 1 median from last week's slide |
| Files read vs needed | Median "Files read" / median "needed"; same from Week 1 |
| Would merge | "Y" + "With changes" / total tasks |

Also read out any rule changes from the Week 2 vote and the most common suggested skill change.

## Run of show
| Clock | Slide | Min | What you do |
|---|---|---|---|
| 3:00 | 1 Title | 1 | One sentence: today is about tasks too big for one prompt. |
| 3:01 | 2 Recap | 8 | The four numbers. Ask: which task was too big for `/scoped-task`? |
| 3:09 | 3 Today | 1 | Agenda. Hands-on starts by 3:32. |
| 3:10 | 4 Why one chat fails | 2 | Four failure modes. Link to rule 4. |
| 3:12 | 5 The loop | 3 | Four chats, two files. "The chat is thrown away; the file carries the work." |
| 3:15 | 6 Research | 2 | No edits. Open questions are the most valuable part. |
| 3:17 | 7 Questions before code | 2 | The real ticket, generically: 11 questions answered before code. |
| 3:19 | 8 Propose and plan | 3 | Two options, one plan, out of scope, QA reviews the plan. |
| 3:22 | 9 Implement and test | 2 | One step per chat with `/scoped-task`, light model, commit per step. |
| 3:24 | 10 Live demo | 6 | Research chat, then plan chat (private script). |
| 3:30 | 11 Hands-on | 20 | Pairs: 8 min research, 7 min plan, 5 min QA review. Post in Teams. |
| 3:50 | 12 Takeaways | 3 | Ask what surprised them first. |
| 3:53 | 13 Homework | 3 | One ticket through the whole loop by Friday. |
| 3:56 | 14 Discussion | 4 | Which ticket will you run through the loop? Close on time. |

**Running late? Cut in this order:** slide 9 to one sentence; slide 6 merged into slide 5; demo down
to the research chat only, then show the prepared `plan.md`. Never cut the hands-on.

## Key points to say
- **Why separate chats:** each step re-sends the whole context (Week 1). Research reads many files;
  if that history stays in the chat, every implementation step pays for it again. A one- or two-page
  `research.md` replaces it.
- **Strong model to think, light model to type:** research and plan are where reasoning pays off.
  Implementation from a good plan step is routine work (Week 2, rule 3).
- **Two options, not one:** asking for two genuinely different options stops the agent from running
  with its first idea, and makes the trade-off a human decision.
- **Out of scope is part of the plan**, not an afterthought.
- **QA reviews the plan:** missing acceptance criteria and edge cases are cheapest to fix before code.
- **Source:** the research, propose, plan, implement, test loop (RePPIT) from Stanford CS146S and the
  course Arafat is following. Mention it; do not share course material.

## Hands-on (slide 11)
Paste this in the Teams chat at 3:30:
```
Hands-on (20 min): research and plan one real ticket, in pairs
1. 8 min: new chat, strong model, /research (or the prompt on the slide). No edits.
2. 7 min: new chat, /plan with research.md. Pick an option. Get plan.md.
3. 5 min: QA reviews plan.md against the acceptance criteria and adds missing cases.
4. Post here:
Pair: ____ + ____   Ticket type: ____
Research steps: ____   Open questions found: ____
Plan steps: ____   QA added: ____
```
No code today. No customer data in prompts.

## Likely questions
- **"Isn't four chats slower than one?"** For a small task, yes: use `/scoped-task`. For a medium
  task, the time goes into research and plan, and implementation and review get much faster.
- **"Where do research.md and plan.md live?"** In the working folder while you work. Attach them to
  the PR or ticket; commit them only if the team wants them in the repo.
- **"Can the agent answer its own open questions?"** Only the ones the code answers. Business
  decisions (amounts, IDs, what counts as a reversal) go to the ticket owner.
- **"Which strong model?"** The one from the Week 2 table. Watch the step count; research on a
  strong model is fine, a 40-step research is a sign the start folders were too vague.
- **"What if the plan is wrong halfway?"** Stop, update `plan.md` in a planning chat, then continue.
  Do not let the implementation chat redesign as it goes.

## After the session
1. Collect the hands-on posts. Note the median open questions found and plan steps.
2. Post the homework link in Teams (message below).
3. Optional: LinkedIn and X posts with the `diagram-social-post` skill (for example "How the
   Research, Plan, Implement, Test Loop Works", public facts only, no ticket details).
4. Prepare Week 4: dev + QA pair exercise, and the credit rules review with real usage.

Message to post in Teams:
```
Week 3 homework: one ticket through the whole loop (about 1 hour extra, due Friday 5 PM)
https://ai-in-development.vercel.app/homework/week-3

1. Pick one real, medium ticket (more than one file)
2. Research (new chat, no edits) -> research.md
3. Plan (new chat, two options) -> plan.md, reviewed by QA
4. Implement one plan step per chat with /scoped-task, then test
5. Post your numbers here (template on the page)

/research and /plan are in the playbook repo. No customer data or secrets in prompts.
```
