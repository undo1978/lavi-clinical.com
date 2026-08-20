# Before and after — one page

**Before.** The site sold an MS-monitoring platform that does not exist in the form described.
It said "AI-Powered", "Clinical-Grade" and "validated", counted its quality checks, promised
results in under two minutes from any 1.5T or 3T scanner, tracked and counted lesions, measured
brain volume, compared itself by name to two competitors, published a 2025→2028 timeline ending
in "CE mark approval and commercial launch", and offered a fabricated sample report with lesion
counts from a "validated deep learning model". Almost none of that is a permitted claim, several
statements described capabilities the product deliberately does not have, and the whole surface
was one regulatory reviewer away from a finding.

**After.** The site says what is true and shows where the proof will come from. Lävi Delta is
presented as what its technical file says it is: a second-reader tool for follow-up brain MRI
that brings candidate interval changes into one focused, auditable review — and says so
explicitly when the comparison cannot be trusted. The genuinely unusual engineering facts are
stated once, plainly: on-premise DICOM-native deployment; abstention implemented as a
first-class output; provenance bound to every result; correspondence never inferred from a
method name; machine-checked traceability that fails the build when documentation drifts from
code; a deployed, tested reader-study workstation; end-to-end verification against a real
deployment. Validation is described in the future tense as a planned retrospective multi-reader,
multi-case study, behind a drawn boundary line that separates technical evidence from clinical
evidence — and the site publishes a "What we have not proven" section, because for this
audience that is the most credible thing on it.

**Structurally:** three pages instead of one long one plus a fake report (homepage with company
and contact, validation & evidence, technology, plus a small 404). Every time-sensitive
statement lives in one typed content module (`content/site-status.js`); updating the status is
a one-line change. Every material claim is registered in `docs/public-claims-register.md` with
its truth-source reference. The required regulatory statement is legible in the footer of every
page and inside the product and regulatory sections.

**Visually:** the identity now comes from the product's own world — calibrated greyscale with
dark figure panels, a journal-register serif for prose, mono for every number and status, and
colour reserved strictly for meaning (amber for new/increasing candidates and actions, blue for
the resolving lane; abstention is a colourless hatch). One signature graphic carries the story:
baseline → follow-up → QC gate → candidates → radiologist, with the withheld branch drawn in —
and the radiologist as the terminal node of the composition.

**Numbers on the site, before → after:** dozens (times, counts, years, volumes, percentages) →
exactly two: *100 cases* and *three strata* of the planned study, plus the *18+* population
definition — the only numbers the truth source whitelists.
