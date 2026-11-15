// Suite R: hard rules and etiquette. Must be 100%.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import type { Content } from '../../app/src/core/content';
import { sceneTexts } from '../../app/src/core/content';
import { AudioPolicy, ALLOWED_AUDIO_KINDS } from '../../app/src/core/audio';
import { characterParts } from '../../app/src/world/characterSpec';
import { mk, type SuiteResult } from './types';

const FEMALE_NAMES = ['فاطمة', 'عائشة', 'مريم', 'زينب', 'خديجة', 'سارة', 'ليلى', 'هند', 'أمينة', 'سلمى', 'رقية', 'حفصة', 'آمنة', 'نادية', 'منى', 'هدى', 'رانيا', 'ياسمين', 'دينا', 'أسماء'];
const FEMALE_NAMES_EN = /\b(fatima|aisha|maryam|zainab|khadija|sara|sarah|layla|hind|amina|salma|ruqayya|hafsa|nadia|mona|huda|rania|yasmin|dina|asma)\b/i;
const FACE_EMOJI = /[\u{1F600}-\u{1F64F}\u{1F910}-\u{1F92F}\u{1F970}-\u{1F97A}\u{1F466}-\u{1F487}\u{1F574}-\u{1F575}\u{1F645}-\u{1F64E}\u{1F926}\u{1F937}\u{1F9D1}-\u{1F9DD}\u{263A}\u{2639}\u{1F642}\u{1F643}\u{1F47C}\u{1F478}\u{1F470}\u{1F930}\u{1F931}\u{1F9D5}]/u;
const PROPHETS_COMPANIONS_EN = /\b(muhammad|ibrahim|abraham|musa|moses|isa|jesus|nuh|noah|abu bakr|uthman|ali ibn|umar ibn|bilal ibn)\b/i;

function walk(dir: string, out: string[] = []): string[] {
  if (!existsSync(dir)) return out;
  for (const f of readdirSync(dir)) {
    if (f === 'node_modules' || f === 'dist' || f.startsWith('.')) continue;
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, out); else out.push(p);
  }
  return out;
}
const stripComments = (s: string) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');

export function suiteR(content: Content, root: string): SuiteResult {
  const t = mk('R'); const cases = [];
  const chars = content.cast.characters;
  for (const c of chars) {
    cases.push(t(`male:${c.id}`, c.gender === 'male'));
    cases.push(t(`no-face:${c.id}`, c.face === 'none'));
    cases.push(t(`voice-male-allowlist:${c.id}`, content.cast.allowedVoices.includes(c.voice), c.voice));
    cases.push(t(`modest:${c.id}`, c.garments.length > 0 && c.garments.every((g) => content.cast.allowedGarments[g]?.fit === 'loose'), c.garments.join(',')));
    cases.push(t(`no-female-name:${c.id}`, !FEMALE_NAMES_EN.test(c.nameEn) && !FEMALE_NAMES.some((n) => c.nameAr.includes(n))));
    cases.push(t(`not-prophet-or-companion:${c.id}`, !PROPHETS_COMPANIONS_EN.test(c.nameEn + ' ' + c.role)));
    const parts = characterParts(c);
    const head = parts.filter((p) => p.slot === 'head');
    cases.push(t(`smooth-head-geometry:${c.id}`, head.length === 1 && head[0].shape === 'sphere' && parts.every((p) => !/eye|nose|mouth|lip|brow|pupil|face/i.test(p.name)), parts.map((p) => p.name).join(',')));
  }
  const castIds = new Set(chars.map((c) => c.id));
  for (const s of content.scenes) {
    for (const st of s.steps) cases.push(t(`speaker-in-cast:${s.id}:${st.speaker}`, castIds.has(st.speaker)));
    for (const x of sceneTexts(s)) {
      cases.push(t(`no-female-name-text:${x.where}`, !FEMALE_NAMES.some((n) => x.ar.replace(/[ً-ْٰ]/g, '').includes(n))));
      cases.push(t(`no-feminine-address:${x.where}`, !/أَنْتِ|أنتِ/.test(x.ar)));
      cases.push(t(`no-face-emoji:${x.where}`, !FACE_EMOJI.test(x.ar)));
    }
    s.steps.forEach((st, i) => { if (st.type === 'prompt') st.options.forEach((o, j) => cases.push(t(`no-face-emoji:${s.id}#${i}.opt${j}`, !FACE_EMOJI.test(o.ar)))); });
    // Quran etiquette
    const hasQuran = (s.quran?.length ?? 0) > 0;
    cases.push(t(`quran-only-sanctuary:${s.id}`, !hasQuran || s.tags.includes('sanctuary')));
    cases.push(t(`quran-never-in-failure-reward-menu:${s.id}`, !hasQuran || s.kind === 'story'));
    for (const q of s.quran ?? []) cases.push(t(`quran-whole-verses:${s.id}:${q.surah}:${q.ayahStart}`, Number.isInteger(q.ayahStart) && q.ayahEnd >= q.ayahStart));
  }
  // Audio
  const manifest = JSON.parse(readFileSync(join(root, 'content/audio_manifest.json'), 'utf8'));
  for (const f of manifest.files) cases.push(t(`audio-kind:${f.path}`, ALLOWED_AUDIO_KINDS.includes(f.kind)));
  const listed = new Set(manifest.files.map((f: { path: string }) => f.path));
  const publicFiles = walk(join(root, 'app/public')).map((p) => p.slice(join(root, 'app/public').length + 1));
  for (const p of publicFiles.filter((p) => /\.(mp3|ogg|wav|m4a|aac|opus|webm|flac)$/i.test(p))) cases.push(t(`audio-in-manifest:${p}`, listed.has(p)));
  const pol = new AudioPolicy(); pol.setSanctuary(true); pol.startAdhan();
  cases.push(t('adhan-mutes-everything-else', (['speech', 'ambient', 'sfx', 'quran'] as const).every((k) => pol.channels[k].muted) && !pol.channels.adhan.muted));
  pol.endAdhan(); pol.setSanctuary(false);
  cases.push(t('quran-audio-blocked-outside-sanctuary', !pol.canPlay('quran')));
  cases.push(t('unknown-audio-kind-blocked', !pol.canPlay('music' as never)));
  // Source scans
  const src = walk(join(root, 'app/src')).filter((p) => /\.(ts|tsx|css|html)$/.test(p));
  for (const p of src) {
    const code = stripComments(readFileSync(p, 'utf8'));
    const rel = p.slice(root.length + 1);
    cases.push(t(`no-oscillator(music):${rel}`, !/createOscillator|OscillatorNode/.test(code)));
    if (/\.tsx$/.test(p)) cases.push(t(`no-gamification-ui:${rel}`, !/['">\s](XP|Coins?|Gems?|Streaks?|Leaderboard|Loot ?box)\b/.test(code)));
    if (/world\//.test(rel)) cases.push(t(`no-face-parts-in-world-code:${rel}`, !/\b(eye|eyes|nose|mouth|lips?|pupil|eyebrow)\b/i.test(code)));
    cases.push(t(`no-face-emoji-src:${rel}`, !FACE_EMOJI.test(code)));
  }
  // Licensing
  const assetLog = readFileSync(join(root, 'docs/ASSET_LOG.md'), 'utf8');
  for (const p of publicFiles.filter((p) => !/\.(webmanifest)$/.test(p) && !p.startsWith('icons/'))) cases.push(t(`asset-logged:${p}`, assetLog.includes(p)));
  const all = walk(root).filter((p) => !p.includes('/lab/results/'));
  cases.push(t('no-qac-data-shipped', !all.some((p) => /quranic-corpus-morphology|qac[-_]morph/i.test(p))));
  const secretRe = /(sk-[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{30,}|-----BEGIN (RSA )?PRIVATE KEY)/;
  cases.push(t('no-secrets-in-repo', !all.filter((p) => ['.ts', '.tsx', '.json', '.md', '.js', '.html'].includes(extname(p))).some((p) => secretRe.test(readFileSync(p, 'utf8')))));
  const state = existsSync(join(root, 'STATE.md')) ? readFileSync(join(root, 'STATE.md'), 'utf8') : '';
  cases.push(t('scholar-review-gate-present', /\[ \] Scholar review/i.test(state)));
  return { suite: 'R', cases, metrics: {} };
}
