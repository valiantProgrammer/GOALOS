import os, re

app_dir = r'apps/web/src/app'

pages = []
for root, dirs, files in os.walk(app_dir):
    for f in files:
        if f == 'page.tsx':
            p = os.path.join(root, f)
            with open(p, 'r', encoding='utf-8') as file:
                content = file.read()
                if '<SidebarNav' in content:
                    pages.append(p)

for p in pages:
    with open(p, 'r', encoding='utf-8') as f:
        code = f.read()

    rel = os.path.relpath(p, app_dir)
    # Find what is immediately following <TopBar ... />
    m = re.search(r'<TopBar[^>]*/>\s*(<[^>]+>)', code)
    if m:
        tag = m.group(1)
        has_scroll = 'overflow-y-auto' in tag or 'overflow-auto' in tag
        print(f"{rel}: {tag[:80]} | scrollable: {has_scroll}")
    else:
        print(f"{rel}: Could not match after TopBar")
