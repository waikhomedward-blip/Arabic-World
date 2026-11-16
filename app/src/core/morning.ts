// Morning check (spec §9 step 6): after sleep, yesterday's new words come back for a quick recognition re-test.
import type { Lemma } from './content';
import type { WordState } from './ladder';

export interface CheckItem { lemma: string; ar: string; options: string[]; answer: number }

function rng(seed: number) { return () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32); }

/** Pick up to `max` words: those first met yesterday, then any that are due. Bound suffixes (ـ) are skipped. */
export function pickMorningWords(
  firstSeenDay: Record<string, number>, words: Record<string, WordState>, today: number, now: number, max = 6,
): string[] {
  const yesterday = Object.entries(firstSeenDay).filter(([, d]) => d === today - 1).map(([l]) => l);
  const due = Object.values(words).filter((w) => w.due <= now && !yesterday.includes(w.lemma)).sort((a, b) => a.due - b.due).map((w) => w.lemma);
  return [...new Set([...yesterday, ...due])].slice(0, max);
}

/** Distractors come from words already met when there are enough, so options are familiar Arabic-world meanings. */
export function buildMorningCheck(lemmaIds: string[], lemmas: Lemma[], seed: number, met?: Set<string>): CheckItem[] {
  const R = rng(seed);
  const all = lemmas.filter((l) => !l.ar.includes('ـ'));
  const metPool = met ? all.filter((l) => met.has(l.id)) : [];
  const pool = metPool.length >= 4 ? metPool : all;
  const byId = Object.fromEntries(lemmas.map((l) => [l.id, l]));
  return lemmaIds.filter((id) => byId[id] && !byId[id].ar.includes('ـ')).map((id) => {
    const target = byId[id];
    const distractors = pool.filter((l) => l.id !== id && l.en !== target.en).sort(() => R() - 0.5).slice(0, 2).map((l) => l.en);
    const options = [target.en, ...distractors].sort(() => R() - 0.5);
    return { lemma: id, ar: target.ar, options, answer: options.indexOf(target.en) };
  });
}
