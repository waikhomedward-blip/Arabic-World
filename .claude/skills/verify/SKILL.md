---
name: verify
description: Verify Arabic World after any change to the game UI, world, characters or content. Use before calling a change done.
---

Run in this order and stop at the first failure:
1. `npx tsc -p tsconfig.json` — types.
2. `npm test` — unit tests and Suite R (hard rules) + bots.
3. `npm run validate` — content (tashkeel, lemmas, coverage, answer bias).
4. `npx playwright test` — plays every scene on 5 devices (iPhone 13, iPhone SE, iPad, Pixel 7, budget Android); checks visibility, off-screen buttons, accessibility (axe), tap targets, text size, fps. Results: `lab/results/e2e/<device>/<scene>.json` + screenshots. Narrow with `-g "scene d3-souq"` or `--project iphone-se-webkit`.
5. **Look** at the screenshots for the scenes you touched (intro, dialogue, prompt, keyboard). Hard rules: smooth featureless heads, modest dress, all-male cast, no music.
6. If a failure is the test rig (timeouts, slow machine) rather than the game, fix the rig and say so.
