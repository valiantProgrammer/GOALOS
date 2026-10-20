import os, re

app_dir = r'apps/web/src/app'
pages = [
    'account/page.tsx',
    'admin/system/page.tsx',
    'admin/users/page.tsx',
    'community/page.tsx',
    'dungeons/page.tsx',
    'skills/page.tsx'
]

for rel in pages:
    p = os.path.join(app_dir, rel)
    with open(p, 'r', encoding='utf-8') as f:
        code = f.read()
    # find TopBar
    idx = code.find('<TopBar')
    print(f"=== {rel} ===")
    if idx != -1:
        print(code[idx:idx+250])
    else:
        print("No TopBar found!")
