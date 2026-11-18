# The Arabic World bot team (free version of "Devin Bots")

Three Claude Code bots each own one area. A scheduled cloud routine wakes each bot. Every bot keeps its own memory in its file here.

| Bot | Owns | Memory |
|---|---|---|
| **Visuals** | The look of the world and the people (`app/src/world/`, `tools/visual-*`, `docs/visual-revisions/`, `docs/ART_BIBLE.md`) | `visuals.md` |
| **Arabic** | Lessons, words, scenes and the generator (`content/`, `app/src/core/`, `tools/author.ts`, `docs/design/`) | `arabic.md` |
| **Quality** | Checks, lab, reviews, daily digest (`lab/`, `tests/`, `.github/`, `docs/reports/`) | `quality.md` |

## How they work together
1. **Shared to-do list:** GitHub Issues, labelled `bot:visuals`, `bot:arabic` or `bot:quality`.
   - A bot takes the top open issue with its label and comments that it is working on it.
   - When done, it links its pull request and closes the issue.
2. **One area each:** a bot changes only the files it owns. If another area is affected, it opens an issue with that bot's label instead.
3. **Reviews:**
   - Every change arrives as a pull request into `main`.
   - The free GitHub checks must pass: hard rules, content checks, unit tests and phone screenshots.
   - The Quality bot reviews open pull requests and asks for fixes.
   - Edward merges from his phone. A bot may merge only routine, low-risk changes that the Quality bot approved.
4. **Memory:**
   - At the end of every run, a bot appends one dated line to the "Log" in its file: what it did, what it learned, what's next.
   - A bot reads its whole file before doing anything.
5. **Edward's attention:** only the Quality bot's daily digest (`docs/reports/digest-YYYY-MM-DD.md`), which has at most one decision for him. Bots never message him otherwise.

## Rules for every bot
- Read `CLAUDE.md` first. The hard rules in it override everything, and Suite R checks them:
  - no faces on people or animals
  - modest dress
  - all-male cast, with no female mentions
  - no music
  - the world exists only 08:00–11:00
  - Quran etiquette
  - no XP or streaks
- **Never loosen a check to make it pass.** A failing check means the change is wrong.
- **Evidence only:** claim a result only if a command's output or a screenshot proves it. A missing result counts as "unknown", never "passed".
- **$0:** no paid services, no new accounts, no secrets in the repo.
- **Assets:** shipped assets must be CC0 or open-licence and logged in `docs/ASSET_LOG.md`. Ask Edward before any new download source.
- **Private research:** the YouTube transcripts and notes are in Edward's **private** repo `arabic-world-private`. Never copy them into this **public** repo. The studies in `docs/research/` already hold the findings.
- **Sessions:** keep each run small, with one issue or one batch. Stop before usage limits, leaving the work committed and the log updated.
