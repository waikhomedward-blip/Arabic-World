import { describe, it, expect } from 'vitest';
import { loadContentFromDisk } from '../app/src/core/loadDisk';
import { suiteR } from '../lab/suites/R';
import { suiteG } from '../lab/suites/G';
import { checkTyped } from '../app/src/core/checker';
import { tashkeelReport } from '../app/src/core/arabic';

const content = loadContentFromDisk(process.cwd());

describe('Suite R (hard rules) blocks the build', () => {
  it('passes 100%', () => {
    const fails = suiteR(content, process.cwd()).cases.filter((c) => c.status === 'fail');
    expect(fails.map((f) => f.id)).toEqual([]);
  });
});
describe('Gameplay never soft-locks', () => {
  it('all bots finish', () => {
    expect(suiteG(content, 3).cases.filter((c) => c.status === 'fail')).toEqual([]);
  });
});
describe('checker', () => {
  it('classifies the core slip types', () => {
    expect(checkTyped('وعليكم السلام', ['وَعَلَيْكُمُ السَّلَامُ']).verdict).toBe('correct');
    expect(checkTyped('تفاحه', ['تُفَّاحَةٌ']).verdict).toBe('accept_with_note');
    expect(checkTyped('تفاحه', ['تُفَّاحَةٌ'], true).verdict).toBe('did_you_mean');
    expect(checkTyped('سديق', ['صَدِيقٌ']).verdict).toBe('did_you_mean');
    expect(checkTyped('كتب', ['كِتَابٌ']).verdict).toBe('did_you_mean');
    expect(checkTyped('بيت', ['كِتَابٌ']).verdict).toBe('reject');
    // regression (cycle 5): a dropped long vowel in a noun ending -اء must not be accepted
    expect(checkTyped('هوء', ['هَوَاءٌ']).verdict).not.toMatch(/correct|accept_with_note/);
    expect(checkTyped('هوا', ['هَوَاءٌ']).verdict).toBe('accept_with_note');
    expect(checkTyped('كتبو', ['كَتَبُوا']).verdict).toBe('accept_with_note');
  });
});
describe('tashkeel validator', () => {
  it('flags missing marks and accepts full ones', () => {
    expect(tashkeelReport('كتاب جديد').missing.length).toBeGreaterThan(0);
    expect(tashkeelReport('السَّلَامُ عَلَيْكُمْ').missing).toEqual([]);
  });
});
