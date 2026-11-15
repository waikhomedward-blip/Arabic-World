// Content types + loader (Vite glob in the app; fs in tools/lab via loadContentFromDisk).
export interface Lemma { id: string; ar: string; en: string; tier: 0 | 1 | 2 | 3 | 'everyday'; root: string | null; targetRung: number }
export interface Line { type: 'line'; speaker: string; ar: string; en: string; lemmas: string[]; register: 'fusha' | 'white' | 'dialect-listen'; gesture?: string; names?: string[]; notice?: { root: string; words: string[]; en: string } }
export interface Option { ar: string; en: string; lemmas: string[]; correct: boolean; action?: string }
export interface Prompt {
  type: 'prompt'; id: string; speaker: string;
  ask: { ar?: string; en: string; lemmas?: string[] };
  options: Option[]; accepted: string[]; tiles: string[];
  recast: { ar: string; en: string; gesture?: string };
  lemmas: string[]; action?: string;
}
export type Step = Line | Prompt;
export interface Scene {
  id: string; day: number; place: 'home' | 'souq' | 'cafe' | 'shop' | 'masjid';
  tags: string[]; kind: 'story' | 'menu' | 'failure' | 'reward' | 'loading';
  title: { ar: string; en: string }; cast: string[]; note?: { en: string };
  quran?: { surah: number; ayahStart: number; ayahEnd: number; text: string }[];
  steps: Step[];
}
export interface Character { id: string; nameAr: string; nameEn: string; role: string; gender: string; age: string; face: string; voice: string; register: string; garments: string[]; colour: string; height: number; build: number }
export interface Cast { allowedVoices: string[]; allowedGarments: Record<string, { coverage: string; fit: string }>; characters: Character[] }
export interface Content { lemmas: Lemma[]; scenes: Scene[]; cast: Cast }

export function sortScenes(scenes: Scene[]): Scene[] {
  const order = ['home', 'souq', 'masjid', 'cafe', 'shop'];
  return [...scenes].sort((a, b) => a.day - b.day || order.indexOf(a.place) - order.indexOf(b.place));
}

/** Every Arabic string in a scene with where it came from (for scans). */
export function sceneTexts(s: Scene): { where: string; ar: string; register?: string }[] {
  const out: { where: string; ar: string; register?: string }[] = [];
  s.steps.forEach((st, i) => {
    if (st.type === 'line') out.push({ where: `${s.id}#${i}`, ar: st.ar, register: st.register });
    else {
      if (st.ask.ar) out.push({ where: `${s.id}#${i}.ask`, ar: st.ask.ar });
      st.options.forEach((o, j) => { if (/[؀-ۿ]/.test(o.ar)) out.push({ where: `${s.id}#${i}.opt${j}`, ar: o.ar }); });
      out.push({ where: `${s.id}#${i}.recast`, ar: st.recast.ar });
      st.tiles.forEach((t, j) => out.push({ where: `${s.id}#${i}.tile${j}`, ar: t }));
    }
  });
  return out;
}
