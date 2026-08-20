# Website content decisions — v2 rebuild

**Date:** 2026-08-20. Companion documents: `docs/phase0-audit.md` (full claims audit of the old
site), `docs/public-claims-register.md` (register of every claim on the new site),
`docs/design-plan.md` (design rationale).

---

## 1. Decisions taken by the risk owner (Andreas Müürsepp, 2026-08-20)

| ID | Question (truth source §10) | Decision |
|---|---|---|
| D1 | Registered legal entity and city (§10.1) | **Lävi Clinical Suite OÜ, Tartu.** Used in footer, imprint, JSON-LD. Consequence: IFU-CA-2.1, which names "Lavi Clinical Solutions OU, Tallinn", must be corrected on the company side. |
| D2 | Public patient population (§10.2) | **Validation strata**: multiple sclerosis, primary brain tumours, brain metastases. Presented on the site as the strata of the planned reader study / initial clinical settings, not as validated indications. Consequence: IFU §4 to be narrowed to match. |
| D3 | Founder public title (§10.3) | **"Neuroradiologist"; no hospital or university affiliations named.** No publication claims on the site. |
| D4 | Alvar Haug public role (§10.4) | **CTO.** |

## 2. Defaults applied without asking (truth source defaults)

- No hospital, university, statistical partner, notified body, accelerator or funding body is
  named anywhere (§10.5–§10.8: default omit).
- No product screenshots (§10.9: default none). The key visual is an abstract SVG diagram.
- Sample reports removed from the public site (§10.10: default not public).
- The "What we have not proven" section **is** published (§10.11: recommended yes, and the
  build brief instructed it), within the §11 boundary — categories only, no internal results,
  no numbers.

## 3. Findings reported (not resolved unilaterally)

- **F1 — truth-source path.** The truth source had been committed as
  `docs/public-claims-register.md`. Renamed to `docs/product-truth-source.md` (content
  untouched, history preserved via git rename); the claims register now lives at its intended
  path. Mechanical fix, flagged at Phase 0 review.
- **F2 — truth-source status.** The file is marked "DRAFT FOR RISK-OWNER APPROVAL". The build
  brief was treated as approval to use it. Formal approval note still recommended.
- **F3 — "ACME Diagnostics".** Removed as apparent placeholder text. If a real prior company
  should be named in the founder bio, that is a new decision.
- **F4 — brand inconsistencies.** The old logo image and the LinkedIn company URL say
  "Lavi Clinical Solutions"; D1 chose "Lävi Clinical Suite OÜ". The LinkedIn URL is kept as a
  working link. The logo was initially deleted, then restored on the risk owner's request
  (2026-08-20) as the **mark only** (`logo-mark.png`, extracted from the embedded original,
  white background keyed out) in the header of every page — the "CLINICAL SOLUTIONS" wordmark
  text was not restored, so the public site never contradicts D1. Design note: the brief's
  ban on neural-network graphics was applied to product illustration; the company's own
  trademark is identity, not a product claim, and the risk owner decided it stays.
- **F5 — old validation copy.** The previous site promised a *prospective* study; the truth
  source specifies a *retrospective* MRMC study. All old validation copy was deleted.

## 4. Deleted pages and claims

- **Pages deleted:** `sample-report.html`, `sample-report-content.html` (fabricated clinical
  output, lesion counts, "validated deep learning model", internal method names — TS §7,
  §10.10).
- **Claims deleted:** 30 of the 50 material claims on the old site, including every
  performance, timeline, dataset, capability and competitor claim. The complete table with
  per-claim truth-source references is `docs/phase0-audit.md` §3; the summary list: AI-powered
  framing; MS-only positioning; lesion detection/tracking/counting; brain volumetry;
  per-lesion confidence; MAGNIMS alignment; nnU-Net / LST-AI / ANTs naming; shadow-model
  "self-validation"; "11 QC checks" and "10-stage pipeline"; "<2 min" and "under 1 minute";
  "any 1.5T or 3T scanner"; "no unreliable results ever reach the clinician"; "safe for
  clinical use"; "CE-MDR pathway" badges; the 2025→2028 regulatory timeline; named benchmark
  datasets presented as validation; the prospective-study and multi-site-validation promises;
  the icometrix/Quantib comparison section; the "What Sets Us Apart" section; the
  `SoftwareApplication`/`PreOrder` structured data; the base64 brain-network logo.

## 5. Implementation decisions

- **Stack unchanged:** hand-written static HTML on GitHub Pages; no framework, no build step
  (stack lock honoured). One shared stylesheet; one small typed content module.
- **Content architecture:** every time-sensitive statement (status lines, "Status as of"
  date, pathway position) lives in `content/site-status.js` (JSDoc-typed). Stage *names* are
  static; only the *position* is data. Updating status is a one-line change in one file.
  Trade-off: with JavaScript disabled the status lines fall back to their last-committed
  static text in markup (the slots ship with current text as fallback) — the fixed §12
  regulatory statement is always static.
- **Fonts self-hosted** (Archivo variable, Source Serif 4 variable, IBM Plex Mono; latin
  subsets, ~240 KB total) — no Google Fonts CDN calls from visitors' browsers.
- **Google Analytics tag carried over unchanged** (brief: no analytics rework).
- **Third-party component names** (viewer, image store, brain-extraction tools) are withheld
  on the site even where the truth source would permit them — the brief's "no model names"
  rule was applied strictly.
- **Old URLs:** `sample-report.html` now 404s; a designed `404.html` points home. `robots.txt`,
  `sitemap.xml`, favicon set and OG image added.

## 6. Facts still requiring human confirmation (outside this repository)

1. Correct IFU-CA-2.1 manufacturer name/city to match D1.
2. Narrow IFU §4 population to match D2.
3. Formal risk-owner approval note on `docs/product-truth-source.md` (currently "DRAFT").
4. Whether the LinkedIn company slug ("lavi-clinical-solutions") should be renamed to match
   the brand; the site links to it either way.
5. Confirm no real company was meant by "ACME Diagnostics" (F3).
6. Google Analytics property `G-6X7QBW5X59` remains the intended property.

## 7. Acceptance test (brief §17) — answers as read from the built site

- **Radiologist (30 s):** It is a second reader for follow-up brain MRI; it sits after
  acquisition and before/alongside my read, returning DICOM SEG/overlays/report into PACS; it
  explicitly does not diagnose, does not count lesions, and withholds the comparison when QC
  prerequisites fail. All of this is on the first two screens of the homepage.
- **Hospital decision-maker:** Problem = interval change is hard to see and hard to trust
  across differing acquisitions. It is **not** available today — the status line, §12
  statement and "not yet proven" column say so on every page. Remaining validation: the MRMC
  reader study (in preparation) and everything after it on the six-stage pathway.
- **Notified-body reviewer:** No performance figures anywhere; no compliance claims (lifecycle
  facts are phrased as "developed under", never "compliant"); public datasets appear only as a
  category, structurally separated from clinical validation by a full-width boundary line;
  intended purpose wording is a strict subset of the IFU statement; every claim traces to the
  register. The §12 statement is in the footer of every page and in the product/regulatory
  sections.
- **Investor:** Why it matters — the problem section; founder credibility — a neuroradiologist
  who builds the pipeline; what has been built — the eight verified-fact blocks (pipeline,
  abstention architecture, reader workstation, machine-checked traceability, end-to-end
  verification); what is not proven — its own section; next value inflection — the MRMC study
  the infrastructure is already built for.
- **Mirror test:** After reviewing full-page screenshots of all pages together, the caption
  "THE DECISION ENDS HERE" was removed from both key-visual variants — the brief requires the
  radiologist's terminal position to be visible in the composition, not stated in a caption,
  and the composition already shows it (heaviest node, no outgoing edge).
