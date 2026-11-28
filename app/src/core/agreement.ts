// Arabic language pack: rule-built forms (issue #8, first slice).
// Pure, deterministic, no data files. Forms are built by rule, never guessed.

const FATHA = 'َ', DAMMA = 'ُ', KASRA = 'ِ', SUKUN = 'ْ', SHADDA = 'ّ';
const TANWIN = /[ًٌٍ]/g;

/** The 14 sun letters: the article's lam assimilates and the letter takes shadda. */
export const SUN_LETTERS = new Set([...'تثدذرزسشصضطظلن']);

const firstLetter = (w: string): string => [...w.normalize('NFC')].find((c) => /[ء-ي]/.test(c)) ?? '';

/**
 * Definite form of a vowelled noun: strips tanwin, adds اَلْ (moon letter) or اَلـ + shadda (sun letter).
 * The article's own alif is wasla-like: `اَل` is written fully vowelled for learners.
 * Input must start with a vowelled first letter (the validator rejects unvowelled input).
 */
export function defineNoun(word: string): string {
  const w = word.normalize('NFC').replace(TANWIN, '');
  const first = firstLetter(w);
  if (!first) throw new Error(`not an Arabic word: ${word}`);
  if (SUN_LETTERS.has(first)) {
    // put shadda straight after the first letter, before its vowel
    const i = w.indexOf(first);
    return `اَل${w.slice(0, i + first.length)}${SHADDA}${w.slice(i + first.length)}`.normalize("NFC");
  }
  return `اَلْ${w}`;
}

/** Is a word already carrying a full-stop-safe article (اَلْ / اَل + shadda)? */
export function hasArticle(word: string): boolean {
  return /^ا[َ]?ل/.test(word.normalize('NFC'));
}

export type Gender = 'm' | 'f';

/**
 * Number–noun polarity: 3–10 take the OPPOSITE gender of the counted noun's singular;
 * 11+ and 1–2 agree. Returns the gender the numeral must have.
 */
export function numeralGender(n: number, nounGender: Gender): Gender {
  if (!Number.isInteger(n) || n < 1) throw new Error(`bad count: ${n}`);
  if (n >= 3 && n <= 10) return nounGender === 'm' ? 'f' : 'm';
  return nounGender;
}

/** Adjective agreement for a plural noun: non-human plurals take the feminine singular; human plurals agree. */
export function pluralAdjectiveGender(humanPlural: boolean): 'f-sg' | 'm-pl' {
  return humanPlural ? 'm-pl' : 'f-sg';
}

/** Sentence-initial/pausal helper: swap final short vowel for sukun (pausal form for audio). */
export function pausal(word: string): string {
  return word.normalize('NFC').replace(TANWIN, '').replace(new RegExp(`[${FATHA}${DAMMA}${KASRA}]$`), '').replace(new RegExp(`${SUKUN}$`), '') + SUKUN;
}
