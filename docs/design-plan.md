# Design plan — lavi-clinical.com (v2)

**Date:** 2026-08-20 · **Status:** FOR REVIEW — written before any CSS, per brief §5.3.
The self-critique revisions at the end of this document are part of the deliverable.

---

## 1. Concept in one paragraph

The site borrows its visual discipline from the place the product lives: the diagnostic display. Everything on a reading-room monitor is calibrated greyscale, precisely labelled, and quiet — until something carries information, and then it is marked. The site works the same way. The page itself is calibrated greyscale; every figure is presented like an acquisition, with registration marks and a monospaced key; and **colour appears only where it means something** — a candidate change, a direction of change, a status. The one deliberately loud idea is the honest one: abstention is drawn, not described — a hatched "comparison withheld" panel that looks exactly like what the software actually does.

## 2. Colour — 6 named values

| Name | Hex | Job |
|---|---|---|
| Bone | `#F4F4F2` | Page ground. Carries nothing. Slightly warm so the greys read as material, not absence. |
| Film | `#D8D9D6` | Rules, calibration ticks, borders, table lines. Structure, never emphasis. |
| Graphite | `#3C4147` | Body text. |
| Display black | `#14171B` | Display type, and the dark "image area" panels that figures sit in — the monitor inside the page. |
| Change amber | `#B45D00` (on dark: `#E8963C`) | **Meaning: candidate change / new–increasing / the thing to look at.** Also the single interactive accent (links, primary action) — an action is information. |
| Trace blue | `#33637F` (on dark: `#7FA8C0`) | **Meaning: resolving–decreasing direction, and recorded provenance.** Second lane of the direction-aware pair; colourblind-safe against amber. |

Rules: no gradients, no tints of the accents as decoration, no coloured section backgrounds. If a surface is coloured, it is stating something clinical or actionable. The abstention state gets **no colour at all**: a 45° hatch pattern in Film grey with a mono label — withheld, not alarmed.

## 3. Type — three roles

| Role | Face | Use |
|---|---|---|
| Display | **Archivo** (variable, width axis) | Headlines set wide (wdth ~120, weight 600, tight tracking) like a machined nameplate; section kickers set condensed caps. One file, two voices. Not a face either of us would default to — chosen because its width axis gives the site its own headline texture without a second font. |
| Body | **Source Serif 4** | All running text. A screen-first serif: the register of a journal article, not a landing page — which is what this audience reads all day and what this copy is trying to sound like. |
| Utility | **IBM Plex Mono** | Every number, unit, axis, figure key, status label, "Status as of" line, and the footer regulatory statement's date line. If it is data, it is mono. Plex's instrument heritage fits; it is never used decoratively. |

Self-hosted woff2 subsets (latin + latin-ext for ä/ü/õ/Ü), `font-display: swap`, preloaded. No CDN fonts.

## 4. Layout concept

**The protocol sheet.** Each page reads like a well-set study protocol: a monospaced numbered rail (`01 — THE PROBLEM`) marks sections on the left margin; body text holds a single measure (~66ch); figures break out wider and sit on Display-black panels with corner registration marks and mono captions, like frames on a monitor. Grid: 12 columns; generous whitespace; radius 2px (instrument bezel, not card UI); no hairline-rule broadsheet texture — structure comes from spacing and the panels, not from lines.

Breakpoints are re-set, not shrunk: the mobile hero stacks kicker → headline → standfirst → key visual (simplified to vertical flow) → actions; tables become definition lists; the section rail moves inline above each section.

## 5. Signature element

**The interval pair.** One motif, used once at full size and echoed small: two labelled frames — `BASELINE` and `FOLLOW-UP` — with a delta lane between them, drawn in the site's figure language (crosshair, tick marks, mono labels). On the homepage hero it is the §10 key visual at full width: baseline → follow-up → candidate change (amber marks, ranked; blue for resolving) → **radiologist decision**, drawn as the terminal node with accept/reject — and beside the main path, the branch almost nobody shows: `QC failed → comparison withheld`, hatched. Everything else on the site stays disciplined so this one element can carry the identity. Favicon and wordmark derive from it (two ticks and a delta).

## 6. Motion budget

One orchestrated moment: on first view of the hero figure (IntersectionObserver, ~2s total, easing like a viewer paging between studies), the follow-up frame aligns onto the baseline frame (registration), candidate marks appear in rank order, then the decision node activates. Scroll never drives it; it plays once. `prefers-reduced-motion`: the figure renders in its final complete state, nothing else on the site moves. No other animation anywhere except focus/hover states.

## 7. ASCII wireframes

### Homepage (desktop)

```
┌────────────────────────────────────────────────────────────────────┐
│ Lävi Delta ─ wordmark        Technology   Validation   Contact     │
├────────────────────────────────────────────────────────────────────┤
│ LONGITUDINAL BRAIN MRI                                  (mono)     │
│                                                                    │
│ Make interval change easier to see.        (Archivo wide, 2 lines) │
│                                                                    │
│ Lävi Delta is a second-reader tool for follow-up brain MRI …       │
│ and says so explicitly when the comparison cannot be trusted.      │
│                              (serif standfirst, ~15 words/line)    │
│                                                                    │
│ [ Clinical collaboration ]   [ Explore Lävi Delta → ]              │
│ status: CLINICAL VALIDATION AND REGULATORY DEVELOPMENT IN          │
│         PROGRESS · NOT CE-MARKED                        (mono)     │
├────────────────────────────────────────────────────────────────────┤
│ ┌──────────────────── KEY VISUAL (dark panel) ───────────────────┐ │
│ │  ┌─────────┐      ┌─────────┐      ┌─────────┐                 │ │
│ │  │BASELINE │ ───▶ │FOLLOW-UP│ ───▶ │CANDIDATE│ ──▶ ◉ RADIOLOGIST│ │
│ │  │  + ⌖    │ reg  │  + ⌖    │  Δ   │ ▲▲ amber│    accept/reject│ │
│ │  └─────────┘      └─────────┘      │ ▽ blue  │    (terminal)   │ │
│ │        └─ QC not met ─▶ ▨▨▨ COMPARISON WITHHELD ▨▨▨            │ │
│ └────────────────────────────────────────────────────────────────┘ │
├────────────────────────────────────────────────────────────────────┤
│ 01 — THE PROBLEM      Why longitudinal review is hard   (prose)    │
│ 02 — WHAT LÄVI DELTA DOES   received → registered+QC → candidates  │
│                             → focused review → auditable record    │
│                             (five steps, echoes figure language)   │
│ 03 — CLINICAL DOMAINS       [BLOCKED §10.2]                        │
│ 04 — VALIDATION       MRMC in plain words + status → /validation   │
│ 05 — QUALITY & ABSTENTION   the safety philosophy, incl. hatched   │
│                             withheld mini-figure                   │
│ 06 — TECHNOLOGY       properties at high level → /technology       │
│ 07 — COMPANY          founder ¶ + [BLOCKED §10.3/4] + Estonia      │
│ 08 — DEVELOPMENT STATUS     built / not yet proven, side by side   │
│ 09 — CONTACT          clinical collaboration invitation, mailto    │
├────────────────────────────────────────────────────────────────────┤
│ footer: §12 regulatory statement (full width, legible) ·           │
│ legal name [BLOCKED §10.1] · Status as of 2026-08-20 (mono, from   │
│ content module)                                                    │
└────────────────────────────────────────────────────────────────────┘
```

### Validation & evidence page

```
┌────────────────────────────────────────────────────────────────────┐
│ nav                                                                │
├────────────────────────────────────────────────────────────────────┤
│ CLINICAL VALIDATION & EVIDENCE                          (kicker)   │
│ What we will prove, and how.                            (display)  │
│ Status: clinical validation programme in preparation ·             │
│ STATUS AS OF 2026-08-20                                 (mono)     │
├────────────────────────────────────────────────────────────────────┤
│ 01 — THE QUESTION A READER STUDY ANSWERS                           │
│     MRMC explained in plain words (serif prose, no acronym first)  │
├────────────────────────────────────────────────────────────────────┤
│ 02 — THE EVIDENCE LADDER                                           │
│  ┌ TECHNICAL ─────────────────────────────────────────┐            │
│  │ 1 Technical development        exists today        │            │
│  │ 2 Public-dataset evaluation    benchmarking, no    │            │
│  │                                figures published   │            │
│  └────────────────────────────────────────────────────┘            │
│   ═══ No clinical performance claim is made above this line ═══    │
│  ┌ CLINICAL ──────────────────────────────────────────┐            │
│  │ 3 Independent clinical validation   not started    │            │
│  │ 4 Regulatory validation             future         │            │
│  └────────────────────────────────────────────────────┘            │
│  (two separate panels + a full-width mono divider: the rung-2/3    │
│   gap is a drawn chasm, not a list item)                           │
├────────────────────────────────────────────────────────────────────┤
│ 03 — THE PLANNED STUDY     §5 plan, future tense: 100 cases,       │
│     three strata, unaided→washout→aided, independent reference     │
│     standard & statistics. No power figures, no dates.             │
│ 04 — THE READER ENVIRONMENT   §3.5 facts: workstation exists,      │
│     blinding, washout, audit trail — stated plainly                │
│ 05 — WHAT WE HAVE NOT PROVEN   designed section (see below)        │
│ 06 — REGULATORY PATHWAY    six stages, position marked, no dates   │
├────────────────────────────────────────────────────────────────────┤
│ footer (§12 statement etc.)                                        │
└────────────────────────────────────────────────────────────────────┘
```

"What we have not proven" is set as the page's most considered block: Display-black panel, serif prose, four §11-publishable statements, signed off with the status line — a statement of standards in the site's own figure language, not a grey disclaimer box.

### Technology page (outline)

Properties that survive implementation change, one numbered section each: deployment inside the hospital (DICOM in / DICOM SEG + overlays + structured report out, no operator interaction, data stays in the institution) · longitudinal registration & provenance (deterministic/replayable on the path where that claim holds — bounded elsewhere, stated per TS §4) · sequence-aware processing (fails closed on insufficient header evidence) · candidate generation & direction-aware presentation · QC logic & abstention states (three graded outcomes) · traceability machine-checked (build fails on requirement–test drift) · end-to-end conformance against a real deployment · browser-based review workflow. No model names, no counts, no thresholds.

## 8. Content architecture

`content/site-status.js` — one JSDoc-typed module holding every time-sensitive statement: `asOfDate`, validation status line, regulatory stage position, hero status line. Each page has empty `data-status-*` slots filled by ~10 lines of shared JS. The §12 regulatory statement is *fixed* wording, not time-sensitive, so it stays static in markup on every page. Trade-off declared: with JS disabled the status lines (only) are absent; a `<noscript>` fallback shows the neutral sentence "Development status information: see the regulatory statement below." Updating status in six months = one line in one file.

## 9. Pages, files, SEO

- Keep: `CNAME`, GA tag (carried as-is), `mailto:`/`tel:` contact.
- New: `index.html`, `validation.html`, `technology.html`, `404.html` (old sample-report URLs will die; the 404 is one screen pointing home), `styles.css`, `content/site-status.js`, `fonts/` (self-hosted subsets), `favicon.svg` + fallback ico, `og.png` (abstract interval-pair card, no fabricated imagery), `robots.txt`, `sitemap.xml`.
- Delete: `sample-report.html`, `sample-report-content.html`.
- Truth source renamed to `docs/product-truth-source.md`; real claims register created at `docs/public-claims-register.md`.
- Title direction: "Lävi Delta — second-reader software for longitudinal brain MRI follow-up". JSON-LD: `Organization` + `WebSite` only; no offer, no availability, no capability adjectives.

## 10. Self-critique — what changed after reviewing this plan against the brief

1. **First draft had a dark hero.** A full-bleed Display-black hero with amber accent is trap #2 from brief §5.1 wearing a lab coat. Revised: the page ground is Bone; darkness is reserved for figure panels, so "the monitor" is an object *in* the page — which is also more honest about what the product is (a window in a workflow, not a world). 
2. **First draft used Inter for body text.** Reads as "any SaaS site" — the exact failure §5.3 names. Revised to Source Serif 4: journal register for journal readers, and it makes the mono data voice land harder by contrast. The serif risks trap #3 (broadsheet), so layout structure comes from panels and spacing, with no hairline-rule texture and no dense columns.
3. **First draft gave the QC states traffic-light colours** (carried unconsciously from the old site). Green/amber/red implies "safe for clinical use", which is banned language in pixels. Revised: two accents mean *direction of change*; QC abstention is colourless hatch — the absence of a result drawn as an absence.
4. **First draft had the evidence ladder as one four-rung graphic.** Elegant, and wrong: brief §8.1 says the rung-2/3 gap must be unmissable. Revised into two separated panels with a full-width dividing statement between them — the gap is now the design.
5. **Dropped a planned "capabilities at a glance" icon row** on the homepage: feature-grid furniture from a different kind of site, and every icon flirts with a capability claim. The workflow sequence (§6.2) already does this job in the product's own vocabulary.
