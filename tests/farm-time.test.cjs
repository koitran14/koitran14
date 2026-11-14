const { test } = require('node:test');
const assert = require('node:assert/strict');
const loadTs = require('./load-ts.cjs');
const { seasonOf, daylight, calendarLines, skyColor } = loadTs('../lib/farm/time.ts');

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

test('sky colour: season colour at noon, night navy at midnight, warmer at dusk', () => {
  assert.equal(skyColor('#DDE7F4', 12), '#dde7f4');
  assert.equal(skyColor('#DDE7F4', 0), '#26304f');
  const dusk = skyColor('#DDE7F4', 17.5);
  assert.ok(parseInt(dusk.slice(1, 3), 16) > parseInt(dusk.slice(5, 7), 16), `dusk ${dusk} should lean red`);
});

test('calendar lines', () => {
  assert.deepEqual(calendarLines(new Date(2026, 10, 13, 14, 5)), ['Fri, 13 Nov', 'Đông · 14:05']);
});
