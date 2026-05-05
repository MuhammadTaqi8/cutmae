from PIL import Image, ImageDraw
import os

os.makedirs('icons', exist_ok=True)

def make_icon(size):
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    r = int(size * 0.22)
    d.rounded_rectangle([0, 0, size-1, size-1], radius=r, fill=(17, 17, 24, 255))
    # Draw upload arrow — vertical line
    cx, cy = size // 2, size // 2
    lw = max(1, size // 16)
    shaft_top    = int(cy - size * 0.22)
    shaft_bottom = int(cy + size * 0.18)
    head_size    = int(size * 0.18)
    d.line([(cx, shaft_top), (cx, shaft_bottom)], fill='white', width=lw)
    d.polygon([
        (cx, shaft_top),
        (cx - head_size, shaft_top + head_size),
        (cx + head_size, shaft_top + head_size),
    ], fill='white')
    # Horizontal base line
    base_y = int(cy + size * 0.25)
    margin = int(size * 0.22)
    d.line([(margin, base_y), (size - margin, base_y)], fill='white', width=lw)
    img.save(f'icons/icon{size}.png')
    print(f'icons/icon{size}.png created')

for s in [16, 32, 48, 128]:
    make_icon(s)

print('All icons generated.')
