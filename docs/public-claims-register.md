# Public claims register — lavi-clinical.com

One row per material public claim on the live site. Every row cites the section of
`docs/product-truth-source.md` (TS) that permits it; a claim with no reference is not
publishable and must be removed from the site. Decisions D1–D4 are recorded in
`docs/website-content-decisions.md`.

**Maintenance rule (TS §13):** any change to a claim on the site updates this register in the
same commit, and the truth source is re-approved by the risk owner before a material claim
change ships. Time-sensitive statements live only in `content/site-status.js`.

**Classifications:** `VERIFIED FACT` / `DEVELOPMENT INTENT` / `PLANNED VALIDATION` /
`RESEARCH ONLY` / `DO NOT PUBLISH`.

Last reviewed: 2026-08-20.

---

## Homepage (`index.html`)

| Public claim | Section | TS ref | Classification | Risk if wrong | Approved wording |
|---|---|---|---|---|---|
| Lävi Delta is a second-reader tool for follow-up brain MRI | Hero | §2 | VERIFIED FACT | Misstated intended purpose is an MDR Art. 7 finding | "a second-reader tool for follow-up brain MRI" |
| It brings candidate changes between baseline and follow-up into one focused, auditable review | Hero | §2 | VERIFIED FACT | Implies capability beyond intended purpose | "brings candidate interval changes into one focused, auditable review" |
| Says so explicitly when the comparison cannot be trusted | Hero; 05 | §3.3 | VERIFIED FACT | Overpromising a safety property | Abstention wording per §3.3; never "no unreliable results ever" |
| Clinical validation and regulatory development in progress · not CE-marked | Hero status line | §5, §12 | PLANNED VALIDATION | Implied regulatory status | Exact status line; sourced from `content/site-status.js` |
| Runs inside the hospital; receives studies over standard DICOM; processes without operator interaction; returns results into the existing PACS workflow; no image data needs to leave the institution | 02 Workflow (1); 06 | §3.1 | VERIFIED FACT | Deployment misrepresentation | As TS §3.1 |
| The comparison is quality-assessed with graded outcomes: report / report with caution / explicit refusal to report | 02 Workflow (2); 05 | §3.2 | VERIFIED FACT | Overstating QC guarantees | Three graded outcomes, named as in TS |
| Candidate regions carry location, volume and direction; new/increasing and resolving/decreasing are separate ranked lanes | 02 Workflow (3) | §3.2 | VERIFIED FACT | Implying lesion-level analysis (prohibited §7) | Regions of change; never "lesions", counting, or matching |
| Every candidate is explicitly accepted or rejected by the radiologist; the software makes no diagnostic decision | 02 Workflow (4); key visual | §2 | VERIFIED FACT | Autonomy implication is a classification hazard | As TS §2 |
| Results return as standard DICOM objects: DICOM SEG, overlay series, structured report, with provenance bound | 02 Workflow (5) | §3.1, §3.3 | VERIFIED FACT | Integration overclaim | As TS §3.1 |
| Developed for adults (18+) undergoing longitudinal brain MRI surveillance; not for paediatric imaging, non-brain anatomy, other modalities, or acute stroke triage | 03 Domains | §2 | VERIFIED FACT | Population beyond IFU is a finding | Population + exclusions; number 18+ is on the §8 whitelist |
| Initial clinical settings: multiple sclerosis, primary brain tumours, brain metastases (the strata of the planned reader study) | 03 Domains | §5 + D2 | PLANNED VALIDATION | Public population decision was reserved (§10.2) — resolved by D2 | Framed as study strata / development focus, not validated indications |
| Planned MRMC study: same retrospective cases, several radiologists, unaided then aided; 100 cases across three strata; independent reference standard and statistical input | 04 Validation | §5 | PLANNED VALIDATION | Reads as an existing study if tense slips | Future tense throughout; no dates, power, or effect sizes |
| Clinical validation programme in preparation | 04; status chips | §5 | PLANNED VALIDATION | "Underway/ongoing" would overstate | Exact §5 wording, from `content/site-status.js` |
| Abstention is implemented, not aspirational; withholds the longitudinal result when prerequisites are unmet | 05 Safety | §3.3 | VERIFIED FACT | Safety overclaim if generalised | Never "blocks all unreliable results" |
| Anatomical correspondence is never inferred from a method name; unsupported lanes abstain | 05 Safety | §3.3 | VERIFIED FACT | — | As TS §3.3 |
| Provenance (method, policy identity, input hashes, environment) recorded per run and bound to exports; deterministic and replayable on the path where that claim can be made | 05 Safety | §3.3, §4 | VERIFIED FACT (with §4 qualifier) | Blanket determinism claim would be false (ANTs path is bounded) | Qualifier "on the path where the claim can be made" is mandatory |
| Absence of a flagged candidate is not evidence that nothing changed; the radiologist reads independently | 05 Safety | §11, §7 | VERIFIED FACT | Omitting this implies negative results are reassurance | As TS §11 |
| Traceability is machine-checked; the build fails on requirement–test drift or document–code drift | 06 Technology | §3.4 | VERIFIED FACT | — | As TS §3.4 |
| Pipeline and reader environment verified to work together end to end against a real deployment; rejected cases verified rejected | 06; 08 | §3.6 | VERIFIED FACT | Must not be phrased as validation | Exact §3.6 public phrasing; no verdict words |
| Dedicated reader workstation exists and is deployed: arm blinding, washout enforcement, role-based access, audit trail — implemented and tested | 08 Status | §3.5 | VERIFIED FACT | — | As TS §3.5 |
| Large, continuously run automated test suite | 08 Status | §3.4 | VERIFIED FACT | Publishing the count would go stale | Fact of the suite only; no numbers |
| Lävi Clinical Suite OÜ, Estonian medical software company, Tartu | 07 Company; footer | §1 + D1 | VERIFIED FACT | Wrong legal identity is a notified-body finding | Per decision D1; IFU correction pending on company side |
| Building Lävi Delta as a medical device under the EU MDR | 07 Company | §2 | DEVELOPMENT INTENT | Must never read as compliance achieved | "being developed … under the EU MDR"; never "compliant" |
| Andreas Müürsepp — Founder & CEO, neuroradiologist; reads longitudinal brain MRI and develops the pipeline | 07 Company | §10.3 + D3 | VERIFIED FACT (per risk-owner decision) | Title overstatement | Per D3: "neuroradiologist", no institutions named |
| Alvar Haug — CTO; leads infrastructure, deployment and security | 07 Company | §10.4 + D4 | VERIFIED FACT (per risk-owner decision) | Role misstatement | Per D4 |
| Not yet proven: clinical performance; cross-vendor/cross-protocol; capabilities under technical evaluation; regulatory conformity | 08 Status | §11, §4 | DEVELOPMENT INTENT / PLANNED VALIDATION | Boundary §11: categories only, no internal results | As written; no specific negative results, no numbers |
| Regulatory statement (under development; not CE-marked; not for sale; not for clinical decision-making…) | 08; footer (all pages) | §12 | VERIFIED FACT | Absence is itself the risk | Exact §12 wording, static in markup |

## Validation & evidence page (`validation.html`)

| Public claim | Section | TS ref | Classification | Risk if wrong | Approved wording |
|---|---|---|---|---|---|
| Plain-language MRMC explanation (same cases, several readers, unaided then aided, washout, controls for reader and case differences) | 01 | §5 | PLANNED VALIDATION | Must not imply the study exists | Future/It-will framing; MRMC expanded in words at first use |
| No clinical performance claim is made until the study is run and independently analysed | Hero; 01 | §5, §11 | VERIFIED FACT | — | As written |
| Evidence ladder rung 1: technical development exists today | 02 | §3 | VERIFIED FACT | — | As written |
| Evidence ladder rung 2: public-dataset evaluation as a category; no figures published; never clinical validation | 02 | §6 | RESEARCH ONLY (category named, no content) | Named datasets or figures are prohibited | Category only; the divider line separating it from rung 3 is a design requirement |
| Rung 3: independent clinical validation — not started, in preparation | 02 | §5 | PLANNED VALIDATION | — | As written |
| Rung 4: regulatory validation — future conformity-assessment evidence package | 02 | §5 | PLANNED VALIDATION | — | As written |
| Study design details (100 retrospective cases; three strata; multiple readers; washout; independent reference standard and statistics; endpoints under preparation: localisation performance, false-positive burden, reading time, reader confidence, standalone technical performance; final design subject to methodology review) | 03 | §5 | PLANNED VALIDATION | Any power figure, sample-size justification or date is prohibited | As TS §5; the only permitted numbers are 100 and three |
| Reader environment: browser-based workstation deployed; RBAC + two-factor; blinding gate; washout enforcement; structured response capture; audit trail; results export — implemented and tested | 04 | §3.5 | VERIFIED FACT | — | As TS §3.5 |
| End-to-end verification incl. rejection path | 04 | §3.6 | VERIFIED FACT | — | §3.6 phrasing |
| "What we have not proven" (4 statements) | 05 | §11, §4 + §10.11 (D-default: publish) | DEVELOPMENT INTENT / PLANNED VALIDATION | §11 boundary: shape and category only | Exactly the four §11-publishable statements; contrast-enhancement named only as "under technical evaluation" per §4 |
| Regulatory pathway: six named stages, no dates; position = first two current, third in preparation | 06 | §5 | PLANNED VALIDATION | A dated stage would violate §7 | Stage names static; position from `content/site-status.js` |

## Technology page (`technology.html`)

| Public claim | Section | TS ref | Classification | Risk if wrong | Approved wording |
|---|---|---|---|---|---|
| No model internals, check counts or thresholds are published, because they change | Hero | §7 (rationale) | VERIFIED FACT (statement about the site) | — | As written |
| On-premise deployment; standard DICOM in; DICOM SEG + overlays + structured report out; no proprietary viewer required | 01 | §3.1 | VERIFIED FACT | — | As TS §3.1 |
| The shipped software is an integration/orchestration runtime, deliberately not a sealed appliance; no one-command clinical deployment implied | 01 | §4 | DEVELOPMENT INTENT (limiting statement) | Appliance framing is prohibited | As TS §4 |
| Series identification from DICOM header evidence incl. vendor private tags; fails closed with an explicit error | 02 | §3.1 | VERIFIED FACT | — | As TS §3.1 |
| Longitudinal registration; intra-session pre/post-contrast alignment; brain extraction via established, widely used tools | 02 | §3.2 | VERIFIED FACT | Tool names withheld (site policy, stricter than TS) | No model or tool names |
| Per-run provenance bound to artefacts; deterministic on the path where the claim can be made; bounded elsewhere and characterised as such | 03 | §3.3, §4 | VERIFIED FACT (with §4 qualifier) | Blanket determinism claim would be false | Qualifier mandatory |
| Correspondence-not-inferred principle | 03 | §3.3 | VERIFIED FACT | — | As TS §3.3 |
| Candidates: location, volume, direction; separate ranked lanes; ordered by review priority; radiologist accepts/rejects each | 04 | §3.2, §2 | VERIFIED FACT | "Review priority", never confidence/probability (§7) | As written |
| Does **not** count lesions, match lesions between visits, classify disease, or make a diagnostic decision | 04 | §7 (capability boundaries) | VERIFIED FACT (negative claim) | — | Stating absences is required, not optional |
| QC grades the comparison; abstention is a first-class output; explicitly does **not** guarantee every unreliable result is caught | 05 | §3.2, §3.3, §7 | VERIFIED FACT | The "guarantee" sentence is the §7-mandated correction | As written |
| IEC 62304 Class B lifecycle; ISO 14971 risk file; requirements spec; requirement-to-test traceability; controlled documents; change log | 06 | §3.4 | VERIFIED FACT | "Fully compliant" phrasing is prohibited | Lifecycle facts only |
| Machine-checked traceability guards; added after audits found traceability rows that did not hold | 06 | §3.4 | VERIFIED FACT | History owned "in general terms" only (§3.4) | No issue IDs, no specifics |
| Large automated test suite, run across multiple runtime versions in CI | 06 | §3.4 | VERIFIED FACT | No count (goes stale; not on §8 whitelist) | As written |
| End-to-end chain: committed run → hash-bound package → image store → workstation ingestion → presentation solely from the package manifest; rejection path verified | 07 | §3.6 | VERIFIED FACT | No verdict vocabulary | As TS §3.6 |
| Reader workstation: pinned open-source viewer, standard image store, phase-aware proxy; RBAC/2FA, blinding, washout, response capture, audit trail, export — implemented and tested | 08 | §3.5 | VERIFIED FACT | — | Component brand names withheld (site policy) |

## Metadata, structured data, assets (all pages)

| Public claim | Location | TS ref | Classification | Risk if wrong | Approved wording |
|---|---|---|---|---|---|
| Titles/meta descriptions: second-reader tool for follow-up / longitudinal brain MRI, in development, not CE-marked | `<head>` | §2, §12 | VERIFIED FACT | Meta text is public wording under MDR Art. 7 | Restatements only; no banned register |
| JSON-LD: `Organization` (name, Tartu EE, contact, founder name + company role) + `WebSite` | `<head>` | §1 + D1 | VERIFIED FACT | Structured data must not assert product status | No `SoftwareApplication`, no offers/availability, no capability adjectives |
| OG image: abstract interval-pair mark, "Make interval change easier to see.", "in development · not CE-marked" | `og.png` | §2, §12 | VERIFIED FACT | Images are claims too | Abstract only; no fabricated clinical output |
| Key visual: baseline → follow-up → QC gate → candidates → radiologist (terminal); withheld branch | `index.html` SVG + alt text | §2, §3.2, §3.3 | VERIFIED FACT | Composition must not imply autonomous diagnosis | Radiologist is the terminal node; abstract contours only |
| Fig. 2 (home): slice-geometry mismatch between visits | `index.html` SVG | — (clinical background, no product claim) | VERIFIED FACT (general knowledge) | Must stay schematic | Labelled "schematic; not patient data" |
| Fig. 1 (validation): planned MRMC study design diagram | `validation.html` SVG | §5 | PLANNED VALIDATION | Diagram must read as a plan, not a running study | Caption: "in preparation; final design subject to methodology review" |
| Fig. 1 (technology): deployment inside hospital network, no image data leaves | `technology.html` SVG | §3.1 | VERIFIED FACT | — | Schematic |
| Fig. 2 (technology): verified producer-to-reader chain incl. rejected-run stop | `technology.html` SVG | §3.6 | VERIFIED FACT | No verdict vocabulary beyond §3.6 phrasing | "executed against a real deployment" |

## Claims deliberately absent

Everything in TS §6 and §7, including: performance numbers of any kind; named datasets;
scanner/vendor envelope claims; processing-time claims; lesion counting or tracking; volumetry;
per-lesion confidence; MAGNIMS/RANO; model or ensemble names; QC check counts; shadow models or
self-validation; CE/compliance status or dated regulatory commitments; EU AI Act classification;
competitor comparisons; testimonials or partner names; "safe for clinical use"; the banned
marketing register. See `docs/phase0-audit.md` for the full deletion list with references.
