import os
import shutil
from PIL import Image, ImageDraw

ARTIFACT_DIR = r"C:\Users\user\.gemini\antigravity-ide\brain\0c8d32c5-6d9b-4c87-a97d-c8aeb621a77e"
FIDELITY_DIR = "docs/fidelity"
SLICED_DIR = "docs/design-reference/sliced"

MOBILE_COMPARISONS = [
  ("MM-01", "MM-01 Splash Screen"),
  ("MM-02", "MM-02 Onboarding Intro"),
  ("MM-03", "MM-03 Login / Sign Up"),
  ("MM-04", "MM-04 Hunter Awakening Setup"),
  ("MM-05", "MM-05 Dashboard (Home)"),
  ("MM-06", "MM-06 Quest Log"),
  ("MM-07", "MM-07 Quest Details"),
  ("MM-08", "MM-08 Habits & Routine Tracker"),
  ("MM-09", "MM-09 Routine Builder"),
  ("MM-14", "MM-14 Create / Edit Task"),
  ("MM-15", "MM-15 Hunter Status & Attributes"),
  ("MM-17", "MM-17 Achievements & Titles"),
  ("MM-21", "MM-21 Notification Center"),
  ("MM-24", "MM-24 Hunter Profile"),
  ("MM-27", "MM-27 Settings & Preferences"),
  ("MM-28", "MM-28 Account, Privacy & Data"),
]

def make_side_by_side(mockup_path, build_path, output_path, title):
    if not os.path.exists(mockup_path) or not os.path.exists(build_path):
        print(f"Skipping {title}: missing files")
        return False
    
    mockup = Image.open(mockup_path).convert("RGB")
    build = Image.open(build_path).convert("RGB")
    
    target_h = 580
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
    draw.text((mockup_w + 20, 15), "BUILT MOBILE IMPLEMENTATION (EXPO / NATIVE HUD)", fill=(16, 185, 129))
    
    canvas.save(output_path)
    print(f"Saved side-by-side: {output_path}")

    # Copy to artifact directory for embedding
    artifact_dest = os.path.join(ARTIFACT_DIR, os.path.basename(output_path))
    shutil.copy2(output_path, artifact_dest)
    print(f"Copied to artifact dir: {artifact_dest}")
    return True

if __name__ == "__main__":
    os.makedirs(FIDELITY_DIR, exist_ok=True)
    count = 0
    for screen_id, title in MOBILE_COMPARISONS:
        mockup = os.path.join(SLICED_DIR, f"{screen_id}.png")
        build = os.path.join(FIDELITY_DIR, f"mobile_build_{screen_id}.png")
        out = os.path.join(FIDELITY_DIR, f"comparison_{screen_id}.png")
        if make_side_by_side(mockup, build, out, title):
            count += 1
            
    print(f"\nGenerated {count}/{len(MOBILE_COMPARISONS)} Phase 3 mobile side-by-side comparisons successfully.")
