# Lävi Clinical Suite — Product Truth Source

**Purpose.** This file is the *only* authority the website may use for public product claims.
It exists because the website repository contains no product evidence: the evidence lives in
`undo1978/ChangeAssistant` (the Lävi Delta pipeline and its technical file) and in the MRMC
reader-workstation repository. Without this file, a claims audit of the website repo can only
audit marketing copy against itself.

**Status:** DRAFT FOR RISK-OWNER APPROVAL — Andreas Müürsepp
**Compiled:** 2026-08-20
**Derived from:** ChangeAssistant snapshot (main, ~PR #320–#334 era) and the MRMC workstation
snapshot of the same date, plus the controlled documents named inline.
**Review cadence:** re-confirm before every material public claim change, and at minimum quarterly.

---

## 0. How to use this file

Rules for anyone (human or agent) writing public copy:

1. A public claim is permitted **only** if it appears in §3, §4 or §5 below, or is a plain
   restatement of one that does not strengthen it.
2. If a desired claim is not here, the answer is **do not publish it** — not "find evidence for it".
3. Nothing in §6 or §7 may appear on the website in any form, including as a diagram,
   screenshot caption, meta description or alt text.
4. §2 governs how the product's purpose is described. Public wording **must not exceed** the
   intended-purpose statement in the technical file. It may be shorter and simpler; it may not be
   broader.
5. Every claim carried into the site must be entered in `docs/public-claims-register.md` with the
   classification used here: `VERIFIED FACT` / `DEVELOPMENT INTENT` / `PLANNED VALIDATION` /
   `RESEARCH ONLY` / `DO NOT PUBLISH`.
6. Where this file says **[DECISION REQUIRED]**, the copy must be omitted until Andreas answers.
   Do not choose a "safe-looking" default.

---

## 1. Legal identity and naming

| Field | Value |
|---|---|
| Trading / brand name | Lävi Clinical Suite |
| Product name | Lävi Delta |
| Country of establishment | Estonia |
| Contact | Andreas Müürsepp — andreas@lavi-clinical.com — +372 501 2118 |

**[DECISION REQUIRED — NAME DISCREPANCY, resolve before publishing anything]**
The controlled Instructions for Use (`docs/compliance/ifu.md`, IFU-CA-2.1) names the manufacturer
as **"Lavi Clinical Solutions OU", Tallinn** — a different legal name and a different city from
"Lävi Clinical Suite OÜ, Tartu" used elsewhere. Exactly one of these is the registered entity.
A public website and a technical file that name different manufacturers is a finding a notified
body will raise, and it is trivially checkable against the Estonian business register.

Until resolved: the website uses the **registered legal name** in the footer, imprint and any
regulatory statement, and the brand name elsewhere. The IFU must then be corrected to match.

---

## 2. Intended purpose — the binding wording

The technical file's intended purpose (IFU §2, §3, §4, §5) is the ceiling. Public copy must be
consistent with it.

**Controlled statement, in substance:** Lävi Delta is a radiologist-in-the-loop decision-support
tool that compares longitudinal brain MRI examinations, identifies candidate regions of change
between timepoints, and presents them together with quality-control information to a licensed
neuroradiologist for review. It performs FLAIR longitudinal comparison, contrast-enhancement
detection on pre- and post-contrast T1, and quality-control gating of the comparison. It makes no
autonomous diagnostic decision; every candidate requires explicit accept/reject by the reading
neuroradiologist. Regulatory classification is **EU MDR Class IIa, Rule 11, SaMD**, positioned as a
computer-aided detection (CADe) **second reader**.

**Intended users (IFU §3):** licensed neuroradiologists, able to interpret the study independently
without software assistance.

**Intended population (IFU §4):** adults 18 and over undergoing longitudinal brain MRI
surveillance. Explicit exclusions: paediatric patients, non-brain anatomy, non-MRI modalities,
and acute/emergency stroke triage.

**Approved public phrasing** (use these, or something demonstrably weaker):

- "a second-reader tool for longitudinal brain MRI"
- "brings candidate interval changes into one focused, auditable review"
- "designed to support, not replace, the radiologist's own assessment"
- "every candidate is reviewed and explicitly accepted or rejected by the radiologist"
- "for adults undergoing follow-up brain MRI"

**[DECISION REQUIRED — population mismatch.]** The IFU §4 population lists MS, brain-tumour
follow-up **and cerebrovascular disease / white-matter disease**. The planned validation programme
and the intended website copy list MS, primary brain tumours and brain metastases. These are two
different populations in public circulation. Either the site names the IFU population, or the IFU
is narrowed to the validation population. Do not let the website invent a third.

---

## 3. VERIFIED FACT — true today, may be stated plainly and confidently

These are facts about what has been built and executed. They are not clinical performance claims
and must never be presented as such. Where a figure is given, it is dated; prefer publishing the
capability without the number.

### 3.1 Deployment and integration

- Lävi Delta runs **on-premise inside the hospital network**. It receives studies over standard
  DICOM (a C-STORE SCP), processes them without operator interaction, and returns results into the
  existing PACS workflow. No image data needs to leave the institution.
- Results are returned as **standard DICOM objects** — DICOM SEG segmentation objects for candidate
  regions, secondary-capture overlay series, and a structured HTML report.
- FLAIR series identification uses DICOM header evidence including vendor private tags, and
  **fails closed with an explicit error rather than guessing** when the evidence is insufficient.

### 3.2 Processing

- Longitudinal registration of the imaging pair, plus intra-session pre/post-contrast alignment.
- Skull-stripping via established tools (SynthStrip / HD-BET).
- Candidate change regions are produced with location, volume, and direction of change
  (new/increasing and resolving/decreasing are handled as separate ranked lanes).
- Quality-control assessment of the comparison, with three graded outcomes — report, report with
  caution, and an explicit refusal to report the longitudinal comparison.

### 3.3 The safety architecture — this is a genuine differentiator, state it

- **Abstention is a first-class output.** When the prerequisites for a valid longitudinal
  comparison are not met, the software says so explicitly and withholds the longitudinal result,
  rather than producing a number of unknown reliability. This is implemented, not aspirational.
- **Anatomical correspondence is never inferred from a method name.** Equal image geometry,
  successful registration and convergence are recorded as provenance, not treated as evidence that
  the anatomy corresponds. Where correspondence is unsupported, the lane abstains.
- **Registration is deterministic and replayable** on the SimpleITK path: the random seed is derived
  from a hash of the actual inputs and the registration policy, so the same input reproduces the
  same result bit-for-bit, and any change to a registration parameter changes the recorded policy
  identity. (For the ANTs-based FLAIR path, determinism is characterised as *bounded*, not
  bit-identical — see §4.)
- **Provenance travels with the result.** Registration method, policy identity, input hashes,
  transform identity and environment are recorded per run and bound to the exported artefacts.

### 3.4 Quality management and verification

- Developed under a documented software lifecycle (IEC 62304, Class B) with an ISO 14971 risk file,
  a requirements specification, traceability from requirement to test, a controlled-document set and
  a change log.
- **Traceability is machine-checked, not merely tabulated.** Automated guards fail the build when a
  requirement cites a test that does not exist or cannot be collected, when a controlled record is
  malformed, or when a controlled document drifts out of agreement with the shipped code. These
  guards were added *because* audits found rows marked verified against tests that had never
  existed — that history is worth owning, in general terms.
- Automated test suite: **4044 passing / 104 skipped** in continuous integration across Python
  3.10–3.12 (2026-08-20). Publish the fact of a large enforced suite; the number will go stale.

### 3.5 The MRMC reader workstation

- A dedicated browser-based reader environment exists and is deployed, built on a pinned OHIF
  viewer with an Orthanc image store behind a phase-aware proxy.
- Implemented and tested: role-based access control, two-factor authentication, the unaided/aided
  arm blinding gate (readers cannot reach AI artefacts in the unaided arm), washout enforcement
  between phases, structured reader response capture, an audit trail, and a results export.
- Backend test suite of roughly 500 tests (2026-08-19).

### 3.6 End-to-end conformance

- The **full producer-to-reader chain has been executed against a real deployment**, not simulated:
  a committed pipeline run → an exported, hash-bound case package → delivery into the image store →
  ingestion by the reader workstation → a reader-facing presentation derived solely from the
  authoritative package manifest. Rejection cases were verified to be rejected.
- **Public phrasing:** "The pipeline and the reader environment have been verified to work together
  end to end against a real deployment." Do **not** phrase this as validation, and do not attach a
  verdict word such as PASS to a public sentence.

---

## 4. DEVELOPMENT INTENT / technically verified only — state with the qualifier attached

Permitted, but only with the qualifier. Never promote these into §3.

- **Cross-vendor and cross-protocol comparison** is a design goal and an explicit requirement of the
  validation programme. It is **not** established. Never say the software works across scanners,
  vendors or protocols.
- **Longitudinal contrast-enhancement change detection** exists in the product and is **under active
  technical evaluation**. Its clinical usefulness has not been established, and its architecture is
  under review. Public phrasing: "under technical evaluation"; nothing stronger. Do not describe it
  as a working capability, and do not put it in a feature list beside the FLAIR lane.
- **ANTs-based FLAIR registration determinism** is characterised as bounded, not bit-identical. Do
  not make a blanket "same input, same output" claim; if determinism is mentioned at all, bound it.
- **The shipped container is a transport/orchestration runtime, not a clinical compute appliance** —
  it deliberately ships without the external registration and skull-stripping backends. Do not
  present Lävi Delta as a drop-in appliance or imply one-command clinical deployment.
- Any machine-learning component is in a **research or supporting role**. The clinical core is
  deterministic and statistical. Do not describe the product as AI-powered, and do not publish model
  names or architectures.

---

## 5. PLANNED VALIDATION — clearly future tense, no dates

- A **retrospective multi-reader, multi-case (MRMC) reader study** is in preparation: 100
  retrospective brain MRI cases across three strata — multiple sclerosis, primary brain tumours,
  brain metastases — read by multiple radiologists first unaided and later aided, with washout
  between phases, an independent reference-standard process, and independent statistical input.
  Endpoints under preparation cover localisation performance, false-positive burden, reading time
  and reader confidence, alongside standalone technical performance.
- The final statistical design is **subject to methodology review**. Publish no sample-size
  justification, no power figure, no target effect size.
- Status wording: **"Clinical validation programme in preparation."** Not "underway", not
  "recruiting", not "ongoing".
- Regulatory pathway, as **stages without dates**: product and evidence development → technical
  verification → independent clinical validation → quality and technical documentation →
  conformity assessment → market deployment. Current position: the first two stages, with the third
  in preparation.

---

## 6. RESEARCH ONLY — exists, but must not appear on the website

Real work, not publishable as product:

- Every internal experiment, sprint, negative result, falsified hypothesis, architecture review and
  defect. Including — especially — the ones that are scientifically interesting.
- All public-dataset evaluation work and any figure derived from it. Public datasets are technical
  benchmarking; they are **never** evidence of clinical validation and must not be presented in a
  way that lets a reader mistake one for the other. If public-dataset work is mentioned at all, it
  is mentioned as a *category* on the evidence ladder with no numbers attached.
- Internal identifiers of any kind: issue numbers, requirement IDs, hazard IDs, risk-control IDs,
  threshold names, branch names, commit hashes, document IDs.
- Named datasets, named hospitals contributing data, named cohorts.
- Any internal verdict vocabulary. It is precise internally and looks alarming out of context.

---

## 7. DO NOT PUBLISH — hard prohibitions

These are either false, unsupported, or regulatory hazards. Deletion is preferred to qualification.

**Regulatory status**

- Any statement that Lävi Delta is CE-marked, MDR-compliant, "CE-MDR ready", "fully IEC 62304
  compliant", certified, approved, or available for purchase.
- Any dated regulatory or launch commitment (the previous "2027 CE / 2028 launch" timeline in
  particular).
- Any published EU AI Act classification. The classification recorded internally cites an Annex III
  provision that appears not to apply to medical-device software — it needs correction before it is
  repeated anywhere, let alone publicly. **[FLAG — Delta-side correction, see §10.]**

**Performance and validation**

- "Clinically validated", "proven", "validated on …", "clinical-grade", "guaranteed", "zero risk".
- Any sensitivity, specificity, accuracy, AUC, detection rate, false-positive rate or reading-time
  figure. No performance number of any kind, from any source, including public datasets.
- "Validated across any scanner", "works on any 1.5T or 3T scanner", or any scanner-envelope claim.
  (An internal limitations table uses the word "validated" loosely about the 1.5T/3T envelope; that
  wording does not survive contact with a reviewer and must not be exported to the website.)
- Processing-time claims such as "under two minutes".

**Safety**

- "Safe for clinical use."
- "No unreliable results ever reach the clinician." The correct statement is the §3.3 one: the
  system can surface quality-control failures explicitly and withhold unsupported longitudinal
  output. It cannot guarantee that only reliable results are shown.
- Any implication that absence of a candidate is evidence of absence of change. It is not — this is
  a documented limitation and the reader is required to assess the images independently.

**Capability**

- Automatic diagnosis, disease detection, disease classification, or treatment-response assessment.
- Lesion counting or lesion-level tracking. The software detects voxel-level change; it does not do
  instance-level lesion segmentation or lesion-to-lesion matching.
- RANO or RANO-BM response assessment. Not performed.
- MAGNIMS-aligned reporting. Not performed.
- Brain volume quantification / volumetry. Not a product capability.
- Per-lesion confidence or probability. Deliberately reframed internally as review priority, for
  correct Class IIa positioning; do not reintroduce probability language publicly.
- Named model architectures or ensembles, shadow models, exact counts of quality-control checks, or
  any internal threshold logic. These change, and a website that names them becomes false silently.
- "Self-validation" in any form.

**Marketing register**

- revolutionary, game-changing, cutting-edge, groundbreaking, next-generation, unprecedented,
  AI-powered, clinical-grade, intelligent, seamless, transformative.
- Competitor comparisons of any kind, named or implied.
- Testimonials, partner logo walls, customer counts, install-base claims, fabricated dashboards or
  fabricated MRI outputs.

---

## 8. Numbers — the whitelist

Only these may appear, and only where they add something:

- Planned MRMC study: **100 cases, three clinical strata** (as a *plan*).
- Patient population: **adults 18+**.
- Nothing else. Every other number on the current site should be deleted rather than sourced.

---

## 9. Third parties

- **Do not** imply endorsement by any hospital, university, accelerator, funding body or notified
  body. Participation and collaboration are not endorsement, and the distinction must be visible in
  the wording, not merely intended.
- Accelerator/programme participation may be described as company development support only.
- No logos without written permission on file.
- All specific names are **[DECISION REQUIRED]** — see §10.

---

## 10. Open decisions — Andreas only

Nothing below may be resolved by inference. Leave the copy out until answered.

1. **Registered legal name and address** (§1). Which entity is real; IFU correction follows.
2. **Public population statement** (§2): IFU population (including cerebrovascular/white-matter
   disease) or validation population (MS / primary tumour / metastases)?
3. **Own public title:** "neuroradiologist", "radiologist", or a formulation naming the subspecialty
   without a formal claim. Whether current hospital affiliations may be named at all.
4. **Alvar Haug:** public role title (the draft brief proposes "Infrastructure & Security"; if he is
   CTO, publishing anything less is both wrong and a conversation you should have first), plus any
   verified biography facts. No invented credentials.
5. **May the clinical validation site be named publicly?** Requires the site's written agreement.
   Default: not named.
6. **May the university / statistical partner be named publicly?** Default: not named.
7. **May the notified body be named publicly?** Default: not named — naming one before a signed
   engagement and before submission creates an expectation you do not control.
8. **Exact accelerator/funding wording**, and whether participation is public yet.
9. **Whether any screenshot may be published**, and if so from which surface, on which data
   (synthetic or public), and with what on-image label. Recommended: reader-workstation screenshot,
   synthetic data, visibly labelled illustrative.
10. **Whether sample reports currently public may remain public.**
11. **Whether the "what we have not proven" section is published at all.** Recommended yes — it is
    the strongest credibility move available and almost no competitor has one — but it is a
    positioning decision, and the boundary in §11 must hold.

---

## 11. The transparency boundary

If the honest-limitations section is published, it states the **shape** of the discipline and the
**category** of what is unproven. It never states specific negative results.

**Publishable:**

- Clinical performance has not yet been established; that is what the validation programme is for.
- The software is not CE-marked and is not available for clinical sale.
- Some capabilities are implemented but still under technical evaluation and are not part of any
  performance claim.
- Absence of a flagged candidate is not evidence that no change occurred; the radiologist reads the
  study independently.

**Not publishable:** which capability failed which internal test, any internal verdict, any
experiment outcome, any defect, any number attached to any of it. A notified body will ask; the
website does not pre-answer.

---

## 12. Required regulatory statement

A statement to this effect must be visible on the site (footer, plus the regulatory and product
sections):

> Lävi Delta is under development. It is not CE-marked, is not available for sale, and must not be
> used for clinical decision-making. Information on this site describes a product in development and
> its planned evaluation, not the performance of a marketed medical device.

Rationale: MDR Article 7 prohibits public wording that misleads about intended purpose, safety or
performance, and a non-conforming device shown publicly must be accompanied by a visible statement
of its status. This sentence is also the single cheapest thing on the site to get right.

---

## 13. Maintenance

- Time-sensitive statements (validation status, regulatory stage, partner names, programme
  participation) live in **one** central content module, not scattered through markup.
- The validation and regulatory sections carry a visible **"Status as of &lt;date&gt;"**.
- Any change to a claim updates `docs/public-claims-register.md` in the same commit.
- This file is re-approved by the risk owner before any material claim change ships.
