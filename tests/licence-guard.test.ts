import { describe, it, expect } from 'vitest';
import { findForbidden } from '../tools/licence-guard';

describe('licence guard', () => {
  it('catches planted forbidden data names', () => {
    const bad = ['morphology-db-msa-r13.db', 'calima-msa-r13.db', 'SAMER-lexicon.tsv', 'tashkeela.zip', 'MADAMIRA.jar', 'farasa.bin'];
    expect(findForbidden('', bad)).toEqual(bad);
  });
  it('lets allowed names through', () => {
    expect(findForbidden('', ['camel-morph-msa-v1.0.db', 'lemmas.json'])).toEqual([]);
  });
  it('repo is clean', () => {
    expect(findForbidden(process.cwd())).toEqual([]);
  });
});
