# Phase 0 audit — lavi-clinical.com (v2 rebuild)

**Date:** 2026-08-20
**Auditor:** website rebuild agent, against the product truth source (see finding F1 below for its location).
**Status:** FOR REVIEW — no site changes have been made. The rebuild does not begin until this audit and the design plan (`docs/design-plan.md`) are reviewed.

---

## 1. Repository inventory

| Aspect | Finding |
|---|---|
| Framework | None. Hand-written static HTML. No package.json, no build step, no tests, no CI. |
| Pages | `index.html` (single-page site, ~230 KB, inline CSS + JS), `sample-report.html` (iframe wrapper), `sample-report-content.html` (synthetic MS report, ~173 KB). |
| Routing | Flat files on GitHub Pages. `CNAME` → `lavi-clinical.com`. |
| Styling | Inline `<style>` per page. Fonts via Google Fonts CDN (Plus Jakarta Sans + JetBrains Mono; the sample report separately loads Inter). |
| JavaScript | Inline: smooth scroll, IntersectionObserver reveal animations, Google Analytics (gtag, `G-6X7QBW5X59`). |
| Forms | None. Contact is `mailto:` and `tel:` links. |
| SEO | Title/meta/OG/Twitter present but MS-specific and claim-laden. Two JSON-LD blocks (`MedicalOrganization`, `SoftwareApplication` with a `PreOrder` offer). **No favicon, no robots.txt, no sitemap.xml, no 404 page.** `logo.png` is referenced in JSON-LD but does not exist in the repo. |
| Images | One base64-embedded logo PNG reading "LÄVI CLINICAL SOLUTIONS" with a network-brain mark. Inline SVGs elsewhere. |
| Defects observed | Most homepage sections are invisible until scrolled (reveal-animation dependency — content requires JS/animation). Full-page rendering shows large blank regions. Logo brand name ("Clinical Solutions") disagrees with site text ("Clinical Suite"). |

Screenshots of the current site (desktop 1440px, mobile 390px): `docs/phase0/screenshots/`.

---

## 2. Findings to report (per brief §16 — reported, not resolved)

- **F1 — The truth source is at the wrong path.** `docs/product-truth-source.md` does not exist anywhere in this repository's history. The file committed as `docs/public-claims-register.md` *is* the truth source — its title is "Lävi Clinical Suite — Product Truth Source" and it contains §0–§13 exactly as the brief references them. This audit treats that file as the truth source. Proposed mechanical fix in Phase 1: `git mv docs/public-claims-register.md docs/product-truth-source.md` (content untouched), then create the actual claims register at `docs/public-claims-register.md`.
- **F2 — Truth-source status line.** The file is marked "DRAFT FOR RISK-OWNER APPROVAL". Confirmation that it is approved for use is assumed from the build brief; flagging for the record.
- **F3 — "ACME Diagnostics".** The current team section states the founder is "founder of ACME Diagnostics". This reads as placeholder text. It appears nowhere in the truth source and will be deleted; if a real prior company should be named, that is a §10.3-adjacent decision.
- **F4 — Brand-name inconsistency across surfaces.** Logo image and LinkedIn URL say "Lavi Clinical Solutions"; site text and footer say "Lävi Clinical Suite OÜ, Tartu"; the controlled IFU (per truth source §1) says "Lavi Clinical Solutions OU, Tallinn". Feeds blocking decision §10.1.
- **F5 — The current validation section misdescribes the planned study.** It promises a *prospective* study; truth source §5 specifies a *retrospective* MRMC reader study. The old copy is deleted wholesale, so nothing carries over — recorded here because it shows the current site cannot be used as evidence for anything.

---

## 3. Claims audit table

Every material public claim on the current site, classified against the truth source (TS). Disposition counts: **DELETE 30 · REWRITE 12 · KEEP 2 · BLOCKED 6**.

| # | Current claim (location) | TS reference | Disposition | Notes |
|---|---|---|---|---|
| 1 | Title/meta: "Longitudinal MRI Analysis for Multiple Sclerosis" | §2 | REWRITE | Product scope is longitudinal brain MRI, not MS-only. Brief §14: title must not be MS-specific. |
| 2 | Meta description: "AI-powered… automatically detect new and enlarging lesions… CE-MDR pathway" | §7 | DELETE | "AI-powered" banned; lesion detection/tracking not a capability; regulatory-pathway badge language. |
| 3 | Meta keywords list (WMH segmentation, brain atrophy, etc.) | §7 | REWRITE | Replace with brief-§14 keyword territory; remove volumetry/atrophy/WMH-detection terms. |
| 4 | JSON-LD `MedicalOrganization`: "AI-powered… MS lesion detection and brain volume quantification… clinical-grade" | §7 | REWRITE | Rebuild as plain `Organization`; no capability claims; no "clinical-grade". |
| 5 | JSON-LD address `Tartu, EE` and footer "Lävi Clinical Suite OÜ" / "© 2026 Lävi Clinical Suite OÜ" | §1, §10.1 | **BLOCKED** | Registered legal name and city unresolved (Suite/Tartu vs Solutions/Tallinn). |
| 6 | JSON-LD `SoftwareApplication` "Lävi MS Analysis Pipeline" with `PreOrder` offer | §7, §12 | DELETE | Asserts an availability status; describes per-lesion tracking and "clinical-grade reporting". Brief §14: structured data must not assert status the site doesn't claim. |
| 7 | Hero: "AI-Powered MS Monitoring for Clinical Teams" | §7 | DELETE | Banned register; wrong scope. Replaced by new hero per brief §6.1. |
| 8 | Hero: "Automatically detect new and enlarging lesions, track disease progression" | §7 | DELETE | Lesion-level tracking and disease-progression assessment are explicitly not capabilities. |
| 9 | Hero: "built-in quality control that blocks unreliable results" | §3.3, §7 | REWRITE | The real claim is abstention: withholds the longitudinal result when prerequisites are unmet. "Blocks unreliable results" overpromises (§7: "no unreliable results ever reach the clinician" is banned). |
| 10 | "Request a Demo" as dominant CTA | brief §6.1 | DELETE | Primary action becomes clinical collaboration; secondary "Explore Lävi Delta". |
| 11 | Hero badges: "<2min Processing" | §7 | DELETE | Processing-time claims banned. |
| 12 | Hero badges: "3D Volumetric" | §7 | DELETE | Volumetry is not a product capability. |
| 13 | Hero badge + nav: "CE-MDR Pathway" | §7 | DELETE | Regulatory-status implication. Replaced by §12 statement + stage-based pathway without dates. |
| 14 | "Validated on public benchmark datasets: MSSEG-2, ISBI Longitudinal MS, Insight MS Longitudinal" | §6, §7 | DELETE | Named datasets banned; "validated" banned; public datasets are never presented as validation. Category-level mention only, on the evidence ladder. |
| 15 | "Clinical-Grade Intelligence" (section heading) | §7 | DELETE | Two banned words in three. |
| 16 | "Hybrid Dual-Model Segmentation — union ensemble of nnU-Net V1 and V2…" | §7 | DELETE | Named model architectures/ensembles banned. |
| 17 | "Per-Lesion Longitudinal Tracking… persistent IDs… split/merge detection" | §7 | DELETE | Explicitly listed as not a capability (voxel-level change, not lesion instances). |
| 18 | "11 automated QC checks… PASS/WARN/FAIL… no unreliable results ever reach the clinician" | §3.2, §3.3, §7 | REWRITE | QC with three graded outcomes is a verified fact; the count of checks and the "never" guarantee are banned. |
| 19 | "Brain Volume Quantification… Jacobian determinant maps… ANTs SyN" | §7 | DELETE | Volumetry not a capability; internal method names. |
| 20 | "Clinical-Grade Reporting… MAGNIMS-aligned… under 1 minute read time" | §7 | DELETE | MAGNIMS alignment banned (not performed); banned register; time figure. |
| 21 | "DICOM SEG & PACS Integration" card | §3.1 | REWRITE | True in substance: standard DICOM in, DICOM SEG + overlay + structured report out, into the existing PACS workflow. Drop internal export-channel detail. |
| 22 | "A 10-stage automated pipeline" | §6 | DELETE | Internal counts/identifiers. |
| 23 | "Shadow Model Validation… LST-AI… ongoing self-validation" | §7 | DELETE | Shadow models and "self-validation" explicitly banned. |
| 24 | "Pydantic-Validated Output (metrics_all.json)" | §6 | DELETE | Internal identifiers. |
| 25 | "Full Audit Trail: UUID, git commit, QC gate linkage…" | §3.3 | REWRITE | Keep the substance as provenance: method, policy identity, input hashes, environment recorded per run and bound to exports. Drop internal artefact names. |
| 26 | "Per-Lesion Confidence… explainable confidence score" | §7 | DELETE | Per-lesion confidence/probability language banned (Class IIa positioning). |
| 27 | "IEC 62304 Documentation — full compliance document set" | §3.4, §7 | REWRITE | State as §3.4 does: documented lifecycle (IEC 62304 Class B), ISO 14971 risk file, requirements-to-test traceability. "Full compliance" phrasing banned. |
| 28 | Entire "What Sets Us Apart" section, incl. icometrix/icobrain and Quantib ND comparisons | §7; brief §7.2 | DELETE | Competitor comparisons banned; section format banned by brief. Six sub-claims fall with it (incl. "fail-closed… never reaches a clinician", "regulatory-first", "EU AI Act requirements embedded" — §7 bans published AI Act classification). |
| 29 | "Founded by a Neuroradiologist Who Codes… practicing radiologist… at the MRI reading station" | §10.3 | **BLOCKED** | Public title ("neuroradiologist" vs "radiologist") is a reserved decision. |
| 30 | "From MRI Scan to Clinical Report — Three steps. Fully automated. Under two minutes." | §3.1, §7 | REWRITE | The workflow is real and stated per §2/§3 vocabulary (received over DICOM → registration + QC → candidate analysis → radiologist review → auditable record). Time figure deleted; "clinical report" framing corrected to second-reader output. |
| 31 | "uploaded from any 1.5T or 3T scanner" | §7 | DELETE | Scanner-envelope claims banned. |
| 32 | "GREEN — all checks passed. Safe for clinical use." | §7 | DELETE | "Safe for clinical use" verbatim banned. Graded QC outcomes rewritten per §3.2. |
| 33 | Validation Phase 1: "External Benchmarking… MSSEG-2, ISBI… Ongoing" | §6 | REWRITE | Becomes evidence-ladder rung 2: public-dataset evaluation as a category, no names, no figures, never adjacent-equal to clinical validation. |
| 34 | Validation Phase 2: "Prospective validation study with a clinical partner in Estonia… contract negotiation phase" | §5, §9 | DELETE | Contradicts §5 (study is retrospective MRMC); partner status details not publishable. Replaced by §5 plan, future tense, status "in preparation". |
| 35 | Validation Phase 3: "Multi-Site Validation" | §5 | DELETE | Not in the planned-validation section of the TS. |
| 36 | Regulatory roadmap "2025 → 2026 → 2027 CE-MDR → 2028 Market Entry" | §7 | DELETE | Dated regulatory/launch commitments explicitly banned. Replaced by stage-based pathway, no dates. |
| 37 | Team: "Radiologist at Tartu University Hospital", "University of Tartu Department of Radiology", publication claims | §9, §10.3 | **BLOCKED** | Whether hospital/university affiliations may be named is reserved; institution naming defaults to omit. Publication claims have no TS basis. |
| 38 | Team: "founder of ACME Diagnostics" | — | DELETE | No TS basis; appears to be placeholder text (finding F3). |
| 39 | Team: Alvar Haug, "Infrastructure & Security" + bio | §10.4 | **BLOCKED** | Public role title is a reserved decision. |
| 40 | About: "AI-powered medical imaging software to advance the diagnosis and monitoring of neurological conditions" | §2, §7 | REWRITE | "AI-powered" banned; "diagnosis" exceeds the intended purpose (second reader, no autonomous diagnostic decision). |
| 41 | About: "MS lesion detection and brain volume quantification" | §7 | DELETE | Neither is a permitted capability claim. |
| 42 | About: "software that clinicians can trust in real-world diagnostic workflows" | §7 | REWRITE | Trust is claimed via the safety architecture facts (§3.3), not asserted. |
| 43 | About/footer: "Based in Tartu, Estonia" | §10.1 | **BLOCKED** | City depends on the legal-identity decision. "Estonia" alone is permitted (§1). |
| 44 | Contact: andreas@lavi-clinical.com, +372 501 2118 | §1 | KEEP | Listed in TS §1. |
| 45 | "We are actively building our team… get in touch" | — | KEEP | Company statement, not a product claim; register cleaned ("clinical AI" phrasing dropped). |
| 46 | Logo: network-brain mark, "LÄVI CLINICAL SOLUTIONS" | brief §5.5; §10.1 | DELETE | Neural-network brain graphic banned by brief; name contradicts brand pending §10.1. Replaced by a typographic wordmark. |
| 47 | `sample-report.html` + `sample-report-content.html` (synthetic lesion counts, volume figures, "validated deep learning model", ANTs SyN, "Lävi MS 2.0") | §7, §10.10 | DELETE (pages) | Fabricated clinical output; lesion counting not a capability; "validated" language; internal method names. §10.10 default is that sample reports do not remain public. |
| 48 | Initial clinical domains (new section required by brief §6.4) | §2, §10.2 | **BLOCKED** | Which population is stated publicly (IFU population incl. cerebrovascular/white-matter disease vs validation strata MS / primary tumours / metastases) is reserved. The MRMC study strata themselves are publishable as *study design* under §5. |

### Numbers on the current site
Every number fails the §8 whitelist and is deleted: `<2min`, `11 checks`, `10-stage`, `3D`, `under 1 minute`, `1.5T/3T`, all sample-report figures, all roadmap years. The only numbers the new site may carry: **100 cases, three strata** (as a plan) and **adults 18+** (population, pending §10.2).

---

## 4. Pages and assets to delete

- `sample-report.html`, `sample-report-content.html` (claim #47).
- Embedded base64 logo PNG (claim #46).
- All current inline CSS/JS (replaced wholesale — permitted by stack lock).
- Google Fonts CDN dependency (replaced by self-hosted subsets; EU visitors, GDPR-conservative, faster).
- JSON-LD `SoftwareApplication` block.

Carried over: GitHub Pages deployment, `CNAME`, the Google Analytics tag as-is (brief: no analytics rework), `mailto:`/`tel:` contact pattern (no forms — nothing to maintain, nothing to leak).

---

## 5. Blocking decisions required (truth source §10)

Copy that cannot be written until answered — asked at plan presentation:

1. **§10.1 Registered legal name + city** — needed for footer, imprint, JSON-LD on every page.
2. **§10.2 Public patient population** — needed for the "Initial clinical domains" homepage section.
3. **§10.3 Andreas's public title** and whether hospital/university affiliations may be named — needed for the founder section.
4. **§10.4 Alvar Haug's public role title** — needed for the team section.

Defaults applied without asking (per TS): no hospital, university, statistical partner, notified body, accelerator or funding body is named (§10.5–8); no product screenshots (§10.9); sample reports removed (§10.10); the "What we have not proven" section **is** published (§10.11 — the brief explicitly instructs it and the TS recommends it), inside the §11 transparency boundary.
