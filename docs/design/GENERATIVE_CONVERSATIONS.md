# Millions of varied scenarios and conversations (Edward, 17 Nov 2026)

Goal: every day in the city feels new — effectively unlimited, varied scenarios and conversations — while every line stays correct Fusha with full tashkeel, inside the hard rules, at the right level for each player.

## How: a scenario generator, not hand-written scenes
A scenario = **place × errand × objects × quantities × people × twist × phrasing**, assembled from parts that are each written once and verified.

| Part | Examples | Count (v1 target) |
|---|---|---|
| Place | home, souq, shop, café, square, bakery, workshop, rooftop (morning) | 8–12 |
| Errand | buy, ask the way, deliver, borrow, return, help carry, count, describe, choose, compare, greet a newcomer | 30–40 |
| Objects | bread, water, apples, tea, books, pens, keys, crates… (each with gender, plural, colour/size adjectives) | 150 → 1,000 lemmas |
| Quantities | 1–10, dual, plural, prices | 10–20 |
| People | the cast + background men, each with a speech level and personality | 10–20 |
| Twist | out of stock, wrong item, too far, a friend arrives, a small misunderstanding, a kind surprise | 10–20 |
| Phrasing | 3–5 variants of each line per level (the Lexical Director picks by known words) | ×3–5 |

40 errands × 300 objects × 10 quantities × 12 people × 12 twists × 4 phrasings ≈ **69 million** distinct scenarios, before counting the order of steps.

## What keeps generated Arabic correct
- **Grammar engine in the Arabic language pack:** noun gender and plural from the lexicon; adjective agreement; numbers 1–10 with gender polarity; the dual; definite article with sun/moon-letter assimilation and the correct tashkeel; idafa; pausal endings in speech, full case endings when reading.
- **Every template is written once with full tashkeel and reviewed** (native-speaker check on templates, not on every output).
- **Every cycle the lab generates thousands of conversations** and runs them through Suite C (tashkeel, lemmas, coverage 95–98%, answer bias, universal-first, review-free) and Suite R (no female persons, no faces, 08:00–11:00, no music). A template that ever produces a bad line is fixed or removed.
- **The Lexical Director chooses** the scenario and phrasing for each player so that each scene stays at 95–98% known words, with 1–2 new words carried by what is on screen.

## Later (after v1): open conversation with an Arabic AI friend
Per master prompt §14: Jais 3 (MBZUAI, Apache-2.0) or ALLaM/Fanar, with every reply checked against the player's known words and the hard rules, regenerated if it fails. Optional; never required for progress.

## Register order (Edward, 17 Nov)
1. **Fusha / Modern Standard Arabic first, for everyone.** All speech in the main game is MSA (with relaxed pausal endings in conversation); reading and Quran text fully vowelled.
2. **Dialects only for advanced players,** as an optional later module (Egyptian, Levantine, Gulf…), unlocked after the MSA core. Beginners hear no dialect lines.
