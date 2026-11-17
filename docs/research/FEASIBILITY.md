# Is Arabic World possible? Evidence and honest limits (17 Nov 2026)

## 1. Our own measured numbers (lab cycle 6)
These come from 100 automated play-throughs: 20 scenes on 5 emulated devices. The renderer was the Mac's Apple GPU, not real phones.

| Measure | Result |
|---|---|
| Play-throughs passed | 100 / 100 |
| Frame rate | 59–60 fps |
| Slowest frames (p95) | ≤ 19 ms |
| Frame rate with the CPU slowed 4× | 60 fps (p95 18 ms) |
| Draw calls | max 72 (budget 150) |
| Triangles per scene | ~38k |
| Load time | ≤ 1.3 s |
| Hard-rule suite (R) | 100% |
| Checker accuracy | 100% on its test set |
| Synthetic learners | median 64 words retained after 10 days |
| Lab cases per cycle | 5,711 (2 failing) |

## 2. Outside evidence

### Games teach, modestly
Wouters et al. 2013 is a meta-analysis of 77 effect sizes and 5,547 people. Against conventional teaching, games scored:

| Outcome | Effect |
|---|---|
| Learning | d = 0.29 |
| Retention | d = 0.36 |
| Motivation | d = 0.26 (not significant) |

Effects were larger with several sessions and with other teaching alongside. ([J. Educ. Psych. 105(2)](https://research-portal.uu.nl/en/publications/a-meta-analysis-of-the-cognitive-and-motivational-effects-of-seri/))

### Apps can reach university levels
Jiang et al. 2021 studied learners who used only Duolingo, for Spanish and French. They reached reading and listening levels like university students at the end of the 4th semester. Note that the authors mostly work at Duolingo, and speaking and writing were not tested. ([Foreign Language Annals 54(4)](https://experts.nau.edu/en/publications/evaluating-the-reading-and-listening-outcomes-of-beginning-level-/))

### Spaced review works
Cepeda et al. 2006 reviewed 839 assessments in 317 experiments. Spaced study beats cramming. Our ladder, the FSRS-lite review and the morning re-test are built on this. ([Psychol. Bull. 132(3)](https://pubmed.ncbi.nlm.nih.gov/16719566/))

### Text must be mostly known words
Hu & Nation set the targets at 95% known words (minimum) and 98% (comfortable). In English, about 3,000 word families cover 95% of speech and 6–7k cover 98% ([Nation 2006](https://openaccess.wgtn.ac.nz/articles/journal_contribution/How_large_a_vocabulary_is_needed_for_reading_and_listening_/12552221/1)). There is no Arabic-specific threshold study. The Buckwalter–Parkinson frequency dictionary gives the 5,000 most common MSA words ([Routledge](https://www.routledge.com/9780415444347)).

### Phones can run this
Merging meshes moved an iPhone 6s Plus from 30 to 60 fps in one Babylon.js report ([html5gamedevs](https://www.html5gamedevs.com/topic/27656-solved-bjs-mobile-web-browser-performance/)). We already merge geometry per material. No rigorous published three.js iPhone benchmark was found.

### Correct generated Arabic without an AI grader
CAMeL Tools has a generator that returns fully vowelled forms. Correctness can be proved per template and per feature combination, as the deep research report found.

## 3. Honest limits
- **Fluency.** The US Foreign Service Institute rates Arabic among the hardest languages for English speakers: about 88 weeks, roughly 2,200 class hours, to professional level. Secondary sources; official table not re-checked. No game alone delivers that. A realistic promise is a strong everyday base: greetings, shopping, directions and daily life, with 1–3k words over months.
- **Real phones.** All timings are emulated on a Mac GPU. Real iPhone and Android numbers are still unmeasured.
- **"Looks like footage".** A free web game on a phone will not match film or AAA consoles. The realistic target is calm and believable, in the style of a good indie game. The ranked techniques in the deep research report close much of the gap at almost no cost to the phone.
- **Content size.** We have 80 lemmas. The target is 150 soon and 1–3k eventually. The generator design gives about 69M scenario combinations. Each new template still needs an Arabic speaker to check about 20 samples.
- **Voices.** No recorded Arabic speech yet. This needs volunteer speakers or a paid render (Edward's decision).
- **Licences.** The licence of the Camel Morph data is unconfirmed, and the scholar review gate is still open.
