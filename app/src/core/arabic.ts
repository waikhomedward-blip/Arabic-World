// Arabic text utilities shared by the game, the content tools and the lab.

export const HARAKAT_RE = /[ً-ْٰ]/g; // tanwin, short vowels, shadda, sukun, dagger alif
export const TATWEEL_RE = /ـ/g;
const PUNCT_RE = /[؟?،,.!؛;:"'«»()\-]/g;

/** NFC, strip tatweel + harakat, strip punctuation, collapse spaces (build rule 8 base match). */
export function baseForm(s: string): string {
  return s
    .normalize('NFC')
    .replace(TATWEEL_RE, '')
    .replace(HARAKAT_RE, '')
    .replace(PUNCT_RE, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Lenient form: hamza seats, ة/ه/ت, ى/ي, final verbal alif (build rule 9 "accept with note"). */
export function lenientForm(s: string, verbalAlif = true): string {
  return baseForm(s)
    .split(' ')
    .map((w) =>
      w
        .replace(/[أإآٱ]/g, 'ا')
        .replace(/ؤ/g, 'و')
        .replace(/ئ/g, 'ي')
        .replace(verbalAlif ? /وا$/u : /$^/u, verbalAlif ? 'و' : '') // final verbal alif (checker also compares without it)
        .replace(/ء/g, '')
        .replace(/ى/g, 'ي')
        .replace(/[ةت]$/u, 'ه'),
    )
    .join(' ');
}

/** Root-changing confusable letters (learner substitutions). Mapped to one class symbol. */
const CONFUSABLE: Record<string, string> = {
  'ص': 'س', 'ث': 'س', 'ط': 'ت', 'ض': 'د', 'ذ': 'ز', 'ظ': 'ز',
  'ح': 'ه', 'ع': 'ا', 'ق': 'ك', 'غ': 'خ',
};

export function confusableForm(s: string): string {
  return lenientForm(baseForm(s).replace(/./gu, (c) => CONFUSABLE[c] ?? c));
}

/** Drop long vowels (ا و ي) for "long vowel added/dropped" detection. */
export function skeletonForm(s: string): string {
  return confusableForm(s).replace(/[اوي]/g, '');
}

const ARABIC_LETTER = /[ء-غف-يٱ]/;
const MARK = /[ً-ْٰ]/;
/** Letters that never need their own mark. */
const NO_MARK_NEEDED = new Set(['ا', 'ى', 'آ', 'ٱ']);

export interface TashkeelReport { required: number; marked: number; missing: string[] }

/**
 * Heuristic full-tashkeel check. A letter needs a following mark unless:
 * it is alif/alif maqsura/madda/wasla; it is و/ي acting as a long vowel (after ُ / ِ);
 * it is the lam of the article before a sun letter carrying shadda;
 * it is the alif of the article; it is the last letter of a word (pausal ending allowed).
 */
export function tashkeelReport(text: string): TashkeelReport {
  const rep: TashkeelReport = { required: 0, marked: 0, missing: [] };
  for (const word of text.normalize('NFC').split(/\s+/)) {
    const chars = [...word.replace(TATWEEL_RE, '')];
    const letters: { ch: string; marks: string }[] = [];
    for (const c of chars) {
      if (ARABIC_LETTER.test(c)) letters.push({ ch: c, marks: '' });
      else if (MARK.test(c) && letters.length) letters[letters.length - 1].marks += c;
    }
    letters.forEach((l, i) => {
      if (NO_MARK_NEEDED.has(l.ch)) return;
      if (i === letters.length - 1) return; // pausal
      const prev = letters[i - 1];
      if ((l.ch === 'و' && prev?.marks.includes('ُ')) || (l.ch === 'ي' && prev?.marks.includes('ِ'))) return;
      // article: (و|ف|ب|ل|ك)? + ال
      const artStart = letters[0] && ['و', 'ف', 'ب', 'ك'].includes(letters[0].ch) && letters[1]?.ch === 'ا' ? 1 : 0;
      if (i === artStart + 1 && l.ch === 'ل' && ['ا', 'ٱ'].includes(letters[artStart]?.ch) && letters[i + 1]?.marks.includes('ّ')) return;
      // لِـ + الـ drops the alif: لِلنَّاسِ — the article's lam (index 1) before a shadda'd sun letter needs no mark
      if (i === 1 && l.ch === 'ل' && letters[0]?.ch === 'ل' && letters[i + 1]?.marks.includes('ّ')) return;
      rep.required++;
      if (l.marks) rep.marked++;
      else rep.missing.push(`${word}[${i}:${l.ch}]`);
    });
  }
  return rep;
}

export function hasArabic(s: string): boolean { return ARABIC_LETTER.test(s); }

export function levenshtein(a: string, b: string): number {
  const A = [...a], B = [...b];
  const dp = Array.from({ length: A.length + 1 }, (_, i) => [i, ...Array(B.length).fill(0)]);
  for (let j = 1; j <= B.length; j++) dp[0][j] = j;
  for (let i = 1; i <= A.length; i++)
    for (let j = 1; j <= B.length; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (A[i - 1] === B[j - 1] ? 0 : 1));
  return dp[A.length][B.length];
}
