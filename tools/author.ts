// Content authoring helpers. Write a day as a small script that imports these, then run it with `npx tsx`.
// Example:  import { scene, L, greet, thanks, yn, act, addLemmas, save } from '../tools/author';
// Every helper produces the same JSON the game and lab read (app/src/core/content.ts types).
import { readFileSync, writeFileSync } from 'node:fs';
import type { Lemma, Line, Option, Prompt, Scene } from '../app/src/core/content';

export function addLemmas(items: Lemma[]): void {
  const path = 'content/lemmas.json';
  const all: Lemma[] = JSON.parse(readFileSync(path, 'utf8'));
  const have = new Set(all.map((l) => l.id));
  for (const l of items) if (!have.has(l.id)) all.push(l);
  writeFileSync(path, JSON.stringify(all, null, 1));
}

export const L = (speaker: string, ar: string, en: string, lemmas: string[], gesture?: string, extra: Partial<Line> = {}): Line =>
  ({ type: 'line', speaker, ar, en, lemmas, register: 'white', ...(gesture ? { gesture } : {}), ...extra });
export const O = (ar: string, en: string, lemmas: string[], correct = false, action?: string): Option =>
  ({ ar, en, lemmas, correct, ...(action ? { action } : {}) });
export const P = (id: string, speaker: string, ask: Prompt['ask'], options: Option[], accepted: string[], tiles: string[], recast: Prompt['recast'], lemmas: string[], action?: string): Prompt =>
  ({ type: 'prompt', id, speaker, ask, options, accepted, tiles, recast, lemmas, ...(action ? { action } : {}) });

const G = ['wa', 'ala', 'kum', 'salam'];
/** Universal first: if the correct reply contains a religious formula, also offer a neutral correct reply (Suite C `neutral-option`). */
/** Reply to as-salāmu ʿalaykum. Distractors: echoing the greeting back, and "welcome". */
export const greet = (id: string, sp: string) => P(id, sp, { en: 'Reply to the greeting' },
  [O('وَعَلَيْكُمُ السَّلَامُ', 'And upon you be peace', G, true), O('السَّلَامُ عَلَيْكُمْ', 'Peace be upon you (repeating the greeting back)', ['salam', 'ala', 'kum']), O('أَهْلًا وَسَهْلًا', 'Welcome', ['ahlan'])],
  ['وَعَلَيْكُمُ السَّلَامُ', 'وَعَلَيْكُمْ السَّلَامُ', 'وعليكم السلام'], ['وَعَلَيْكُمُ', 'السَّلَامُ', 'شُكْرًا'],
  { ar: 'وَعَلَيْكُمُ…؟', en: 'And upon you…?', gesture: 'lean_in' }, G);
export const thanks = (id: string, sp: string) => P(id, sp, { en: 'Say thank you' },
  [O('شُكْرًا', 'Thank you', ['shukran'], true), O('عَفْوًا', "You're welcome", ['afwan']), O('أَهْلًا وَسَهْلًا', 'Welcome', ['ahlan'])],
  ['شُكْرًا'], ['شُكْرًا', 'لَا'], { ar: 'شُكْ…؟', en: 'Thank…?', gesture: 'hand_on_heart' }, ['shukran']);
const F = ['bi', 'khayr', 'hamd', 'li', 'allah'];
export const fine = (id: string, sp: string) => P(id, sp, { en: 'Say you are well' },
  [O('بِخَيْرٍ، الْحَمْدُ لِلّٰهِ', 'Well, praise be to Allah', F, true), O('بِخَيْرٍ، شُكْرًا', 'Well, thank you', ['bi', 'khayr', 'shukran'], true), O('وَعَلَيْكُمُ السَّلَامُ', 'And upon you be peace', G), O('أَهْلًا وَسَهْلًا يَا صَدِيقِي', 'Welcome, my friend', ['ahlan', 'ya', 'sadiq', 'ii'])],
  ['بِخَيْرٍ، الْحَمْدُ لِلّٰهِ', 'بِخَيْرٍ وَالْحَمْدُ لِلّٰهِ', 'الْحَمْدُ لِلّٰهِ، بِخَيْرٍ', 'بِخَيْرٍ، شُكْرًا', 'بخير'], ['بِخَيْرٍ', 'شُكْرًا', 'الْحَمْدُ', 'لِلّٰهِ'],
  { ar: 'بِخَيْرٍ…؟', en: 'Well…?', gesture: 'thumbs_up_small' }, F);
export const morning = (id: string, sp: string) => P(id, sp, { en: "Reply to 'good morning'" },
  [O('صَبَاحُ النُّورِ!', 'Morning of light! (good morning)', ['sabah', 'nur'], true), O('وَعَلَيْكُمُ السَّلَامُ', 'And upon you be peace', G), O('عَفْوًا', "You're welcome", ['afwan'])],
  ['صَبَاحُ النُّورِ', 'صباح النور'], ['صَبَاحُ', 'النُّورِ', 'الْخَيْرِ'], { ar: 'صَبَاحُ…؟', en: 'Morning of…?', gesture: 'raise_hand' }, ['sabah', 'nur']);

/** Yes/no comprehension check. `right` may start with نَعَمْ or لَا — keep ≥25% of them "no" (Suite C bias check). */
export function yn(id: string, sp: string, ask: { ar: string; en: string; lemmas: string[] }, right: [string, string, string[]], wrong: [string, string, string[]], tiles: string[], recast: Prompt['recast']): Prompt {
  const base = right[0].replace(/[.!]$/, '');
  const short = right[0].startsWith('لَا') ? 'لَا' : 'نَعَمْ';
  return P(id, sp, ask, [O(right[0], right[1], right[2], true), O(wrong[0], wrong[1], wrong[2])], [base, short], tiles, recast, right[2]);
}
/** Act it out (Musāfir): the right action is the answer. Use object/hand emoji only, never faces. */
export function act(id: string, sp: string, ask: { ar: string; en: string; lemmas: string[] }, good: [string, string, string[]], bad: [string, string, string[], string], recast: Prompt['recast'], lemmas: string[], action: string): Prompt {
  return P(id, sp, ask, [O(good[0], good[1], good[2], true, action), O(bad[0], bad[1], bad[2], false, bad[3])], [], [], recast, lemmas, action);
}

/** `clock` must be between 08:00 and 11:00 (strict rule; Suite R checks it). */
export function scene(id: string, day: number, place: Scene['place'], title: Scene['title'], cast: string[], steps: Scene['steps'], opts: Partial<Scene> = {}): Scene {
  const slots: Record<string, string> = { home: '08:30', souq: '09:45', square: '09:45', cafe: '10:30', shop: '09:45', masjid: '10:30' };
  return { id, day, place, tags: [], kind: 'story', title, cast, steps, clock: slots[place] ?? '09:00', ...opts };
}
export const SANCTUARY: Partial<Scene> = { tags: ['sanctuary'], note: { en: 'This is a story scene, not worship. Prayer is never part of the gameplay.' } };

export function save(scenes: Scene[]): void {
  for (const s of scenes) writeFileSync(`content/scenes/${s.id}.json`, JSON.stringify(s, null, 1));
  console.log(`saved ${scenes.length} scene(s); now run: npm run validate`);
}
