# lavi-clinical.com

Public website of Lävi Clinical Suite OÜ. Hand-written static HTML, served by GitHub Pages
from `main` (custom domain via `CNAME`). No framework, no build step.

## Structure

| Path | Role |
|---|---|
| `index.html` | Homepage — narrative layer (company thesis, Delta, roadmap, contact) |
| `validation.html` | Clinical validation & evidence — what is and is not proven |
| `technology.html` | Engineering properties of Lävi Delta |
| `lavi-ms.html` | Lävi MS — planned next product programme |
| `404.html` | Not-found page |
| `styles.css` | The whole design system (tokens documented at the top) |
| `content/site-status.js` | **Single source for every time-sensitive statement** |
| `fonts/` | Self-hosted woff2 (Archivo, Source Serif 4, IBM Plex Mono) |
| `docs/` | Governance: truth source, claims register, decisions, audits |
| `drafts/` | Pages blocked on risk-owner confirmations — **never merged to `main`** |
| `tools/` | Maintenance scripts |

## Rules that keep this site publishable

1. **Every public claim traces to `docs/product-truth-source.md`.** A claim without a
   truth-source reference (or a recorded risk-owner decision) does not ship. Every claim
   change updates `docs/public-claims-register.md` in the same commit.
2. **Time-sensitive statements live in `content/site-status.js` only** (status lines,
   pathway position, the "Status as of" date). Update the value there, then run
   `python3 tools/update-status-date.py` to sync the static fallbacks in the HTML.
3. **The "Status as of" date is bumped consciously at every content review — minimum
   quarterly** (mirrors the truth source's review cadence). A stale date is a negative
   signal; never let it drift silently and never bump it without actually reviewing.
4. **Facts nobody in this repo can verify go to `docs/needs-confirmation.md`**, as a
   `[CONFIRM:…]` placeholder in a draft page under `drafts/`. No `[CONFIRM:]` marker ever
   reaches deployed HTML; a page with open placeholders stays in `drafts/`.
5. The banned-register and prohibited-claims lists (truth source §6–§7) apply to every page,
   including meta descriptions, alt text and diagrams.

## Deploying

Merging to `main` deploys via GitHub Pages within a minute or two. The `drafts/` directory
is excluded when merging the working branch into `main` (the merge commit removes it) — keep
it that way.
