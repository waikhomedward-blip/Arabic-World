# Asset log
Every shipped asset needs a row. Suite R fails on any asset in `app/public/` without one.

| File | Source | Licence | Added | Notes |
|---|---|---|---|---|
| (procedural geometry in code) | own | own | 2026-11-16 | Characters, buildings, props are code-generated primitives |
| icons/icon.svg | own (drawn in code) | own | 2026-11-16 | Minaret and rooftops at dusk; no figures |
| manifest.webmanifest | own | own | 2026-11-16 | PWA manifest |
| icons/icon-180.png, icons/icon-192.png, icons/icon-512.png | rendered from icons/icon.svg by tools/make-icons.ts | own | 2026-11-16 | Home-screen icons (iPhone needs PNG) |
