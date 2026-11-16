const { test } = require('node:test');
const assert = require('node:assert/strict');
const loadTs = require('./load-ts.cjs');
const { compileDriver, blenderFrame, blenderToThree, LOOP_FRAMES } = loadTs('../lib/farm/drivers.ts');

const close = (a, b, eps = 1e-6) => assert.ok(Math.abs(a - b) < eps, `${a} !== ${b}`);

test('driver expressions evaluate the functions the farm uses', () => {
  close(compileDriver('1.5+sin(frame*0.5)*2')(Math.PI), 1.5 + Math.sin(Math.PI * 0.5) * 2);
  close(compileDriver('max(0,sin(frame)-0.4)*0.9')(0), 0);
  close(compileDriver('abs(-2)+min(3, 4)+cos(0)')(0), 6);
  close(compileDriver('-0.25+2*3')(0), 5.75);
});

test('% follows Python, so negative inputs wrap into [0, n)', () => {
  close(compileDriver('frame%1')(-0.25), 0.75);
  close(compileDriver('((frame/120+0.5)%1)*1.44')(60), 0);
});

test('unknown names are rejected instead of evaluated', () => {
  assert.throws(() => compileDriver('window.alert(1)'));
  assert.throws(() => compileDriver('frame; 1'));
});

test('exported drivers repeat over the 480-frame loop', () => {
  const f = compileDriver('0.6+sin(frame*0.052360)*0.9+sin(frame*0.183260)*0.15');
  close(f(10), f(10 + LOOP_FRAMES), 1e-3);
});

test('seconds map to Blender frames at 24 fps starting at frame 1', () => {
  close(blenderFrame(0), 1);
  close(blenderFrame(2), 49);
});

test('Blender z-up vectors map to three y-up', () => {
  assert.deepEqual(blenderToThree([1, 2, 3]), [1, 3, -2]);
});
