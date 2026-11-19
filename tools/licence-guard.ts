// Licence guard: fails if forbidden third-party word data appears in the repo (docs/LICENCES.md).
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

export const FORBIDDEN = [/morphology-db-msa-r13/i, /calima-msa-r13/i, /disambig-mle/i, /samer/i, /tashkeela/i, /madamira/i, /farasa/i];
const SKIP = new Set(['node_modules', '.git', 'dist', 'docs', 'reports', 'research_notes', 'lab', 'tests']);

export function findForbidden(root: string, names?: string[]): string[] {
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const n of readdirSync(dir)) {
      if (SKIP.has(n)) continue;
      const p = join(dir, n);
      if (FORBIDDEN.some((re) => re.test(n))) out.push(p);
      if (statSync(p).isDirectory()) walk(p);
    }
  };
  if (names) return names.filter((n) => FORBIDDEN.some((re) => re.test(n)));
  walk(root);
  return out;
}
