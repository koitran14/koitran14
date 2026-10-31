"""Pack .claude/skills/aiph-* into downloadable zips for the AI Product Handbook hub.

Each skill gets its chapter HTML bundled as chapter.html, so it works outside this repo.
Run from the repo root after editing a skill or a chapter: python scripts/pack_aiph_skills.py
"""
import json
import re
import zipfile
from pathlib import Path

SKILLS = Path(".claude/skills")
CHAPTERS = Path("content/ai-product-handbook")
OUT = Path("public/learn/ai-product-handbook/skills")
OUT.mkdir(parents=True, exist_ok=True)

skills = sorted(SKILLS.glob("aiph-*/SKILL.md"))
assert len(skills) == 22, f"expected 22 aiph skills, found {len(skills)}"

with zipfile.ZipFile(OUT / "aiph-skills.zip", "w", zipfile.ZIP_DEFLATED) as everything:
    for md in skills:
        name = md.parent.name
        src = f"content/ai-product-handbook/{name[5:7]}.html"
        text = md.read_text(encoding="utf-8")
        assert src in text, f"{name} does not cite {src}"
        text = text.replace(f"`{src}`", "`chapter.html` (cùng thư mục với SKILL.md này)")
        chapter = (CHAPTERS / Path(src).name).read_bytes()
        with zipfile.ZipFile(OUT / f"{name}.zip", "w", zipfile.ZIP_DEFLATED) as one:
            for z in (one, everything):
                z.writestr(f"{name}/SKILL.md", text)
                z.writestr(f"{name}/chapter.html", chapter)
        assert not re.search(r"content/ai-product-handbook", text), name

# the download counter only accepts these names (app/api/downloads reads this list)
names = ["aiph-skills.zip"] + [f"{md.parent.name}.zip" for md in skills]
Path("lib/aiph-skills.json").write_text(json.dumps(names, indent=1) + "\n", encoding="utf-8")

print(f"packed {len(skills)} skills into {OUT}")
