---
title: "The Layer Cake: Where Compliance Evidence Actually Lives"
description: "Every regulated product accumulates evidence in four layers. A practical mental model for requirements traceability and audit readiness across AS9100, ISO 13485, IEC 62304, and DO-178C."
date: "2026-03-22"
author: "RTMify"
---

# **The Layer Cake**

Sarah catches Marcus in the break room. He's refilling his coffee, which means he's between tasks, which means she has approximately ninety seconds before he starts thinking about thermals again.

"Hey. Quick question. Where did you put the test results from the EMC pre-scan?"

Marcus thinks. "I emailed them to you. The PDF from the lab."

"Right. But where are they *now*?"

"... In your email?"

Sarah closes her eyes for a second. She does this a lot. Marcus is a good engineer. He designed the analog front end in three weeks and it worked on the first spin. He can calculate loop stability in his head. He does not think about where documents go after he's done with them, because in his mental model, the work is the circuit. The paperwork is someone else's problem.

It is someone else's problem. It's Sarah's problem. She's the quality engineer. She's the only quality engineer. And the AS9100 surveillance audit is in six weeks.

"Marcus. I need those results in the controlled design records. Not in email. Not on your laptop. In the project folder, linked to the test protocol, with the equipment cal certs attached."

Marcus stares at her like she just asked him to file his schematics in triplicate and notarize them.

"Why does it matter where it lives? The data's the same."

And there it is. The question that every engineer in every regulated industry has asked at least once, usually with genuine confusion rather than malice. The data's the same. Why does it matter where it lives?

It matters because there are four layers, and Marcus just put design verification evidence in his outbox.

## **Four layers**

Every regulated product, whether it's a medical device, an avionics system, a satellite subsystem, or an automotive safety controller, accumulates evidence in four layers. The layers aren't in any standard. No auditor will use this vocabulary. Standards describe what to do, not how to think about it — this is the thinking-about-it part. But once you see the layers, you can't unsee them, and half the compliance confusion that plagues small companies evaporates.

**Layer 1: The Quality Management System.** This is policy. How you said you'd work. SOPs, the design and development procedure, the document control procedure. These are controlled documents in your DMS with revision history and approval signatures. They're mostly static. You write them once, revise them when the process changes, and leave them alone the rest of the time.

An auditor checks Layer 1 to answer one question: *Do you have a process?*

If the answer is no, the audit is over quickly and badly. If the answer is yes, the auditor moves on and never looks at Layer 1 again for the rest of the day. Layer 1 is the entrance exam.

**Layer 2: Design Activities.** This is intent. What you decided to build and how you decided to verify it. The requirements specification. The risk analysis. The [traceability matrix](https://rtmify.io/download/). The V&V protocols. The design review records. The output of every meeting where an engineer said "this is what we're going to do and here's why."

Layer 2 is where your [RTM](https://rtmify.io/download/) lives. It's where the trace links go: requirement to test, requirement to risk, user need to requirement. It's the layer that says "we thought about this systematically."

An auditor checks Layer 2 to answer: *Did you follow your process?* You said in Layer 1 that you'd do a risk analysis before detailed design. Layer 2 is where the auditor looks for the risk analysis. You said you'd trace every requirement to a verification method. Layer 2 is where that traceability lives.

**Layer 3: Implementation and Design Outputs.** This is the work product. What you actually built. Source code, schematics, PCB layouts, mechanical CAD, test scripts, the BOM. Every artifact that an engineer produced by doing engineering.

Layer 3 is where the annotations live. `// REQ-047` in a source file is Layer 3 evidence. An Altium schematic with a requirement reference in the properties is Layer 3 evidence. A test script with `# Verifies: REQ-047` in the header is Layer 3 evidence.

An auditor checks Layer 3 to answer: *Did you build what you said you'd build?* The requirements in Layer 2 said the system shall do X. Layer 3 is where the auditor looks for the artifact that does X. If there's a requirement with no corresponding design output, that's a finding.

**Layer 4: As-Built Records.** This is production truth. Not what you designed. What you shipped, unit by unit.

Acceptance test results with an operator's initials and a timestamp from the ATE station. Calibration certificates for the equipment that ran the test. Production travelers with date codes and lot numbers for the components that went into a specific board. The record that says serial number 4,712 was built on this date, with these parts, tested by this person, using equipment calibrated on this date, and it passed.

The design BOM is Layer 3. It says "this product uses a TPS54360B switching regulator." The as-built BOM is Layer 4. It says "serial number 4,712 got TPS54360B from lot 2603, date code 2547, purchased on PO-1189." If your company doesn't distinguish between these two BOMs, that's a finding waiting to happen, because every component substitution, every alternate source approval, every lot-to-lot variation exists in the gap between them.

Layer 4 is the most concrete layer. Everything in it is timestamped, serialized, and specific to individual units. It's also the layer where the stakes are highest, because Layer 4 is where you go when something goes wrong in the field. A GIDEP alert comes in on a capacitor. Which serial numbers got that lot code? If Layer 4 is solid, that's a database query and an answer in ten minutes. If it's not, that's a ship-hold while someone digs through filing cabinets, and possibly a voluntary recall because you can't prove which units are affected.

An auditor checks Layer 4 to answer: *Can you prove what you shipped?* If someone reports a field issue with serial number 4,712, you need to trace from that unit back through its production records, through the design that was current when it was built, through the requirements that governed that design, all the way to the user need. Layer 4 is where that trace starts.

## **Four questions**

* **Layer 1**: Do you have a process?
* **Layer 2**: Did you follow it?
* **Layer 3**: Did you build what you said?
* **Layer 4**: Can you prove what you shipped?

That's it. When you know which layer you're in, you know what evidence the auditor wants and where it should live.

## **“Bureaucracy”**

Back to Marcus and his EMC test results.

The EMC pre-scan is design verification evidence. It's the record that proves the design output (Layer 3) meets the EMC requirements (Layer 2). The test protocol lives in Layer 2, the results sit alongside the design outputs in Layer 3, and both need to be in the controlled design records, linked to each other, linked to the requirements, with the equipment cal certs attached. The QMS (Layer 1) says where controlled records go and what "linked" means.

When Marcus emails the PDF to Sarah, the data is correct. The measurements are real. But the evidence is floating. It's a design verification record sitting in an email inbox with no trace link to anything.

Sarah knows this because Sarah thinks in layers, even though she's never called them that. When she says "I need it in the project folder and link it to the protocol," she's saying: "I need this verification evidence filed where the QMS says it goes, connected to the protocol that authorized it, with the supporting metadata that proves the equipment was calibrated."

Marcus hears: bureaucracy.

This is the gap. Not a tooling gap. Not a process gap. A mental model gap. Marcus doesn't know about the layers. Nobody ever taught him. He learned circuit design in school and learned compliance by osmosis, which means he learned whatever fragments stuck from the last audit prep scramble.

## **Where things go wrong**

A lot of compliance pain in small companies comes from not knowing which layer you're working in. The symptoms look like this:

**Solving Layer 4 problems with Layer 2 artifacts.** "We're missing test records for three serial numbers." The response: update the RTM. But the RTM is Layer 2. It describes *what should be tested*. The missing test records are Layer 4. Updating the RTM doesn't create evidence that the tests were run. You need to find the actual results, or re-test.

**Solving Layer 2 problems with Layer 1 documents.** "Our traceability has gaps." The response: revise the SOP to require better traceability. But the SOP is Layer 1. It says *how you should work*. The traceability gaps are in Layer 2. Rewriting the procedure doesn't fill the gaps. You need to do the traceability work. The procedure was fine. The execution wasn't.

**Putting Layer 3 artifacts in Layer 1.** "Let's put the BOM in the QMS." The BOM is a design output, Layer 3. The QMS is Layer 1. Controlled documents in the QMS are supposed to be stable policy documents. A BOM changes every time engineering does a component substitution. You've just put a high-change-rate artifact in a low-change-rate system, and now every BOM revision triggers a document change process designed for SOPs. Everything slows down. Everyone hates it. Six months later someone is maintaining a shadow BOM in Excel. This pattern shows up everywhere ([AS9100](https://rtmify.io/standards/as9100/) shops, [ISO 13485](https://rtmify.io/standards/iso-13485/) shops, [DO-178C](https://rtmify.io/standards/do-178c/) shops). The standard doesn't matter. The failure mode is the same.

**Skipping Layer 2 entirely.** "We don't really need an RTM, we just test everything." You might test everything. But without Layer 2, you can't demonstrate *why* you tested what you tested, or that the tests you ran actually *correspond* to the requirements. The auditor asks "how do you know your test suite covers all the requirements?" and the honest answer is "we're pretty sure." "Pretty sure" is not what goes on a certificate of conformance.

## **The layer rule**

Every artifact belongs in exactly one layer. If you can't tell which layer an artifact belongs in, you've found a problem. Either the artifact is doing double duty (a BOM that's both a design output and a controlled QMS document) or it's floating (test results in an email inbox).

The trace *links* cross layers. That's the whole point of traceability. Requirement (Layer 2) traces to source file (Layer 3) traces to test execution (Layer 4). User need (Layer 2) traces to requirement (Layer 2) traces to risk (Layer 2). Product record (Layer 4) traces back through BOM (Layer 3) through requirements (Layer 2) to QMS procedures (Layer 1).

But the artifacts themselves? One layer each. Know which one.

## **Sarah's ninety seconds**

She didn't have time to explain all this to Marcus in the break room. She never does. She said what she always says: "Just put it in the project folder and link it to the protocol." Marcus nodded, refilled his coffee, and went back to thermals.

He'll do it. Probably. Eventually. And if he doesn't, Sarah will find the PDF in her inbox at 11:30 PM on the Tuesday before the audit and file it herself, because Sarah always does, because Sarah is the human glue between four layers that nobody else can see.

Every regulated company with fewer than a hundred people has a Sarah. If you're reading this and you are Sarah: I'm sorry. You're right. They should care about where the document lives. The data is not, in fact, "the same" regardless of where it sits. And the fact that you can't articulate why in ninety seconds in a break room is not a failure of your communication skills. It's a failure of an industry that never bothered to give its engineers a mental model for something they're required to do every day.

Four layers. Tape it to the break room wall, right next to the espresso machine. Maybe Marcus will read it while the water heats up.

