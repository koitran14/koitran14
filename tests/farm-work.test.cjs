const { test } = require('node:test');
const assert = require('node:assert/strict');
const loadTs = require('./load-ts.cjs');
const nav = loadTs('../lib/farm/nav.ts');
const { newFarm, cropFor, stageOf, growthOf, jobFor, finish, layEggs, saveFarm, loadFarm, CROP_HOURS } = loadTs('../lib/farm/farmwork.ts', { './nav': nav });

const H = 3600e3;
function rng(seed) { return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646; }

test('each bed row grows the season crop; winter only the spinach row', () => {
  assert.equal(cropFor(0, 'xuan'), 'carrot');
  assert.equal(cropFor(4, 'xuan'), 'radish');      // row 1
  assert.equal(cropFor(8, 'ha'), 'melon');         // row 2
  assert.equal(cropFor(9, 'thu'), 'pumpkin');      // row 3 wraps to the first crop
  assert.equal(cropFor(0, 'dong'), null);
  assert.equal(cropFor(3, 'dong'), 'spinach');
});

test('a new player starts with nothing: empty beds, empty can, no produce, nothing unlocked', () => {
  const f = newFarm(5000);
  for (let b = 0; b < 15; b++) assert.equal(stageOf(f, b, 5000, 'thu'), 'empty');
  assert.equal(f.water, 0); assert.deepEqual(f.inv, {}); assert.deepEqual(f.unlocked, []); assert.deepEqual(f.eggs, []);
});

test('a bed goes empty → plant → water → ripens in real time → harvest', () => {
  let f = newFarm(0); const now = 1000;
  assert.equal(jobFor(f, { kind: 'bed', bed: 0 }, now, 'xuan', false).job, 'plant');
  f = finish(f, 'plant', { kind: 'bed', bed: 0 }, now, 'xuan');
  assert.equal(stageOf(f, 0, now, 'xuan'), 'seeded');
  assert.equal(jobFor(f, { kind: 'bed', bed: 0 }, now, 'xuan', false).job, null);   // can starts empty
  assert.equal(jobFor(f, { kind: 'bed', bed: 0 }, now, 'xuan', false).reason, 'no-water');
  assert.equal(jobFor(f, { kind: 'well' }, now, 'xuan', false).job, 'well');
  f = finish(f, 'well', { kind: 'well' }, now, 'xuan');
  assert.equal(f.water, 3);
  f = finish(f, 'water', { kind: 'bed', bed: 0 }, now, 'xuan');
  assert.equal(f.water, 2);
  assert.equal(stageOf(f, 0, now + CROP_HOURS.carrot * H - 1, 'xuan'), 'growing');
  assert.equal(jobFor(f, { kind: 'bed', bed: 0 }, now + H, 'xuan', false).reason, 'growing');
  const ripe = now + CROP_HOURS.carrot * H;
  assert.equal(stageOf(f, 0, ripe, 'xuan'), 'ripe');
  assert.equal(jobFor(f, { kind: 'bed', bed: 0 }, ripe, 'xuan', false).job, 'harvest');
  f = finish(f, 'harvest', { kind: 'bed', bed: 0 }, ripe, 'xuan');
  assert.equal(f.inv.carrot, 3);
  assert.equal(stageOf(f, 0, ripe, 'xuan'), 'empty');
});

test('longer-growing crops give more (spec 4.4b)', () => {
  assert.ok(CROP_HOURS.melon > CROP_HOURS.tomato);
  const cleared = (bed) => finish(newFarm(0), 'harvest', { kind: 'bed', bed }, 0, 'ha');
  let f = cleared(6);
  for (const job of ['plant', 'well', 'water']) f = finish(f, job, job === 'well' ? { kind: 'well' } : { kind: 'bed', bed: 6 }, 0, 'ha');   // bed 6 = row 2 = melon
  f = finish(f, 'harvest', { kind: 'bed', bed: 6 }, CROP_HOURS.melon * H, 'ha');
  let g = cleared(0);
  for (const job of ['plant', 'well', 'water']) g = finish(g, job, job === 'well' ? { kind: 'well' } : { kind: 'bed', bed: 0 }, 0, 'ha');
  g = finish(g, 'harvest', { kind: 'bed', bed: 0 }, CROP_HOURS.tomato * H, 'ha');
  assert.ok(f.inv.melon > g.inv.tomato);
});

test('the well only fills a can that is not full; hens are not fed at night', () => {
  let f = finish(newFarm(0), 'well', { kind: 'well' }, 0, 'xuan');
  assert.equal(jobFor(f, { kind: 'well' }, 0, 'xuan', false).reason, 'can-full');
  assert.equal(jobFor(f, { kind: 'trough' }, 0, 'xuan', false).job, 'feed');
  assert.equal(jobFor(f, { kind: 'trough' }, 0, 'xuan', true).reason, 'night');
});

test('hens lay by day only, at most three eggs, on walkable lawn; picking one up keeps it', () => {
  const rand = rng(7);
  let f = newFarm(0);
  f = layEggs(f, 10 * H, false, rand);
  assert.equal(f.eggs.length, 0);
  for (let t = 0; t < 10; t++) f = layEggs(f, t * H, true, rand);
  assert.equal(f.eggs.length, 3);
  for (const e of f.eggs) assert.ok(nav.walkable(e.x, e.z));
  const egg = f.eggs[0];
  assert.equal(jobFor(f, { kind: 'egg', id: egg.id }, 0, 'xuan', false).job, 'egg');
  f = finish(f, 'egg', { kind: 'egg', id: egg.id }, 0, 'xuan');
  assert.equal(f.eggs.length, 2);
  assert.equal(f.inv.egg, 1);
});

test('progress survives a save and load; junk loads as a fresh farm', () => {
  let f = finish(finish(newFarm(0), 'harvest', { kind: 'bed', bed: 5 }, 123, 'thu'), 'plant', { kind: 'bed', bed: 5 }, 123, 'thu');
  const back = loadFarm(saveFarm(f), 0);
  assert.deepEqual(back, f);
  assert.deepEqual(loadFarm('{"beds": 7}', 9), newFarm(9));
  assert.deepEqual(loadFarm('not json', 9), newFarm(9));
});

test('a job only pays out if the target is still in the right state when it finishes', () => {
  let f = finish(newFarm(0), 'harvest', { kind: 'bed', bed: 0 }, 0, 'xuan');   // bed 0 now empty
  const egg = { kind: 'egg', id: 99 };
  assert.deepEqual(finish(f, 'egg', egg, 0, 'xuan'), f);                    // an egg already picked up gives nothing
  assert.deepEqual(finish(f, 'harvest', { kind: 'bed', bed: 0 }, 0, 'xuan'), f);   // nothing to harvest on an empty bed
  assert.deepEqual(finish(f, 'water', { kind: 'bed', bed: 0 }, 0, 'xuan'), f);     // empty can, empty bed
  f = finish(f, 'plant', { kind: 'bed', bed: 0 }, 0, 'xuan');
  assert.deepEqual(finish(f, 'plant', { kind: 'bed', bed: 0 }, 5, 'xuan'), f);      // already sown
  assert.deepEqual(finish(newFarm(0), 'plant', { kind: 'bed', bed: 0 }, 0, 'dong'), newFarm(0));   // snow-covered bed
  assert.deepEqual(finish(newFarm(0), 'harvest', { kind: 'bed', bed: 0 }, 0, 'dong'), newFarm(0));   // nothing grows on it either
});

const { UNLOCKS, wealth, buy } = loadTs('../lib/farm/farmwork.ts', { './nav': nav });

test('unlocks cost produce: a crop is worth 1, an egg 3', () => {
  assert.deepEqual(UNLOCKS.map((u) => [u.id, u.price]), [
    ['flowerfence', 20], ['beehive', 40], ['windmill', 50], ['cow', 60], ['greenhouse', 80], ['terraces', 100], ['lotus', 120],
  ]);
  assert.equal(wealth({ carrot: 10, radish: 5, egg: 2 }), 21);
});

test('buying spends crops before eggs, largest stack first, and keeps the item', () => {
  const f = { ...newFarm(0), inv: { carrot: 12, radish: 6, egg: 2 } };
  const r = buy(f, 'flowerfence');
  assert.equal(r.ok, true);
  assert.deepEqual(r.farm.unlocked, ['flowerfence']);
  assert.deepEqual(r.farm.inv, { carrot: 0, radish: 0, egg: 1 });   // 12 + 6 = 18, then one egg (3) covers the last 2
  assert.equal(buy(r.farm, 'flowerfence').ok, false);               // already owned
});

test('buying without enough produce changes nothing', () => {
  const f = { ...newFarm(0), inv: { carrot: 3 } };
  const r = buy(f, 'lotus');
  assert.equal(r.ok, false); assert.equal(r.farm, f);
  assert.equal(buy(f, 'no-such-thing').ok, false);
});

test('saved unlocks survive a reload; old saves and unknown ids load safely', () => {
  const f = { ...newFarm(0), unlocked: ['cow', 'hacked'] };
  assert.deepEqual(loadFarm(saveFarm(f), 0).unlocked, ['cow']);
  const old = newFarm(0); delete old.unlocked;
  assert.deepEqual(loadFarm(saveFarm(old), 0).unlocked, []);
});

test('growth runs 0 → 1 from watering to ripe and is 0 for beds not growing', () => {
  let f = finish(newFarm(0), 'plant', { kind: 'bed', bed: 0 }, 0, 'xuan');
  assert.equal(growthOf(f, 0, 0, 'xuan'), 0);   // seeded, not yet watered
  f = finish({ ...f, water: 1 }, 'water', { kind: 'bed', bed: 0 }, 0, 'xuan');
  assert.equal(growthOf(f, 0, CROP_HOURS.carrot * H / 2, 'xuan'), 0.5);
  assert.equal(growthOf(f, 0, CROP_HOURS.carrot * H * 3, 'xuan'), 1);
});
