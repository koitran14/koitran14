const { test } = require('node:test');
const assert = require('node:assert/strict');
const loadTs = require('./load-ts.cjs');
const { fitOrtho, walkAt, WALK, S } = loadTs('../lib/farm/layout.ts');

test('fitOrtho landscape uses the 16:9 frame height', () => {
  const r = fitOrtho(21 / 9);
  assert.equal(r.halfH, 15 * 9 / 16 / 2);
  assert.ok(Math.abs(r.halfW - r.halfH * 21 / 9) < 1e-9);
});

test('fitOrtho exactly 16:9 shows the frame', () => {
  const r = fitOrtho(16 / 9);
  assert.equal(r.halfW, 7.5);
  assert.ok(Math.abs(r.halfH - 7.5 * 9 / 16) < 1e-9);
});

test('fitOrtho portrait keeps full width', () => {
  const r = fitOrtho(9 / 16);
  assert.equal(r.halfW, 7.5);
  assert.ok(Math.abs(r.halfH - 7.5 * 16 / 9) < 1e-9);
});

test('walk loop is closed and starts at the barn door', () => {
  const a = walkAt(0).pos, b = walkAt(1 - 1e-9).pos;
  assert.ok(Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]) < 1e-6);
  assert.deepEqual(a.map(v => +v.toFixed(4)), [1.2, 0.6, 2.2]);
});

test('walk passes every waypoint and wraps t outside [0,1)', () => {
  for (const w of WALK) {
    let best = Infinity;
    for (let i = 0; i < 2000; i++) {
      const p = walkAt(i / 2000).pos;
      best = Math.min(best, Math.hypot(p[0] - w[0] * S, p[1] - w[1] * S, p[2] - w[2] * S));
    }
    assert.ok(best < 0.02, `waypoint ${w} missed by ${best}`);
  }
  assert.deepEqual(walkAt(1.25).pos, walkAt(0.25).pos);
  assert.deepEqual(walkAt(-0.75).pos, walkAt(0.25).pos);
});

test('heading points along the direction of travel', () => {
  const a = walkAt(0.01), b = walkAt(0.012);
  const dx = b.pos[0] - a.pos[0], dz = b.pos[2] - a.pos[2];
  assert.ok(Math.abs(a.heading - Math.atan2(dx, dz)) < 1e-6);
});
