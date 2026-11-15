// Suite L: typed-answer checker slip set, ladder rules, synthetic learners.
import type { Content } from '../../app/src/core/content';
import { checkTyped, type Verdict } from '../../app/src/core/checker';
import { baseForm } from '../../app/src/core/arabic';
import { newWord, recordAttempt, recordHeard, Rung, type WordState } from '../../app/src/core/ladder';
import { chooseReplyType, rungForReply } from '../../app/src/core/director';
import { mk, type SuiteResult, type Case } from './types';

type Expect = Verdict[];
const SWAPS: [string, string][] = [['ص', 'س'], ['س', 'ص'], ['ط', 'ت'], ['ت', 'ط'], ['ض', 'د'], ['د', 'ض'], ['ظ', 'ز'], ['ح', 'ه'], ['ه', 'ح'], ['ع', 'ا'], ['ق', 'ك'], ['ك', 'ق'], ['ذ', 'ز'], ['ث', 'س']];
const HAMZA: [string, string][] = [['أ', 'ا'], ['إ', 'ا'], ['آ', 'ا'], ['ؤ', 'و'], ['ئ', 'ي']];
const NEUTRAL = ['ب', 'ن', 'م', 'ل', 'ف', 'ج', 'ش', 'خ', 'ر'];

function rng(seed: number) { return () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32); }

export function slipSet(content: Content, seed = 7) {
  const R = rng(seed);
  const answers = new Set<string>();
  content.scenes.forEach((s) => s.steps.forEach((st) => { if (st.type === 'prompt') st.accepted.forEach((a) => answers.add(a)); }));
  content.lemmas.forEach((l) => { if (!l.ar.includes('ـ')) answers.add(l.ar); });
  const items: { typed: string; accepted: string[]; quran: boolean; expect: Expect; kind: string }[] = [];
  for (const a of answers) {
    const b = baseForm(a); const chars = [...b];
    for (const quran of [false, true]) {
      items.push({ typed: a, accepted: [a], quran, expect: ['correct'], kind: 'exact' });
      items.push({ typed: b, accepted: [a], quran, expect: ['correct'], kind: 'no-harakat' });
      items.push({ typed: ' ' + b + '؟ ', accepted: [a], quran, expect: ['correct'], kind: 'punct-space' });
      items.push({ typed: b.split('').join('ـ'), accepted: [a], quran, expect: ['correct'], kind: 'tatweel' });
      const note: Expect = quran ? ['did_you_mean'] : ['accept_with_note'];
      for (const [from, to] of HAMZA) if (b.includes(from)) items.push({ typed: b.replace(from, to), accepted: [a], quran, expect: note, kind: 'hamza' });
      if (/ة(\s|$)/.test(b)) { items.push({ typed: b.replace(/ة(\s|$)/, 'ه$1'), accepted: [a], quran, expect: note, kind: 'ta-marbuta-h' }); items.push({ typed: b.replace(/ة(\s|$)/, 'ت$1'), accepted: [a], quran, expect: note, kind: 'ta-marbuta-t' }); }
      if (/ى(\s|$)/.test(b)) items.push({ typed: b.replace(/ى(\s|$)/, 'ي$1'), accepted: [a], quran, expect: note, kind: 'alif-maqsura' });
      chars.forEach((c, i) => {
        for (const [from, to] of SWAPS) if (c === from) {
          const typed = [...chars.slice(0, i), to, ...chars.slice(i + 1)].join('');
          items.push({ typed, accepted: [a], quran, expect: ['did_you_mean', 'reject'], kind: 'root-swap' });
        }
        if ('اوي'.includes(c) && i > 0 && i < chars.length - 1) items.push({ typed: [...chars.slice(0, i), ...chars.slice(i + 1)].join(''), accepted: [a], quran, expect: ['did_you_mean', 'reject'], kind: 'long-vowel-drop' });
        if (c !== ' ' && R() < 0.6) {
          const n = NEUTRAL[Math.floor(R() * NEUTRAL.length)];
          if (n !== c) items.push({ typed: [...chars.slice(0, i), n, ...chars.slice(i + 1)].join(''), accepted: [a], quran, expect: ['reject', 'did_you_mean'], kind: 'random-typo' });
        }
      });
      if (chars.length > 2) items.push({ typed: b + 'ا', accepted: [a], quran, expect: ['did_you_mean', 'reject', 'accept_with_note'].filter((v) => !quran || v !== 'accept_with_note') as Expect, kind: 'long-vowel-add' });
    }
  }
  // dedupe identical typed/accepted collisions that are genuinely the same word
  return items.filter((x) => x.kind === 'exact' || baseForm(x.typed) !== baseForm(x.accepted[0]) || x.expect.includes('correct'));
}

function ladderCases(t: ReturnType<typeof mk>): Case[] {
  const cases: Case[] = []; const now = 0;
  const A = (w: WordState, rungUsed: Rung, session: string, extra: Partial<{ correct: boolean; firstTry: boolean; hinted: boolean }> = {}) =>
    recordAttempt(w, { rungUsed, correct: true, firstTry: true, hinted: false, session, now, ...extra });
  let w = newWord('x', Rung.TypedFree);
  w = A(w, Rung.Recognised, 's1'); w = A(w, Rung.Recognised, 's1');
  cases.push(t('ladder:needs-two-sessions', w.rung === Rung.Heard));
  w = A(w, Rung.Recognised, 's2');
  cases.push(t('ladder:advances-after-2-across-2-sessions', w.rung === Rung.Recognised));
  let g = { ...w }; for (let i = 0; i < 10; i++) g = A(g, Rung.Heard, 's' + i);
  cases.push(t('ladder:no-grinding-at-lower-rung', g.rung === Rung.Recognised));
  let h = { ...w }; for (let i = 0; i < 6; i++) h = A(h, Rung.Recognised, 's' + i, { hinted: true });
  cases.push(t('ladder:hinted-does-not-advance', h.rung === Rung.Recognised && h.totalSuccesses === w.totalSuccesses + 3));
  const m = recordAttempt(w, { rungUsed: Rung.Recognised, correct: false, firstTry: true, hinted: false, session: 's3', now: 1000 });
  cases.push(t('ladder:miss-demotes-one-rung', m.rung === Rung.Heard));
  cases.push(t('ladder:miss-reschedules-soon', m.due - 1000 <= 15 * 60 * 1000));
  cases.push(t('ladder:never-retired', recordAttempt(m, { rungUsed: 0, correct: false, firstTry: true, hinted: false, session: 's4', now }).rung === Rung.Heard));
  let q = newWord('q', Rung.Recognised); for (let i = 0; i < 8; i++) q = A(q, Rung.TypedFree, 's' + i);
  cases.push(t('ladder:target-rung-cap (quran-only words stop at recognised)', q.rung === Rung.Recognised));
  let p = newWord('p', Rung.TypedFree); let sess = 0;
  for (const r of [Rung.Recognised, Rung.Built, Rung.TypedHint]) for (let i = 0; i < 2; i++) p = A(p, r, 's' + sess++);
  cases.push(t('ladder:reaches-typed-hint', p.rung === Rung.TypedHint));
  cases.push(t('ladder:produced-gate-needs-5-total', p.totalSuccesses >= 5 ? true : p.rung < Rung.TypedFree));
  const words = { a: { ...newWord('a', 4), rung: 3 }, b: { ...newWord('b', 4), rung: 1 } } as Record<string, WordState>;
  cases.push(t('director:weakest-word-sets-reply-type', chooseReplyType(['a', 'b'], words, 'auto', []) === 'tiles'));
  cases.push(t('director:caps-repeats', chooseReplyType(['b'], words, 'auto', ['tiles', 'tiles', 'tiles']) === 'tap'));
  cases.push(t('director:mode-override-musafir', chooseReplyType(['a'], words, 'musafir', []) === 'tap'));
  return cases;
}

interface Profile { id: string; kind: string; learn: number; forget: number; guess: number; patience: number; prior: number }
function profiles(n: number, R: () => number): Profile[] {
  const kinds = ['zero', 'reciter-reads-script', 'heritage-listener', 'fast', 'slow', 'forgetful'];
  return Array.from({ length: n }, (_, i) => {
    const kind = kinds[i % kinds.length];
    const base = { zero: [0.35, 0.25, 0], 'reciter-reads-script': [0.45, 0.2, 0.15], 'heritage-listener': [0.5, 0.2, 0.3], fast: [0.6, 0.15, 0], slow: [0.22, 0.25, 0], forgetful: [0.35, 0.45, 0] }[kind]!;
    const j = () => 0.85 + R() * 0.3;
    return { id: `p${i}`, kind, learn: base[0] * j(), forget: base[1] * j(), guess: 0.25 + R() * 0.25, patience: 2 + Math.floor(R() * 3), prior: base[2] };
  });
}

/** Simulate a learner through the authored days with the real ladder + director, then a 7-day break. */
function simulate(content: Content, p: Profile, mode: 'auto' | 'musafir' | 'talib' | 'muqim', R: () => number) {
  const strength = new Map<string, number>(); // 0..1 memory strength
  const words: Record<string, WordState> = {};
  for (const l of content.lemmas) words[l.id] = newWord(l.id, l.targetRung as Rung);
  if (p.prior) for (const l of content.lemmas) if (l.tier === 0 || l.tier === 1) if (R() < p.prior) strength.set(l.id, 0.6);
  const know = (l: string) => strength.get(l) ?? 0;
  const bump = (l: string, k: number) => strength.set(l, Math.min(1, know(l) + (1 - know(l)) * k));
  let frustration = 0, boredom = 0, missRun = 0; const recent: ReturnType<typeof chooseReplyType>[] = [];
  const days = [...new Set(content.scenes.map((s) => s.day))].sort((a, b) => a - b);
  let now = 0;
  for (const d of days) {
    const session = `day${d}`; let newThisDay = 0;
    for (const s of content.scenes.filter((x) => x.day === d)) for (const st of s.steps) {
      if (st.type === 'line') { st.lemmas.forEach((l) => { if (!know(l)) newThisDay++; bump(l, p.learn * (st.gesture ? 1 : 0.6)); words[l] = recordHeard(words[l], session, now); }); continue; }
      const type = chooseReplyType(st.lemmas, words, mode, recent); recent.push(type);
      const difficulty = { tap: 0, tiles: 0.1, typeHint: 0.2, typeFree: 0.3 }[type];
      const k = st.lemmas.reduce((a, l) => a * (0.35 + 0.65 * know(l)), 1);
      const pOk = Math.max(0.02, Math.min(0.98, k - difficulty + (type === 'tap' ? p.guess * (1 - k) : 0)));
      let tries = 0, ok = false;
      while (!ok && tries < 3) { tries++; ok = R() < pOk + tries * 0.15; }
      for (const l of st.lemmas) { words[l] = recordAttempt(words[l], { rungUsed: rungForReply(type), correct: ok && tries === 1, firstTry: tries === 1, hinted: tries > 1, session, now }); bump(l, p.learn * (ok ? 0.8 : 0.4)); }
      missRun = ok && tries === 1 ? 0 : missRun + (tries === 3 && !ok ? 1 : 0);
      if (tries === 3 && !ok) frustration++;
    }
    if (newThisDay === 0) boredom++;
    // sleep: forgetting
    for (const [l, v] of strength) strength.set(l, v * (1 - p.forget * 0.3));
    now += 86_400_000;
  }
  for (let i = 0; i < 7; i++) for (const [l, v] of strength) strength.set(l, v * (1 - p.forget * 0.12));
  const retained = [...strength.values()].filter((v) => v >= 0.5).length;
  const maxRung = Math.max(...Object.values(words).map((w) => w.rung));
  return { retained, frustrationPerDay: frustration / days.length, boredom, maxRung };
}

export function suiteL(content: Content, seed = 11): SuiteResult {
  const t = mk('L'); const cases: Case[] = [];
  // checker
  const items = slipSet(content, seed);
  let right = 0, rootAccepted = 0;
  const byKind: Record<string, [number, number]> = {};
  for (const it of items) {
    const v = checkTyped(it.typed, it.accepted, it.quran).verdict;
    const ok = it.expect.includes(v);
    if (ok) right++;
    if ((it.kind === 'root-swap' || it.kind === 'random-typo') && (v === 'correct' || v === 'accept_with_note')) rootAccepted++;
    const k = byKind[it.kind] ?? [0, 0]; k[0] += ok ? 1 : 0; k[1]++; byKind[it.kind] = k;
  }
  const checkerAcc = right / items.length;
  cases.push(t('checker:>=99%-correct-classification', checkerAcc >= 0.99, `${(checkerAcc * 100).toFixed(2)}% of ${items.length}`));
  cases.push(t('checker:zero-root-changing-accepted', rootAccepted === 0, `${rootAccepted} accepted`));
  for (const [k, [a, n]] of Object.entries(byKind)) cases.push({ suite: 'L', id: `checker-kind:${k}`, status: a === n ? 'pass' : 'fail', detail: `${a}/${n}` });
  // ladder
  const lc = ladderCases(t); cases.push(...lc);
  // synthetic learners
  const R = rng(seed);
  const pop = profiles(120, R);
  const modes = ['auto', 'musafir', 'talib', 'muqim'] as const;
  const metrics: Record<string, number | string> = { checkerItems: items.length, checkerAccuracy: +checkerAcc.toFixed(4), learners: pop.length };
  for (const m of modes) {
    const res = pop.map((p) => ({ p, r: simulate(content, p, m, R) }));
    const ret = res.map((x) => x.r.retained).sort((a, b) => a - b);
    const median = ret[Math.floor(ret.length / 2)];
    const slow = res.filter((x) => x.p.kind === 'slow');
    const slowFr = slow.reduce((a, x) => a + x.r.frustrationPerDay, 0) / slow.length;
    metrics[`${m}:medianRetained`] = median;
    metrics[`${m}:slowFrustrationPerDay`] = +slowFr.toFixed(2);
    metrics[`${m}:boredomDays`] = +(res.reduce((a, x) => a + x.r.boredom, 0) / res.length).toFixed(2);
    cases.push(t(`learners:${m}:slow-frustration<=1/day`, slowFr <= 1, slowFr.toFixed(2)));
    cases.push(t(`learners:${m}:median-retained>=80%-of-lemmas`, median >= 0.8 * content.lemmas.length, `${median}/${content.lemmas.length}`));
  }
  metrics.retainedFraction = +((metrics['auto:medianRetained'] as number) / content.lemmas.length).toFixed(3);
  return { suite: 'L', cases, metrics };
}
