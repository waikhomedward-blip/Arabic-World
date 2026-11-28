import { describe, it, expect } from 'vitest';
import { defineNoun, numeralGender, pluralAdjectiveGender, SUN_LETTERS, pausal } from '../app/src/core/agreement';

describe('Arabic agreement engine', () => {
  it('has 14 sun letters', () => expect(SUN_LETTERS.size).toBe(14));
  it('moon letter keeps lam with sukun, strips tanwin', () => {
    expect(defineNoun('بَيْتٌ')).toBe('اَلْبَيْت');
  });
  it('sun letter assimilates with shadda', () => {
    expect(defineNoun('شَمْسٌ')).toBe('اَلشَّمْس');
  });
  it('number-noun polarity', () => {
    expect(numeralGender(3, 'm')).toBe('f');
    expect(numeralGender(10, 'f')).toBe('m');
    expect(numeralGender(2, 'm')).toBe('m');
    expect(numeralGender(11, 'f')).toBe('f');
    expect(() => numeralGender(0, 'm')).toThrow();
  });
  it('plural adjective rule', () => {
    expect(pluralAdjectiveGender(false)).toBe('f-sg');
    expect(pluralAdjectiveGender(true)).toBe('m-pl');
  });
  it('pausal form', () => expect(pausal('كِتَابٌ')).toBe('كِتَابْ'));
});
