// Review classes (Edward: most of the game must need no scholar review).
// universal: self-evident everyday life (water, food, day and night, family, numbers) — no review needed
// cultural:  greetings and everyday expressions that mention God (as-salāmu ʿalaykum, in shā' Allāh), the masjid as a landmark — one short review list
// sacred:    worship and scripture (prayer, Quran, adhan, du'a, fasting, Hajj) — only in optional, scholar-reviewed content
import { baseForm } from './arabic';
import type { Scene } from './content';

export type ReviewClass = 'universal' | 'cultural' | 'sacred';
export const RANK: Record<ReviewClass, number> = { universal: 0, cultural: 1, sacred: 2 };

const SACRED = /صلا[ةه]|قرا?ن|قرآن|اذان|أذان|آي[ةه]|سور[ةه]|دعاء|وضوء|صوم|صيام|حج|عمر[ةه]|تلاو[ةه]/;
const CULTURAL = /الله|لله|السلام عليكم|وعليكم السلام|مسجد/;

export function classifyText(ar: string): ReviewClass {
  const b = baseForm(ar);
  if (SACRED.test(b)) return 'sacred';
  if (CULTURAL.test(b)) return 'cultural';
  return 'universal';
}

export function classifyScene(s: Scene): ReviewClass {
  if (s.tags.includes('sanctuary') || (s.quran?.length ?? 0) > 0) return 'sacred';
  let worst: ReviewClass = 'universal';
  for (const st of s.steps) {
    const texts = st.type === 'line' ? [st.ar] : [st.ask.ar ?? '', ...st.options.map((o) => o.ar)];
    for (const t of texts) { const c = classifyText(t); if (c === 'sacred') return 'sacred'; if (c === 'cultural') worst = 'cultural'; }
  }
  return worst;
}
