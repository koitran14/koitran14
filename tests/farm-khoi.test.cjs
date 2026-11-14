const { test } = require('node:test');
const assert = require('node:assert/strict');
const loadTs = require('./load-ts.cjs');
const { khoiAt, WALK_SECONDS, CHORE_SECONDS } = loadTs('../lib/farm/khoi.ts', { './layout': loadTs('../lib/farm/layout.ts') });
const { waypointT, WALK } = loadTs('../lib/farm/layout.ts');

const gate = WALK.findIndex(([x, y, z]) => x === 77 && y === 0 && z === 104);

test('starts walking at the barn door', () => {
  assert.deepEqual(khoiAt(0), { mode: 'walk', t: 0 });
});

test('pauses for a chore at the field gate on the way out', () => {
  const arrive = waypointT(gate) * WALK_SECONDS;
  assert.deepEqual(khoiAt(arrive + CHORE_SECONDS / 2), { mode: 'chore', t: waypointT(gate) });
  assert.equal(khoiAt(arrive - 0.1).mode, 'walk');
  assert.equal(khoiAt(arrive + CHORE_SECONDS + 0.1).mode, 'walk');
});

test('one cycle is the walk plus one chore, then repeats', () => {
  const cycle = WALK_SECONDS + CHORE_SECONDS;
  assert.deepEqual(khoiAt(cycle + 1), khoiAt(1));
});

test('waypointT is the loop fraction where each waypoint is reached', () => {
  assert.equal(waypointT(0), 0);
  assert.ok(waypointT(gate) > 0 && waypointT(gate) < 0.5);
});
