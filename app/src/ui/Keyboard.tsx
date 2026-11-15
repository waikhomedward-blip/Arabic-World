// In-game Arabic keyboard (build rule 11): Apple Arabic layout, long-press sets, hidden harakat row.
import { useRef, useState } from 'react';

const ROWS = [
  ['ض', 'ص', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج', 'د'],
  ['ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ك', 'ط'],
  ['ذ', 'ء', 'ؤ', 'ر', 'ى', 'ة', 'و', 'ز', 'ظ'],
];
const LONG: Record<string, string[]> = { 'ا': ['أ', 'إ', 'آ', 'ٱ'], 'ي': ['ئ', 'ى'], 'و': ['ؤ'], 'ه': ['ة'], 'ة': ['ه', 'ت'], 'ء': ['أ', 'إ', 'ؤ', 'ئ'] };
const HARAKAT = ['َ', 'ِ', 'ُ', 'ْ', 'ّ', 'ً', 'ٍ', 'ٌ'];

export function Keyboard({ onKey, onBack, onSubmit }: { onKey: (k: string) => void; onBack: () => void; onSubmit: () => void }) {
  const [pop, setPop] = useState<{ base: string; opts: string[] } | null>(null);
  const [marks, setMarks] = useState(false);
  const timer = useRef<number | null>(null);
  const longFired = useRef(false);
  const down = (k: string) => {
    longFired.current = false;
    if (LONG[k]) timer.current = window.setTimeout(() => { longFired.current = true; setPop({ base: k, opts: LONG[k] }); }, 420);
  };
  const up = (k: string) => {
    if (timer.current) window.clearTimeout(timer.current);
    if (!longFired.current) onKey(k);
  };
  return (
    <div className="kb" dir="rtl" onContextMenu={(e) => e.preventDefault()}>
      {pop && (
        <div className="kb-pop">
          {pop.opts.map((o) => <button key={o} className="key" onClick={() => { onKey(o); setPop(null); }}>{o}</button>)}
          <button className="key small" onClick={() => setPop(null)}>×</button>
        </div>
      )}
      {marks && <div className="kb-row">{HARAKAT.map((h) => <button key={h} className="key mark" onClick={() => onKey(h)}>{'ـ' + h}</button>)}</div>}
      {ROWS.map((r, i) => (
        <div className="kb-row" key={i}>
          {r.map((k) => (
            <button key={k} className="key" onPointerDown={() => down(k)} onPointerUp={() => up(k)} onPointerLeave={() => timer.current && window.clearTimeout(timer.current)}>{k}</button>
          ))}
        </div>
      ))}
      <div className="kb-row">
        <button className="key wide" onClick={onSubmit} aria-label="check">✓</button>
        <button className="key space" onClick={() => onKey(' ')} aria-label="space">␣</button>
        <button className="key small" onClick={() => setMarks((m) => !m)} aria-label="vowel marks">ـَ</button>
        <button className="key small" onClick={onBack} aria-label="delete">⌫</button>
      </div>
    </div>
  );
}
