const { test } = require('node:test');
const assert = require('node:assert/strict');
const loadTs = require('./load-ts.cjs');
const { seasonOf, daylight, calendarLines, skyColor, nextSeason, dayProgress } = loadTs('../lib/farm/time.ts');

test('season boundaries', () => {
  assert.equal(seasonOf(new Date(2026, 0, 31)), 'dong');
  assert.equal(seasonOf(new Date(2026, 1, 1)), 'xuan');
  assert.equal(seasonOf(new Date(2026, 4, 1)), 'ha');
  assert.equal(seasonOf(new Date(2026, 7, 1)), 'thu');
  assert.equal(seasonOf(new Date(2026, 10, 1)), 'dong');
  assert.equal(seasonOf(new Date(2026, 11, 31)), 'dong');
});

test('lamps switch at 18 and 6', () => {
  assert.equal(daylight(17.99).lampsOn, false);
  assert.equal(daylight(18).lampsOn, true);
  assert.equal(daylight(5.99).lampsOn, true);
  assert.equal(daylight(6).lampsOn, false);
  assert.equal(daylight(12).day, 1);
  assert.equal(daylight(0).day, 0);
});

test('morning is already bright by 8:00', () => {
  assert.ok(daylight(8).day >= 0.85, `day at 8:00 is ${daylight(8).day}`);
});

test('dusk peaks at 6 and 18 and is gone by noon', () => {
  assert.equal(daylight(18).dusk, 1);
  assert.equal(daylight(6).dusk, 1);
  assert.equal(daylight(12).dusk, 0);
});

test('the low sun still shines gold just before sunset and sunrise, and is gone once it has set', () => {
  assert.ok(daylight(17.97).glow > 0.8, `glow at 17:58 is ${daylight(17.97).glow}`);   // was near-black: day ≈ 0.01
  assert.ok(daylight(6.05).glow > 0.8, `glow at 6:03 is ${daylight(6.05).glow}`);
  assert.equal(daylight(18.5).glow, 0);
  assert.equal(daylight(5.5).glow, 0);
  assert.equal(daylight(12).glow, 0);
});

test('the welcome names the real moment on the farm', () => {
  const { farmMoment } = loadTs('../lib/farm/time.ts');
  assert.equal(farmMoment('dong', 15), 'a snowy winter afternoon');
  assert.equal(farmMoment('thu', 18.5), 'an autumn evening');
  assert.equal(farmMoment('xuan', 7), 'a spring morning');
  assert.equal(farmMoment('ha', 23), 'a summer night');
});

test('night sky reads as dark, day sky as light (loading text picks its colour from it)', () => {
  const { skyIsDark, WORLD_BG } = loadTs('../lib/farm/time.ts');
  assert.equal(skyIsDark(skyColor(WORLD_BG.dong, 0)), true);
  assert.equal(skyIsDark(skyColor(WORLD_BG.thu, 12)), false);
});

test('sky colour: season colour at noon, night navy at midnight, warmer at dusk', () => {
  assert.equal(skyColor('#DDE7F4', 12), '#dde7f4');
  assert.equal(skyColor('#DDE7F4', 0), '#26304f');
  const dusk = skyColor('#DDE7F4', 17.5);
  assert.ok(parseInt(dusk.slice(1, 3), 16) > parseInt(dusk.slice(5, 7), 16), `dusk ${dusk} should lean red`);
});

test('next season and days until it starts', () => {
  assert.deepEqual(nextSeason(new Date(2026, 10, 14, 7, 57)), { season: 'xuan', days: 79 }); // 14 Nov → 1 Feb
  assert.deepEqual(nextSeason(new Date(2026, 0, 31, 23, 0)), { season: 'xuan', days: 1 });
  assert.deepEqual(nextSeason(new Date(2026, 1, 1, 0, 0)), { season: 'ha', days: 89 });   // 1 Feb → 1 May
  assert.deepEqual(nextSeason(new Date(2026, 6, 31, 12, 0)), { season: 'thu', days: 1 });
});

test('day progress runs 0 at 6:00 to 1 at 18:00 and clamps outside', () => {
  assert.equal(dayProgress(6), 0);
  assert.equal(dayProgress(12), 0.5);
  assert.equal(dayProgress(18), 1);
  assert.equal(dayProgress(3), 0);
  assert.equal(dayProgress(22), 1);
});

test('calendar lines', () => {
  assert.deepEqual(calendarLines(new Date(2026, 10, 13, 14, 5)), ['Fri, 13 Nov', 'Đông · 14:05']);
});
