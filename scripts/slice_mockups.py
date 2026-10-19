"""
Script to slice canonical mockup composite sheets into individual page images
for automated side-by-side fidelity comparison.
"""
import os
from PIL import Image

OUT_DIR = os.path.join('docs', 'design-reference', 'sliced')
os.makedirs(OUT_DIR, exist_ok=True)

def slice_3x3_desktop(filename, names):
    img = Image.open(os.path.join('docs', 'design-reference', filename))
    # Columns:
    # Col 1: 10..502, Col 2: 526..1018, Col 3: 1042..1534
    cols = [(10, 502), (526, 1018), (1042, 1534)]
    # Rows:
    # Row 1: 11..319, Row 2: 368..676, Row 3: 723..994
    rows = [(11, 319), (368, 676), (723, 994)]
    
    idx = 0
    for r_idx, (y1, y2) in enumerate(rows):
        for c_idx, (x1, x2) in enumerate(cols):
            name = names[idx]
            crop = img.crop((x1, y1, x2, y2))
            crop.save(os.path.join(OUT_DIR, f"{name}.png"))
            print(f"Saved {name}.png ({crop.size})")
            idx += 1

def slice_desktop_04():
    img = Image.open(os.path.join('docs', 'design-reference', 'desktop-page-04.png'))
    # DM-28 Admin Dashboard is top full width: x ~ 40..1490, y ~ 10..550
    # Let's crop DM-28, DM-29, DM-30
    # DM-28 (Top full)
    dm28 = img.crop((40, 10, 1495, 550))
    dm28.save(os.path.join(OUT_DIR, "DM-28.png"))
    print(f"Saved DM-28.png ({dm28.size})")
    
    # DM-29 (Bottom Left): x ~ 10..760, y ~ 575..994
    dm29 = img.crop((10, 575, 760, 994))
    dm29.save(os.path.join(OUT_DIR, "DM-29.png"))
    print(f"Saved DM-29.png ({dm29.size})")
    
    # DM-30 (Bottom Right): x ~ 775..1525, y ~ 575..994
    dm30 = img.crop((775, 575, 1525, 994))
    dm30.save(os.path.join(OUT_DIR, "DM-30.png"))
    print(f"Saved DM-30.png ({dm30.size})")

def slice_phone_sheet(filename, names):
    img = Image.open(os.path.join('docs', 'design-reference', filename))
    # 2 rows of 7 screens
    # Row 1: y ~ 15..485
    # Row 2: y ~ 530..995
    rows = [(15, 485), (530, 995)]
    # 7 cols across 1536 px:
    # ~210 px width per screen with spacing
    # Let's find exact columns or evenly space them
    # Total width 1536, 7 screens: 1536/7 = 219.4
    col_width = 205
    col_gap = 14
    cols = []
    start_x = 12
    for i in range(7):
        x1 = start_x + i * (col_width + col_gap)
        x2 = x1 + col_width
        cols.append((x1, x2))
    
    idx = 0
    for r_idx, (y1, y2) in enumerate(rows):
        for c_idx, (x1, x2) in enumerate(cols):
            name = names[idx]
            crop = img.crop((x1, y1, x2, y2))
            crop.save(os.path.join(OUT_DIR, f"{name}.png"))
            print(f"Saved {name}.png ({crop.size})")
            idx += 1

if __name__ == '__main__':
    print("Slicing Desktop Sheets...")
    slice_3x3_desktop('desktop-page-01.png', [f"DM-{i:02d}" for i in range(1, 10)])
    slice_3x3_desktop('desktop-page-02.png', [f"DM-{i:02d}" for i in range(10, 19)])
    slice_3x3_desktop('desktop-page-03.png', [f"DM-{i:02d}" for i in range(19, 28)])
    slice_desktop_04()
    
    print("Slicing Phone Sheets...")
    slice_phone_sheet('phone-page-01.png', [f"MM-{i:02d}" for i in range(1, 15)])
    slice_phone_sheet('phone-page-02.png', [f"MM-{i:02d}" for i in range(15, 29)])
    print("All mockups successfully sliced!")
