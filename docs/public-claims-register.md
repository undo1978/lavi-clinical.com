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

Last reviewed: 2026-08-21.

---

## Homepage (`index.html`)

| Public claim | Section | TS ref | Classification | Risk if wrong | Approved wording |
|---|---|---|---|---|---|
| Lävi Delta is a second-reader tool for follow-up brain MRI | Hero | §2 | VERIFIED FACT | Misstated intended purpose is an MDR Art. 7 finding | "a second-reader tool for follow-up brain MRI" |
| It brings candidate changes between baseline and follow-up into one focused, auditable review | Hero | §2 | VERIFIED FACT | Implies capability beyond intended purpose | "brings candidate interval changes into one focused, auditable review" |
| Says so explicitly when the comparison cannot be trusted | Hero; 05 | §3.3 | VERIFIED FACT | Overpromising a safety property | Abstention wording per §3.3; never "no unreliable results ever" |
| Clinical validation and regulatory development in progress · not CE-marked | Hero status line | §5, §12 | PLANNED VALIDATION | Implied regulatory status | Exact status line; sourced from `content/site-status.js` |
| Runs inside the hospital; receives studies over standard DICOM; processes without operator interaction; returns results into the existing PACS workflow; in the intended on-premise deployment no image data needs to leave the institution | 02 Workflow (1); 06; proof strip | §3.1 + D7 scoping | VERIFIED FACT | Unscoped "no data leaves" would overreach the development/MRMC architecture | Always tied to the intended on-premise clinical deployment (D7/Q11) |
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
| Provenance (method, policy identity, input hashes, environment) recorded per run and bound to exports | 05 Safety | §3.3 | VERIFIED FACT | — | Homepage states provenance only and links deeper; the exact-vs-bounded determinism claim lives solely on the technology page (§3.3 + §4 qualifier mandatory there) |
| Absence of a flagged candidate is not evidence that nothing changed; the radiologist reads independently | 05 Safety | §11, §7 | VERIFIED FACT | Omitting this implies negative results are reassurance | As TS §11 |
| Traceability is machine-checked; the build fails on requirement–test drift or document–code drift | 06 Technology | §3.4 | VERIFIED FACT | — | As TS §3.4 |
| Pipeline and reader environment verified to work together end to end in a full production-form deployment (pipeline, image store, reader workstation); rejected cases verified rejected | 06; 08; proof strip | §3.6 + D7/Q12 precision | VERIFIED FACT | Must not read as validation, nor as a hospital-site deployment | "full production-form deployment…"; technology page adds the explicit "not a routine clinical deployment at a hospital site" |
| Dedicated reader workstation exists and is deployed: arm blinding, washout enforcement, role-based access, audit trail — implemented and tested | 08 Status | §3.5 | VERIFIED FACT | — | As TS §3.5 |
| Large, continuously run automated test suite | 08 Status | §3.4 | VERIFIED FACT | Publishing the count would go stale | Fact of the suite only; no numbers |
| Lävi Clinical Suite OÜ, Estonian medical software company, Tartu | 07 Company; footer | §1 + D1 | VERIFIED FACT | Wrong legal identity is a notified-body finding | Per decision D1; IFU correction pending on company side |
| Building Lävi Delta as a medical device under the EU MDR | 07 Company | §2 | DEVELOPMENT INTENT | Must never read as compliance achieved | "being developed … under the EU MDR"; never "compliant" |
| Andreas Müürsepp — Founder & CEO, neuroradiologist; drove the design of the pipeline from its first version | 07 Company | §10.3 + D3 (title reconfirmed 2026-08-21) | VERIFIED FACT (per risk-owner decision) | Sole-authorship reading would invite an IEC 62304 competence question | "drove the design … from its first version", never "wrote the core pipeline himself". The defensive discipline sentence was removed 2026-08-21 (audience round D3) — the competence answer now lives on the careers page (draft) |
| Alvar Haug — CTO; leads infrastructure, deployment and security | 07 Company | §10.4 + D4 | VERIFIED FACT (per risk-owner decision) | Role misstatement | Per D4 |
| Not yet proven: clinical performance; cross-vendor/cross-protocol; capabilities under technical evaluation; regulatory conformity | 08 Status | §11, §4 | DEVELOPMENT INTENT / PLANNED VALIDATION | Boundary §11: categories only, no internal results | As written; no specific negative results, no numbers |
| Regulatory statement (under development; not CE-marked; not for sale; not for clinical decision-making…) | 08; footer (all pages) | §12 | VERIFIED FACT | Absence is itself the risk | Exact §12 wording, static in markup |
| Company positioning: "Longitudinal infrastructure for brain MRI"; Lävi Delta is "our first product" | Hero kicker + standfirst | D6 (risk-owner instruction 2026-08-21); component facts §3 | DEVELOPMENT INTENT (positioning) | Must stay a statement of what is being built, never of validated capability | "infrastructure", not "intelligence layer" — "intelligent" is banned register (§7) |
| Proof strip: working end-to-end system (implemented, tested, verified against a real deployment); on-premise DICOM/PACS deployment model; independent multi-reader study in preparation with reader infrastructure existing | Proof strip after Fig. 1 | §3.6, §3.1, §3.5, §5 | VERIFIED FACT ×2 + PLANNED VALIDATION | De-risking facts must not read as commercial traction — no customers, pilots, or routine clinical use implied | Exact §3 phrasings; third cell future tense |
| Platform section: the reusable longitudinal layer (ingestion, registration, QC/abstention, candidate analysis, provenance, DICOM/PACS, review environment, reader-study infrastructure, validation/regulatory architecture); Delta is the first product on it and will carry it through validation | 03 Platform | D6; components §3.1–§3.6, §5 | DEVELOPMENT INTENT (framing) over VERIFIED FACTs (components) | Layer-reuse efficiency is strategy, not evidence — no cross-product performance implied | "will carry", future tense; no "moat" language |
| Who it is for: radiology departments / imaging organisations reading longitudinal brain MRI routinely; fits existing DICOM/PACS workflow | 03 Platform | §3.1 + D6 | DEVELOPMENT INTENT | No pricing, ROI, time-savings, procurement or pilot claims | "being built for"; workflow facts per §3.1 |
| Why now: surveillance protocols add examinations year after year while review remains side-by-side human comparison | 01 Problem | — (clinical background) | VERIFIED FACT (general knowledge) | No market figures, no TAM | Qualitative only |
| Roadmap third node: further longitudinal workflows can reuse the validated infrastructure; none announced beyond Lävi MS | 09 Roadmap | D5 + D6 | DEVELOPMENT INTENT | Must not read as announced products | "None are announced beyond Lävi MS" stated in the card itself |
| Company built on three legs; the reference standard and statistical analysis of the planned study are planned to be independently defined and reviewed; company development supported by participation in the Health Founders Estonia DEVELOP programme | 08 Company | §5 + §9 + D7 (Q14, Q19) | PLANNED VALIDATION + VERIFIED FACT (programme participation) | Present-tense independence would imply contractually final roles; programme mention must stay development support, never endorsement or financing | "planned to be independently defined and reviewed" site-wide; HFE named per D7 approval |
| Contact: four labelled routes; investor route states that dated internal development, validation and evidence-planning documentation exists and may be shared under NDA / controlled data-room access in qualified conversations | 11 Contact | D6 + D7 (Q21) | DEVELOPMENT INTENT + VERIFIED FACT (documentation exists) | Never describe the material as externally audited, final or regulatory-approved | As written |

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
| No released partner-facing integration interface today; analytical architecture modular by design; partner-facing interface is development intent; partner conversations welcome | 09 Integration | §4 + D7 (Q13) | VERIFIED FACT (absence) + DEVELOPMENT INTENT | Promising an API that does not exist | "development intent, not a current capability" |

## Lävi MS page (`lavi-ms.html`) — all claims rest on risk-owner decision D5 (2026-08-21)

| Public claim | Section | TS ref | Classification | Risk if wrong | Approved wording |
|---|---|---|---|---|---|
| Lävi MS is the planned next product in the Lävi Clinical Suite roadmap; a dedicated MS longitudinal workflow | Hero; nav; home roadmap | D5 | DEVELOPMENT INTENT | Must never read as available, validated or "coming soon" | Status: "Planned next product programme"; from `content/site-status.js` |
| MS follow-up is inherently longitudinal; the decisive task is change assessment over time | 01 | D5 (clinical background) | VERIFIED FACT (general knowledge) | — | No product claim in this section |
| Planned scope: baseline/follow-up comparison, longitudinal alignment, MS lesion analysis, candidate new/changing lesion identification, QC information, structured auditable review | 02, 05 | D5 | DEVELOPMENT INTENT | Lesion-level language is permitted here **only** as planned future scope, future tense — never as an existing capability (contrast Delta §7 prohibitions) | "planned system", "expected to cover"; closing note that final outputs are determined by the validated product |
| The radiologist remains responsible; no autonomous MS diagnosis, no treatment decisions | 02, 06 | D5 | DEVELOPMENT INTENT (limiting) | — | As written |
| Delta-first sequencing: Delta establishes the platform (ingestion/provenance, registration, QC, workflow, review environment, auditability, validation methodology); Lävi MS builds on it with its own validation and regulatory pathway | 03; Fig. 1 | D5 | DEVELOPMENT INTENT | MS must not inherit Delta's validation by implication | "own development, clinical-validation and regulatory pathway"; solid vs dashed encoding in Fig. 1 |
| Intended future users: (neuro)radiologists reading MS follow-up; MS centres; radiology departments | 04 | D5 | DEVELOPMENT INTENT | — | "intended", future tense |
| Not validated, not CE-marked, not available; programme not started | 06; footer | D5 + §12 | DEVELOPMENT INTENT / VERIFIED FACT | Absence is the risk | Footer regulatory statement extended with the Lävi MS sentence |

## Hospitals page (`hospitals.html`) — shipped per D7

| Public claim | Section | TS ref | Classification | Risk if wrong | Approved wording |
|---|---|---|---|---|---|
| Early collaboration is research/development context only; possible scopes: workflow evaluation, technical/deployment evaluation, separately agreed clinical validation | 01 | D7 (Q6) | DEVELOPMENT INTENT (offer) | Must never read as routine clinical use | As D7 wording |
| Requirements: ethics/governance approval as applicable, data agreement, retrospective data, hospital IT involvement, defined reader time | 01 | D7 (Q6) | DEVELOPMENT INTENT | — | "typically requires" |
| No software licence fee for agreed early research collaborations; each party bears its own internal costs unless agreed otherwise | 01 | D7 (Q6) | VERIFIED FACT (policy) | Must not read as a price commitment for a marketed product | As written |
| Formal-programme participation subject to study protocol, not implied by early collaboration | 01 | D7 (Q6) | DEVELOPMENT INTENT | Protects the controlled validation cohort | As written |
| Hardware figures not published because requirements are not frozen | 02 | D7 (Q7–Q8) | VERIFIED FACT (statement about publication) | Publishing numbers that change is the risk being avoided | No figures, no "available on request" |
| Security actuals: on-premise intended deployment; RBAC + MFA; audit logging where implemented | 03 | §3.1, §3.5 + D7 (Q11) | VERIFIED FACT | — | "where implemented" qualifier on audit logging |
| In preparation: MDCG 2019-16 alignment, penetration testing, patch policy, verified encryption at rest/in transit | 03 | D7 (Q11) | DEVELOPMENT INTENT (labelled) | Any of these as current-state would be a false compliance claim | "listed as intent, not as achievement; none claimed complete until verification is" |
| End-to-end verification = full production-form deployment, not a hospital-site clinical deployment | 04 | §3.6 + D7 (Q12) | VERIFIED FACT | Implying a hospital deployment | Explicit negative stated |

## Careers page (`careers.html`) — shipped per D7

| Public claim | Section | TS ref | Classification | Risk if wrong | Approved wording |
|---|---|---|---|---|---|
| Engineering-culture facts (machine-checked traceability incl. "once was enough" history; abstention/fail-closed engineering; IEC 62304 Class B + ISO 14971 lifecycle in active use; continuous test suite; founder reads the studies) | 01 | §3.2–§3.5, §10.3/D3 | VERIFIED FACT | Same boundaries as the product pages | Reuses registered wording |
| No formal open positions; speculative applications welcome and read | 02 | D7 (Q16) | VERIFIED FACT | — | As written |
| Based in Tartu; working arrangements depend on the role | 02 | D7 (Q17) | VERIFIED FACT | No remote/hybrid policy promised | As written |
| Stack, plumbing level only: Python, FastAPI, OHIF, Orthanc, PostgreSQL, DICOM/DICOMweb, Linux | 02 | D7 (Q18) | VERIFIED FACT | Careers-context exception to the no-component-names site policy; no model/algorithm stack | Exactly this list, nothing more |
| Financing: deliberately absent | — | D7 (Q19) | DO NOT PUBLISH (for now) | RUP not yet awarded; nothing guaranteeable | Omitted |

## Privacy & legal pages (`privacy.html`, `legal.html`; footer imprint on all pages) — shipped per D7

| Public claim | Section | TS ref | Classification | Risk if wrong | Approved wording |
|---|---|---|---|---|---|
| Controller: Lävi Clinical Suite OÜ, registry code 17396580, Aardla tn 62, 50413 Tartu | privacy 01; legal; every footer | D1 + D7 (Q1, address confirmed by risk owner) | VERIFIED FACT | Wrong legal identity | As confirmed |
| No cookies, no analytics, no tracking, no forms, self-hosted fonts, no third-party scripts | privacy 02 | D7 (Q5 — GA removed) + repo audit | VERIFIED FACT | Any future script addition invalidates this — re-audit before adding anything | Stated as a strength |
| Email processed by Microsoft (Exchange Online/Outlook) via GoDaddy; lands in founder's mailbox | privacy 02 | D7 (Q2) | VERIFIED FACT | — | As written |
| Retention: up to 24 months after last substantive exchange, unless ongoing relationship | privacy 02 | D7 (Q3) | VERIFIED FACT (policy) | Must be actually practised | As written |
| GitHub Pages hosting; provider processes IP/request metadata; we hold no server logs | privacy 02 | D7 (Q4) + repo | VERIFIED FACT | — | As written |
| Data-subject rights + Andmekaitse Inspektsioon as supervisory authority | privacy 03 | GDPR | VERIFIED FACT | — | Plain language |

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
