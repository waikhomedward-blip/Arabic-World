# Master prompt: applied or not? (honest status, 16 Nov 2026, after cycle 5)

✅ done · 🟡 partly · ❌ not started · ⏸ changed by Edward since (see DECISIONS.md)

## §0A Latest decisions
| Item | Status |
|---|---|
| Web app only | ✅ |
| Android Chrome equal first target | ✅ tested on Pixel 7 + budget Android profiles |
| Three quality tiers (pre-rendered / baked WebGL2 / WebGPU+splats) | ❌ only one tier, and it was a grey-box until cycle 6 |
| Two Quran meters | ⏸ optional Quran track (Edward); ❌ not built |
| Tashkeel full, faded later on everyday text | 🟡 full tashkeel everywhere; ❌ fading not built |
| Smooth heads | ✅ + rule check |
| Hijazi-style quarter | ⏸ open port-city quarter (Edward); 🟡 art only from cycle 6 |
| Privacy: no accounts, analytics, ads; export backup | ✅ |
| Blockers (adhan licence, recitation, backgammon, feminine forms) | 🟡 recorded; adhan outside 08:00–11:00 anyway |
| Use master_backlog.md P1 items each cycle | ❌ file never provided |

## §1 Hard rules
| No faces / modest dress / no female characters / no music | ✅ checked every cycle (no-female now strict) |
| Quran etiquette, mute during adhan, no prophets/Companions, no loot boxes | ✅ in code and checks (Quran content itself not built) |
| Scholar review gate | ✅ gate + generated SCHOLAR_REVIEW.md |

## §2 Sourcing rule | ✅ SOURCES.md labelled
## §3 Vision
| Immersion, engaging without manipulation, warm/cozy | 🟡 systems yes; feel weak until visuals/voices exist |
| Realistic visuals | ❌ → cycle 6 |
| Characters speak with real audio | ❌ no voices (licence decision pending) |
| Player voice input in parallel | ❌ |

## §4 Read the research first, write RESEARCH_DIGEST | 🟡 two of eight reports existed; digest written
## §5 Learning science
| 95–98% known-word coverage per scene | 🟡 measured per line; scene coverage low early on |
| Arabic captions, tap for English | ✅ |
| Grammar "noticing" moments | ✅ root notices |
| Prompt before correcting | ✅ recast → options → modelled |
| ~10 spaced encounters, FSRS, next-day re-test | 🟡 FSRS-lite + morning check ✅; only ~27% of words reach 10 encounters |
| Every word twice in two situations | ✅ checked |
| Root-and-pattern mechanic + A/B | 🟡 notices yes; root-family unlock + A/B ❌ |
| Separate speaking track | ❌ |

## §6 Curriculum | 🟡 80 of ~150 lemmas; tiers tagged; minimal-pair pronunciation games ❌; CAMeL Tools validator ❌ (own validator only)
## §7 Quran layer | 🟡 Tanzil imported verbatim + checks; meter, station ❌; QAC not shipped ✅
## §8 Story and world
| Composite student story | ⏸ traveller hero; story spine/arcs ❌ (transcripts downloading) |
| Ibn Battuta legends | ❌ |
| One layered neighbourhood (home+rooftop, souq, café, shop, square) | 🟡 places exist as blockout; rooftop ❌ |
| Routines tied to prayer times and meals | ⏸ 08:00–11:00 only; routines ❌ |
| Navigation without minimap, triangle rule | ❌ (no free walking yet) |
| Faceless characters done well (silhouette, walk, voice, speech cue) | 🟡 head bob + bubble; walk cycles/gestures ❌ |

## §9 Game systems
| Daily loop (texts on waking, errands, listening input, guesses confirmed, journal, sleep) | 🟡 errands + morning check + journal list; phone texts ❌, radio ❌, guess journal ❌ |
| Scene structure introduce→practise→twist | 🟡 |
| Lexical Director (track, pick line variants, hold coverage, pacing) | 🟡 reply-type choice ✅; variant picking coded but **no content has variants** |
| Friendship levels + milestone scenes, never decays | 🟡 counter ✅; milestone scenes ❌ |
| Mistakes kind, no red X, 3-miss rule, Companion assists | ✅ / assists ❌ |
| Two progress displays | 🟡 "Words I understand" ✅; Quran meter ❌ |
| Days in the city, no streaks, optional reminder | ✅ / reminder ❌ |
| Word-of-the-day share card | ✅ |
| Hijri calendar events | ❌ |

## §9A Reply modes and word ladder — build rules 1–14
| 1 intent table · 2 full-line options · 3 per-word ladder state · 4 advance rules · 5 miss rules · 6 director mix · 7 free mode switch · 8–9 checker · 10 failure flow · 12 tiles | ✅ |
| 11 keyboard (Apple layout, long-press, hidden harakat, system keyboard suppressed) | ✅ |
| 13 rewards: journal + Quran meter only | 🟡 Quran meter ❌ |
| 14 voice v1 | ❌ |

## §12 Tech
| R3F + TS + Vite; WebGPU with WebGL2 fallback | 🟡 WebGL2 only |
| Gaussian splats (Spark) | ❌ |
| Cloudflare Pages hosting | ❌ (not deployed; needs Edward's account) |
| PWA home-screen app | 🟡 manifest + PNG icons ✅; **offline service worker ❌** |
| MPFB2 / Mixamo characters | ❌ (procedural primitives; Blender not installed) |

## §13 Speech | ❌ (speech test files never provided); Suite S not built
## §14 Voices/TTS | ❌ blocked on licence/cost decision
## §15 v1 scope | 🟡 see above
## §16 Repo standards | ✅ (CLAUDE.md, STATE, docs, lab, Vitest, Playwright, commits per cycle)
## §17 Test lab
| Suite R | ✅ |
| Suite C | ✅ (+ bias, universal, review-free checks) |
| Suite S speech | ❌ |
| Suite P performance | ✅ 5 devices (M1 GPU, not real phones) |
| Suite G bots + fuzz; accessibility | ✅ |
| Suite L synthetic learners (100+ profiles, 4 modes, checker slips) | ✅; **persona reviews (role-played players) ❌** |
| Suite V visual: screenshots ✅; **art-bible rubric scoring ❌; face detector on renders ❌** |
| Scoreboard + SCORING.md | ✅ |

## §18 Cycle
| Test → review → improve → research, commit, STATE | ✅ 5 cycles |
| Rotation (cycles 1–10 foundations) | ✅ |
| Deep review + milestone HTML report every 10 cycles | ❌ due at cycle 10 |
| Effort recorded per step | ✅ |

## §19 HUMAN_CHECKS | ✅ · §20 milestone reports | ❌ (first at cycle 10) · §21 never-do list | ✅ · §22 ask-only list | ✅

## Biggest gaps, in order of what a player would notice
1. **Visuals** (cycle 6, now). 2. **Voices** (decision needed). 3. **Story spine and friend scenes.** 4. **Living world**: routines, overheard chatter, phone texts, radio. 5. **Offline PWA.** 6. **Lexical Director line variants** (content has none). 7. Persona reviews and visual rubric in the lab.
