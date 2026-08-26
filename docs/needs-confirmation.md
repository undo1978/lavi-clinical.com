# Needs confirmation — audience coverage round

Consolidated questions for the risk owner (Andreas Müürsepp). Nothing below may be resolved by
inference; each item shows where the answer will appear and what happens if the answer is "no"
or none is given. Pages listed as DRAFT live in `drafts/` on the development branch and are
**not deployed** until every one of their items is resolved.

Compiled: 2026-08-21.

---

## A — Legal & privacy (blocks `privacy.html`, `legal.html`, footer imprint)

1. **Registry code and registered address of Lävi Clinical Suite OÜ.**
   Appears: footer imprint on every page; privacy notice controller identity; `legal.html`.
   If unanswered: no imprint and no privacy page ship — the current footer stays as is.
2. **Email provider that processes mail to andreas@lavi-clinical.com** (e.g. Google
   Workspace, Zone, other). Appears: privacy notice, recipients/processors.
   Fallback: "our email service provider" without a name — weaker but publishable.
3. **Retention period for contact correspondence.** Appears: privacy notice.
   Fallback: "for as long as needed to handle the enquiry and any resulting relationship" —
   publishable but vaguer than good practice.
4. **Hosting acknowledgment.** The site is served by GitHub Pages (GitHub Inc., USA; Fastly
   CDN) — verifiable from the repository, will be stated as fact unless you object.
5. **Google Analytics decision.** The site currently loads GA4 (`G-6X7QBW5X59`), which sets
   `_ga` cookies without consent. Under ePrivacy/GDPR this normally requires prior consent.
   Choose one: (a) add a consent banner (adds UI weight), (b) reconfigure GA4 cookieless /
   consent-mode-only, (c) remove GA. The privacy notice must describe whichever is chosen.
   If unanswered: privacy page cannot ship truthfully; flagged as the one real compliance
   tension found by the audit.

## B — Hospitals page (blocks `hospitals.html` + its nav entry)

6. **Collaboration terms** — what an early collaborating site is offered (early access in a
   research context? influence on workflow? participation in the validation programme?) and
   what it requires (ethics approval, retrospective data under agreement, reader time); does
   any cost fall on the site? Appears: hospitals page, "the offer".
   If unanswered: page does not ship.
7. **Minimum and recommended hardware profile** (CPU/GPU/RAM/storage), network requirements,
   supported deployment form (VM / bare metal / container). Appears: deployment table.
   Fallback: "deployment requirements document available on request" — but only if item 8 is
   yes; otherwise the section is omitted.
8. **Does a deployment-requirements document exist to share on request?** Yes/no.
9. **Measured typical processing time + the hardware it was measured on + approval to
   publish.** Appears: turnaround note, phrased strictly as a technical throughput
   measurement. If unanswered or declined: omitted entirely (never the old "under two
   minutes").
10. **Does a DICOM conformance statement exist?** If yes: one "available on request" line.
    If no: nothing.
11. **Security practices — which of these are current practice vs planned:** alignment work
    with MDCG 2019-16; penetration testing; encryption at rest / in transit; update/patch
    policy. Only actuals publish as facts; planned items only if labelled in-preparation.
    Already publishable without confirmation: on-premise processing, no image data leaving
    the institution, RBAC + two-factor authentication in the reader environment.
12. **"A real deployment" precision (B6).** What exactly may be said about the deployment the
    end-to-end verification ran against — e.g. "a full production-form deployment of the
    pipeline, image store and reader workstation" vs a hospital site? Current truth-source
    §3.6 wording stays live meanwhile; answer will tighten it on the technology and hospitals
    pages.

## C — Platform / partner surface (blocks `platform.html` or a technology-page extension)

13. **Integration capability today vs intent.** Does any partner-facing integration interface
    exist, or is the honest state "analytical components are replaceable by design; a
    partner-facing interface is development intent"? Are partner conversations about model
    integration welcome? If mostly intent: the content likely folds into technology.html
    rather than a thin standalone page.
14. **Study roles.** Are the independent reference-standard and statistics roles filled or
    open, and what may be said publicly? Appears: research-collaboration paragraph.
15. **Publications.** Any preprint, abstract or talk that may be listed? If none: the
    section is omitted entirely (no "coming soon").

## D — Careers page (blocks `careers.html`)

16. **Open roles right now** — or confirm the honest fallback: "no open positions;
    speculative applications welcome."
17. **Location / working model** — Tartu, remote, hybrid?
18. **Stack disclosure** — which technologies may be named publicly, if any?
    Fallback: omit the stack section.
19. **Financing sentence** — what may be said about how the work is financed? (Named
    programmes only if approvable; or a neutral "financed to run the current development and
    validation programme" — only if true.) Fallback: omit, accepting that candidates assume
    the worst.
20. **Alvar Haug's approved public biography** — two sentences he signs off (background,
    prior work). Appears: homepage company section. Until then his current one-line role
    description stays.

## E — Investor path

21. **May the site state publicly that a dated internal development plan exists and is
    shareable in qualified conversations (NDA / data room)?** Appears: contact/investor
    route. Until then the investor route ships without that sentence.

## F — Plumbing

22. **LinkedIn slug** — already answered 2026-08-21: the page was renamed; current slug
    `lav-clinical-suit` carries a known typo LinkedIn will not yet allow correcting. Site
    links point at it deliberately. No action until LinkedIn permits the fix (decisions F4).
