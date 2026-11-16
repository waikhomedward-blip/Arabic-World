# Decisions

| Date | Decision | Why |
|---|---|---|
| 2026-11-16 | Node 18 is installed, so pin Vite 5, Vitest 2, R3F 8 / React 18 | Vite 7 needs Node 20.19+; avoid asking Edward to upgrade |
| 2026-11-16 | Characters are procedural primitives (body + smooth sphere head) until MPFB2 GLBs exist | Guarantees "no faces" by construction; zero licence risk |
| 2026-11-16 | Baseline renderer is WebGL2 (Tier 2); splats deferred | Tier 2 must run on every phone; no captured scenes yet |
| 2026-11-16 | Typed-answer checker is rule-based, no AI grader | Build rule 8 |
| 2026-11-16 | Quran import deferred until Edward OKs downloading the Tanzil text | Downloads need his OK; importer and verbatim check are ready |
| 2026-11-16 | No audio files yet; audio manager enforces adhan mute in code and manifest | No licensed adhan; no TTS keys |
| 2026-11-16 | Tanzil Uthmani v1.1 imported verbatim (sha256 bf4f57b9…); committed with its licence notice intact | Edward approved the download; primary licence text now confirmed in-file |
| 2026-11-16 | Surface-form staircase from Tanzil: 302 forms → 50%, 1,505 → 70%, 3,358 → 80%, 5,077 → 85%, 7,768 → 90%, 11,662 → 95% of 77,881 running words | These are *word forms* (with prefixes/suffixes), not lemmas, so they are far higher than the lemma estimates; a lemma staircase needs the game's own morphology layer (next) |
| 2026-11-16 | **Universal first:** the product must welcome Muslims and non-Muslims. Everyday universal life is the base; characters speak their faith naturally; the player is never required to say a religious formula (neutral correct reply always offered); no preaching. Enforced by Suite C `neutral-option`. | Edward: "everyone agrees we need water to survive"; widens the audience without breaking any hard rule |
| 2026-11-16 | Answer options are shuffled for display; content rebalanced (correct-first 100% → 41%, correct-longest 95% → 22%, yes/no answered "no" 0% → 27%) | Learners could guess without reading (found via the agents playbook's answer-length lesson) |
| 2026-11-16 | Story research: transcripts only from Madinah College, Muhammad Al-Andalusi, AMAU, Rahmaniyyah, kept in `research-private/` (gitignored, never published); used for composite story beats only, no real person named | Copyright + privacy of real students; spec §8 |
| 2026-11-16 | **Language packs:** Edward may build the same game for other languages. Arabic-specific code (normaliser, checker rules, tashkeel validator, keyboard layout, RTL, Quran layer, fonts) moves behind a `LanguagePack` interface; engine, ladder, director, lab and world stay language-neutral | Cheap now, expensive later (RESEARCH_PLAN D1) |
| 2026-11-16 | Keep our cast names; borrow the story bible's roles, arcs, day beats and world systems | Bible names are permissible but four are prophets'/Companions' names; avoid any confusion with depiction |
| 2026-11-16 | Piper ar_JO "kareem" ruled out (fine-tuned from non-commercial lessac data) | Licence |
| 2026-11-16 | Azure TTS: ship audio only from a paid render or after the free-tier output right is confirmed | Product Terms grant commercial output rights explicitly to paid tier |
| 2026-11-16 | Draw-call budget tightened to ≤150 (recent phone) / ≤100 (budget Android) | The visuals playbook's 400/250 is optimistic for WebGL |
| 2026-11-16 | Universal-first audit: 22/269 texts (8%) mention religion, almost all everyday formulas or the masjid as a landmark. Fixed the one lesson that used "اللّٰهُ أَكْبَرُ" as its teaching example (now كَبِيرٌ → أَكْبَرُ with Faisal/Majid and two apples). New Suite C checks: lessons use universal examples; religious share ≤ 12% | Edward: "very important … everyone agrees we need water to survive" |
