# Game-design legends: calm, explorable, teach-without-words design for a phone-first Arabic language game

Method note: search results returned mostly secondary summaries; fetched pages were used where possible. Quotes are kept under 15 words. Anything not confirmed in a primary or clearly attributed source is marked [unverified]. Many Miyamoto/Wright/Schell specifics were not retrievable (see Gaps).

## Miyamoto / Nintendo: teaching through level design, kishotenketsu, Animal Crossing's daily rhythm

### Takeaway
Nintendo teaches by placing safe, repeatable situations in the world (World 1-1 uses no text), structures each lesson as introduce, develop, twist, conclude (kishotenketsu), and Animal Crossing uses a real-time clock and small daily stimuli to create gentle return loops. All three map directly to a no-text, errand-based, 08:00-11:00 world.

### Cited Findings
- A summary of an IGN piece says Miyamoto described World 1-1 as teaching jumps, hazards and power-ups with no on-screen text. This is a secondhand aggregator repost; no direct Miyamoto quote appears in it. — [DEV Community repost of IGN](https://dev.to/gg_news/ign-miyamoto-explains-how-mario-world-1-1-was-created-36bm)
- Same summary: each block, enemy and gap was placed to teach, challenge and entertain in roughly equal measure; pacing and the "geometry of motion" were refined. — [DEV Community repost of IGN](https://dev.to/gg_news/ign-miyamoto-explains-how-mario-world-1-1-was-created-36bm)
- Analyst commentary: elements are introduced only when the player is ready; the first Goomba's jump-or-die lesson is followed by a coin and a mushroom reward; the opening screen teaches nearly all basic skills. Blog-level analysis, not Miyamoto. — [Gamified UK](https://www.gamified.uk/2018/11/01/learning-from-games-onboarding-and-mario/); [Medium analysis](https://medium.com/swlh/the-perfect-game-tutorial-analyzing-super-marios-level-design-92f08c28bdf7)
- Koichi Hayashida (Super Mario 3D Land director/producer) says level structure is based on the four-act form kishotenketsu: introduce an idea, develop it, twist it, conclude. Reported via Game Developer summary; Wikipedia-derived pages add that Miyamoto co-developed the four-step process, which is a single secondary source. — [Game Developer coverage of Hayashida interview (via search summary)](https://www.nintendolife.com/news/2012/04/super_mario_3d_land_director_shares_level_design_inspirations); [Koichi Hayashida, Wikipedia](https://en.wikipedia.org/wiki/Koichi_Hayashida)
- Game Maker's Toolkit (Mark Brown) breaks Nintendo level design into introduction, development, twist, conclusion using Super Mario 3D World, with no conflict/antagonist needed. — [MCV summary of GMTK video](https://www.mcvuk.com/development/video-nintendos-level-design-secrets-in-four-steps)
- 3D Land levels are each built around one mechanic that is mostly unique to that level (e.g. collapsing panels in 2-2). — [Game Developer summary of 3D Land design](https://gamedeveloper.com/design/lessons-from-suzy-cube-level-design-breakdown)
- Animal Crossing: the original was conceived around the 64DD's internal clock; Eguchi says the clock lets players share the same time and visit others at different times. — [Wikipedia/Eguchi summaries via search](https://en.wikipedia.com/wiki/Katsuya_Eguchi)
- Eguchi (GDC talk, secondhand coverage): daily stimuli (fossils, mail, new store stock) and customization drive daily return; he reportedly conceded that some inconvenience is part of the pull. — [Game Developer GDC coverage](https://www.gamedeveloper.com/design/gdc-is-that-a-franchise-in-your-pocket-an-i-animal-crossing-wild-world-i-case-study)
- Iwata Asks (New Leaf) calls the unity of in-game time passing with real time a nice aspect of the series; a 2008 session describes a "bed time, wake up and play again tomorrow" rhythm. Reported, not verbatim. — [Iwata Asks: New Leaf](https://iwataasks.nintendo.com/interviews/3ds/animalcrossing-newleaf/0/1)

### Inferences
- Each errand/scene = one kishotenketsu lesson: (1) introduce a word in a safe setting (e.g. bread seller shows "khubz" by handing bread), (2) develop with variation (other goods, quantities), (3) twist (a word reused in a new context, or a root pattern noticed), (4) conclude with a quiet reward (the errand completes, a neighbour nods). No antagonist or failure needed.
- 1-1 principle: the first screen must be safe to explore with one obvious verb (tap/walk toward the vendor); teach by placement, not tutorial text. Phone-friendly: the whole lesson fits a 2-3 minute errand.
- Animal Crossing's clock idea fits the fixed 08:00-11:00 world: a daily "morning" with small changing stimuli (a new stall item, a neighbour greeting) rewards short return visits without streaks or XP. Avoid its "deliberate inconvenience" pull; it conflicts with the calm, no-pressure goal. [inference]

### Gaps
- No primary Miyamoto quote on World 1-1 retrieved; the "Boss Keys" episode and "oshieru" claims in one result were unverifiable and are excluded.
- No Iwata Asks page dedicated to Eguchi's clock philosophy found.

## Jenova Chen / thatgamecompany: flow, emotional arc, wordless communication, minimal HUD

### Takeaway
Chen's thesis proposes the player tunes difficulty through the game's own core actions (no menus, no fail screens), and Journey removed HUD, chat, names and competition so the only exchange is emotional. A no-fail, no-HUD, gesture-and-context language game follows the same logic.

### Cited Findings
- Chen's 2006 USC thesis "Flow in Games" proposes active dynamic difficulty adjustment: players choose difficulty subconsciously through core mechanics, based on Csikszentmihalyi's flow theory. — [Flow in Games abstract (jenovachen.info)](https://jenovachen.info/abstract)
- Game Developer interview: in a racing game driving itself would set difficulty; he wants changes "not in a way that might break" flow; goal is to expand the range of emotions games evoke. — [Game Developer interview](https://www.gamedeveloper.com/design/go-with-the-i-fl0w-i-jenova-chen-on-console-independence)
- In flOw the player controls challenge by choosing when to descend to harder creatures after eating smaller ones. — [arXiv paper describing flOw](https://arxiv.org/pdf/1806.04471)
- Journey (MCV/DEVELOP, Feb 2013): no weapons, HUD, lobby or visible names; the only social tool is a chirp; resources respawn so neither player is disadvantaged; Chen wanted interaction about emotions, "rather than exchange of blows." — [MCV](https://www.mcvuk.com/jenova-chen-reveals-secrets-of-journey-design/)
- Journey names were shown only after completion at Sony's suggestion; Chen accepted losing virality to focus on emotion (DICE talk, per Japanese writeup). — [Game Watch Impress (Japanese)](https://game.watch.impress.co.jp/docs/news/593897.html); [Destructoid notes on GDC talk](https://www.destructoid.com/journey-inspired-by-world-of-warcraft-loneliness/)

### Inferences
- Make difficulty player-chosen through the world itself: the player decides which errand/vendor to approach next (easier nouns first, then verbs, then sentences), instead of a difficulty setting. This satisfies "no XP, no streaks."
- Minimal HUD: no score, timer or meters on screen except the optional Quran meter in sanctuary scenes only; use a single gentle morning-light cue for time.
- Faceless-but-expressive hero: convey emotion through posture, gesture and thobe movement (Journey's robed figure is the closest precedent; its face-less design fits the hard rule). Journey's chirp suggests a single, non-lexical "greet" gesture could serve as a safe social verb. [inference]

### Gaps
- Primary GDC 2013 "Designing Journey" talk text/video not retrieved; arc details (the dramatic structure) not verified here.
- Sky not researched (no results retrieved).

## Fumito Ueda: design by subtraction

### Takeaway
Ueda removed game-like elements (stats, scoring, clutter) so the few that remain carry meaning; hand-holding, not tutorial text, taught cooperation. For Arabic World: cut any element that is not the world, the words, or the errand.

### Cited Findings
- 2002 interview: "I didn't hold back on removing and subtracting elements as needed." Ico had "no stats, no scoring," which Ueda worried players might not accept. — [Shmuplations, ICO interviews](https://shmuplations.com/ico/)
- 2011 interview: removing the "game-like" elements he could; at the "Don't let go" scene nothing tells Ico to jump, leaving it to the player. — [Shmuplations, ICO interviews](https://shmuplations.com/ico/)
- Hand-holding was a way to create direct communication between characters (2002). — [Shmuplations](https://shmuplations.com/ico/)
- The phrase "design by subtraction" is applied by commentators to questioning whether each element is important enough to stay. — [Film Stories](https://filmstories.co.uk/features/ico-level-design-when-less-is-more/)

### Inferences
- Subtraction checklist for every scene: remove text that the picture already says; remove UI that the world already shows (e.g. a stall's goods are the vocabulary list).
- Relational mechanic instead of menus: a simple "walk with a guide/neighbour" or "follow a shopkeeper's gesture" can teach without instructions (all-male cast).
- Quiet is a feature; no music rule is aligned with Ueda's sparing audio [unverified for his exact stance on silence].

### Gaps
- Ueda's own words on HUD/silence not found in the fetched interview page; Shadow of the Colossus specifics not retrieved. Some commentary sources (Blake Crosley essays) were not used because quotes were unreliable.

## Calm/cozy designers: A Short Hike, Unpacking, Stardew Valley, Firewatch

### Takeaway
The best cozy games are small in scope, tell stories through objects and places, give free exploration with no failure, and respect player time; sources found are thinner than the other sections, so verified points are limited.

### Cited Findings
- A Short Hike (Adam Robinson-Yu, GDC 2020): he shelved a larger project to build a small prototype; players roam the island freely with hiking, climbing and soaring as core verbs; trails or backcountry route is the player's choice. — [80.lv summary](https://80.lv/articles/gdc-a-short-hike-postmortem); [GDC Vault listing](https://gdcvault.com/play/1026613/Independent-Games-Summit-Crafting-A)
- Unpacking (Witch Beam, GDC 2022): narrative inferred from objects, kept linear (no branching), made without text or visible characters; the team wrote a life story for the character and asked whether she would have kept each item. — [Game Developer GDC 2022 summary](https://www.gamedeveloper.com/gdc2022/gdc-2022-unpacking-a-narrative-through-1-000-household-items); [GamesRadar interview](https://www.gamesradar.com/the-making-of-unpacking-developer-witch-beam-on-bringing-the-moving-indie-hit-to-life)
- Stardew Valley (Eric Barone): says he prefers working in an isolated bubble and will not add microtransactions (per press reports); no design-pressure specifics found. — [GamesRadar](https://gamesradar.com/games/simulation/eric-barone-isnt-worried-about-pressure-on-stardew-valley-follow-up-haunted-chocolatier-its-a-game-that-im-deciding-to-make-i-dont-need-to-make-it)

### Inferences
- Unpacking's "items tell stories" suits vocabulary: an object-filled scene (market stall, tea tray) lets the player infer meaning by arranging/choosing items, a calm puzzle with no wrong-state penalty. The Unpacking cast is female-focused in narrative, so borrow only the method, not the content. [inference]
- A Short Hike's small, dense map is a model for the old quarter: one walkable quarter, short sessions, free routing. The narrow scope also meets Edward's $0 budget.
- No fail states: wrong choices produce a gentle redirect, not a penalty (consistent with Heaven's Vault below).

### Gaps
- Firewatch, Wholesome Games, Stardew kindness mechanics: no usable sources retrieved. A Short Hike's no-fail, NPC writing and session length are not verified in the sources fetched.

## Raph Koster, Jesse Schell, Sid Meier, Will Wright: which ideas apply to a language game

### Takeaway
Koster's "fun is learning patterns" is the most directly applicable theory: language is pattern learning. Meier's interesting decisions should be small meaningful choices (which word/which item), and Wright's toy-like open possibility space suits free exploration; Schell's lenses were not retrieved.

### Cited Findings
- Koster, A Theory of Fun: "Fun in games arises out of mastery... comprehension"; boredom comes when there are no patterns to absorb or the pattern is over your head. — [Koster, Theory of Fun 10 Years Later (PDF)](https://www.raphkoster.com/wp-content/uploads/2026/07/Theory-of-Fun-10-Years-Later.pdf)
- That PDF attributes "fun is just another word for learning" originally to Chris Crawford (as "emotional response to learning"), not Koster. — [Koster PDF](https://www.raphkoster.com/wp-content/uploads/2026/07/Theory-of-Fun-10-Years-Later.pdf)
- Koster separates flow from fun: flow relates to exercising mastery, not learning. — [Koster PDF](https://www.raphkoster.com/wp-content/uploads/2026/07/Theory-of-Fun-10-Years-Later.pdf)
- Sid Meier: "a good game is a series of interesting choices" (wording varies with "decisions"); lessons from Soren Johnson include "the player should be the star," and research should not require players to read the designer's books. — [Game Developer analysis of Meier's lessons](https://www.gamedeveloper.com/game-platforms/analysis-sid-meier-s-key-design-lessons); [Cato commentary on origin of the quote](https://www.cato.org/commentary/reviewing-sid-meiers-lessons-game-design-civilization-wargames)
- Meier saw Will Wright's SimCity as a "software toy," admired but frustrated by its aimlessness. — [Filfre summary](https://www.filfre.net/?p=3307)

### Inferences
- Koster: structure the ladder so every scene shows a pattern slightly beyond the player's current grasp (a root family, a plural pattern), then lets them notice it. Boredom check: if all patterns are known, advance the ladder.
- Meier: an "interesting decision" in language is choosing among plausible phrases with different consequences in the scene (greet formally or casually; ask for price or quantity), not a quiz. The neutral-correct-reply rule keeps decisions universal.
- Wright's toy: keep a sandbox of the quarter where words can be tried freely (point, name, combine) without goals. [inference]
- Meier's "one good game beats two" supports a single core loop (errand + noticing words) with the Quran track optional.

### Gaps
- Will Wright "possibility space" talk and Jesse Schell's Art of Game Design lenses: no sources retrieved; I would not cite specific lenses. Suggested follow-up: Schell's book lenses (Curiosity, Problem Solving, Flow) from the book directly.

## Language as gameplay: Heaven's Vault, Chants of Sennaar, Obra Dinn, Kentucky Route Zero, Disco Elysium

### Takeaway
The strongest verified guidance is from Chants of Sennaar: each word appears in at least two situations, hypotheses are tentative, and difficulty is tuned by the number of unresolved words. Heaven's Vault adds that wrong translations should be allowed; Obra Dinn adds batched confirmation to avoid guess-spamming.

### Cited Findings
- Chants of Sennaar (Game Developer interview, Rundisc): every word must be seen "at least twice" in different situations; players note tentative hypotheses; unresolved-word count is the difficulty lever; glyph forms signal grammar (verbs, subjects, places) consistently; hints draw attention instead of explaining; disorientation is accepted as part of being a traveller, balanced with tools to succeed. — [Game Developer](https://gamedeveloper.com/design/immersing-players-in-the-culture-of-a-people-with-language-puzzler-chants-of-sennaar)
- Same source: when playtesters struggle, designers add occurrences, clues or contexts instead of simplifying rules. — [Game Developer](https://gamedeveloper.com/design/immersing-players-in-the-culture-of-a-people-with-language-puzzler-chants-of-sennaar)
- Sennaar's visual language: bold palette and clear-line style; each people's speech style (blunt vs winding) is readable without translation; the team took inspiration from Heaven's Vault. — [Game Developer visual deep dive](https://gamedeveloper.com/design/deep-dive-the-visual-tapestry-of-i-chants-of-sennaar-i-)
- Sennaar's developer says glyphs are puzzle elements like doors and keys; no linguists consulted; "living language" learned from speakers in an active world. — [Exputer interview](https://exputer.com/interviews/chants-of-sennaar-no-plan-for-dlc/); [Berkeley Historical Society write-up](https://berkeleyhistoricalsociety.org/chants-of-sennaar-creator/)
- Heaven's Vault (inkle, Jon Ingold): the language was probably the hardest single design piece, about twenty prototypes; players may mistranslate and the game does not say if they are wrong; Ingold notes games are usually cautious about this ambiguity. — [Sixth Axis interview](https://www.thesixthaxis.com/2018/04/27/interview-talking-with-inkles-about-deciphering-ancient-language-in-heavens-vault/); [GoNintendo summary](https://gonintendo.com/archives/327504-heaven-s-vault-devs-on-the-importance-of-letting-players-get-things-wrong)
- Return of the Obra Dinn (Lucas Pope): the game confirms deductions only in batches of three correct entries, so guessing is discouraged but progress is felt. Rationale is critics' interpretation; no Pope quote found. — [Film Stories](https://filmstories.co.uk/?p=83249); [TechRaptor review](https://techraptor.net/content/return-of-the-obra-dinn-review)

### Inferences
- Adopt "every word twice in two contexts" as a content rule (checkable by a Suite C test: each new word appears in at least two scenes/objects before it is assumed known).
- Notebook with unresolved vs. confirmed words (no score): the player's own notebook is the only meter.
- Batch confirmation is stronger than instant red/green feedback; but for calm, replace a correct/incorrect mark with gentle in-world response (the vendor hands the wrong item and smiles). Avoid faces: use gesture and item swaps. [inference]
- Consistent visual grammar for MSA: e.g. colour or stall icon for nouns vs. verb actions; roots shown consistently, as Sennaar's glyph grammar rule.
- "Allowed to be wrong" (Heaven's Vault) matches no-fail-state rule: misunderstandings cause a funny/harmless result, then a hint.

### Gaps
- Kentucky Route Zero and Disco Elysium: no sources retrieved; do not cite specifics. (Both rely heavily on text/dialogue choices and unreliable-world texture, likely less relevant to a no-text-first design. [unverified])
- Obra Dinn rationale from Pope himself not found.
