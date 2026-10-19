import os
import shutil
from PIL import Image, ImageDraw, ImageFont

ARTIFACT_DIR = r"C:\Users\user\.gemini\antigravity-ide\brain\0c8d32c5-6d9b-4c87-a97d-c8aeb621a77e"
FIDELITY_DIR = "docs/fidelity"
SLICED_DIR = "docs/design-reference/sliced"

COMPARISONS = [
    ("DM-01", "DM-01 Landing Page (Home)"),
    ("DM-02", "DM-02 Sign In / Sign Up"),
    ("DM-03", "DM-03 Onboarding / Hunter Setup"),
    ("DM-04", "DM-04 Main Dashboard"),
    ("DM-05", "DM-05 Quest Management"),
    ("DM-06", "DM-06 Quest Details & Editor"),
    ("DM-07", "DM-07 Habits & Routine Tracker"),
    ("DM-08", "DM-08 Routine Builder"),
    ("DM-14", "DM-14 Hunter Status & Attributes"),
    ("DM-16", "DM-16 Achievements & Titles"),
    ("DM-23", "DM-23 Notification Center"),
    ("DM-24", "DM-24 Settings & Preferences"),
    ("DM-25", "DM-25 Account, Privacy & Data"),
]

def make_side_by_side(mockup_path, build_path, output_path, title):
    if not os.path.exists(mockup_path):
        print(f"Skipping {title}: missing mockup {mockup_path}")
        return False
    if not os.path.exists(build_path):
        print(f"Skipping {title}: missing build {build_path}")
        return False
    
    mockup = Image.open(mockup_path).convert("RGB")
    build = Image.open(build_path).convert("RGB")
    
    target_h = 550
    mockup_w = int(mockup.width * (target_h / mockup.height))
    build_w = int(build.width * (target_h / build.height))
    
    m_resized = mockup.resize((mockup_w, target_h), Image.Resampling.LANCZOS)
    b_resized = build.resize((build_w, target_h), Image.Resampling.LANCZOS)
    
    total_w = mockup_w + build_w + 30
    total_h = target_h + 60
    
    canvas = Image.new("RGB", (total_w, total_h), (5, 8, 20))
    draw = ImageDraw.Draw(canvas)
    
    canvas.paste(m_resized, (10, 45))
    canvas.paste(b_resized, (mockup_w + 20, 45))
    
    draw.text((10, 15), f"CANONICAL SPEC: {title}", fill=(0, 210, 255))
    draw.text((mockup_w + 20, 15), "BUILT IMPLEMENTATION (NEXT.JS + SHARED DESIGN TOKENS)", fill=(16, 185, 129))
    
    canvas.save(output_path)
    print(f"Saved side-by-side: {output_path}")

    # Also copy to artifact directory for markdown embedding
    artifact_dest = os.path.join(ARTIFACT_DIR, os.path.basename(output_path))
    shutil.copy2(output_path, artifact_dest)
    print(f"Copied to artifact dir: {artifact_dest}")
    return True

if __name__ == "__main__":
    os.makedirs(FIDELITY_DIR, exist_ok=True)
    count = 0
    for page_id, title in COMPARISONS:
        mockup = os.path.join(SLICED_DIR, f"{page_id}.png")
        build = os.path.join(FIDELITY_DIR, f"build_{page_id}.png")
        out = os.path.join(FIDELITY_DIR, f"comparison_{page_id}.png")
        if make_side_by_side(mockup, build, out, title):
            count += 1
            
    print(f"\nGenerated {count}/{len(COMPARISONS)} Phase 1 side-by-side comparisons successfully.")
