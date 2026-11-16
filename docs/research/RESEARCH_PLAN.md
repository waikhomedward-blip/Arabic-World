# Research plan: what to research next (16 Nov 2026)

How items were chosen: (1) does it block or reshape the next 5–10 cycles, (2) how costly is a wrong guess (hard rules, licences, money), (3) can a lab or a source actually settle it. Sources: master prompt §23, the research digest, the three guidance documents, the cycle logs, and Edward's two new rules (universal first; may become other languages).

## P1: start now (blocks visible progress or carries real risk)
| # | Question | Why it matters | Status |
|---|---|---|---|
| A1 | **Real Hijazi old-quarter architecture**: heights, materials, roshan proportions, doors, rooftops, colours, street widths | The world still looks like grey boxes; the rooftop set and art pass need real numbers | **Started**: UNESCO facts recorded below |
| A2 | Measured street and storey sizes from survey drawings (Saudi Heritage Commission / Historic Jeddah programme) | "Toy scale" makes a world look fake | Open |
| B1 | **Male Arabic voices at $0 with a clear commercial licence** | No voices yet; this is the biggest gap a player would notice | **Started**: see findings; needs Edward's decision |
| C1 | **Showing Quran text to a mixed audience**: rulings on display, touch, non-Muslim readers, translation alongside | Universal first + Quran station | **Started**: findings below |
| D1 | **Language-pack architecture**: which parts of a language-learning game are language-specific (script, normaliser, checker, keyboard, morphology, direction, fonts) and how others structure it | Edward may build other languages; refactor cheaply now rather than later | Open (next) |
| E1 | **Hero's story beats** from student-journey transcripts (Madinah College, Al-Andalusi, AMAU, Rahmaniyyah) | Story spine and friend arcs | Running: transcripts downloading (private) |

## P2: next 10 cycles
| # | Question |
|---|---|
| F1 | Arab body language and gestures (hand on heart, fingertips bunched for "wait", head toss for "no"): meanings, regional differences, how to animate them on faceless characters (Muslim-world sources first; mime/puppetry for technique) |
| F2 | NPC daily routines and overheard chatter systems (RDR2-style schedules) at web scale |
| F3 | Hijazi soundscape without music: real ambient sounds of an old quarter; CC0 sound libraries; the adhan licence |
| F4 | Lighting the world at golden and blue hour in three.js on phones (baked light, HDRI from Poly Haven, AgX) |
| F5 | Lemma-level Quran coverage: the game's own morphology layer (CAMeL Tools install on this Mac) |
| F6 | Tanzil: does word-level display count as "verbatim"? (ask Tanzil directly) |
| F7 | Muslim-world MSA frequency lists (KSU, KACST) for the everyday word layer |

## P3: later
Speech Job 1 on real iPhones; Jais-3 for AI friends; Windows/Tauri; market and pricing per country; VR.

---

## Findings so far

### A1. Hijazi architecture (UNESCO, Historic Jeddah)
- Merchants' **tower houses up to 7 storeys** (late 19th century boom after the Suez Canal opened in 1869); southern houses 3–4 storeys.
- Walls of **coral rubble ("mangabi" stone, quarried near the old city) in lime mortar, reinforced with horizontal timber**, finished in **lime plaster**, often with sgraffito decoration at street level.
- **Roshan** (oriel windows with pierced, fretted wooden screens) for privacy and airflow; tower houses have **no courtyards**; ground floors used for shops and offices, upper rooms often rented to pilgrims.
- The townscape also has lower coral houses, mosques, ribats, souqs and **small squares**.
- Game use: vary storeys 3–6; sgraffito bands at street level; roshan on upper floors; shops on ground floors; small squares as the "medium triangles".

### B1. Male Arabic voices
- **Azure prebuilt male Arabic voices exist for 14+ locales** (e.g. ar-SA-Hamed, ar-EG-Shakir, ar-JO-Taim, ar-SY-Laith, ar-KW-Fahed, ar-QA-Moaz, ar-AE-Hamdan). Microsoft improved Arabic diacritic pronunciation for ar-SA and ar-EG voices.
- **Licence catch:** Microsoft's Product Terms (as quoted on Microsoft Q&A) grant commercial use of the audio output to **paid-tier** customers; whether the free tier (F0) carries the same right is disputed. **Shipping Azure audio safely may therefore cost money** → Edward's decision.
- **Piper `ar_JO` "kareem" is out:** it was fine-tuned from the *lessac* voice, whose Blizzard 2013 data is licensed for **non-commercial research only**; the Piper maintainer says derivatives can't be used commercially.
- Options for Edward: (a) pay-as-you-go Azure for a one-off render (the scripted lines are about 10–20k characters, so the cost is likely cents to a few dollars, to be confirmed on the pricing page); (b) record volunteer male native speakers under a simple written release (best quality and authenticity, $0); (c) check Google Cloud TTS free-tier terms; (d) keep captions-only until then.

### C1. Quran text for a mixed audience
- Scholars widely treat a **screen as not equivalent to a physical mushaf** (Islamweb 465004; AMJA): touching a device with a Quran app does not require ritual purity, though some (e.g. a Trinidad fatwa) are stricter.
- Islamweb (358672): **no harm in sending a translation of the Quran to a non-Muslim, even if it contains verses in Arabic.**
- Islamweb: displaying the Quran on an impure surface, or with intent to mock, is impermissible → matches our sanctuary-only rule.
- No ruling found that specifically addresses non-Muslims viewing Quran text inside an app or game → **scholar-review question** (added to HUMAN_CHECKS).
- Game use: the Quran station shows verse + QuranEnc translation together, in calm sanctuary context only; optional, never required for progress; an optional note on etiquette (wudu reminder, offered not demanded).

## Sources
- UNESCO WHC 1361, Historic Jeddah — https://whc.unesco.org/en/list/1361/ (Saudi nomination; Muslim-world institution)
- Azure Arabic voices list — https://learn.microsoft.com/azure/ai-services/speech-service/language-support (tech docs)
- Azure Arabic pronunciation update — https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/azure-ai-voices-in-arabic-improved-pronunciation/4360306
- Azure TTS output use rights (Q&A quoting Product Terms) — https://learn.microsoft.com/en-us/answers/questions/577589/commercial-use-rights-of-sounds-produced-with-text ; https://learn.microsoft.com/answers/a/12933078 (non-Muslim, vendor; verify against Product Terms)
- Piper kareem model — https://huggingface.co/rhasspy/piper-voices/tree/main/ar/ar_JO/kareem ; lessac licence — https://www.cstr.ed.ac.uk/projects/blizzard/2013/lessac_blizzard2013/license.html ; Piper discussion #271 — https://github.com/rhasspy/piper/discussions/271
- Islamweb fatwa 465004 (touching a phone with a Quran app) — https://islamweb.net/en/fatwa/465004 ; Islamweb fatwa 358672 — https://www.islamweb.net/en/fatwa/358672 (Muslim)
- AMJA on touching the screen — https://www.amjaonline.org/?p=17860 (Muslim)
