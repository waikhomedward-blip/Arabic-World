// On-device progress. No accounts, no analytics. Export/import as a plain JSON file.
import type { WordState } from './ladder';
import type { Mode, ReplyType } from './director';

export interface Progress {
  version: 1;
  createdAt: number;
  daysInCity: number;           // can never be lost; no streaks
  lastPlayedDay: string | null; // YYYY-MM-DD (local)
  inGameDay: number;
  completedScenes: string[];
  words: Record<string, WordState>;
  mode: Mode;
  recentReplyTypes: ReplyType[];
  friendship: Record<string, number>; // never decays
  journal: { lemma: string; guess: string; day: number }[];
  settings: { showEnglishOnTap: boolean; reducedMotion: boolean; voiceInput: boolean };
}

export function newProgress(now = Date.now()): Progress {
  return {
    version: 1, createdAt: now, daysInCity: 0, lastPlayedDay: null, inGameDay: 1, completedScenes: [], words: {},
    mode: 'auto', recentReplyTypes: [], friendship: {}, journal: [],
    settings: { showEnglishOnTap: true, reducedMotion: false, voiceInput: false },
  };
}

export function serialise(p: Progress): string { return JSON.stringify(p); }
export function deserialise(s: string | null): Progress {
  try {
    const p = JSON.parse(s ?? '');
    if (p && p.version === 1 && typeof p.words === 'object') return { ...newProgress(p.createdAt), ...p };
  } catch { /* fall through */ }
  return newProgress();
}

/** Count a real calendar day once; missing days costs nothing. */
export function touchDay(p: Progress, today: string): Progress {
  if (p.lastPlayedDay === today) return p;
  return { ...p, lastPlayedDay: today, daysInCity: p.daysInCity + 1 };
}
