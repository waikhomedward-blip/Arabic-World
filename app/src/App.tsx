import { useEffect, useMemo, useRef, useState } from 'react';
import { content, lemmaById, charById } from './data';
import { World, PLACES, type Placed } from './world/World';
import { start, advance, answer, correctLine, optionOrder, type SceneState, type Feedback, type Answer } from './core/engine';
import { chooseReplyType, rungForReply, type ReplyType, type Mode } from './core/director';
import { newWord, recordAttempt, recordHeard, RUNG_NAMES, Rung } from './core/ladder';
import { deserialise, serialise, touchDay, type Progress } from './core/progress';
import { AudioPolicy, playClick } from './core/audio';
import type { Prompt, Line, Scene } from './core/content';
import { Keyboard } from './ui/Keyboard';
import { Journal } from './ui/Journal';
import { MorningCheck } from './ui/MorningCheck';
import { pickMorningWords, buildMorningCheck } from './core/morning';

const KEY = 'arabic-world-progress';
const today = () => new Date().toLocaleDateString('en-CA');
const SESSION = `${today()}-${Date.now()}`;
const policy = new AudioPolicy();

function shuffle<T>(xs: T[], seed: number): T[] {
  const a = [...xs]; let s = seed;
  for (let i = a.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; const j = Math.floor((s / 233280) * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

export function App() {
  const [progress, setProgress] = useState<Progress>(() => deserialise((() => { try { return localStorage.getItem(KEY); } catch { return null; } })()));
  const [begun, setBegun] = useState(false);
  const [sceneState, setSceneState] = useState<SceneState | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [showEn, setShowEn] = useState(false);
  const [typed, setTyped] = useState('');
  const [placed, setPlaced] = useState<number[]>([]);
  const [replyOverride, setReplyOverride] = useState<ReplyType | null>(null);
  const [journal, setJournal] = useState(false);
  const [pending, setPending] = useState<SceneState | null>(null);
  const audio = useRef<AudioContext | null>(null);

  useEffect(() => { try { localStorage.setItem(KEY, serialise(progress)); } catch { /* storage unavailable (sandboxed viewer): play still works, progress is not kept */ } }, [progress]);

  const dayScenes = content.scenes.filter((s) => s.day === progress.inGameDay);
  const nextScene: Scene | undefined = dayScenes.find((s) => !progress.completedScenes.includes(s.id));
  const maxDay = Math.max(...content.scenes.map((s) => s.day));
  const scene = sceneState ? content.scenes.find((s) => s.id === sceneState.sceneId)! : nextScene;
  const place = scene?.place ?? 'home';
  const step = sceneState && scene && !sceneState.done ? scene.steps[sceneState.step] : null;

  const people: Placed[] = useMemo(() => {
    const at = PLACES[place];
    // centre the group on the camera's focus, in a gentle arc (keeps 3+ people in frame on narrow phones)
    const cast = scene?.cast ?? []; const n = cast.length;
    return cast.map((id, i) => { const off = (i - (n - 1) / 2) * (n >= 3 ? 0.78 : 1.0); return { c: charById[id], at: [at[0] - 0.6 + off, 0, at[2] - 0.3 * Math.abs(off)] as [number, number, number] }; });
  }, [scene, place]);

  const click = () => { if (audio.current) playClick(audio.current, policy); };

  const ensureWords = (p: Progress, lemmas: string[]) => {
    const words = { ...p.words };
    for (const l of lemmas) if (!words[l] && lemmaById[l]) words[l] = newWord(l, lemmaById[l].targetRung as Rung, Date.now());
    return words;
  };
  const firstSeen = (p: Progress, lemmas: string[]) => {
    const f = { ...p.firstSeenDay };
    for (const l of lemmas) if (f[l] === undefined && lemmaById[l]) f[l] = p.inGameDay;
    return f;
  };

  // record "heard" for each line as it is shown
  useEffect(() => {
    if (!step || step.type !== 'line') return;
    setProgress((p) => {
      const words = ensureWords(p, step.lemmas);
      for (const l of step.lemmas) if (words[l]) words[l] = recordHeard(words[l], SESSION, Date.now());
      return { ...p, words, firstSeenDay: firstSeen(p, step.lemmas) };
    });
  }, [sceneState?.step, sceneState?.sceneId]);

  const replyType: ReplyType | null = useMemo(() => {
    if (!step || step.type !== 'prompt') return null;
    if (replyOverride) return replyOverride;
    return chooseReplyType(step.lemmas, ensureWords(progress, step.lemmas), progress.mode, progress.recentReplyTypes);
  }, [step, replyOverride, progress.mode]);

  const begin = () => {
    if (!audio.current) { try { audio.current = new AudioContext(); } catch { /* no audio */ } }
    setBegun(true);
    setProgress((p) => touchDay(p, today()));
  };

  const openScene = () => {
    if (!nextScene) return;
    click(); setSceneState(start(nextScene)); setFeedback(null); setShowEn(false); policy.setSanctuary(nextScene.tags.includes('sanctuary'));
  };

  const finishScene = (sc: Scene) => {
    setProgress((p) => {
      const friendship = { ...p.friendship };
      for (const id of sc.cast) friendship[id] = (friendship[id] ?? 0) + 1;
      return { ...p, completedScenes: [...new Set([...p.completedScenes, sc.id])], friendship };
    });
    setSceneState(null); policy.setSanctuary(false);
  };

  const next = () => {
    if (!scene || !sceneState) return;
    click(); setShowEn(false); setFeedback(null);
    const s = advance(scene, sceneState);
    if (s.done) finishScene(scene); else setSceneState(s);
  };

  const submit = (a: Answer) => {
    if (!scene || !sceneState || !step || step.type !== 'prompt') return;
    const forcedTap = sceneState.showOptions;
    const used: ReplyType = a.kind === 'option' || a.kind === 'action' ? 'tap' : a.kind === 'tiles' ? 'tiles' : (replyType ?? 'typeFree');
    const r = answer(scene, sceneState, a);
    click();
    setFeedback(r.feedback);
    if (r.feedback.type !== 'didYouMean') {
      setProgress((p) => {
        const words = ensureWords(p, step.lemmas);
        for (const l of step.lemmas) if (words[l]) words[l] = recordAttempt(words[l], {
          rungUsed: rungForReply(used), correct: r.correct, firstTry: sceneState.misses === 0,
          hinted: used === 'typeHint' || forcedTap, session: SESSION, now: Date.now(),
        });
        return { ...p, words, firstSeenDay: firstSeen(p, step.lemmas), recentReplyTypes: [...p.recentReplyTypes, used].slice(-6) };
      });
    }
    if (r.feedback.type === 'correct' || r.feedback.type === 'modelled') {
      setTyped(''); setPlaced([]); setReplyOverride(null);
      setPending(r.state); // show the confirmation first; continue applies it
    } else setSceneState(r.state);
  };

  const sleep = () => {
    click();
    setProgress((p) => ({ ...p, inGameDay: Math.min(maxDay + 1, p.inGameDay + 1) }));
  };

  const speakerChar = step ? charById[step.speaker] : null;

  const morningItems = useMemo(() => {
    if (progress.morningDoneDay >= progress.inGameDay || progress.inGameDay > maxDay) return [];
    const ids = pickMorningWords(progress.firstSeenDay, progress.words, progress.inGameDay, Date.now());
    return buildMorningCheck(ids, content.lemmas, progress.inGameDay * 7919, new Set(Object.keys(progress.firstSeenDay)));
  }, [progress.inGameDay, progress.morningDoneDay]);
  const morningActive = begun && !sceneState && progress.morningDoneDay < progress.inGameDay;
  useEffect(() => {
    if (morningActive && morningItems.length === 0) setProgress((p) => ({ ...p, morningDoneDay: p.inGameDay }));
  }, [morningActive, morningItems.length]);
  const morningAnswer = (lemma: string, correct: boolean) => {
    click();
    setProgress((p) => {
      const words = ensureWords(p, [lemma]);
      words[lemma] = recordAttempt(words[lemma], { rungUsed: Rung.Recognised, correct, firstTry: true, hinted: false, session: SESSION, now: Date.now() });
      return { ...p, words };
    });
  };

  return (
    <div className="app">
      <World place={morningActive && morningItems.length ? 'home' : place} people={people} speaker={step?.type === 'line' ? step.speaker : step?.type === 'prompt' && feedback?.type !== 'correct' ? step.speaker : null}
        activeId={!sceneState && nextScene ? nextScene.cast[0] : null} onTapPerson={() => !sceneState && openScene()} />

      <div className="hud" dir="ltr">
        <button className="chip" onClick={() => setJournal(true)} aria-label="Words I have met">📖 {Object.keys(progress.words).length}</button>
        <span className="chip quiet" title="Days in the city">📅 {progress.daysInCity}</span>
        <span className="chip quiet" title="Time in the city (mornings only, 8–11)">🕗 {morningActive ? '08:00' : (scene?.clock ?? '11:00')}</span>
        <span className="chip quiet" dir="rtl">اَلْيَوْمُ {progress.inGameDay}</span>
      </div>

      {!begun && (
        <div className="title" onClick={begin}>
          <h1 dir="rtl">عَالَمٌ عَرَبِيٌّ</h1>
          <p>Arabic World</p>
          <p className="small">Tap to begin · no account · progress stays on this device</p>
        </div>
      )}

      {morningActive && morningItems.length > 0 && (
        <MorningCheck items={morningItems} onAnswer={morningAnswer} onDone={() => { click(); setProgress((p) => ({ ...p, morningDoneDay: p.inGameDay })); }} />
      )}

      {begun && !sceneState && !morningActive && nextScene && (
        <div className="hint" onClick={openScene}>
          <span dir="rtl">{nextScene.title.ar}</span> · tap {charById[nextScene.cast[0]].nameEn} ✨
        </div>
      )}

      {begun && !sceneState && !morningActive && !nextScene && (
        <div className="panel evening">
          {progress.inGameDay <= maxDay ? (
            <>
              <h2 dir="rtl">إِلَى الْغَدِ</h2>
              <p>It's 11:00 and the morning is done. Yesterday's new words come back tomorrow at 8:00 for a quick check.</p>
              <button className="btn" onClick={() => setJournal(true)}>📖 Words I understand</button>
              <button className="btn primary" onClick={sleep}>☀️ Next morning</button>
            </>
          ) : (
            <>
              <h2>More days are coming</h2>
              <p>You have played every day written so far. Come back after the next update.</p>
              <button className="btn" onClick={() => setJournal(true)}>📖 Words I understand</button>
            </>
          )}
        </div>
      )}

      {scene && sceneState && !sceneState.done && step && (
        <div className={`dialogue ${step.type === 'prompt' && !step.action && !sceneState.showOptions && (replyType === 'typeHint' || replyType === 'typeFree') && feedback?.type !== 'correct' && feedback?.type !== 'modelled' ? 'typing' : ''}`}>
          {scene.note && sceneState.step === 0 && <div className="note">{scene.note.en}</div>}
          <div className="speaker" dir="rtl">{speakerChar?.nameAr} <span className="en">{speakerChar?.nameEn}</span></div>
          {step.type === 'line' ? (
            <LineView line={step} showEn={showEn} onToggle={() => setShowEn((v) => !v)} onNext={next} />
          ) : (
            <PromptView
              prompt={step} scene={scene} state={sceneState} feedback={feedback} replyType={replyType!}
              mode={progress.mode} showEn={showEn} onToggleEn={() => setShowEn((v) => !v)}
              typed={typed} setTyped={setTyped} placed={placed} setPlaced={setPlaced}
              onMode={(t) => setReplyOverride(t)} onSubmit={submit}
              onContinue={() => {
                click(); setFeedback(null); setShowEn(false);
                const s = pending; setPending(null);
                if (!s || s.done) finishScene(scene); else setSceneState(s);
              }}
            />
          )}
        </div>
      )}

      {journal && <Journal progress={progress} onClose={() => setJournal(false)} onMode={(m: Mode) => setProgress((p) => ({ ...p, mode: m }))} onImport={(p) => setProgress(p)} />}
    </div>
  );
}

function LineView({ line, showEn, onToggle, onNext }: { line: Line; showEn: boolean; onToggle: () => void; onNext: () => void }) {
  return (
    <>
      <div className={`caption ${line.register === 'dialect-listen' ? 'dialect' : ''}`} dir="rtl" lang="ar" onClick={onToggle}>{line.ar}</div>
      {showEn ? <div className="en-reveal">{line.en}</div> : <div className="tap-hint">tap the Arabic for meaning</div>}
      {line.notice && <div className="notice"><span dir="rtl">{line.notice.root}</span> — {line.notice.en}</div>}
      <button className="btn primary next" onClick={onNext} aria-label="next">←</button>
    </>
  );
}

function PromptView(props: {
  prompt: Prompt; scene: Scene; state: SceneState; feedback: Feedback | null; replyType: ReplyType; mode: Mode;
  showEn: boolean; onToggleEn: () => void; typed: string; setTyped: (f: (s: string) => string) => void;
  placed: number[]; setPlaced: (f: (s: number[]) => number[]) => void; onMode: (t: ReplyType) => void; onSubmit: (a: Answer) => void; onContinue: () => void;
}) {
  const { prompt: p, state, feedback, replyType } = props;
  const isAction = !!p.action;
  const tiles = useMemo(() => shuffle(p.tiles, p.id.length * 31 + state.misses), [p.id]);
  const showOptions = isAction || replyType === 'tap' || state.showOptions || p.accepted.length === 0;

  if (feedback?.type === 'correct') {
    return (
      <>
        <div className="caption ok" dir="rtl">{feedback.target}</div>
        {feedback.note && <div className="soft">✓ {feedback.note}</div>}
        <button className="btn primary next" onClick={props.onContinue} aria-label="next">←</button>
      </>
    );
  }
  if (feedback?.type === 'modelled') {
    return (
      <>
        <div className="soft">They say it for you:</div>
        <div className="caption" dir="rtl">{feedback.ar}</div>
        <button className="btn primary next" onClick={props.onContinue} aria-label="next">←</button>
      </>
    );
  }
  return (
    <>
      {p.ask.ar && <div className="caption" dir="rtl" lang="ar" onClick={props.onToggleEn}>{p.ask.ar}</div>}
      {props.showEn || !p.ask.ar ? <div className="en-reveal">{p.ask.en}</div> : <div className="tap-hint">tap the Arabic for meaning</div>}
      {feedback?.type === 'recast' && <div className="recast" dir="rtl">{feedback.ar}</div>}
      {feedback?.type === 'didYouMean' && (
        <div className="recast">
          <span dir="rtl">هَلْ تَقْصِدُ: {feedback.target}؟</span>
          <button className="btn small" onClick={() => props.onSubmit({ kind: 'typed', text: feedback.target })}>نَعَمْ</button>
        </div>
      )}
      {!isAction && p.accepted.length > 0 && (
        <div className="modes" dir="rtl">
          {(['tap', 'tiles', 'typeHint', 'typeFree'] as ReplyType[]).map((t) => (
            <button key={t} className={`mode ${t === replyType ? 'on' : ''}`} onClick={() => props.onMode(t)}>
              {{ tap: 'مُسَافِرٌ', tiles: 'طَالِبٌ', typeHint: 'طَالِبٌ ✎', typeFree: 'مُقِيمٌ' }[t]}
            </button>
          ))}
        </div>
      )}
      {showOptions && (
        <div className="options" dir="rtl">
          {optionOrder(p).map((i) => { const o = p.options[i]; return (
            <button key={i} className="option" onClick={() => props.onSubmit(o.action ? { kind: 'action', action: o.action } : { kind: 'option', index: i })}>
              <span lang="ar">{o.ar}</span>
            </button>
          ); })}
        </div>
      )}
      {!showOptions && replyType === 'tiles' && (
        <>
          <div className="built" dir="rtl">{props.placed.map((i, k) => <button key={k} className="tile on" onClick={() => props.setPlaced((s) => s.filter((_, j) => j !== k))}>{tiles[i]}</button>)}</div>
          <div className="tiles" dir="rtl">{tiles.map((t, i) => (
            <button key={i} className="tile" disabled={props.placed.includes(i)} onClick={() => props.setPlaced((s) => [...s, i])}>{t}</button>
          ))}</div>
          <button className="btn primary" onClick={() => props.onSubmit({ kind: 'tiles', words: props.placed.map((i) => tiles[i]) })}>✓</button>
        </>
      )}
      {!showOptions && (replyType === 'typeHint' || replyType === 'typeFree') && (
        <>
          {replyType === 'typeHint' && <div className="soft" dir="rtl">{correctLine(p).split(' ').map((w) => w.replace(/[ً-ْٰ]/g, '')[0] + '…').join(' ')}</div>}
          <div className="typed" dir="rtl" lang="ar">{props.typed || ' '}<span className="caret" /></div>
          <Keyboard onKey={(k) => props.setTyped((s) => s + k)} onBack={() => props.setTyped((s) => [...s].slice(0, -1).join(''))} onSubmit={() => props.onSubmit({ kind: 'typed', text: props.typed })} />
        </>
      )}
    </>
  );
}

export { RUNG_NAMES };
