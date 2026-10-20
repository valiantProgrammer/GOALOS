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

    orig = code

    # If <main className="flex-1 ... doesn't have overflow-y-auto or overflow-auto
    def repl_main(m):
        cls = m.group(1)
        if 'overflow' not in cls:
            return f'<main className="flex-1 overflow-y-auto {cls}">'
        return m.group(0)

    code = re.sub(r'<main className="flex-1 (?:overflow-y-auto )?([^"]*?)">', repl_main, code)

    if code != orig:
        with open(p, 'w', encoding='utf-8') as f:
            f.write(code)
        print("Added overflow-y-auto to main in:", os.path.relpath(p, app_dir))
