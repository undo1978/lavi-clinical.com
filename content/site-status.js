// @ts-check
/**
 * The single source for every time-sensitive public statement on this site.
 *
 * Rules (see docs/product-truth-source.md §13):
 * - Update values here only; never inline a status, stage or date in page markup.
 * - Any change to a claim here must update docs/public-claims-register.md
 *   in the same commit, and be re-approved by the risk owner.
 * - The fixed regulatory statement (truth source §12) is NOT time-sensitive
 *   and lives statically in every page footer — do not move it here.
 *
 * @typedef {'current' | 'in-preparation' | 'future'} StageState
 */

const SITE_STATUS = {
  /** ISO date shown as "Status as of …" in validation and regulatory sections. */
  asOf: '2026-08-21',

  /** Hero status line (rendered uppercase by CSS). Truth source §5, §12. */
  heroStatusLine:
    'Clinical validation and regulatory development in progress · not CE-marked',

  /** The only permitted validation status wording. Truth source §5. */
  validationStatus: 'Clinical validation programme in preparation',

  /** Lävi MS roadmap status. Risk-owner decision D5 (2026-08-21). */
  msStatus: 'Planned next product programme',
  msStatusLine:
    'Planned next product programme · its own development, validation and regulatory pathway follow the current Lävi Delta programme',

  /**
   * Regulatory pathway position. Stage names are fixed in markup
   * (truth source §5); only the position changes over time.
   * @type {Record<string, StageState>}
   */
  stageStates: {
    development: 'current',
    verification: 'current',
    validation: 'in-preparation',
    documentation: 'future',
    conformity: 'future',
    deployment: 'future',
  },

  /** Visible label for each stage state. */
  stageLabels: {
    'current': 'current stage',
    'in-preparation': 'in preparation',
    'future': 'ahead',
  },
};

(function apply() {
  for (const el of document.querySelectorAll('[data-status]')) {
    const key = el.getAttribute('data-status');
    if (key === 'asOf') {
      el.textContent = 'Status as of ' + SITE_STATUS.asOf;
    } else if (key === 'heroStatusLine' || key === 'validationStatus' || key === 'msStatus' || key === 'msStatusLine') {
      el.textContent = SITE_STATUS[key];
    }
  }
  for (const el of document.querySelectorAll('[data-stage]')) {
    const stage = el.getAttribute('data-stage');
    const state = stage ? SITE_STATUS.stageStates[stage] : undefined;
    if (!state) continue;
    el.setAttribute('data-stage-state', state);
    const label = el.querySelector('.stage-state');
    if (label) label.textContent = SITE_STATUS.stageLabels[state];
  }
})();
