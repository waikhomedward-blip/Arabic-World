"""Visual judge: how far are the game's frames from real photos of Historic Jeddah?

Run with the private venv:  research-private/.venv/bin/python tools/visual-judge.py REV-NNN [notes]
- Reference set: research-private/references/golden/street/*.jpg (CC/PD Wikimedia Commons photos, private, never shipped).
- Game frames:   lab/results/e2e/iphone-webkit/*-1-intro.png (HUD strip and bottom pill cropped away).
Measures per image (on a 320 px wide copy): brightness percentiles, contrast, saturation, warmth, share of
near-white and deep-shadow pixels, sky share, fine-detail (edge) density, colour variety.
Score = mean |z| of the game's median stats against the reference distribution (lower = closer to reality).
Writes docs/visual-revisions/REV-NNN.md + .jpg (side-by-side sheet) and appends to docs/visual-revisions/scores.json.
"""
import sys, os, json, glob
import numpy as np
from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REF = os.path.join(ROOT, 'research-private/references/golden/street')
GAME = os.path.join(ROOT, 'lab/results/e2e/iphone-webkit')
OUT = os.path.join(ROOT, 'docs/visual-revisions')

def load(path, crop_game=False):
    im = Image.open(path).convert('RGB')
    if crop_game:  # drop the HUD row (top 9%) and the bottom pill/panel (bottom 14%)
        w, h = im.size; im = im.crop((0, int(h * 0.09), w, int(h * 0.86)))
    im.thumbnail((320, 320 * 4))
    return im

def stats(im):
    a = np.asarray(im).astype(np.float32) / 255.0
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    L = 0.2126 * r + 0.7152 * g + 0.0722 * b
    mx, mn = a.max(-1), a.min(-1)
    sat = np.where(mx > 1e-4, (mx - mn) / np.maximum(mx, 1e-4), 0)
    sky = ((b > r + 0.06) & (b > g) & (L > 0.45)).mean()
    gx = np.abs(np.diff(L, axis=1))[:-1, :]; gy = np.abs(np.diff(L, axis=0))[:, :-1]
    edges = ((gx + gy) > 0.08).mean()
    q = (a * 7).astype(int); hues = len(np.unique(q[..., 0] * 64 + q[..., 1] * 8 + q[..., 2])) / 512
    return {
        'L_p05': float(np.percentile(L, 5)), 'L_p50': float(np.percentile(L, 50)), 'L_p95': float(np.percentile(L, 95)),
        'contrast': float(L.std()), 'saturation': float(sat.mean()), 'warmth': float((r - b).mean()),
        'white_share': float((L > 0.85).mean()), 'shadow_share': float((L < 0.18).mean()),
        'sky_share': float(sky), 'detail': float(edges), 'variety': float(hues),
    }

def main():
    rev = sys.argv[1] if len(sys.argv) > 1 else 'REV-000'; notes = ' '.join(sys.argv[2:])
    refs = sorted(glob.glob(os.path.join(REF, '*.jpg')))
    games = sorted(glob.glob(os.path.join(GAME, '*-1-intro.png')))
    R = [stats(load(p)) for p in refs]; G = [stats(load(p, True)) for p in games]
    keys = list(R[0].keys())
    rm = {k: float(np.median([x[k] for x in R])) for k in keys}
    rs = {k: float(np.std([x[k] for x in R]) + 1e-3) for k in keys}
    gm = {k: float(np.median([x[k] for x in G])) for k in keys}
    z = {k: (gm[k] - rm[k]) / rs[k] for k in keys}
    score = float(np.mean([abs(v) for v in z.values()]))
    os.makedirs(OUT, exist_ok=True)
    # side-by-side sheet: 4 game frames (top) over 4 reference photos (bottom)
    pick_g = games[:: max(1, len(games) // 4)][:4]; pick_r = refs[:: max(1, len(refs) // 4)][:4]
    tiles = [load(p, True) for p in pick_g] + [load(p) for p in pick_r]
    W, H = 260, 360; S = Image.new('RGB', (W * 4, H * 2 + 24), (25, 25, 25)); d = ImageDraw.Draw(S)
    for i, t in enumerate(tiles):
        t = t.copy(); t.thumbnail((W, H)); x, y = (i % 4) * W, 24 + (i // 4) * H
        S.paste(t, (x + (W - t.width) // 2, y + (H - t.height) // 2))
    d.text((6, 6), f'{rev}  score {score:.2f} (lower = closer to real)  top: game  bottom: real Historic Jeddah (CC/PD, private)', fill=(255, 220, 120))
    S.save(os.path.join(OUT, f'{rev}.jpg'), quality=80)
    worst = sorted(z.items(), key=lambda kv: -abs(kv[1]))
    lines = [f'# {rev}', '', f'**Score {score:.2f}** (mean |z| from the real-photo distribution; lower is closer to reality). {notes}', '',
             '| Measure | Game | Real (median) | z |', '|---|---|---|---|']
    lines += [f'| {k} | {gm[k]:.3f} | {rm[k]:.3f} | {z[k]:+.2f} |' for k, _ in worst]
    lines += ['', f'Frames: {len(G)} game intros vs {len(R)} reference photos. Sheet: `{rev}.jpg`.']
    open(os.path.join(OUT, f'{rev}.md'), 'w').write('\n'.join(lines) + '\n')
    sp = os.path.join(OUT, 'scores.json'); hist = json.load(open(sp)) if os.path.exists(sp) else []
    hist = [h for h in hist if h['rev'] != rev] + [{'rev': rev, 'score': round(score, 3), 'notes': notes, 'z': {k: round(v, 2) for k, v in z.items()}}]
    json.dump(hist, open(sp, 'w'), indent=1)
    print(f'{rev} score {score:.3f}'); [print(f'  {k:13s} game {gm[k]:.3f}  real {rm[k]:.3f}  z {z[k]:+.2f}') for k, _ in worst]

if __name__ == '__main__':
    main()
