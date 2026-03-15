---
title: "This Used To Be Impossible"
description: "A component goes end-of-life. What used to take two weeks and three systems now takes five minutes and one query. A story about how product realization actually works."
date: "2026-03-14"
author: "RTMify"
---

# This Used To Be Impossible

Dana gets the email at 2:14 PM on a Wednesday.

Component distributor. Subject line: "EOL Notification: FBRFET-3300, Effective Q3 2026." The foobarFet. The little N-channel MOSFET that sits in the gate driver circuit on every board they ship. They've used it since Rev A. Nobody thinks about it. Nobody has ever had a reason to.

Dana thinks about it now.

She's the quality engineer at a medical device company. Forty-seven people. The device is a Class II diagnostic instrument, shipping about 300 units a month. The foobarFet is on the main controller PCBA, reference designators Q7 and Q14, and possibly on the power supply board too, but Dana isn't sure. Nobody is.

She forwards the email to Rick, the program manager, with one line: "Need to discuss. ECR?"

Rick's response arrives in eleven minutes: "Set up a meeting. Pull in Marcus and Priya."

Marcus is the ME. He designed the board. He will have opinions. Priya is the firmware lead, and she'll need to confirm whether the gate driver timing is sensitive to the FET's switching characteristics. If it is, the swap isn't a BOM substitution. It's a design change that could affect verification.

## The old way

Here is what happens next at most companies. I know because I've lived it. You've lived it too.

Dana opens the BOM. Not the official one in the PLM.  The Excel file that Marcus maintains on his laptop, because the PLM is three revisions behind and everyone knows it. She searches for "FBRFET-3300." Finds it at Q7 and Q14 on the main board. Does not find it on the power supply board, but she's not confident the BOM she's looking at is current. She Slacks Marcus: "Is the foobarFet on the PSU board too?" Marcus doesn't respond for four hours because he's in the lab running a thermal test.

While she waits, Dana opens the requirements spreadsheet. She needs to figure out which requirements depend on the gate driver circuit. 340 rows. None of them say "gate driver." The word "MOSFET" does not appear anywhere. She knows, from memory, that REQ-047 covers fault detection timing and REQ-063 covers power sequencing, and both of those touch the gate driver. Probably right. Not certain.

She opens the test matrix in a second spreadsheet. TST-023 verifies REQ-047. TST-041 verifies REQ-063. She's now fairly confident these are the tests that would need re-execution after a swap. But "fairly confident" is not what goes in an Engineering Change Request at a medical device company. "Fairly confident" is what gets you a non-conformance.

She needs to find out if the new FET's switching characteristics are different enough to matter. Priya would know, but Priya is mid-sprint and won't context-switch for this until at least tomorrow. Meeting goes on the calendar for Friday.

Rick, Thursday morning: "Do we have a handle on the impact yet?"

Dana's honest answer: no. She has a partial BOM search from an Excel file she doesn't fully trust, two requirements she identified from memory, two test cases she found by cross-referencing a second spreadsheet, and a firmware question nobody has answered. Day and a half in. She still can't tell Rick how many shipped units contain the affected part, because the serial number records are in the ERP and she doesn't have credentials.

Friday meeting. Marcus, Priya, Dana, Rick. Conference room. One hour. Marcus confirms Q7 and Q14 on the main board, no foobarFet on the PSU board, and he's already looked at two replacement candidates. Priya says the gate driver timing has a 200ns margin and both replacements are within spec, so no firmware change needed. The group agrees: ECR for a like-for-like component substitution.

Dana writes the ECR. Lists the affected requirements (the two she
identified plus one more that Priya flagged during the meeting,
REQ-088, which Dana had never connected to the gate driver). Lists the
tests. Writes the justification. Routes it for signatures. The ECR
takes three days to circulate, because the VP of Engineering is in
Munich and doesn't check his email on European time.

The ECO follows. Marcus updates the BOM. Priya re-runs two tests. Dana updates the RTM.

Total elapsed time from EOL notification to closed ECO: twelve days. Maybe four hours of actual engineering work. The rest was searching, waiting, cross-referencing, and routing paperwork through an organization that moves at the speed of the slowest inbox.

Twelve days. For swapping a MOSFET that two people designed and one person tested.

## The five-minute version

Same email. Same 2:14 PM. Same Dana.

Dana has RTMify Live running on her laptop. Site license. Every engineer on the team runs it. They all point at the same Google Sheet and the same git repo. The hardware BOM was exported from their PLM as a CSV and dropped in Live's inbox two weeks ago when they released Rev C.

She opens Claude. Types:

*"Which products use part FBRFET-3300?"*

Three seconds. Live's MCP server comes back: ASM-1000 Rev C, main controller board PCB-200 Rev B, reference designators Q7 and Q14. Not on the PSU board. Not on any other assembly. She didn't ask Marcus. She didn't open a spreadsheet. The BOM is in the graph.

*"Which requirements trace to components Q7 and Q14?"*

Live walks the graph. The source code has `// REQ-047` annotated in `fault_detect.c`, which Marcus tagged when he wrote the driver two years ago. Priya's firmware has `// REQ-063` in `power_seq.c`. And there's REQ-088, sitting in a test fixture file that Dana didn't know existed. Three requirements. She had two from memory. Live found the third.

*"Which test cases verify REQ-047, REQ-063, and REQ-088?"*

TST-023, TST-041, TST-072. That last one is an environmental qualification test that Priya added in January. It's in the spreadsheet. Dana never noticed it because she doesn't review every row in a 340-row spreadsheet every month. Who does?

*"How many units have we shipped with FBRFET-3300?"*

Live scopes the test executions by product. 1,247 units tested against ASM-1000 Rev C with serial numbers, all built with Q7 and Q14 populated per the current BOM. If the replacement part changes anything (switching speed, parasitic capacitance, whatever) Dana now knows exactly how many units in the field could be affected.

It's 2:31 PM. Seventeen minutes since the email.

Dana has: every affected product, every affected reference designator, every affected requirement (including one she didn't know about), every affected test case (including one she didn't know about), and the complete field population. She didn't call a meeting. She didn't Slack Marcus. She didn't wait four hours for someone to come out of a thermal test.

She writes the ECR. It's more thorough than the twelve-day version would have been, because the graph gave her REQ-088 and TST-072 for free. In the old way, she found REQ-088 only because Priya happened to mention it in a meeting. TST-072? Nobody caught that until the next audit. In the new way, the graph caught both because the graph doesn't depend on anyone's memory.

Priya confirms the timing margin over Slack in ten minutes. Marcus approves the BOM change.

The ECR routes for signatures. The VP of Engineering is still in Munich. Still doesn't check his email.

Some things technology can't fix.

Total elapsed time from notification to drafted ECR: about two hours, of which maybe forty minutes was engineering. The twelve-day cycle collapsed to what should have been the bottleneck all along: the humans deciding, not the humans digging.

## What actually changed

The engineering work was identical. Marcus still evaluated the replacement. Priya still confirmed the margin. Dana still wrote the ECR. Same product. Same process. Same QMS.

What vanished was the archaeology. The day and a half of
cross-referencing three systems, waiting for people to respond, and
reconstructing a chain of evidence from memory and
spreadsheets... replaced by five MCP queries that took less time than
brewing coffee.

And Dana's five-minute analysis was more complete than her twelve-day analysis. She found a requirement and a test case that she would have missed entirely in the manual process. The graph found them because the evidence was already in the artifacts. The annotations in the source code. The test cases in the spreadsheet. The BOM in the inbox. The graph connected what was already there.

That's what RTMify Live does. Parses the data exhaust your engineering
team already produces (the source files, the test logs, the BOM
exports, the spreadsheets) and builds a graph that connects all of
it. Requirements to code. Code to tests. Tests to serial
numbers. Serial numbers to products. Products to components.

When something changes (an EOL notice, a requirement revision, a failed test, a supplier quality notification) you don't spend twelve days gathering data. You ask the graph. The graph knows because the evidence told it.

This used to be impossible. The data lived in three systems that didn't talk to each other, and the only integration layer was a quality engineer's memory and a very long Tuesday night.

That era is over. Dana finishes her ECR at 2:47 PM, pings Rick ("impact analysis attached, routing for sigs"), and goes back to the work she was doing before the email landed.

She books the Friday meeting anyway. Marcus found a replacement part with better specs and he's going to want to show everyone the datasheet.

Let him cook.
