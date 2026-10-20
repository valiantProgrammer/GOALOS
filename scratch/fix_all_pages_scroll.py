import os, re

app_dir = r'apps/web/src/app'

# Find all page.tsx files that have <SidebarNav
pages = []
for root, dirs, files in os.walk(app_dir):
    for f in files:
        if f == 'page.tsx':
            p = os.path.join(root, f)
            with open(p, 'r', encoding='utf-8') as file:
                content = file.read()
                if '<SidebarNav' in content:
                    pages.append(p)

print(f"Total pages with SidebarNav: {len(pages)}")

for p in pages:
    with open(p, 'r', encoding='utf-8') as f:
        code = f.read()

    orig = code

    # 1. Replace outer container flex min-h-screen or flex max-h-screen with flex h-screen overflow-hidden
    code = re.sub(
        r'<div className="flex (?:min-h-screen|max-h-screen|h-screen)([^"]*?)">',
        lambda m: f'<div className="flex h-screen overflow-hidden{m.group(1)}">',
        code
    )

    # 2. If SidebarNav doesn't have shrink-0, add shrink-0
    code = re.sub(
        r'<SidebarNav([^>]*?)className="([^"]*?)"',
        lambda m: f'<SidebarNav{m.group(1)}className="{m.group(2)} shrink-0"' if 'shrink-0' not in m.group(2) else m.group(0),
        code
    )
    code = re.sub(
        r'<SidebarNav((?:(?!className).)*?)/>',
        lambda m: f'<SidebarNav{m.group(1)}className="hidden md:flex shrink-0" />' if 'className' not in m.group(0) else m.group(0),
        code
    )

    # 3. Fix the right column container:
    # Look for: <div className="flex-1 flex flex-col min-w-0[^"]*">
    # Replace with: <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
    code = re.sub(
        r'<div className="flex-1 flex flex-col min-w-0[^"]*">',
        '<div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">',
        code
    )

    # 4. Fix TopBar: add shrink-0 if not present
    code = re.sub(
        r'<TopBar([^>]*?)className="([^"]*?)"',
        lambda m: f'<TopBar{m.group(1)}className="{m.group(2)} shrink-0"' if 'shrink-0' not in m.group(2) else m.group(0),
        code
    )
    code = re.sub(
        r'<TopBar((?:(?!className).)*?)/>',
        lambda m: f'<TopBar{m.group(1)}className="shrink-0" />' if 'className' not in m.group(0) else m.group(0),
        code
    )

    if code != orig:
        with open(p, 'w', encoding='utf-8') as f:
            f.write(code)
        print("Updated outer/column structure for:", os.path.relpath(p, app_dir))
