// Typed-answer checker (build rules 8–9). Rule-based; no AI grader.
import { baseForm, lenientForm, confusableForm, skeletonForm } from './arabic';

export type Verdict = 'correct' | 'accept_with_note' | 'did_you_mean' | 'reject';
export interface CheckResult { verdict: Verdict; target: string; note?: string }

/**
 * @param typed what the player typed
 * @param accepted authored accepted answers (vowelled); first is the canonical one
 * @param quranLevel strict: no accept-with-note
 */
export function checkTyped(typed: string, accepted: string[], quranLevel = false): CheckResult {
  const t = baseForm(typed);
  if (!t) return { verdict: 'reject', target: accepted[0] };
  for (const a of accepted) if (baseForm(a) === t) return { verdict: 'correct', target: a };

  // compare with and without the final-verbal-alif rule, so كتبو≈كتبوا and هوا≈هواء, but هوء≠هواء
  const same = (a: string) => lenientForm(a, true) === lenientForm(typed, true) || lenientForm(a, false) === lenientForm(typed, false);
  for (const a of accepted) {
    if (same(a)) {
      if (quranLevel) return { verdict: 'did_you_mean', target: a, note: 'exact spelling needed for Quran text' };
      return { verdict: 'accept_with_note', target: a, note: spellingNote(typed, a) };
    }
  }
  const tc = confusableForm(typed), ts = skeletonForm(typed);
  for (const a of accepted) {
    if (confusableForm(a) === tc) return { verdict: 'did_you_mean', target: a, note: 'a letter changes the root' };
    if (skeletonForm(a) === ts) return { verdict: 'did_you_mean', target: a, note: 'a long vowel is added or missing' };
  }
  return { verdict: 'reject', target: accepted[0] };
}

function spellingNote(typed: string, target: string): string {
  const b = baseForm(target);
  if (/[أإآؤئء]/.test(b)) return 'hamza is written on a seat here';
  if (/ة/.test(b)) return 'this word ends in ta marbuta ة';
  if (/ى/.test(b)) return 'this word ends in alif maqsura ى';
  if (/وا(\s|$)/.test(b)) return 'verbs ending in و take a silent alif: وا';
  return 'small spelling difference';
}
