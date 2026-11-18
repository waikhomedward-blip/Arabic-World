# Scaling varied, meaningful, correct language-learning scenario generation, and pipeline reliability

Method note: ~15 web searches and fetches. Most findings come from search-result summaries, not full-text reads. Items marked [unverified] were not confirmed against a primary source. Anything not cited is under Gaps or Inferences.

## 1. Designs that make variety meaningful (storylets, rules, grammars, oatmeal)

### Takeaway
Variety only counts when the player perceives a difference that matters. The proven designs let authors write small, atomic, conditioned content pieces. The system then selects by state (storylets, Valve response rules). Grammar expansion alone gives the "oatmeal" effect. Rabii and Cook add a formal limit: output intricacy is bounded by the knowledge encoded in the generator.

### Cited Findings
- Rabii and Cook, "Why Oatmeal is Cheap: Kolmogorov Complexity and Procedural Generation," FDG 2023, Best Paper. They prove a relationship between the Kolmogorov complexity of the most complex artifact a generator can produce and the size of its possibility space. They describe a limiting relationship among the knowledge encoded in the generator, the density of its output space, and the intricacy of its artifacts. — [arXiv 2305.02131](https://arxiv.org/abs/2305.02131); [search summary](https://ar5iv.labs.arxiv.org/html/2305.02131)
- The "ten thousand bowls of oatmeal" idiom is credited to Kate Compton. Each bowl differs technically, but at scale the differences are not perceptible. This is the problem of perceptual uniqueness at large scale. — secondary course reading, [CMU EMS](https://ems.andrew.cmu.edu/2021s/60210a/minniebzrg/02/15/minniebzrg-02reading/index.html); Rabii and Cook paper above. I did not retrieve Compton's original essay.
- Storylets: Failbetter coined "quality-based narrative" (QBN). Chunks of narrative can be played in any order and repeatedly, with "qualities" (stats) unlocking them. Emily Short describes storylets as lexia gated by qualifiers, and as simple, atomic, robust and recombinable. — [Short, Storylets: You Want Them](https://emshort.blog/tag/quality-based-narrative/); [Short, Beyond Branching](https://emshort.blog/2016/04/12/beyond-branching-quality-based-and-salience-based-narrative-structures/)
- Salience-based narrative (Short, 2016): the system chooses the most applicable content from a large pool given current state. In QBN the player chooses among legal options. — [Beyond Branching](https://emshort.blog/2016/04/12/beyond-branching-quality-based-and-salience-based-narrative-structures/)
- Valve's response system (Elan Ruskin, GDC 2012, "AI-driven Dynamic Dialog through Fuzzy Pattern Matching"): it has four parts (Concepts, Criteria, Rules, Response Groups). It scores all matching rules and picks the highest. The stated goal was to "let writers write." Used in Left 4 Dead, Dota and Valve games since The Orange Box. — [Valve wiki](https://developer.valvesoftware.com/wiki/Response_System); [Short on the talk](https://emshort.blog/2012/03/16/gdc-2012-talk-on-dynamic-dialogue/); [slides PDF](https://cdn.fastly.steamstatic.com/apps/valve/2012/GDC2012_Ruskin_Elan_DynamicDialog.pdf) (slides not read in full)
- Caves of Qud uses a state machine plus replacement grammar for generated histories (Grinblat and Bucklew, PCG workshop 2017). Bucklew and Grinblat also gave a GDC talk on end-to-end village generation covering history, culture and architecture. — [Grinblat 2017](https://pcgworkshop.com/archive/grinblat2017subverting.pdf); [GDC Vault](https://gdcvault.com/play/1025914)
- Answer set programming (ASP) for coherence: Wang and Kreminski use an ASP microtheory of storytelling goals to enumerate outlines. The paper reports 401,990 distinct pregenerated outlines with clingo, constraints block incoherent sequences, and an LLM then writes the text. Dabral and Martens (AIIDE 2020) built a lightweight narrative planner in clingo with required and forbidden roles and actions. — [arXiv 2406.00554](https://arxiv.org/abs/2406.00554); [AIIDE 2020](https://ojs.aaai.org/index.php/AIIDE/article/view/7406)

### Inferences
- For a template generator, the oatmeal defence is a hand-authored "state" axis (time within 08:00 to 11:00, weather, errand type, who is present, what is missing) that changes what is said and what the learner must do. Surface swaps such as noun or name changes do not count.
- Treat variety as measured at the level of a distinct choice or lesson target, not distinct strings. Count "distinct situations" as unique combinations of the few axes that change the learner's task.
- Short's salience model suits a phone game with no network. Rules and storylets are verified tables, and selection is a deterministic scoring function with a seeded RNG.
- ASP or any constraint solver can run at build time only, emitting verified outlines as tables. The 401,990-outline result shows that offline enumeration is feasible.
- The Rabii and Cook result implies that no amount of grammar combinatorics beats adding authored knowledge. Budget authoring effort per axis.

### Gaps
- Compton's original oatmeal talk and any "perceptual differentiation" metric were not retrieved. I found no standard, citable distinctness metric (for example, an n-gram or edit-distance measure for dialogue variety).
- Tracery, Expressionist, Ink, Versu and Dwarf Fortress were not researched in detail (search results did not cover them). Do not cite them from these notes.
- Ruskin's slides were not read in full, so rule-count or authoring-scale numbers are missing.

## 2. Language-learning-specific generation (comprehensible input, Birdbrain, graded readers)

### Takeaway
Vocabulary-controlled generation is an active area (SRS-Stories, Re-RIGHT). The reliable pattern is generate, then lemmatize and check against a known-word list with a deterministic verifier, then rewrite offending words. The 95 to 98% known-word coverage target comes from applied-linguistics literature.

### Cited Findings
- SRS-Stories pairs a spaced-repetition engine with an LLM. A verifier lemmatizes the output and checks it against the known-word list. It tries three strategies: plain prompting, synonym-then-rewrite, and rewrite with unknown words flagged. — [arXiv 2512.18362](https://arxiv.org/html/2512.18362v1)
- Re-RIGHT trains a policy LLM with GRPO against reward modules for vocabulary coverage, semantic preservation and coherence. It cites 95 to 98% coverage as the target for L2 comprehension. — [arXiv 2604.05302](https://arxiv.org/pdf/2604.05302v2)
- A corpus study found graded readers start to meet the 95% known-vocabulary threshold at about rank 1,700 of the lemma-based New GSL. — [Temple scholarshare](https://scholarshare.temple.edu/handle/20.500.12613/8955?show=full)
- Cui and Sachan (ACL 2023) combine knowledge tracing with controlled text generation for exercises, trained and tested on Duolingo learner data. They argue earlier generators only retrieve and manipulate text, and do not model fine-grained knowledge states. — [ACL 2023](https://aclanthology.org/2023.acl-long.567.pdf); [arXiv 2306.02457](https://arxiv.org/abs/2306.02457)
- Duolingo Birdbrain: an ML model estimating both learner proficiency and exercise difficulty, updated per exercise. Duolingo reports A/B-tested gains and that it personalized over 20% of lessons at the time of the post. Predictions were logged in "shadow mode" before being used. — [Duolingo blog](https://blog.duolingo.com/learning-how-to-help-you-learn-introducing-birdbrain); [IEEE Spectrum](https://spectrum.ieee.org/duolingo)

### Inferences
- A free game with no server can ship a precomputed lemma list per lesson and run the 95 to 98% check as a build-time validator. At runtime a small per-lemma known/unknown state decides which pre-verified scenario to pick.
- The Birdbrain "shadow mode" idea maps to the lab: log what a new selector would have chosen before enabling it.
- Arabic needs a language-pack lemmatizer or root and clitic analyzer. Whether coverage should be counted on lemmas or roots is a design choice.

### Gaps
- Duolingo's own technical paper on Birdbrain (the Bayesian or logistic details) was not retrieved. Whether it uses BKT is unconfirmed.
- No Arabic-specific vocabulary-controlled generation result was found. Quality of lemmatizers for MSA with diacritics was not researched.
- Known-coverage thresholds for MSA, a language with high morphological complexity, are not established in what I found [unverified].

## 3. Reliability practices (deterministic validators, judges, held-out sets, mutation tests)

### Takeaway
Order of defence: deterministic checks first (schemas, lexicon, banned-word and rule checks), then a human-labelled gold set, and only then an LLM judge that is validated against that gold set with chance-corrected agreement. Test the validators themselves with mutants.

### Cited Findings
- Husain: evals can be built from code assertions, human review, LLM judges and online experiments. An LLM judge must be validated against human labels. Deploying a judge from a prompt template and trusting the score is a named pitfall. Human oversight matters most in early error analysis. — [Husain, Your AI Product Needs Evals](https://hamel.dev/blog/posts/evals/); [Evals FAQ](https://hamel.dev/blog/posts/evals-faq/)
- Eugene Yan: prefer Cohen's kappa for binary or categorical judge labels (it corrects for chance). Use Kendall's tau or Spearman for ordinal scales. Correlation alone can be over-optimistic. Aim for LLM-human agreement matching human-human agreement. — [Yan, LLM-Evaluators](https://eugeneyan.com/writing/llm-evaluators/)
- Zheng et al., NeurIPS 2023: GPT-4 as judge reached over 80% agreement with human preferences, similar to human-human. A secondary summary gives about 85% vs about 81% without ties [unverified against the paper]. The paper lists position, verbosity and self-enhancement bias. — [arXiv 2306.05685](https://arxiv.org/abs/2306.05685)
- Kappa caveats: severe class imbalance can give low kappa despite high raw agreement (Arize). A 2026 paper (Rao and Callison-Burch) reports kappa can flip sign and recommends phi or MCC for binary verdicts. — [Arize](https://arize.com/blog/measuring-human-llm-judge-alignment.md); [alphaXiv 2606.00093](https://www.alphaxiv.org/abs/2606.00093)
- Practitioner sources (not primary) say structural checks such as JSON schema and length bounds need no LLM calls and can gate a PR. Mutation-testing gates require generated tests to kill at least one mutant, and surviving mutants can be fed back. One blog's figures of 40 to 55% vs 70 to 90% mutation scores are unverified. Property-based tools named: Hypothesis, fast-check, PropEr. — [tianpan.co](https://tianpan.co/blog/2026-04-17-property-based-testing-llm-outputs)

### Inferences
- For this project the generator is a template system, so most "judging" can be deterministic: Arabic orthography, lexicon membership, agreement rules, hard-rule scans (no female words, no faces, clock in 08:00 to 11:00, no music). An LLM judge should be limited to fuzzy qualities (naturalness, universal everyday feel), and only after a gold set shows acceptable agreement.
- Mutation tests for validators: inject known-bad items (a female word, a wrong clock, an off-list lemma, a broken agreement) into otherwise good scenarios and require the validator to reject each one. A validator that lets a mutant through is itself broken. This extends the existing Suite R idea.
- Reward-hacking guards: keep the held-out gold set unseen by the generator and tuner, cap generation with step and size limits, and report only counts that a script computed (evidence-only reporting).
- The "85% agreement" figure circulated on a summary site and is not in Husain's own writing, so I do not recommend adopting it as a rule [unverified].

### Gaps
- I found no primary text for OpenAI or Anthropic eval guidance in this pass. AI Engineer conference talks were not retrieved.
- No agreement numbers for LLM judges on Arabic text quality were found.
- The OOPSLA property-based-versus-unit-test claim was unconfirmed.

## 4. Estimating and proving coverage of a combinatorial space

### Takeaway
Pairwise and t-way covering arrays give a cheap, citable guarantee that every pair (or triple) of axis values appears together. NIST's data suggest low-order interactions cause most faults, but results are case-specific and random testing can match them.

### Cited Findings
- Empirical NIST work: most interaction faults involve one or two variables, progressively fewer involve three or more, and no failure was reported involving more than six. — [Kacker and Kuhn 2016 via NIST](https://www.nist.gov/node/1637006); [Kuhn slides](https://csrc.nist.gov/CSRC/media/Projects/cyber-supply-chain-risk-management/documents/SSCA/Fall_2019/WedAM2.2_kuhn.pdf)
- One Kuhn slide deck reports 65% of faults from a single factor and 96% from single or 2-way, for one application type, so it may not generalize. Pairwise typically catches 50 to 75% of faults, and 4-way to 6-way catches essentially all in the studies. — [Kuhn slides](https://csrc.nist.gov/CSRC/media/Projects/cyber-supply-chain-risk-management/documents/SSCA/Fall_2019/WedAM2.2_kuhn.pdf); [Kuhn and Okun](https://webarchive.library.unt.edu/eot2008/20080916140037/http://csrc.nist.gov/staff/Kuhn/kuhn-reilly-02.pdf)
- A covering array includes every t-way combination of parameter values at least once. A Kuhn, Kacker and Lei grid-simulator study found random testing beat pairwise, with no significant difference between random and 3-way. — [Kuhn, Kacker, Lei, Hunter 2009](https://webarchive.library.unt.edu/web/20130217091851/http:/csrc.nist.gov/groups/SNS/acts/documents/kuhn-kacker-lei-hunter09.pdf); [random combinatorial](https://webarchive.library.unt.edu/web/20090812224644/http:/csrc.nist.gov/groups/SNS/acts/documents/kuhn-lei-kacker-random-combinatorial.pdf)

### Inferences
- Define the scenario axes (place, time of morning, weather, errand, item, speaker role, register, target lemma set). Report t-way coverage over them, with t=2 as the floor and t=3 where the axes interact (for example weather and errand). Report the percentage of tuples seen in the shipped table as a number a script computes.
- Constraint-excluded tuples (for example, rain at an indoor-only scene) must be listed as "invalid by rule" so coverage is measured over the valid space only.
- Property-based tests (fast-check for the TypeScript app; Hypothesis is Python-only) can check invariants over random seeds: every generated scenario passes all validators, is deterministic for a given seed, and stays within size caps.
- Because random sampling can rival pairwise, combine covering-array seeds with random seeds and report both.

### Gaps
- I did not find official Hypothesis or fast-check documentation in this pass, or an NIST tool guide (ACTS) with current usage. No source gave a method to estimate the size of a constrained space before enumerating it (counting with ASP or a model counter is plausible but unverified).
