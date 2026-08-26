#!/usr/bin/env python3
"""Sync the static "Status as of YYYY-MM-DD" fallbacks in all HTML pages from the
single source of truth: `asOf` in content/site-status.js.

Usage: edit `asOf` in content/site-status.js, then run  python3 tools/update-status-date.py
Run from the repository root. See README.md for the refresh cadence.
"""
import re, glob, sys, pathlib

root = pathlib.Path(__file__).resolve().parent.parent
js = (root / 'content' / 'site-status.js').read_text()
m = re.search(r"asOf:\s*'(\d{4}-\d{2}-\d{2})'", js)
if not m:
    sys.exit('asOf not found in content/site-status.js')
date = m.group(1)

changed = []
for f in glob.glob(str(root / '*.html')) + glob.glob(str(root / 'drafts' / '*.html')):
    s = pathlib.Path(f).read_text()
    s2 = re.sub(r'Status as of \d{4}-\d{2}-\d{2}', f'Status as of {date}', s)
    if s2 != s:
        pathlib.Path(f).write_text(s2)
        changed.append(pathlib.Path(f).name)
print(f'asOf = {date}; updated: {", ".join(changed) if changed else "nothing (already in sync)"}')
