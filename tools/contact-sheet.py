"""Contact sheet of images with numbered labels (for reviewing reference photos and game screenshots)."""
import sys, os
from PIL import Image, ImageDraw
def sheet(paths, out, cols=6, w=300):
    ims = []
    for p in paths:
        im = Image.open(p).convert('RGB'); im.thumbnail((w, w)); ims.append((os.path.basename(p), im))
    rows = (len(ims) + cols - 1) // cols
    S = Image.new('RGB', (cols * w, rows * (w + 18)), (30, 30, 30)); d = ImageDraw.Draw(S)
    for i, (n, im) in enumerate(ims):
        x, y = (i % cols) * w, (i // cols) * (w + 18)
        S.paste(im, (x + (w - im.width) // 2, y + 18 + (w - im.height) // 2)); d.text((x + 4, y + 3), n, fill=(255, 220, 120))
    S.save(out, quality=82)
if __name__ == '__main__':
    out = sys.argv[1]; sheet(sys.argv[2:], out)
