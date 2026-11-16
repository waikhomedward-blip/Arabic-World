# Review of three guidance documents (16 Nov 2026)

Documents: *Arabic World: world and story bible*, *Game visuals playbook: realistic graphics with AI agents*, *Building a product with AI agents: the playbook*. Private copies are in `research-private/docs/` (not published).
Method: every checkable factual claim was looked up; design opinions were judged against the master prompt, the hard rules and the universal-first rule.

## Verdict in one line each
- **World and story bible: good, use it.** It follows the master prompt and hard rules. Its facts check out. Its value is the *design* (living-world systems, story layers, quest types, art direction), which fills real gaps. Six points need changes (below).
- **Visuals playbook: sound principles, wrong genre, a few loose numbers.** It was written for a driving game (car paint, asphalt, cockpits). The general rules are correct and standard. Two numbers are context-dependent or optimistic, and one licence is wrong. Use it with the corrections below.
- **Agents playbook: good, already adopted** in cycle 4 (verification rig, lessons file, skills, answer-bias audit).

## World and story bible — claims checked
| Claim | Check | Status |
|---|---|---|
| Hijazi houses of coral stone and plaster with teak *rawasheen*, 3–5 storeys | UNESCO (Historic Jeddah, inscribed 2014): tower houses up to **7** storeys; southern houses 3–4; coral rubble + lime mortar with horizontal timber, lime plaster, roshan screens for privacy and airflow; no courtyards in tower houses; ground floors for shops | ✅ correct (3–5 is a safe subset) |
| "Triangle rule" for landmarks (BotW) | Real, but it was presented at **CEDEC 2017** (Fujibayashi & Yonezu), not GDC; large = landmarks, medium = hide/reveal, small = pacing | ✅ (source corrected) |
| *Mirage* music over the adhan drew complaints | Already sourced (Axios 2023) in the research digest | ✅ |
| Ibn Battuta only from the public-domain Arabic *Rihla* | Already sourced; matches the master prompt | ✅ |
| Storey ≈ 3.2 m, lane 2.5–4 m | Plausible; no primary measurement found yet | ⚠️ to measure from survey drawings (plan item A2) |
| Midday cicadas, night dogs in the soundscape | Not verified for the Hijaz; dogs may jar some players | ⚠️ swap night dogs for cats/wind until checked |

**Changes needed before using the bible:**
1. **Cast names.** The bible uses Abu Yusuf, Yusuf, Hamza, Bilal, Harun. These are permissible names (Jordan's Dar al-Iftaa; al-Qaradawi), but four are names of prophets or famous Companions, and "Bilal" in a courtyard with an adhan invites confusion with the Companion. **Keep our current cast** (Abu Faisal, Faisal, Majid, Tariq, Karim, Nabil, Saeed) and borrow the bible's *roles and arcs* (homesick friend, shop in trouble, storyteller who misses his father).
2. **The bible's day plan differs from the 10 days already built.** Its story beats are stronger (help in the shop, directions across the quarter, rain and a power cut with lantern stories, a delivery mix-up only you can solve, a rooftop finale where you understand a joke). Merge them into days 4–10 over the next content cycles rather than rewriting.
3. **Universal first.** The bible's frame is "a non-Arab Muslim student". That is fine for the hero, but the player must not need to share it. Keep the hero's own faith natural and private; every comprehension check stays neutral (already enforced by Suite C).
4. **Scope.** "As alive as GTA V / RDR2" must stay inside "one small dense quarter" (master prompt). Routines, overheard chatter, phone and radio are the right systems, built small.
5. **Setting.** The bible's architecture is Jeddah's Al-Balad style; the master prompt sets the game near the Haram in Madinah. Hijazi roshan houses existed in all Hijazi cities, so the style fits, but **never model a recognisable real building**.
6. **Day 6 "first words heard in the Quran"** stays in the sanctuary context only, whole verses, with a neutral "listen" interaction (no scoring of anything religious).

## Visuals playbook — claims checked
| Claim | Check | Status |
|---|---|---|
| Non-metal base colour about 0.04 (charcoal) to 0.8 (fresh snow), linear | Matches published albedo charts (Unreal docs list charcoal 0.02, fresh snow 0.81) | ✅ |
| Metalness 0 or 1; vary roughness | Standard PBR guidance | ✅ |
| Fog density ≈ 2 / visibility | Correct **only for three.js `FogExp2`**, which uses exp(−(density·d)²): at d = visibility the remaining contrast is e⁻⁴ ≈ 2%, matching Koschmieder's 2% threshold. For plain exponential fog the factor is **3.912 / visibility** | ⚠️ context-dependent; note it |
| AgX or ACES tone mapping, once | AgX is in three.js (r160, gamut fix r161); our three@0.170 has it | ✅ |
| N8AO is MIT | It is **CC0** (even freer) | ❌ minor error |
| Poly Haven, ambientCG, Kenney CC0; glTF Transform MIT; Playwright Apache-2.0 | Known licences | ✅ |
| Phone budgets: ≤400 draw calls (recent phone), ≤250 (budget Android), 0.3–1M triangles | **Optimistic for WebGL.** Mobile guidance commonly says 100–150 draw calls for mid-range and stutter at 150–250 on low-end; no authoritative triangle standard exists | ⚠️ use ≤150 / ≤100 draw calls; set triangles from measurement (we are at ≤41 calls, ≤11k triangles) |
| Car paint, asphalt, cockpit sections | Not relevant to this game | — skip |

## Sources
- UNESCO World Heritage Centre, Historic Jeddah, the Gate to Makkah (No. 1361) — https://whc.unesco.org/en/list/1361/ (Saudi nomination by the Saudi Commission for Tourism and Antiquities; Muslim-world institution)
- Koschmieder relation V = 3.912/β — https://core.ac.uk/download/226119304.pdf (general physics; affiliation n/a)
- three.js FogExp2 docs — https://threejs.org/docs/pages/FogExp2.html (tech documentation)
- three.js AgX gamut fix, PR #27413 — https://github.com/mrdoob/three.js/pull/27413
- N8AO repository (CC0) — https://github.com/N8python/n8ao
- Unreal Engine physically based materials — https://dev.epicgames.com/documentation/en-us/unreal-engine/physically-based-materials-in-unreal-engine (non-Muslim; tech docs)
- BotW triangle rule, CEDEC 2017 — https://www.nintendolife.com/news/2017/10/zelda_breath_of_the_wilds_ingenious_design_is_all_about_triangles_apparently (non-Muslim, labelled; no Muslim source covers it)
- Mobile draw-call guidance — https://gamedev.net/tutorials/programming/why-your-unity-game-starts-lagging-on-mobile-and-how-to-fix-it-1-r6169 (non-Muslim, labelled; secondary)
- Names of prophets for children are permissible — https://aliftaa.jo/article-en/5606/Rulings-for-Naming-The-Newborn-Babies (Jordan General Iftaa Department; Muslim)
