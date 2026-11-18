# Lessons (traps already hit — read before every session)

1. **The in-app preview tool can serve an old folder.** It kept running Vite from the first session's scratch folder. Check with `lsof -p $(lsof -tiTCP:5173 -sTCP:LISTEN) | grep cwd`, or run `npx vite app --port 5180` from the repo and open that.
2. **Headless Chromium draws WebGL in software** (10 fps, false perf failures). Playwright launches Chromium with `--use-angle=metal --ignore-gpu-blocklist --enable-gpu`. Check the `renderer` field in e2e results says Apple M1, not SwiftShader.
3. **Headwear spheres must fully enclose the head or not touch it.** A partial overlap left a skin-coloured patch that read like a face opening (hard rule 1). Suite R `no-partial-head-opening` enforces it.
4. **The camera must stay inside the street** (z ≈ 6.4) and props go *behind* the characters (z ≈ -1.6). A camera inside a building or a stall in front of a speaker hides the scene; the e2e visibility probe now catches it.
5. **Cast groups are centred on the camera focus.** Placing extra people to the right pushed the third person off narrow screens.
6. **Answer options must not leak the answer.** All 54 prompts once listed the right answer first, and it was the longest 95% of the time. Options are shuffled for display (`optionOrder`), and Suite C checks position, length and yes/no balance.
7. **11-key keyboard rows overflow a 320px screen** unless keys can shrink (`min-width: 0`) and the keyboard bleeds into the panel padding. The e2e audit fails any button that is off screen.
8. **Never use person/face emoji** (🚶 has a face on Apple). Use hands and objects (✋ 🍎 💧 📖 ✏️ 🪙 ➡️).
9. **Distractors should be words the player has already met** (morning check), or the "wrong" answers teach nothing.
10. **Node 18 on this Mac:** keep Vite 5, Vitest 2, R3F 8 / React 18.
11. **Write content with `tools/author.ts`,** not throwaway scripts; it keeps prompts consistent (greet / thanks / fine / morning, yes-no, act).
12. ~~Night sky~~ — obsolete: the world only exists 08:00–11:00 (strict rule). Sky scenes are morning sky, sun, clouds and birds.
13. **Run at most 2 Playwright browsers at once** (and fewer while yt-dlp or other heavy jobs run): GPU starvation caused a false "WebGL context lost" failure. Re-run a failing scene alone before calling it a game bug. The game itself now recovers from context loss (tap to continue).
14. **Universal first:** every prompt whose correct reply is a religious formula also needs a neutral correct reply (Suite C `neutral-option`).
15. **Arabic word-list checks must anchor prefixes at word start** (`(^|\s)[وفبلك]?`), or endings like السلامُ read as أم (mother). Self-test every new word rule with planted good and bad text.
16. **لِـ + الـ drops the alif** (لِلنَّاسِ): the tashkeel validator now handles it.
17. **Read every document Edward provides, including files sitting next to the ones he names** (a `.skill` beside the master prompt was missed for a day). Log each in `docs/research/READ_LOG.md` with what it changed. **Apply** guidance, don't just verify it: the visuals playbook was checked but not used, and the game looked like a grey-box.
- Visual revisions (18 Nov): Suite R's face-word check also reads shader code, so a variable named `lip` (a plaster edge) failed it. Name shader variables after the building, never body words (ledge, rim, edge).
