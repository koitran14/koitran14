"""Check handbook quiz references, answer balance, and packaged chapter parity."""
import argparse
import collections
import json
import re
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def check(packages=False):
    positions = collections.Counter()
    total = 0
    hub = (ROOT / 'content/ai-product-handbook/index.html').read_text(encoding='utf-8')
    entries = json.loads(re.search(r'const CHS = (\[.*?\])\.map\(c =>', hub, re.S)[1])
    entries = {entry['n']: entry for entry in entries}
    for chapter in sorted((ROOT / 'content/ai-product-handbook').glob('[0-9][0-9].html')):
        source = chapter.read_text(encoding='utf-8')
        match = re.search(r'window.CH\s*=\s*(\{.*?\});', source, re.S)
        assert match, f'{chapter.name}: missing chapter data'
        data = json.loads(match[1])
        assert entries[chapter.stem]['s'] == [section['t'] for section in data['sections']], f'{chapter.name}: hub section titles differ'
        assert entries[chapter.stem]['q'] == len(data['quiz']), f'{chapter.name}: hub question count differs'
        assert set(data['alias']) <= set(data['terms']), f'{chapter.name}: alias without definition'
        assert all(term in data['terms'] for related in data.get('rel', {}).values() for term in related), f'{chapter.name}: missing related term'
        ids = [question['id'] for question in data['quiz']]
        assert len(ids) == len(set(ids)), f'{chapter.name}: duplicate question ids'
        for section in data['sections']:
            assert f'id="{section["id"]}"' in source, (chapter.name, section['id'])
            assert all(term in data['terms'] for term in section['terms']), (chapter.name, section['id'])
        for question in data['quiz']:
            label = f'{chapter.name}/{question["id"]}'
            assert re.fullmatch(r'my\d+-v\d+', question['id']), f'{label}: revision required to isolate saved answers'
            assert question['type'] in ('one', 'multi'), label
            assert len(question['o']) == len(set(question['o'])), f'{label}: repeated options'
            answers = question['a'] if question['type'] == 'multi' else [question['a']]
            assert answers and len(answers) == len(set(answers)), label
            assert all(isinstance(a, int) and 0 <= a < len(question['o']) for a in answers), label
            assert 0 <= question['s'] < len(data['sections']), label
            assert question.get('ex'), f'{label}: missing explanation'
            assert all(str(index) in {str(i) for i in range(len(question['o']))} for index in question.get('why', {})), label
            if question['type'] == 'one':
                positions[question['a']] += 1
            total += 1
        if packages:
            bundles = list((ROOT / 'public/learn/ai-product-handbook/skills').glob(f'aiph-{chapter.stem}-*.zip'))
            assert len(bundles) == 1, (chapter.name, bundles)
            name = bundles[0].stem
            for bundle in (bundles[0], bundles[0].parent / 'aiph-skills.zip'):
                with zipfile.ZipFile(bundle) as archive:
                    assert archive.read(f'{name}/chapter.html') == chapter.read_bytes(), (bundle.name, chapter.name)
                    skill = archive.read(f'{name}/SKILL.md').decode('utf-8')
                    assert 'content/ai-product-handbook' not in skill, bundle.name
                    original = (ROOT / '.claude/skills' / name / 'SKILL.md').read_text(encoding='utf-8')
                    expected = original.replace(f'`content/ai-product-handbook/{chapter.name}`', '`chapter.html` (cùng thư mục với SKILL.md này)')
                    assert skill == expected, f'{bundle.name}: learning instructions differ from source'
    assert total == 105, f'Unexpected quiz count: {total}'
    assert max(positions.values()) / sum(positions.values()) <= 0.4, f'Answer position bias: {dict(positions)}'
    print(f'OK: {total} questions; single-answer positions {dict(sorted(positions.items()))}; packages={packages}')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--packages', action='store_true')
    check(parser.parse_args().packages)
