// Morning check: yesterday's words, one at a time. No red X, no score: a wrong pick just shows the meaning.
import { useState } from 'react';
import type { CheckItem } from '../core/morning';

export function MorningCheck({ items, onAnswer, onDone }: { items: CheckItem[]; onAnswer: (lemma: string, correct: boolean) => void; onDone: () => void }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const item = items[i];
  if (!item) return null;
  const pick = (k: number) => { if (picked !== null) return; setPicked(k); onAnswer(item.lemma, k === item.answer); };
  const next = () => { setPicked(null); if (i + 1 >= items.length) onDone(); else setI(i + 1); };
  return (
    <div className="panel morning">
      <div className="speaker" dir="rtl">قَبْلَ الْفُطُورِ <span className="en">Before breakfast · yesterday's words · {i + 1}/{items.length}</span></div>
      <div className="caption big" dir="rtl" lang="ar">{item.ar}</div>
      <div className="options">
        {item.options.map((o, k) => (
          <button key={k} className={`option en ${picked !== null && k === item.answer ? 'right' : ''}`} onClick={() => pick(k)} disabled={picked !== null && k !== item.answer}>{o}</button>
        ))}
      </div>
      {picked !== null && (
        <>
          <div className="soft">{picked === item.answer ? '✓' : `It means “${item.options[item.answer]}”. It will come back soon.`}</div>
          <button className="btn primary next" onClick={next} aria-label="next">←</button>
        </>
      )}
    </div>
  );
}
