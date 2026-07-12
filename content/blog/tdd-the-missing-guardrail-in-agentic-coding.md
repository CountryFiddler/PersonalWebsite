---
title: "Why Test-Driven Development Is the Missing Guardrail in Agentic Coding"
date: "2026-07-09"
summary: "Agents get you most of the way there and then quietly break what was already working. Test-driven development is the feedback loop that protects against regressions in your codebase."
draft: false
---

Fix one thing, and another thing breaks. Fix the next bug, and the bug fixed ten minutes ago is now back. 
It's a never ending of cycle of two steps forward and two steps back with no real progress made. 

That was my life for a stretch while building Civic Leave. While first exploring
AI for agentic software development, I was having it work on setting up the logic for
the leave timeline, which documents a number of actions a user takes while managing a leave case. 
Unfortunately, every fix knocked something else loose. There was no system, no guardrail, and 
nothing stopping the agent from quietly undoing work that already worked.

Let's just say that it didn't take very long to understand that using AI tools for software development
with no system or gaurdrails, would be nothing short of disasterous. However, the potential benefits of
using AI properly were game-changing.

## The real problem isn't AI. It's the lack of a guardrail

Here's the thing people miss when they get frustrated with agentic coding: the model
is usually *good*. On a simple, well-defined task, a strong agent gets you 80–90% of the way there
on the first pass. 

But that last 10%-20% is where regressions live. And without a system, every
edit is basically shooting in the dark and hoping to hit your target. The agent changes 
a function, feels certain it's correct, and moves on, and you only discover the collateral 
damage later, by stumbling into it or worse, support tickets from multiple users complaining 
and being frustrated with your software.

You can't fix this by asking for a smarter model. You fix it with proper processes and guidelines
for your agentic software development system.

## Enter a real development lifecycle

The thing that broke the loop for me was adopting the [Superpowers](https://github.com/obra/superpowers)
plugin, which is a skills framework that enforces a structured software-development lifecycle
on the agent instead of letting it freestyle. It first brainstorms, plans, tests, then codes. 

Two parts that immediately improved my development process:

The first was simply doing **brainstorming and planning sessions before any code got written**.
Bad AI code starts when the agent confidently sprints in the
wrong direction. Forcing a plan first catches a majority of wrong turns. 

The second was **test-driven development (TDD)**. The agent writes a failing test *first*, then writes the code to make
it pass. This forces a system of continual testing as you develop, which eliminates a number of errors, catch new errors,
and write cleaner more testable code. 

## Why writing the failing test first works

When the agent writes the test first, it enters a feedback loop that iterates until the tests pass.
Once the tests pass, then the agent moves onto the next item to build or fix. The beauty in this is that 
if the agent then changes something that now causes previous tests to fail, it then fixes the bug it just created
without it sneaking into production without you knowing it.

An agent that's 80–90% right on the first try, given a failing test as a concrete
objective, will iterate against that test until it's as close to 100% as it can get.

Here's the shape of it, using something real from Civic Leave. The timeline on a leave
case is a running record of everything that happens to it whether a document gets uploaded, an
email goes out to the employee, a note gets added, the case status changes. Each of those
actions should drop its own entry onto the timeline.

So instead of asking the agent to "build the timeline" and hoping for the best, you start
with the rule itself, written as a failing test:

```ts
// timeline.test.ts
import { it, expect } from "vitest";
import { createLeaveCase, addNote, timelineFor } from "./leaveCase";

it("adds a timeline entry when a note is created", () => {
  const leaveCase = createLeaveCase();

  addNote(leaveCase, "Called employee to confirm return date");

  expect(timelineFor(leaveCase)).toContainEqual(
    expect.objectContaining({ type: "note" }),
  );
});
```

Run it, and it fails as nothing writes to the timeline yet. But now the agent has an unambiguous
target instead of a vague instruction, and it writes just enough code to make that test
pass.

```ts
// leaveCase.ts
export function addNote(leaveCase: LeaveCase, text: string) {
  leaveCase.notes.push({ text, createdAt: new Date() });
  leaveCase.timeline.push({ type: "note", text, at: new Date() });
}
```

Now it passes.

Two things are now true that weren't before: the behavior works, and it's continually tested. That
second part is what changes everything.

## How tests kill regression

The timeline was exactly where the regressions lived, and the
maddening part was that it didn't only break when I was working on the timeline. I'd be
changing something in a completely different corner of the app that had nothing to do with
documents, notes, or status and an entry would quietly stop showing up. There was no
reason to go back and re-check the timeline, so the bugs just sat there until I
happened to stumble into it.

Once each event was pinned by a test, that fear went away. I had a suite asserting the
timeline recorded every kind of event it was supposed to:

```ts
// timeline.test.ts
describe("leave case timeline", () => {
  it("records document uploads", () => {
    const leaveCase = createLeaveCase();
    uploadDocument(leaveCase, "fmla-form.pdf");
    expect(timelineFor(leaveCase)).toContainEqual(
      expect.objectContaining({ type: "document" }),
    );
  });

  it("records emails sent to the employee", () => {
    const leaveCase = createLeaveCase();
    sendEmail(leaveCase, "Your leave has been approved");
    expect(timelineFor(leaveCase)).toContainEqual(
      expect.objectContaining({ type: "email" }),
    );
  });

  it("records notes", () => {
    const leaveCase = createLeaveCase();
    addNote(leaveCase, "Spoke with the employee's manager");
    expect(timelineFor(leaveCase)).toContainEqual(
      expect.objectContaining({ type: "note" }),
    );
  });

  it("records status changes", () => {
    const leaveCase = createLeaveCase();
    changeStatus(leaveCase, "approved");
    expect(timelineFor(leaveCase)).toContainEqual(
      expect.objectContaining({ type: "status" }),
    );
  });
});
```

Now it didn't matter where in the app a change happened. The moment something knocked the
timeline loose, the relevant test failed right away. The bug didn't show up three edits later, not in production, but
right there in the same run. The regression never made it past my terminal, even when I
had no reason to suspect the timeline at all. That single shift, catching the break *at
the moment it happens* instead of discovering it downstream, is the difference between a
reliable, controlled agentic software development system and a wild west system.

## The discipline most people skip: *You* own the scenarios

Here's the part I want to push hardest, because TDD will fail if you don't do this.

Do not blindly trust the agent to write all of its own tests.

Left to its own devices, an agent tends to test the path it already believes
in. It won't think to test the rare edge cases or anything it doesn't know is important or critical,
that is, unless *you* tell it to.

That's the key for software engineers, and it's the part that doesn't get automated away. You bring the
scenarios, enumerate the cases that must never break, and direct the agent to prove them with tests.

TDD is only as good as the scenarios feeding it. The agent supplies the speed, however, you must
supply the judgment and guidance.

## The takeaway

Agentic development without tests is speed without brakes. The model gets you most of
the way there in pretty quickly. However, with no guardrails, you then spend your afternoon, day, or week fixing 
the remaining errors.

TDD is the feedback loop that lets you actually trust the code being generated.
Write the failing test first, so the agent has a guide on what to implement. Specify the functionality
that matters, so future edits can't break critical functions. Finally, bring your own scenarios, because the judgment about 
is still yours.
