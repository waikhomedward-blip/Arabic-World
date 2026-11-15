// Tanzil import with verbatim checks. The text is never altered.
// Usage: put Tanzil's "Uthmani, text with aya numbers" file (sura|aya|text) at tools/data/quran-uthmani.txt, then
//   npx tsx tools/quran-import.ts
// Licence: Tanzil text, CC BY 3.0 (as reported). Credit Tanzil and link tanzil.net wherever the text is shown.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { baseForm } from '../app/src/core/arabic';

const src = 'tools/data/quran-uthmani.txt';
if (!existsSync(src)) { console.error(`Missing ${src}. Download it from tanzil.net/download (needs Edward's OK).`); process.exit(2); }
const raw = readFileSync(src, 'utf8');
const verses = raw.split('\n').filter((l) => /^\d+\|\d+\|/.test(l)).map((l) => { const [s, a, ...t] = l.split('|'); return { s: +s, a: +a, text: t.join('|') }; });
const surahs = new Set(verses.map((v) => v.s));
const problems: string[] = [];
if (verses.length !== 6236) problems.push(`expected 6236 verses, got ${verses.length}`);
if (surahs.size !== 114) problems.push(`expected 114 surahs, got ${surahs.size}`);
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
const sha = createHash('sha256').update(raw).digest('hex');
// Running-word frequency of surface forms (a staircase by *forms*; the lemma staircase needs our own morphology layer).
const freq = new Map<string, number>(); let total = 0;
for (const v of verses) for (const w of baseForm(v.text).split(' ')) { if (!w) continue; total++; freq.set(w, (freq.get(w) ?? 0) + 1); }
const sorted = [...freq.values()].sort((a, b) => b - a);
const stairs: Record<string, number> = {}; let acc = 0; const marks = [0.5, 0.7, 0.8, 0.85, 0.9, 0.95];
sorted.forEach((n, i) => { acc += n; for (const m of marks) if (!stairs[m] && acc / total >= m) stairs[m] = i + 1; });
mkdirSync('content/quran', { recursive: true });
writeFileSync('content/quran/tanzil-meta.json', JSON.stringify({ source: 'Tanzil Uthmani', licence: 'CC BY 3.0 (verbatim, credit tanzil.net)', sha256: sha, verses: verses.length, runningWords: total, distinctForms: freq.size, formsForCoverage: stairs }, null, 1));
console.log({ verses: verses.length, runningWords: total, distinctForms: freq.size, formsForCoverage: stairs, sha256: sha });
