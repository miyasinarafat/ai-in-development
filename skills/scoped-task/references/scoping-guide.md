# Scoping guide

Background for the `scoped-task` skill. Read this when a scope is hard to write or a result went wrong.

Sources: CommandSlate, "How to scope a task for an AI coding agent"
(https://commandslate.ai/learn/how-to-scope-a-task/), and our own Week 1-2 sessions of the
AI in Development program (https://ai-in-development.vercel.app).

## Why scoping matters
- When you code yourself, you settle small decisions as you type. When an agent codes, every decision
  you did not write down is made for you: which library, which file, how errors are handled.
- A scope is not a prompt. It describes the work so that someone else could do it, and so that you
  can judge afterwards whether it was done.
- It also saves credits: a scoped task reads fewer files and takes fewer steps.

## The six fields
| Field | What it answers | Weak | Strong |
|---|---|---|---|
| Goal | What is true when done? One checkable sentence. | "Improve the cart page" | "The cart total includes the promo discount once, not twice" |
| Where | Repo, folder, files, branch | "the cart code" | "`src/Cart.php`, `tests/CartTest.php`, branch `fix/cart-discount`" |
| Rules | Decisions already made | (missing) | "Keep the existing `PriceCalculator` pattern; no new packages; `cart_total()` signature stays" |
| Out of scope | What must not be touched | (missing) | "No changes to `Promo.php` or the checkout flow" |
| Done when | The check you will run at review | "it works" | "`vendor/bin/phpunit tests/CartTest.php` passes; diff touches only the two files above" |
| If unsure | Ask, or pick and report | (missing) | "Ask before changing any public function" |

Tip: if you cannot fill **Rules**, you have not made that decision yet. Make it before the agent does.

## Right size
- **Target:** a change you can review completely in one sitting. The limit is the reviewer's attention,
  not the agent's.
- **Too big:** the goal is not one sentence, it spans two parts that could ship separately, or the
  description keeps saying "and then". Split it at each "and then".
- **Too small:** writing the scope takes longer than making the change. Do it by hand, or batch several
  tiny changes into one task.

## What to leave out
- Implementation steps you do not care about. Either it matters (make it a Rule) or let the agent choose.
- Facts the code already shows. The agent can read the repo, and descriptions go stale.
- Filler like "be careful" or "think hard". If care matters somewhere, name the place.

## Four ways it goes wrong
1. **The goal was a direction.** "Make it faster" can only be judged by taste. Rewrite it as a check
   and run again.
2. **The rule was only in your head.** Good code in the wrong place, or with a new dependency, means
   the scope was missing a rule. Add it.
3. **Two tasks in one.** A fix plus an unrequested cleanup can only be accepted or rejected together.
   Keep them separate.
4. **The task became a chat.** Steering the agent every few steps keeps you busy and saves only typing.
   Put the steering into the scope instead.
