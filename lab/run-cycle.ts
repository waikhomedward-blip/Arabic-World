// Runs every lab suite, writes lab/results/cycle-NNN/ and updates lab/scoreboard.json.
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { loadContentFromDisk } from '../app/src/core/loadDisk';
import { suiteR } from './suites/R';
import { suiteC } from './suites/C';
import { suiteG } from './suites/G';
import { suiteL } from './suites/L';
import type { SuiteResult } from './suites/types';

const root = process.cwd();
const boardPath = join(root, 'lab/scoreboard.json');
const board: { cycles: any[] } = existsSync(boardPath) ? JSON.parse(readFileSync(boardPath, 'utf8')) : { cycles: [] };
const cycle = Number(process.argv[2] ?? (board.cycles.at(-1)?.cycle ?? 0) + 1);
const seed = cycle * 101;

const content = loadContentFromDisk(root);
const notBuilt = (s: string, why: string): SuiteResult => ({ suite: s, cases: [{ suite: s, id: `${s}:not-built`, status: 'not_built', detail: why }], metrics: {} });
const suites: SuiteResult[] = [
  suiteR(content, root),
  suiteC(content),
  suiteG(content, seed),
  suiteL(content, seed),
  notBuilt('S', 'speech corpus + engines not built yet; voice stays off'),
  notBuilt('P', 'Playwright WebKit iPhone perf runs not built yet'),
  notBuilt('V', 'screenshot + rubric review not built yet'),
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
const parts = { C: 25 * C, G: 15 * G, checker: 15 * checker, ladder: 10 * ladder, learners: 15 * learners, P: 0, S: 0, V: 0 };
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
  speech: 'not built', perf: 'not built', visual: 'not built', cases: total, failures: fails.length, parts,
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
