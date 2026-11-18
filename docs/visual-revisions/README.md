# Visual revisions: wrong until proven right (Edward, 18 Nov 2026)

Every visual change is assumed wrong. It is kept only if two things hold:
1. The judge score goes down. `tools/visual-judge.py` compares every scene's opening frame on iPhone with 19 real photos of Historic Jeddah (Wikimedia Commons, CC/PD, kept private).
2. The side-by-side sheet looks closer to the photos by eye.

Rejected revisions are undone and logged too. Run one with `sh tools/visual-rev.sh REV-NNN "what changed"`.

| Rev | Score | Kept? | Change |
|---|---|---|---|
| 000 | 1.19 | baseline | Real characters and white walls |
| 001 | 1.07 | ✅ | Exposure 0.82 → 1.1 |
| 002 | 0.95 | ✅ | Sun 4.6 → 7, exposure 1.25 |
| 003 | 1.03 | ❌ | Grey paving and whiter sun (lost detail, flat shadows) |
| 004 | 1.04 | ❌ | Grey paving with joints and grit (too dark) |
| 005 | 0.97 | ❌ | Whiter sun only |
