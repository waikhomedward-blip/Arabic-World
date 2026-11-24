# Licences (not legal advice)
| Item | Licence | Status |
|---|---|---|
| Three.js, React, R3F, drei, Vite, Vitest, Playwright | MIT / Apache-2.0 | In use |
| Tanzil Quran text (Uthmani v1.1) | CC BY 3.0, confirmed in the file's own notice: verbatim only, credit Tanzil, link tanzil.net, keep notice | Imported 2026-11-16 at tools/data/quran-uthmani.txt |
| Quranic Arabic Corpus | GPL page vs no-commercial FAQ | **Not shipped**; check-only |
| QuranEnc translations | Re-publish, no edits, credit + version | Not yet used |
| Recitation audio | No clear commercial licence anywhere | **None shipped**; commission a reciter |
| Adhan recording | None licensed yet | Placeholder slot only |
- **Scheherazade New** (SIL International): SIL Open Font License 1.1, https://software.sil.org/scheherazade/ . Shipped as the Arabic subset woff2 in app/public/fonts/.
- **Quaternius** Universal Base Characters and Universal Animation Library: CC0 1.0, https://quaternius.com . Used for models/man.glb (male body plus 10 animation clips).

## Shipped word data: licence lock (Arabic bot, 2026-11-19; issue #6)
Not legal advice. Source: `reports/Review free Arabic content at scale.md`, action 1.

| Data | Decision | Licence | Credit line / note |
|---|---|---|---|
| **Camel Morph MSA v1.0** (database) | **Allowed.** The only source of shipped paradigms and diacritised forms | CC BY 4.0 (code MIT) | "Camel Morph MSA v1.0 © 2024 by New York University Abu Dhabi", https://github.com/CAMeL-Lab/camel_morph. Show it in the app credits once any Camel Morph–derived data ships |
| CAMeL Tools `morphology-db-msa-r13`, `disambig-mle-calima-msa-r13` | **Never shipped.** Nothing shipped is generated from them | GPL v2 | At most a private yes/no cross-check, never committed |
| SAMER readability lexicon | **Never shipped** | Internal research only | Our own difficulty bands come from frequency rank |
| Tashkeela corpus | **Never shipped**; private evaluation only | GPL v2 | No text from it in the repo |
| Farasa, MADAMIRA | **Never used** | Research / non-commercial | |
| Arabic WordNet 4.0 (glosses) | Allowed later, with credit | CC BY 4.0 | Not yet used |
| Leipzig Arabic frequency lists | Ranks only, later | Reported CC BY (unverified) | Not yet used |

Today `content/lemmas.json` (80 lemmas) is hand-written by this project and contains no third-party word data.
The validator (`npm run validate`) fails if a forbidden data file name appears in the repo.
