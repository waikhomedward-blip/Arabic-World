// Suite G: gameplay bots + fuzzing over the real scene engine. No soft-locks; every path ends.
import type { Content, Scene } from '../../app/src/core/content';
import { start, answer, advance, type Answer } from '../../app/src/core/engine';
import { serialise, deserialise, newProgress } from '../../app/src/core/progress';
import { mk, type SuiteResult, type Case } from './types';

function play(scene: Scene, pick: (stepIdx: number, attempt: number) => Answer): { done: boolean; steps: number } {
  let s = start(scene); let guard = 0;
  let attempt = 0; let lastStep = -1;
  while (!s.done && guard++ < scene.steps.length * 6 + 10) {
    const st = scene.steps[s.step];
    if (st.type === 'line') { s = advance(scene, s); continue; }
    attempt = s.step === lastStep ? attempt + 1 : 0; lastStep = s.step;
    const r = answer(scene, s, pick(s.step, attempt));
    if (r.feedback.type === 'didYouMean') { s = answer(scene, s, { kind: 'option', index: st.options.findIndex((o) => o.correct) }).state; continue; }
    s = r.state;
  }
  return { done: s.done, steps: guard };
}

function rng(seed: number) { return () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32); }

export function suiteG(content: Content, seed = 1): SuiteResult {
  const t = mk('G'); const cases: Case[] = []; let crashes = 0;
  const strategies: Record<string, (sc: Scene) => (i: number, a: number) => Answer> = {
    'always-correct-tap': (sc) => (i) => ({ kind: 'option', index: (sc.steps[i] as any).options.findIndex((o: any) => o.correct) }),
    'always-wrong-tap': (sc) => (i) => { const o = (sc.steps[i] as any).options; const w = o.findIndex((x: any) => !x.correct); return { kind: 'option', index: w < 0 ? 0 : w }; },
    'typed-correct': (sc) => (i) => { const p = sc.steps[i] as any; return p.action ? { kind: 'action', action: p.action } : { kind: 'typed', text: p.accepted[0] }; },
    'typed-garbage': () => () => ({ kind: 'typed', text: 'ززز' }),
    'typed-empty': () => () => ({ kind: 'typed', text: '' }),
    'tiles-correct': (sc) => (i) => { const p = sc.steps[i] as any; return p.action ? { kind: 'action', action: p.action } : { kind: 'tiles', words: p.accepted[0].split(/[\s،]+/).filter(Boolean) }; },
    'tiles-wrong-order': (sc) => (i) => { const p = sc.steps[i] as any; return { kind: 'tiles', words: [...(p.tiles ?? [])].reverse() }; },
    'wrong-action': () => () => ({ kind: 'action', action: 'take:nothing' }),
  };
  for (const sc of content.scenes) for (const [name, strat] of Object.entries(strategies)) {
    try { const r = play(sc, strat(sc)); cases.push(t(`completes:${sc.id}:${name}`, r.done)); }
    catch (e) { crashes++; cases.push(t(`completes:${sc.id}:${name}`, false, String(e))); }
  }
  // fuzz: random answers of every kind
  const R = rng(seed);
  const junk = ['', 'ا', 'لا', 'نعم', 'شكرا', '🍎', 'x', 'وعليكم', ' '.repeat(50), 'هٰذَا'.repeat(40)];
  for (const sc of content.scenes) for (let k = 0; k < 25; k++) {
    try {
      const r = play(sc, (i) => {
        const p = sc.steps[i] as any; const x = R();
        if (x < 0.25) return { kind: 'option', index: Math.floor(R() * (p.options.length + 2)) - 1 };
        if (x < 0.5) return { kind: 'typed', text: junk[Math.floor(R() * junk.length)] };
        if (x < 0.75) return { kind: 'tiles', words: (p.tiles ?? []).filter(() => R() < 0.5) };
        return { kind: 'action', action: ['take:apple', 'take:water', 'take:book', ''][Math.floor(R() * 4)] };
      });
      cases.push(t(`fuzz:${sc.id}:${k}`, r.done));
    } catch (e) { crashes++; cases.push(t(`fuzz:${sc.id}:${k}`, false, String(e))); }
  }
  // save/load round trip, including a corrupted save
  const p = newProgress(Date.UTC(2026, 10, 16));
  p.daysInCity = 3; p.completedScenes = ['d1-home'];
  cases.push(t('save-load-roundtrip', JSON.stringify(deserialise(serialise(p))) === JSON.stringify(p)));
  cases.push(t('corrupt-save-falls-back', deserialise('{not json').version === p.version));
  return { suite: 'G', cases, metrics: { crashes } };
}
