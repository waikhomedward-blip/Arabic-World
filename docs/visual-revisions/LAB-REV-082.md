# Full lab at REV-082 (cloud, 19 Nov 2026)

First run: WebKit 60/60 passed; Android Chromium 38/40: d3-souq and d8-souq hit the 90 s test limit. Cause: REV-079's six extra men, and every body in the quarter being drawn in every scene (culling was off). d3-souq already took 1.5 min before REV-079, right at the limit on this GPU-less runner.

- Suite R 100%
- Draw calls: budget Android max 66 (limit 100), iPad max 103 (limit 150)
- Fixes: REV-083 (headwear one mesh per man), REV-084 (off-screen bodies culled; the fruit-stall customer removed). d8-souq then 51 draw calls and 79k triangles (was ~190k); both souq scenes pass. Full rerun: LAB-REV-084.md
