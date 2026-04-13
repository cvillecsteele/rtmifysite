---
title: "ASPICE Requirements Traceability Matrix Template — Automotive SPICE (Free Download)"
description: "Achieve ASPICE Level 2 traceability with a ready-made RTM. Free template covering SYS.2 through SWE.6 with bidirectional links and gap detection."
standard: aspice
badge_color: "#004D40"
clauses:
  - { ref: "SYS.2", label: "System Requirements Analysis" }
  - { ref: "SWE.1", label: "Software Requirements Analysis" }
  - { ref: "SWE.2", label: "Software Architecture Design" }
  - { ref: "SWE.4", label: "Software Unit Testing" }
  - { ref: "SWE.6", label: "Software Qualification Testing" }
---

## What Automotive SPICE requires for traceability

Automotive SPICE (Software Process Improvement and Capability dEtermination) is the process assessment framework used across the automotive supply chain, mandated by OEMs including BMW, Mercedes-Benz, Volkswagen Group, and Stellantis. A requirements traceability matrix (RTM) is the primary evidence artifact assessed under SWE.1 and SWE.4–6, where most ASPICE traceability gaps are found. The current reference model is VDA Automotive SPICE PAM 3.1. Unlike ISO 26262 (which is a safety standard), ASPICE is a process maturity assessment that evaluates how well your development processes are defined, performed, and improved.

**SYS.2: System Requirements Analysis** covers the process of eliciting, understanding, and documenting system requirements. Base Practice SYS.2.BP1 through BP9 require that requirements be uniquely identified, bidirectionally traceable to stakeholder requirements, consistent, and verifiable. The requirements traceability matrix (RTM) provides the traceability evidence for this process.

**SWE.1: Software Requirements Analysis** is the most commonly assessed ASPICE process and the one where traceability gaps are most frequently found. SWE.1.BP6 explicitly requires bidirectional traceability between software requirements and system requirements. SWE.1.BP7 requires that requirements be consistent; SWE.1.BP8 requires that requirements be agreed with the customer. A requirements document with no parent references to system requirements fails BP6 at any capability level.

**SWE.2: Software Architecture Design** requires that the software architecture be defined and that components be traceable to software requirements. SWE.2.BP5 requires bidirectional traceability between software requirements and the software architecture. The Requirements tab with a component allocation column addresses this.

**SWE.4: Software Unit Testing** and **SWE.6: Software Qualification Testing** both require that test cases be derived from and traceable to requirements. SWE.4.BP2 and SWE.6.BP2 specify requirement-based testing with documented coverage. The traceability data in the RTM is the primary evidence for these base practices.

## How the template covers Automotive SPICE

| Tab | ASPICE processes covered |
|-----|--------------------------|
| **User Needs** | SYS.2: stakeholder and system requirements |
| **Requirements** | SWE.1 / SWE.2: software requirements with system req. parent trace |
| **Tests** | SWE.4 / SWE.6: unit and qualification tests linked to requirements |
| **Risks** | SYS.2 / SWE.1: risk items linked to requirements and mitigations |

The RTMify Status column directly supports the ASPICE consistency checks: `MISSING_ID` catches forward references to non-existent requirements (a BP7 consistency finding); `NO_TEST_LINKED` catches requirements without test coverage (a SWE.4/SWE.6 finding).

**What it doesn't cover:** Automotive SPICE also assesses process management (MAN.3), configuration management (SUP.8), quality assurance (SUP.1), and the measurement process (MAN.6). The template covers the engineering process traceability in SYS.2, SWE.1, and SWE.4–6.

## Common Automotive SPICE assessment gaps

- **No bidirectional traceability between system and software requirements.** This is the most common SWE.1 gap. Software requirements reference "SRS v2.3" without specifying which system requirement they address. Each software requirement needs a parent field referencing a specific system requirement ID.
- **Requirements not uniquely identified.** "The system shall respond quickly" with no ID is not an ASPICE-compliant requirement. Every row needs a unique, stable ID. Row numbers in a spreadsheet don't count, because they change when you insert or delete rows.
- **Change history not maintained.** ASPICE assessors ask for the requirements change history. A spreadsheet with no change log doesn't demonstrate controlled modification. Add a `Changed_In` column with a version reference, or maintain a separate change log tab.
- **Tests not traceable to individual requirements.** "Integration test plan tests all requirements" is not sufficient. Test cases must reference specific requirement IDs. Assessors sample-test this.
- **Architecture elements not traced to requirements.** SWE.2.BP5 requires this trace. Many teams have an architecture document and a requirements document with no cross-references between them.

## Automotive SPICE specific guidance

**Capability level context:** ASPICE capability levels range from 0 (incomplete) to 5 (optimizing). Most OEM contracts require Level 2 (managed) for SWE.1, which adds process attribute requirements: planning, monitoring, work product management, and resource management. Level 3 (established) additionally requires that processes be defined from an organizational standard. The template supports Level 2 evidence. For Level 3, you need a defined process description that references the template.

**ID stability:** ASPICE requires that requirements IDs be stable across versions. Use a prefix + sequential number: `SWE-001`, `SWE-002`. Never renumber. When a requirement is deleted, mark it as `[DELETED]` and leave the row in place, or move it to an archive tab. Renumbering is a traceability breaking change.

**Agreed requirements (SWE.1.BP8):** Document customer agreement on software requirements. In practice, this means a signature or email approval on the SRS version. Add a `Status` column (Draft / Customer Review / Agreed / Baselined) and a `Baseline_Version` column. Requirements in `Agreed` or `Baselined` state are the ones your tests must cover.

**SWE.3 integration:** SWE.3 covers software detailed design. If you document design decisions at the unit level, add a `Design_Reference` column linking requirements to design artifacts. This satisfies SWE.3.BP5 (traceability between detailed design and software requirements).

**ASPICE and ISO 26262 alignment:** When developing safety-critical automotive software, you will typically run both processes in parallel. The same RTM serves both. ASPICE provides the process framework; ISO 26262 provides the safety integrity requirements. Requirements in the RTM carry both an ASPICE status (Agreed/Baselined) and an ASIL level. Tests carry both a coverage type (for ISO 26262) and a test case ID (for ASPICE traceability).
