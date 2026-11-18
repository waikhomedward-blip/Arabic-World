# Review-free Arabic learning content at scale: classification and safe-topic design

Research note: web search was rate-limited and several pages (PyPI, AMiner, ACTFL PDF, Tanzil licence) returned no readable content. Every claim below is either cited from a search or fetch result I actually saw, or is placed under Inferences/Gaps. Unverified numbers are marked [unverified].

## 1. Automatic classification: universal / cultural / sacred

### Takeaway
Off-the-shelf tools exist for detecting Quran quotations (verbatim and fuzzy matching against a verse database), but nothing published classifies text as "universal / cultural / sacred". Published Arabic religion-related classifiers cover hate speech, with precision and recall of roughly 0.76 to 0.92, which is too low to be a sole gate. A deterministic lexicon plus Quran/hadith matching, with generation restricted to whitelisted templates, is the realistic design.

### Cited Findings
- `quran-validator` (PHP) flags untagged Arabic that may be a Quran verse, with exact, normalised and fuzzy matching, Arabic normalisation (diacritics, alef variants) and "fabrication detection" of words not in the Quran. Code is MIT; the Quran dataset (from Tarteel's QUL: Uthmani, Imlaei Simple, 6,236 verses) has separate terms in DATASET-LICENSE.md. — [Packagist](https://packagist.org/packages/watheqalshowaiter/quran-validator)
- `arabic-text-quote` (PyPI, v0.0.2) is described as detecting passages copied from the Quran or hadith books, and poetry. Documentation is thin; I could not read the page myself, only a search summary. Licence and accuracy not found. — [PyPI](https://pypi.org/project/arabic-text-quote)
- Qdetect (2021) is an academic tool for detecting Quranic verses in any text, said to be open source; Quran only, no hadith. Accuracy figures not retrieved. — [AMiner listing](https://www.aminer.cn/pub/619ba9871c45e57ce9c06680/qdetect-an-intelligent-tool-for-detecting-quranic-verses-in-any-text)
- `quranic-nlp` can look up verses from free Arabic text but needs internet; hadith lookup is per verse and off by default. Not suitable for offline bulk scanning. — [PyPI](https://pypi.org/project/quranic-nlp/1.3.8/)
- `quran-verse-detection` (fawazahmed0) works on English translations only (TensorFlow.js, Universal Sentence Encoder), Unlicense, no accuracy figure. Not useful for Arabic. — [GitHub](https://github.com/fawazahmed0/quran-verse-detection)
- Albadi et al. 2018 released the first public Arabic religious hate-speech dataset (reported as 6,136 tweets across six religious groups; a later paper cites a 9,316-tweet corpus) and the first Arabic lexicon of terms common in religious discussion, with polarity and strength scores. Best GRU precision 0.76, F1 0.77; best recall 0.84 (one version reports this as AUROC, so check). Dataset/lexicon licence not found. — [Albadi/ASONAM entry](https://doi.ieeecomputersociety.org/10.1109/AICCSA.2005.1387088); [WANLP 2020](https://preview.aclanthology.org/fix_video/2020.wanlp-1.2.pdf)
- A Qassim University framework on 7,923 Arabic tweets reports CNN precision 92.59%, recall 93.36%, F1 92.96%, and religious hate at precision 91%, recall 89%. This is a press summary; verify in the original paper. — [Devdiscourse summary](https://www.devdiscourse.com/article/technology/3317311-ai-system-achieves-93-accuracy-in-detecting-hate-speech-on-social-media)
- On SemEval-2020 Arabic offensive tweets (10,000), the best model (QARiB + AraBERT preprocessing) had macro-F1 92%, accuracy 95%; zero-shot XLM-R-XNLI only 68% macro-F1. Shows zero-shot classification is weak for Arabic. — [arXiv 2507.23661](https://arxiv.org/html/2507.23661v1)
- A YouTube study of religiously intolerant Arabic videos argues recall should weigh more than precision when the goal is to flag everything for human review. — [arXiv 2207.00111](https://arxiv.org/pdf/2207.00111)
- Tanzil's licence page was a placeholder when fetched (could not confirm terms); the project's own rule (Tanzil verbatim, credited) is therefore unverified here. — [Tanzil](https://tanzil.net/docs/Quran_Text_License)

### Inferences
- No published tool labels "universal/cultural/sacred". Published classifiers are for hate speech on tweets, a different task and domain from controlled game sentences, so their precision and recall do not transfer.
- Review-free at scale works best by construction, not by detection. Generate only from whitelisted lemma banks and templates where each lemma carries a label, so the label of a sentence is the maximum label of its parts (sacred > cultural > universal). Classifiers then act as a second safety net, not the primary control.
- Use recall-oriented gating. Anything matching the sacred lexicon, a Quran/hadith fuzzy match, or an unknown out-of-lexicon word goes to a review queue; false positives are cheap, false negatives are not.
- Quran fuzzy matching against Tanzil text (already in the project) can be run on all generated Arabic output as a hard check: any 4+ consecutive-word match to a verse outside `sanctuary` scenes fails the build. The 4-word threshold is my suggestion, not from a source.
- Sampling audit: review a random sample per batch of generated lines (for example 400 per 100,000 to bound a defect rate; the sample size is a statistical suggestion, not from a source).

### Gaps
- No precision/recall figures for Qdetect, arabic-text-quote or quran-validator found.
- Licences of the Albadi lexicon and dataset, `arabic-text-quote` and Tanzil not confirmed.
- No published Arabic "religious vs secular text" topic classifier found.

## 2. How faith-sensitive edtech handles review

### Takeaway
Islamic children's apps commonly claim scholar review, but in what I found these are marketing claims; I found no standard, certification scheme or independent audit. UNESCO/ICESCO guidance retrieved was general, not a content-classification method.

### Cited Findings
- My Ilm says its content is guided by scholars and the Islamic Shariah Council of Europe (only listing naming a body). Miraj says stories are "approved by scholars and educators" (no names). Deenee says content is based on trusted books and "validated with Muslim scholars". Rawa says all content is reviewed by Islamic scholars (no names). Rawaa Tales says stories are written by students of Islamic knowledge. — [MySalahMat on My Ilm](https://mysalahmat.com/blogs/muslim-businesses/myilm-an-international-islamic-app); [Miraj](https://apps.apple.com/US/app/id1222528421); [Deenee](https://apps.apple.com/us/app/id1550786854); [Rawa](https://play.google.com/store/apps/details?id=net.rawaapp); [Rawaa Tales](https://apps.apple.com/mx/app/rawaa-tales/id6745838844)
- A survey chapter on Islamic mobile apps for children exists (IRMA); a 2024 paper by Moundy et al. recommends design requirements. Full text not retrieved. — [IRMA](https://irma-international.org/chapter/a-survey-on-islamic-mobile-applications-for-children/242634/)
- ICESCO (formerly ISESCO) in Oct 2025 called for policies protecting children from digital addiction and online violence, proposing a convention with "ethical digital sovereignty aligned with spiritual values". — [ICESCO](https://icesco.org/en/2025/10/17/icesco-calls-for-adoption-of-policies-to-protect-children-from-digital-addiction-and-online-violence/)
- A UNESCO / King Abdullah bin Abdulaziz International Programme publication, "Guidelines for Developers and Users: Textbooks and Learning Resources", lists ISESCO as a partner; contents not read. — [UNESCO web archive](https://webarchive.unesco.org/web/20170509214808/http://unesdoc.unesco.org/images/0022/002261/226135e.pdf)
- Madinah Arabic Reader reviewers note that it incorporates Islamic values and culture into lessons, i.e. the dominant Muslim-learner textbook does not aim to be religion-neutral. — [Madinah Book 1 listing](https://studentsguild.alkauthar.org/portal/?p=6746) (search summary)

### Inferences
- Because there is no standard, the game's own published rule set (hard rules, label taxonomy, `SCHOLAR_REVIEW.md` list) is itself the differentiator; Edward's approach of "reviewing a short complete list, not every line" is stronger than what most apps document.
- Honest wording for players: "built on a published rule set; the sacred parts are listed for scholar review", not "scholar approved", until a named scholar signs off.

### Gaps
- No Noor Kids, Zaky or Mini Muslims review-process documentation found.
- No Saudi or UAE curriculum standards for everyday-life Arabic retrieved.
- UNESCO/ISESCO guideline text not read; no halal-certification-style review panel model found.

## 3. Safest universal topic families for A1-A2 Arabic

### Takeaway
Standards and textbooks agree that beginner topics are personal identification, family, home, food, shopping, local area, work and daily routine. These are inherently universal and combinatorial, so they scale. The detailed chapter lists for Al-Kitaab and Madinah Reader could not be retrieved.

### Cited Findings
- The CEFR (2001) A2 descriptor covers highest-frequency vocabulary for "areas of most immediate personal relevance", such as basic personal and family information, shopping, local area and employment. — [CEFR self-assessment grid (Sorbonne copy)](https://lettres.sorbonne-universite.fr/sites/default/files/media/2024-09/CEFRL%20-%20Self-assessment%20grid.pdf) (summarised by search)
- The CEFR Companion Volume (2020) adds a Pre-A1 level; descriptors are available as a filterable spreadsheet from the Council of Europe. — [Goethe-Institut](https://www.goethe.de/en/m/spr/kur/stu.html) (summarised by search)
- ACTFL World-Readiness Standards use five Cs (Communication, Cultures, Connections, Comparisons, Communities); an Arabic-specific document exists. The Novice Can-Do document was not readable. An Arabic Level 1 map adapted from ACTFL Novice starts with alphabet, accents and numbers (teacher document). — [ACTFL Can-Do Novice](https://www.actfl.org/uploads/files/general/Resources-Publications/Can-Do-Novice.pdf); [GWU unit plan](https://imes.elliott.gwu.edu/app/uploads/2025/07/A-Museum-Field-Trip-for-Arabic-Students-Unit-Plan.pdf)
- Al-Kitaab Part One (3rd edition) has 13 chapters around a storyline of two characters, with vocabulary in Formal, Egyptian and Levantine varieties. Chapter titles not retrieved. — [Georgetown University Press](https://press.georgetown.edu/Book/Al-Kitaab-fii-Tacallum-al-cArabiyya-with-Multimedia-Part-One-Second-Edition)
- Madinah Arabic Reader Book 1: about 23 lessons starting with the alphabet, then nouns, adjectives, prepositions, up to imperative, passive and conditional; vocabulary is taught in contextual phrases. — [Al-Dirassa](https://www.al-dirassa.com/en/methode-medine-livre-1)

### Inferences (ranked topic families; ranking is my judgement from CEFR/ACTFL themes plus the hard rules, not a published ranking)
1. Numbers, quantities, prices (note riba/music-free: use plain trade, no lending or interest).
2. Water, weather, sun, sky (morning-only fits naturally).
3. Food and drink: bread, dates, olives, tea, water, milk, fruit and vegetables, with a halal-safe whitelist (see section 4).
4. Home and rooms, objects, colours, shapes.
5. Time of day within 08:00 to 11:00 (clock reading, "morning", "now", "soon").
6. Directions and places in a quarter (market, street, harbour, baker, workshop).
7. Shopping and market bargaining (cash, fair price, no interest).
8. Work and crafts (baker, carpenter, fisherman, porter, teacher: all male).
9. Greetings and hospitality (host offers tea and bread; neighbour helps).
10. Travel and transport (port, boat, donkey cart, walking).
11. Health (basic: tired, thirsty, hungry, hurt hand), with no medical advice.
12. Family: restrict to male kin (father, brother, son, uncle, grandfather, friend); the all-male rule excludes mother, sister, wife, etc.
Scaling: each family is a slot grid (actor x object x place x quantity x time x adjective) giving millions of combinations from a few hundred whitelisted lemmas.

### Gaps
- Al-Kitaab chapter titles, ACTFL Arabic theme list and Saudi/UAE curriculum lists were not retrieved.
- The standard "family" theme in textbooks is not usable under the project's strict male-only wording rule; this deviation from textbook lists should be noted.

## 4. Risks inside "neutral" topics and simple rules

### Takeaway
I found no source on these in this session; the rules below are design inferences from the project's hard rules and general Muslim norms, to be confirmed by the scholar reviewer.

### Cited Findings
- None retrieved for this section (searches were rate-limited). The project CLAUDE.md hard rules (no music, no female persons, no faces, morning only, modest dress) are the governing source.

### Inferences (proposed rules; confirm with scholar)
- Food: whitelist ingredients; ban pork, lard, alcohol, wine, beer, gelatin-type words, and non-halal-meat references; no cooking with those terms even as "do not eat". Unknown food noun = review queue.
- Money: allow price, pay, change, bargain; ban loan, interest, credit, bank-rate, lottery, bet, insurance and gambling terms. Prices are cash and immediate.
- Music: ban music, song, sing, instrument, drum, oud, flute, dance, rhythm, even in vocab lists; ban musical Arabic poetry recitation; "ambient and clicks only".
- Gender: all-male cast; forbid female pronouns, kinship terms and feminine-agreement examples (grammar tables must show masculine forms only or neutral roots); ban "she/her", Arabic feminine ending patterns in person words. Teaching grammar: use masculine forms; mention of the feminine pattern is itself risky, so keep it out of the core (flag for review).
- Images and text: no faces, no figurative depictions of prophets or Companions, no calligraphy of Quran outside sanctuary; modest dress; no idols or crosses or other-faith symbols (to avoid claims about others).
- Time: any scene with clock outside 08:00 to 11:00 fails; ban "night, evening, sunset, moon, stars, dinner" words.
- Religion: religious words allowed only as a small share of lines, from a whitelist of greeting formulas, each with a neutral alternative; no Quran or hadith text outside sanctuary; no claims about other faiths; no jokes about religion.
- Animals: avoid dog and pig as friendly characters; sheep, camel, cat, bird, fish are safer (stylistic suggestion, [unverified] as a ruling).

### Gaps
- No scholarly source cited for any ruling above; all need scholar confirmation.

## 5. Keeping the religious share low and measured

### Takeaway
Measure it with a lexicon-based labeller on every build, set hard thresholds in CI, and audit by random sampling. The project already has this (religious share 7.8%, limit 12%, >=80% universal), which fits the target of at least 80 to 90% review-free.

### Cited Findings
- Project rule: universal share at least 80%, religious share at most 12% (currently 7.8%), enforced by Suite C `universal:religious-share` and auto-labelling in `app/src/core/review.ts`. — project CLAUDE.md (local file)
- Albadi et al. built a religion-term lexicon with polarity scores, showing lexicon-based approaches are an established baseline for Arabic religious text. — [ASONAM 2018](https://doi.ieeecomputersociety.org/10.1109/AICCSA.2005.1387088)
- Recall should be prioritised over precision when flagging for human review. — [arXiv 2207.00111](https://arxiv.org/pdf/2207.00111)

### Inferences
- Suggested metrics (my design): (a) share by lines AND by generated scenario instances, weighted by play frequency, because a rarely played sacred line matters less than one shown in every scene; (b) per-scenario max label so each scenario is review-free iff all parts are universal; (c) target: at least 90% of scenarios universal-only, at most 8% cultural, sacred only in optional `sanctuary` scenes.
- Add CI gates: new lemma not in lexicon fails; Quran fuzzy-match outside sanctuary fails; religious share above 12% fails; a trend alarm if share rises more than 1 point between cycles.
- Audit cycle: every 10 cycles, draw a random sample (stratified by topic family), have a human check labels, report label error rate and false-negative rate for sacred; this audit supplies the measured recall that the literature does not provide for this task.

### Gaps
- No published threshold for "acceptable religious share" in educational content; the 12% limit is the project's own choice.

## Overall caveats for the report writer
- Search tooling was rate-limited; several primary documents (ACTFL Arabic standards, Al-Kitaab TOC, UNESCO/ISESCO guidelines, Tanzil licence, Qdetect paper) were not read. Treat their absence as "not retrieved", not "does not exist".
- Prefer Muslim sources was followed only partly: the retrieved sources were mostly commercial listings, academic papers and standards bodies; affiliation of authors is unconfirmed.
