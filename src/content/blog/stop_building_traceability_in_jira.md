---
title: "Stop Building Traceability in Jira"
description: "Jira is a task tracker, not a traceability tool. The engineering practice that actually satisfies your auditor takes thirty seconds and costs nothing."
date: "2026-03-21"
author: "RTMify"
---

# **Stop Building Traceability in Jira**

It's sprint planning, Monday morning. You're in a medical device shop, ISO 13485 / IEC 62304, maybe forty people, building a Class II patient monitoring system. You've got 200 requirements in a Word document that lives in the Document Management System. You've got 350 Jira tickets across six epics. You've got a QA lead with a spreadsheet open on her second monitor, manually cross-referencing Jira issue keys against the SRS to build a requirements traceability matrix for the audit next month.

She's on row 87. She's been at it since last Thursday. She will be at it until at least next Wednesday. The spreadsheet has columns for Requirement ID, Jira Story, Status, Test Case, and "Notes," which is where she writes things like "asked Marcus, waiting for response" and "think this was tested in Sprint 12 but can't find the result."

This is the state of the art. In 2026. At thousands of companies shipping regulated products.

There's a better way, and you don't need to buy anything to do it.

## **The copy-paste traceability trap**

Here's what happened. Your software team adopted Jira because it's a perfectly fine tool for managing sprints. Somebody put user stories in there. Somebody else started typing requirement IDs into a custom field, or into the description, or into labels. "Implements SRS-047." "See REQ-063." "Per SRS-031." A third person set up a different custom field with a different naming convention because they didn't know the first one existed.

Meanwhile the actual requirements document, the controlled one, the one with signatures and revision history that lives in the DMS, never moved. It's still a Word file. Or a spreadsheet. It stayed there because the quality system says requirements shall be maintained as controlled documents, and nobody validated Jira as a controlled tool, because validating Jira is its own multi-month compliance project and life is short.

So now you have two systems. Requirements in the DMS. Work items in Jira. And the traceability between them lives in a spreadsheet that your QA lead maintains by hand. She's the human join engine. She *is* the traceability. When she goes on vacation, the traceability goes on vacation.

(Every QA lead reading this just exhaled through their nose. Yeah. I see you.)

The Ketryx pitch says: bring everything into Jira. Eleven custom issue types. Requirements as tickets. Automated RTM generation from the Jira graph. And if you've got the budget and the discipline to go all-in on that, sure. It works. Ketryx is a real product solving a real problem.

But most shops don't go all-in. For most shops, requirements live in a document. Jira tracks sprints. A human builds the bridge that crosses the gap. This bridge is made of copy-paste, adrenaline sweat, and prayer.

## **What the Pragmatic Programmer already told you**

Hunt and Thomas published this in 1999. DRY. Don't Repeat Yourself. Every piece of knowledge must have a single, unambiguous, authoritative representation within a system.

Your traceability spreadsheet violates DRY so hard it should be an actual felony. It says "REQ-047 is implemented in foo.c." But foo.c doesn't say that. Foo.c just has code in it. The only record of the relationship between the requirement and the code is in a spreadsheet maintained by someone who didn't write the code, who might not understand the code, and who found the relationship by asking the developer over Slack four days after the commit.

That relationship will drift. It will drift within a single sprint, maybe two. The developer refactors foo.c, moves the relevant function into bar.c, and nobody tells the QA lead because why would they? It's a refactor. It doesn't change behavior. But the traceability spreadsheet now points at the wrong file. The RTM is wrong. Again.

The fix is so simple it almost doesn't feel like engineering.  It feels like a cheat code.

## **Just annotate the artifact**

Put the requirement ID in the artifact itself. Right there, where the work happens.

Source code:

```
// REQ-047 — fault detection timing threshold
void check_fault_state(sensor_ctx_t *ctx) {
```

Test script:

```
# Verifies: REQ-047, REQ-063
# Protocol: ATP-022
def test_fault_detection_latency():
````

SolidWorks custom property: `Requirement = REQ-047`

Altium schematic note: `REQ-047: gate driver timing`

Commit message: `REQ-047: fix fault detection threshold per design review`

Manufacturing work instruction header: `Implements: REQ-047, REQ-063`

Every artifact that exists because of a requirement should say so, in the artifact itself, where the traceability cannot get separated from the thing it traces.

This takes thirty seconds per annotation. It costs nothing. It requires no plugin and no training. Yet it produces something no Jira plugin, no ALM tool, and no spreadsheet can produce: traceability that is physically embedded in the engineering artifact, moves when the artifact moves, and survives every tool migration.

When the developer moves the function from foo.c to bar.c, the comment moves with it. When someone runs `grep -r "REQ-047".` across the repo, they find every file that claims to implement or verify that requirement. Right now. Not last Thursday when the spreadsheet was last updated.

## **Three questions, three kinds of evidence**

Auditors ask three distinct questions about a requirement. Each one demands different evidence.

**"Was this requirement planned?"** Was there a deliberate engineering activity scoped, assigned, and tracked against this requirement? IEC 62304, DO-178C, ISO 26262, all of them require traceability from requirements to planning artifacts. The Software Development Plan, the Verification Plan, sprint records.

A Jira story assigned to a developer in Sprint 14, referencing SRS-047, with a status of Done? Legitimate planning evidence. Keep it.

**"Was this requirement built?"** Does working code (or a schematic, or a mechanical design) exist that implements this requirement?

A Done ticket is a claim that someone finished the work. The source code with `// REQ-047` sitting right above the function is proof that the artifact exists and the developer who wrote it explicitly connected it to the requirement. The ticket is secondhand. The annotation is firsthand.

(Don't tell me you've never bulk-transitioned thirty stories to Done on a Friday afternoon because the sprint was ending. We've all done it. That's why Done tickets aren't implementation evidence.)

When the auditor follows up with "who reviewed this implementation?", `git blame` and the pull request that merged the code already have the answer. The developer, the reviewer, the timestamp, the diff. All artifacts. All generated by the development workflow you're already running.

**"Was this requirement verified?"** Is there a test, with a result, that demonstrates the implementation satisfies the requirement? A test script with `# Verifies: REQ-047` in the header, linked to a test execution with a pass/fail result, answers this. A Jira ticket that says "Testing complete" does not.

Three questions. Three sources of truth:

Planning → Jira (or whatever tracks your engineering process). Implementation → the artifact itself, annotated. Verification → the test result, linked to the requirement.

The mistake everybody makes is asking Jira to answer all three.

## **What annotation buys you right now**

Even without any tooling, even with zero budget, an annotation discipline gives you:

**Grepability.** `grep -rn "REQ-047" --include="*.c" --include="*.py"` across your repo gives you every file that references that requirement. Instant impact analysis. If a requirement changes, you know which files to look at. If a file changes, you know which requirements might be affected.

**Blame context.** `git blame` on a line with a requirement annotation tells you who wrote it and when. That's authorship evidence for your design history file. For free.

**Survival across tool changes.** When your company switches from Jira to Linear, from TestRail to a Python test framework, from Subversion to Git, the annotations in the artifacts survive. They're not coupled to any tool. They are text in files. They will outlast every SaaS product you're paying for right now.

**Audit confidence.** When the auditor asks for implementation evidence, you can show them the source code and the test script. The evidence is in the deliverable, not in a side document that claims things about the deliverable.

## **What about Jira?**

Of course, keep using it. Jira is good at managing work and coordinating a development team. It's legitimate evidence that engineering was planned and managed. In regulated environments, that matters. Your auditor will want to see that requirements were systematically addressed through a controlled process, and sprint records are perfectly fine evidence of that.

Please, though, stop asking Jira to also be your implementation traceability system. That's not what it was built for, and bolting traceability onto a task tracker produces a weird mutant creature that nobody trusts and everybody maintains out of obligation.

Your Jira tickets should reference requirement IDs. So should your code and your tests and your design files. They're answering different questions. Jira says "we planned this." The code says "we built this." The test says "we verified this." Let each artifact be authoritative for what it actually knows.

Some teams will ask: "But what about the RTM? How do I produce the document?"

Scan the artifacts. All of them. Jira for planning evidence, the codebase for implementation evidence, the test results for verification evidence. Assemble the graph. That's what tooling is for. Not for recording traceability by hand. For discovering traceability that already exists, embedded in the artifacts by the engineers who did the work.

(Hint: this is exactly what RTMify does - finds your traceability for you.)

## **The rule**

Here it is. One sentence. Tape it to your monitor.

**Every artifact that exists because of a requirement should say which requirement, inside the artifact.**

Source files. Test files. CAD models. Schematics. Firmware. Work instructions. Test fixtures. Configuration files. If it got created to satisfy a requirement, the requirement ID belongs inside it.

Sprinkle them liberally. Five annotations pointing at REQ-047 across three files beats having the relationship recorded nowhere except a spreadsheet that's already wrong.

The annotations are cheap. The absence of annotations is expensive. Ask your QA lead. She's on row 87 and it's only Monday.

