// Suite C: content and pedagogy.
import type { Content, Scene } from '../../app/src/core/content';
import { sceneTexts } from '../../app/src/core/content';
import { tashkeelReport } from '../../app/src/core/arabic';
import { checkTyped } from '../../app/src/core/checker';
import { baseForm } from '../../app/src/core/arabic';
import { optionOrder } from '../../app/src/core/engine';
import { mk, type SuiteResult, type Case } from './types';

function occurrences(s: Scene): { lemma: string; step: number }[] {
  const out: { lemma: string; step: number }[] = [];
  s.steps.forEach((st, i) => {
    if (st.type === 'line') st.lemmas.forEach((l) => out.push({ lemma: l, step: i }));
    else {
      (st.ask.lemmas ?? []).forEach((l) => out.push({ lemma: l, step: i }));
      st.options.forEach((o) => o.lemmas.forEach((l) => out.push({ lemma: l, step: i })));
    }
  });
  return out;
}

export function suiteC(content: Content): SuiteResult {
  const t = mk('C'); const cases: Case[] = [];
  const lemmaIds = new Set(content.lemmas.map((l) => l.id));
  const tier0 = new Set(content.lemmas.filter((l) => l.tier === 0).map((l) => l.id));
  // 1. full tashkeel
  for (const s of content.scenes) for (const x of sceneTexts(s)) {
    const r = tashkeelReport(x.ar);
    cases.push(t(`tashkeel:${x.where}`, r.missing.length === 0, r.missing.join(' ')));
  }
  for (const l of content.lemmas) { const r = tashkeelReport(l.ar); cases.push(t(`tashkeel:lemma:${l.id}`, r.missing.length === 0, r.missing.join(' '))); }
  // 2. lemma references exist
  for (const s of content.scenes) for (const o of occurrences(s)) cases.push(t(`lemma-exists:${s.id}#${o.step}:${o.lemma}`, lemmaIds.has(o.lemma)));
  // 3. each lemma ≥2 uses in ≥2 scenes; ~10 encounters
  const uses = new Map<string, { n: number; scenes: Set<string>; firstDay: number }>();
  for (const s of content.scenes) for (const o of occurrences(s)) {
    const u = uses.get(o.lemma) ?? { n: 0, scenes: new Set(), firstDay: s.day };
    u.n++; u.scenes.add(s.id); u.firstDay = Math.min(u.firstDay, s.day); uses.set(o.lemma, u);
  }
  let tenPlus = 0;
  for (const l of content.lemmas) {
    const u = uses.get(l.id);
    cases.push(t(`twice-two-situations:${l.id}`, !!u && u.n >= 2 && u.scenes.size >= 2, u ? `${u.n} uses / ${u.scenes.size} scenes` : 'unused'));
    if (u && u.n >= 10) tenPlus++;
  }
  // 4. new (non-tier-0) lemmas per day: 3–8
  const days = [...new Set(content.scenes.map((s) => s.day))];
  for (const d of days) {
    const n = content.lemmas.filter((l) => !tier0.has(l.id) && uses.get(l.id)?.firstDay === d).length;
    cases.push(t(`new-lemmas-per-day:d${d}`, n >= 3 && n <= 8, `${n} new`));
  }
  // 5. per line: ≤2 unseen lemmas, and new words need visual support (gesture)
  const seen = new Set<string>(); const sceneCoverage: Record<string, number> = {};
  for (const s of content.scenes) {
    let known = 0, total = 0;
    s.steps.forEach((st, i) => {
      if (st.type !== 'line' || st.register === 'dialect-listen') return;
      const fresh = st.lemmas.filter((l) => !seen.has(l));
      const freshContent = fresh.filter((l) => !tier0.has(l));
      cases.push(t(`max-2-new-per-line:${s.id}#${i}`, freshContent.length <= 2, fresh.join(',')));
      if (fresh.length) cases.push(t(`new-word-has-visual-support:${s.id}#${i}`, !!st.gesture));
      known += st.lemmas.length - fresh.length; total += st.lemmas.length;
      st.lemmas.forEach((l) => seen.add(l));
    });
    s.steps.forEach((st) => { if (st.type === 'prompt') { st.lemmas.forEach((l) => seen.add(l)); st.options.forEach((o) => o.lemmas.forEach((l) => seen.add(l))); } });
    sceneCoverage[s.id] = total ? known / total : 1;
  }
  // 6. register: dialect lines are listen-only (no lemmas) and prompts are never dialect
  for (const s of content.scenes) s.steps.forEach((st, i) => {
    if (st.type === 'line' && st.register === 'dialect-listen') cases.push(t(`dialect-listen-only:${s.id}#${i}`, st.lemmas.length === 0));
  });
  // 7. prompts are well-formed: a correct option, accepted answers self-check, tiles can build an answer
  for (const s of content.scenes) s.steps.forEach((st, i) => {
    if (st.type !== 'prompt') return;
    cases.push(t(`prompt-has-correct:${s.id}#${i}`, st.options.some((o) => o.correct)));
    for (const a of st.accepted) cases.push(t(`accepted-self-check:${s.id}#${i}:${a}`, checkTyped(a, st.accepted).verdict === 'correct'));
    if (st.tiles.length) {
      const tileBases = st.tiles.map(baseForm);
      cases.push(t(`tiles-can-build:${s.id}#${i}`, st.accepted.some((a) => baseForm(a).split(' ').every((w) => tileBases.includes(w)))));
    }
    if (st.action) cases.push(t(`action-has-option:${s.id}#${i}`, st.options.some((o) => o.correct && o.action === st.action)));
  });
  // 8. root twists: every root with ≥2 lemmas is surfaced in a noticing moment
  const roots = new Map<string, string[]>();
  for (const l of content.lemmas) if (l.root) roots.set(l.root, [...(roots.get(l.root) ?? []), l.id]);
  const noticed = new Set(content.scenes.flatMap((s) => s.steps.flatMap((st) => (st.type === 'line' && st.notice ? [st.notice.root] : []))));
  for (const [r, ids] of roots) if (ids.length >= 2) cases.push(t(`root-twist:${r}`, noticed.has(r), ids.join(',')));
  // 9. answer-pattern bias (a learner must not be able to guess without reading)
  const prompts = content.scenes.flatMap((s) => s.steps.filter((x): x is Extract<typeof x, { type: 'prompt' }> => x.type === 'prompt'));
  const shownFirstCorrect = prompts.filter((p) => p.options[optionOrder(p)[0]].correct).length / prompts.length;
  const single = prompts.filter((p) => !p.action && p.options.filter((o) => o.correct).length === 1 && p.options.length > 1);
  const longest = single.filter((p) => { const L = (o: { ar: string }) => baseForm(o.ar).length; const c = p.options.find((o) => o.correct)!; return p.options.every((o) => o === c || L(o) < L(c)); }).length / single.length;
  const yn = prompts.filter((p) => p.options.some((o) => o.correct && /^(نَعَمْ|لَا)/.test(o.ar)) && p.options.filter((o) => o.correct).length === 1);
  const noShare = yn.filter((p) => p.options.find((o) => o.correct)!.ar.startsWith('لَا')).length / Math.max(1, yn.length);
  cases.push(t('bias:correct-shown-first<=60%', shownFirstCorrect <= 0.6, `${(shownFirstCorrect * 100).toFixed(0)}%`));
  cases.push(t('bias:correct-is-longest<=40%', longest <= 0.4, `${(longest * 100).toFixed(0)}% of ${single.length}`));
  cases.push(t('bias:yes-no-answer-is-no>=25%', noShare >= 0.25, `${(noShare * 100).toFixed(0)}% of ${yn.length}`));
  // 10. universal first: the player is never required to say a religious formula; there is always a neutral correct reply
  for (const p of prompts) {
    const correct = p.options.filter((o) => o.correct);
    if (correct.length && correct.every((o) => /اللّٰه|الله/.test(o.ar))) cases.push(t(`neutral-option:${p.id}`, false, 'every correct reply contains a religious formula'));
    else cases.push(t(`neutral-option:${p.id}`, true));
  }
  // 11. ten-day scope (v1 target)
  cases.push(t('ten-days-authored', days.length >= 10, `${days.length} days`));
  cases.push(t('lemma-target-150', content.lemmas.length >= 150, `${content.lemmas.length} lemmas`));
  const covVals = Object.values(sceneCoverage);
  return { suite: 'C', cases, metrics: { lemmas: content.lemmas.length, days: days.length, scenes: content.scenes.length, tenEncounterShare: +(tenPlus / content.lemmas.length).toFixed(3), minSceneCoverage: +Math.min(...covVals).toFixed(3), meanSceneCoverage: +(covVals.reduce((a, b) => a + b, 0) / covVals.length).toFixed(3) } };
}
