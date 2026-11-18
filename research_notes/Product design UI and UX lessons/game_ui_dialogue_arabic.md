# Game UI/HUD, dialogue presentation and Arabic typography for a phone-first 3D web game

Note on coverage: a limited number of fetches succeeded. Several primary sources (BBC, Apple HIG, Material, GDC pages) returned nothing usable. Items not backed by a fetched source are in Gaps, not Cited Findings.

## 1. Minimal and diegetic HUD (Dead Space, Ghost of Tsushima, Journey, Firewatch)

### Takeaway
No source on these games was retrieved in this pass. Only the generic accessibility guidance on UI contrast and background movement is sourced.

### Cited Findings
- Game Accessibility Guidelines (Basic, vision): provide high contrast between text/UI and background; intermediate: offer a contrast option — [GAG full list](https://gameaccessibilityguidelines.com/full-list/)
- GAG (Intermediate, cognitive/vision): provide an option to turn off or hide background movement; (Advanced) avoid sudden unexpected movement — [GAG full list](https://gameaccessibilityguidelines.com/full-list/)

### Inferences
- A diegetic/minimal HUD for a calm game still needs a high-contrast, optional-hide path for any UI that sits over a moving 3D scene.

### Gaps
- No sourced detail on Dead Space, Ghost of Tsushima (guiding wind), Journey or Firewatch HUD choices. Needs GDC/postmortem sources.
- Game UI Database (gameuidatabase.com) was not consulted.

## 2. Dialogue UI and speech bubbles in 3D; comics lettering; RTL reading order

### Takeaway
Little hard evidence found. Comics-theory framing of text boxes as links between text and speaker exists; vendor tips say to avoid crossing tails and moving bubbles before stretching tails across a face (irrelevant to faceless characters, but the tail-length principle applies). No Arabic-comics balloon convention source found.

### Cited Findings
- GAG (Basic, cognitive): let players progress through text prompts at their own pace (supports tap-to-advance over forced auto-advance) — [GAG full list](https://gameaccessibilityguidelines.com/full-list/)
- GAG (Intermediate, hearing): provide a visual indication of who is currently speaking (a bubble anchored to the speaker satisfies this) — [GAG full list](https://gameaccessibilityguidelines.com/full-list/)
- GAG (Advanced, hearing): pace subtitles to an appropriate words-per-minute for the target age group; no figure given — [GAG full list](https://gameaccessibilityguidelines.com/full-list/)
- GAG (Advanced, motor): do not make precise timing essential; 0.5 s cool-down between inputs suggested — [GAG full list](https://gameaccessibilityguidelines.com/full-list/)
- Animal Crossing: New Horizons dialogue and name labels are set in Seurat (per Fonts In Use) — [Fonts In Use](https://fontsinuse.com/uses/51354/animal-crossing-new-horizons); text must be kept short so item names don't overflow the box — [setsideb](https://setsideb.com/?p=5011)
- Academic article describes RPG text boxes as drawing on comics theory about how balloons link text to the speaker — [Young Scholars in Writing](https://youngscholarsinwriting.org/index.php/ysiw/article/download/443/427/)
- Manga (Japanese) is read right to left, top to bottom, panels included — [BnF PDF](https://bdnf.bnf.fr/uploads/fiches/7.%20How%20to%20Compose%20a%20Comic-Book%20Page.pdf), [Book Riot](https://bookriot.com/2016/05/23/a-beginners-guide-to-reading-manga/)
- Vendor tip (low authority): position characters so tails need not cross; number bubbles and reposition in reading order — [LlamaGen](https://llamagen.ai/blogs/speech-bubble-placement-checklist)
- Reading-speed figure: several secondary sources cite 160-180 WPM for subtitles (BBC/Ofcom attribution unverified); one calls ~15 characters/second a rule of thumb for English — [CleverCast](https://clevercast.com/bbc-subtitling-guidelines), [Subtitle Toolset](https://subtitle-toolset.pages.dev/guides/subtitle-reading-speed/). Line-length claims conflict (37 characters vs. 68% of screen width) [unverified].

### Inferences
- In an Arabic RTL game with vowelled text, 160-180 WPM English figures will not transfer directly; learners need slower pacing. Use tap-to-advance, no timers.
- With faceless speakers, bubble tails should point to the head/shoulder top or a floating marker; keep the tail short.
- Multiple bubbles in an RTL scene should be ordered right to left (inference from manga convention; no Arabic-specific source).

### Gaps
- Not retrieved: Night in the Woods, Kentucky Route Zero, Sky, Paper Mario, Oxenfree, Tunic bubble analyses; McCloud and Blambot (Nate Piekos) rules; occlusion handling in 3D (billboard, depth test, clamping to screen edge); Arabic comics balloon convention; BBC primary guidelines (bbc.github.io 404, bbc.co.uk blocked).

## 3. Mobile thumb zones, touch targets, safe areas, portrait layout

### Takeaway
WCAG: 24x24 CSS px minimum (AA), 44x44 enhanced. Hoober: spacing about 7 mm at screen centre, 10-12 mm at top and bottom edges; docked bottom bars work only with four or fewer elements. Thumb-zone heat maps are disputed.

### Cited Findings
- WCAG 2.5.8 (AA): pointer targets at least 24 by 24 CSS px; exceptions: spacing (24 px circle not overlapping others), equivalent, inline, user-agent, essential — [W3C Understanding 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- WCAG 2.5.5 (Enhanced): 44 by 44 CSS px — [W3C Understanding 2.5.8 page](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) (level not stated on page)
- Hoober (UXmatters, 2013): targets can be 7 mm apart on centre in the middle; 10-12 mm spacing at top/bottom edges; edges are "much worse" than sides; keep a docked bottom bar to four or fewer elements; leave space under last list item — [UXmatters](http://www.uxmatters.com/mt/archives/2013/11/design-for-fingers-and-thumbs-instead-of-touch.php)
- Hoober's reply says that if the reach charts were accurate they'd cover just under half of selections, but he argues they are not accurate — same source
- Study of 1,333 people in public, 780 touching screens (Hoober, 2012-13); ~75% single-thumb use (secondary summary) — [search summary of Mobiforge/UXPlanet](https://mobiforge.com/design-development/designing-touch-thumb-and-finger-sized-design) [unverified]
- Platform minimums commonly cited: 44x44 pt iOS, 48x48 dp Android — secondary only [unverified]
- GAG (Basic, motor/vision): virtual controls large and well spaced on small/touch screens — [GAG full list](https://gameaccessibilityguidelines.com/full-list/)

### Inferences
- Put answer choices in the middle/lower-middle band, at least 44 px high with ~8-12 px gaps; avoid the very bottom edge and corners for key taps; reserve space for the OS home indicator (env(safe-area-inset-bottom)) [CSS API from general knowledge, not sourced here].
- An on-screen Arabic keyboard of ~28+ keys will be smaller than 44 px wide in portrait; consider 2-line wrapped layout or larger key height and generous spacing.

### Gaps
- Apple 44 pt and Material 48 dp primary pages not retrieved; safe-area specifics and portrait game layout patterns not sourced; AbleGamers/Xbox Accessibility Guidelines not retrieved.

## 4. Arabic typography on screens

### Takeaway
Fonts are OFL; clipping of tashkeel is mainly a line-height/overflow issue. No controlled comparison found. Roughly 1.4-1.6 line-height is a practitioner suggestion; minimum size is unsourced.

### Cited Findings
- Scheherazade New: SIL OFL, free to use, modify and redistribute; nearly complete Unicode Arabic BMP support; page gives no line-spacing guidance — [SIL Scheherazade](https://software.sil.org/scheherazade/)
- W3C ALReq: Arabic ascenders/descenders extend much further than Latin so mixed text needs careful alignment (§7.4); no size or line-height numbers; font may place kasra+shadda differently (§4.2.8); small-screen devices may need larger loop/tooth heights (§4.1) — [W3C ALReq](https://www.w3.org/TR/alreq/)
- ALReq: lines normally right-aligned; prefer Unicode isolates (U+2066-2069) over embeddings; neutral punctuation between Arabic and Latin takes paragraph direction; three numeral families with differing bidi classes — [W3C ALReq](https://www.w3.org/TR/alreq/)
- Clipping evidence: LibreOffice bug about Amiri tashkeel cropped by line spacing — [LibreOffice bug 85426](https://lists.freedesktop.org/archives/libreoffice-bugs/2017-October/048489.html); Mozilla bug suggests Noto Naskh is more vertically compact — [Mozilla bug 1150394](https://bugzilla.mozilla.org/show_bug.cgi?id=1150394) (proposal, not measured)
- Kitab font (Scheherazade-based) lists decreased base line height as a change, hinting default Scheherazade metrics are tall — [Kitab](https://github.com/quranacademy/kitab-font)

### Inferences
- Use line-height about 1.5-1.8 for fully vowelled text, `overflow: visible`, padding in bubbles; test each font with the full tashkeel set on iOS Safari and Android Chrome.
- In 3D (canvas/WebGL text) clipping is worse; render bubbles as DOM/HTML overlays or SDF text with extra vertical padding.
- Wrap English snippets in `<bdi>` or `dir="ltr"` spans (isolates).

### Gaps
- Amiri repository page (404), Noto Naskh Arabic, Lateef, IBM Plex Sans Arabic licences/metrics not verified; minimum px size for legible tashkeel on phones not found; Apple/Google RTL guidance pages returned no real content (the Apple summary was the fetch tool's general knowledge, so not cited).

## 5. Game accessibility and subtitles

### Takeaway
GAG gives qualitative rules (high contrast, adjustable size, customisable subtitles, speaker indication, own-pace text, reduced background motion); numeric targets mostly absent.

### Cited Findings
- Basic: provide subtitles for all important speech; present clearly; use an easily readable default font size; high contrast text/UI — [GAG full list](https://gameaccessibilityguidelines.com/full-list/)
- Intermediate: customisable subtitle presentation; contrast option; choice of text colour; visual indication of who is speaking; option to hide background movement — same
- Advanced: allow font size adjustment; pace subtitles to target audience WPM; avoid sudden unexpected movement — same
- Basic: avoid flickering images and repetitive patterns — same

### Inferences
- Offer settings: text size (e.g. 3 steps), bubble contrast, tashkeel on/off for learners (design choice), reduced motion (disable bubble bobbing and camera sway), and pacing.

### Gaps
- Xbox Accessibility Guidelines, AbleGamers, Ian Hamilton, BBC primary numbers (subtitle size, background opacity) not retrieved; WCAG contrast ratios (4.5:1 / 3:1) were not fetched in this pass [unverified here].
