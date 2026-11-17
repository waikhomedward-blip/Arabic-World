# Generating millions of varied but correct MSA (Fusha) scenarios and conversations without an AI grader

Scope note: about 17 tool calls (searches and fetches). Several licences and numbers come from secondary pages and are marked **[UNVERIFIED]**. Source origin is labelled: **[Muslim-world]** = an institution in a Muslim-majority country (NYUAD Abu Dhabi, QCRI/HBKU Qatar, MBZUAI/Inception UAE, SDAIA/HUMAIN Saudi Arabia). This does not claim anything about any author's religion ("affiliation unconfirmed"). **[Other]** = a non-Muslim-world source, used only where no Muslim-world source covered the point.

## 1. Procedural narrative techniques: how they scale variety and stay coherent

### Takeaway
Hand-written atomic units (storylets or lines) with preconditions, chosen by a salience or quality system over a world-state blackboard, scale well and stay coherent. Tracery-style grammars add surface variety cheaply, but past a point the variety stops being noticed ("10,000 bowls of oatmeal"). Freshness comes from variation that changes meaning or gameplay, not from random wording.

### Cited Findings
- **Salience / rule-database dialogue (Valve)** [Other]. Elan Ruskin's GDC 2012 talk "AI-driven Dynamic Dialog through Fuzzy Pattern Matching" (also called "Rule Databases for Contextual Dialog and Game Logic") describes the Source-engine response system used in Left 4 Dead 2 and Dota. Each line has criteria matched against world-state facts, the most specific matching rule wins, and the system falls back to defaults. — [Slides PDF (Valve)](https://cdn.fastly.steamstatic.com/apps/valve/2012/GDC2012_Ruskin_Elan_DynamicDialog.pdf); [GDC Vault](https://gdcvault.com/play/1015528/AI-driven-Dynamic-Dialog-through); [Emily Short's write-up](https://emshort.blog/2012/03/16/gdc-2012-talk-on-dynamic-dialogue/)
- The L4D2 response system is organised as rules made of a name, criteria and responses, and it can be extended with VScript decision rules. — [Valve Developer Wiki](https://developer.valvesoftware.com/wiki/Left_4_Dead_2/Scripting/Response_System)
- One write-up says the L4D writers were comfortable managing large numbers of database entries, and that Ruskin's stated aim was to let writers write. — [Radiator blog, 2012](https://www.blog.radiator.debacle.us/2012/07/rule-databases-for-contextual-narrative.html)
- **Quality-based narrative (QBN)** [Other]. Failbetter (Fallen London) coined the term for narratives built from storylets that are unlocked by "qualities" (numeric state). Failbetter has since stopped using the name. **Salience-based narrative (SBN)** is Emily Short's term: the system picks the most applicable piece of content from a large pool. In QBN the *player* chooses among the legal storylets; in SBN the *system* chooses. — [Emily Short, "Beyond Branching" (2016)](https://emshort.blog/2016/04/12/beyond-branching-quality-based-and-salience-based-narrative-structures/)
- Storylets are "simple, atomic, robust, and recombinable", and are more flexible than branching. Kreminski & Wardrip-Fruin's ICIDS 2018 survey maps the design space. — [Emily Short, "Storylets: You Want Them" (2019)](https://emshort.blog/tag/quality-based-narrative/); [Short on Kreminski](https://emshort.blog/2019/01/06/kreminski-on-storylets/)
- Yarn Spinner documents built-in storylets and saliency strategies. — [Yarn Spinner docs primer](https://docs.yarnspinner.dev/next/yarn-spinner-for-unity/unity-samples/storylets-and-saliency-a-primer)
- **Tracery** (Kate Compton) is a context-free replacement grammar for text, under the Apache 2.0 licence according to its ports (Ruby gem: Apache-2.0; Python port by Allison Parrish: "inherits Tracery's original Apache License 2.0"). — [PyPI tracery](https://pypi.org/project/tracery); [RubyGems tracery](https://rubygems.org/gems/tracery). Grotesque, an MIT-licensed Clojure library, combines ideas from Compton, Ruskin and Short. — [Grotesque](https://github.com/Aarneus/grotesque)
- **Caves of Qud** [Other]. Grinblat & Bucklew (FDG 2017) generate sultan histories with "a state machine and replacement grammar". The system works by subverting cause and effect: it writes mythic, word-of-mouth accounts instead of running a neutral simulation like Dwarf Fortress. — [PCG workshop paper](https://pcgworkshop.com/archive/grinblat2017subverting.pdf); [GDC 2018 talk](https://gdcvault.com/play/1025379/Procedurally-Generating-History-in-Caves). The Qud wiki says each history covers 5 periods with 5 generated sultans. — [Qud wiki](https://wiki.cavesofqud.com/wiki/Sultan_history)
- **Perceived vs combinatorial variety** [Other]. Compton's "10,000 bowls of oatmeal" problem: millions of mathematically unique outputs mean little if players cannot tell them apart. — [Game Developer](https://gamedeveloper.com/design/practical-procedural-generation-for-everyone-); Rabii & Cook (FDG 2023) call it one of the best-known idioms in procgen and analyse it formally through Kolmogorov complexity. — [Why Oatmeal is Cheap (FDG 2023)](https://pyrofoux.github.io/why-oatmeal-is-cheap/why_oatmeal_is_cheap_fdg2023.pdf). Emily Short argues that generated text matters when it connects to mechanics. — [Bowls of Oatmeal and Text Generation](https://emshort.blog/2016/09/21/bowls-of-oatmeal-and-text-generation/)
- Short & Adams (eds.), *Procedural Storytelling in Game Design* (2019), is the standard practitioner anthology for these techniques. — [PDF copy found online, rights status unclear](https://wileywiggins.com//documents/dorf/Short%20and%20Adams%20-%202019%20-%20Procedural%20storytelling%20in%20game%20design.pdf)

### Inferences
- **Recommended architecture for Arabic World** (a synthesis, not a quoted source):
  1. **Scenario layer (storylets with QBN/SBN).** Each scenario is a hand-authored storylet with preconditions on world state (place, clock 08:00–11:00, the player's known lemmas, relationship with an NPC, the player's needs: water, bread, directions). A salience picker in the Ruskin style chooses the most specific storylet that fits.
  2. **Slot layer (a typed grammar, Tracery-like but with features).** Slots are typed semantic objects (ITEM: bread/water/dates; QTY: 1–10; PLACE; NPC role: baker, grocer, neighbour), not raw strings, so morphology can inflect them.
  3. **Realisation layer (morphology engine).** The engine turns lemma plus features into fully vowelled surface forms (section 3).
  4. **Validation layer** (section 4).
- **Variety that players notice** should change meaning: a different need (water vs bread), a complication (shop out of stock, wrong change, price), or a callback to a known NPC. Synonym shuffling alone is "oatmeal". It also hurts learning, because it adds unknown words.
- **Pure grammar systems lose coherence fast.** Qud's success comes from authored *templates of accounts* plus a state machine. That supports state-driven templates over free grammars.
- Plain Tracery cannot do agreement. Arabic needs feature unification (gender, number, definiteness, case), so Tracery's string modifiers (`.a`, `.s`) do not carry over. A small custom "feature grammar" is needed.

### Gaps
- Versu (Evans & Short), Façade (Mateas & Stern), Wildermyth and Dwarf Fortress were not researched in this pass, for lack of tool budget. Versu's social-practice model fits "everyday rituals" such as greeting and buying, and is worth a follow-up.
- Ink (inkle) and Yarn Spinner licences: commonly reported as MIT, but **not verified this session**.

## 2. Language-learning generators and comprehensible-input control

### Takeaway
The 95% (minimal) and 98% (adequate) known-word coverage figures come from Hu & Nation (2000). A 2023 replication could not fully reproduce them, so treat them as design targets, not laws. Duolingo separates *selecting* exercises at the right difficulty (Birdbrain) from *creating* them (now LLM drafts plus human review). That split maps well onto a deterministic generator plus a learner model.

### Cited Findings
- Hu & Nation (2000) proposed 98% coverage as sufficient and 95% as minimal for comprehension. The figure became an "almost uncontested law". — [Frontiers in Psychology 2022](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2022.800983/full); [AILA 2021 abstract](https://aila2021.dryfta.com/program/abstract-archive/abstract/public/416/unknown-vocabulary-density-reading-comprehension-and-the-98-coverage-figure-replicating-hu-nation-2000)
- Kremmel, Indrarathne, Kormos & Suzuki (*Language Learning*, 2023; 104 Sri Lankan adult learners) could not fully replicate the original results. — [Lancaster eprint](https://eprints.lancs.ac.uk/id/eprint/210922)
- A Wellington (NZ) thesis reports calculation errors in the original's optimum-coverage figure and argues that vocabulary size predicts comprehension better than coverage does. — [VUW thesis](https://openaccess.wgtn.ac.nz/articles/thesis/Thresholds_Text_Coverage_Vocabulary_Size_and_Reading_Comprehension_in_Applied_Linguistics/17057906)
- **Duolingo** [Other, company-reported]. A "Session Generator" builds lessons from a large pool of candidate exercises. Birdbrain predicts the probability that a learner will get each exercise right, and that prediction is used to pick the right difficulty. Duolingo reports that A/B tests show more learning and better retention (internal results, no independent replication found). — [Duolingo blog: Birdbrain](https://blog.duolingo.com/learning-how-to-help-you-learn-introducing-birdbrain); [IEEE Spectrum](https://spectrum.ieee.org/duolingo)
- Duolingo now drafts exercises with an LLM from expert-written prompts that set the exercise type, grammar focus and theme, producing about ten candidates in seconds. Humans review them because some come out stilted, and some exercise types stay human-led. — [Duolingo blog: LLM lessons](https://blog.duolingo.com/large-language-model-duolingo-lessons); [How Duolingo experts work with AI](https://blog.duolingo.com/how-duolingo-experts-work-with-ai)

### Inferences
- **Coverage gate per generated scene.** Tokenise the generated text into lemmas (or root+pattern for derived forms) and compute the share of tokens the player knows. Accept the scene only if coverage is ≥ 95% (new chapter) to 98% (fluent-reading scenes), with at most 1–2 new lemmas per scene, each supported by an image or gesture. Count proper names and repeated numerals as known. This is a design choice based on the Hu & Nation targets, which the replication shows are soft.
- **Count lemmas, not surface forms.** Arabic clitics (wa-, bi-, li-, al-, pronoun suffixes) multiply surface forms. If a known lemma inflected in a new way counted as unknown, coverage would be wildly underestimated. Inflections the player has not met yet can be tracked as "grammar exposure", separate from vocabulary.
- **No AI grader.** Player answers should be choices, ordering or slot-filling tasks whose correct answer the generator itself knows (it built the sentence from features). Answer checking is then exact match after Arabic normalisation (optionally ignoring case endings, depending on level).
- **Spaced exposure.** The scenario picker should add a salience bonus for storylets that reuse lemmas due for review. This replaces the "streaks/XP" systems the project's hard rules forbid.

### Gaps
- No sources were fetched on Tatoeba (sentence licences: CC BY 2.0 FR is commonly cited, **unverified**) or on Arabic graded readers and frequency lists (e.g. Buckwalter & Parkinson's *A Frequency Dictionary of Arabic*, Routledge, 2011, **[Other]**, copyrighted, not a free list). Muslim-world sources for Arabic frequency or graded vocabulary (e.g. KSU's Arabic Language Institute curricula, KACST corpora) were not found in this pass.
- No research was found on coverage thresholds specific to Arabic (most coverage studies are on English).

## 3. Arabic morphology and agreement engines for correct, fully vowelled MSA

### Takeaway
**CAMeL Tools (NYUAD, MIT licence) with the Camel Morph MSA database (over 100K lemmas, open source, data reportedly CC BY 4.0) is the best free choice.** It has a real `Generator` (lemma + features → diacritised forms) and a reinflector, and runs at build time in Python. Mishkal/Qalsadi are GPL, so they are fine as build-time tools but should not be bundled into shipped code. SAMA (LDC, fee) and MADAMIRA (Columbia, non-commercial only) should be avoided. Syntax-level agreement (numbers 3–10 taking the opposite gender, adjective agreement, sun/moon letters, pausal forms) is best written as the project's own small rule engine in TypeScript, using CAMeL-generated paradigm tables as data.

### Cited Findings
- **CAMeL Tools** [Muslim-world: NYU Abu Dhabi]: MIT licence. Components include morphological analysis, disambiguation, **generation**, **reinflection**, POS tagging, NER, dialect ID and more. It needs Python 3.11–3.14 (64-bit), Rust, and CMake+Boost on macOS/Linux, and on Apple silicon `CMAKE_OSX_ARCHITECTURES=arm64` may be needed. Data installs with `camel_data -i light|defaults|all`. — [GitHub CAMeL-Lab/camel_tools](https://www.github.com/CAMeL-Lab/camel_tools); [Install docs](https://camel-tools.readthedocs.io/en/latest/getting_started.html)
- **Generator API** (quoted from the docs): `Generator(db)`, where `db` is a `MorphologyDB` opened in generation or reinflection mode. `generate(lemma, feats)` takes a feats dict that must include `'pos'` and returns a list of analyses, with the surface form in the `diac` key. Docs example:
  ```python
  from camel_tools.morphology.database import MorphologyDB
  from camel_tools.morphology.generator import Generator
  db = MorphologyDB.builtin_db(flags='g')
  generator = Generator(db)
  analyses = generator.generate('شارِع', {'pos': 'noun', 'gen': 'm', 'num': 'p'})
  ```
  — [CAMeL Tools Generator docs](https://camel-tools.readthedocs.io/en/latest/api/morphology/generator.html)
- **Camel Morph MSA** [Muslim-world: NYUAD] (Khairallah, Khalifa, Marzouk, Nassar, Habash, LREC-COLING 2024): "the largest open-source MSA morphological analyzer and generator", over 100K lemmas, about 1.45B analyses and about 535M unique diacritisations, almost 10× SAMA in analyses, about 36% lower OOV rate than SAMA on a 10B-word corpus. It integrates with CAMeL Tools. — [ACL Anthology 2024.lrec-main.240](https://aclanthology.org/2024.lrec-main.240/)
- Camel Morph licensing: code MIT, **data CC BY 4.0**. Its databases currently need a CAMeL Tools fork. — [PyPI camel-morph](https://pypi.org/project/camel-morph) **[licence line UNVERIFIED against the repo's LICENSE file]**
- The Camel Morph nominals paper (EACL 2024 Findings) covers nouns, adjectives and elatives. Its talk slides report 95.3% recall of PATB analyses, with 86% of mismatches due to gold-standard errors. — [arXiv 2402.00385](https://arxiv.org/pdf/2402.00385v1); [Habash slides](https://sigtyp.github.io/workshops/2024/sigtyp/slides/2024-EACL-CamelMorph-Nominals-talk-NizarHabash.pdf) **[figure from slides; not checked in paper text]**
- **SAMA 3.1** (LDC2010L01) [Other: LDC/UPenn]: LDC members-only at a reduced fee, and non-members can license it for a fee (amount behind a login). This conflicts with the project's $0 budget. — [LDC catalog](https://catalog.ldc.upenn.edu/LDC2010L01); [LDC 2023 Arabic brochure](https://www.ldc.upenn.edu/sites/default/files/arabic-2023.pdf)
- **MADAMIRA** [Other: Columbia]: free *non-commercial* licence (v2.1, 2019), commercial terms on request. — [Columbia Tech Ventures](https://inventions.techventures.columbia.edu/licenses/madamira-non-commercial--108)
- **Farasa** [Muslim-world: QCRI/HBKU]: the paper says "freely available", but an HBKU 2025 document says HBKU offers it for licence. Exact terms not found. — [HBKU Farasa sheet](https://expertise.hbku.edu.qa/sites/default/files/2025-01/Farasa_0.pdf) **[licence UNVERIFIED]**
- **Mishkal** (diacritiser, Taha Zerrouki) [Muslim-world author, affiliation unconfirmed]: GPL (one index says GPL-3.0). It uses the **Qalsadi** analyser, whose licence was not confirmed. — [GitHub linuxscout/mishkal](https://github.com/linuxscout/mishkal)
- **Tashkeela corpus** (Zerrouki): GPLv2. Mostly classical, vowelled texts. — [SourceForge Tashkeela](https://sourceforge.net/p/tashkeela)
- **AlKhalil Morpho Sys** (Morocco) [Muslim-world]: licence not found. A related open-source "Alkhalil Corpus" appeared at AbjadNLP 2026. — [ACL Anthology](https://preview.aclanthology.org/credits/2026.abjadnlp-1.27)

### Inferences
- **Run everything at build time, not in the browser.** CAMeL Tools needs native Python, Rust and Boost, so it cannot run in a phone browser. Pipeline: (a) a Python build script calls `Generator.generate()` for every lemma × feature bundle the game can use, (b) writes a compact JSON paradigm table (only the about 1–3K lemmas the game uses, so likely a few hundred KB **[estimate]**), (c) the TS runtime combines forms from that table using the language pack's agreement rules. This keeps the engine language-neutral and the Arabic data in the language pack, as CLAUDE.md requires.
- **Agreement rules for the TS rule engine** (standard MSA grammar; the rules themselves are textbook facts, but **no grammar source was fetched this session**, so the project should add a Muslim-world grammar reference to SOURCES.md):
  - Numbers: 1–2 follow the noun's gender, and the dual is preferred over "two + plural". **3–10 take the opposite gender** to the singular of the counted noun (ثَلَاثَةُ رِجَالٍ / ثَلَاثُ سَاعَاتٍ), and the counted noun is a genitive plural. 11–99 take an accusative singular counted noun (with gender rules for 11–19). 100 and 1000 take a genitive singular. A safe beginner subset is digits plus 1–10 only.
  - Adjectives agree with the noun in definiteness, case, gender and number. **Non-human plurals take feminine-singular adjectives** (البُيُوتُ القَدِيمَةُ). The game's all-male cast means human-plural agreement needs only masculine forms, which also simplifies the engine.
  - Definite article: before a sun letter the lām is not pronounced and the sun letter takes a shadda (الشَّمْسُ); before a moon letter the lām takes a sukūn (القَمَرُ). Hamzat al-waṣl is dropped in pronunciation mid-sentence.
  - Case endings: track nominative/accusative/genitive from the template role (subject, object, after a preposition, iḍāfa). Diptotes (ممنوع من الصرف) take fatḥa in the genitive and no tanwīn. Pausal form (waqf) at a phrase end: drop the final short vowel and tanwīn, except that tanwīn al-fatḥ becomes ā, and tāʾ marbūṭa is read as h. For TTS and audio, store both the full-case and pausal forms.
  - Verb–subject agreement: VSO verbs are singular, SVO verbs agree in number. Choose one canonical order per template to avoid errors.
- **Template design.** Write sentences as feature templates, for example
  `[NPC:baker] يَقُولُ: «{greet}. {offer(ITEM, QTY)}»`, where `offer` is a sub-grammar with case and number slots. This avoids string concatenation: every slot carries features that the agreement engine resolves. Fixed, hand-vowelled frames ("صَبَاحُ الخَيْرِ") are stored whole rather than generated.
- **Licence decision for Arabic World ($0, may become commercial):** use CAMeL Tools + Camel Morph (MIT + CC BY 4.0, with credit in SOURCES.md and in-game credits). Use Mishkal only as an optional build-time cross-check (GPL does not reach outputs we only compare against, though this is a legal inference, not legal advice). Do not use SAMA or MADAMIRA.

### Added after the usage-limit reset: CAMeL data package licences
- The CAMeL Tools Packages page lists only two morphology databases: **morphology-db-msa-r13** (40.5 MB, **GPL v2**) and morphology-db-egy-r13 (67.3 MB, GPL v2). It does not say which one is the default or whether each supports generation. — [CAMeL Tools Packages](https://camel-tools.readthedocs.io/en/latest/reference/packages.html)
- **Inference (licence risk, not legal advice):** the CAMeL Tools *code* is MIT, but the built-in MSA *database* is GPL v2. A JSON paradigm table extracted from it and shipped in the game could count as a derivative of GPL data. **Prefer Camel Morph MSA data (reportedly CC BY 4.0) as the source of shipped tables.** Also keep a hand-vowelled, project-owned lexicon of the about 1–3K lemmas the game uses as the shipped artefact, and use GPL databases only to cross-check at build time. Confirm the Camel Morph LICENSE file before relying on this.

### Gaps
- It is still unconfirmed whether `MorphologyDB.builtin_db(flags='g')` loads morphology-db-msa-r13 (GPL v2, likely). Camel Morph databases reportedly need a CAMeL Tools fork.
- The Qalsadi, AlKhalil and Farasa licences are not confirmed.
- No browser/JS Arabic morphology generator was found in this pass.

## 4. Validating generated text at scale

### Takeaway
State-of-the-art automatic diacritisers still have word error rates of about 3–5% on MSA news, so a diacritiser cannot be the *source* of tashkeel or the judge of it. Use it as an alarm. Correctness should come from construction (lemma + features → CAMeL forms, hand-vowelled frames). Check it with analysis round-trips, deterministic rule linters, coverage and banned-content filters, and stratified human sampling.

### Cited Findings
- Best reported results: BiLSTM-based diacritisation reaches 3.12% / 2.70% on the updated WikiNews benchmark (EMNLP 2025, which also releases WikiNews-2024, reviewed by two linguists). It was **unclear whether these figures are DER or WER**. — [EMNLP 2025 paper](https://aclanthology.org/anthology-files/pdf/emnlp/2025.emnlp-main.846.pdf)
- PATB multi-task diacritisation: WER 4.79% vs 7.49% baseline (2021). — [arXiv 2109.14150](https://arxiv.org/pdf/2109.14150.pdf)
- The CATT benchmark compared 11 commercial and open diacritisers. Its reported 30.83% / 35.21% figures are *relative* DER reductions, not error rates. — [arXiv 2407.03236](https://arxiv.org/html/2407.03236v1)
- On cleaned Tashkeela (classical text): DER 3.39%, WER 9.94% counting all letters. — [arXiv 2401.04848](https://arxiv.org/html/2401.04848v1)
- Camel Morph generates about 535M unique diacritisations and has 95.3% PATB analysis recall (section 3). — [ACL 2024](https://aclanthology.org/2024.lrec-main.240/)

### Inferences (proposed validation suite, which can plug into the lab's Suites)
1. **Round-trip check (per sentence, at build time).** Run every generated word back through the CAMeL *analyser*. The intended (lemma, features) must be among the analyses of its diacritised form. A mismatch blocks the template.
2. **Diacritic completeness linter.** Every Arabic letter except long-vowel carriers has a ḥaraka or sukūn. Sun-letter shadda is present after al-. There is no double ḥaraka. Tanwīn appears only on indefinite words.
3. **Agreement linter.** Recompute the expected gender/number/case for each slot from template roles, then compare with the features of the realised form (catches 3–10 polarity, broken-plural adjective errors, diptote tanwīn).
4. **Disagreement alarm.** Strip diacritics, re-diacritise with a second system (CAMeL's disambiguator, or Mishkal at build time only), and flag words where the systems differ. These go to a human queue, but are not auto-rejected, since the diacritiser's own WER is about 3–5%.
5. **Coverage gate** (section 2) and **lexicon whitelist**: every lemma must be in the curated game lexicon, which is pre-labelled universal / cultural / sacred (matching `app/src/core/review.ts`).
6. **Banned-content filters** (hard rules): a lexicon blocklist of female-person nouns, pronouns and feminine *human* forms (3fs verbs or pronouns that refer to a person; non-human feminine nouns are fine), music words, and evening/night time words. A clock check enforces 08:00–11:00. Quran text is allowed only in sanctuary scenes and is never generated. Because outputs are built from features, a **feature-level** ban (no `gen:f` on a `+human` slot) is stronger than word lists.
7. **Combinatorial coverage testing.** Rather than sampling millions of outputs, enumerate every template × every slot *type* (pairwise or all-pairs over features). Correctness is compositional, so if every template/feature combination is verified, every filled instance is too.
8. **Human sampling.** Stratified random samples per template (e.g. 20 instances per new template) go to a reviewer list. Human time goes on new templates, not on instances.

### Gaps
- No published error rates for *template-based Arabic NLG* (as opposed to diacritisation) were found. The project will have to measure its own error rate on human-reviewed samples.

## 5. Optional later layer: Arabic LLMs for open conversation

### Takeaway
There are Apache-2.0 open-weight Arabic LLMs from the Muslim world: **Fanar-1-9B (QCRI)** and the **Jais / Jais 2 family (Inception/MBZUAI/Cerebras)**. ALLaM 7B (SDAIA/HUMAIN) is reportedly under a research licence. All of them are far too large for a free on-device phone browser game today, and none guarantees tashkeel, known-word limits or the hard rules. If used at all, they should only *draft* templates offline, with the section 4 validators and human review deciding. An LLM must never grade the player.

### Cited Findings
- **Fanar-1-9B** [Muslim-world: QCRI]: Apache 2.0 on the official model card. Arabic and English, about 1T pretraining tokens, continually pretrained from Google's Gemma-2-9B (whether Gemma's terms carry over was not checked). Fanar-2-27B-Instruct's README also says Apache 2.0. — [HF QCRI/Fanar-1-9B](https://huggingface.co/QCRI/Fanar-1-9B); [HF Fanar-2-27B-Instruct](https://huggingface.co/QCRI/Fanar-2-27B-Instruct/blob/main/README.md); [Fanar paper](https://arxiv.org/abs/2501.13944v1)
- **Jais family** [Muslim-world: Inception/G42 + MBZUAI]: Jais family model cards list Apache 2.0, with sizes from 256M to 30B+. — [HF jais-family-13b](https://huggingface.co/inceptionai/jais-family-13b). **Jais 2** (8B, 70B) is "openly available under Apache 2.0", but the repos are gated behind a contact-information click-through. — [HF Jais-2-8B-Chat-GGUF](https://huggingface.co/inception42/Jais-2-8B-Chat-GGUF); [MBZUAI announcement](https://mbzuai.ac.ae/news/inception-cerebras-and-mbzuai-release-jais-2-the-next-generation-of-the-worlds-leading-arabic-open-weight-llm/)
- **Jais 3**: only third-party descriptions found (reportedly 0.9B to a 375B MoE). — [Miraflow blog](https://miraflow.ai/blog/jais-3-explained-open-arabic-llm-375b-moe-benchmarks-2026) **[UNVERIFIED]**
- **ALLaM** [Muslim-world: SDAIA/HUMAIN]: the 7B Instruct preview is reportedly on Hugging Face under a research licence, while 34B is closed (HUMAIN Chat only). — [Third-party comparison](https://arabicagenticai.pages.dev/arabic-llms/open-source-vs-proprietary/) **[UNVERIFIED; check the HF model card]**

### Inferences
- **On-device feasibility.** The smallest Jais-family models (256M–590M) might run in-browser via WebGPU/WASM after quantisation. That is untested, and their quality on fully vowelled Fusha is unknown. 8–9B models need a GPU server, which conflicts with the $0 budget and with privacy.
- **The best use is an offline author's assistant.** Prompt Fanar or Jais at build time to propose new storylet *frames* in a known-lemma list. Strip their diacritics. Rebuild the sentence through the template + CAMeL pipeline (or reject it). Then run section 4. This keeps "no AI grader" and "no AI-generated Quran" intact and keeps the hard rules enforceable.
- **Constrained decoding** (masking logits to known-lemma tokens) is hard in Arabic, because subword tokens do not line up with lemmas or clitics. Post-hoc filtering and regeneration is simpler.

### Gaps
- Exact ALLaM and Jais 3 licences, Gemma derivative terms for Fanar, and any benchmark of these models on full-tashkeel generation were not found.
- No source was found on in-browser inference of Arabic LLMs.
