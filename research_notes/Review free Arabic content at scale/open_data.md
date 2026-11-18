# Open data and licences for an MSA lexicon, frequency list and morphological generator (free web game)

Not legal advice. Licence inferences are labelled "Inference". Items I could not verify are marked [unverified]. Search quota ran out mid-research, so several resources (OpenSubtitles, Kelly, KACST, OSIAN, Arabic Ontology, Al-Maany, ACTFL/CEFR lists, Arabic Between Your Hands) were NOT checked.

## Camel Morph MSA, CAMeL Tools code vs databases, GPL implications

### Takeaway
The Camel Morph repo (2024 MSA DB) is MIT for code and CC BY 4.0 for data, with a credit notice required: the best licence found for shipping derived paradigm tables. The older CAMeL Tools data packages (morphology-db-msa-r13, calima-msa-r13 lineage) are labelled GPL v2, which is risky for a shipped app. Part of the Camel Morph specification files is "only upon demand".

### Cited Findings
- Camel Morph repo code: "All the code contained in this repository is available under the MIT license"; the LICENSE file is MIT, "Copyright 2018-2022 New York University Abu Dhabi" — [camel_morph GitHub](https://github.com/CAMeL-Lab/camel_morph), [LICENSE](https://github.com/CAMeL-Lab/camel_morph/blob/main/LICENSE)
- Camel Morph data licence section: data licensed CC BY 4.0. The official release camel_morph_msa_v1.0.db asks app builders to include a notice crediting "Camel Morph MSA v1.0 © 2024 by New York University Abu Dhabi" under CC BY 4.0 — [camel_morph GitHub](https://github.com/CAMeL-Lab/camel_morph)
- The repo lists MSA Verbs, EGY Verbs and MSA Nominals specification files as "only accessible upon demand"; GPL and non-commercial terms are not mentioned on the repo page — [camel_morph GitHub](https://github.com/CAMeL-Lab/camel_morph)
- CAMeL Tools code is MIT ("available under the MIT license"); the README gives no licence for datasets and points to the packages page — [camel_tools GitHub](https://github.com/CAMeL-Lab/camel_tools)
- CAMeL Tools data packages table: morphology-db-msa-r13 (40.5 MB, GPL v2), morphology-db-egy-r13 (67.3 MB, GPL v2), disambig-mle-calima-msa-r13 (88.7 MB, GPL v2), dialectid-default (MIT); camel_morph is not listed there — [CAMeL Tools packages](https://camel-tools.readthedocs.io/en/latest/reference/packages.html)

### Inferences
- Inference: shipping tables derived from the GPL v2 r13 database in a public web app is a distribution of a derivative work; GPL v2 would plausibly require releasing the derived data (and possibly more) under GPL v2. Using it only at build time to generate data that is then shipped does not clearly avoid this, because the shipped tables are derived from the data. Avoid it unless the project is willing to publish the tables under GPL v2 with source. Also, GPL v2 is awkward combined with CC BY-SA or app code under other terms.
- Inference: the Camel Morph MSA v1.0 DB (CC BY 4.0) is compatible with a permissive web app: attribution only, no share-alike. This is the preferred morphology source. Confirm that the .db file itself carries the same notice and that the "on demand" spec files are not needed.
- Inference: the older r13 DB descends from SAMA/Buckwalter lineage (LDC) which may be why GPL is used; the relationship is [unverified] here.

### Gaps
- Did not confirm whether the camel_morph_msa_v1.0.db file includes a separate licence file, its size, or its lemma count.
- Did not read the LREC-COLING 2024 Camel Morph paper itself.
- calima-star: not researched.

## Frequency lists and corpora

### Takeaway
wordfreq (code Apache, data CC BY-SA 4.0 with SUBTLEX/OpenSubtitles attribution) and Leipzig Arabic lists (reported CC BY) are the practical frequency sources; CC BY-SA from wordfreq adds share-alike risk. Tashkeela is GPL v2.

### Cited Findings
- wordfreq: code Apache; data files may be redistributed under CC BY-SA 4.0; includes OpenSubtitles 2018 and SUBTLEX (used with credit); the README discourages converting data to CSV so attribution is kept — [wordfreq README](https://github.com/rspeer/wordfreq/blob/master/README.md)
- wordfreq Arabic (`ar`) draws on 5 sources: Wikipedia, subtitles, news, web text and Twitter; "large" list; frequencies are a snapshot to about 2021 and the data is unlikely to be updated — [wordfreq README](https://github.com/rspeer/wordfreq/blob/master/README.md)
- Wiktionary says Arabic frequency lists (10K to 1M) from the Leipzig Corpora Collection are CC BY 4.0; this is a third-party summary, not Leipzig's own statement — [Wiktionary Frequency lists/Arabic](https://en.wiktionary.com/wiki/Wiktionary:Frequency_lists/Arabic) (via search snippet)
- Leipzig's older word-list publications used CC BY 3.0; OSIAN Arabic news corpus was built with Leipzig procedures — [Leipzig publications](https://wortschatz.uni-leipzig.de/en/documentation/publications) (via search snippet)
- Tashkeela (SourceForge): GPL v2, 75.6 million words, vocalised (diacritised) Arabic text; how diacritics were verified is not stated — [Tashkeela SourceForge](https://sourceforge.net/projects/tashkeela/)
- Wiktionary notes OpenSubtitles-based lists are CC BY-SA 4.0 (describing Wiktionary downloads, not wordfreq Arabic specifically) — [Wiktionary Frequency lists](https://en.wiktionary.org/wiki/Wiktionary%3AFrequency_lists)

### Inferences
- Inference: a frequency rank (a number per lemma) is thin factual data; a rank derived from wordfreq/Leipzig and shipped with attribution is low risk, but wordfreq's CC BY-SA would arguably apply to a derived list if copied substantially. Leipzig (CC BY) is cleaner.
- Inference: Tashkeela (GPL v2) is fine for build-time evaluation, but shipping text from it would carry GPL.
- Inference: OpenSubtitles raw text has unclear rights (subtitles are third-party copyrighted); use only word counts, and prefer sources without it.

### Gaps
- Not verified: the Leipzig site (Anubis bot check blocked fetches); Arabic Wikipedia CC BY-SA (known general licence, not fetched); OSIAN, KACST, Kelly Arabic list, Arabic Gigaword (LDC, known to be paid; not fetched), Buckwalter-Parkinson book (copyright; not fetched). All [unverified] here.

## Sentence and lexical resources (Tatoeba, WordNet, Qabas, SAMER, Ontology)

### Takeaway
SAMER is research-only (not shippable). Arabic WordNet 4.0 (CC BY 4.0, 2026) is usable; the older OMW arb is CC BY-SA 3.0. Tatoeba has about 69k Arabic sentences under CC licences, with few recordings. Qabas licence not verified.

### Cited Findings
- SAMER Readability Lexicon: v1.0 26,000 lemmas, v2.0 40,000 lemmas; use is "solely for your internal research and evaluation purposes"; sublicensing, further distribution and modification not permitted; commercial or distribution rights via NYU Office of Industrial Liaison; download by Google Form; cite Al Khalil, Habash and Jiang (LREC 2020) — [SAMER download page](https://camel.abudhabi.nyu.edu/samer-readability-lexicon/)
- SAMER levels run L1 (easy) to L5 (hard) — [search snippet of SAMER arXiv work](https://arxiv.org/pdf/2410.08674v2.pdf)
- Tatoeba: Arabic (ara) 68,936 sentences (rank 27), 483 audio recordings; data "released under various Creative Commons licenses" (per-sentence, mostly CC BY 2.0 FR; the CC BY 2.0 FR detail is from the task brief, not re-verified); Standard Arabic (arb) count not found — [Tatoeba stats](https://tatoeba.org/en/stats/sentences_by_language)
- OMW Arabic WordNet (AWN v2, arb): about 9,916 synsets, CC BY-SA 3.0 — [OMW](https://compling.upol.cz/omw/omw_wns); authorship Alkhalifa and Elkateb, UPC and University of Manchester — [NLTK OMW bundle](https://huggingface.co/datasets/Deepanshu7284/nltk_data_bundle/commit/42e237f9666c9b593e28b325eb22a52a42c2a48c)
- Arabic WordNet 4.0 (2026): CC BY 4.0, translated from Open English WordNet; a 4.1.0 release exists (March 2026) — [Zenodo 18872077](https://zenodo.org/records/18872077), [Zenodo 18872066](https://zenodo.org/records/18872066)
- Qabas (Birzeit, Jarrar and Hammouda, LREC-COLING 2024): about 58K lemmas (about 45K nominal, 12.5K verbal, 473 function words), linked from 110 lexicons; described as "open-source" and hosted at sina.birzeit.edu/qabas — [arXiv 2406.06598](https://arxiv.org/pdf/2406.06598), [LREC page](https://lrec.elra.info/lrec2024-main-1170)

### Inferences
- Inference: SAMER cannot be shipped or redistributed, even derived level labels, without an NYU licence. A neutral substitute is to derive our own difficulty levels from frequency ranks.
- Inference: Tatoeba sentences must carry per-sentence author attribution; avoid sentences mentioning women (project rule), so filter manually.
- Inference: Arabic WordNet 4.0 CC BY 4.0 is the safe gloss/sense source; avoid OMW arb v2 (share-alike).

### Gaps
- Qabas actual licence text: sina.birzeit.edu was unreachable (connection refused); the PDF text was not readable. [unverified]
- Not researched: Arabic Ontology, Al-Maany, ACTFL/CEFR Arabic lists, Arabic Between Your Hands lists, number of Tatoeba arb (MSA) sentences.

## Practical licence-clean pipeline for 1-5k lemmas

### Takeaway
Use Camel Morph MSA v1.0 (CC BY 4.0) for diacritised paradigms, Leipzig (CC BY) plus your own counts for frequency ranks, Arabic WordNet 4.0 (CC BY 4.0) for glosses, hand-checked Tatoeba sentences for examples. Skip r13 (GPL v2), SAMER (research-only), Tashkeela (GPL) for shipped data.

### Cited Findings
- See the sections above for each licence; the pipeline is an inference, not a cited finding.

### Inferences
1. Morphology: generate diacritised forms with the Camel Morph MSA v1.0 DB (MIT code, CC BY 4.0 data); ship a credits page with the exact notice "Camel Morph MSA v1.0 © 2024 by New York University Abu Dhabi, CC BY 4.0".
2. Frequency: take Leipzig Arabic list ranks (confirm the licence on the download page first), cross-check with wordfreq only for sanity (do not copy, share-alike); ship only rank numbers and cite sources.
3. Levels: define own bands from frequency rank (e.g. top 1k, 2k-5k); do not use SAMER.
4. Glosses: Arabic WordNet 4.0 (CC BY 4.0) or own wording; avoid OMW arb v2 CC BY-SA.
5. Examples: Tatoeba, filtered for the project's hard rules (no female references, no music, etc.), with author credit and CC BY terms checked per sentence.
6. Keep GPL v2 data (r13, Tashkeela) out of the shipped bundle and out of the repo; use only for private checks.
7. Record every source in docs/SOURCES.md; scholar review remains for sacred content only.

### Gaps
- Everything in this pipeline needs a final read of the actual licence files shipped inside each download.
