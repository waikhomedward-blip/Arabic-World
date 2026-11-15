// Audio policy: only speech | ambient | sfx | adhan | quran. Everything else mutes during the adhan.
export type AudioKind = 'speech' | 'ambient' | 'sfx' | 'adhan' | 'quran';
export const ALLOWED_AUDIO_KINDS: AudioKind[] = ['speech', 'ambient', 'sfx', 'adhan', 'quran'];

export interface Channel { kind: AudioKind; volume: number; muted: boolean }

export class AudioPolicy {
  channels: Record<AudioKind, Channel>;
  adhanActive = false;
  sanctuary = false;
  constructor() {
    this.channels = Object.fromEntries(ALLOWED_AUDIO_KINDS.map((k) => [k, { kind: k, volume: 1, muted: false }])) as Record<AudioKind, Channel>;
  }
  /** Adhan begins: every other channel mutes (Mirage lesson). */
  startAdhan() { this.adhanActive = true; this.apply(); }
  endAdhan() { this.adhanActive = false; this.apply(); }
  setSanctuary(on: boolean) { this.sanctuary = on; this.apply(); }
  canPlay(kind: AudioKind): boolean {
    if (!ALLOWED_AUDIO_KINDS.includes(kind)) return false;
    if (this.adhanActive) return kind === 'adhan';
    if (kind === 'quran') return this.sanctuary;
    if (kind === 'adhan') return false;
    return true;
  }
  private apply() {
    for (const k of ALLOWED_AUDIO_KINDS) this.channels[k].muted = !this.canPlay(k);
  }
}

/** Plain, non-melodic UI click: a very short filtered noise burst (no pitch, no tune). */
export function playClick(ctx: AudioContext, policy: AudioPolicy) {
  if (!policy.canPlay('sfx')) return;
  const len = Math.floor(ctx.sampleRate * 0.012);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) * 0.25;
  const src = ctx.createBufferSource();
  src.buffer = buf; src.connect(ctx.destination); src.start();
}
