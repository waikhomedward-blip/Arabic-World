# Checking machine-generated, fully diacritised MSA (Fusha) at scale with no paid expert

Scope note: about 18 tool calls. Items I could not confirm are marked [unverified] or put under Gaps. Where I computed a number myself, it is labelled "own calculation".

## 1. Which open Arabic tools can verify morphology, agreement, case endings and diacritics? Accuracy and licences

### Takeaway
CAMeL Tools (MIT code; its MSA morphology DB r13 is GPL v2) and Camel Morph MSA (code MIT, DB CC BY 4.0) are the only options that are both actively maintained and licence-safe enough for a free web app. Farasa and MADAMIRA are research-only. Mishkal, Qalsadi and Ayaspell are GPL. No open tool checks full agreement and case endings reliably. The robust use is generator-side: analyse a generated word and confirm it matches the intended lemma and features, not as a free-text grammar judge.

### Cited Findings
- CAMeL Tools software is MIT-licensed. [GitHub README](https://github.com/CAMeL-Lab/camel_tools)
- CAMeL data packages: `morphology-db-msa-r13` and `disambig-mle-calima-msa-r13` are GPL v2. `dialectid-default` is MIT. The AraBERT-based NER and sentiment packages carry an "AraBERT" licence, and the mBERT sentiment package is Apache 2.0. No non-commercial terms are listed on the page. [CAMeL packages page](https://camel-tools.readthedocs.io/en/latest/reference/packages.html)
- CAMeL Tools paper (Obeid et al., LREC 2020), p. 7022-7032: it covers morphological modelling, preprocessing, dialect ID, NER and sentiment. [ACL Anthology](https://aclanthology.org/2020.lrec-1.868)
- CAMeL release notes extract a table comparing CAMeL multitask and MLE disambiguation with MADAMIRA on MSA. The extracted values were FULL 85.6 / 89.0 / 70.0, DIAC 87.7 / 90.9 / 78.4, POS 97.1 / 97.2 / 95.5. The column headers were lost in extraction, so the assumed order is Multitask / MLE / MADAMIRA [unverified; check the PDF table]. [v1.0.0 release notes](https://camel-lab.github.io/camel_tools_updates/2020/09/08/camel-tools-release-v1.0.0.html)
- Camel Morph MSA (Khairallah et al., LREC-COLING 2024) has more than 100K lemmas. It gives about 1.45 billion analyses and about 36% lower OOV than SAMA on a 10-billion-word corpus. It is an open analyser and generator that works with CAMeL Tools. [ACL Anthology](https://aclanthology.org/2024.lrec-main.240/)
- Camel Morph repo: code is MIT. The MSA DB `camel_morph_msa_v1.0.db` is CC BY 4.0, which requires crediting Camel Morph MSA v1.0 and NYU Abu Dhabi. The spreadsheet sources are "accessible upon demand". The page does not discuss commercial use; CC BY 4.0 itself allows it with attribution. [GitHub](https://github.com/CAMeL-Lab/camel_morph)
- The CamelMorph framework compiles specification spreadsheets into ALMOR-style DBs. A companion paper covers MSA nominals. [arXiv 2402.00385](https://arxiv.org/pdf/2402.00385)
- Farasa (QCRI): "for research purpose only. For non-research use, please contact us". It needs registration. Not commercial-safe. [Farasa](https://farasa.qcri.org)
- MADAMIRA (Columbia): a free non-commercial licence, and commercial use needs a Columbia licence. The author's FAQ says it is no longer supported and suggests Camelira, built on CAMeL Tools. [Columbia licence page](https://inventions.techventures.columbia.edu/licenses/madamira-non-commercial--108); [Habash FAQ](https://sites.google.com/view/nizarhabash/faq)
- Mishkal is GPL-3.0. Its pipeline is Qalsadi morphology (Arramooz dictionary), ArAnaSyn syntax and asmai semantics. The syntax analyser is "basic for the moment", using only linear relations between adjacent words, and it falls back to defaults such as the Mansoub case when evidence is lacking. No accuracy figures are published on the page. [GitHub](https://github.com/linuxscout/mishkal)
- Qalsadi: GPL (version not stated on the page). It does lemmatisation and vocalised-text analysis, and uses Qutrub for verbs. [GitHub](https://github.com/linuxscout/qalsadi)
- Ayaspell: GPL/LGPL/MPL tri-licence. It is a hunspell spellchecker plus a morphological lexicon for grammar checking, release 3.7. It is a spellchecker, not an agreement checker. [GitHub](https://github.com/linuxscout/ayaspell)
- Arabic GEC models: CAMeL Lab publishes AraBART/AraT5 QALB models with +Morph preprocessing. AraBART is better on average (F0.5 on QALB-2014, QALB-2015 and ZAEBUC). [CAMeL arabic-gec repo](https://github.com/CAMeL-Lab/arabic-gec/blob/master/gec); [model card](https://huggingface.co/CAMeL-Lab/arabart-qalb14-gec-ged-13/raw/main/README.md)
- ArbESC+ ensemble: F0.5 82.63 on QALB-14 and 84.64 on QALB-15 L1. A single AraBART+Morph+GEC model scores 76.20 and 78.85. MTAGEC's best AraT5 variant scores 80.02 on QALB-2014 and 81.73 on QALB-2015. [ArbESC+](https://arxiv.org/html/2511.14230v1); the MTAGEC figures come from a search summary [unverified]. Because the F0.5 scores are around 80%, they are too weak to be a gate.
- QALB is a corpus of web-comment and learner errors, mostly undiacritised. It was not designed for diacritised case-ending errors [unverified; my reading of the corpus, no source fetched].
- AlKhalil Morpho Sys: licence not confirmed [unverified; recall suggests GPL].
- A search summary reported the 2025 six-tool comparison saying that CAMeL Tools and Mishkal show comparatively higher diacritisation error rates. [Annals CSIS paper](https://annals-csis.org/Volume_43/drp/pdf/4862.pdf) [unverified detail].

### Inferences
- The strongest cheap check is a lexicon and feature match using Camel Morph MSA or the CAMeL calima-msa DB. Generate word forms from lemma and features, analyse them, and confirm one analysis carries the intended lemma, POS, case, number, gender and definiteness. Because the game uses templates, the intended features are known in advance and no disambiguation guesswork is needed.
- Licence for a free web app: MIT and CC BY 4.0 are fine. GPL v2 on the calima r13 data matters only if the data is distributed with the game. Running it as an offline build-time checker and shipping only the verified sentences should avoid the distribution question. This is a licence interpretation, not legal advice.
- Prefer Camel Morph (CC BY 4.0) over r13 (GPL v2) for any step whose output ships. Avoid Farasa and MADAMIRA entirely.

### Gaps
- Camel Morph MSA accuracy is not given as a figure on the pages read. Only OOV and coverage numbers were found.
- No source was found for LREC 2020 CAMeL disambiguation numbers in readable form (the PDF was not parseable). Qalsadi and AlKhalil accuracy and AlKhalil licence were not found.
- I found no open, validated checker for case-ending agreement in fully diacritised text. The CAMeL GEC models target undiacritised QALB-style errors.

## 2. Diacritiser error rates, and are round-trip checks reliable?

### Takeaway
The best neural diacritisers still make errors, and published numbers vary enormously by test set and by whether case endings count. So a "strip, re-diacritise, compare" check yields many false alarms and some missed errors. It works only as a filter that routes disagreements to review, not as a pass/fail gate.

### Cited Findings
- Fadel et al. 2019 benchmark: neural Shakkala had DER 2.88%, against 13.78% for the best non-neural tool (Mishkal). Shakkelha on Tashkeela, with extra training data: DER 1.69%, WER 5.09%. Another Shakkala entry: DER 3.73%, WER 11.19%. [arXiv 1905.01965](https://arxiv.org/abs/1905.01965v1) and leaderboard summaries [Papers with Code](https://paperswithcode.com/paper/neural-arabic-text-diacritization-state-of-1). Leaderboard numbers need checking against the papers.
- CATT (Abjad Ltd, 2024): the best model beats the 11 evaluated systems by a relative DER of 30.83% on WikiNews and 35.21% on the CATT dataset. It beats GPT-4-turbo by a 9.36% relative DER on CATT. The compared systems include CBHG, Sakhr, Farasa, Alkhalil, Mishkal, Shakkala, Command R+ and GPT-4. Limits: it handles Arabic only, with no numbers or partial diacritisation. The paper is CC BY-NC-SA 4.0 and the model licence is not stated. [arXiv 2407.03236](https://arxiv.org/html/2407.03236)
- A leaderboard listing (to be checked) gives Shakkala DER 13.494% and WER 50.387% on the CATT dataset, and the best CATT model DER 8.624% and WER 34.191%. [Papers with Code summary](https://vercel.hyper.ai/en/papers/2407.03236) [unverified].
- Toyin et al. (LREC 2026), "Are LLMs Good Text Diacritizers? An Arabic and Yoruba Case Study" (12 LLMs against 4 specialised models): many off-the-shelf LLMs outperform the specialised models, but small models hallucinate. [arXiv 2506.11602](https://arxiv.org/abs/2506.11602)
- Scores differ a lot between test sets and with or without case endings, so numbers are not comparable across papers. [search summary of the above]

### Inferences
- Even at a 2-3% DER on easy news text, and much worse on harder sets, a diacritiser is wrong on a visible share of words. If a re-diacritiser disagrees with the template output, that is weak evidence of a template error; if it agrees, that is weak evidence of correctness, because both can share the same prior. Use disagreement only to prioritise human review.
- Better: rely on the generator's own knowledge. Template systems with a lexicon and an inflection engine, such as Camel Morph generation, produce diacritics by rule. Then verify that the generated form is a valid analysis of the lemma and features (analysis round trip), which is deterministic and far more reliable than statistical re-diacritisation.
- Case endings (i'rab) are what diacritisers get wrong most, and that is also where template agreement errors would be. [Inference; the sources above give totals but no case-ending breakdown.]

### Gaps
- No source fetched that reports case-ending-only DER for CAMeL, Shakkelha or CATT on short templated sentences.
- No peer-reviewed study of round-trip generate-strip-rediacritise validation for Arabic.
- CATT model weights licence not confirmed.

## 3. LLM-as-judge for Arabic grammar

### Takeaway
No Arabic-specific study of LLM-judge agreement with humans on grammar correctness of diacritised text was found. The nearest Arabic evidence shows moderate-to-good agreement on open-ended quality (Pearson 0.76), and English GEC evidence shows high agreement (kappa above 0.8) with consensus or big models. Treat an LLM as a triage filter, calibrated on a human gold set.

### Cited Findings
- Palm dataset (Arabic): human evaluators' average ICC was 0.67 with each other. LLM-as-Judge correlated with human correctness scores at Pearson 0.76 and ICC 0.78. This is open-ended response quality, not grammar. [arXiv 2503.00151](https://arxiv.org/pdf/2503.00151)
- English/Chinese GEC: JELV's multi-turn LLM-judge pipeline exceeds 90% accuracy against human labels on an edit-validity benchmark. A Qwen3-8B annotator reports Cohen's kappa of 0.806 (NLPCC18) and 0.808 (CoNLL14). [arXiv 2604.06573](https://arxiv.org/pdf/2604.06573); [arXiv 2605.07635](https://arxiv.org/pdf/2605.07635) [unverified detail, via search summaries]
- An earlier study found GPT-4 a strong GEC evaluator, with correlation with humans dropping as model size falls. [arXiv 2403.17540](https://arxiv.org/html/2403.17540v1)
- Arabic GEC with LLMs: GPT-4 with expert prompts and few-shot examples reached F1 65.49 on Arabic GEC, per a literature review. A PeerJ study found GPT-4o best among GPT, Gemini, Llama and ALLaM on Arabic grammar tasks. [Review](https://arxiv.org/pdf/2505.08004); [PeerJ](https://peerj.com/articles/cs-3486.pdf)
- 2026 benchmark: ALLaM-7B and GPT-5 judges had low mean absolute deviation on translation scoring, Qwen3-8B higher, and authors say reliability needs more study. [arXiv 2605.00119](https://arxiv.org/pdf/2605.00119)
- Tibyan corpus used ChatGPT to produce Arabic GEC data and checked it against professional annotators (no agreement numbers in the snippet). [arXiv 2411.04588](https://arxiv.org/pdf/2411.04588)
- Fanar and Jais: no judge-agreement study found.

### Inferences
- Human-human ICC of 0.67 on Palm shows the ceiling: an LLM judge cannot be better calibrated than humans disagree.
- Known LLM weaknesses likely to bite here (general reasoning, not tested in the sources): missing case-ending errors that look natural, leniency toward fluent but wrong text, and hallucinated explanations. Mitigate with at least two different LLM judges, a consensus rule, and per-template spot checks.
- Calibration method: label 200-300 sentences by a human gold set, compute the judge's false-accept rate on errors, and use the judge only if the false-accept rate is low; otherwise only for triage. I found no Arabic paper quantifying how calibration changes agreement.

### Gaps
- No Arabic grammar kappa for GPT-4-class, ALLaM, Fanar or Jais found.
- No evidence on judging with full diacritics versus undiacritised text.
- ALLaM, Fanar and Jais licences were not checked in this pass.

## 4. Free human review models

### Takeaway
Tatoeba's model is the best-documented: native-speaker ownership, adoption and proofreading, with an explicit warning that the corpus is not error-free. I found no sourced data for Wikipedia, university or Islamic-university recruitment programmes.

### Cited Findings
- Tatoeba lets users proofread and "adopt" sentences. Guidance says to adopt only sentences that seem 100% natural. Owned sentences are more likely to be error-free, especially if owned by a native speaker. Corrections can be made on unowned sentences. [Tatoeba wiki](https://en.wiki.tatoeba.org/history/show-version/3287)
- The metadata includes tags, ratings, and a self-reported native-speaker flag (profile or a separate list). Non-native contributions are accepted. The wiki says the corpus is not error-free and advises custom processing plus manual review. [Tatoeba wiki](https://en.wiki.tatoeba.org/history/show-version/3287)
- A GitHub issue argued reviews by non-native speakers are often wrong; maintainers said deleting them would erase many mostly correct reviews. [Tatoeba GitHub issue 3080](https://www.github.com/Tatoeba/tatoeba2/issues/3080)
- No official statistics on corpus accuracy were found.

### Inferences
- A workable free model: native or advanced Arabic speakers get a small sampling queue with a binary correct/incorrect and an optional error type per sentence, with two independent reviewers per item and a third on disagreement. Gold-set seeding of known-bad items measures reviewer quality, in the style of Tatoeba's native-speaker flag, but formalised.
- Since the owner's rules forbid female characters and require an all-male cast in content, contributor recruitment should not need any personal content in the review items.

### Gaps
- No sourced recruiting or quality-assurance data for Wikipedia-style volunteers, university Arabic departments, Arabic teacher communities or Islamic-university students. Not researched beyond Tatoeba.
- No evidence on reviewer reliability for diacritised case endings specifically.

## 5. Sampling statistics

### Takeaway
With zero errors found in n independent random samples, the 95% upper bound on the error rate is 1 - 0.05^(1/n), about 3/n. So roughly 59 clean samples show under 5%, about 299 show under 1%, about 598 show under 0.5%, and about 2,995 show under 0.1%. This applies per template, and sampling must cover each template-by-lexical-class cell since errors cluster.

### Cited Findings
- Rule of three: with 0 events in n trials, 3/n is an approximate 95% upper bound on the binomial rate. The exact bound solves (1-p)^n = 0.05, and at n = 100 it gives about 0.0295 against 0.03 by the rule. Requirement: n >= ln(0.05)/ln(1-p); for p = 1%, n >= 299 (the rule gives 300). Reference: Jovanovic and Levy, The American Statistician 51(2), 1997. [Statology](https://www.statology.org/a-concise-guide-to-the-statistical-rule-of-three/); [search summary of Jovanovic and Levy](https://scilit.com/publications/9556769c9079eff2c67f7e5569fb27ce)
- Exact methods are advised for other confidence levels or small counts. [Statology](https://www.statology.org/a-concise-guide-to-the-statistical-rule-of-three/)
- Zero-acceptance (c=0) plans accept a lot only if no defects appear in the sample. For 95% confidence use n about 300/p; for 90% about 230/p; n=230 with c=0 corresponds to an LTPD of 1.0% at 90%. [Scribd note](https://www.scribd.com/document/548677344/Acceptance-Sampling-Update-AQL-LTPD); [Minitab c=0 guidance](https://support.minitab.com/minitab/help-and-how-to/quality-and-process-improvement/acceptance-sampling/supporting-topics/create-an-accept-on-none-cequals0-plan); [BioProcess LTPD](https://www.bioprocessonline.com/doc/how-to-establish-sample-sizes-for-process-validation-using-ltpd-sampling-0001)
- Binomial basis for attribute plans. [Minitab methods](https://support.minitab.com/minitab/help-and-how-to/quality-and-process-improvement/acceptance-sampling/how-to/attributes-acceptance-sampling/methods-and-formulas/methods-and-formulas)

### Inferences (own calculation, standard binomial)
- Zero-defect samples needed for 95% confidence the rate is below the target: 5% needs 59 (ln0.05/ln0.95 = 58.4); 1% needs 299; 0.5% needs 598; 0.1% needs 2,995.
- If one error is allowed (c=1), the 95% sample size is about 4.74/p: roughly 93 for 5% and 474 for 1% [approximation, own calculation].
- For a template that produces millions of sentences, the lot size is irrelevant once it is much larger than n, so the sample size is nearly independent of volume. The cost scales with the number of templates, not sentences. 1,000 templates times 59 samples is 59,000 reviews for the 5% level, which is too many for volunteers. Hence stratify: group templates by structure, check each rule with exhaustive lexicon-level tests, and sample only across groups.
- Reviewers err too. If a reviewer's false-reject rate is non-zero, a zero-defect plan will reject good templates; allow c greater than 0 or use two reviewers.
- Template errors are systematic: a wrong rule fails every instance. So testing one example of each (template, lexical class) and checking by machine usually finds them; random sampling matters for lexicon errors (individual wrong words, irregular plurals).
- Fully automatic generation plus analysis checks can cover 100% of the output, with humans verifying a random subset to estimate the residual error rate of the automatic checker itself.

### Gaps
- No Arabic-specific acceptance-sampling literature found; the above is general quality-control statistics applied by inference.

## Overall recommended pipeline (inference from the findings)
1. Build forms by rule from a lexicon (Camel Morph generator, CC BY 4.0). Never let a diacritiser or LLM create the diacritics.
2. 100% automatic round trip: analyse every generated word and confirm lemma and features match the template's intent.
3. Optional second opinion from an LLM judge and a diacritiser, used only to rank items for review.
4. Human review of a stratified sample, with gold items to rate reviewers. Release a template once its sample shows zero errors at the chosen bound (for example 299 for under 1% at 95%).
