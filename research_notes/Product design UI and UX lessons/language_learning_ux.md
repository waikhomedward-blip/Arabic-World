# Language-learning product design and UX: what to copy and avoid (for Arabic World)

Method note: about 15 web searches/fetches; many findings come from search-result summaries, not full-text reads. Company-funded evidence is flagged. Anything unconfirmed is marked [unverified]. Quotes are under 15 words.

## Duolingo: published design and research, and the streak debate

### Takeaway
Duolingo's growth comes from heavy A/B testing. Delayed sign-up (try a lesson first) produced large DAU gains by Duolingo's own account. Streaks are the strongest retention lever and the main source of criticism. Peer-reviewed work shows streaks can make the streak the goal and make broken streaks cause quitting. Direct evidence of learning harm is thin, and independent proof of Duolingo's learning efficacy is limited.

### Cited Findings
- Birdbrain predicts whether a learner will answer an exercise correctly. The session generator uses it to pick difficulty. Duolingo says its A/B tests showed Birdbrain lessons helped learners learn more and return more days, with no figures given. It personalised over 20% of lessons by Oct 2020. The blog does not state the method (Elo/IRT/logistic regression). Company source. — [Duolingo blog: Birdbrain](https://blog.duolingo.com/learning-how-to-help-you-learn-introducing-birdbrain)
- Duolingo's research site hosts the older knowledge-tracing paper (Streeter, EDM 2015) and later Birdbrain-related EDM papers. A two-state HMM is the standard "Bayesian knowledge tracing" model. — [Streeter EDM15](https://research.Duolingo.com/papers/streeter.edm15.pdf); [Portnoff EDM21](https://research.duolingo.com/papers/portnoff.edm21.pdf)
- Onboarding: moving the sign-up screen back so users try a lesson first gave about a 20% DAU increase, per a First Round interview with Duolingo's growth lead. A later hard-wall to soft-wall change (a subtle "Later" button, not a prominent "Discard my progress") added 8.2% DAU. Company-reported; the tests were run by Duolingo. — [First Round Review](https://review.firstround.com/the-tenets-of-a-b-testing-from-duolingos-master-growth-hacker); [Taplytics summary](https://taplytics.com/blog/duolingo-ab-test-onboarding)
- Duolingo's own streak post says it uses habit research. It cites a Penn/UCLA study that slack can motivate more than rigid rules, which is the rationale for Streak Freeze (later up to two equipped). Company source. — [Duolingo: how streak builds habit](https://blog.duolingo.com/how-duolingo-streak-builds-habit)
- Third-party streak figures are [unverified]: a 1.7% 7-day retention lift from a streak animation (a JTBD analysis, said to come from Duolingo's blog) and a 21% churn reduction (a UX portfolio case study). — [Mobbin/Duolingo summary search](https://mobbin.com/blog/streaks-are-about-losing-a-study-of-859-streak-designs); [Jiwon Yoo case](https://jiwonvyoo.github.io/portfolio/case/duolingo/duo.html)
- Peer-reviewed: Silverman, Barasch, Inman, Wood and Lee (2023), Journal of Consumer Research. Streaks can lead users to prioritise extending the streak over the activity. Broken streaks make users more likely to quit. A paid streak repair lowers motivation to keep streaks. Etkin (2016) found that quantification can drain enjoyment. Read via a secondary summary, not the paper. — [The Decision Lab, Streak Creep](https://thedecisionlab.com/es-ES/insights/consumer-insights/streak-creep-the-perils-of-too-much-gamification)
- The same source describes guilt-based notifications (e.g. "You made Duo sad") and user burnout reports. Anecdotal. — same link
- A search found no rigorous study showing streaks harm learning. A student thesis reported the streak occasionally created pressure or anxiety but judged it positive for vocabulary. The Essex paper notes that leaderboards may frustrate struggling learners (earlier work cited). Weak evidence. — [Essex (Jabbari et al.)](https://repository.essex.ac.uk/41011/1/Jabbari%2C%20Zarrinabadi%2C%20%26%20Amini%20%28accepted%20copy%29.pdf); [Lund thesis](https://lup.lub.lu.se/student-papers/record/9238652/file/9238707.pdf)
- Efficacy: the Vesselinov and Grego (2012) study was Duolingo-funded; average 8.1 points per hour of study, median 3.9, SD 12.1, with volunteer subjects and no comparison course. A ReCALL case study notes limited independent research with persistence and motivation concerns. A 2024 Language Learning & Technology study (Smith, Jiang, Peters; n=48, about 27 hours) found significant gains in all measures; read via excerpts. — [Vesselinov/Avant PDF](https://rebrand.avantassessment.com/wp-content/uploads/The-effectiveness-of-Duolingo-in-developing-receptive-and-productive-language-knowledge-and-proficiency.pdf); [ReCALL Duolingo case study](https://cambridge.org/core/services/aop-cambridge-core/content/view/A4D7C8F71782A37D258C19F357DDBCBE/S0958344019000065a.pdf/mobileassisted_language_learning_a_duolingo_case_study.pdf)
- Deterding and gamification critique: critics distinguish "pointsification" (points and badges only) from game thinking (Hellberg and Moll). Deterding's 2010 talk "Pawned" is listed but I did not read it. Werbach (2014), as cited, warns gamification can manipulate. Bogost's "exploitationware" is cited via a Wellesley reading list. — [Frontiers in Education 2023](https://www.frontiersin.org/articles/10.3389/feduc.2023.1212994); [Wellesley list](https://cs.wellesley.edu/~hci/GamificationIx.pdf); [Fast Company](https://www.fastcompany.com/1662656/sixty-two-reasons-why-gamification-is-played-out)

### Inferences
- "Try before sign-up" and a low-key "Later" are the most transferable growth findings. They need no manipulation. Arabic World can start in the world at once, with progress saved locally and no account.
- The softer part of the streak (slack, freezes) concedes the streak's downside. Dropping streaks and keeping only calm "welcome back" avoids the quit-after-break pattern.
- Birdbrain's principle (match difficulty to predicted success) can be copied without points: choose errands that are just hard enough.

### Gaps
- Duolingo's published Birdbrain method details, the Duo character design rationale and the "delight" team write-ups were not retrieved.
- Peer-reviewed measures of streak anxiety in language learners were not found. No full text of Silverman et al. was read.
- The primary Deterding texts were not read.

## Other apps (Babbel, Busuu, Memrise, Lingvist, LingQ, Anki, Pimsleur, Mondly, Clozemaster) and Arabic-specific apps

### Takeaway
Reviews describe differing design bets: grammar-in-context (Babbel), human correction (Busuu), flashcards plus video (Memrise), reading input with a known-word count (LingQ), review scheduling (Anki). I found no independent efficacy studies for most. Anki's recurring failure is backlog pile-up. For Arabic, vendor and competitor sources say short vowels are spelled out for beginners and that script teaching is often weak in broad apps. Independent evidence is lacking.

### Cited Findings
- Babbel: grammar taught in lessons, with a Review Manager for spaced review. Memrise: flashcards and native-speaker video, strongest on vocabulary. Busuu: written corrections from native speakers. LingQ: reading with synced audio, tap words, known/unknown tracking. Review/vendor sources, partly competitor-owned. I found no independent efficacy study of Babbel. — [Linguatics Memrise vs Babbel](https://linguatics.com/memrise-vs-babbel/); [LingQ blog](https://www.lingq.com/blog/best-language-learning-app/); [Migaku comparison](https://migaku.com/blog/language-fun/language-learning-apps-comparison)
- Anki: abandonment is attributed to review backlog ("death spiral") and card-creation effort. Sources are mostly blogs selling alternatives. No measured dropout data. Remedies suggested: capped daily reviews, FSRS scheduler. — [Repeatflow guide](https://repeatflow-website.pages.dev/guides/review-overload); [Andy Matuschak note](https://notes.andymatuschak.org/zyk3ZCEVSB4Zwej3Xd4CJ2g1FynRFTZGJpQN)
- Duolingo Arabic: its blog says it writes out short vowels in the course, as beginner courses often do. Competitor reviews (Clozemaster) say it reaches about A1 to low A2 and has a third of the Spanish/French content [unverified, competitor claim]. — [Duolingo blog on Arabic](https://blog.duolingo.com/what-makes-arabic-hard-and-why-that-shouldnt-stop-you-from-learning-it/); [Clozemaster](https://www.clozemaster.com/blog/?p=7865)
- Kaleela's App Store text says it moves from letter shapes to long and short vowels (vendor copy). Arabic Unlocked is reviewed as videos and games, with phonetic explanations. Mango Arabic: a roundup suggests extra script practice is needed. — [Kaleela listing](https://apps.apple.com/app/id1479694656); [Actual Fluency on Arabic Unlocked](https://actualfluency.com/?p=14213); [Clozemaster app guide](https://www.clozemaster.com/blog/?p=7181)

### Inferences
- A review that never builds a backlog (small, capped, errand-based re-encounters) avoids Anki's main failure mode.
- Showing fully vowelled text early and fading vowels later fits the one published Arabic-app practice found, and matches how learners meet Arabic. This is an inference; no study was found.

### Gaps
- No independent evidence on how any app handles Arabic vowels. Nasma and Madinah Arabic apps were not covered. Pimsleur, Mondly and Lingvist specifics were not found in my searches.

## Language games (Influent, Noun Town, Lingotopia, Language Hero, Mondly VR, ImmerseMe, Learn Japanese To Survive)

### Takeaway
Reviewed immersion games are valued for in-context words and native audio but described as vocabulary tools, not courses: no grammar, no speaking, narrow scope. Controlled outcome evidence for specific games is thin. Meta-analyses show a positive effect for digital game-based language learning in general, with wide variation.

### Cited Findings
- Influent: reviewers call it good for basic vocabulary but not self-contained. Scope is one apartment, with native audio per word, and no grammar or sentence building. Steam: Mostly Positive (969 reviews). Retention out of context is questioned. — [Common Sense Education](https://www.commonsense.org/education/reviews/influent); [Fluent in 3 Months](https://www.fluentin3months.com/reviews/influent-review/); [Tofugu](https://www.tofugu.com/japanese-learning-resources-database/influent/)
- Noun Town: developer claims 200,000+ players, 12 languages, mini-games plus spaced repetition (marketing). Review: reviews from 30 minutes to 30 days. A 2025 RISTAL pilot with prospective teachers measured perception only, small sample. One blog says it lacks instructional support and real conversation. — [noun.town](https://noun.town/); [Coto Academy review](https://cotoacademy.com/noun-town-review-should-you-learn-japanese-in-vr/); [RISTAL 2025](https://reference-global.com/2/v2/download/article/10.2478/ristal-2025-0008.pdf)
- Meta-analyses: Kao 2014 (25 studies, d=0.695, EFL DGBL); Tsai and Tsai 2018 (26 studies, large effect in some conditions); a 2021 technology-assisted L2 vocabulary meta-analysis (34 studies, d=0.64, not game-specific); a 2025-era paper reports d=1.128 (an outlier). Secondary summaries; effect sizes vary with inclusion criteria. — [Tsai & Tsai](https://scholar.lib.ntnu.edu.tw/en/publications/digital-game-based-second-language-vocabulary-learning-and-condit-2/); [Cambridge 2021 meta-analysis](https://resolve.cambridge.org/core/services/aop-cambridge-core/content/view/08A549A6CFD1078406E6A4F8AFE28184/S0958344021000239a.pdf/a-meta-analysis-examining-technology-assisted-l2-vocabulary-learning.pdf); [Atlantis Press](https://www.atlantis-press.com/article/126024760.pdf)

### Inferences
- The gap reviewers name (no sentences, grammar, speaking, or real tasks) is exactly where an errand game with typed answers and optional speaking can add value.
- Influent's "explore any word, replay audio freely" is a low-pressure pattern that fits Arabic World's calm tone.

### Gaps
- No usable sources found for Lingotopia, Language Hero, Mondly VR, ImmerseMe or Learn Japanese To Survive. No outcome study of any single immersion game was found.

## Error feedback UX (recasts, hint ladders, "almost right")

### Takeaway
Classroom meta-analysis favours prompts (letting the learner self-correct) over recasts, mainly in free-production measures, and low-proficiency learners benefited more from prompts in one study. No source found on UI for accent/diacritic "almost right" cases.

### Cited Findings
- Lyster and Saito (2010): 15 classroom studies (N=827); prompts had larger effects than recasts. Recasts give a model form and signal the error; prompts give only the error signal. Goo and Mackey (2007) is cited for recasts; the rebuttal says lab effects were larger than classroom effects. — [McGill eScholarship](https://escholarship.mcgill.ca/downloads/6w924g64b); [SSLA](https://www.cambridge.org/core/product/4999EE1C8379B2BF026B148EAF373CA1)
- A study found high-proficiency learners benefited equally from prompts and recasts, while low-proficiency learners benefited more from prompts. Secondary summary. — same search result set

### Inferences
- A hint ladder fits: first signal "close", then point to the spot (the vowel mark, the letter), then show the model form. This combines prompt-first with a recast fallback. No source tested this exact ladder; it is design inference.
- For diacritic slips, treating a missing or wrong short vowel as "almost right" and asking for one retry lowers frustration. Inference only.

### Gaps
- No product research on partial-credit UI, "almost" states, or Arabic diacritic leniency. No findings on speech-recognition feedback for Arabic.

## Motivation without manipulation (self-determination theory, alternatives to streaks)

### Takeaway
SDT's three needs (autonomy, competence, relatedness) are the standard frame. Studies of gamified language apps are small and mostly correlational. One 2026 survey of Duolingo users finds competence and relatedness mediate the effect, not autonomy. Streak research (above) supports removing loss-framed pressure.

### Cited Findings
- SDT frames app motivation as autonomy, competence and relatedness. A Duolingo survey (n=247) found gamification worked through competence and relatedness; autonomy was not a significant mediator. Cross-sectional, so not causal. — [CEUR-WS paper](https://ceur-ws.org/Vol-4043/paper14.pdf)
- Jeon (2022): a qualitative study of how a self-directed EFL app supported or thwarted the needs. — [Jeon 2022](https://selfdeterminationtheory.org/wp-content/uploads/2023/11/2022_Jeon_ExploringaSelf-Directed.pdf)
- Shen et al. (2024): gamification improved achievement, with motivation as mediator (Chinese online learners). — [Frontiers in Psychology 2024](https://frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2024.1295709/pdf)
- A review argues SDT is applied superficially in gamification, and that poorly calibrated challenge can undermine perceived competence. — same result set (Springer: [TechTrends](https://link.springer.com/article/10.1007/s11528-024-00968-9))
- Streak harms (see first section): an effective streak may displace the goal; repair-for-pay reduces motivation. — [The Decision Lab](https://thedecisionlab.com/es-ES/insights/consumer-insights/streak-creep-the-perils-of-too-much-gamification)

### Inferences
- Competence: show "what you can now do" (errands completed, words used) instead of scores. Relatedness: warm all-male neighbour characters who remember the player (consistent with the project's hard rules). Autonomy: let the player pick errands and the vowel-marking level.
- "Welcome back" with no counter, plus a progress journal of real things done in the city, is consistent with the evidence above, but I found no study testing it. [unverified as effective]

### Gaps
- No study found evaluating non-streak return designs ("welcome back", journals). No evidence of long-term effects of no-points designs on retention.
