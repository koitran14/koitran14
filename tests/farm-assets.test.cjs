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

// The cozy-realistic islands (3d-farming-asset, export_unity.py web mode): baked textures + Draco geometry.
const ISLAND_BUDGET = 3 * 1024 * 1024;

test('island models exist for every season and stay within the download budget', () => {
  for (const s of SEASONS) {
    const size = fs.statSync(path.join(MODELS, `island-${s}.glb`)).size;
    assert.ok(size < ISLAND_BUDGET, `${s} is ${size} bytes`);
  }
});

test('island keeps the window and lantern materials the night lighting looks up', () => {
  for (const s of SEASONS) {
    const mats = glbJson(`island-${s}.glb`).materials.map((m) => m.name);
    assert.ok(mats.includes('window#emit') && mats.includes('lantern#emit'), s);
  }
});

test('island grass carries per-vertex wind weights', () => {
  for (const s of SEASONS) {
    const j = glbJson(`island-${s}.glb`);
    const grass = j.nodes.filter((n) => n.name.startsWith('grass') && n.mesh !== undefined);
    assert.ok(grass.length > 0, `${s} has no grass node`);
    assert.ok(grass.every((n) => j.meshes[n.mesh].primitives.every((p) => p.attributes.COLOR_0 !== undefined)), s);
  }
});

test('island carries animation drivers for the swaying trees, clouds and weathervane', () => {
  for (const s of SEASONS) {
    const driven = glbJson(`island-${s}.glb`).nodes.filter((n) => n.extras && Object.keys(n.extras).some((k) => k.startsWith('drv:')));
    assert.ok(driven.length >= 3, `${s} has ${driven.length} driven nodes`);
  }
});

test('chicken model has a body node to peck with', () => {
  const j = glbJson('chicken.glb');
  assert.ok(j.meshes.length > 0);
  assert.ok(j.nodes.some((n) => n.name.startsWith('hen-body')));
});

test('every shop unlock has a model for every season, under 1.5 MB each', () => {
  for (const id of ['flowerfence', 'beehive', 'windmill', 'cow', 'greenhouse', 'terraces', 'lotus'])
    for (const s of SEASONS) {
      const size = fs.statSync(path.join(MODELS, `unlock-${id}-${s}.glb`)).size;
      assert.ok(size < 1.5 * 1024 * 1024, `${id} ${s} is ${size} bytes`);
    }
});

test('every season has the Blender stream render, its world-to-image map, and the stream parts it paints', () => {
  for (const s of SEASONS) {
    assert.ok(fs.statSync(path.join(MODELS, `stream-${s}.jpg`)).size < 1024 * 1024, `${s} stream image over 1 MB`);
    const map = JSON.parse(fs.readFileSync(path.join(MODELS, `stream-${s}.json`), 'utf8'));
    assert.equal(map.u.length, 4); assert.equal(map.v.length, 4);
    const names = glbJson(`island-${s}.glb`).nodes.map((n) => n.name);
    for (const n of ['bank0', 'bank1', 'water-surface0', 'water-surface1', 'fall-front', 'fall-upper']) assert.ok(names.includes(n), `${s} has no ${n}`);
  }
});
