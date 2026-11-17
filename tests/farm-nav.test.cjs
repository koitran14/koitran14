const { test } = require('node:test');
const assert = require('node:assert/strict');
const loadTs = require('./load-ts.cjs');
const { walkable, heightAt, findPath, slide } = loadTs('../lib/farm/nav.ts');

test('buildings, the stream, beds and the island edge are not walkable', () => {
  assert.equal(walkable(24, 25), false);    // barn
  assert.equal(walkable(96, 30), false);    // upper stream
  assert.equal(walkable(96, 120), false);   // lower stream below the bridge
  assert.equal(walkable(17, 77), false);    // a raised bed
  assert.equal(walkable(158, 76), false);   // coop
  assert.equal(walkable(-3, 50), false);    // off the island
  assert.equal(walkable(140, 100), true);   // lawn
  assert.equal(walkable(96, 105), true);    // the bridge
  assert.equal(walkable(30, 50), true);     // barn path
});

test('the terraces are 12 voxels apart and the stairs ramp between them', () => {
  assert.equal(heightAt(30, 40), 12);
  assert.equal(heightAt(140, 100), 0);
  assert.equal(heightAt(77, 66), 6);        // half way down the main stairs
  assert.equal(heightAt(180, 63), 9);       // the steps right of the coop
});

test('a path from the barn to the chicken lawn goes down the stairs and over the bridge', () => {
  const p = findPath([24, 44], [150, 100]);
  assert.ok(p && p.length > 1, 'no path');
  const along = [];   // legs are straight after string-pulling, so sample along them, not just at the corners
  for (let i = 1; i < p.length; i++) for (let k = 0; k <= 40; k++) along.push([p[i - 1][0] + (p[i][0] - p[i - 1][0]) * k / 40, p[i - 1][1] + (p[i][1] - p[i - 1][1]) * k / 40]);
  assert.ok(along.some(([x, z]) => ((x >= 70 && x <= 84) || (x >= 174 && x <= 186)) && z > 61 && z < 71), 'did not use a flight of stairs');
  assert.ok(along.some(([x, z]) => x > 88 && x < 104 && z >= 99 && z <= 111), 'did not cross the bridge');
  for (let i = 1; i < p.length; i++) {   // every straight leg stays on walkable ground
    const [a, b] = [p[i - 1], p[i]], n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]));
    for (let k = 0; k <= n; k++) { const t = n ? k / n : 0; assert.ok(walkable(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t), `leg ${i} leaves walkable ground`); }
  }
});

test('no path into a blocked spot; the terrace wall cannot be jumped', () => {
  assert.equal(findPath([140, 100], [24, 25]), null);
  assert.equal(heightAt(40, 58) - heightAt(40, 62), 12);
  const p = findPath([40, 50], [40, 66]);   // straight down would cross the wall: it must detour by a flight of stairs
  assert.ok(p);
  const along = [];
  for (let i = 1; i < p.length; i++) for (let k = 0; k <= 40; k++) along.push([p[i - 1][0] + (p[i][0] - p[i - 1][0]) * k / 40, p[i - 1][1] + (p[i][1] - p[i - 1][1]) * k / 40]);
  assert.ok(along.some(([x, z]) => z > 61 && z < 71 && ((x >= 70 && x <= 84) || (x >= 174 && x <= 186))));
  for (let i = 1; i < along.length; i++) assert.ok(Math.abs(heightAt(...along[i]) - heightAt(...along[i - 1])) <= 3, 'jumped the terrace wall');
});

test('slide keeps keyboard movement on walkable ground and slides along walls', () => {
  const [x, z] = slide([30, 50], [0, -20]);   // pushing north into the barn stops short of it
  assert.ok(walkable(x, z));
  assert.ok(z > 36);
  const [x2, z2] = slide([30, 46], [3, -3]);   // diagonal into the wall keeps the sideways part
  assert.ok(x2 > 30 && walkable(x2, z2));
});

test('a click on something solid sends Khôi to the nearest spot he can stand on', () => {
  const { nearestWalkable } = loadTs('../lib/farm/nav.ts');
  const [x, z] = nearestWalkable(115.5, 117.5);   // the middle of the well
  assert.ok(walkable(x, z));
  assert.ok(Math.hypot(x - 115.5, z - 117.5) < 9);
  assert.deepEqual(nearestWalkable(140, 100), [140, 100]);   // already free: unchanged
  assert.equal(nearestWalkable(-60, 300), null);              // nowhere near the island
});

test('the side islands are closed until bought: no path over the bridges', () => {
  const nav = loadTs('../lib/farm/nav.ts');
  nav.setOpenIslands([]);
  assert.equal(nav.walkable(-100, 40), false);
  assert.equal(nav.walkable(-35, 45), false);   // the bridge itself
  assert.equal(nav.findPath([30, 47], [-125, 45]), null);
});

test('rice terraces: over the sagging rope bridge and up the terraces to the summit', () => {
  const nav = loadTs('../lib/farm/nav.ts');
  nav.setOpenIslands(['terraces']);
  assert.ok(Math.abs(nav.heightAt(-35, 45) - 8.2) < 0.3, `bridge mid ${nav.heightAt(-35, 45)}`);   // deck dips 5 voxels mid-span
  assert.ok(Math.abs(nav.heightAt(-125, 45) - 39.2) < 0.01, `summit ${nav.heightAt(-125, 45)}`);
  const p = nav.findPath([30, 47], [-125, 45]);
  assert.ok(p, 'no path to the summit');
  assert.deepEqual(p[p.length - 1], [-125, 45]);
  assert.equal(nav.walkable(-138, 38), false);   // the stilt house stands on the summit
});

test('lotus pond: not on the water; the zigzag bridge to the pavilion and the jetty are walkable', () => {
  const nav = loadTs('../lib/farm/nav.ts');
  nav.setOpenIslands(['lotus']);
  assert.equal(nav.walkable(345, 75), false);   // open water (the zigzag bridge crosses the middle)
  assert.ok(nav.walkable(346, 50), 'pavilion deck');
  assert.ok(nav.findPath([170, 52], [346, 50]), 'no path to the pavilion');
  assert.ok(nav.findPath([170, 52], [316, 80]), 'no path to the end of the jetty');
  assert.equal(nav.walkable(286, 22), false);   // the banyan's trunk
});
