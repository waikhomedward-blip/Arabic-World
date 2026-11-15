import { useRef, useState } from 'react';
import { content, lemmaById } from '../data';
import { RUNG_NAMES } from '../core/ladder';
import { deserialise, serialise, type Progress } from '../core/progress';
import type { Mode } from '../core/director';

export function wordOfTheDay(date = new Date()): string {
  const pool = content.lemmas.filter((l) => !l.ar.includes('ـ'));
  const n = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000);
  return pool[n % pool.length].ar;
}

export function Journal({ progress, onClose, onMode, onImport }: { progress: Progress; onClose: () => void; onMode: (m: Mode) => void; onImport: (p: Progress) => void }) {
  const [copied, setCopied] = useState(false);
  const file = useRef<HTMLInputElement>(null);
  const words = Object.values(progress.words).sort((a, b) => b.rung - a.rung);
  const roots = new Map<string, string[]>();
  for (const w of words) { const r = lemmaById[w.lemma]?.root; if (r) roots.set(r, [...(roots.get(r) ?? []), w.lemma]); }
  const share = async () => {
    const d = new Date();
    const text = `Arabic World · word of the day · ${d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}\n${wordOfTheDay(d)}\nDo you know it?`;
    try { await navigator.clipboard.writeText(text); setCopied(true); } catch { setCopied(false); }
  };
  const exportFile = () => {
    const url = URL.createObjectURL(new Blob([serialise(progress)], { type: 'application/json' }));
    const a = document.createElement('a'); a.href = url; a.download = 'arabic-world-progress.json'; a.click(); URL.revokeObjectURL(url);
  };
  return (
    <div className="panel journal">
      <button className="close" onClick={onClose} aria-label="close">×</button>
      <h2>Words I understand</h2>
      {words.length === 0 && <p className="soft">Words you meet will appear here.</p>}
      <ul className="words">
        {words.map((w) => (
          <li key={w.lemma}>
            <span className="ar" dir="rtl" lang="ar">{lemmaById[w.lemma]?.ar}</span>
            <span className="gloss">{lemmaById[w.lemma]?.en}</span>
            <span className="rung" title={RUNG_NAMES[w.rung]}>{'●'.repeat(w.rung)}{'○'.repeat(Math.max(0, w.targetRung - w.rung))}</span>
          </li>
        ))}
      </ul>
      {[...roots].filter(([, ids]) => ids.length > 1).map(([r, ids]) => (
        <div key={r} className="root"><b dir="rtl">{r}</b> · {ids.map((i) => lemmaById[i].ar).join(' · ')}</div>
      ))}
      <h3>Quran meter</h3>
      <p className="soft">Coming soon: the share of the Quran's words you recognise, counted from the real text.</p>
      <h3>How I reply</h3>
      <div className="modes" dir="rtl">
        {([['auto', 'دَعِ الْمَدِينَةَ تَخْتَارُ', 'Let the city decide'], ['musafir', 'مُسَافِرٌ', 'tap'], ['talib', 'طَالِبٌ', 'build'], ['muqim', 'مُقِيمٌ', 'type']] as const).map(([m, ar, en]) => (
          <button key={m} className={`mode ${progress.mode === m ? 'on' : ''}`} onClick={() => onMode(m)}>{ar}<small>{en}</small></button>
        ))}
      </div>
      <h3>Today</h3>
      <button className="btn" onClick={share}>{copied ? 'Copied ✓' : 'Copy word of the day'}</button>
      <button className="btn" onClick={exportFile}>Export my progress</button>
      <button className="btn" onClick={() => file.current?.click()}>Import progress</button>
      <input ref={file} type="file" accept="application/json" hidden onChange={async (e) => { const f = e.target.files?.[0]; if (f) onImport(deserialise(await f.text())); }} />
      <p className="small">Days in the city: {progress.daysInCity}. Missing a day costs nothing.</p>
    </div>
  );
}
