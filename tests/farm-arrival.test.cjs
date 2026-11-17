const { test } = require('node:test');
const assert = require('node:assert/strict');
const loadTs = require('./load-ts.cjs');
const { arrivalPose, DROP, SETTLE, RISE } = loadTs('../lib/farm/arrival.ts');

test('an item starts above its spot, lands on it, squashes, then comes to rest at full size', () => {
  const [lift0, , sy0] = arrivalPose('item', 0);
  assert.ok(lift0 > 0.5 && sy0 < 1, `starts ${lift0} m up, smaller`);
  const [liftLand, , syLand] = arrivalPose('item', DROP + 0.01);
  assert.equal(liftLand, 0);
  assert.ok(syLand < 0.9, `squashed on landing: ${syLand}`);
  assert.equal(arrivalPose('item', DROP + SETTLE), null);
});

test('an island rises from below, overshoots a little, and rests where it belongs', () => {
  assert.ok(arrivalPose('island', 0)[0] <= -2.9);
  const peak = Math.max(...Array.from({ length: 160 }, (_, i) => arrivalPose('island', i / 100)?.[0] ?? 0));
  assert.ok(peak > 0 && peak < 0.5, `overshoot ${peak} m`);
  assert.equal(arrivalPose('island', RISE), null);
});
