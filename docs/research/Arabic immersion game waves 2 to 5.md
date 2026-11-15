# Waves 2–5 turn the Arabic world into a buildable brief

**Bottom line.** Waves 2–5 support the idea, but they narrow it. Nobody has yet built an immersive world game whose *core* is Arabic for understanding the Quran. Wave 1's "nobody has built anything like it" was too strong, though: two generic language worlds, LingoLooper and Mondly VR, now include Arabic as one language among 30–40. The science supports "lots of understandable Arabic, made enjoyable," with three changes from Wave 1. Adults do **not** seem to need live humans: a face on a screen that makes eye contact worked as well as, or better than, a teacher in the room. Short, light grammar nudges help a lot, and *whether* you do them matters more than *how*. Arabic needs a much bigger vocabulary than English for the same comprehension, so roots and verb patterns are the key multiplier. The Quran goal compresses well. About 70–80 dictionary words cover half of the Quran's running text and about 300 cover 70%. Dr. Islam Fekry's "85%" is reached with about 283 listed words *plus* verb-pattern knowledge, not 85% of the vocabulary. "Every word" still means roughly 4,000–5,000 dictionary words, plus tafsir help for the rare ones. The web-first tech stack passed its feasibility check, with three conditions. First, iPhone gets no VR or AR, and Vision Pro gets VR only. Second, Arabic speech recognition on a real iPhone is still unproven and must be the first prototype test. Third, strict memory and graphics budgets apply from day one. Licensing is workable: Quran text can ship, fonts can ship if obtained the right way, and recitation audio needs a reciter you commission yourself. The recommended story is a composite modern student's first year in an Arabic-speaking city, with Ibn Battuta as an in-game legend. The draft Wave 6 brief at the end sets version 1 as one small neighbourhood with three or four friends and about 150 words and grammar items, released as a free Safari home-screen app. Every number in it is still provisional until the prototype tests listed there have been run.

## Strict sourcing rule: Muslim sources first

**Rule (set by Edward, 15 Nov 2026, applies to this report and every future wave):** rely on Muslim sources over orientalist or non-Muslim ones. When two sources cover the same point, pick the Muslim one. Use a non-Muslim source only when no Muslim source covers the point, and label it as such.

How the rule is applied:
- **Quran text, meaning, tafsir, tajweed and Islamic content:** Muslim scholarly sources and institutions only. Examples are the King Fahd Glorious Quran Printing Complex (KFGQPC, publisher of the Madinah Mushaf), the Islamic University of Madinah, Umm al-Qura University, AMAU, Tanzil, the Quran Foundation (Quran.com) and Tarteel. Orientalist translations, commentaries and academic readings of the Quran are not used.
- **Arabic teaching:** curricula written by Muslim scholars and institutions come first. Examples are the Madinah books (Dr. V. Abdur Rahim), Al-Arabiyyah Bayna Yadayk, AMAU, Understand Quran (Dr. Abdulazeez Abdulraheem) and *How to Understand 85% of the Quran* (Dr. Islam Fekry, Arabic 101 Series). Western university programmes are used only for points nobody else covers.
- **Neutral fields** (game technology, speech AI, general learning science): when two sources are equal, the Muslim or Muslim-world author or institution wins. Examples are MBZUAI, QCRI, SDAIA, KAUST and the ArabicNLP community.
- **Judged by the source, not by guessing someone's faith:** a source counts as Muslim when the author or institution clearly identifies as Muslim or Islamic, or is an institution in the Muslim world. Where that isn't clear, the source is marked "affiliation unconfirmed". Nobody's religion is assumed.

**How the rule was applied in Waves 2–5.** The rule decided the source most often in Arabic teaching, Islamic etiquette and speech AI. On which Arabic to teach, the main evidence is now from Muslim-world institutions: Imam Muhammad ibn Saud Islamic University, the Islamic University of Madinah, King Khalid University, Qasid (Amman) and a Qatar Foundation blog. On pronunciation and grammar teaching, the sources are the Islamic University of Madinah, IIUM (Malaysia) and Qassim University. On Islamic etiquette for Quran content, music and 3D characters, the sources are fatwa bodies and scholars only: Dar al-Ifta al-Misriyyah, the Federal Territory Mufti (Malaysia), Darul Iftaa, Darul Ifta Birmingham, IslamWeb, IslamQA and SeekersGuidance. On Arabic language models and speech, the picks are Gulf-lab models: Jais 3 and Jais-ASR (MBZUAI/IFM), ALLaM (SDAIA), Fanar (QCRI) and the Sadeed diacritiser (Misraj.ai). These were preferred over equivalent Western models.

Non-Muslim sources remain in four areas, each labelled in the text, because no Muslim source covering the same point was found:
- core second-language-learning meta-analyses
- the captioning and AI-chatbot studies (one AI study is from a Turkish university)
- the global Muslim population figure (Pew)
- game design talks, vendor documentation and store data

**Wave 1 sources the rule flagged, and what happened:**

| Wave 1 source flagged | Outcome in Waves 2–5 |
|---|---|
| Al-Kitaab / Georgetown and Wikipedia (which Arabic to teach) | **Replaced.** The register recommendation now rests on Muslim-world institutions: IMSIU's Fusha-only institute, Qasid's MSA-plus-optional-dialect tracks, King Khalid University's education-level data and AMAU's dialect-last sequence. Al-Kitaab is no longer cited. Wikipedia is still used once, only as a labelled secondary compilation of Babbel's revenue. |
| Buckwalter & Parkinson frequency dictionary | **Partly replaced.** King Saud University's KSUCCA corpus was found, but it is Classical Arabic only and publishes no frequency list. The KACST corpus was not reached. Buckwalter & Parkinson is kept only as a labelled reference check. The plan is to build the game's own MSA frequency list with open tools. |
| Soliman 2014 cross-dialect study (affiliation unconfirmed) | **Not replaced; supplemented.** No Muslim-world cross-dialect comprehension study was found. Soliman is still cited, labelled. It is now backed by Muslim-world data on how educated Saudis speak and by Qasid's guidance. |
| Quran coverage numbers from secondary blogs | **Replaced.** The curve was rebuilt from the Quranic Arabic Corpus frequency lists (maintained by the Quran.com team) and cross-checked against Understand Quran and Fekry. A full recount from the Tanzil text is still pending, because downloads were blocked. |
| Clozemaster (competitor blog) on Duolingo Arabic | **Not replaced.** No review of Arabic apps by an independent Muslim Arabic teacher was found. The only Muslim-teacher view found is from Kalimah Center, which competes with the app it reviewed. Still a gap. |

One more note: a GitHub page found in Wave 3 contained a hidden instruction aimed at AI agents. It was ignored and had no effect on this report.

## Latest decisions (15 Nov 2026, evening)

Details are in "Master research backlog round 1".
- **Web app only:** no Steam, no Unreal. Android Chrome and iPhone Safari are equal first targets.
- **Three automatic quality tiers:** pre-rendered Blender scenes, baked-light WebGL2 3D (the baseline), and WebGPU with splats on capable devices.
- **Two Quran meters:** "words I recognise" and "verses I understand".
- **Tashkeel:** fade it gradually on everyday text; Quran text stays fully vowelled.
- **Heads:** completely smooth.
- **Setting:** a fictional Hijazi-style old quarter.
- **Privacy:** no accounts, analytics, ads or notifications in version 1, with an export-progress backup.
- **Claude Code effort policy:** low/medium to build, high to verify and fix, max only for the deep review every 10 cycles.

## Hard rules (set by Edward, 15 Nov 2026, non-negotiable)

These override any recommendation elsewhere in this report or in earlier reports.
1. **No faces.** Characters have no eyes, nose or mouth.
2. **Modest dress** for every character.
3. **No female characters** at all.
4. **No music.** The only recitation or melodic audio is Quran recitation and the adhan. Character voices, ambient sound (street, market, wind) and sound effects are not music. No nasheeds, no duff.

**What the rules change, and how the design makes up for it:**
- **Faces and learning:** Wave 2 found adults learned words well from a teacher's face on screen. Without faces, characters carry meaning through body language: pointing, nodding, head turns, hand gestures, leaning in and holding up objects. Arabic captions (shown ~4× better than English subtitles) do the rest.
- **Lip-sync is no longer needed.** That removes a whole pipeline and one prototype test. A small "speaking" cue (a gentle head bob or a speech bubble with the Arabic line) shows who is talking.
- **Cast:** the host household, friends, shopkeepers and every other character are men or boys. In-world phone messages and voices are all male, so every TTS voice is male.
- **Audio:** the soundscape is voices, ambience, the adhan at prayer times, and Quran recitation in sanctuary spaces only. The in-world "radio" becomes a Quran station and a spoken talk/news station, with no music channel.

## Reply modes and the word ladder (added 15 Nov 2026)

Full detail and sources: "Reply modes and word ladder" report.

- **Characters speak with real audio and Arabic captions. The player does not speak in version 1.** Voice input is built separately and added later as an optional layer.
- **Three reply modes, named for the journey:**
  - **Musāfir (easy):** tap the right reply, or act it out (hand over an item, point).
  - **Ṭālib (medium):** build the reply from word tiles, then type it on an in-game Arabic keyboard with hints.
  - **Muqīm (hard):** type freely, with no options and no hints.
- **Default "Let the city decide":** each word climbs its own ladder (heard → recognised → built → typed freely → later spoken). The Lexical Director picks the reply type line by line. Players can switch mode for any prompt, free.
- **Changes from the evidence:**
  - Tiles and hinted typing are halfway steps; only free typing counts as "produced".
  - Each word has a target rung: Quran-only words stop at "recognised".
  - Advance after 2–3 first-try correct answers across ≥2 sessions; about 5–7 total successes for "produced".
  - A miss drops the word one rung, and words are never retired.
  - Beginner mix: about 60% recognition, 40% production.
  - Tashkeel optional when typing. Common spelling slips are accepted with a note; root-changing swaps get "Did you mean…?". Quran levels are strict.
  - Failure: recast in character → options → the character says it on miss 3.
  - No grinding: a rung fills only when answered at that rung.

**Build rules**

| # | Rule |
|---|---|
| 1 | One intent table per scene; tap, gesture, tiles, typing and later voice all map to it |
| 2 | Tap options show the full Arabic line with tashkeel plus audio; never paraphrases |
| 3 | Per word: `rung` (0 heard … 4 typed, 5 spoken), `targetRung`, per-rung success count, sessions seen, memory model state |
| 4 | Advance: ≥2–3 first-try unhinted correct at the current rung across ≥2 sessions; "produced" needs about 5–7 total successes |
| 5 | Miss: immediate audio correction, demote one rung, reschedule soon; never retire a word |
| 6 | Director: reply type set by the weakest due word in the line; beginner mix 60/40 recognition/production; cap repeats of one type per scene |
| 7 | Mode switch is per prompt and free; progress records only the rung actually used; a revealed hint counts as a weaker success |
| 8 | Checker: NFC, strip tatweel and harakat (U+064B–0652, U+0670) for the base match; authored accepted list; no AI grader |
| 9 | Accept with note: hamza forms and seat, ة/ه/ت, ى/ي, final verbal alif. "Did you mean": root-changing letter swaps, long-vowel add/drop. Quran levels: no accept-with-note |
| 10 | Failure: recast in character, then show options, then the character says the line on miss 3; the scene always continues |
| 11 | Keyboard: in-game, Apple Arabic layout, long-press hamza/ya/waw/ta-marbuta sets, hidden harakat row, system keyboard suppressed |
| 12 | Tiles: tap-to-place/remove, `dir="rtl"`, logical order; vowelled text in an HTML overlay |
| 13 | Rewards: only the word-stage journal and the Quran meter (recognition-based); no XP, coins, gacha or streaks |
| 14 | Voice v1: choose among 2–4 visible lines, show the transcript, tap fallback |

## Neighbour game: The Last Pillar: Hajj (added 15 Nov 2026)

A solo former Rockstar developer's cozy cleaning sim set at the Haram during Hajj (Crescent Dial Games; English, Windows, free demo since 3 Sep 2026, release about Q4 2027). It is a neighbour, not a direct competitor: it teaches about Hajj, not Arabic. Lessons:
- **Cozy tasks as comprehension checks:** a friend asks for something in spoken Arabic, the player does it, and doing it right is the answer. Misunderstanding leaves the task unfinished, with no red X.
- **Serve, don't perform:** the traveller helps around the masjid courtyard and water cooler. Prayer and rites are never scored gameplay. Sacred objects are never picked up, dropped or "cleaned" as a game task. Show a short "this is fiction, not worship" note.
- **Sound without music:** rich object sounds (as in *Unpacking*) and one non-melodic "task done" sound. Everything mutes for the adhan.
- **State the hard rules publicly** (no faces, modest dress, male cast, no music) as a trust signal.
- **Marketing:** short clips pairing one satisfying action with one Arabic word, linking straight to the web build. Collect email or Discord sign-ups from day one. A Steam page and Next Fest come only once a Windows build exists.

## Findings by theme

### Adults learn from faces, input and light correction, not from pure immersion

The biggest change from Wave 1 concerns people. Wave 1 leaned on Kuhl's infant study, in which babies learned Mandarin sounds from live tutors but not from video. Adults appear to work differently. In two experiments with 36 adults each, learners picked up more words from a **video of a teacher's face than from the same teacher in the room**. Live presence was no better than slides with a voice. The authors call this "social inhibition": a watching person makes hard tasks harder ([Martin et al. 2019](https://www.frontiersin.org/articles/10.3389/fpsyg.2019.01350)). The samples were small and recall was tested only immediately, but the finding points one way. Game characters with faces and direct gaze are a sound substitute for people, and a private game removes the self-consciousness. AI conversation partners help with nerves rather than skill. In a 48-student crossover study at a Turkish university, anxiety before an AI speaking exam was lower than before a human one (**d = 0.39**, a small-to-moderate effect). Scores did **not** differ, and 10 of 11 students interviewed still preferred humans for their empathy ([Susoy 2026](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2025.1745942/full)). The practical reading is to write warm, patient characters, not neutral examiners.

Is pure immersion the best method? The verified evidence says no, but it also gives grammar drilling no big win. The largest meta-analysis found, covering **54 studies and 5,051 learners**, gives form-focused instruction a large overall effect (**g = 1.06**). It found only a "minor difference" between explicit and implicit versions. Intensity and the type of test mattered more ([Kang, Sok & Han 2019](https://www.switchboardta.org/evidence/thirty-five-years-of-isla-on-form-focused-instruction-a-meta-analysis/)). An earlier 34-study synthesis concluded that explicit instruction was more effective overall ([Goo et al. 2015](https://www.degruyterbrill.com/document/doi/10.1075/sibil.48.18goo/html)). Wave 1's recalled effect sizes for Norris & Ortega 2000 are still unverified and are dropped here. The defensible position is lots of understandable input, plus short, regular moments of attention to form. Correction should mostly be **prompts** (pushing the learner to fix it themselves) rather than recasts (quietly repeating the correct form). Across 15 classroom studies with 827 learners, prompts produced larger, durable effects ([Lyster & Saito 2010](https://www.cambridge.org/core/product/4999EE1C8379B2BF026B148EAF373CA1)). Progress should also be measured through free use (talking to characters), not only quizzes, since quiz-style tests inflate the measured effect.

Vocabulary research gives spacing rules, not a magic number. Repetition reliably helps (**r = .34**, a medium effect), but studies disagree on how many encounters a word needs, anywhere **from 2 to over 20**. Incidental learning from reading and listening works but is weaker than deliberate learning ([Lee & Lloyd 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC11954681)). About 10 spaced, meaningful encounters plus one recall moment is a sensible design target. The best gap between reviews is a fraction of how long you want to remember. It is about **20–40% of a one-week goal but only 5–10% of a one-year goal** ([Cepeda et al. 2008](https://pubmed.ncbi.nlm.nih.gov/19076480/)). Sleep matters too: new spoken words only began behaving like real words after a night's sleep ([Dumay & Gaskell 2007](https://eprints.whiterose.ac.uk/7437)). That supports a "day ends, sleep, test tomorrow" rhythm over marathons. The FSRS scheduling algorithm predicted recall better than Anki's old algorithm for **99.6% of users** in a community benchmark of about 350 million reviews. That benchmark is not peer-reviewed ([Expertium](https://expertium.github.io/Benchmark.html)). No study was found that sets a maximum useful number of hours per day.

Captions and script have clear answers. Arabic audio with **Arabic captions** produced about four times the vocabulary effect of English subtitles (**d ≈ 1.73–1.81 vs ≈ 0.40–0.43**). Animation was the strongest medium of all (d ≈ 1.65) ([Reynolds et al. 2022](https://mdpi.com/2079-8954/10/5/133)). Full vowel marks (*tashkīl*) help native readers decode accurately. Their cost for fluent readers is tiny: fixations about 7 milliseconds longer, with no change in total reading time ([Hermena et al. 2015](https://eprints.whiterose.ac.uk/99470/1/Hermena_et_al._2015_author_final.pdf)). No study tested this on adult learners of Arabic, so it remains an informed default. Because the Quran is always fully vowelled, the game should show full tashkīl from day one and introduce reading early. Input-only camps that delay reading do not suit this goal.

Honest time expectations got firmer, and more sobering. Even the US military's full-time language school reached its target level (L2+ listening and reading, S1+ speaking) for only **35% of basic-course graduates** in FY23, against a 40% goal ([DLIFLC 2024](https://www.dliflc.edu/about/accreditation/annual-report-2024)). Speaking lags well behind comprehension even in full-time training. Grammar-learning ability stays strong until about **17–18 years old** in a sample of 669,498 people, but adults learn fast in the short term ([MIT News on Hartshorne et al. 2018](https://news.mit.edu/2018/cognitive-scientists-define-critical-period-learning-language-0501)). The FSI's "about 2,200 class hours" for Arabic is still known only from a secondary reproduction. Dreaming Spanish admits its hour levels come from Thai learners' experience, not research ([Dreaming FAQ](https://dreamingspanish.freshdesk.com/support/solutions/articles/158000407386-what-are-the-7-levels-and-the-number-of-hours-for-each-one-based-on-)). "Fluent in three months" remains unsupported. The honest promise is strong comprehension built over one to two years of daily play.

The polyglot and Muslim-teacher advice agrees on the essentials. Shaykh Farid Dingle (SeekersGuidance) recommends Quranic vocabulary first: memorise **2,000–3,000 essential words** with core grammar, then read real texts. He warns that grammar-only study gives non-Arabs an "illusion" of progress ([SeekersGuidance](https://seekersguidance.org/answers/general-answers-feeds/how-should-i-learn-arabic/)). Luca Lampariello's method pairs text with audio from the start and adds translation in both directions ([lucalampariello.com](https://www.lucalampariello.com/bdt-new-2/)). Primary pages for Kaufmann, Argüelles and Refold still could not be retrieved. Across the sources that were verified, the shared ground is a big diet of meaningful input, a high-frequency core vocabulary, grammar used as a tool and not a goal, audio linked to text, and daily consistency.

### The Quran's first 300 words cover 70% of the text; the rest is a long tail

Arabic in general is lexically heavy. Using native-speaker data from Saudi Arabia, Masrai & Milton found that about **9,000 lemmas** (dictionary headwords) give about **95% coverage** of text and **14,000 give about 98%**. Educated native speakers know about **25,000 words** ([Swansea Cronfa](https://cronfa.swan.ac.uk/Record/cronfa26020/Details); [Masrai & Milton 2019](https://cronfa.swan.ac.uk/Record/cronfa31587/Details)). Those units are not directly comparable with English word families, but the burden is clearly higher. Their other finding matters for design. Native vocabulary growth *speeds up* in adolescence, which they tentatively link to mastering Arabic's regular root-and-pattern system. That is the strongest argument for teaching roots and patterns explicitly.

The Quran is far more compact. Wave 3 rebuilt a coverage curve from the Quranic Arabic Corpus frequency lists. Those lists hold **3,680 noun and particle lemmas** and **1,475 verb entries** (counted as root plus verb form) ([QAC lemmas](https://corpus.quran.com/lemmas.jsp); [QAC verbs](https://corpus.quran.com/verbs.jsp?page=1)). The top 50 nouns and particles alone account for 29,797 of roughly 77,430 words. The table is a sampled reconstruction, interpolated between page totals and checked against them to within 0–3.5%. The tail above 90% is extrapolated and has **±10–20% uncertainty**. "Coverage" here always means the share of *running words on the page*, not the share of distinct vocabulary.

| Share of the Quran's running words | Lemmas needed (approx.) |
|---|---|
| 50% | ~70–80 |
| 70% | ~280–330 |
| 80% | ~560–710 |
| 85% | ~840–1,110 |
| 90% | ~1,300–1,900 |
| 95% | ~2,400–4,000 |
| 98% | essentially all lemmas, plus pronouns and attached particles |

The lower figure in each range assumes pronouns and attached particles are already known. These are a closed set of about 40 items (و، ف، ب، ل، ك, suffix pronouns, هو/هم…) that the game should teach as a "grammar deck" in month one. The Muslim educators' figures sit inside this band. Understand Quran says **125 words cover about 50% and 250 cover about 70%** ([Understand Quran](https://cdn.byenah.com/contents/2986/en_understand_Quran.pdf)). The reconstruction puts 125 lemmas at about 58% and 250 at about 68%. Beyond 90% the gains crawl, because roughly half of all lemmas occur only once or twice. Full comprehension therefore needs glossed reading with tafsir and dictionaries of rare Quranic words, not just more flashcards. Counts also differ by resource. QuranMorph lists 4,616 lemmas ([arXiv 2506.18148](https://arxiv.org/html/2506.18148v1)), and a hand-verified Moroccan resource found that the Corpus's automatic analysis was only about 75% correct before manual review ([QAMAR 2026](https://aclanthology.org/2026.abjadnlp-1.38.pdf)). That is why the game should compute its own numbers from one consistent dataset.

**Dr. Islam Fekry's *How to Understand 85% of the Quran* (Arabic 101), checked against the curve.** The book (254 pages, Dakwah Corner, 2025, with a companion app) is a Muslim-authored course. It states that it is based on Dr. Abdulazeez Abdulraheem's Understand Quran work ([Dar-us-Salam](https://dar-us-salam.com/quran/learn-the-quran/rd05-how-to-understand-85-of-the-quran.html); [free edition PDF](https://pub-e16761451ec344be96755659939da4bd.r2.dev/book-pdfs/1769405813719-ck52aa91pb-how-to-understand-85-of-the-quran-free-version-c-zu3vlb.pdf)). It has three tiers:
- **Part I** teaches **88 words** (demonstratives, negation, question words, prepositions, particles, connectors) to reach **50%**.
- **Part II** adds **195 thematic words** to reach **65%**.
- **Part III** reaches **85%** by teaching **verb Measures II–X** and irregular verbs, not more single words.

The book names no counting method and calls its percentages "estimations" ([free edition PDF](https://pub-e16761451ec344be96755659939da4bd.r2.dev/book-pdfs/1769405813719-ck52aa91pb-how-to-understand-85-of-the-quran-free-version-c-zu3vlb.pdf)). Against the curve, the first two claims hold up. 88 words for 50% matches the reconstruction, and about 283 words for 65% is slightly conservative, since the curve gives about 70%. The 85% claim is a different kind of number. Counting raw lemmas, 85% takes about **840–1,110**. Fekry's route works only if the learner can actually recognise unfamiliar verbs and derived nouns from their root and pattern. That is plausible but has never been measured. It also corrects Wave 1, which guessed at "about 500 core words" from a shared Anki deck: the book itself lists about 283 words plus a verb-pattern system. The verdict is that it is a strong, honest Phase 1 study book for Edward and a good model for the game's early order. Its 85% should be read as "85% of running words, if verb patterns work for you". It is copyrighted, so the game follows its approach and does not copy its lists.

Muslim educators share a consistent order, and it matches the frequency curve:
- script and vowel marks
- pronouns and demonstratives
- gender and definiteness
- the nominal sentence
- prepositions and possession (*iḍāfa*)
- the verbal sentence with past and present tense
- plurals
- verb measures II–X
- graded readers such as *Qasas an-Nabiyyin*

The order is drawn from the Madinah Book 1 summary ([Al-Dirassa](https://al-dirassa.com/en/methode-medine-livre-1)), Fekry and AMAU ([AMAU Helpdesk](https://helpdesk.amauacademy.com/articles/programs-and-study-paths/arabic-with-amau-explained)). Because function words dominate the top of the frequency list, "grammar first" and "frequency first" largely coincide at the start. Evidence that teaching roots and patterns *speeds up* vocabulary learning is suggestive but thin. Indonesian learners at Qassim University showed native-like sensitivity to roots ([Aljasser 2026](https://jltr.academypublication.com/index.php/jltr/article/view/12186)). In a study of Lebanese children (labelled: non-Muslim-world university), derivational patterns were much harder than inflections, 37% against 85% correct ([El Akiki & Content 2020](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2020.552315/pdf)). No controlled trial in adults exists, so the game should A/B test root-family unlocks itself. One gap remains open: no study measures what share of Quranic lemmas are also frequent in Modern Standard Arabic. A spot check suggests nearly all of the top 100 are core MSA words. That is an inference, not a measurement.

### Teach Fusha, speak "educated white Arabic", listen to light dialect

Every Muslim institution surveyed puts Fusha at the core. Imam Muhammad ibn Saud Islamic University's institute for non-native speakers teaches eloquent Arabic (الفصيحة) for everything, including everyday conversation. Its intensive course runs **three 160-hour levels**, and its materials never mention dialect ([IMSIU brochure](https://units.imamu.edu.sa/colleges/TeachingArabicLanguageInstitute/FilesLibrary/Documents/الإصدار%20التعريفي%20للمعهد%20باللغتين%20العربية%20والإنجليزية.pdf)). Qasid in Amman offers dialect as a separate, optional track alongside MSA and Classical Arabic. It notes that Egyptian "is widely understood from the Levant to the Gulf" ([Qasid](https://www.qasid.com/blog/the-ultimate-guide-to-arabic-dialects)). AMAU puts dialect last.

The spoken layer has a real-world model. "White dialect" (اللهجة البيضاء) is what young Saudis from Qassim call the way they talk to Arabs from other regions. They drop local features and borrow across varieties, often from Fusha ([Leiden thesis, labelled non-Muslim-world institution](https://www.universiteitleiden.nl/en/research/research-output/humanities/the-white-dialect-of-young-arabic-speakers-from-qassim-saudi-arabia)). The term means different things in different countries, so no fixed "white dialect" exists to copy ([Revista Española de Lingüística](https://revista.sel.edu.es/index.php/revista/article/view/2114)). Saudi data shows educated speakers drift toward Fusha on their own. The MSA vocabulary used in two minutes of casual speech rose from **137 items at high-school level to 304 at PhD level** (r = 0.72 with education) ([Alasiri, King Khalid University 2024](https://journals.kku.edu.sa/sites/journals.kku.edu.sa/files/2024-09/The%20Role%20of%20Education%20level%20in%20the%20Modern%20Standard%20Arabic%20Use%20The%20Saudi%20Context.pdf)). So a learner who speaks Fusha-leaning, simplified Arabic is imitating something educated Arabs already do. The truly pan-Arab spoken items are the religious formulas: inshallah, wallah, yalla, mashallah, alhamdulillah and bismillah. They are documented in dialects from Morocco to Iraq and work in Fusha too ([Bozza & Mion 2025, labelled](https://iris.unica.it/retrieve/cf283494-e7c4-4641-bc04-6ff0d7472429/Bozza%2c%20Mion_Theophoric%20Formulae%20in%20Spoken%20Arabic%28s%29.%20A%20Trigger%20for%20Grammaticalization.pdf)). They make a natural bridge from the Quran to the street.

The street will answer back in dialect. In a Cairo study published by Qatar Foundation International, colloquial Arabic "dominated all interactions". Older speakers often switched to English, and younger ones simplified and slowed their colloquial ([QFI 2025](https://www.qfi.org/blog/preparing-students-for-native-non-native-arabic-conversation-2025)). The design consequence is that players should *speak* Fusha-leaning Arabic but *hear* lightly regional replies (Egyptian and Levantine first) from early on, for recognition only. One honesty flag: no study was found that measures how well ordinary adults *understand* spoken Fusha. "Fusha is understood everywhere" is strongly supported by media reach and shared vocabulary, but it is not a measured statistic.

Pronunciation and grammar teaching also have Muslim-sourced methods. At the Islamic University of Madinah, the hardest sounds for non-native students are the throat sounds, certain tongue sounds and the emphatics. **96% of errors are substitutions**, such as ح for ه. The recommended remedies are guided imitation, minimal-pair drills and teaching sounds grouped by where they are made (*makhārij*) ([Al-Sa'idi 2025, IU Madinah](https://journals.iu.edu.sa/ALS/Main/Article/5735)). The Noorani Qaida moves from letters and their articulation points through vowels, *sukūn*, *tanwīn* and *madd*, using only Quranic words ([Kalimah Center](https://kalimah-center.com/what-is-noorani-qaida/)). For *iʿrāb* (case endings), IIUM scholars argue that "the basis of teaching grammar is imitation and modelling, not memorisation" ([Sahrir & Salem 2018](https://journals.iium.edu.my/arabiclang/index.php/jlls/article/view/666)). The game can require full endings when reading the Quran and allow casual endings in conversation. No source was found that says whether beginners should *speak* with full endings.

### Licensing: Quran text can ship, fonts need care, audio needs your own reciter

*This section records what each provider's published terms say. It is not legal advice; a lawyer should review the final licence list before any commercial launch.*

| Asset | What the terms say | Practical verdict |
|---|---|---|
| Tanzil Quran text | "Creative Commons Attribution 3.0"; verbatim copies only; modification not permitted. These terms are known second-hand, because Tanzil's own licence page could not be fetched ([hifzer sources](https://hifzer.vercel.app/legal/sources); [harfnexus](https://harfnexus.pages.dev/attribution)) | **Bundle it**, verbatim and credited. Confirm that splitting the text into words for gameplay still counts as "verbatim". |
| Quran Foundation API text | No build-time bundling; cache for 7 days at most ([QF terms](https://api-docs.quran.foundation/legal/developer-terms/)) | Online extras only |
| Mushaf fonts and page images via Quran Foundation | "may cache or bundle font files and Mushaf images", with credit, inside the app only ([QF fonts terms](https://api-docs.quran.foundation/legal/mushaf-fonts-and-images/)) | **Bundle them** through QF |
| KFGQPC font downloaded directly | Free, but "cannot be Sold, Modified, Altered…"; embedding is not addressed ([KFGQPC EULA copy](https://openhub.net/licenses/KFGQPC)) | Risky: game engines convert fonts, which may count as modifying them |
| QuranEnc translations | Re-publishing allowed with no edits, credit, version number, updates, and no "inappropriate advertisements" ([QuranEnc](https://quranenc.com/ur/browse/afar_hamza)) | **Bundle them** under those conditions |
| Saheeh International, The Clear Quran, word-by-word glosses | No open licence found ([Clear Quran FAQ](https://apps.theclearquran.org/faq.html); [QUL credits](https://qul.tarteel.ai/credits)) | Ask the publisher, or write the game's own word-by-word glosses and have a scholar review them |
| Quranic Arabic Corpus morphology | The licence page says GPL, but the FAQ says "You do not use the data for commercial purposes" ([QAC FAQ](https://corpus.quran.com/faq.jsp)) | Use only to check the game's own data |
| Recitation audio (EveryAyah, AlQuran.cloud) | "There is no explicit right granted"; copyright stays with the reciter ([Islamic Network](https://community.islamic.network/d/231-clarification-on-licensing-and-usage-rights-for-quran-recitation-api); [AlQuran.cloud](https://alquran.cloud/terms-and-conditions)) | **Do not ship.** Commission a qualified reciter under a written licence |

The resulting stack is Tanzil text, fonts obtained through Quran Foundation (or an open-licence Quran font, once its licence is checked), QuranEnc translations, and the game's own morphology and word-by-word layer built with MIT-licensed tools. Recitation comes from a commissioned reciter, recorded as isolated words for drills and as whole verses for listening. The QUL resource hub says commercial use is allowed "per resource" and leaves licence checks to each resource ([QUL FAQ](https://qul.tarteel.ai/faq)). It is a place to find resources, not a licence in itself. No sourced cost for commissioning a reciter was found.

The etiquette rules are as binding as the licences. Scholars agree that computer games are permissible in principle ([IslamQA 237205](https://islamqa.info/en/answers/237205)). Dar al-Ifta al-Misriyyah calls Quran ringtones disrespectful because cutting verses risks "severing their meanings" ([Dar al-Ifta](https://www.dar-alifta.org/en/fatwa/details/4514/using-the-quran-or-adhan-as-ringtones-for-mobile-phones)). Malaysia's Federal Territory Mufti allows such uses with proper manners, but rules that cutting a verse mid-way is impermissible and bans use in restrooms ([Mufti WP](https://muftiwp.gov.my/en/artikel/irsyad-fatwa/irsyad-fatwa-umum-cat/1901-the-ruling-of-the-usage-of-quran-recitation-and-adhan-as-ringtone-or-screen-saver)). One Hanafi view holds that the part of a screen showing verses should not be touched without wudu ([Darul Iftaa via islamqa.org](https://islamqa.org/hanafi/daruliftaa/8585/touching-an-iphone-or-pc-which-has-quran-stored-on-its-memory-without-wudu/)).

The game therefore keeps Quran content in calm "sanctuary" spaces. It never cuts a verse mid-way, never uses Quran audio as a sound effect or reward, keeps ads and purchase prompts off Quran and translation screens, and offers, but does not require, a wudu reminder. No fatwa addresses Quran text inside video games specifically; these rules are drawn by analogy.

### Tarteel-level speech checking is reachable; the iPhone is the unknown

> **Update, 15 Nov 2026 (separate speech check, full detail in "Arabic speech recognition options").** Speech checking is now split into two jobs:
> - **Job 1, picking the line (version 1):** working out which of the 2–4 expected lines the player said.
>   - **First choice:** Safari's recogniser plus in-browser Whisper. Their automatic "clean-up" actually helps here.
>   - **Free backup:** Whisper large-v3-turbo on a free Cloudflare Worker (about 214 minutes a day).
> - **Job 2, catching mistakes (after version 1):** a phoneme (sound-level) recogniser compared against the target line. This is the method from the Muslim-world IQRA 2026 challenge (QCRI, Taibah, HUMAIN), whose best system scored F1 0.72. Quran Muaalem covers recitation.
>
> Corrections to this section:
> - Tarteel's `whisper-base-ar-quran` is still Whisper, so it also corrects toward real words. It suits Job 1, not mistake-catching.
> - Safari's recogniser runs on Apple's servers, not on the phone.
> - Claude's dictation does not support Arabic.
> - ChatGPT's dictation model is not named publicly. OpenAI's developer model is now `gpt-transcribe` (about $0.27/hour), and the gpt-4o transcribe models shut down on 26 Feb 2027.
> - Wispr Flow's API is invite-only and returns only cleaned-up text, so it is out.

Tarteel's production system still checks recitation **word by word** only. Letters, short vowels and tajweed are "not yet supported" ([Tarteel blog](https://tarteel.ai/blog/introducing-mistake-detection/)). Even the market leader doesn't grade tajweed, so the game shouldn't promise it either. Tarteel's open Quran-tuned Whisper model (Apache-2.0, 5.75% word error rate on Quran recitation) remains the starting point ([Hugging Face](https://huggingface.co/tarteel-ai/whisper-base-ar-quran)).

The new option this time is **Jais-ASR** (MBZUAI/IFM, Apache-2.0). It beats Cohere's Arabic model on average error rate (**22.85% vs 25.87%**) and can output text *with vowel marks*. Comparing its vowelled output against the target text could give vowel-level hints. At 6 billion parameters and about 12 GB of graphics memory, it is a server or Mac-testing model, not a phone model ([Jais-ASR](https://huggingface.co/IFM/Jais-ASR)). Letter-level mispronunciation detection still tops out around **30% F1**, a combined accuracy score ([IqraEval](https://huggingface.co/IqraEval)). Pronunciation feedback should therefore always be a gentle hint, never a pass/fail grade.

Wave 1 called whisper-base "small enough to try in a browser". Wave 5 found that this is **unproven on iPhone**. No benchmark of Whisper running in iPhone Safari exists. The base model download is about 210 MB according to a low-quality secondary source, which also wrongly says Safari lacks WebGPU ([offlinetts.com](https://offlinetts.com/blog/browser-speech-recognition-whisper-comparison/); compare [Apple Safari 26 notes](https://developer.apple.com/documentation/safari-release-notes/safari-26-release-notes.md)). Microphone access (`getUserMedia`) has been supported on iOS since 13.0, and speech recognition and recording since 14.5 ([firt.dev](https://firt.dev/notes/pwa-ios/)). Whether Safari's built-in recogniser handles Arabic was not checked. Apple's newer on-device speech API launched without Arabic (Wave 1). Chrome's Web Speech API gained an on-device mode with roughly 60 MB language packs, but Arabic pack availability is unconfirmed ([blink-dev](https://groups.google.com/a/chromium.org/g/blink-dev/c/VNOok2dbmHM); [MDN](https://developer.mozilla.org/docs/Web/API/SpeechRecognition/processLocally)). The saving grace from Wave 1 still applies. The player usually says one of two to four expected lines, so recognition only has to *pick the closest match*, which is far easier than open transcription.

Voices and AI characters now have a clear $0 path, with licence traps marked:
- **Scripted dialogue:** pre-render it with Azure Neural voices (free tier 0.5 million characters a month) or Google Cloud TTS (1–4 million free characters a month) ([Azure pricing](https://azure.microsoft.com/en-ca/pricing/details/speech/?cdn=disable); [Google pricing](https://cloud.google.com/text-to-speech/pricing)). Each vendor's terms on storing generated audio inside a game still need checking.
- **Not for shipping:** ElevenLabs' free plan grants "No commercial license" ([ElevenLabs](https://elevenlabs.io/docs/help-center/legal/can-i-publish-the-content-i-generate-on-the-platform)). XTTS-v2 is under Coqui's restrictive model licence ([XTTS-v2](https://huggingface.co/coqui/XTTS-v2/raw/v2.0.0/README.md)). ArTST is non-commercial ([ArTST](https://huggingface.co/MBZUAI/artst_asr_v3)).
- **Vowel marking:** **Sadeed** (Misraj.ai, Saudi Arabia) adds vowel marks automatically and is strongest on Classical text. It was not tested on the Quran, and its licence is unstated ([arXiv 2504.21635](https://arxiv.org/html/2504.21635v1)).
- **Quran audio:** none of the verified voices claims Quranic or tajweed support. Quran audio must come from human reciters.
- **Edward's own cloned voice:** it suits a narrator or guide role, not modelling native pronunciation.
- **AI characters:** **Jais-3-0.9B** (Apache-2.0, 128K context) has an official card. It scores **91.1 on Arabic IFBench**, a test of following instructions, which matters for keeping characters at the learner's level. It ships in GGUF and MLX builds that run locally on an M1 Mac ([Jais-3-0.9B](https://huggingface.co/IFM/Jais-3-0.9B)). ALLaM-7B (SDAIA) and Fanar-2-27B (QCRI) are server alternatives, both Apache-2.0 ([ALLaM](https://huggingface.co/ALLaM-AI/ALLaM-7B-Instruct-preview); [Fanar](https://huggingface.co/QCRI/Fanar-2-27B-Instruct/blob/main/README.md)).
- **Gemini's free tier:** fine for drafting content, wrong for a live character backend. Its terms let Google use the inputs, require users to be 18 or older, and require paid tiers for apps serving EEA, Swiss or UK users ([Gemini terms](https://ai.google.dev/gemini-api/terms-archive/terms_10_17_25)).

### The niche is still open, but narrower, and the market rewards depth

The refined competitor verdict: no product combines an explorable world, Arabic as the core, and Quranic comprehension. The space around it is busier than Wave 1 knew.

| Product | What it is | Arabic? | Quran? | Speaking/AI | Traction found |
|---|---|---|---|---|---|
| LingoLooper | 3D world with 1,000+ AI characters, early access | Yes (40+ languages; Egyptian mentioned) | No | AI conversation | 4.8★ from 1.4K ratings ([App Store](https://apps.apple.com/app/id1670913076)) |
| Mondly VR (Pearson) | Scripted VR scenes | Yes (30 languages) | No | Pronunciation | 4.2★ from 2.7K ratings ([QuestStoreDB](https://queststoredb.com/app/mondly-learn-languages-in-vr-4214902388537196)) |
| Arabic Unlocked (Universal Tarbiyah) | Gamified Quranic vocabulary with streaks and leagues | Yes | Yes | None listed | 4.5★ from 120 ratings ([App Store](https://apps.apple.com/us/app/arabic-unlocked-learn-arabic/id1479273932)) |
| Bayyinah TV / Dream | Pre-recorded Quranic Arabic lectures | Quranic | Yes | No | Not found ([Kalimah Center, competitor view](https://kalimah-center.com/does-bayyinah-tv-teach-arabic/)) |
| Muslim 3D (Bigitec) | 3D virtual Makkah, $44.99 | No language teaching | Heritage | No | 20 Steam reviews; stalled in Early Access ([Steam](https://store.steampowered.com/app/1503250/Muslim%203D)) |
| Roblox Islamic maps | Social mosque and tadarus spaces | Recitation only | Recite | Voice chat | "Prayer Islam 2025" 4.1M+ visits ([Popmama](https://www.popmama.com/big-kid/10-12-years-old/map-roblox-untuk-ngaji-dan-tadarus-bareng-teman-saat-bulan-puasa-00-bbqjr-sjxvqj)) |
| Wagotabi | Single-language Japanese RPG, $9.99 | No | No | No | ~78k units, ~98% positive (estimate) ([steamdata.ai](https://steamdata.ai/game/2701720)) |

The table points to a clear model. The well-loved language games are **single-language, carefully made and cheap**, like Wagotabi. Generic multi-language worlds rate decently but stay shallow in each language. Gamification is not a differentiator: Arabic Unlocked already has streaks, XP and friend leagues. What nobody in the Quranic-Arabic space offers is spoken conversation, an explorable place and Quranic words met in context. Tarteel's users are already asking for "Arabic Foundations Learning" ([Tarteel feedback](https://feedback.tarteel.ai/feature-requests/p/arabic-foundations-learning)), so Tarteel looks more like a benchmark or partner than a rival.

Why others stalled is now clearer. *So to Speak*, a solo Japanese learning game, planned for two years and took **nearly six**. Testers hated delayed feedback on their guesses ([HitSave](https://hitsave.org/from-phd-to-pixel-art-the-six-year-journey-behind-so-to-speak/)). That partly overturns Wave 1's *Chants of Sennaar*-style "confirm later" journal: confirmation should come quickly. An older postmortem hit exactly Edward's target. HTML5 audio on iOS Safari used about **4× the file size in memory**, and files over 20 MB failed ([Pavel Piezo postmortem](https://www.gamedeveloper.com/programming/postmortem-quot-pavel-piezo-trip-to-the-kite-festival-quot-a-game-for-learning-languages)). That was in 2014, so it needs retesting, but it is a warning. VR is **shrinking**: Quest shipments fell **42.3%** in 2025 ([VR.org citing IDC](https://vr.org/articles/smart-glasses-outselling-vr-headsets-xr-market-2025-data)), and Meta's Q3 2026 Reality Labs revenue fell 6% as it slowed VR investment ([Road to VR](https://roadtovr.com/meta-declining-quest-sales-major-breakthroughs/)). VR stays a bonus port.

**Who is #1, #2 and #3.** These rankings rest on company disclosures, because store-ranking data was paywalled.
- **#1 Duolingo** is unchallenged. In Q3 2026 it had **64.9M daily users and 13.1M paying subscribers** ([Duolingo 8-K](https://www.sec.gov/Archives/edgar/data/0001562088/000162828026069474/q3fy26duolingo9-30x26share.htm)), up from 47.7M daily users in Q2 2025 ([Q2 FY25 letter](https://investors.duolingo.com/static-files/0b55110c-2eb9-466d-8549-5459e0851290)). It wins on a free tier, a daily-habit engine and constant experiments.
- **#2 Babbel** is the largest paid-first rival, at **€330M revenue in 2023**, the latest figure found. That number comes from a Wikipedia compilation of press reports ([Wikipedia](https://en.wikipedia.org/wiki/Babbel)). Babbel wins on seeming serious: a structured adult curriculum plus live classes.
- **#3 is a tie between two AI-era companies valued at $1B or more.** **Preply** sells human tutors with AI tools, at a $1.2B valuation in January 2026 ([Preply release](https://www.aap.com.au/aapreleases/cision20260121ae65576)). **Speak** sells AI speaking practice, with annual recurring revenue (ARR) said to be near $50M in December 2024 ([ARR Club](https://www.arr.club/speak/speak-arr-nearing-50m-growth-with-100-yoy)). Both answer the complaint that apps don't make you speak.

No 2025–26 figures were found for Busuu, Memrise, Rosetta Stone or Pimsleur.

**How the leaders hook users**, updated:
- Duolingo **replaced Hearts (punishing mistakes) with Energy**: every exercise costs one unit, and runs of correct answers refill it. Duolingo says the change raised daily users, time spent and paid conversion. It called it "a carrot, not a stick" but published no numbers ([Q2 FY25 letter](https://investors.duolingo.com/static-files/0b55110c-2eb9-466d-8549-5459e0851290)). For this game the lesson is that a wrong answer should cost nothing.
- Wave 1's sourced streak results still stand: the Streak Wager raised day-7 retention by 14% ([Duolingo blog](https://blog.duolingo.com/how-streaks-keep-duolingo-learners-committed-to-their-language-goals/)).
- Speaking to an AI is now expected as standard, across Duolingo Video Call, Babbel Speak, Speak and Praktika.

**Market size.** There were about **2.0 billion Muslims in 2020**, with only about **414 million in the Middle East and North Africa**. Pew is used here, labelled, because no Muslim source gave a count ([Pew 2025](https://www.pewresearch.org/short-reads/2025/06/10/islam-was-the-worlds-fastest-growing-religion-from-2010-to-2020/)). Indonesia, Pakistan, India and Bangladesh together hold about 830 million, which argues for a generous free tier and regional pricing. Islamic-economy media and recreation spending was **$276B in 2024** ([DinarStandard](https://www.dinarstandard.com/insights/state-of-the-global-islamic-economy-report-2025-26)). No figure exists for how many people actively want to learn Quranic Arabic.

### Story: a modern student's first year, with Ibn Battuta as legend

**Edward's direction (15 Nov 2026):** the game should feel like being a traveller enjoying a new country with new friends, possibly based on a true story, modified a bit. Waves 2–5 strengthen this concept. The adult evidence shows that warm, face-to-face characters on screen are enough; the player doesn't need live humans. A traveller is naturally a beginner, a friendship mood suits forgiving streaks, and the setting matches Edward's own four years of learning a language abroad.

The rights research changes which true story to use. The 14th-century Arabic text of Ibn Battuta's *Rihla* is public domain, and so is the 1853–58 Defrémery & Sanguinetti Arabic edition, which is digitised in a public-domain library collection ([Uni Halle MENAdoc](https://menadoc.bibliothek.uni-halle.de/publicdomain/content/structure/1341700?lang=de)). The modern English translations are another matter. Gibb's Hakluyt volumes and Mackintosh-Smith's abridgement (2002) are very likely still protected ([losthistory.net](https://losthistory.net/isidore/ibn-battuta/2.html)). *The Road to Mecca* is an actively published commercial edition ([Fons Vitae](https://fonsvitae.com/product/the-road-to-mecca/)). These copyright readings are the researcher's reasoning, not legal advice.

Ibn Battuta's journey is also long, medieval, political and solitary, which makes it hard to turn into a cozy modern game. The best fit is a **composite "inspired by true stories" frame**: a non-Arab Muslim student who moves to study Arabic in an Arabic-speaking city, drawn from published first-person accounts. These include Muslim Central's *Medina Stories* ([Muslim Central](https://muslimcentral.com/tom-facchine-medina-stories-23-life-as-a-student-at-the-islamic-university-of-medina)), Madinah College UK student blogs ([blog](https://madinahcollege.uk/blogs/my-journey-to-seeking-knowledge)), ALIM's Madinah reflections ([ALIM](https://www.alimprogram.org/blog/madinah-lessons-reflections-from-the-prophets-city.html)) and the Islamic University of Madinah's alumni interviews ([iu.edu.sa](https://www.iu.edu.sa/Interviews/with/alumni)), blended with Edward's own experience. No living person is named. Ibn Battuta becomes a legend layer, such as night-time stories from friends or a collectible "Rihla journal", adapted only from the public-domain Arabic. Ibn Jubayr's Hajj chapters could serve the same role in an endgame chapter.

Companion design research turns "new friends" into rules. Naughty Dog made players love Ellie in *The Last of Us* in specific ways ([Kill Screen](https://www.killscreen.com/how-ellies-pathfinding-made-you-love-her/)):
- She stayed close.
- She never gave away the player's position.
- She occasionally helped.
- Some of her lines fired only when the player was within a metre.

A designer's checklist adds being useful, never adding workload and never spending the player's resources ([Game Developer](https://gamedeveloper.com/design/a-good-companion---balancing-emotions-and-practicality-when-designing-companion-characters)). Both sources are labelled non-Muslim/general. Translated to this game, friends are language helpers who point, repeat and slow down. They comment on what the player is looking at. Friendship never decays, and a returning player gets a warm catch-up instead of a penalty.

*Assassin's Creed Mirage* shows both the reward and the risk in this setting. Arab players valued its full Arabic voice track and Islamic details. Early players also spotted in-game music playing over the azan, and Ubisoft had to promise a fix ([Axios](https://www.axios.com/2023/10/05/assassins-creed-mirage-arab-world)). The game should mute everything for the azan automatically.

GTA VI launches **19 November 2026**, four days after this report, on PS5 and Xbox. It is set in a Florida-like state with an in-game phone and satirical radio and podcasts ([eGamers.io](https://egamers.io/rockstar-drops-gta-vi-launch-trailer-as-november-19-release-nears/)). Rockstar's own site was blocked, so the details of its phone and social-media app are unconfirmed. The systems worth borrowing are friends texting in Arabic (reading practice), a social feed with short captions (graded reading), radio stations for spoken talk and Quran only, no music or nasheeds per the hard rules (listening input) and dense overheard chatter in one small neighbourhood. The crime and tone stay out.

Islamic content limits now have scholarly backing:
- **Music:** the majority view across the four schools forbids instruments except the frame drum (*duff*) and permits clean vocal singing ([SeekersGuidance](https://seekersguidance.org/uncategorized/is-listening-to-music-haram/)). **Superseded by the hard rules:** no music at all, including no nasheeds and no duff. Only Quran recitation and the adhan.
- **Characters:** Darul Ifta Birmingham permits 3D characters for Islamic educational games ([Darul Ifta Birmingham](https://daruliftabirmingham.co.uk/home/ruling-on-creating-3d-characters-for-islamic-educational-video-games)). IslamWeb permits animation for teaching ([IslamWeb](https://islamweb.net/en/printfatwa.php?id=351178)).
- **The resulting defaults (updated by the hard rules):** stylised soft-3D characters with **no eyes, nose or mouth**, and **no female characters**. Modest dress throughout, modelled on the Sheikh Zayed Grand Mosque dress code ([SZGMC](https://szgmc.gov.ae/en/worshippers/en-v-mosque-manners-details)). No depiction of prophets or Companions, an all-male cast.
- **Sign-off:** a scholar Edward trusts should review the final build.

### The web-first stack is a go, with three conditions

Wave 5 confirmed the Wave 1 stack. It is Three.js (or React Three Fiber) with the Spark renderer for Gaussian splats: photoreal 3D scenes captured from video of real places. It ships first as a Safari home-screen web app (a PWA), is wrapped with Capacitor for the App Store and Tauri for Windows, and adds WebXR for headsets. No current fact refutes this plan.

**Condition 1: scale back "VR/AR everywhere".** An Apple engineer stated in June 2026 that "The WebXR immersive-ar mode isn't currently supported in visionOS" ([Apple Developer Forums](https://developer.apple.com/forums/thread/826845)). iPhone Safari has **no WebXR at all** ([firt.dev](https://firt.dev/notes/pwa-ios/)). Quest Browser supports both VR and passthrough AR ([Abratabia](https://abratabia.com/webxr-games/webxr-device-support.php)). The iPhone build is a flat-screen 3D game, Vision Pro gets VR only, and any AR mode is Quest-only.

**Condition 2: prove Arabic speech recognition on a real iPhone first** (see the speech section).

**Condition 3: enforce budgets from day one.** Spark's rules of thumb are 1–3 million splats on iPhone and 1 million or fewer on Quest 3 ([Spark docs](https://sparkjs.dev/docs/performance/)). A measured report showed splats on an iPhone 15 Pro running at only **30–40 fps until antialiasing was switched off**, after which they held a stable 60 fps ([Babylon.js forum](https://forum.babylonjs.com/t/gaussian-splat-low-performance-on-ios-devices-vs-android/62455)). Large scenes should be streamed in levels of detail using the SOG format ([PlayCanvas](https://developer.playcanvas.com/user-manual/supersplat/streaming/)). No official iPhone memory limit exists.

Hosting and fees mostly stay at $0:
- **Cloudflare Pages:** free for the app code, with a **25 MiB per-file cap** ([Cloudflare](https://developers.cloudflare.com/pages/platform/limits)).
- **Cloudflare R2:** 10 GB of free storage with no download fees, per a secondary source ([eastondev](https://eastondev.com/blog/en/posts/dev/20260526-cloudflare-free-limits/)). This is the natural home for splats and audio.
- **Microsoft Store:** free for individual developers since September 2025 ([Windows Developer Blog](https://blogs.windows.com/windowsdeveloper/2025/09/10/free-developer-registration-for-individual-developers-on-microsoft-store/)).
- **Apple:** still charges $99 a year. This is known only from a headline ([Windows Central](https://www.windowscentral.com/microsoft/windows-11/microsoft-store-drops-fees-for-individual-developers-apple-still-charges-usd99-per-year)), and it is the one near-certain cost.

Tauri produces 5–15 MB installers against Electron's 120 MB or more ([Abratabia](https://abratabia.com/native-wrappers/tauri-games.php)). A three.js WebGPU game is already shipping on Steam through Electron, which makes Electron the proven fallback ([three.js forum](https://discourse.threejs.org/t/mycelium-incursion-an-arcade-shooter-inside-a-spinning-space-colony-three-js-webgpu-shipping-on-steam/96256)). To pass App Store review, the app must be more than "a repackaged website" ([MobiLoud summary of Guideline 4.2](https://www.mobiloud.com/blog/app-store-review-guidelines-webview-wrapper)). The Capacitor build should bundle the game's files and add native touches such as offline play.

Free assets need a licence ledger:
- **Megascans:** new ones are **paid since 2025**. Only assets claimed before the end of 2024 stay free to use in any engine ([Unreal forums FAQ](https://forums.unrealengine.com/t/quixel-to-fab-transition-faqs/2033839)).
- **Sketchfab:** the best Middle-Eastern scan found, the ICRC's Aleppo souk alley, is **non-commercial and no-derivatives** ([Sketchfab](https://sketchfab.com/3d-models/old-souk-aleppo-syria-0822-disused-alley-7dbd2e9f3b234ecba4f6a33b704bc754)).
- **Capturing real places:** the Sheikh Zayed Grand Mosque allows personal phone photos but requires a permit for commercial capture ([SZGMC](https://szgmc.gov.ae/en/worshippers/en-v-mosque-manners-details)). Drones in Saudi Arabia need registration and a licence ([Studio 52](https://studio52.tv/blog/saudi-arabias-drone-laws/)). Self-captured public streets and souqs are the low-risk route, with identifiable people blurred out.
- **Characters:** the best free pipeline is **MPFB2 in Blender**, whose core assets are CC0 (free to use without credit) ([MakeHuman licence](https://static.makehumancommunity.org/about/license.html)), with Mixamo's royalty-free animations ([Adobe FAQ thread](https://community.adobe.com/t5/mixamo-discussions/mixamo-faq-licensing-royalties-ownership-eula-and-tos/td-p/13234775)). Loose thobes also hide body deformation, which saves rigging work. Under the hard rules, heads are modelled with no eyes, nose or mouth.
- **AI 3D generation:** TRELLIS.2 on a Mac needs about **18 GB of RAM** ([lilting.ch](https://lilting.ch/en/articles/trellis2-m1-max-hands-on)), so AI 3D generation suits props only, via free cloud credits.

> **Superseded by the hard rules (no mouths):** lip-sync is not needed. The notes below are kept for the record only.

Lip-sync, which Wave 1 never researched, works on an M1 without NVIDIA hardware. The pipeline for scripted lines:
1. Force-align recorded Arabic to its known text.
2. Map the sounds to the standard 15 mouth shapes.
3. Play them through the MIT-licensed TalkingHead library ([TalkingHead](https://gitee.com/bwcode/TalkingHead)).

Dynamic audio can use wawa-lipsync ([README](https://cdn.jsdelivr.net/npm/wawa-lipsync@0.0.2/README.md)). Hero scenes can capture Edward's own face with MediaPipe's 52 blendshapes ([Google](https://developers.google.com/edge/mediapipe/solutions/vision/face_landmarker/web_js)). Arabic throat and emphatic sounds barely show on the lips, so realism comes from accurate timing and jaw movement, not extra mouth shapes. The draft mapping of Arabic sounds to mouth shapes still needs checking against the Arabic visual-speech papers.

## What changed since Wave 1

1. **Adults may not need live people.** For adults, a face on screen with eye contact matched or beat a live teacher. AI partners lower anxiety (d = 0.39) but did not raise scores. Kuhl's live-tutor effect is an infant finding.
2. **"Explicit beats implicit" softened.** The biggest meta-analysis gives focus on form a large effect (g = 1.06) and finds only a minor explicit/implicit gap. Wave 1's recalled Norris & Ortega numbers are dropped as unverified.
3. **Arabic coverage figures now exist.** Masrai & Milton: about 9,000 lemmas give 95% and 14,000 give 98%, and educated natives know about 25,000 words. Wave 1 had no Arabic figure.
4. **Quran coverage was recomputed** from the Corpus lists: ~70–80 lemmas give 50%, ~300 give 70%, ~1,300–1,900 give 90%. Recounting the full text is still pending.
5. **Fekry's "85%" was checked.** It comes from about 283 listed words plus verb patterns. It is a token estimate, not a lemma count, and the raw-lemma equivalent is about 840–1,110. Wave 1's "about 500 words" guess is corrected.
6. **The spoken register is now defined.** It is a game-defined "educated white Arabic" built on a Fusha core, with listening-only exposure to dialect. Saudi institutes teach Fusha only.
7. **Licensing was resolved in outline.** Tanzil text can be bundled (CC BY 3.0, second-hand). Fonts can be bundled via Quran Foundation. The Corpus FAQ explicitly bans commercial use. No recitation audio carries a commercial licence.
8. **Vision Pro has no WebXR AR, and iPhone has no WebXR at all.** Wave 1 had assumed WebXR for Vision Pro generally.
9. **Whisper on iPhone is unproven.** It is no longer "small enough to try" by default; it is the first test.
10. **The VR market is shrinking.** Quest shipments fell 42.3% in 2025, and Meta is slowing VR investment.
11. **LingoLooper and Mondly VR do include Arabic.** "Nobody has built this" becomes "nobody has built an Arabic-for-Quran world game".
12. **#2 and #3 now have figures.** Babbel is #2 (€330M, 2023). Preply and Speak tie for #3.
13. **Duolingo dropped Hearts for Energy** and reports better engagement. "Never punish mistakes" is now Duolingo's own lesson.
14. **Delayed confirmation frustrates players** (*So to Speak*). Guesses should be confirmed quickly, not only at the end of the day.
15. **Better Arabic speech model:** Jais-ASR (22.85% error, outputs vowel marks) beats Cohere's model. Jais-3-0.9B now has an official card.
16. **Story pick changed.** A modern student composite is the backbone, with Ibn Battuta as a legend layer adapted from the public-domain Arabic only.
17. **Megascans are no longer free** (except assets claimed in 2024). The Microsoft Store is now free for individuals.
18. **Islamic content rules have sources:** music, 3D characters, Quran etiquette, and muting for the azan.

## Draft design brief (Wave 6)

*Status: DRAFT. These are the final provisional decisions from desk research. Each will be confirmed or changed by the prototype tests below.*

**Promise.** "Understand the words of the Quran, one friendly day at a time." Progress is shown honestly: hours of Arabic heard, roots known, and a **Quran meter** showing the share of the Quran's running words the player now recognises, computed from the game's own data.

**Variety.**
- **Core:** Fusha (Quranic/Classical and MSA) for all reading, narration and formal speech, with full vowel marks.
- **Spoken layer:** a game-defined "educated white Arabic". This is Fusha vocabulary and grammar with casual endings dropped in conversation, plus a small, tagged set of pan-Arab spoken items: the Islamic formulas, yalla, and common spoken question and negation words.
- **Listening only:** characters from different regions reply in light Egyptian or Levantine colouring.
- **Later:** an optional deep-dialect module.

**Curriculum.**
- **Tier 0 (≈40 items):** pronouns, attached particles, demonstratives.
- **Tier 1 (≈100 lemmas, ~55%):** top particles, nouns and verbs.
- **Tier 2 (≈300 lemmas, ~70%):** themed sets delivered through prophet-story quests in original text modelled on *Qasas an-Nabiyyin*.
- **Tier 3 (≈900–1,000 lemmas, ~85%):** verb measures II–X as a system that unlocks root families, prioritising words frequent in both the Quran and MSA.
- **Running alongside:** about 300 everyday MSA words for life in the world.
- **Order:** gated by the Muslim-educator grammar sequence.
- **Tracking:** pronunciation follows makhārij-grouped lessons and minimal pairs, with a Noorani-Qaida-style tajweed path.

**Story.** "Inspired by true stories": a non-Arab Muslim student arrives in an Arabic-speaking city to study Arabic. They stay with a host household of men (a father figure and his sons) and make three or four male friends from different countries. Names and events are composites, with an end card saying so. Ibn Battuta legends are told at night. A Madinah or Hajj chapter is the long-term endgame.

**Core loop (10–20 minutes, one in-game day).**
1. Wake, and friends text in Arabic.
2. Errands in the neighbourhood turn into short conversations, with physical "take the…/go to the…" commands acted out.
3. A Quran station, a spoken talk station, signs and overheard chatter supply listening input (no music).
4. Each guess is confirmed quickly.
5. An evening journal and story close the day.
6. New words are re-tested the next day, after sleep.

The teaching rules:
- **Known-words rule:** each scene keeps dialogue at about 95–98% known words, with one or two new words carried by what's on screen.
- **Spacing:** about 10 spaced encounters per word, scheduled with FSRS.
- **Corrections:** friends use prompts first, then model the correct form.
- **No penalties:** a wrong answer never costs anything.
- **Captions:** Arabic-on-Arabic by default, with English on tap.
- **Root unlocks:** a root family unlocks once two or three of its members are known.

**Friends and return.** Friends stay close, point and react to the player's gaze, and never need rescuing. Friendship never decays. There is a new small story each day, and returning players get a "we missed you" welcome. The streak is forgiving, with free freezes. Friend quests replace leagues. Loot boxes, paid streak repair and guilt notifications are left out.

**Speech and voices.**
- **Speaking:** the player chooses one of two to four expected lines, and recognition matches it to the closest one. Hints are given, never grades.
- **Scripted voices:** pre-rendered Azure or Google voices for MSA lines, checked by a native speaker.
- **Quran audio:** a commissioned reciter only.
- **Narrator:** Edward's cloned voice as narrator or guide only.
- **Free-talk AI characters (Jais 3)** come after version 1.

**Islamic defaults.** Quran content appears only in sanctuary spaces, never cut mid-verse. **No music** (hard rule): only voices, ambient sound, the adhan and Quran recitation. Everything else mutes automatically for the adhan. Characters are stylised and modestly dressed, with **no eyes, nose or mouth** (hard rule). There are **no female characters** (hard rule). Prophets and Companions are never depicted. No ads appear near Quran or translation screens. A scholar reviews the build.

**Stack.** React Three Fiber / Three.js with Spark, using WebGPU with a WebGL2 fallback. Self-captured splat environments are streamed as SOG from R2. MPFB2 characters with Mixamo animation export as GLB, with faceless heads; no lip-sync is needed, and a speaking cue (head bob or speech bubble) marks who is talking. Text comes from Tanzil, fonts via Quran Foundation, translations from QuranEnc, and morphology from the game's own layer. Release order: Safari home-screen app, then Windows (Tauri, with Electron as fallback; itch.io and the Microsoft Store), then the App Store (Capacitor, once the $99 is justified), then Quest WebXR. Vision Pro gets VR only; iPhone gets no AR.

**Version-1 scope.**
- **In scope:**
  - One small, dense neighbourhood: the host family's home, one souq street, a café and a masjid courtyard as the sanctuary space.
  - Three or four friends and about 10 in-game days.
  - Tier 0 and the first part of Tier 1 (about 150 items).
  - One radio station, phone texting, the Quran meter and two Rihla legends.
- **Out of scope:** an open world, VR, AI free talk, the dialect module, multiplayer and payments.

### Prototype tests still to run

| Test | Pass signal | Why |
|---|---|---|
| One-room splat slice as a Safari home-screen app on Edward's iPhone (≈1M splats, antialiasing off, capped resolution) | Smooth play without crashes over a 20-minute session | Validates the whole stack cheaply |
| Arabic speech on iPhone (test page v2 built 15 Nov), in order: Safari's built-in recogniser (ar-SA), whisper-tiny/base in the browser, cloud Whisper large-v3-turbo via a free Cloudflare Worker, a native plugin via Capacitor; plus a planted-mistake round to confirm these engines hide mistakes | Correct pick among 2–4 expected lines, fast enough to feel conversational | The least-proven piece of the stack |
| Microphone and audio inside the installed home-screen app (permission prompts, the first-tap rule, memory use of audio files) | Mic works after reinstall and relaunch; no audio-memory crashes | Wave 1 and Pavel Piezo risks |
| Known-words rule with five playtesters | Dialogue feels natural, and players infer new words from context | The core teaching mechanic |
| Before-and-after vocabulary test with the same players, plus next-day recall | Measurable gain retained after sleep | The game starts producing its own evidence |
| Quick versus end-of-day confirmation of guesses | Players prefer one, and recall is equal or better | So to Speak lesson |
| Root-family unlock against isolated words (A/B) | Faster recognition of new family members | No adult trial exists |
| TTS voice quality (Azure vs Google vs Piper) rated by native speakers | At least one voice judged natural for Fusha | Decides the voice pipeline |
| Faceless body language: pointing, nodding, gestures and speech cues on an MPFB character (replaces the lip-sync test) | Playtesters can tell who is speaking and what is meant without faces | Required by the hard rules |
| Jais-3-0.9B on the M1 (MLX) and in the browser (wllama), with a vocabulary post-check | Replies stay on-level; speed acceptable | Gate for post-v1 free talk |
| Tauri on Windows (WebGPU in WebView2) and Quest Browser at ≈1M splats | Stable frame rate; otherwise switch to Electron | Platform fallbacks |
| Edward's M1 RAM, and the Chrome on-device ar-SA speech pack check | Known limits | Rules tools in or out |

## Phases: status

| Phase | Content | Status |
|---|---|---|
| Wave 1 | Breadth pass across all topics; research map | **Done** (15 Nov 2026) |
| Wave 2 | Verify learning science: instruction effects, encounters, spacing, sleep, adults and screens, AI partners, feedback, captions, script, polyglots, hours | **Done.** Remaining: Norris & Ortega and Spada & Tomita numbers, fossilisation studies, primary FSI page, Dreaming's hour table, Kaufmann/Argüelles/Refold primary pages, AI-chatbot meta-analysis effect sizes |
| Wave 3 | Quran coverage curve, Fekry check, Quran–MSA overlap, which Arabic, pronunciation/tajweed/iʿrāb teaching, licensing and etiquette, replacements under the sourcing rule | **Done.** Remaining: exact recount from the full Tanzil/Corpus file, Tanzil's primary licence page, Quran–MSA overlap measurement, a Muslim-world cross-dialect study |
| Wave 4 | Competitors, market #1–#3, Muslim market size, story and rights, companion design, GTA VI preview, Islamic content limits | **Done.** Remaining: ~~GTA VI teardown~~ replaced on 15 Nov by a study of other world-renowned games (see "Renowned games design lessons"), done; numbers for Busuu, Memrise, Rosetta Stone, Pimsleur, ImmerseMe, Lingotopia and Talkpal; Tarteel's current users; LingoLooper's Arabic depth |
| Wave 5 | WebXR, iPhone limits, mic, hosting, fees, wrappers, assets, characters, lip-sync, AI 3D, TTS, LLMs, pronunciation, browser speech | **Done (desk research).** Device measurements moved to Wave 6 |
| Wave 6 | Prototype and playtests; final design brief | **Started.** Draft brief written above. A separate speech-recognition check is done (15 Nov), and the speech test page (v2) and free Cloudflare backup are built and waiting for Edward's iPhone run. All other prototype tests remain |

## Still open

- **Unverified learning-science numbers:** the effect sizes from Norris & Ortega 2000, Spada & Tomita 2010 and Goo 2015; the Swain and Schmidt fossilisation studies; Saffran's figures; Montero Perez 2013; Mackey & Goo 2007; Thomson & Derwing 2015; the AI-chatbot meta-analysis effect sizes; any study on a maximum useful number of daily hours; any study of vowel marks or script timing for *adult learners* of Arabic.
- **Quran data:** an exact coverage recount from the full Corpus or Tanzil file; a measured Quran–MSA overlap; the Bayyinah Dream syllabus order; Understand Quran's own "85% words" list.
- **Register:** no measurement of adult comprehension of spoken Fusha; no Muslim-world cross-dialect study; no source on whether beginners should speak with full case endings; no survey of how Arabs perceive foreigners speaking Fusha.
- **Licensing (not legal advice):** Tanzil's primary licence wording and whether word-splitting counts as "verbatim"; KFGQPC's terms for its digital Mushaf text and for embedding fonts; written clarification of the Corpus licence conflict; Saheeh International and word-by-word gloss licences; the cost of commissioning a reciter; per-vendor terms for storing TTS audio in a game; licences for Sadeed, IqraEval, Piper's Arabic voice, CAMeL Tools and the open Quran fonts.
- **Speech and AI:** Whisper performance in iPhone Safari; whether Safari's built-in recogniser and Chrome's on-device packs support Arabic; whether Azure's Arabic pronunciation assessment exists; Jais-ASR's accuracy on the Quran; phone speed of Jais-3-0.9B; any scholarly ruling on AI-generated Quran recitation (none found, so none is planned).
- **Market:** 2025–26 store rankings; revenue for the second-tier apps; current user numbers for Tarteel and Muslim Pro; the number of people actively seeking Quranic comprehension; a review of the existing apps by an independent Muslim teacher.
- **Story and design:** (the GTA VI teardown was dropped in favour of the renowned-games study, done 15 Nov); still unread: Persona 5, Disco Elysium, Baldur's Gate 3, *A Short Hike*; Muslim gamers' discussion of *Mirage*; how "inspired by a true story" games handle disclaimers; the copyright status of Wright's 1852 Arabic edition of Ibn Jubayr.
- **Tech:** the official iPhone memory ceiling; file-size ratios for splat formats; WebGPU inside Tauri's WebView2; Apple, Steam and Meta fees confirmed on primary pages; Poly Haven and ambientCG licence pages; validation of the mapping from Arabic sounds to mouth shapes; a free, commercially licensed thobe, abaya or hijab asset.

## Conclusion

Waves 2–5 moved the main risk. Wave 1 worried about whether the science, the Arabic or the licences would block the game. Mostly they don't. Adults can learn from on-screen characters, the Quran's vocabulary falls into clear tiers, a defensible spoken register exists, and the core Quran text can ship legally. The risk is now concentrated in two practical questions only a prototype can answer. Can an iPhone in Safari recognise a learner's Arabic reliably? Can one small scanned neighbourhood run smoothly while a player talks to friends inside it? If both answers are yes, the rest is craft, which is Edward's strength.

A second shift is strategic. The market evidence argues *against* scale and *for* depth. One language, one neighbourhood, one honest Quran meter is more likely to succeed than a sprawling open world, because Wagotabi's careful single-language approach is what players reward. The project's sharpest edge is not 3D realism, which Edward's splat captures make cheap. It is trust: Muslim-sourced content, respectful handling of the Quran, and progress measured against a text whose every word is known in advance. No generic language world can offer that, and no Quranic-Arabic app yet puts it inside a place you can walk around.
