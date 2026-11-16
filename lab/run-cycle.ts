// Runs every lab suite, writes lab/results/cycle-NNN/ and updates lab/scoreboard.json.
import { mkdirSync, writeFileSync, readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { loadContentFromDisk } from '../app/src/core/loadDisk';
import { suiteR } from './suites/R';
import { suiteC } from './suites/C';
import { suiteG } from './suites/G';
import { suiteL } from './suites/L';
import type { SuiteResult } from './suites/types';
import { writeScholarList } from '../tools/scholar-list';

const root = process.cwd();
const boardPath = join(root, 'lab/scoreboard.json');
const board: { cycles: any[] } = existsSync(boardPath) ? JSON.parse(readFileSync(boardPath, 'utf8')) : { cycles: [] };
const cycle = Number(process.argv[2] ?? (board.cycles.at(-1)?.cycle ?? 0) + 1);
const seed = cycle * 101;

const content = loadContentFromDisk(root);
writeScholarList(root); // keep docs/SCHOLAR_REVIEW.md current every cycle
const notBuilt = (s: string, why: string): SuiteResult => ({ suite: s, cases: [{ suite: s, id: `${s}:not-built`, status: 'not_built', detail: why }], metrics: {} });
// Suites V and P come from the Playwright play-through (tests/e2e/verify.spec.ts → lab/results/e2e/<project>/<scene>.json)
function e2eSuites(): SuiteResult[] {
  const dir = join(root, 'lab/results/e2e');
  if (!existsSync(dir)) return [notBuilt('V', 'run `npx playwright test` first'), notBuilt('P', 'run `npx playwright test` first')];
  const runs: any[] = [];
  for (const proj of readdirSync(dir)) {
    const pd = join(dir, proj); if (!statSync(pd).isDirectory()) continue;
    for (const f of readdirSync(pd).filter((x) => x.endsWith('.json'))) runs.push(JSON.parse(readFileSync(join(pd, f), 'utf8')));
  }
  const projects = readdirSync(dir).filter((p) => statSync(join(dir, p)).isDirectory());
  const expected = content.scenes.length * projects.length;
  const V: SuiteResult = { suite: 'V', cases: [], metrics: { runs: runs.length, expected } };
  const P: SuiteResult = { suite: 'P', cases: [], metrics: {} };
  for (const id of content.scenes.map((s) => s.id)) for (const proj of projects) {
    const r = runs.find((x) => x.scene === id && x.project === proj);
    V.cases.push({ suite: 'V', id: `played-and-visible:${proj}:${id}`, status: r && r.problems.length === 0 && r.errors.length === 0 ? 'pass' : 'fail', detail: r ? [...r.problems, ...r.errors].join('; ') : 'no run' });
    if (!r) continue;
    V.cases.push({ suite: 'V', id: `accessibility-scan:${proj}:${id}`, status: (r.a11y ?? []).length === 0 ? 'pass' : 'fail', detail: (r.a11y ?? []).join(', ') });
    V.cases.push({ suite: 'V', id: `tap-targets>=24px:${proj}:${id}`, status: (r.tap?.tiny ?? []).length === 0 ? 'pass' : 'fail', detail: (r.tap?.tiny ?? []).slice(0, 6).join(', ') });
    V.cases.push({ suite: 'V', id: `text>=11px:${proj}:${id}`, status: (r.tap?.tinyText ?? []).length === 0 ? 'pass' : 'fail', detail: (r.tap?.tinyText ?? []).slice(0, 6).join(', ') });
    P.cases.push({ suite: 'P', id: `fps>=30:${proj}:${id}`, status: r.fps >= 30 ? 'pass' : 'fail', detail: `${r.fps} fps` });
    P.cases.push({ suite: 'P', id: `p95-frame<=50ms:${proj}:${id}`, status: r.p95FrameMs <= 50 ? 'pass' : 'fail', detail: `${r.p95FrameMs} ms` });
    if (r.throttled) P.cases.push({ suite: 'P', id: `throttled-4x-p95<=50ms:${proj}:${id}`, status: r.throttled.p95 <= 50 ? 'pass' : 'fail', detail: `${r.throttled.p95} ms` });
    P.cases.push({ suite: 'P', id: `first-playable<=15s:${proj}:${id}`, status: r.loadMs <= 15000 ? 'pass' : 'fail', detail: `${r.loadMs} ms (local server, not 4G)` });
  }
  const med = (xs: number[]) => xs.sort((a, b) => a - b)[Math.floor(xs.length / 2)] ?? 0;
  V.metrics.tapTargetsUnder44 = runs.reduce((a, r) => a + (r.tap?.small?.length ?? 0), 0);
  for (const proj of projects) {
    const rs = runs.filter((x) => x.project === proj);
    P.metrics[`${proj}:fpsMedian`] = med(rs.map((x) => x.fps));
    P.metrics[`${proj}:p95FrameMsMedian`] = med(rs.map((x) => x.p95FrameMs));
  }
  P.metrics.drawCallsMax = Math.max(...runs.map((x) => x.stats?.calls ?? 0));
  P.metrics.trianglesMax = Math.max(...runs.map((x) => x.stats?.triangles ?? 0));
  writeFileSync(join(root, 'lab/results', `e2e-summary-cycle-${String(cycle).padStart(3, '0')}.json`), JSON.stringify(runs.map(({ scene, project, renderer, loadMs, fps, p95FrameMs, throttled, stats, problems }) => ({ scene, project, renderer, loadMs, fps, p95FrameMs, throttled, stats, problems })), null, 1));
  return [V, P];
}

const suites: SuiteResult[] = [
  suiteR(content, root),
  suiteC(content),
  suiteG(content, seed),
  suiteL(content, seed),
  notBuilt('S', 'speech corpus + engines not built yet; voice stays off'),
  ...e2eSuites(),
];
const rate = (r: SuiteResult, filter?: (id: string) => boolean) => {
  const cs = r.cases.filter((c) => (c.status === 'pass' || c.status === 'fail') && (!filter || filter(c.id)));
  return cs.length ? cs.filter((c) => c.status === 'pass').length / cs.length : 0;
};
const get = (s: string) => suites.find((x) => x.suite === s)!;
const R = rate(get('R'));
const C = rate(get('C'));
const G = rate(get('G'));
const L = get('L');
const checker = rate(L, (id) => id.startsWith('checker'));
const ladder = rate(L, (id) => id.startsWith('ladder') || id.startsWith('director'));
const learners = Math.min(1, (L.metrics.retainedFraction as number) / 0.8);
// Weights: see lab/SCORING.md
const built = (s: string) => !get(s).cases.some((c) => c.status === 'not_built');
const parts = { C: 25 * C, G: 15 * G, checker: 15 * checker, ladder: 10 * ladder, learners: 15 * learners, P: built('P') ? 10 * rate(get('P')) : 0, S: 0, V: built('V') ? 5 * rate(get('V')) : 0 };
const overall = R < 1 ? 0 : Math.round(Object.values(parts).reduce((a, b) => a + b, 0) * 10) / 10;

const dir = join(root, 'lab/results', `cycle-${String(cycle).padStart(3, '0')}`);
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, 'results.json'), JSON.stringify(suites, null, 1));
const total = suites.reduce((a, s) => a + s.cases.length, 0);
const fails = suites.flatMap((s) => s.cases.filter((c) => c.status === 'fail'));
const row = {
  cycle, date: new Date().toISOString().slice(0, 10), overall, suiteR: +R.toFixed(4), suiteC: +C.toFixed(4), gameplay: +G.toFixed(4),
  crashes: get('G').metrics.crashes, checkerAccuracy: L.metrics.checkerAccuracy, ladder: +ladder.toFixed(3),
  learnersMedianRetained: L.metrics['auto:medianRetained'], lemmas: content.lemmas.length, days: get('C').metrics.days,
  speech: 'not built', perf: built('P') ? +rate(get('P')).toFixed(3) : 'not built', visual: built('V') ? +rate(get('V')).toFixed(3) : 'not built', cases: total, failures: fails.length, parts,
};
board.cycles = board.cycles.filter((c) => c.cycle !== cycle).concat(row).sort((a, b) => a.cycle - b.cycle);
writeFileSync(boardPath, JSON.stringify(board, null, 1));
const summary = [
  `# Cycle ${cycle}`, '', `Overall: **${overall}** / 100 · Suite R ${(R * 100).toFixed(1)}% · cases ${total} · failures ${fails.length}`, '',
  '| Suite | pass rate | metrics |', '|---|---|---|',
  ...suites.map((s) => `| ${s.suite} | ${s.cases.some((c) => c.status === 'not_built') ? 'not built' : (rate(s) * 100).toFixed(1) + '%'} | ${Object.entries(s.metrics).map(([k, v]) => `${k}=${v}`).join(', ')} |`),
  '', '## Failures', ...fails.slice(0, 200).map((f) => `- [${f.suite}] ${f.id}${f.detail ? ` — ${f.detail}` : ''}`),
].join('\n');
writeFileSync(join(dir, 'summary.md'), summary);
console.log(summary.split('\n').slice(0, 14 + Math.min(fails.length, 40)).join('\n'));
if (R < 1) process.exitCode = 1;
