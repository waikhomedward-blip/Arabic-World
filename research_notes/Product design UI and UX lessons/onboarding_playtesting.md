# Onboarding, player psychology and playtesting methods for a calm phone-first learning game (Arabic World)

## Q1. Celia Hodent, The Gamer's Brain: game UX pillars and checklists

### Takeaway
Hodent splits game UX into two pillars: usability (ease of use) and engage-ability (motivation, emotion, flow). Her usability pillars adapt Nielsen's 1994 heuristics. I could not retrieve the full list of seven pillars or her checklist text, only secondary descriptions.

### Cited Findings
- Hodent frames game UX as two pillars, usability and "engage-ability". Usability is ease of use. Engage-ability is the game's capacity to be fun and engaging. The book turns them into a practical checklist. — [Creative Bloq interview](https://www.creativebloq.com/features/how-neuroscience-and-ux-impacts-video-game-design); [Routledge listing](https://routledge.com/9781498775502)
- The "Seven Usability Pillars for Game UX" are adapted from Jakob Nielsen's 1994 usability guidelines. "Signs and Feedback" is one named pillar. — [Introduction to UX in Game Design (uxdesign.cc)](https://uxdesign.cc/ux-and-video-game-design-5d8bcc50be67)
- Signs are the visual, audio and haptic cues that tell players what to do. They are either informative or inviting, and feedback should be quick and clear. Good signs can reduce the need for tutorial text. — [uxdesign.cc summary of Hodent's framework](https://uxdesign.cc/ux-and-video-game-design-5d8bcc50be67)
- Hodent warns that removing HUD elements for diegetic purity can raise cognitive load (demands on attention and memory) and cause frustration. — [Creative Bloq](https://www.creativebloq.com/features/how-neuroscience-and-ux-impacts-video-game-design)
- Engage-ability breaks down into motivation (why players engage), emotion (what they feel) and flow (staying focused). — [Routledge listing](https://routledge.com/9781498775502); [Competence, autonomy, relatedness: Hodent on games design (UX Podcast)](https://uxpod.com/episodes/competence-autonomy-relatedness-celia-hodent-on-games-design.html)
- Chapter order is Usability, Engage-ability, Design Thinking, then user research and analytics. The ToC includes "Mental Models and the Player-Centered Approach". — [Book ToC](https://www.obalkyknih.cz/file/toc/985189/pdf)
- The UX Podcast episode title ("competence, autonomy, relatedness") shows Hodent uses self-determination theory for motivation. — [UX Podcast](https://uxpod.com/episodes/competence-autonomy-relatedness-celia-hodent-on-games-design.html)
- A second edition from CRC Press is listed with a 2026 copyright. I did not check whether the framework changed. — [Routledge 2nd ed.](https://www.routledge.com/The-Gamers-Brain-How-Neuroscience-and-UX-Can-Impact-Video-Game-Design/Hodent/p/book/9780367638184)

### Inferences
- Nielsen-derived usability pillars translate into checks a lab can run: is the next action signposted, is feedback immediate, can the player recover from errors, and does everything needed stay visible. Arabic World's no-XP/no-streak stance leaves engage-ability resting on competence, autonomy and relatedness (a helped neighbour), which fits Hodent's framing.
- Her HUD-removal warning matters here: a minimalist "calm" screen should not hide the current errand or hint.

### Gaps
- Exact names and wording of all seven usability pillars and her memory/attention checklists were not found. A library copy of the book is needed [unverified beyond "Signs and Feedback"].
- Her specific claims on attention, memory (chunking, recognition over recall) and the emotion model were not retrieved from primary text.

## Q2. Onboarding in great games and apps (Portal, Half-Life 2, Celeste, Monument Valley, Alto's Odyssey); FTUE metrics; skill atoms

### Takeaway
Best-documented practice: teach one skill at a time, let early levels gate the skill without text, test the opening constantly, and watch a step-by-step funnel for drop-off. Evidence on Monument Valley and Alto's Odyssey was not found. Portal and Celeste claims come from secondary sources.

### Cited Findings
- Celeste has no tutorial in the usual sense. Early levels are designed to teach the dash without spelling it out, and the game guarantees the player can jump before harder jump problems. Advanced moves were available from the start but not required until later. — [Wayline, silent tutorials](https://www.wayline.io/blog/silent-tutorials-player-learning); [Wayline, onboarding level design](https://www.wayline.io/blog/tutorials-as-onboarding-level-design) (secondary blogs)
- Portal reportedly teaches the portal gun without tutorial text. Playtesters kept saying it was a "great tutorial", which led Valve to learn that testers did not realise it was the actual game. — [Wayline](https://www.wayline.io/blog/silent-tutorials-player-learning); [Game Developer, Thinking With Portals](https://www.gamedeveloper.com/design/thinking-with-portals-creating-valve-s-new-ip). Primary source to check: [GDC 2008 Portal post-mortem (Valve PDF)](https://cdn.fastly.steamstatic.com/apps/valve/2008/GDC2008_PortalPostMortem.pdf) (not opened)
- Half-Life 2's gravity gun was moved much earlier in the game because playtesters loved it. — [GMTK, Valve's Secret Weapon](https://gmtk.substack.com/p/valves-secret-weapon)
- Per GMTK, Valve's lesson is that players do not learn well when stressed, and they do not look up. — [GMTK](https://gmtk.substack.com/p/valves-secret-weapon)
- Dan Cook's skill-atom model (Gamasutra, 2007) describes a game as skill chains: directed graphs of skill atoms (core loops) that build on each other. A skill atom has five elements: action, simulation, feedback, synthesis, and so on. It is one of few models that account for the order in which proficiency is acquired. — [Game Developer repost, Chemistry of Game Design](https://www.gamedeveloper.com/pc/feature-the-chemistry-of-game-design-); [Horn, Cooper, Deterding paper](https://eprints.whiterose.ac.uk/120653/1/Horn_Cooper_Deterding_CTAGAMES.pdf) (secondary summaries; original not opened)
- Raph Koster criticises the chains as too linear; atoms nest arbitrarily. — [Koster, Cooking up Chemistry](https://www.raphkoster.com/2007/07/23/cooking-up-chemistry/)
- FTUE method: log every tutorial step as an event and compare reach per step to find the largest drop-offs. Funnels show where players leave but not why, so pair them with qualitative observation. — [GameAnalytics FTUE tips](https://gameanalytics.com/blog/tips-for-a-great-first-time-user-experience-ftue-in-f2p-games); [Unity FTUE tips](https://unity.com/how-to/10-first-time-user-experience-tips-games); [Playio](https://blog.playio.co/mobile-game-onboarding-retention)
- Common advice is to keep the tutorial short (one source says under five minutes), allow skipping, and reach real gameplay quickly. Session 1 to session 2 conversion is named as the leading indicator of Day 1 retention. — [Playio](https://blog.playio.co/mobile-game-onboarding-retention); [PocketGamer.biz](https://www.pocketgamer.biz/first-impressions-count-creating-the-ultimate-first-time-user-experience)
- Day 1 retention benchmarks vary widely by source, from about 21-26% average to 45% called strong. They are industry numbers for monetised games and are not suited to this project. — [GameGrowthAdvisor 2026](https://gamegrowthadvisor.com/blog/2026-03-17-mobile-game-retention-strategies-2026/); [Roblox retention docs](https://create.roblox.com/docs/en-us/production/analytics/retention)
- Roblox's onboarding docs and techniques pages list the standard techniques (guiding with environment, small first goal). — [Roblox onboarding](https://create.roblox.com/docs/en-us/production/game-design/onboarding); [Roblox techniques](https://create.roblox.com/docs/production/game-design/onboarding-techniques) (not opened in detail)

### Inferences
- For Arabic World: each errand teaches one word or skill atom (action, response from a neighbour, feedback, then reuse in a later errand). Put the first word and the first success inside the opening seconds, with no text wall. [Design inference]
- A lab-friendly FTUE funnel needs no analytics vendor. The existing Playwright run can log step reached (scene entered, first word heard, first errand done, second errand started), and a local-only counter can serve real volunteers. Retention benchmarks should be ignored because the game has no streaks or XP.
- The "great tutorial, but when does the game start?" Portal anecdote warns about the opposite risk: a calm first errand may feel like only a tutorial unless it has a small real goal.

### Gaps
- No evidence found on how Monument Valley or Alto's Odyssey onboard. Targeted postmortems or GDC talks would be needed.
- Original Cook article, Portal post-mortem and Half-Life 2 level-design talks were not opened. Valve's actual "first 60 seconds" practices are not documented beyond the secondary accounts above.
- The elements of Cook's five-part skill atom were only partly listed (action, simulation, feedback, synthesis); the full list is unverified.

## Q3. Games user research methods ($0): Valve, Microsoft RITE, PLAY heuristics, think-aloud on phones, telemetry, tester counts

### Takeaway
RITE (fix after one or two testers, then retest) is the best fit for AI agents plus a few volunteers. Valve's silent-observation rule and Nielsen's "five per round, several rounds" give a cheap protocol. PLAY heuristics are too long for casual use but can be pared down.

### Cited Findings
- RITE was defined in 2002 by Medlock, Wixon, Fulton, Terrano and Romero at Microsoft Games Studios and Ensemble Studios, using the Age of Empires II tutorial as the case study. — [Wikipedia, RITE Method](https://en.wikipedia.org/wiki/RITE_Method); [Patton Associates PDF](https://jpattonassociates.com/wp-content/uploads/2015/04/rite_method.pdf)
- RITE uses a standard usability setup (target population, test script, think-aloud) but changes the interface as soon as a problem and clear fix are identified, even after a single participant. Later participants test the revised version. — [Wikipedia, RITE Method](https://en.wikipedia.org/wiki/RITE_Method)
- Stated principles: solve problems as soon as possible, and make decision-makers part of the research team. It has no defined stopping point. In the Age of Empires II case, no changes were needed after 10 participants, so 6 more were run. A Japanese summary gives different figures (16 participants, 6 revisions), unverified against the paper. — [Cavacopedia RITE summary](https://cavac.at/cavacopedia/RITE%20Method); [issoh.co.jp](https://www.issoh.co.jp/md/column/7834)
- Valve playtests with random gamers, staff and children. Designers run the tests themselves. Observers stay silent and give no hints. Body language is considered more revealing than post-game answers. Testers' proposed solutions are usually ignored. — [GMTK, Valve's Secret Weapon](https://gmtk.substack.com/p/valves-secret-weapon)
- Valve cadence on Portal: test Friday, discuss Monday, apply changes before the next Friday. The first test was after one week, with one half-finished room. Each Half-Life 2 chapter had around 100 testers, to separate trends from outliers. — [GMTK](https://gmtk.substack.com/p/valves-secret-weapon)
- Playtest findings acted on at Valve: Portal's white visual style came from a tester ignoring a nearby box. Left 4 Dead added outlines of teammates in trouble. Playtesters pushed back on Half-Life: Alyx's cough mechanic and on pacing. — [GMTK](https://gmtk.substack.com/p/valves-secret-weapon)
- Heuristic evaluation for playability: HEP (Desurvire, Caplan, Toth, CHI 2004, about 43 heuristics) evolved into PLAY (Desurvire and Wiberg, 2009, about 50 heuristics). Critics say these sets are too long to remember during an evaluation, and a 2018 paper proposes the smaller NExPlay for non-experts. — [CHI 2004 paper](https://hci.rwth-aachen.de/materials/conferences/CHI2004/2p1509.pdf); [Springer, PLAY](https://link.springer.com/doi/10.1007/978-3-642-02774-1_60); [NExPlay, SciTePress 2018](https://scitepress.org/Papers/2018/66956/pdf/index.html)
- Nielsen/Landauer 1993 model: about 85% of problems found with five users, best used as repeated small rounds (15-20 total across rounds). Critics: it finds mostly problems affecting 31-100% of users, depends on homogeneous users, and one reappraisal suggests about 27-30. — [MeasuringU](https://measuringu.com/five-users/); [Why and when five test users aren't enough](https://core.ac.uk/works/16907959)
- Free remote moderated testing: Google Meet screen share plus think-aloud, with a pilot run first. Steam Playtest is PC-only. PlaytestCloud is paid, but its Mobile Playtesting Playbook is free. — [Games User Research, moderated playtests](https://gamesuserresearch.com/how-to-run-moderated-playtests/); [PlaytestCloud playbook](https://blog.playtestcloud.com/introducing-the-mobile-playtesting-playbook/)
- Telemetry funnels show where players quit but not why. — [GameAnalytics](https://gameanalytics.com/blog/tips-for-a-great-first-time-user-experience-ftue-in-f2p-games)

### Inferences
- A $0 protocol for Edward and volunteers: five people per round, silent observation by the host, think-aloud, a one-page script, five-minute debrief. Fix and re-test (RITE), with 2-3 rounds. [Inference from the sources above]
- AI agents can do pre-RITE passes with the lab: scripted Playwright runs on 5 devices find mechanical blockers (tap targets, overlap, dead ends). They cannot replace humans for comprehension or feeling. Agents can also draft the PLAY-lite checklist (below) and score screenshots.
- A short custom heuristic list (about 10 items) is more usable than full PLAY: next action obvious, feedback within a second, recoverable errors, no text wall, one new word at a time, audio optional, and so on. [Inference]
- Non-programmer owner: sessions can be recorded by phone screen recording plus a consent line [unverified practice, not sourced here].

### Gaps
- No primary source for Riot or Ubisoft GUR practices was found; not searched in depth.
- The full RITE paper text (roles, exact rules) was not opened; only the Wikipedia stub and summaries.
- Free ways to recruit volunteer testers (communities, Arabic learner forums) were not researched.
- Quantity of testers needed for a phone casual game with mixed ages is not established beyond the Nielsen debate.

## Q4. Cognitive load theory and multimedia learning applied to a language game screen

### Takeaway
Mayer's principles (coherence, signalling, segmenting, modality, redundancy) give concrete screen rules: show only what serves the current word, narrate rather than duplicate text, and let learners control pace. Reported effect sizes are medium to large, but they come from instructional multimedia, not games.

### Cited Findings
- Mayer's 2017 review gives effect sizes: coherence d=0.70, signalling d=0.46, redundancy d=0.87, spatial contiguity d=0.79, segmenting d=0.70, pre-training d=0.46, modality d=0.72. — [Mayer 2017 via search summary, J. Computer Assisted Learning](https://zendy.io/title/10.1111/jcal.12197)
- Definitions: Coherence means exclude extraneous material. Signalling means cues that highlight the organisation of essential material. Segmenting means break lessons into learner-paced chunks. Modality means graphics plus narration beat graphics plus on-screen text. Redundancy means adding identical printed text to narrated graphics does not help. — [Dartmouth, Mayer's 12 principles](https://services.dartmouth.edu/TDClient/1806/Portal/KB/PrintArticle?ID=171655); [Lucidea](https://lucidea.com/blog/mayers-12-principles-of-multimedia-learning/)
- Some principles have boundary conditions, stronger for low-knowledge learners. The number of principles varies (12 in 2009, 15 cited in the 2020 third edition). — [Mayer 2017 summary](https://zendy.io/title/10.1111/jcal.12197)
- Cognitive load theory: intrinsic load is driven mainly by element interactivity (how many parts must be processed together) and prior knowledge. Extraneous load is what design can change. Germane load as a separate concept is debated. — [Andy Matuschak, CLT notes](https://notes.andymatuschak.org/Cognitive_load_theory); [Educ Psychol Rev 2011](https://springerlink.bibliotecabuap.elogim.com/content/pdf/10.1007/s10648-010-9150-7.pdf)
- Chen, Kalyuga and Sweller (2015): the worked-example effect appears for high-interactivity material. For simple, low-interactivity material, letting learners generate answers may be better. Higher guidance helps high-interactivity content, and lower guidance helps low-interactivity content. — [Chen, Kalyuga & Sweller 2015](https://core.ac.uk/download/293753327.pdf)
- Hodent also ties usability to reducing demands on attention and memory. — [Creative Bloq](https://www.creativebloq.com/features/how-neuroscience-and-ux-impacts-video-game-design)

### Inferences
- Coherence: no decorative clutter, no ambient overlays, since the no-XP/no-streak stance already removes extraneous UI. [Inference]
- Modality and redundancy: if a word is spoken, show the Arabic script once, with a transliteration and an English gloss only if needed, but not full on-screen captions of what is narrated. This conflicts with accessibility (see Q5), so make captions a toggle. [Inference; tension to resolve]
- Segmenting: one new word per errand step, with a learner-paced "next". Pre-training: introduce key words (names of the objects) before the errand. Signalling: highlight the one tappable thing relevant to the current word.
- Low element interactivity (single word-to-object matches) argues for letting the player try first, then reveal, rather than a worked example. Script and grammar patterns (high interactivity) argue for worked examples. [Inference from Chen et al.]
- Arabic script may add load for non-readers (letter forms, right-to-left). Not covered by the sources; keep script and sound separate in early steps [unverified inference].

### Gaps
- Mayer's effect sizes come from lab studies on lesson-style multimedia. No source tested them in game settings or for Arabic script learners.
- Sweller's primary books and the "Mayer 2020" PDF were not opened.
- No sources on audio-only language learning or on bilingual captions were retrieved.

## Q5. Accessibility and inclusivity for a global audience (older players, low-end phones, limited data, non-gamers)

### Takeaway
The Game Accessibility Guidelines and WCAG 2.2 give testable minimums: readable default text, high contrast, subtitles for speech, self-paced text, simple language, 24px minimum targets. Evidence on low-end devices, data limits and older players specifically was not found in this pass.

### Cited Findings
- Game Accessibility Guidelines basic tier includes: easily readable default font size; high contrast between text/UI and background; subtitles for all important speech; self-paced text progression; simple clear language; wide choice of difficulty; interactive tutorials. Font-size choice is classed as advanced; a large default is the first step. — [Game Accessibility Guidelines, basic](https://gameaccessibilityguidelines.com/basic/); [GAG vision](https://gameaccessibilityguidelines.com/?p=3102)
- The guidelines suggest also ensuring no essential information is conveyed by sound alone. (The fetch tool suggested this; the page itself was not shown to list it verbatim.) — [Game Accessibility Guidelines](https://gameaccessibilityguidelines.com/basic/)
- Unity's accessibility basics suggest contrast of at least 4.5:1 for normal text, at least 3:1 for large text, and 7:1 or more for a high-contrast mode. — [Unity, game accessibility basics](https://unity.com/blog/video-game-accessibility-basics)
- WCAG 2.2 SC 2.5.8 (Level AA) sets a 24x24 CSS pixel minimum for pointer targets, with spacing exceptions. 44x44 comes from the AAA criterion 2.5.5 and platform guidance. — [W3C, What's New in WCAG 2.2](https://w3.org/WAI/standards-guidelines/wcag/new-in-22/); [DAISY KB](https://kb.daisy.org/publishing/docs/wcag/target-size-minimum.html)
- Contrast levels per WCAG (1.4.3, 1.4.11): 4.5:1 normal text, 3:1 large text and UI components. (Secondary source.) — [Digital Applied 2026](https://www.digitalapplied.com/blog/wcag-2-2-accessibility-audit-checklist-2026-reference)
- Xbox Accessibility Guidelines 101 and IGDA GASIG Top Ten are further checklists. A third-party summary claims a minimum 28px text at 1080p, unverified against Microsoft's page. — [Microsoft XAG](https://learn.microsoft.com/en-us/gaming/accessibility/guidelines); [IGDA GASIG Top Ten](https://igda-gasig.org/how/game-accessibility-top-ten-se/); [abratabia summary](https://www.abratabia.com/game-accessibility/accessibility-guidelines.php)

### Inferences
- A calm game with no timers already satisfies the self-paced item. Auto-testable items for the lab: contrast ratio, target size at 24 px and ideally 44 px, text size, captions toggle for every spoken line. [Inference]
- Right-to-left Arabic script should be tested at a larger default size, since diacritics are small [unverified].
- Older players and non-gamers: a pause-free design, big buttons, and plain language align with the guidelines, but no sourced study was found.

### Gaps
- Low-end phone performance budgets, data/page-weight targets and offline support were not researched or sourced (Web Vitals, PWA caching). [unverified]
- Reduced-motion handling: no source retrieved; closest criterion is WCAG 2.3.3 (AAA) and the CSS `prefers-reduced-motion` query, from general knowledge only [unverified].
- Evidence specific to older players or non-gamers (touch precision, instruction needs) was not found.
- Guidance for screen reader use in a game-like canvas and for dyslexia in Arabic was not covered.
