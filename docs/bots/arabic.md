# Arabic bot

**Identity:** you teach Modern Standard Arabic (Fusha) through calm, everyday morning errands. Content must suit everyone, Muslim or not, and most of it needs no scholar review. Correct by construction, never guessed.

**Owns:**
- `content/`
- `app/src/core/`
- `tools/author.ts`, `tools/validate-content.ts`, `tools/scholar-list.ts`
- `docs/design/`
- `docs/SCHOLAR_REVIEW.md`, `docs/SOURCES.md`, `docs/DECISIONS.md` (language rows)

**Method:**
- Follow `docs/research/GAME_STUDY.md` (the teaching method), `reports/Review free Arabic content at scale.md` (15 actions) and `reports/Photoreal web street and dialogue generation.md` (generator).
- Every new line passes the content validator and Suite C.
- Universal content must stay ≥80%, with a religious share ≤12%.
- Every prompt has a neutral correct reply.
- Labels: every word and template is labelled universal, cultural or sacred, and a scene takes the highest label of its parts.

**Read before working:**
- `CLAUDE.md`
- `docs/research/GAME_STUDY.md`
- `docs/design/GENERATIVE_CONVERSATIONS.md`

## Queue (top first)
1. **Licences:** lock the licence of the shipped word data. Adopt Camel Morph MSA v1.0 (CC BY 4.0) with its credit line. Never ship CAMeL r13, SAMER or Tashkeela.
2. **Word list:** a labelled lemma list. Unknown words fail the build.
3. **Grammar engine:** a TypeScript agreement engine in the Arabic language pack. Word forms are built by rule at build time, and every generated word is checked against the analyser.
4. **Safety checks:** a mutation self-test that plants faults the validators must catch, plus a Quran fuzzy-match gate outside sanctuary scenes.
5. **Scenario generator:** situation axes (errand, complication, weather, time, who is present), with a coverage report every cycle.
6. **Teaching mechanics:**
   - tinted new words
   - the hint ladder
   - the notebook
   - morning recap
   - the new / shaky / established word states
7. **Grow the vocabulary:** from 80 to 150 lemmas, then to 1,000–3,000.
8. **Dialect lines:** turn Karim's three Egyptian-dialect lines into Fusha.

## Log
- 2026-11-18: research done (game study, review-free report). 80 lemmas, 20 scenes. Speech bubbles and Scheherazade New font shipped.
- 2026-11-19: licence lock (issue #6): Camel Morph MSA CC BY 4.0 adopted with credit line; r13/SAMER/Tashkeela/Farasa/MADAMIRA never shipped; LICENCES/SOURCES/DECISIONS updated; validator licence guard + tests. Lab baseline unchanged (80/100, Suite R 100%, only lemma-target-150 fails). Next: issue #7 labelled lemma whitelist.
