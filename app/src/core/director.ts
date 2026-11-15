// Lexical Director (section 9): reply type per line + variant choice by coverage.
import { Rung, type WordState } from './ladder';

export type ReplyType = 'tap' | 'tiles' | 'typeHint' | 'typeFree';
export type Mode = 'auto' | 'musafir' | 'talib' | 'muqim';

export const COVERAGE_TARGET = { min: 0.95, max: 0.98, visualMin: 0.9 };

export function replyTypeForRung(r: Rung): ReplyType {
  if (r <= Rung.Recognised) return 'tap';
  if (r === Rung.Built) return 'tiles';
  if (r === Rung.TypedHint) return 'typeHint';
  return 'typeFree';
}

export function rungForReply(t: ReplyType): Rung {
  return { tap: Rung.Recognised, tiles: Rung.Built, typeHint: Rung.TypedHint, typeFree: Rung.TypedFree }[t];
}

/** Rule 6: reply type from the weakest due word in the line; cap repeats of one type per scene. */
export function chooseReplyType(
  lemmas: string[], words: Record<string, WordState>, mode: Mode, recent: ReplyType[], maxRepeat = 3,
): ReplyType {
  if (mode === 'musafir') return 'tap';
  if (mode === 'talib') return 'tiles';
  if (mode === 'muqim') return 'typeFree';
  const states = lemmas.map((l) => words[l]).filter(Boolean);
  if (!states.length) return 'tap';
  const weakest = states.reduce((a, b) => (a.rung <= b.rung ? a : b));
  // the reply exercises the next rung up for the weakest word, capped at its target
  const practise = Math.min(weakest.targetRung, weakest.rung + 1) as Rung;
  let t = replyTypeForRung(practise);
  const tail = recent.slice(-maxRepeat);
  if (tail.length === maxRepeat && tail.every((x) => x === t)) t = t === 'tap' ? 'tiles' : 'tap';
  return t;
}

export function coverage(lemmas: string[], known: Set<string>): number {
  if (!lemmas.length) return 1;
  return lemmas.filter((l) => known.has(l)).length / lemmas.length;
}

/** Pick the line variant whose coverage is closest to the target band. */
export function pickVariant<T extends { lemmas: string[] }>(variants: T[], known: Set<string>): T {
  const score = (v: T) => {
    const c = coverage(v.lemmas, known);
    if (c >= COVERAGE_TARGET.min && c <= COVERAGE_TARGET.max) return 0;
    return c < COVERAGE_TARGET.min ? COVERAGE_TARGET.min - c : c - COVERAGE_TARGET.max + 0.001;
  };
  return variants.reduce((a, b) => (score(b) < score(a) ? b : a));
}
