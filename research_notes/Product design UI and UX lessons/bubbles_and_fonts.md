# Speech-bubble dialogue UI and legible vowelled Arabic fonts for a phone-browser 3D game

Scope note: gap-filling round. About 16 tool calls. Items marked [unverified] were not confirmed in a primary source. Sizes marked "measured" were measured on 18 Nov 2026 by sending HEAD requests to Google Fonts' CDN files, not read from documentation.

## 1. Comics balloon conventions (tail, order, placement, line length, padding; RTL)

### Takeaway
Primary lettering guidance (Blambot) gives usable rules for tail aim and length, off-panel speakers and multiple speakers. It gives nothing numeric on line length or padding, and I found no authoritative source on Arabic-comics balloon order. For Arabic, the safe default is to read the whole page right to left and top to bottom.

### Cited Findings
- Aim the tail at the speaker's mouth, as if an invisible line ran on to the face. Avoid pointing it at a hand or leg. — [Blambot, Comic Book Grammar & Tradition](https://blambot.com/articles_grammar.shtml) (read via summarising fetch tool, not verbatim)
- Tail length: it should end roughly 50-60% of the way from the balloon to the head. — [Blambot](https://blambot.com/articles_grammar.shtml); Tapas gives a similar "halfway" rule: [Tapas, Dialogue 101](https://tapas.io/newsfeed/183)
- Off-panel speaker: the tail runs to the panel border, or the balloon has no tail, depending on the editor. For a speaker behind a door, a "squink" burst tail marks the hidden source. — [Blambot](https://blambot.com/articles_grammar.shtml)
- Two speakers in one panel: stagger the balloons and join them with connectors. Joining directly is common when space is tight. — [Blambot](https://blambot.com/articles_grammar.shtml)
- Avoid "tangents", where a balloon nearly touches another element without overlapping. Butt balloons against a panel border when tight, and overlap consistently if at all. — [Blambot](https://blambot.com/articles_grammar.shtml)
- Blambot's page does not cover reading order, line length or padding. — [Blambot](https://blambot.com/articles_grammar.shtml)
- Manga, which also reads right to left, orders both panels and balloons right to left and top to bottom. — [Google Arts & Culture, Grammar of Manga](https://artsandculture.google.com/story/EAWB4YvyVDqJJQ); [LlamaGen guide](https://llamagen.ai/guides/manga-reading-order) (low-quality vendor source)
- Arabic editions of Western comics have localised balloon text since at least 1938. — [Cambridge Core PDF, "heterotopic materiality comics and translation"](https://core-prod.cambridgecore.org/core/services/aop-cambridge-core/content/view/3EB29BA8FC1323692B7F1BF534171773/S0030812923000627a.pdf/heterotopic-materiality-comics-and-translation.pdf) (as summarised in search result)

### Inferences
- For one-speaker-at-a-time game dialogue, reading order mostly does not matter. Where two speakers have bubbles on screen at once, put the earlier line to the right and higher, and the later line to the left and lower. This is inferred from Arabic RTL reading, not from a sourced Arabic-comics rule.
- Tail rule for a faceless character: there is no mouth, so aim at a fixed "voice point". That is the top-centre of the head or a point just above it. Use a tail length of about half the distance to that point. Blambot's 50-60% rule is the basis.
- Keep one bubble per speaker on screen at a time. This avoids tangents and the connector problem.

### Gaps
- McCloud's "Understanding Comics" and "Making Comics", Comicraft, and Nate Piekos' numeric rules (balloon padding, max words per balloon, tail width) were not retrieved. Rules of thumb such as "about 25-30 words per balloon" are [unverified].
- No primary source found on balloon order in Arabic-original comics (Majid, Lebanese or Egyptian). The Deena Mohamed interview at [The Comics Journal](https://www.tcj.com/storytelling-is-controlling-the-emotions-you-want-to-evoke-an-interview-with-deena-mohamed-artist-of-shubeik-lubeik/) is a lead I did not read.

## 2. How shipped games handle world-anchored bubbles

### Takeaway
Evidence is thin. Oxenfree is the one well-documented world-anchored case (bubbles over the character's head, with choices as bubbles). The authors later said they did not want to be known for that mechanic. I found no sourced details on occlusion, off-screen speakers or logs for Animal Crossing, Night in the Woods, Tunic, Sky, Pikmin, A Short Hike or Untitled Goose Game.

### Cited Findings
- Oxenfree: speech bubbles float over the protagonist so the player chooses replies while still moving ("walk and talk"). Three bubbles appear over her head when a choice exists. — [Wikipedia, Oxenfree](https://en.wikipedia.org/wiki/Oxenfree); [Trusted Reviews](https://www.trustedreviews.com/oxenfree-review)
- Oxenfree used long camera shots so player, NPCs and bubbles all stay visible. — [GDC 17 summary, Thumbsticks](https://www.thumbsticks.com/gdc-17-creating-narrative-gameplay-oxenfree/)
- The Oxenfree designer said the studio doesn't want to be known for bubbles over people's heads. — [Road to the IGF, Game Developer](https://gamedeveloper.com/design/road-to-the-igf-night-school-studio-s-i-oxenfree-i-) (as reported in search snippet)
- Animal Crossing: the text box is fixed at the screen bottom, not a world bubble. Each character has its own per-letter sound, so players can tell speakers apart. A button speeds up text. — [Game Revolution](https://www.gamerevolution.com/guides/640242-animal-crossing-new-horizons-speed-up-text-conversations-speech), [itch.io dev post](https://itch.io/post/8430769) (hedged). Per-letter sounds conflict with our no-music rule only if melodic. Plain non-melodic clicks are allowed, but "unsure means it's music".
- Common pacing pattern: a default of 30-50 ms per character, adjustable. A tap during typewriter playback completes the line, and the next tap advances. — [Abratabia dialogue UI guide](https://abratabia.com/game-ui-design/dialogue-ui.php) (secondary, hedged)
- Typical dialogue UI anatomy: speaker name, portrait, text body, advance indicator. — same source

### Inferences
- A world bubble plus a short speaker name label fits our faceless cast: with no mouth or portrait to identify the speaker, the tail and a name or colour tag carry that job.
- Tap-to-advance with tap-to-complete is the safer phone default. Auto-advance is a risk for learners reading vowelled Arabic (see section 5), so make it opt-in.
- A dialogue log (replay of recent lines) is not sourced for any named game. It is worth adding anyway because learners need to re-read lines. [unverified as a convention]

### Gaps
- No sourced details found for Night in the Woods, Paper Mario, Tunic, Sky, Pikmin, A Short Hike or Untitled Goose Game on occlusion, off-screen indicators, multi-speaker handling or logs. GDC talks and the Game UI Database were not reached.

## 3. Technical approach in three.js / React (drei Html, CSS2DRenderer, clamping)

### Takeaway
drei `<Html>` can anchor DOM to a 3D point. Use the default (non-transform) mode so text stays crisp and screen-sized. Handle occlusion yourself (cheap raycast or a simple visibility flag), because drei's `occlude` has reported performance cost. Clamping to the screen must be written by hand: project the point, clamp to an inset rectangle, and move the tail.

### Cited Findings
- `<Html>` props include `center` (-50%/-50% transform, ignored in transform mode), `distanceFactor`, `zIndexRange`, `transform`, `sprite`, `calculatePosition` (override the position function; ignored in transform mode), `occlude` (true or an array of refs, or "blending") and `onOcclude`. — [drei docs, Html](https://drei.docs.pmnd.rs/misc/html)
- With `occlude`, the innermost div gets opacity 0 when hidden. Use `onOcclude` to drive your own fade. — [drei docs](https://drei.docs.pmnd.rs/misc/html)
- In `transform` mode, rendered size depends on camera distance, FOV and `distanceFactor`. Text can look blurry on some devices. The docs suggest scaling the parent down and the child up (the doc example uses 0.5 and scale(2)). — [drei docs](https://drei.docs.pmnd.rs/misc/html)
- `calculatePosition` lets you replace the screen-position function, which is the hook for clamping. — [drei docs](https://drei.docs.pmnd.rs/misc/html)
- A forum user reported `occlude` continuously updating and hurting performance, and that removing it made things much smoother. — [three.js forum, HTML Tag low performance](https://discourse.threejs.org/t/html-tag-low-performance-react/48917)
- Reported issue: `distanceFactor` scaling can freeze during camera transitions, and one workaround is `transform` mode. — [three.js forum thread](https://discourse.threejs.org/t/r3f-react-three-drei-html-distancefactor-scaling-breaks-during-camera-transitions/90429)
- Reported issue: `occlude="blending"` can hide the HTML when a post-processing pass is used. — [three.js forum thread](https://discourse.threejs.org/t/react-three-drei-htmls-occlude-blending-prop-hides-html-leva-etc-when-post-processing-pass-is-used/74487)
- Reported issue: HTML positioned wrongly on iOS. — [three.js forum thread](https://discourse.threejs.org/t/html-content-positioned-wrong-in-ios/77066) (title only, not read)
- Edge-clamp pattern: put the indicator at the target's screen position and clamp x/y to the view rectangle, shrunk by a margin so it is not half off-screen. — [Godot forum](https://forum.godotengine.org/t/putting-an-indicator-on-the-edge-of-the-screen-for-an-off-screen-target/29020)
- Bubble-near-edge problem: when the bubble is pushed on-screen, the tail must be repositioned relative to the speaker, because it is otherwise no longer above them. — [Adventure Creator forum](https://adventurecreator.org/forum/discussion/4384/dialogue-flickers-when-character-close-to-edge-of-screen)
- The Pocket Gems tool doc says a common off-screen convention is a tail that shows the speaker is off-screen. — [Pocket Gems Episode support](https://pocketgems-support.helpshift.com/hc/en/10-episode-writer-s-portal/faq/310-advanced-directing-speech-bubble-placement-overview) (as in snippet)

### Inferences
- Recipe (my synthesis): each frame, `Vector3.project(camera)` the head anchor, skipping when behind the camera (w<0 or z>1). Convert to px. Clamp the bubble rect inside a safe-area inset. Compute the tail angle from the bubble centre to the unclamped point. If the point is off-screen, show an edge arrow instead of the tail.
- Do this in one rAF loop writing `transform: translate3d()` directly to refs, not through React state. At most one or two bubbles are active, so DOM cost stays small, but no benchmark was found [unverified].
- Avoid `occlude` and `transform` mode. Instead fade the bubble when the speaker is outside the frustum or farther than a set distance. If occlusion is needed, one raycast per active speaker at 5-10 Hz is cheaper than drei's per-frame check [unverified].
- Overlap avoidance: with one active speaker there is no overlap. For two, stack the later bubble above the earlier and nudge apart vertically.

### Gaps
- No benchmark of drei `Html` vs `CSS2DRenderer` on phones was found. CSS2DRenderer's behaviour was not documented in the sources I read.
- No source on safe-area or iOS-specific bubble positioning beyond the forum title above.

## 4. Arabic fonts with full tashkeel: licence, size, line-height, file size

### Takeaway
All candidates are free under SIL OFL (Amiri and Scheherazade confirmed from official pages; others from my knowledge of Google Fonts [unverified here]). No source ranked tashkeel legibility at small sizes. On the evidence, the shortlist for a vowelled learner game is Scheherazade New, Amiri and Noto Naskh Arabic, with line-height of about 2.0 and a font size of at least 18 px. Subsets are 79-108 KB each (measured), so use a small custom subset.

### Cited Findings
- Amiri is under SIL OFL 1.1. Its README says active development ran 2008-2022 and no further development is currently planned. — [aliftype/amiri on GitHub](https://github.com/aliftype/amiri)
- Scheherazade New (SIL): OFL, weights Regular, Medium, SemiBold and Bold, and nearly complete Unicode Arabic support. It has a shadda+kasra placement option (Default, Lowered, Raised). Its "Line spacing" option (Tight, Normal, Loose) is only in TypeTuner Web. — [SIL Scheherazade](https://software.sil.org/scheherazade/), [features page](https://software.sil.org/scheherazade/features/)
- Opinion: Amiri is more classical and rich. Noto Naskh "suffers from too much simplified forms". Opinion only, no small-size measurement. — [W3C i18n archive, Khaled Hosny](https://lists.w3.org/Archives/Public/public-i18n-archive/2015OctDec/0152.html)
- A Google early-access font thread said to always set `line-height` for Arabic. Many fonts place marks outside the line box and cause clipping. A LibreOffice bug reports tashkeel cropped below in Amiri when line spacing is tight. — [Google Groups early-access-fonts](https://groups.google.com/g/early-access-fonts/c/-V9j-XYmWyA); [LibreOffice bug 85426 mail](https://lists.freedesktop.org/archives/libreoffice-bugs/2017-October/048489.html)
- One userstyle used Amiri at 2.4rem with line-height 4.8rem (2.0). This is an example, not a standard. — [userstyles.world](https://userstyles.world/style/21788/default-slug)
- W3C ALReq: fonts differ in vowel-mark height (uniform vs. varying by base letter), and shadda+i may sit below the letter or above it. Arabic ascenders and descenders reach further than Latin ones. — [W3C Arabic Layout Requirements §4.2.7-4.2.8, §7.4](https://www.w3.org/TR/alreq/)
- Size study (children aged 9-12): Arabic at 10 px was not readable. 16 and 18 were more readable than smaller sizes. The authors recommend at least 18 (points). Small study on children, which may not transfer. — [Univ. of Huddersfield](https://pure.hud.ac.uk/en/publications/the-optimum-font-size-and-type-for-students-aged-9-12-reading-ara/)
- Measured (18 Nov 2026) Google Fonts woff2 "arabic" subset sizes, via CSS API plus HEAD request. These are the Arabic-script subset files; Latin subsets are separate:

| Font | Bytes |
|---|---|
| Amiri 400 | 108,492 |
| Amiri 700 | 100,024 |
| Noto Naskh Arabic (variable 400-700) | 93,960 |
| Scheherazade New 400 | 79,168 |
| Scheherazade New 700 | 89,488 |
| Lateef 400 | 61,900 |
| Markazi Text (variable) | 41,428 |
| IBM Plex Sans Arabic 400 | 33,512 |
| Cairo (variable) | 30,712 |
| Readex Pro 400 | 9,840 |
| Tajawal 400 | 8,916 |

  Source: `fonts.googleapis.com/css2?family=...` and the resulting `fonts.gstatic.com` URLs. The small sizes for Tajawal and Readex Pro suggest those subsets may be limited, so check they include tashkeel [unverified].
- General: about 20 KB is typical for a web font subset. — [phpied, 222,557 font subsets](https://www.phpied.com/?p=2124) (secondary)
- Noto Naskh Arabic UI regular woff2 is about 52 KB (a different file, rough ballpark). — [Cobalt repo](https://cobalt.googlesource.com/cobalt/+/25399f97090f8a86f56525c38486080cb2747250/src/cobalt/content/fonts/font_files/NotoNaskhArabicUI-Regular.woff2)

### Inferences
- Shortlist: Scheherazade New (smallest of the three Naskh candidates, designed for full diacritics, shadda placement options) or Amiri. Noto Naskh is the fallback if variable weight is wanted. The sans fonts (Cairo, Tajawal, Readex Pro, Plex, Vazirmatn) are more compact, but my knowledge is that sans Arabic fonts often have less carefully designed stacked marks. Not verified in the sources read. Test with a harakat-heavy line before choosing.
- Starting numbers for the bubble: Arabic text 20-22 px (never below 18 px) at line-height 1.9-2.1, at least 8 px bubble padding above and below, and `overflow: visible`. Never `overflow: hidden` on the text element (clipping risk). All [unverified starting values], to be tested on a real phone.
- Subsetting: the game's text is a closed set, so subset to just the glyphs used (letters plus tashkeel marks U+064B-U+0652, plus shadda and hamza forms) with pyftsubset or glyphhanger and keep OpenType shaping tables (`--layout-features='*'`). Expect far below 79 KB [unverified]. Do not strip `mark`, `mkmk`, `ccmp`, `calt`, `liga` features, or vowels will misplace.
- Latin text: Noto Naskh Arabic lacks ASCII coverage, per a LaTeX test. Declare a fallback Latin font. — [Typosetting PDF](https://typosetting.linuxfromscratch.org/files/PDF-lipsum/lipsum-arabic-serif.pdf)

### Gaps
- No side-by-side rendering test at 14-22 px was found. Legibility ranking of tashkeel by font is untested, so run a screenshot comparison on a real phone.
- Licences for Cairo, Tajawal, Readex Pro, IBM Plex Sans Arabic, Vazirmatn, Lateef and Markazi Text were not confirmed in this round (Google Fonts hosts them, so OFL is likely [unverified]).
- Exact recommended line-height from the Amiri or Scheherazade designers was not found.

## 5. Subtitle reading speed (BBC, Netflix, Netflix Arabic)

### Takeaway
Netflix Arabic allows up to 20 CPS (adults), 17 (children), 42 characters per line and 2 lines. The BBC figure is 160-180 words per minute (secondary sources). These are for native readers of mostly undiacritised text, so a learner game with full tashkeel should be much slower.

### Cited Findings
- Netflix Arabic: max 42 characters per line, max 2 lines. Reading speed up to 20 CPS for adult programmes and 17 CPS for children's. SDH is 23 CPS (adult) and 20 CPS (children's). — [Netflix Arabic Timed Text Style Guide](https://partnerhelp.netflixstudios.com/hc/en-us/articles/215517947)
- Netflix Arabic: avoid a single word on the second line. Prefer bottom-heavy pyramid layouts. Never break between verb and subject, noun and modifier, preposition and object, or number and counted noun. — same
- Netflix Arabic diacritics: use them only where absence would change meaning (the guide lists shadda cases and passive-voice dammah). It says tanween fatha goes on the letter before the alef for "technical line-height reasons". — same. The game goes against this rule on purpose (full tashkeel), so it is a reminder that diacritics add line-height pressure.
- Netflix Arabic punctuation: use a single ellipsis character U+2026. No space before commas, ? or !. Do not combine ? and !. — same
- Netflix general: min 5/6 second (about 0.83 s) per event, max 7 seconds, max 2 lines. — [Netflix General Requirements](https://partnerhelp.netflixstudios.com/hc/en-us/articles/215758617)
- BBC: 160-180 WPM (0.33-0.375 s per word), 2 lines maximum, sometimes 3. Characters per line are disputed between sources (none, about 37, about 38). Secondary sources only; I did not reach the BBC document. — [Clevercast BBC summary](https://clevercast.com/bbc-subtitling-guidelines); BBC's own guide is at bbc.github.io/subtitle-guidelines (404 when fetched)
- Other language guides: Slovak is 17 CPS (adult) and 13 CPS (children). — [Netflix Slovak guide](https://backlothelp.netflix.com/hc/en-us/articles/115002812588-Slovak-Timed-Text-Style-Guide) (via search snippet)

### Inferences
- Design budget for a bubble: 1-2 short lines, about 25-35 characters per line (below the 42 cap, because bubbles are narrow on a phone), and at most 2 lines.
- A learner with vowelled text should get about 8-10 CPS or slower, with no timer-based dismissal. This is my judgement from Netflix's children's 17 CPS ceiling, not a sourced figure [unverified]. Use tap to advance and show the full line at once, or with a very short reveal. Typewriter at 30-50 ms/char is about 20-33 CPS, which is fast, and in Arabic, letter-by-letter reveal breaks letter joining. Reveal by word instead [my inference].
- Netflix's "diacritics only where needed" is about speed for fluent readers. It does not apply to our teaching lines, but it supports offering a toggle to show or hide full tashkeel.
- Whether Netflix CPS counts diacritic marks as characters is not stated in the guide text I read [unverified]. Assume base letters only.

### Gaps
- BBC guideline text not retrieved directly (404). The numbers are from secondary summaries.
- No source on CPS for language learners or children's reading of vowelled Arabic.
