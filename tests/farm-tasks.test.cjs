const { test } = require('node:test');
const assert = require('node:assert/strict');
const loadTs = require('./load-ts.cjs');
const nav = loadTs('../lib/farm/nav.ts');
const { TASKS, pose, standSpot } = loadTs('../lib/farm/tasks.ts', { './nav': nav });

const KINDS = ['plant', 'water', 'harvest', 'well', 'feed', 'egg', 'fish', 'transplant', 'wave'];

test('every job has a task with a duration and a pose that stays in joint limits', () => {
  for (const k of KINDS) {
    assert.ok(TASKS[k] && TASKS[k].seconds > 0.5, k);
    for (let t = 0; t <= TASKS[k].seconds; t += 0.05) {
      const p = pose(k, t);
      for (const part of ['body', 'head', 'armL', 'armR', 'legL', 'legR']) {
        for (const ax of ['x', 'z']) {
          const v = p[part]?.[ax] ?? 0;
          assert.ok(Number.isFinite(v) && Math.abs(v) <= 3.2, `${k} ${part}.${ax} at ${t.toFixed(2)} = ${v}`);
        }
      }
      assert.ok(p.drop >= 0 && p.drop <= 0.12, `${k} drop`);
    }
  }
});

test('tools switch with the phase: hoe then seed bag when planting; the season item hides while working', () => {
  assert.equal(pose('plant', 0.3).tool, 'hoe');
  assert.equal(pose('plant', TASKS.plant.seconds - 0.2).tool, 'seedbag');
  assert.equal(pose('water', 1).tool, 'can');
  assert.equal(pose('wave', 1).hideHeld, false);
  for (const k of KINDS.filter((k) => k !== 'wave')) assert.equal(pose(k, 0.5).hideHeld, true, k);
});

test('a task really moves: the working arm changes over the task', () => {
  for (const k of KINDS) {
    const xs = [];
    for (let t = 0; t <= TASKS[k].seconds; t += 0.1) { const p = pose(k, t); xs.push((p.armR?.x ?? 0) + (p.armL?.x ?? 0) + (p.armR?.z ?? 0) + (p.armL?.z ?? 0)); }
    assert.ok(Math.max(...xs) - Math.min(...xs) > 0.3, `${k} barely moves`);
  }
});

test('Khôi stands on walkable ground next to what he works on, facing it', () => {
  const targets = [...Array(15).keys()].map((bed) => ({ kind: 'bed', bed })).concat([{ kind: 'well' }, { kind: 'trough' }]);
  for (const t of targets) {
    const s = standSpot(t, [140, 100]);
    assert.ok(nav.walkable(s.x, s.z), JSON.stringify(t));
    assert.ok(nav.findPath([140, 100], [s.x, s.z]), `cannot reach ${JSON.stringify(t)}`);
    const look = [s.focus[0] - s.x, s.focus[1] - s.z];
    assert.ok(Math.abs(Math.atan2(look[0], look[1]) - s.heading) < 1e-6, 'faces the work');
  }
});
