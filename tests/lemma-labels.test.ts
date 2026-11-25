import { describe, it, expect } from 'vitest';
import { loadContentFromDisk } from '../app/src/core/loadDisk';
import { suiteC } from '../lab/suites/C';

const failed = (c: ReturnType<typeof loadContentFromDisk>) => suiteC(c).cases.filter((x) => x.status === 'fail').map((x) => x.id);

describe('labelled lemma whitelist', () => {
  it('shipped content has no label failures', () => {
    expect(failed(loadContentFromDisk(process.cwd())).filter((id) => /label/.test(id))).toEqual([]);
  });
  it('catches a missing label', () => {
    const c = loadContentFromDisk(process.cwd());
    delete (c.lemmas[0] as any).label;
    expect(failed(c)).toContain(`lemma-label:${c.lemmas[0].id}`);
  });
  it('catches a label that understates the Arabic', () => {
    const c = loadContentFromDisk(process.cwd());
    const allah = c.lemmas.find((l) => l.id === 'allah')!;
    allah.label = 'universal';
    expect(failed(c)).toContain('lemma-label-not-understated:allah');
  });
  it('catches an unknown lemma in a scene', () => {
    const c = loadContentFromDisk(process.cwd());
    const st: any = c.scenes[0].steps.find((s) => s.type === 'line');
    st.lemmas.push('no_such_word');
    expect(failed(c).some((id) => id.includes('no_such_word'))).toBe(true);
  });
});
