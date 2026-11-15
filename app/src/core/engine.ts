// Pure scene engine shared by the game UI and the gameplay bots (Suite G).
import type { Scene, Prompt, Option } from './content';
import { checkTyped, type Verdict } from './checker';
import { baseForm } from './arabic';

export type Answer =
  | { kind: 'option'; index: number }
  | { kind: 'tiles'; words: string[] }
  | { kind: 'typed'; text: string }
  | { kind: 'action'; action: string };

export interface SceneState { sceneId: string; step: number; misses: number; done: boolean; showOptions: boolean }

export type Feedback =
  | { type: 'correct'; verdict: Verdict; note?: string; target: string }
  | { type: 'didYouMean'; target: string; note?: string }
  | { type: 'recast'; ar: string; en: string; gesture?: string }       // miss 1: prompt, don't correct
  | { type: 'offerOptions' }                                           // miss 2
  | { type: 'modelled'; ar: string };                                   // miss 3: character says it; continue

export const MAX_MISSES = 3;

export function start(scene: Scene): SceneState {
  return { sceneId: scene.id, step: 0, misses: 0, done: scene.steps.length === 0, showOptions: false };
}

export function advance(scene: Scene, s: SceneState): SceneState {
  const step = s.step + 1;
  return { ...s, step, misses: 0, showOptions: false, done: step >= scene.steps.length };
}

export function correctLine(p: Prompt): string {
  return p.options.find((o) => o.correct && /[؀-ۿ]/.test(o.ar))?.ar ?? p.accepted[0] ?? p.options.find((o) => o.correct)!.ar;
}

function optionCorrect(o: Option | undefined): boolean { return !!o?.correct; }

/** Judge an answer. Returns feedback and the next state (never blocks: miss 3 always continues). */
export function answer(scene: Scene, s: SceneState, a: Answer, quranLevel = false): { state: SceneState; feedback: Feedback; correct: boolean } {
  const st = scene.steps[s.step];
  if (!st || st.type !== 'prompt') throw new Error('answer() on a non-prompt step');
  let ok = false; let verdict: Verdict = 'correct'; let note: string | undefined; let target = correctLine(st);

  if (a.kind === 'option') ok = optionCorrect(st.options[a.index]);
  else if (a.kind === 'action') ok = !!st.action && a.action === st.action;
  else if (a.kind === 'tiles') {
    const built = baseForm(a.words.join(' '));
    ok = st.accepted.some((x) => baseForm(x) === built);
  } else {
    if (st.accepted.length === 0) ok = false;
    else {
      const r = checkTyped(a.text, st.accepted, quranLevel);
      verdict = r.verdict; note = r.note; target = r.target;
      if (r.verdict === 'did_you_mean') return { state: s, feedback: { type: 'didYouMean', target: r.target, note: r.note }, correct: false };
      ok = r.verdict === 'correct' || r.verdict === 'accept_with_note';
    }
  }
  if (ok) return { state: advance(scene, s), feedback: { type: 'correct', verdict, note, target }, correct: true };

  const misses = s.misses + 1;
  if (misses === 1) return { state: { ...s, misses }, feedback: { type: 'recast', ...st.recast }, correct: false };
  if (misses === 2) return { state: { ...s, misses, showOptions: true }, feedback: { type: 'offerOptions' }, correct: false };
  return { state: advance(scene, s), feedback: { type: 'modelled', ar: target }, correct: false };
}
