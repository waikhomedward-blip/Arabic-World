// Word ladder (section 9A, build rules 3–5, 7). Pure functions over plain data (saveable).

export enum Rung { Heard = 0, Recognised = 1, Built = 2, TypedHint = 3, TypedFree = 4, Spoken = 5 }
export const RUNG_NAMES = ['heard', 'recognised', 'built', 'typed with hints', 'typed freely', 'spoken'];

export interface WordState {
  lemma: string;
  rung: Rung;
  targetRung: Rung;
  firstTryAtRung: number;            // unhinted first-try successes at current rung
  sessionsAtRung: string[];          // distinct sessions with such successes
  totalSuccesses: number;            // weighted (hinted = 0.5)
  successesByRung: number[];
  sessionsSeen: string[];
  misses: number;
  stability: number;                 // days (memory model)
  due: number;                       // epoch ms
}

export const LADDER = {
  advanceAfter: 2,          // ≥2 first-try unhinted successes
  minSessions: 2,           // across ≥2 sessions
  producedTotal: 5,         // "typed freely" needs ~5 total successes to be reached
  missRescheduleMs: 10 * 60 * 1000,
};

export function newWord(lemma: string, targetRung: Rung, now = 0): WordState {
  return {
    lemma, rung: Rung.Heard, targetRung, firstTryAtRung: 0, sessionsAtRung: [], totalSuccesses: 0,
    successesByRung: [0, 0, 0, 0, 0, 0], sessionsSeen: [], misses: 0, stability: 0.5, due: now,
  };
}

export interface Attempt { rungUsed: Rung; correct: boolean; firstTry: boolean; hinted: boolean; session: string; now: number }

const DAY = 86_400_000;

export function recordHeard(w: WordState, session: string, now: number): WordState {
  const s = { ...w, sessionsSeen: uniq([...w.sessionsSeen, session]) };
  if (s.due <= now) s.due = now + s.stability * DAY;
  return s;
}

export function recordAttempt(w: WordState, a: Attempt): WordState {
  const s: WordState = { ...w, successesByRung: [...w.successesByRung], sessionsSeen: uniq([...w.sessionsSeen, a.session]), sessionsAtRung: [...w.sessionsAtRung] };
  if (!a.correct) {
    // Rule 5: demote one rung, reschedule soon, never retire.
    s.misses++;
    s.rung = Math.max(Rung.Heard, s.rung - 1);
    s.firstTryAtRung = 0;
    s.sessionsAtRung = [];
    s.stability = Math.max(0.2, s.stability * 0.4);
    s.due = a.now + LADDER.missRescheduleMs;
    return s;
  }
  // Rule 7: progress records only the rung actually used; hint = weaker success.
  s.totalSuccesses += a.hinted ? 0.5 : 1;
  s.successesByRung[a.rungUsed]++;
  s.stability = Math.min(365, s.stability * (a.hinted ? 1.5 : 2.5));
  s.due = a.now + s.stability * DAY;

  // No grinding: only answers at (or above) the current rung count toward advancement.
  const countsForAdvance = a.firstTry && !a.hinted && a.rungUsed >= s.rung && s.rung < s.targetRung;
  if (!countsForAdvance) return s;
  s.firstTryAtRung++;
  s.sessionsAtRung = uniq([...s.sessionsAtRung, a.session]);
  const next = (s.rung + 1) as Rung;
  const producedGate = next >= Rung.TypedFree ? s.totalSuccesses >= LADDER.producedTotal : true;
  if (s.firstTryAtRung >= LADDER.advanceAfter && s.sessionsAtRung.length >= LADDER.minSessions && producedGate) {
    s.rung = next;
    s.firstTryAtRung = 0;
    s.sessionsAtRung = [];
  }
  return s;
}

function uniq<T>(xs: T[]): T[] { return [...new Set(xs)]; }
