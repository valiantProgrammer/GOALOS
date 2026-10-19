import os
from PIL import Image, ImageDraw

ASSETS_DIR = "apps/desktop/assets"
os.makedirs(ASSETS_DIR, exist_ok=True)

# 1. Main App Icon (256x256)
img = Image.new("RGBA", (256, 256), (5, 8, 20, 255))
draw = ImageDraw.Draw(img)

# Outer glow / border
draw.rounded_rectangle([16, 16, 240, 240], radius=40, outline=(59, 108, 246, 255), width=4)
draw.rounded_rectangle([20, 20, 236, 236], radius=36, outline=(0, 210, 255, 180), width=2)

# Central sci-fi Hunter Emblem (Stylized 'G' / Diamond polygon)
points = [(128, 60), (196, 128), (128, 196), (60, 128)]
draw.polygon(points, outline=(0, 210, 255, 255), fill=(10, 18, 36, 230))
inner_points = [(128, 85), (171, 128), (128, 171), (85, 128)]
draw.polygon(inner_points, outline=(59, 108, 246, 255), fill=(5, 8, 20, 255))

# Core neon eye
draw.ellipse([118, 118, 138, 138], fill=(0, 210, 255, 255))

icon_path = os.path.join(ASSETS_DIR, "icon.png")
img.save(icon_path)
print(f"Generated app icon: {icon_path}")

# 2. Tray Icon (32x32)
tray_img = img.resize((32, 32), Image.Resampling.LANCZOS)
tray_path = os.path.join(ASSETS_DIR, "tray.png")
tray_img.save(tray_path)
print(f"Generated tray icon: {tray_path}")

# Also generate web favicon/icon in apps/web/public/
web_icon = img.resize((192, 192), Image.Resampling.LANCZOS)
web_icon.save("apps/web/public/icon-192.png")
web_icon_512 = img.resize((512, 512), Image.Resampling.LANCZOS)
web_icon_512.save("apps/web/public/icon-512.png")
print("Generated web PWA icons")
