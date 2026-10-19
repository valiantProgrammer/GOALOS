import os
import shutil
from PIL import Image, ImageDraw

ARTIFACT_DIR = r"C:\Users\user\.gemini\antigravity-ide\brain\0c8d32c5-6d9b-4c87-a97d-c8aeb621a77e"
FIDELITY_DIR = "docs/fidelity"
SLICED_DIR = "docs/design-reference/sliced"

COMPARISONS = [
  # Desktop
  ("DM-15", "DM-15 Skill Tree", False, "DM-15.png", "build_DM-15.png"),
  ("DM-17", "DM-17 Dungeons & Challenges", False, "DM-17.png", "build_DM-17.png"),
  ("derived_assistant", "AI Assistant (Desktop Derived)", False, "MM-20.png", "build_derived_assistant.png"),
  # Mobile
  ("MM-16", "MM-16 Skill Tree", True, "MM-16.png", "build_MM-16.png"),
  ("MM-18", "MM-18 Story Mode & Boss Battles", True, "MM-18.png", "build_MM-18.png"),
  ("MM-20", "MM-20 AI System Assistant", True, "MM-20.png", "build_MM-20.png"),
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
    
    canvas.save(output_path, "PNG")
    print(f"Saved comparison: {output_path}")
    return True

def main():
    for item_id, title, is_mobile, mockup_name, build_name in COMPARISONS:
        mockup_p = os.path.join(SLICED_DIR, mockup_name)
        build_p = os.path.join(FIDELITY_DIR, build_name)
        out_name = f"comparison_{item_id}.png"
        out_p = os.path.join(FIDELITY_DIR, out_name)
        
        ok = make_side_by_side(mockup_p, build_p, out_p, title, is_mobile)
        if ok and os.path.exists(ARTIFACT_DIR):
            art_dest = os.path.join(ARTIFACT_DIR, out_name)
            shutil.copy2(out_p, art_dest)
            print(f"  -> Copied to artifact directory: {art_dest}")

if __name__ == "__main__":
    main()
