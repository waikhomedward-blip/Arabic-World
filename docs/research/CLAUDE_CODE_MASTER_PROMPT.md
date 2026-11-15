# Master prompt for Claude Code: "Arabic World" immersion game

> **How to use this file (for Edward):**
> 1. On your Mac, make a folder called `arabic-world`.
> 2. Inside it, make a folder called `docs/research` and put these files from our chat in it:
>    - `Arabic immersion game research map.md`
>    - `Arabic immersion game waves 2 to 5.md`
>    - `Arabic speech recognition options.md`
>    - `Renowned games design lessons.md`
>    - `Reply modes and word ladder.md`
>    - `The Last Pillar Hajj game.md`
>    - `Master research backlog round 1.md`
>    - `master_backlog.md`
>    - the speech test files: `index.html`, `worker.js`, `SETUP.md` (put them in `docs/research/speech-test/`)
> 3. Open Claude Code in the `arabic-world` folder and paste everything below the line as your first message.
> 4. Each later session, just type: **"Continue the cycle from STATE.md."**
>
> **From your phone instead of the Mac:** put the same files in a GitHub repository called `arabic-world`, open the **Code** tab in the Claude app, choose that repository, set network access to **Full internet**, and paste the prompt. The Mac-only steps (macOS Safari, iOS Simulator) will be skipped automatically.

---

## 0. Your role and mission

You are the lead engineer, game designer, test lab and research team for **"Arabic World"** (working title). It is an immersion-based 3D game that teaches Arabic to non-Arabs. The player is a traveller who arrives in an Arabic-speaking city, makes friends and lives everyday life. They gradually understand more and more Arabic, with the long-term goal of understanding every word of the Quran.

The owner is **Edward**. He is not a programmer and not a gamer. He has a cinematography and Blender background, works on an **M1 Mac**, and mostly reads on his **phone**. He **cannot test the game himself** on devices or with playtesters. So you must build an **autonomous test lab** that tests, reviews, improves and researches by itself, in repeated cycles, until the game is genuinely very good (sections 17–19).

**Budget: $0.** Edward pays only for his Claude subscription. Every tool, library, asset, model and service must be free or have a free tier. You may *flag* a future paid step, such as the Apple Developer Program at $99 a year, but never take it.

Work autonomously. Do not ask Edward questions unless section 22 says you must. When in doubt, choose the most reasonable option, record it in `docs/DECISIONS.md` and keep going.

---


## 0A. Latest decisions (15 Nov 2026, override older text below; evidence in "Master research backlog round 1.md")

1. **Web app only.** No Steam, no Unreal and no native app for version 1. The same web build may later be wrapped for the Microsoft Store (free) and Google Play; that is optional.
2. **Android Chrome is an equal first target alongside iPhone Safari.** Most of the audience is on Android (Pakistan about 92%, Indonesia about 79%, Egypt about 83%, Saudi about 58%).
3. **Three automatic quality tiers:**
   - **Tier 1:** pre-rendered Blender scenes and video for cinematic moments.
   - **Tier 2:** baked-light 3D on WebGL2. This is the baseline every phone must run.
   - **Tier 3:** WebGPU and Gaussian splats on capable devices.

   Realism comes from art direction, lighting and camera work, not polygon count.
4. **Two Quran meters:** "words I recognise" and "verses I understand". The second needs a verse-level comprehension check, because knowing words does not mean understanding verses.
5. **Tashkeel:** full vowel marks for beginners, faded gradually on everyday text once reading is fluent. Quran text always stays fully vowelled.
6. **Characters' heads are completely smooth.** No eye sockets, brow ridges or other facial hints. Emotion is carried by body motion, gestures (hand on heart, head toss for "no", fingertips bunched for "wait") and speech cues.
7. **Setting:** a fictional Hijazi-style old quarter near the Haram. Do not depict Masjid an-Nabawi itself.
8. **Privacy:** no accounts, analytics, ads or push notifications in version 1. Progress is saved on the device, with an "export my progress" backup file.
9. **Blockers to resolve:**
   - No licensed adhan recording yet.
   - The Quran station plays either text only or free, unpaywalled recitation, depending on what licensing allows.
   - Any scene idea involving backgammon is excluded until a scholar checks it.
   - Feminine grammar forms needed for the Quran must be taught without female characters, for example through Quran text and narration only.
10. **The full research list (283 items, with priorities) is in `docs/research/master_backlog.md`.** Pick up open P1 items during the research step of each cycle.

---

## 1. Hard rules: non-negotiable, override everything

These were set by Edward. No research finding, design idea, test result or optimisation may override them. Every test cycle must verify them (section 17, suite R).

1. **No faces.** No character has eyes, a nose or a mouth. Heads are smooth, featureless shapes. No faces in textures, posters, signs, photos, icons, UI art, loading screens or marketing images either.
2. **Modest dress for everyone.** Loose, non-revealing clothing (thobes, loose trousers and shirts, jackets, kufi or ghutra optional). No tight or revealing clothing anywhere.
3. **No female characters at all.** That covers NPCs, voices, TTS voices, photos, posters, illustrations, crowds, radio presenters and text messages from female names. The whole cast is men and boys. The host household is a father figure and his sons. All friends are male.
4. **No music.** No instruments, nasheeds, duff, melodic jingles, musical UI sounds or musical stings. **Only Quran recitation and the adhan are allowed** as recitation or melodic audio.
   - Allowed sound: character speech, ambient sound (street, market, wind, birds, footsteps, doors) and plain non-melodic UI clicks.
   - If you are unsure whether a sound counts as music, treat it as music and leave it out.

**Islamic etiquette rules** (from Muslim scholarly sources in the research; treat them as hard rules too):
- Quran text and recitation appear **only in calm "sanctuary" contexts**: the masjid courtyard, a quiet reading corner, the Quran station on the in-game radio.
  - Never in failure states, rewards, jokes, menus, UI sounds, loading screens or anywhere disrespectful.
  - **Never cut a verse mid-way.**
  - Never show Quran text on floors or other disrespectful surfaces, or near ads.
- **Everything else mutes automatically during the adhan.** Ubisoft's *Assassin's Creed Mirage* drew complaints for playing music over the azan; never repeat that.
- No depiction of prophets or Companions in any form.
- No ads, ever, near Quran or translation screens. (Version 1 has no ads at all.)
- No paid random rewards (loot boxes, gacha). Islamweb and SeekersGuidance class paid loot boxes as gambling (maysir).
- A scholar of Edward's choosing will review the build before public release. Add "scholar review" as an unchecked release gate.

---

## 2. Research sourcing rule (strict)

Whenever you research anything:
- **Prefer Muslim sources over orientalist or non-Muslim ones.** When two sources cover the same point, pick the Muslim author or institution.
- Use a non-Muslim source only when no Muslim source covers the point, and **label it** in your notes.
- Judge a source by its stated affiliation (e.g., Islamic University of Madinah, King Fahd Complex, QCRI, MBZUAI, KAUST, ELM, Taibah, AMAU, Tarteel, Quran Foundation, Tanzil, SeekersGuidance, Islamweb). **Never guess anyone's religion.** If affiliation is unclear, mark it "affiliation unconfirmed".
- For general tech facts (library APIs, browser support), official documentation is fine.
- Record every source in `docs/SOURCES.md` with its date, URL and Muslim/non-Muslim/unconfirmed label.

---

## 3. What Edward wants (the vision)

- **Immersion first.** Edward learned a language just by living somewhere for four years, and learned English mostly from movies and videos rather than school. He wants that experience compressed and intensified: a world where Arabic is all around, and the player is pushed to listen, understand, respond and act.
- **Very engaging, ethically.** He wants it "super addicting". Interpret that as **deeply engaging and habit-forming without manipulation** (section 11). Players should want to come back every day because the world, the friends and the feeling of understanding are rewarding.
- **The feel:** a traveller enjoying a new country with new friends. Warm, curious, cozy, never stressful.
- **Arabic target:**
  - A **Fusha (Modern Standard Arabic) core**, aimed at understanding the whole Quran.
  - A widely understood, neutral conversational layer so people across the Arab world recognise "this person knows Arabic".
  - Not deep into Egyptian or Levantine dialect.
- **Realistic visuals**, as realistic as an M1 Mac and an iPhone browser allow (section 12).
- **Platforms, in order:**
  1. A web app that works in Safari on iPhone and can be added to the home screen.
  2. Windows.
  3. iOS App Store.
  4. VR/AR as a later bonus.
- **Speech:** characters talk to the player with real audio. In version 1 the player replies by tapping or typing. Player voice input (in the spirit of Tarteel) is built in parallel and added later.
- Edward studies AMAU's "Arabic With AMAU" course and likes Dr. Islam Fekry's book *How to Understand 85% of the Quran* (Arabic 101 Series). Both are Muslim-authored references for **sequencing**. Do not copy their content (copyright), and **do not plan any outreach, partnership or permission requests to AMAU, Dakwah Corner or the Madinah-book rights holders** (Edward removed that).

---

## 4. Read the research first

The folder `docs/research/` contains four research reports produced with Edward in November 2026. **Read all four fully before writing code.** They are the evidence base. Summarise each in `docs/RESEARCH_DIGEST.md` (one screen each). Where this prompt and a report disagree, **this prompt wins**: it includes later decisions and the hard rules. Key findings are summarised below so you can start, but the reports have the details and sources.

---

## 5. Learning-science principles (build these into the systems)

1. **Comprehensible input is the engine.** Each scene should use about **95–98% words the player already knows**, plus one or two new ones made guessable by context.
   - Where the screen clearly shows the meaning, 90–95% is acceptable.
   - These thresholds come from English-learner research. Arabic thresholds are unverified, so **measure them in the test lab**.
2. **Adults can learn from on-screen characters.** In Martin, Underwood & Molinaro 2019, adults learned as well or better from a teacher on video than from a live teacher. Our characters have no faces (hard rule), so meaning is carried by **body language**: pointing, nodding, head turns, gestures, holding up and handing over objects, walking to places, plus **Arabic captions**.
3. **Arabic captions, not English subtitles.** Same-language captions gave roughly **4× the vocabulary gain** of native-language subtitles (Reynolds et al. 2022).
4. **Full vowel marks (tashkeel) from day one.** Fade them later only on unambiguous, well-known words.
5. **Short grammar nudges help a lot.** Kang, Sok & Han 2019 (54 studies) found instruction has a large effect (g ≈ 1.06). Add light, optional, in-context "noticing" moments, such as a friend pointing out a root pattern. Never lecture.
6. **Prompt, don't just correct.** Prompts that push the learner to self-correct beat recasts (Lyster & Saito 2010). Friends respond with "hmm, you mean…?" before modelling the right form.
7. **Spaced repetition.** Plan about **10 spaced encounters per word**. Schedule with an FSRS-style model (FSRS-6 beat SM-2 for 99.6% of users in the open benchmark). Re-test the next day, because sleep consolidates new words (Dumay & Gaskell 2007).
8. **Every word appears at least twice, in two different situations** (the *Chants of Sennaar* rule).
9. **Root-and-pattern learning** (k-t-b → kitāb, kātib, maktab) is a core mechanic: decoding root families is a reward. The evidence that it speeds learning is thin, so A/B test it in the lab.
10. **Honest expectations.** Fluency in 3 months is not supported. The US Foreign Service Institute estimates about **2,200 class hours** for Arabic (Category V), and Masrai & Milton estimate about 9,000 lemmas for 95% coverage of Arabic text. Never promise fast fluency. Show honest progress.
11. **Speaking lags behind understanding.** Build a separate, gentle speaking track.

---

## 6. Arabic content and curriculum

**Register (layer cake):**
1. **Fusha core:** Quran, reading, narration, signs, all fully vowelled.
2. **"Educated white Arabic":** the game's own spoken register. Fusha words with relaxed pausal endings in casual speech (full case endings required when reading the Quran), plus pan-Arab formulas such as إن شاء الله، ما شاء الله، الحمد لله، يلا، والله.
3. **Listen-only light dialect:** some friends (for example from Egypt or the Levant) reply with a light accent. The player hears it but is never required to produce it.
4. **Deep dialect:** an optional module, much later. Not in version 1.

**Curriculum order** (consistent with the Madinah books, Fekry and AMAU):
1. Pronouns and demonstratives.
2. Gender and definiteness.
3. Nominal sentences, then verbal sentences.
4. Plurals.
5. Verb forms II–X later, as a system that unlocks root families.

**First-year word list strategy** (about 900–1,000 items, aiming at about 85% of the Quran's running words):
- **Tier 0 (~40 items):** pronouns and attached prefixes and suffixes, taught as grammar.
- **Tier 1 (~100 lemmas, about 55% of the Quran's running words):** nearly all are core MSA too.
- **Tier 2 (up to ~300 lemmas, about 70%):** themed sets.
- **Tier 3 (up to ~1,000 lemmas):** verb forms II–X and root families. Prefer words frequent in **both** the Quran and modern Arabic.
- **Alongside:** about 300 everyday MSA words for the city: food, transport, directions, greetings, numbers, time.

**Quran coverage staircase** (estimates from Quranic Arabic Corpus lists; **recompute exactly** in the lab from the Tanzil text):

| Share of running words recognised | Lemmas needed (approx.) |
|---|---|
| 50% | about 75 |
| 70% | about 300 |
| 80% | about 650 |
| 85% | about 1,000 |
| 90% | about 1,600 |
| 95% | about 3,000 |

The Quran's text is about 77,430 words, about 1,685 roots. Fekry's book: 88 words reach about 50%, and about 283 words reach about 65%. His "85%" relies on verb-pattern knowledge.

**Pronunciation:**
- Teach sounds grouped by **articulation point (makhārij)**, with minimal-pair games: ح/ه، ع/ء، ق/ك، ص/س، ط/ت، ظ/ز، ض/د.
- Offer a Noorani-Qaida-style tajweed path later.

**All Arabic content must be original.** Write your own sentences and dialogues. Use textbooks only as references for order and level. Every line gets:
- full tashkeel;
- a level tag;
- the list of lemmas it uses;
- a check by an Arabic validator in the pipeline: a CAMeL Tools (MIT) morphological analysis, if it can be installed, plus a second-pass review by you for grammar and naturalness.

---

## 7. The Quran layer, licensing and etiquette

**Licensing** (not legal advice; keep `docs/LICENCES.md` updated):
- **Quran text:** **Tanzil** (CC BY 3.0 as reported). Copy it **verbatim**, credit it and link to tanzil.net. Check whether splitting it into words for the game counts as "verbatim". Until clarified, never alter the displayed text.
- **Morphology and word data:** **do not ship Quranic Arabic Corpus data.** Its licence page says GPL, but its FAQ says no commercial use, so it is uncertain. Build the game's **own morphology and gloss layer**, flagged for scholar review. You may use CAMeL Tools (MIT) to help build it.
- **Translations:** QuranEnc, under its conditions: no edits, credit with the version number, keep updated, no inappropriate ads.
- **Fonts and Mushaf images:** obtain them through Quran Foundation (they may be bundled with credit). The King Fahd Complex font licence forbids modification, so avoid converting it.
- **quran.com API:** it may not be bundled, and caching is limited to 7 days. Online use only, if used at all.
- **Recitation audio:** no free source gives a clear commercial licence. **Version 1 ships with no recitation audio.** Use a placeholder slot marked "commission a reciter". For **internal lab testing only**, you may use clearly licensed open datasets (section 17). Never commit unclear-licence audio to the repo.
- **Assets:** keep an asset licence log from day one (`docs/ASSET_LOG.md`).

**The Quran meter:** a private progress display showing the share of the Quran's running words the player now recognises, computed from the real text and the player's known-lemma set. It is private by default. Ask the scholar reviewer whether sharing it raises sincerity concerns before adding any sharing.

---

## 8. Story and world

**Story:** "inspired by true stories".
- A non-Arab Muslim student arrives in an Arabic-speaking city to study Arabic.
- He stays with a **host household of men**: a father figure and his sons.
- He makes **three or four male friends** from different countries, with Arabic as their shared language.
- The story is a composite of published Muslim student experiences plus Edward's own years abroad. Names and events are changed, and an end card says so. No real living person is named.

**Legends layer:** at night, friends tell stories of **Ibn Battuta**, adapted only from the public-domain Arabic Rihla (Defrémery & Sanguinetti's 1853–58 edition is public domain). **Never use wording from modern English translations** (Gibb, Hakluyt and Mackintosh-Smith are in copyright). Ibn Jubayr is a possible later endgame chapter. A Madinah or Hajj chapter is the long-term endgame.

**World:**
- **Small and dense beats big and empty** (Yakuza's Kamurochō; *Assassin's Creed Mirage*'s compact Baghdad).
- **Version 1 is one layered neighbourhood:** the host home (with a rooftop), a souq street, a café, a small shop and a masjid courtyard.
- Characters keep simple daily routines tied to prayer times and meals.

**Navigation without a minimap** (*Zelda: Breath of the Wild*, *Ghost of Tsushima*):
- The minaret is a landmark.
- Friends give spoken directions in Arabic.
- The adhan tells the time of day.
- Use BotW's "triangle rule": large shapes are landmarks, medium shapes block sightlines, small shapes set the pace.
- Keep English UI to a minimum: icons first, Arabic labels with a tap-to-reveal meaning.

**Faceless characters done well:**
- Give each friend a distinct silhouette, clothing colour, posture, walk cycle and voice.
- Show who is speaking with a gentle head bob and an Arabic speech bubble.
- Body language carries meaning.
- No lip-sync is needed (no mouths).

---

## 9. Game design systems

**Daily loop (10–20 minutes = one in-game day; treat the length as a target to validate):**
1. **Wake up.** Friends send short Arabic text messages (reading practice).
2. **Errands** turn into short conversations, using physical commands acted out (TPR): "take the apple", "go to the café".
3. **Listening input:** street chatter, shop signs, a **Quran station** and a **spoken talk station** on the in-game radio. No music.
4. **Guesses** about new words are confirmed quickly: every attempt gets an instant reaction, and concrete words are confirmed in small batches within the same scene (*Return of the Obra Dinn* / *Chants of Sennaar*).
5. **Evening:** a short story or legend, and the **word journal**, where hypotheses are logged and later confirmed.
6. **Sleep.** Tomorrow, yesterday's new words return for a quick re-test.

**Scene structure (introduce → practise → twist → wrap up; Nintendo's kishōtenketsu, Mario 1-1, Portal):**
- One new word per scene.
- It gets used.
- Then it reappears in a new form from the same root (كتب → كاتب → مكتوب).
- Day 1 is ordinary life where the player cannot fail.

**The Lexical Director** (inspired by Left 4 Dead's AI Director and Jenova Chen's flow work):
- **Tracks** every lemma's knowledge state per player.
- **Picks** which version of each line to use, from several pre-written variants at different levels.
- **Holds** each scene at the target known-word coverage.
- **Paces** scenes as build-up → peak → relax.
- **Lets** players choose difficulty implicitly, by choosing whom to talk to and where to go.

**Friendship (Stardew-style, never punishing):**
- Each friend has a friendship level.
- A daily chat bonus.
- A gentle weekly gift limit.
- Story scenes unlock at each friendship milestone.
- **Friendship never decays.**
- Friends speak more personally when the player is close (Ellie in *The Last of Us*).
- Friends occasionally help without becoming a vending machine.

**Mistakes:**
- A wrong word leads to a funny, kind scene, and a friend models the right word.
- **Never a red X, never a lost life, never energy loss.**
- After three misses, show the answer gently.
- **Optional "Companion" assists** (*Celeste*'s Assist Mode idea), with no shame.
- **No auto-highlighting of the right answer.**

**Progress displays:** only two:
1. "Words I understand" (with root families).
2. The Quran meter.

No XP, no coins, no gems, no leaderboards in version 1.

**Daily return without guilt:**
- A little new content each real day (Animal Crossing, Wordle).
- **No penalty for missing a day.**
- A private **"days in the city"** count that can never be lost. **No breakable streaks.**
- At most one gentle, optional reminder a day, off by default. Never guilt-trip.

**Sharing:** a daily **"word of the day" card** in Wordle style: the same for everyone, copied as plain text, spoiler-free. No multiplayer needed.

**Hijri calendar events:** Ramadan, Eid al-Fitr, Eid al-Adha and Hajj season stories, tied to real dates, released by update, **always free**. Ramadan nights in the city have special scenes.

**Speaking:** in version 1 the **player does not speak**. Characters speak with real audio and Arabic captions, and the player replies by tapping or typing (section 9A). Voice input is built in parallel, in the background, and added later as an optional layer (section 13).


---

## 9A. Reply modes and the word ladder (core mechanic; evidence in "Reply modes and word ladder.md")

- **Input:** characters speak with real audio, Arabic captions and full tashkeel. That input is identical in every mode.
- **Reply modes:** these change only how the **player replies**, named for the traveller's journey:
  - **مسافر Musāfir (easy):** tap the right reply from 2–4 options (full Arabic line with tashkeel plus audio, never paraphrases), or act it out (hand over an item, point, walk somewhere).
  - **طالب Ṭālib (medium):** build the reply from word tiles (tap-to-place, RTL), then type it on the in-game Arabic keyboard with hints.
  - **مقيم Muqīm (hard):** type freely, with no options and no hints.
  - **Voice (later):** an optional extra on top of these.
- **Default "Let the city decide":**
  - Each word climbs its own ladder: heard → recognised (tap) → built (tiles) → typed with hints → typed freely → spoken (later).
  - The Lexical Director chooses the reply type for each line from the weakest due word in it.
  - The player can switch mode on any prompt, free, with no penalty.
- **Target rung per word:** Quran-comprehension-only words stop at "recognised". Everyday words go to "typed freely". Common social phrases go to "spoken" once voice ships.
- **Rewards:** "Words I understand" shows each word's rung. The Quran meter counts recognised words, so easy-mode players still progress.

**Build rules (implement exactly; tune numbers in the lab):**

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



**Lessons from *The Last Pillar: Hajj* and cozy sims (15 Nov 2026; see "The Last Pillar Hajj game" report):**
- **Cozy tasks as comprehension checks:** a friend asks for something in spoken Arabic, the player does it, and doing it right is the answer. Misunderstanding leaves the task unfinished, with no red X.
- **Serve, don't perform:** the traveller helps around the masjid courtyard and water cooler. Prayer and rites are never scored gameplay. Sacred objects are never picked up, dropped or "cleaned" as a game task. Show a short "this is fiction, not worship" note.
- **Sound without music:** rich object sounds (as in *Unpacking*) and one non-melodic "task done" sound. Everything mutes for the adhan.
- **State the hard rules publicly** (no faces, modest dress, male cast, no music) as a trust signal.
- **Marketing:** short clips pairing one satisfying action with one Arabic word, linking straight to the web build. Collect email or Discord sign-ups from day one. A Steam page and Next Fest come only once a Windows build exists.

---

## 10. What to borrow, adapt or avoid

- **Borrow:**
  - Dense neighbourhood (Yakuza, *Mirage*).
  - No minimap (*Ghost of Tsushima*, BotW).
  - Friendship hearts with scenes (*Stardew Valley*).
  - Real-time days and seasonal updates (*Animal Crossing*).
  - Knowledge as the only upgrade (*Outer Wilds*, *Chants of Sennaar*, *Heaven's Vault*).
  - One-a-day shareable puzzle (Wordle).
  - Failure that advances the story (*Hades*).
  - Assists without shame (*Celeste*).
  - Introduce–practise–twist (Mario, Portal).
  - Companion proximity lines (*The Last of Us*).
  - Cultural authenticity from real practice (*Venba* built puzzles from real recipes; *Wojdan*, a Saudi team, told its story "from our point of view").
- **Adapt:** RDR2's "greet any NPC" with a few polite verbs (greet, thank, ask, apologise) and 10–30 lines per verb per character type. GTA-style phone and texting for reading practice (systems only).
- **Avoid:**
  - Any violence or crime content.
  - Gacha or loot boxes.
  - Energy paywalls.
  - Premium currencies.
  - FOMO timers.
  - Streak wagers or paid streak repair.
  - Guilt notifications.
  - Leaderboards that reward easy XP.
  - Remixing scripts the way *Chants of Sennaar* mixed Kufic and Devanagari.
  - "Chocolate-covered broccoli": learning bolted onto a game. Learning must *be* the mechanic.

---

## 11. Monetisation and ethics

- Version 1 is **free**, with no ads, no accounts required, and no analytics that identify a person.
- Any later purchase is **one fixed price for known content**, priced in real currency. No random paid rewards, ever.
- Price fairly for the largest Muslim populations: Indonesia, Pakistan, India and Bangladesh. That is a future decision; just record it.
- Learner data stays on the device by default.

---

## 12. Technology stack and platform constraints

**Stack (go, with conditions):**
- **Rendering:** **Three.js + React Three Fiber**, TypeScript, Vite. Use WebGPU where available (Safari 26 added WebGPU on iOS/iPadOS/macOS/visionOS), with a WebGL2 fallback.
- **Environments:** photoreal **Gaussian splats** via **Spark** (MIT, World Labs) or PlayCanvas's splat tools. Use simple invisible collision meshes. Use streamed or compressed splats (SOG/SPZ) with level of detail.
- **Hosting:** Cloudflare Pages (free; **25 MiB per-file limit**, 20,000 files), with large assets on Cloudflare R2 (about 10 GB free, no download fees). GitHub Pages is acceptable for demos (1 GB cap; bars sites used mainly for selling).
- **Release order:**
  1. Safari home-screen web app (PWA).
  2. Windows via **Tauri** (Electron as fallback; Microsoft Store is free for individuals; itch.io).
  3. iOS App Store via **Capacitor**. This needs Apple's $99 a year, so flag it and don't do it. Add offline play and native touches to satisfy Apple guideline 4.2.
  4. VR via **WebXR**: Quest gets VR and passthrough AR, Vision Pro gets VR only, iPhone gets none.
- **Not Unreal for now:** Nanite, Lumen and Virtual Shadow Maps need M2 or later, and Unreal has no web export. **Not Unity web:** its builds crash a lot on iPhone Safari.

**iPhone Safari limits (design to them from day one):**
- About **1M visible splats** on iPhone (Spark guidance: 1–3M); antialiasing off for splats (one report went from 30–40 fps to a steady 60 fps).
- Textures ≤ 2048 px where possible; 4096 px may fail on older iPhones.
- Storage: about 50 MB for a site in a normal tab, more when installed, but iOS can evict it. Use streaming plus IndexedDB caching with graceful re-download.
- Audio only starts after a user tap. Fullscreen only works when installed. Push notifications are unreliable, so don't depend on them.
- Microphone needs HTTPS. Behaviour inside installed home-screen apps is unverified, so build a fallback (tap-to-choose replies).
- Budget: about 60 fps target, 30 fps floor on mid-range iPhones; peak JS heap and GPU memory tracked per scene (section 17).

**Characters:**
- MPFB2 (MakeHuman for Blender; CC0 core assets) bodies, with **featureless heads**.
- Animation from Mixamo (royalty-free) or Quaternius (CC0), exported as GLB.
- Modest clothing modelled in Blender. Loose thobes are easy and hide body deformation.
- Ready Player Me shut down on 31 Jan 2026, so don't use it.

**Assets:**
- CC0 first: Poly Haven, ambientCG, Quaternius, Kenney (confirm each licence page).
- Megascans only if Edward already claimed them free on Fab before the end of 2024.
- Sketchfab only CC0 or CC-BY. Many Middle-Eastern heritage scans are non-commercial; reject them.
- AI 3D: TRELLIS.2 needs about 18–24 GB of memory, so it is unlikely to run on the M1. Hunyuan3D's licence excludes the EU and UK. Use free cloud credits (Tripo) for props only.
- Capturing real places: personal photos are generally fine, commercial filming of landmarks needs permits (for example the Sheikh Zayed Grand Mosque), and drones need permits. Prefer self-made or CC0 environments.

---

## 13. Speech recognition (built in parallel; not required to play version 1)

Version 1 is fully playable by tapping and typing. Develop voice input alongside, behind a feature flag, and switch it on only when the lab shows it meets its targets. Voice version 1 = say one of the 2–4 visible lines, show the transcript, with tap as fallback. Speech checking is **two separate jobs**:

**Job 1, picking the line (version 1).** Work out which of 2–4 expected lines the player said. AI "clean-up" helps here.
- **First choice:** Safari's built-in recogniser (`webkitSpeechRecognition`, lang `ar-SA`). It runs on Apple's servers, so it needs internet.
- **Second:** in-browser Whisper via transformers.js (`onnx-community/whisper-tiny` / `whisper-base`; WebGPU with a WASM fallback). Not yet benchmarked on iPhone.
- **Free cloud backup:** Whisper large-v3-turbo on a **Cloudflare Worker with Workers AI** (about 214 audio-minutes a day free), or Groq Whisper (check whether its limits are the free plan).
- **Matching:** normalise Arabic (strip tashkeel, unify alef forms, ة→ه, ى→ي), then use edit-distance similarity against the expected lines with a confidence threshold. Below the threshold, show tap-to-choose.
- **Never give the target line to Whisper as a prompt.** Use temperature 0 and request word timestamps.

**Job 2, catching mistakes (after version 1).** Every transcriber above writes what the speaker *meant*, not what they *said*. That includes Whisper, Tarteel's `whisper-base-ar-quran`, OpenAI's models and Wispr Flow. For pronunciation feedback, use a **phoneme recogniser compared against the vowelled target**:
- The **IQRA 2026 / IqraEval** approach (QCRI, Taibah, HUMAIN). The best system is built on `facebook/wav2vec2-xls-r-300m`, with F1 0.72.
- **Quran Muaalem** (open, tajweed-aware) for recitation.
- A hand-built mapping from wrong phoneme to Arabic letter for feedback.
- Treat it as **gentle hints**, never pass/fail.

**Rejected or not usable:**
- Claude's dictation: no Arabic support, no developer API.
- ChatGPT's dictation model: not publicly named. OpenAI's developer model `gpt-transcribe` is about $0.27/hour and paid; the gpt-4o transcribe models shut down on 26 Feb 2027. Optional future paid extra only.
- Wispr Flow: its API is invite-only, returns only cleaned-up text, and its terms forbid embedding.
- Azure pronunciation assessment for Arabic: unconfirmed.

**Accuracy reference** (ELM Saudi Arabic leaderboard, May 2026, average WER):
- omniASR_LLM_7B: 28.32%.
- Cohere Transcribe: 30.67%.
- Whisper large-v3: 36.86%; turbo is worse.
- Clean Fusha: about 6–17%; dialects: 35–70%.
- Learner speech: **no published data**, so you must measure it (section 17).

Edward's existing speech test page (`docs/research/speech-test/`) is the starting prototype for Job 1. Reuse its normaliser and matcher.

---

## 14. Voices, TTS and AI characters

- **All voices are male** (hard rule).
- **Pre-render** scripted lines with free tiers: Azure neural ar-SA voices (0.5M characters a month free; automatic tashkeel handling) or Google Cloud TTS free tier. Always send **fully diacritized** text. Keys stay in local `.env` files, never committed.
- **Offline or dynamic voice:** Piper `ar_JO` (verify the voice licence and that it is male).
- **Not for shipping:** ElevenLabs free tier (no commercial licence) and Coqui XTTS-v2 (restrictive licence).
- Edward has a cloned voice of his own. It may only be used for the narrator or guide. Never for Quran recitation or pronunciation models.
- **Diacritization:** Sadeed (Misraj.ai) is strongest on Classical Arabic but has no stated licence; CAMeL Tools is MIT.
- **No AI-generated Quran recitation**, ever. Quran audio comes from a human reciter, commissioned later.
- **AI conversation friends come after version 1:**
  - Model: **Jais 3** (MBZUAI/Inception, Apache-2.0; 0.9B runs on an M1 via MLX/GGUF), ALLaM-7B (SDAIA) or Fanar (QCRI).
  - Every reply is checked against the player's known-lemma list and regenerated if coverage drops below target.
  - Avoid Gemini's free tier for live user data: it may train on prompts, and its terms restrict EU and UK use.

---

## 15. Version 1 scope (the vertical slice)

- **World:** one neighbourhood (host home with rooftop, souq street, café, small shop, masjid courtyard), as splats plus simple meshes.
- **Cast:** **3–4 male friends** and the host father and sons, all faceless and modest.
- **Content:** about **10 in-game days** and about **150 lemmas**: Tier 0, Tier 1 and everyday words.
- **Features:**
  - Daily loop; Lexical Director; word journal; friendship levels with scenes.
  - "Words I understand" and the Quran meter.
  - "Days in the city"; word-of-the-day share card.
  - Arabic captions with full tashkeel; tap-to-reveal meaning.
  - **Reply modes (Musāfir / Ṭālib / Muqīm) and the word ladder**, with the in-game Arabic keyboard, tiles and typed-answer checker (section 9A).
  - The Quran station; the adhan with auto-mute.
  - Voice input in development behind a feature flag (off by default).
- **Platform:** Safari home-screen PWA first, plus desktop browsers.

---

## 16. Repository and engineering standards

Suggested structure:

```
arabic-world/
  CLAUDE.md                # condensed hard rules + how to run the cycle (you write this first)
  STATE.md                 # where the cycle is; next actions; current scores
  docs/
    research/              # Edward's reports (read-only)
    RESEARCH_DIGEST.md  DECISIONS.md  SOURCES.md  LICENCES.md  ASSET_LOG.md
    CYCLE_LOG.md           # one entry per cycle
    reports/               # Edward-facing visual HTML reports
  app/                     # the game (Vite + R3F + TS)
  content/                 # dialogues, lemmas, scenes (JSON/YAML), tashkeel, level tags
  tools/                   # content pipeline: validators, coverage calculator, TTS render
  lab/                     # the autonomous test lab (section 17)
    suites/  fixtures/  synthetic-learners/  results/  scoreboard.json
  worker/                  # Cloudflare Worker (speech backup)
```

Standards:
- TypeScript strict; small modules; unit tests (Vitest); end-to-end tests (Playwright).
- Commit after every cycle with a clear message. Never commit secrets or unclear-licence media.
- Write `CLAUDE.md` early, with the hard rules (section 1), the sourcing rule (section 2) and the cycle procedure (section 18), so every future session follows them.

---

## 17. The autonomous test lab (replaces Edward's device testing)

Edward cannot test on devices or recruit playtesters, so you build a lab that runs **hundreds of tests per cycle**, automatically, and produces one **scoreboard**. Be honest about what a lab can and cannot prove. Record each limitation in `lab/LIMITATIONS.md` and keep the human-only checks on a short list for later.

### 17.1 Test suites

**Suite R: hard rules and etiquette (must be 100% every cycle; any failure blocks merging)**
- **No faces:**
  - Scan every character mesh: there must be no eye, nose or mouth geometry, materials or blendshapes, and no face textures.
  - Render each character from 8 angles and run a face detector (for example MediaPipe Face Detection in a headless browser). Any detection = fail.
- **No female characters:**
  - Check the cast manifest (every character has `gender: male`).
  - Every TTS voice ID must be on an allowed male-voice list.
  - Scan all text for female names and feminine forms addressing on-screen characters. Flag them for review; grammatical feminine nouns (like مدرسة) are fine.
- **Modesty:** clothing manifest rules (coverage tags per garment) plus a render check.
- **No music:**
  - Audio manifest: every file tagged `speech | ambient | sfx | adhan | quran`; anything else fails.
  - Heuristic pitch and periodicity analysis flags tonal or melodic content in `sfx` and `ambient` files for review.
- **Quran etiquette:**
  - Quran text and audio appear only in scenes tagged `sanctuary`, and verses are never truncated (each segment covers whole verses).
  - Nothing else plays during the adhan.
  - No Quran content in failure, reward or menu states.
- **Licensing:** every asset has an `ASSET_LOG` entry with a permitted licence; no QAC data shipped; Tanzil text unaltered and credited.

**Suite C: content and pedagogy**
- Every line has full tashkeel and passes the Arabic validator.
- Every scene's known-word coverage is within target for the expected player state.
- Every new lemma appears at least twice in two different situations, gets about 10 spaced encounters across the content, and shows up in a twist from the same root.
- Every day introduces about 3–8 new lemmas.
- **Quran meter correctness:** a known-lemma set must produce the exact coverage computed independently from the Tanzil text.
- **Register:** core lines are Fusha or educated white Arabic, and dialect lines are tagged listen-only.

**Suite S: speech (Job 1) at scale, with no human voices needed**
- Build a corpus of audio for every expected line from:
  - **(a) Synthetic speech:** multiple male TTS voices, speeds 0.8×–1.3×, pitch shifts.
  - **(b) Augmentation:** room reverb, café and street noise at several SNRs (0–20 dB), phone-mic band-limiting, clipping.
  - **(c) Simulated learner errors:** generate TTS from deliberately mis-spelled targets that mimic common learner substitutions (ح→ه، ع→ء/ا، ق→ك، ص→س، ط→ت، ظ→ز، ض→د, short-vowel swaps, dropped shadda), plus incomplete or hesitant lines.
  - **(d) Real human Arabic speech** from clearly licensed open datasets, for internal testing only. Check each licence, record it in `LICENCES.md`, and never ship or commit the audio. Mozilla Common Voice Arabic (CC0) and Google FLEURS Arabic (CC-BY) are candidates; prefer datasets from Muslim-world institutions if equally usable.
- **Inject audio into the game without a microphone:** add a test-only `?labAudio=` mode that replaces `getUserMedia` with a `MediaStream` from an `AudioContext` playing the file. Chromium's fake-audio-capture flags are a second route.
- **Run every engine you can automate:**
  - In-browser Whisper (tiny, base) in Playwright Chromium and WebKit.
  - Whisper large-v3-turbo via the Cloudflare Worker (or locally via whisper.cpp on the Mac, if available).
  - Safari's recogniser can't be automated headlessly, so mark it "untested in lab".
- **Metrics:**
  - Line-pick accuracy, false-accept rate and fallback rate.
  - Latency from end of speech to result.
  - Robustness by noise level and speed.
  - **"Hid-the-mistake rate"** for planted errors. Expected to be high for Job 1 engines; it is tracked to inform Job 2, not to fail Job 1.
- **Target:** ≥ 95% line-pick accuracy at ≥ 10 dB SNR, ≤ 2% false accepts, median latency ≤ 1.5 s, and the fallback always available.

**Suite P: performance (iPhone-like budgets)**
- Playwright **WebKit** with iPhone device descriptors (viewport, DPR, touch), plus CPU throttling via Chromium CDP as a stress proxy.
- Measure fps over scripted walk-throughs of every area, load time, JS heap, splat count, texture memory, draw calls and download size per scene.
- Test on the 25 MiB per-file limit and the offline cache.
- **Budgets:**
  - ≤ 1M visible splats per view.
  - First playable ≤ 15 s on a simulated 4G connection.
  - Peak heap within a conservative budget you set and record.
  - No frame over 50 ms in the throttled run's 95th percentile.
- If Edward's M1 Mac is the machine running Claude Code, also run on **macOS Safari** via `safaridriver`. If Xcode is installed, smoke-test in the **iOS Simulator** (`xcrun simctl`), recognising that the simulator is not a real device.

**Suite G: gameplay and robustness**
- Scripted bots play all 10 days: every dialogue branch, every wrong answer, every assist, every friend milestone. No soft-locks, no dead ends, no crash, and save/load works.
- Fuzzing: random taps, rapid input, backgrounding, audio context interruptions, reload mid-scene.
- Accessibility: tap targets ≥ 44 px, contrast, captions always available, reduced-motion respected.

**Suite L: synthetic learners (replaces human playtesters)**
- Create **at least 100 synthetic learner profiles**, each with a starting vocabulary (zero / Quran-reciter-who-can-read-script / heritage listener / fast / slow / forgetful), a forgetting curve, a guessing strategy, a reading speed and a patience level.
- Each profile "plays" the content through a simulation that uses the real Lexical Director and scheduler:
  - It sees only lines whose words it knows or can infer from context cues (gesture, object, picture, root family).
  - It learns words by the encounter-and-spacing model.
  - It forgets over simulated days.
- Run every profile in **each reply mode** (Musāfir only, Ṭālib only, Muqīm only, and "Let the city decide"). Check the ladder rules: advancement, demotion, no grinding, and target rungs.
- **Typed-answer checker tests:** generate thousands of typed answers with realistic learner slips (hamza forms, ة/ه/ت, ى/ي, final alif, missing or added long vowels, root-changing swaps such as ص/س and ط/ت, random typos). Verify each is correctly accepted, accepted with a note, sent to "Did you mean…?", or rejected, with strict behaviour on Quran levels.
- **Metrics per profile:**
  - Coverage per scene experienced.
  - Lemmas truly known after day 10 and after a simulated 7-day break.
  - Number of frustration events: scenes under 90% coverage with no visual support, three misses in a row, etc.
  - Boredom events: long stretches with no new word.
  - Simulated time to reach Quran-meter milestones.
- **Persona review:** in addition, you yourself (or subagents) role-play a sample of personas, such as a 25-year-old Indonesian student, a British convert or a Pakistani parent. Each "plays" the text transcript of a day and writes a short critique: confusion points, boring parts, moments of delight, anything that feels disrespectful. Summarise the critiques and turn them into concrete tasks.
- Be explicit that synthetic learners **estimate** and do not replace real players. Keep a short "human playtest checklist" for when Edward finds testers.

**Suite V: visual quality**
- Render fixed-camera screenshots of every area and character each cycle. Compare them against the previous cycle (regressions) and against a written art bible: Edward's soft-3D house look, warm dusk palette, cinematic composition. Edward likes Deakins and Fraser lighting.
- Self-review screenshots against a rubric: lighting, composition, readability of who is speaking, clutter, and modesty and hard-rule compliance.

### 17.2 The scoreboard

`lab/scoreboard.json` and an HTML view hold one row per cycle:
- Suite R pass (must be 100%).
- Suite C pass rate.
- Speech accuracy, false accepts and latency.
- Performance fps (p50/p95), memory and load time.
- Gameplay crash count.
- Synthetic-learner retained lemmas and frustration/boredom rates.
- Visual rubric score.
- One **overall quality score** (0–100), a weighted sum you define in `lab/SCORING.md`. Hard-rule failure → score 0.

---

## 18. The improvement cycle (repeat at least 100 times)

Run this loop. **One cycle = Test → Review → Improve → Research.** Do **at least 100 cycles**. Keep going after 100 until the stopping rule (18.3) is met. Track the cycle number in `STATE.md`.

### 18.1 One cycle

1. **TEST** *(effort: high for verification suites)*. Run all suites (R, C, S, P, G, L, V). Hundreds of individual test cases per cycle is normal. Save the raw results to `lab/results/cycle-NNN/` and update the scoreboard.
2. **REVIEW.**
   - Compare against the previous cycle and the best-ever cycle.
   - List the top 3–5 problems by impact on the overall score and on the player experience.
   - Check for regressions.
   - Write a short honest review in `docs/CYCLE_LOG.md`: what got better, what got worse, what is still weak.
3. **IMPROVE** *(effort: low/medium to build, high to fix bugs)*.
   - Make focused changes that target the top problems: code, content, Lexical Director tuning, performance, art, audio manifest, speech matching thresholds, assists. Prefer small, testable changes.
   - Re-run the affected suites.
   - **Keep a change only if the overall score improves (or a bug is fixed) and Suite R stays at 100%**; otherwise revert it.
   - Log the change and result.
4. **RESEARCH.**
   - When a problem can't be solved from what you know, do targeted research. Examples: a better Arabic phoneme model, a splat compression trick, how a famous game handled a similar design problem, a licence clarification, Arabic coverage thresholds, a better TTS voice.
   - Follow the sourcing rule. Record sources in `docs/SOURCES.md` and the takeaway in `docs/DECISIONS.md`.
   - Feed it into the next cycle's improvements.
5. **COMMIT and update `STATE.md`:** cycle number, scores, best-ever score, what's next.

### 18.2 Breadth across cycles

Rotate focus so the whole game improves, not just one metric. A suggested rotation:
- Cycles 1–10: foundations (repo, `CLAUDE.md`, content pipeline, lab skeleton, Suite R, speech page port).
- Cycles 11–30: the vertical-slice systems (daily loop, Lexical Director, journal, friendship, Quran meter, navigation).
- Cycles 31–60: content and pedagogy (10 days, 150 lemmas, twists, coverage tuning, synthetic learners).
- Cycles 61–80: speech, performance, iPhone budgets, offline and PWA.
- Cycles 81–100: art, audio, feel, polish, accessibility, persona reviews.
- 100+: whatever the scoreboard says is weakest.

Every 10 cycles, do a **deep review**: re-read the hard rules and this prompt, check nothing has drifted, re-run the full synthetic-learner population with fresh random seeds, and write a milestone report for Edward (section 20).

### 18.3 Stopping rule: when is it "very good"?

Continue past 100 cycles until **all** of these hold. Only then declare version 1 "very good" and stop:
1. Suite R at 100% for the last 20 cycles.
2. Suite C ≥ 99% pass, and every scene within its coverage target.
3. Reply system: tap, tiles and typing work in every scene; the ladder rules pass. Voice (feature flag) is enabled only when Speech Job 1 reaches ≥ 95% line-pick accuracy at ≥ 10 dB SNR, ≤ 2% false accepts and median latency ≤ 1.5 s; until then it stays off and does not block "very good".
4. Performance within all budgets in the WebKit iPhone profile.
5. Zero crashes or soft-locks across all gameplay bots for 10 consecutive cycles.
6. Synthetic learners:
   - Median ≥ 120 of 150 lemmas retained after a simulated 7-day break.
   - Frustration events ≤ 1 per in-game day for slow profiles.
   - No scene below the coverage floor.
7. Visual rubric ≥ 8/10 on every area.
7b. Typed-answer checker: ≥ 99% correct classification on the generated slip set; zero root-changing errors accepted as correct.
8. **Plateau:** the overall score has improved by less than 1 point over the last 10 cycles, despite at least 3 different improvement strategies being tried. Record which strategies were tried.

If you reach a hard limit you can't solve in the lab, record it clearly and move to other work rather than looping on it. Examples: real-iPhone microphone behaviour, Safari's recogniser, real-human playtesting, reciter audio, scholar review.

### 18.4 Working across sessions

Your sessions end; the work must not. At the start of every session:
1. Read `CLAUDE.md`, `STATE.md` and the last `CYCLE_LOG` entries.
2. Continue the next cycle.

Never restart from scratch. Keep everything resumable. If a session is about to end, finish the current step, commit and update `STATE.md` first.


### 18.5 Effort policy (switch with `/effort` as you go)

Effort sets how much compute and self-checking you spend. Higher effort catches missed edge cases, but it costs about 3× the tokens at max and makes more assumptions on Edward's behalf. **Do not run max on everything.**

| Step in the cycle | Effort | Why |
|---|---|---|
| Building features: scenes, UI, content plumbing, art and audio wiring | **low → medium** | Sketch fast, iterate; most cycles are here |
| Writing graded Arabic content | **medium**, then **high** for the validation pass | Content is cheap to draft, costly to get wrong |
| Fixing bugs; regressions | **high** | Bugs hide in edge cases |
| Verification: Suite R (hard rules), Quran text integrity, licence checks, typed-answer checker, ladder rules | **high** | Full of hidden edge cases; this is where effort pays off most |
| Targeted research step | **medium**; **high** for licensing or Islamic-ruling questions | Accuracy matters more there |
| Deep review every 10 cycles (whole game vs. hard rules, prompt and scoreboard) | **max** | Claude works alone end to end; that is where max is worth it |

Rules:
- **Effort catches what you forgot; it does not fix the wrong approach.** Before any large feature, re-read the relevant prompt section (the spec) and restate the goal in one line in `CYCLE_LOG.md`. If the spec is ambiguous, follow section 22 rather than guessing at high effort.
- If a high-effort run disagrees with the spec, the spec wins. Record the conflict in `DECISIONS.md`.
- Record the effort level used for each step in `CYCLE_LOG.md`, so token use can be reviewed.

---

## 19. Things you can't test in the lab: keep a short list

Maintain `docs/HUMAN_CHECKS.md` with only what truly needs a real human or real device, written so Edward can hand it to a friend later:
- Real iPhone microphone in Safari and in the home-screen app.
- Safari's recogniser on a real device.
- Real fps on a real iPhone.
- 3–5 real beginner playtesters (silent playtest where they retell each scene).
- Scholar review.
- Reciter commission.

Keep it under one page.

---

## 20. Reporting to Edward

Edward reads on his phone and can't review constantly. So:
- **Every 10 cycles**, write `docs/reports/milestone-NN.html`: a fun, visual, super easy one-page summary.
  - Score chart over cycles; what got better; 3 screenshots; what's next; anything he must decide.
  - Follow the hard rules in the report's own images: no faces, no female figures, no music.
- Keep each report under 2 phone screens.
- Never ask him to run technical steps. If something truly needs him, put it at the top in one plain sentence.

---

## 21. Things you must never do

- Break a hard rule (section 1) for any reason, including "temporary" placeholders.
- Ship or commit unlicensed or unclear-licence content: QAC data, reciter audio, non-commercial scans, copyrighted textbook text, modern Rihla translations.
- Spend money, sign up for paid plans or enter payment details.
- Commit API keys or secrets.
- Add analytics that identify people, ads, dark patterns or random paid rewards.
- Generate Quran recitation with AI, alter Quran text, or place Quran content in disrespectful contexts.
- Promise fluency speeds.
- Use Unreal, Unity web or other paid or ruled-out tech for version 1.
- Plan or send outreach to AMAU, Dakwah Corner or the Madinah-book publishers.

---

## 22. When to stop and ask Edward (only these)

- A decision that is **irreversible and genuinely could go either way**, such as publishing publicly or choosing the final game name.
- Anything that would **cost money**.
- Anything touching his **Apple or Cloudflare accounts** or other credentials you don't have.
- Any conflict between the hard rules and something else he asked for.

Ask in one short plain sentence, then continue with other work while waiting.

---

## 23. Known open questions (research or test during cycles)

- Exact Quran coverage curve (recompute from Tanzil).
- Arabic-specific comprehension thresholds (measure with synthetic learners; flag as estimates).
- Whether the Tanzil licence allows word-level display.
- In-browser Whisper speed on iPhone (real device needed; estimate in the lab).
- Groq free-plan limits.
- Piper `ar_JO` voice licence.
- Azure Arabic visemes (not needed now: no mouths).
- Whether WebGPU works inside Tauri on Windows.
- A free Arabic phoneme model good enough for Job 2 on non-Quranic speech.
- Muslim-world frequency lists for MSA (KSU, KACST).
- Best free male Arabic TTS voices.
- How to make faceless characters maximally expressive (research mime, puppetry and faceless-character games).

---

## 24. Your first session: do these in order

1. Read all of `docs/research/` and write `docs/RESEARCH_DIGEST.md`.
2. Write `CLAUDE.md` (hard rules, sourcing rule, cycle procedure) and `STATE.md`.
3. Scaffold the repo (section 16) with Vite + React Three Fiber + TypeScript; Vitest and Playwright installed and configured for Chromium and WebKit with iPhone profiles.
4. Build Suite R first (hard-rule checks), so nothing that breaks the rules can ever enter the build.
5. Build the content pipeline skeleton:
   - Lemma database schema, tashkeel validator and coverage calculator.
   - Tanzil text import with verbatim checks.
   - Quran coverage computation (record the real staircase numbers in `DECISIONS.md`).
6. Build the reply system first: the intent table, tap options, tiles, in-game Arabic keyboard, typed-answer checker and word-ladder state (section 9A). In parallel, port Edward's speech test page logic into `app/speech/` behind a feature flag and start Suite S.
7. Write `lab/SCORING.md` and produce the first scoreboard.
8. Mark this as **cycle 1** and begin the Test → Review → Improve → Research loop. Keep going.

Begin now. Work steadily and carefully, and keep going until the game is genuinely very good, following the rules above.
