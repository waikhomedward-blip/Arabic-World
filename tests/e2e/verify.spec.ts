// Plays every scene through the real UI, checks characters are visible, saves screenshots, samples frame times.
import { test, expect, type Page } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { loadContentFromDisk } from '../../app/src/core/loadDisk';
import type { Scene } from '../../app/src/core/content';
import AxeBuilder from '@axe-core/playwright';

const content = loadContentFromDisk(process.cwd());
const OUT = join(process.cwd(), 'lab/results/e2e');

type Vis = Record<string, { visible: boolean; blockedBy: string | null; screen: { x: number; y: number }; inFrame: boolean }>;

function progressFor(scene: Scene) {
  const before = content.scenes.slice(0, content.scenes.indexOf(scene)).map((s) => s.id);
  return { version: 1, createdAt: Date.now(), daysInCity: 1, lastPlayedDay: null, inGameDay: scene.day, completedScenes: before, words: {}, mode: 'auto', recentReplyTypes: [], friendship: {}, journal: [], firstSeenDay: {}, morningDoneDay: scene.day, settings: { showEnglishOnTap: true, reducedMotion: false, voiceInput: false } };
}

async function probe(page: Page): Promise<Vis> { return page.evaluate(() => (window as any).__awProbe.visibility()); }
async function panelTop(page: Page, sel: string) { const b = await page.locator(sel).first().boundingBox(); return b ? b.y : Infinity; }

function checkVis(vis: Vis, ids: string[], top: number, label: string, problems: string[]) {
  for (const id of ids) {
    const v = vis[id];
    if (!v) { problems.push(`${label}: ${id} not in scene`); continue; }
    if (!v.inFrame) problems.push(`${label}: ${id} out of frame`);
    if (!v.visible) problems.push(`${label}: ${id} blocked by ${v.blockedBy}`);
    if (v.screen.y > top - 8) problems.push(`${label}: ${id}'s head is under the UI panel (y=${Math.round(v.screen.y)} ≥ ${Math.round(top)})`);
  }
}

/** Tap targets and text size of everything visible (WCAG 2.2: 24px minimum target; our goal 44px; text >= 11px). */
async function uiAudit(page: Page, label: string) {
  return page.evaluate((label) => {
    const small: string[] = []; const tiny: string[] = []; const tinyText: string[] = []; const offscreen: string[] = [];
    for (const el of Array.from(document.querySelectorAll('button'))) {
      const r = el.getBoundingClientRect(); if (!r.width || !r.height) continue;
      const m = Math.min(r.width, r.height); const name = (el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 20);
      if (r.left < -0.5 || r.right > window.innerWidth + 0.5 || r.top < -0.5 || r.bottom > window.innerHeight + 0.5) offscreen.push(`${label}:${name}`);
      if (m < 24) tiny.push(`${label}:${name}(${Math.round(m)}px)`); else if (m < 44) small.push(`${label}:${name}(${Math.round(m)}px)`);
    }
    for (const el of Array.from(document.querySelectorAll('body *'))) {
      if (!(el as HTMLElement).innerText || el.children.length) continue;
      const fs = parseFloat(getComputedStyle(el).fontSize); const r = el.getBoundingClientRect();
      if (r.width && fs < 11) tinyText.push(`${label}:${(el as HTMLElement).innerText.slice(0, 20)}(${fs}px)`);
    }
    return { small, tiny, tinyText, offscreen };
  }, label);
}
async function axe(page: Page, label: string) {
  const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).exclude('canvas').analyze();
  return r.violations.map((v) => `${label}:${v.id}(${v.nodes.length})`);
}

async function settle(page: Page, ms = 2600) { await page.waitForTimeout(ms); }

for (const scene of content.scenes) {
  test(`scene ${scene.id}`, async ({ page, browserName }, info) => {
    const problems: string[] = []; const errors: string[] = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', (e) => errors.push(String(e)));
    const dir = join(OUT, info.project.name); mkdirSync(dir, { recursive: true });

    await page.addInitScript((p) => { localStorage.setItem('arabic-world-progress', JSON.stringify(p)); }, progressFor(scene));
    const t0 = Date.now();
    await page.goto('/?lab=1');
    await page.locator('canvas').waitFor();
    const loadMs = Date.now() - t0;
    await page.getByText('Tap to begin').click();
    await page.waitForFunction(() => !!(window as any).__awProbe);
    await settle(page);

    // 1. intro: the friend to tap must be visible and above the hint pill
    checkVis(await probe(page), scene.cast, await panelTop(page, '.hint'), 'intro', problems);
    await page.screenshot({ path: join(dir, `${scene.id}-1-intro.png`) });

    // frame sampling; Chromium is also sampled under 4× CPU throttling as a mid-range phone proxy
    const sample = () => page.evaluate(async () => { const a: number[] = []; const end = performance.now() + 3000; await new Promise<void>((r) => { const f = (t: number) => { a.push(t); t < end ? requestAnimationFrame(f) : r(); }; requestAnimationFrame(f); }); return a; });
    const summarise = (frames: number[]) => { const g = frames.slice(1).map((t, i) => t - frames[i]).sort((a, b) => a - b); return { fps: g.length ? Math.round(1000 / g[Math.floor(g.length / 2)]) : 0, p95: g.length ? Math.round(g[Math.floor(g.length * 0.95)]) : 999 }; };
    const normal = summarise(await sample());
    let throttled: { fps: number; p95: number } | null = null;
    if (browserName === 'chromium') {
      const cdp = await page.context().newCDPSession(page);
      await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 }); throttled = summarise(await sample()); await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });
    }
    const renderer = await page.evaluate(() => { const gl = document.querySelector('canvas')!.getContext('webgl2') as WebGL2RenderingContext | null; const ext = gl?.getExtension('WEBGL_debug_renderer_info'); return ext && gl ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : 'unknown'; });
    const fps = normal.fps; const p95 = normal.p95;
    const stats = await page.evaluate(() => (window as any).__awProbe.stats());

    // 2. open the scene; first line: speaker visible above the dialogue panel
    await page.locator('.hint').click();
    await page.locator('.dialogue').waitFor();
    await settle(page, 1200);
    checkVis(await probe(page), scene.cast, await panelTop(page, '.dialogue'), 'dialogue', problems);
    await page.screenshot({ path: join(dir, `${scene.id}-2-dialogue.png`) });
    const a11y: string[] = await axe(page, 'dialogue');
    const audits = [await uiAudit(page, 'dialogue')];

    // 3. play through with correct answers
    let shotPrompt = false;
    for (const [i, st] of scene.steps.entries()) {
      if (st.type === 'line') { await page.getByRole('button', { name: 'next' }).click(); continue; }
      const correct = st.options.find((o) => o.correct)!;
      let opt = page.locator('.option', { hasText: correct.ar });
      if (!(await opt.first().isVisible())) { await page.locator('.mode', { hasText: 'مُسَافِرٌ' }).click(); opt = page.locator('.option', { hasText: correct.ar }); }
      if (!shotPrompt) {
        await page.screenshot({ path: join(dir, `${scene.id}-3-prompt.png`) }); shotPrompt = true;
        a11y.push(...(await axe(page, 'prompt'))); audits.push(await uiAudit(page, 'prompt'));
        // the in-game Arabic keyboard (Muqīm) on this screen size
        if (st.accepted.length) {
          await page.locator('.mode', { hasText: 'مُقِيمٌ' }).click();
          await page.screenshot({ path: join(dir, `${scene.id}-4-keyboard.png`) });
          audits.push(await uiAudit(page, 'keyboard'));
          await page.locator('.mode', { hasText: 'مُسَافِرٌ' }).click();
          opt = page.locator('.option', { hasText: correct.ar });
        }
      }
      await opt.first().click();
      const caption = page.locator('.caption.ok');
      if (!(await caption.isVisible())) problems.push(`step ${i}: correct option was not accepted`);
      await page.getByRole('button', { name: 'next' }).click();
    }
    // 4. scene must close cleanly: dialogue gone
    await expect(page.locator('.dialogue')).toHaveCount(0, { timeout: 5000 }).catch(() => problems.push('scene did not close'));

    const tap = { tiny: audits.flatMap((a) => a.tiny), small: audits.flatMap((a) => a.small), tinyText: audits.flatMap((a) => a.tinyText), offscreen: audits.flatMap((a) => a.offscreen) };
    for (const o of tap.offscreen) problems.push(`off screen: ${o}`);
    const result = { scene: scene.id, project: info.project.name, renderer, loadMs, fps, p95FrameMs: p95, throttled, stats, a11y, tap, problems, errors };
    writeFileSync(join(dir, `${scene.id}.json`), JSON.stringify(result, null, 1));
    expect(errors, 'console errors').toEqual([]);
    expect(problems, 'visibility / flow problems').toEqual([]);
  });
}
