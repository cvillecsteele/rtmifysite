---
title: "Your RTM is a Myth"
description: "Your requirements traceability matrix is a point-in-time snapshot that starts decaying the moment you finish typing. What if the tool found the evidence itself?"
date: "2026-03-11"
author: "RTMify"
---

# Your RTM Is a Myth

It's 11:47 PM on a Tuesday. You're a systems engineer at a medical
device company, and the ISO 13485 audit is Thursday morning. You have
a spreadsheet with 340 requirements in it. You've been maintaining it
for eight months. You are now discovering (right now, in real time,
with a cold knot forming behind your sternum) that fourteen of those
requirements have no test coverage. In reality someone *probably*
tested them.  The engineers are smart.  The real reason is *probably*
because somebody renamed a test file in March and nobody updated the
cross-reference column in the spreadsheet.

You've got fourteen gaps, thirty-six hours, two red bulls, and grit.
You got this.

But boy.  No fun.  None. At. All.

You will fix them by hand tonight. You will drink bad coffee. You will
update the cells, re-run the formulas, export the RTM, and walk into
that audit room Thursday with a document that was theoretically
correct as of 11:47 PM Tuesday. But you know, secretly, that it was
already drifting by the time you print it.

This is how traceability works in regulated industries in 2026.

Your RTM, the one that cost *a lot* of money?  That was mythology.
Your stress?  That's definitely real.

## The document nobody trusts

Every regulated-industry engineer on the planet knows what a
requirements traceability matrix is. It's the document that proves
your requirements trace forward to tests and backward to user
needs. It proves that risks are mitigated, that nothing got lost
between what the customer asked for and what you shipped. Auditors
check it. Certification bodies require it. Quality managers live and
die by it.

Every single one of us engineers knows the same dirty secret: the RTM
is a point-in-time snapshot that starts rotting the moment you finish
typing.

Requirements change. Tests get renamed. Source files move. Risks get
added in a hallway conversation and logged three weeks later. The
spreadsheet doesn't know any of this happened. It sits there, frozen,
some kind of 1980s-era yellowed polaroid reflecting the state of the
program at the moment someone last touched it. When the auditor opens
it Thursday morning, they're looking at a photograph of a building
that's been renovated twice and is probably a Taco Bell now.

The fix, historically, has been enterprise ALM
tools. Jama. DOORS. Polarion. You pay $50,000 (or *much* more) a year,
you migrate your data into a proprietary database, you train your team
for three months, and then... in a pattern so hilariously common it
has a name (shelfware)... half your engineers quietly keep a parallel
Excel file because the tool is godawful and everyone knows it but no
one can say it too loud. You paid for the professional kitchen and
your team is still cooking on a hot plate in the garage.

The problem was never the spreadsheet.

Spreadsheets are awesomesauce.  Fight me.

## Evidence is already everywhere

I knew this 10 years ago.  That's nothing, really.  Anyone who has
done regulated anything already knows all of this.

Engineers already tag their work with requirement IDs. They do it
naturally. A developer writes `// REQ-047 adjust fan control curve` in
a source file. A test engineer names a script
`test_REQ_047_airflow.py`. A hardware engineer drops `Requirement =
REQ-047` into an Altium property field. A commit message says `REQ-047
tune airflow control`.

The evidence of working to meet requirements is *already there*,
scattered across your engineering artifacts. It's in source code, test
scripts, CAD metadata, commit history, design documents. It's all over
the place. It's just that your RTM tool can't see it.  You have to dig
all the stuff up yourself, and shove it into the wood chipper.

What you've really got?  A second, slower, more painful, less accurate
source of "truth".  It's a manually maintained copy of facts that
already exist in the artifacts your team produces every day. You are
paying engineers (darn expensive engineers, billing at like $250 an
hour, amiright?) to transcribe evidence from one place to another. And
the transcription is always late, always incomplete, and always wrong
in exactly the ways that matter *at audit time*.

So. What if the tool just... went and found the evidence itself?

## The shift

The security compliance world figured this out ten years ago. Before
2015, security compliance was spreadsheets and audits. Then companies
like Wiz, Vanta, Drata, and Lacework appeared and did something
conceptually simple but operationally transformative: they stopped
asking humans to document compliance and started discovering
compliance evidence automatically. Scan the cloud environment. Find
the controls, map them to the framework, and flag the
gaps. Continuously, all the time.

Those companies created a category worth north of $10 billion. They
did it by reversing the direction of information flow. The old model
pushed evidence from humans into documents. The new model pulled
evidence from artifacts into a graph.

Nobody has done this for product engineering.

Until now.

(Yeah, I know. "Until now." Bear with me. I've earned the melodramatic
pause by spending a decade thinking about it.  Indulge me.)

## What RTMify actually is

RTMify is not *just* a better RTM generator. That's what the website says, because that's the search query that brings you to the door. But once you're inside, the product does something different.

RTMify scans your working tree, the place your artifacts actually
live. It finds every requirement ID embedded in your source code, test
artifacts, CAD metadata, and commit history. It builds a graph:
requirement to source file to test to risk to commit to author. And
then it tells you stuff:

**Which requirements have no current implementation evidence.** No source annotation found. Maybe the code got deleted. Maybe the developer forgot the comment. Maybe nobody ever built it. Either way, the artifact record says: this requirement has no present-state evidence of implementation.

**Which requirements have no current verification evidence.** Implementation exists. No test references found. Something was built; nothing currently claims to verify it. The classic traceability gap, discovered automatically.

**Where verification is stale.** The source file changed yesterday. The test file didn't. The implementation moved; the verification evidence didn't move with it. This is the diagnostic that matters most, because this is the gap that creates the 11:47 PM Tuesday panic. And it is so fucking preventable.

**Where linkage is suspect.** An annotation disappeared. A near-match was found: `REQ_047` instead of `REQ-047`. Somebody renamed something and the trace link snapped. Human failure modes, caught by machine.

**What breaks if we change X?** What's the blast radius when a part is
obsolete?  Or a requirement changes?

Sure, these are just diagnostics. Turns out, really important ones.

## The evidence graph is not the RTM

Precision matters here because it separates a compliance tool from a toy.

The evidence graph distinguishes three kinds of evidence. Current artifact annotations are present-state evidence: what the working tree says right now. Commit messages are historical evidence: what a developer explicitly claimed at a point in time. File change history is change evidence: which files moved and when.

Those categories stay separate. A commit message that says `REQ-047` does not, by itself, prove that the files touched by that commit still satisfy that requirement today. The developer might have refactored the code since then. The present-state evidence comes from what's in the current source tree. The historical evidence tells you when and by whom. Both matter. They answer different questions.

The RTM you hand to your auditor is a view over this graph. A query. A projection of the evidence that exists right now. When someone edits a file, the graph updates. When someone adds a comment with a requirement ID, the graph picks it up. When someone deletes an annotation, the graph flags the loss.

Your RTM becomes something that has never existed in regulated engineering: a live document that reflects the current state of your program and tells you, in real time, where the gaps are opening.

## I built this because audits suck

Personal turn. I've been thinking about this problem for ten
years. I've sat in the room with an auditor. I've been the guy at
11:47 PM on Tuesday, fixing cross-references by hand, knowing the
document will be stale before the auditor sees it, knowing the entire
exercise is a slow-motion game of catch-up that nobody wins.

I couldn't help thinking, "There *has* to be a better way."  The idea
was always the same: what if traceability was a byproduct of
engineering work instead of a parallel bookkeeping exercise? What if
the tool read the artifacts instead of asking the humans?

For a decade, the tooling wasn't there. Version control was
fragmented. CAD tools didn't expose metadata through APIs. The compute
required to scan a working tree continuously was impractical. The AI
infrastructure to make this queryable didn't exist.  Live
collaboration in spreadsheets with APIs didn't exist.  Etc.

And then, suddenly, it all appeared.  Like we're living in the future.

## The category

I'll make a bold claim. You can decide if RTMify earns it.

RTMify is not requirements management software. Requirements
management is a $2 billion market full of incumbents who assume you'll
type your traceability links into their database by hand. That
architecture is trapped. It requires manual curation, and yet it
produces stale snapshots. It costs six figures a year and still leaves
your engineers maintaining a side spreadsheet, like Gollum gloating
over My Precious.

RTMify is engineering compliance evidence discovery. The same
conceptual move that Wiz and Vanta made for security, applied to
product engineering. Scan the artifacts. Discover the evidence. Build
the graph. Surface the gaps. Continuously.

The market for that doesn't exist yet. That's the honest answer. Right
now it's a $0 category. But so was cloud security posture management
in 2015. So was software composition analysis in 2016. So was GitHub
in 2008. The best software categories start at zero and become
inevitable.

Every company that builds a regulated product needs
this. Aerospace. Medical
devices. Automotive. Defense. Robotics. Rail. Nuclear. Satellites. Autonomous
systems. The overlap between "we build physical things" and "we must
prove traceability for certification" describes a market in the tens
of billions of dollars. And right now, that entire market is using
spreadsheets and ALM shelfware to solve a problem that should be
solved by automated evidence discovery.

## What the incumbents won't do

The incumbents are architecturally trapped. Jama, DOORS, and Polarion
all start from the same assumption: requirements live in a database,
and humans link them to other artifacts by hand. Replacing that
architecture requires rebuilding the core product. They can't do it
without breaking the existing customer base. They are
innovator's-dilemma'd into maintaining the manual-linking model until
someone eats their lunch from underneath.

RTMify starts from the opposite assumption: requirements evidence
already exists in engineering artifacts, and the tool's job is to find
it. That's a reverse architecture. The spreadsheet stays. The
engineers keep working exactly the way they work now. RTMify runs
alongside, reading the artifacts, validating the graph, and surfacing
gaps before the auditor does.

No migration. No training. No six-month rollout. Download the
binary. Point it at your repo and your spreadsheet. Get traceability
intelligence in five minutes.

That's a product that can spread through search intent, word of mouth,
and artifact gravity without a sales team. The engineer Googling
"requirements traceability matrix template" at 1:30 AM is my
distribution channel. The RTM report that lands in a git commit is my
viral loop. The blog post you're reading right now is my marketing.

## What happens next

The excel spreadsheet Requirements Traceability Matrix is
free. Download the spreadsheet. Use it tonight. It covers AS9100, ISO
13485, DO-178C, IEC 62304, ISO 26262, and Automotive SPICE.

RTMify Trace is available now. Drop your spreadsheet on it, get a full
traceability matrix as PDF, Word, or Markdown. Runs locally. Nothing
uploaded. Nothing leaves your machine.

RTMify Live is where the evidence discovery engine lives. It has
continuous sync, git blame traceability, industry-specific profiles
and even a native MCP server so you can talk to your requirements with
AI.

The spreadsheet stays. The evidence gets discovered. The gaps get
surfaced. The panic... recedes.  Thank goodness!

That's the pitch. Go try it.
