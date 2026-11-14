const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const MODELS = path.resolve(__dirname, '../public/models/farm');
const SEASONS = ['xuan', 'ha', 'thu', 'dong'];

// A .glb starts with a 12-byte header, then the JSON chunk: uint32 length at 12, type at 16, data from 20.
function glbJson(file) {
  const b = fs.readFileSync(path.join(MODELS, file));
  return JSON.parse(b.subarray(20, 20 + b.readUInt32LE(12)).toString('utf8'));
}

test('character models expose jointed parts under khoi', () => {
  for (const s of SEASONS) {
    const j = glbJson(`khoi-${s}.glb`);
    const root = j.nodes.find((n) => n.name === 'khoi');
    assert.ok(root, `${s} has no khoi root`);
    const kids = root.children.map((i) => j.nodes[i].name).sort();
    assert.deepEqual(kids, ['armL', 'armR', 'body', 'head', 'legL', 'legR'], s);
  }
});

test('island models exist for every season and stay under 2 MB', () => {
  for (const s of SEASONS) {
    const size = fs.statSync(path.join(MODELS, `island-${s}.glb`)).size;
    assert.ok(size < 2 * 1024 * 1024, `${s} is ${size} bytes`);
  }
});

test('island keeps window and lamp materials for night lighting', () => {
  for (const s of SEASONS) {
    const mats = glbJson(`island-${s}.glb`).materials.map((m) => m.name);
    assert.ok(mats.includes('#FFE9A8') && mats.includes('#FFF1C2'), s);
  }
});

test('chicken model exists', () => {
  assert.ok(glbJson('chicken.glb').meshes.length > 0);
});
