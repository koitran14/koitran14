const { test } = require('node:test');
const assert = require('node:assert/strict');
const loadTs = require('./load-ts.cjs');
const { inLawn, nextTarget, stepToward, COOP_DOOR } = loadTs('../lib/farm/chickens.ts');

// small deterministic PRNG so failures reproduce
function rng(seed) { return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646; }

test('lawn excludes the stream, the field and the coop', () => {
  assert.equal(inLawn(150, 110), true);
  assert.equal(inLawn(95, 110), false);   // stream columns 90..101
  assert.equal(inLawn(40, 90), false);    // field
  assert.equal(inLawn(158, 76), false);   // inside the coop
});

test('chickens only ever pick nearby targets on the lawn', () => {
  const rand = rng(42);
  let at = [150, 110];
  for (let i = 0; i < 2000; i++) {
    const t = nextTarget(at, rand);
    assert.ok(inLawn(t[0], t[1]), `target ${t} off the lawn`);
    assert.ok(Math.hypot(t[0] - at[0], t[1] - at[1]) <= 12 + 1e-9, `target ${t} too far from ${at}`);
    at = t;
  }
});

test('stepping toward a target never overshoots', () => {
  let p = [150, 110];
  for (let i = 0; i < 100; i++) p = stepToward(p, [160, 110], 6, 0.5);
  assert.deepEqual(p, [160, 110]);
  assert.deepEqual(stepToward([150, 110], [160, 110], 6, 0.5), [153, 110]);
});

test('the coop door is on the lawn so chickens can reach it', () => {
  assert.equal(inLawn(COOP_DOOR[0], COOP_DOOR[1]), true);
});
