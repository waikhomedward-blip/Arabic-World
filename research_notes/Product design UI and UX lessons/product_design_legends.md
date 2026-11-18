# Product design legends applied to a calm, phone-first Arabic learning game

Notes on method: Apple HIG and Material pages did not fetch directly (JS pages); their figures come from search summaries/mirrors and are marked [unverified against live page]. Books (Norman, Krug, Sierra, Maeda, Tufte) were reached via secondary summaries, so wording is paraphrase and page numbers are not given. All "Arabic World" applications are my inferences, not source claims.

## 1. Dieter Rams, Apple HIG (clarity/deference/depth), Material: touch and motion

### Takeaway
Rams' ten principles reduce to: useful, understandable, unobtrusive, honest, thorough, "as little design as possible". Platform guidance converges on tap targets of roughly 44 pt (Apple), 48 dp with 8 dp gaps (Material), with WCAG 2.2 at 24 CSS px (AA) and 44 CSS px (AAA). For a web game on phones, build to 48 CSS px with 8 px gaps, and honour Reduce Motion.

### Cited Findings
- Rams' ten principles (Vitsoe's summary): innovative; makes a product useful; aesthetic; makes a product understandable; unobtrusive; honest; long-lasting; thorough down to the last detail; environmentally friendly; "as little design as possible" (less but better). — [Vitsoe: Good design](https://www.vitsoe.com/gb/about/good-design)
- Rams, honest: design "makes no promises it can't keep" and does not overstate innovation, power or value. Unobtrusive: products are tools, design stays neutral and leaves room for the user's own expression. — [Vitsoe](https://www.vitsoe.com/gb/about/good-design)
- Rams, thorough: nothing arbitrary or left to chance; careful work shows respect for the user. — [Vitsoe](https://www.vitsoe.com/gb/about/good-design)
- Apple HIG: 44x44 pt minimum hit region for buttons; visionOS 60x60 pt; visible control may be smaller if padding enlarges the hit area. [unverified against live page; from mirrored HIG copies] — [Search summary citing HIG mirror](https://developer-mdn.apple.com/design/human-interface-guidelines/components/menus-and-actions/buttons)
- Apple HIG design themes are commonly stated as clarity (legible text, precise icons), deference (UI supports content, does not compete), depth (layers and motion convey hierarchy); Dynamic Type for text scaling; respect Reduce Motion by swapping large movement for crossfades. [unverified: fetch returned a stub page; this is from the fetcher's general background, not the live page] — [Apple HIG Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)
- Material: 48x48 dp minimum touch target, 8 dp or more between targets; icon may look 24 dp with padding forming the 48 dp target; high-density components must be opt-in. — [Material applying density](https://material.io/design/layout/applying-density.html); [Android touch target size](https://support.google.com/accessibility/android/answer/7101858)
- WCAG 2.2 SC 2.5.8 (AA): targets at least 24x24 CSS px, with spacing/equivalent/inline/essential exceptions; SC 2.5.5 (AAA) sets 44x44 CSS px. — [W3C Understanding 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- NN/g visual design: use about three distinct sizes (scale); hierarchy via size, colour, spacing; proximity groups labels with fields; do not lower text contrast to de-emphasise; check contrast with a tool. — [NN/g principles of visual design](https://www.nngroup.com/articles/principles-visual-design/)

### Inferences
- Rams 6 (honest) and 5 (unobtrusive) map to the owner's "no XP, no streaks": no fake progress, no reward fanfare that outshouts the scene. Rams 10 suggests each screen shows one errand and one action.
- Targets: set a 48 px floor with 8 px gaps for all Arabic answer buttons (also helps larger fingers and Arabic text with diacritics, which need generous line height); mark as a Suite check candidate.
- Motion: provide `prefers-reduced-motion` fallback (crossfade/none) for scene transitions and walk animations. Keep motion slow and purposeful, consistent with morning calm.
- Deference: the world scene is the content; chrome (HUD, buttons) should recede.

### Gaps
- Apple's exact HIG motion/typography numbers and Material motion duration/easing tokens were not retrieved. Check live pages before citing.

## 2. Norman, Nielsen, Krug, Victor, Kay

### Takeaway
Norman: make actions discoverable through signifiers, mapping, constraints and immediate feedback, and treat errors as design failures. Nielsen's ten heuristics give an audit checklist. Krug: self-evident screens, no "happy talk". Victor and Kay: learners understand by seeing and doing with the thing, not by reading symbols first, which fits teaching Arabic through scene objects.

### Cited Findings
- Norman: discoverability and understanding are the two key traits; discoverability rests on six concepts: affordances, signifiers, constraints, mappings, feedback, conceptual models. Signifiers show where and how to act; mapping is spatial correspondence of control to result; feedback is immediate perceivable result; constraints can be physical, cultural, logical. (Secondary summaries; note some hits were low-quality.) — [Actionable Books summary](https://www.actionablebooks.com/summaries/the-design-of-everyday-things); [Medium summary](https://medium.com/the-oxford-comma/book-summary-the-design-of-everyday-things-by-donald-norman-ad8c508c7295)
- Nielsen's ten heuristics: visibility of system status; match between system and real world; user control and freedom; consistency and standards; error prevention; recognition rather than recall; flexibility and efficiency; aesthetic and minimalist design; help users recognize, diagnose, recover from errors; help and documentation. — [NN/g ten heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)
- Krug: aim for self-evident, then self-explanatory; clicks are fine if each is a mindless, unambiguous choice; cut "happy talk" and instructions nobody reads; users scan, satisfice, muddle through. (Secondary summaries.) — [Medium: Don't Make Me Think](https://medium.com/low-pass-filter/dont-make-me-think-4763547bc1cc); [concepts summary](https://concepts.dsebastien.net/concept/dont-make-me-think/)
- Victor, Learnable Programming: a learning environment must be designed to explain itself; show the data and dynamic behaviour rather than static structure; do not force learners to simulate the machine; memorising incidental minutiae is a barrier, not learning. — [Learnable Programming](https://worrydream.com/LearnableProgramming); [oleb.net](https://oleb.net/blog/2012/09/learnable-programming/)
- Victor, Magic Ink: summarised as saying interaction is often a crutch for weak information design; think like a graphic designer. [unverified; third-party summary only] — [greggman notes](https://games.greggman.com/game/thoughts-on-magic-ink/)
- Kay: "doing with images makes symbols" — enactive (doing), iconic (images), symbolic stages from Bruner/Piaget/Papert; Kay's own retrospective framing, challenged by some. [primary essay not retrieved] — [Kay slide summary](https://www.softwareresearch.net/fileadmin/user_upload/Teaching/WS16/SE_Alan_Kay.Doing_with_images_makes_symbols.pdf); [Matuschak notes](https://notes.andymatuschak.org/zEGqBPb51ecnLemaxDZbdXm)

### Inferences
- Norman mapping and signifiers: put the Arabic word next to or on the object it names; highlight the tappable object; give a gentle sound or glow as immediate feedback. Constraints: show only the plausible 2-4 choices per errand.
- Norman on errors / Nielsen 9: a wrong answer should show the right one in plain language and let the player retry at once, never a red "failure" screen (also fits the rule that Quran text never appears in failure screens).
- Nielsen 6 (recognition over recall): keep the picture and the word visible together; do not demand typing from memory early. Nielsen 3: always an exit and undo; Back and pause on every screen. Nielsen 1: show where in the errand the player is, without a score.
- Krug: no welcome speeches or tutorials; teach by the first errand itself. Delete anything that reads "blah, blah".
- Victor/Kay ladder: do (walk to the baker, pick up bread) then see (picture with word) then read (script) then write; matches teaching "through errands". Make the state of the world visible (the bread in the basket) rather than describing it.

### Gaps
- Primary-text quotes with page numbers for Norman and Krug not obtained; Victor's and Kay's primary essays only partly read.

## 3. Kathy Sierra, Julie Zhuo, John Maeda, Edward Tufte

### Takeaway
Sierra: make the learner capable ("make users awesome"), not the product; she is sceptical of gamification as operant conditioning. Maeda: simplicity is "subtracting the obvious, adding the meaningful". Tufte: maximise the share of ink that carries information; remove chartjunk, although the evidence for his claims is mixed.

### Cited Findings
- Sierra's premise: shift from making awesome products to making users awesome; goal is capable, skilful users, not brand passion; "badass" = higher perceptual resolution (e.g. wine, chess, music). — [Brikman review](https://www.ybrikman.com/blog/2017/02/12/badass-making-users-awesome/); [Mark Bernstein review](https://markbernstein.org/Apr15/BadassMakingUsersAwesome.html); [Business of Software](https://businessofsoftware.org/2013/03/kathy-sierra-on-designing-for-badass)
- Sierra reportedly calls typical gamification operant conditioning, "another form of Skinner" (reviewer paraphrase). One critic says her strategies are heuristically sound but over-stated as cognitive truths. — [mtlynch book report](https://mtlynch.io/book-reports/badass/); [Mark Bernstein](https://markbernstein.org/Apr15/BadassMakingUsersAwesome.html)
- Maeda's ten laws: Reduce, Organize, Time, Learn, Differences, Context, Emotions, Trust, Failure, The One ("subtracting the obvious, and adding the meaningful"). Organize: grouping makes many seem fewer. Learn: knowledge makes everything simpler. — [fs.blog](https://fs.blog/the-laws-of-simplicity/); [Graham Mann notes](https://grahammann.net/book-notes/the-laws-of-simplicity-john-maeda)
- Tufte: data-ink ratio (share of ink that shows data), erase non-data and redundant ink; chartjunk; graphical excellence gives the most ideas in shortest time with least ink. Empirical studies are mixed: one found decoration slightly aided long-term recall and was preferred; another found no effect. — [Georgia Tech Tufte notes](https://faculty.cc.gatech.edu/~stasko/7450/13/Notes/tufte.pdf); [Cornell slides](https://info3312.infosci.cornell.edu/slides/14-tuftes-world.html)

### Inferences
- Sierra: measure success as "can the player now buy bread in Arabic", reflected back as a plain "You can now say..." list the player owns (a personal word-book), not points. This replaces XP/streaks while still showing growth; resolution = notice more roots and details over time.
- Maeda "Time/Hide" and "Trust": hide waiting (preload scenes quietly); Trust: say plainly what the game stores (on-device only).
- Tufte: any progress display (word book, map of errands) should have no decorative frames or gradients; matches the art bible but beware over-pruning, since mixed evidence says light decoration is not harmful. For a calm game, warmth is allowed.
- Julie Zhuo: no cited material was retrieved (see Gaps).

### Gaps
- Nothing retrieved from Julie Zhuo (The Making of a Manager, newsletter); do not attribute claims to her from this file.
- Sierra's cognitive-load and "minimum badass user" content only via reviews.

## 4. Calm technology, humane technology, dark patterns

### Takeaway
Weiser/Brown and Case give a direct brief for a peaceful game: require minimal attention, use the periphery (ambient cues), keep the user in control of what is central, work when things fail. Dark-pattern catalogues and a 2026 child-education paper show streak guilt and nagging as harms; avoid them by design.

### Cited Findings
- Weiser and Brown (1995): calm technology engages both centre and periphery of attention and moves between them; the periphery informs without overburdening; the person, not the environment, controls the move; "offer, but not demand"; not all technology should be calm (they cite video games as meant to excite). Examples: inner office windows, Internet Multicast, Dangling String. — [Designing Calm Technology](https://calmtech.com/papers/designing-calm-technology)
- Amber Case's eight principles: smallest possible amount of attention; inform and create calm; use the periphery; amplify the best of technology and humanity; communicate without necessarily speaking; work even when it fails; minimum technology needed; respect social norms. — [calmtech.com](https://calmtech.com/)
- Brignull/deceptive.design types: sneaking, forced action, hard to cancel, preselection, obstruction, hidden subscription, hidden costs, trick wording, visual interference, fake social proof, fake urgency, nagging, fake scarcity, disguised ads, confirmshaming, comparison prevention, addictive design, currency confusion. — [deceptive.design types](https://www.deceptive.design/types)
- A 2026 ACM IDC paper (Kuo, Zhao, Scott) on Duolingo with parent-child pairs introduces "exit dark patterns", "goal drift" (learning becomes keeping metrics) and "gamified obligation" (guilt on leaving). Secondhand. — [deceptive.design article](https://deceptive.design/articles/the-evil-bird-and-the-right-to-disconnect-children-s-vulnerability-to-exit-dark-patterns-in-gamified-educational-apps)
- Streaks: a Journal of Consumer Research study (as reported by The Decision Lab, original not read) says users who break a streak are more likely to quit. Sad-mascot guilt notifications described. [unverified original] — [The Decision Lab](https://thedecisionlab.com/insights/consumer-insights/streak-creep-the-perils-of-too-much-gamification)
- Center for Humane Technology: humane design respects human nature rather than exploiting it; attention as finite; official Design Guide not retrieved; principle wording in drafts only. [partly unverified] — [CHT What We Do](https://www.humanetech.com/humane-product-design); [Draft Humane Product Principles](https://humanetech.substack.com/p/draft-humane-product-principles)

### Inferences
- Periphery for this game: morning light, ambient sound, a quiet glow on the next errand object instead of popups or a quest log; the player pulls detail (tap for word) rather than being pushed.
- Work when it fails: offline-capable, if audio fails show text and picture; never a dead end.
- Ban list for Suite: no push notifications, no "we miss you", no mascot sadness, no countdown/fake urgency, no preselected "share" or "notify" boxes, no confirmshaming copy ("No thanks, I don't want to learn"), no hidden costs (there are none), no currency confusion. Closing the game is silent and free.
- Add a "leave any time, resume exactly here" screen; make quitting the easiest action to find.
- Because the game has an ending condition (an errand is done), build natural stopping points (finishing a morning) rather than infinite loops, countering "addictive design".

### Gaps
- Official CHT Design Guide text and Zhuo-era product-process material not retrieved. No peer-reviewed study specifically on confirmshaming in learning apps found.

## 5. Usability testing practice

### Takeaway
Run small, repeated rounds: about 5 users per round (NN/g) or even 3 monthly (Krug), think-aloud, silent facilitator, fix then retest. Test each distinct user group separately.

### Cited Findings
- NN/g: 5 users find about 85% of problems (model: one user finds about 31%; N(1-(1-L)^n)); better to run three rounds of five than one study of fifteen; one user can mislead, three show behavioural diversity; for distinct groups test 3-4 per group (two groups) or 3 per group (three or more). — [NN/g 5 users](https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/)
- Think-aloud: recruit representative users, give representative tasks, ask them to talk while working, stay quiet; avoid interrupting or leading; discard data where you biased the user; qualitative not statistical; prompt if they go silent. — [NN/g think aloud](https://www.nngroup.com/articles/thinking-aloud-the-1-usability-tool/)
- Krug (Rocket Surgery Made Easy): one morning a month, three participants, about 30-60 min each, debrief same day; recruit loosely. Secondary sources, session length varies. — [Brikman review](https://www.ybrikman.com/blog/2014/09/26/dont-make-me-think-revisited/); [Medium interview](https://medium.com/@oliverlindberg/63dedddbd0ae); [MarketingProfs](https://www.marketingprofs.com/articles/2012/7089/usability-testing-on-a-dime-a-three-week-diy-plan)

### Inferences
- Phone protocol for non-technical people (hallway-style): hand them Edward's own phone or theirs with the URL, no explanation, one task ("buy bread"), ask them to say what they think; watch hands, hesitations, taps that miss; do not help for 30 seconds. Screen-record only with consent (no faces needed in the recording; point camera at screen).
- Distinct groups for this game: complete Arabic beginners, heritage speakers, older adults, and non-Muslim and Muslim players (all-male cast constraint means observers are men, per hard rules; test participants as the owner allows). Test 3 per group per round.
- Round 1: first 60 seconds (do they know what to tap?). Round 2: after one fix pass. Log in `docs/CYCLE_LOG.md`.
- Pair with automated Suite checks (target size 48 px, contrast, reduced motion) since the owner reads on a phone.

### Gaps
- No specific guidance retrieved on remote phone testing tools or consent practice; recruiting non-technical elders not covered.

## Compact checklist for Arabic World (derived; inferences)
1. Targets at least 48 px, 8 px apart; hit area bigger than the visible shape.
2. One errand, one primary action per screen; hide everything else.
3. Every tap gets immediate calm feedback (visual plus optional click).
4. Wrong answer: show correct form, retry at once, no failure screen.
5. Word beside object (mapping); picture first, script later (Kay ladder).
6. Honour reduced motion; slow, small movement.
7. No streaks, XP, nagging, guilt, fake urgency; quitting is easy and silent.
8. Growth shown as a plain personal word-book, not points.
9. Test 3-5 people per round on real phones, think-aloud, fix, retest.
