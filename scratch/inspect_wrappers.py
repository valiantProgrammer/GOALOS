import os, re

app_dir = r'apps/web/src/app'

for root, dirs, files in os.walk(app_dir):
    for f in files:
        if f.endswith('.tsx'):
            p = os.path.join(root, f)
            with open(p, 'r', encoding='utf-8') as file:
                content = file.read()
                if '<SidebarNav' in content and 'AppShell' not in content:
                    m = re.search(r'return \(\s*<div className="([^"]+)"', content)
                    rel = os.path.relpath(p, app_dir)
                    if m:
                        print(f"{rel}: {m.group(1)}")
                    else:
                        print(f"{rel}: NO MATCH")
