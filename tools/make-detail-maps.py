"""Turns CC0 Poly Haven photo scans into neutral, bright detail maps for limewash (real grain, our colour).
Run: research-private/.venv/bin/python tools/make-detail-maps.py"""
import numpy as np
from PIL import Image
SRC = 'research-private/downloads/polyhaven/'
def detail(name, out, mean=232, spread=1.0, size=512):
    a = np.asarray(Image.open(SRC + name).convert('L').resize((size, size), Image.LANCZOS)).astype(np.float32)
    # remove large-scale tint changes (keep grain + weathering), then lift to near-white
    from PIL import ImageFilter
    low = np.asarray(Image.fromarray(a.astype(np.uint8)).filter(ImageFilter.GaussianBlur(40))).astype(np.float32)
    hi = a - low
    res = np.clip(mean + hi * spread + (low - low.mean()) * 0.35, 0, 255).astype(np.uint8)
    Image.fromarray(res).save(out, quality=82)
    print(out, res.mean(), res.std())
detail('white_plaster_rough_01_1k.jpg', 'app/public/textures/limewash_detail.jpg', mean=236, spread=1.15)
detail('worn_plaster_wall_1k.jpg', 'app/public/textures/limewash_worn.jpg', mean=226, spread=0.9)
