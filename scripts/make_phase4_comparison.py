import os
import shutil
from PIL import Image, ImageDraw

ARTIFACT_DIR = r"C:\Users\user\.gemini\antigravity-ide\brain\0c8d32c5-6d9b-4c87-a97d-c8aeb621a77e"
FIDELITY_DIR = "docs/fidelity"
SLICED_DIR = "docs/design-reference/sliced"

COMPARISONS = [
  # Desktop
  ("DM-09", "DM-09 Focus Workspace", False),
  ("DM-10", "DM-10 Goals Dashboard", False),
  ("DM-11", "DM-11 Goal Details & Milestones", False),
  ("DM-12", "DM-12 Calendar & Time Blocking", False),
  ("DM-13", "DM-13 Planner & Schedule", False),
  ("DM-18", "DM-18 Reward Shop (Base)", False),
  ("DM-26", "DM-26 Reward Shop (Expanded)", False),
  ("DM-19", "DM-19 Analytics & Progress", False),
  ("DM-20", "DM-20 Weekly Review", False),
  ("DM-22", "DM-22 Search & Command Center", False),
  ("DM-27", "DM-27 Inventory & Collection", False),
  # Mobile
  ("MM-10", "MM-10 Focus Timer", True),
  ("MM-11", "MM-11 Goals Dashboard", True),
  ("MM-12", "MM-12 Goal Details & Milestones", True),
  ("MM-13", "MM-13 Calendar & Daily Planner", True),
  ("MM-19", "MM-19 Reward Shop & Inventory", True),
  ("MM-22", "MM-22 Analytics & Progress", True),
  ("MM-23", "MM-23 Weekly Review", True),
  ("MM-26", "MM-26 Search & Command Center", True),
]

def make_side_by_side(mockup_path, build_path, output_path, title, is_mobile):
    if not os.path.exists(mockup_path) or not os.path.exists(build_path):
        print(f"Skipping {title}: missing files {mockup_path} or {build_path}")
        return False
    
    mockup = Image.open(mockup_path).convert("RGB")
    build = Image.open(build_path).convert("RGB")
    
    target_h = 580 if is_mobile else 550
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
    
    tag = "MOBILE" if is_mobile else "NEXT.JS"
    draw.text((10, 15), f"CANONICAL SPEC: {title}", fill=(0, 210, 255))
    draw.text((mockup_w + 20, 15), f"BUILT IMPLEMENTATION ({tag} / SHARED DESIGN TOKENS)", fill=(16, 185, 129))
    
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
    for screen_id, title, is_mobile in COMPARISONS:
        mockup = os.path.join(SLICED_DIR, f"{screen_id}.png")
        build = os.path.join(FIDELITY_DIR, f"build_{screen_id}.png")
        out = os.path.join(FIDELITY_DIR, f"comparison_{screen_id}.png")
        if make_side_by_side(mockup, build, out, title, is_mobile):
            count += 1
            
    print(f"\nGenerated {count}/{len(COMPARISONS)} Phase 4 side-by-side comparisons successfully.")
