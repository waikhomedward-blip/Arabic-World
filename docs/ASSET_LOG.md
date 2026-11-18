# Asset log
Every shipped asset needs a row. Suite R fails on any asset in `app/public/` without one.

| File | Source | Licence | Added | Notes |
|---|---|---|---|---|
| (procedural geometry in code) | own | own | 2026-11-16 | Characters, buildings, props are code-generated primitives |
| icons/icon.svg | own (drawn in code) | own | 2026-11-16 | Minaret and rooftops at dusk; no figures |
| manifest.webmanifest | own | own | 2026-11-16 | PWA manifest |
| icons/icon-180.png, icons/icon-192.png, icons/icon-512.png | rendered from icons/icon.svg by tools/make-icons.ts | own | 2026-11-16 | Home-screen icons (iPhone needs PNG) |
| fonts/scheherazade-new-arabic-400.woff2 | Scheherazade New by SIL International, Arabic subset served by Google Fonts (fonts.gstatic.com v21) | SIL Open Font License 1.1 | 18 Nov 2026 | Regular. Made for fully vowelled Arabic. Edward approved the download |
| fonts/scheherazade-new-arabic-700.woff2 | same | SIL Open Font License 1.1 | 18 Nov 2026 | Bold |
| models/man.glb | Built by tools/build-man.mjs from Quaternius "Universal Base Characters" (Superhero_Male body only; eyes, eyebrows and all textures removed) and "Universal Animation Library" (10 everyday clips: idle, talking, walking, sitting, interact, pick up, kneel to fix, push) | CC0 1.0 (both packs, License_Standard.txt / License.txt) | 18 Nov 2026 | No female model is shipped. The head is smoothed to a plain shape at load time (humanModel.ts). Edward approved Quaternius downloads |
