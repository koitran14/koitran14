// Animation drivers exported with the cozy farm (3d-farming-asset/scripts/export_unity.py, web mode): Blender driver
// expressions on the frame number, stored in glTF node extras as "drv:location:<i>" / "drv:rotation_euler:<i>".

/** Every exported expression repeats over this many frames, so the loop never pops. */
export const LOOP_FRAMES = 480;

/** Blender frame for a time in seconds (24 fps, frame 1 at t = 0). */
export function blenderFrame(seconds: number): number {
  return 1 + seconds * 24;
}

/** Blender's z-up axes to three's y-up (the glTF exporter's convention): (x, y, z) -> (x, z, -y). */
export function blenderToThree([x, y, z]: [number, number, number]): [number, number, number] {
  return [x, z, -y];
}

type Fn = (frame: number) => number;
const FUNCS: Record<string, (...a: number[]) => number> = { sin: Math.sin, cos: Math.cos, abs: Math.abs, max: Math.max, min: Math.min };

/**
 * Compile a driver expression into a function of the frame. Only numbers, `frame`, + - * / %, parentheses and
 * sin/cos/abs/max/min are accepted (a small parser, not eval), with Python's % (result takes the divisor's sign).
 */
export function compileDriver(src: string): Fn {
  let i = 0;
  const ws = () => { while (i < src.length && /\s/.test(src[i])) i++; };
  const eat = (c: string) => { ws(); if (src[i] === c) { i++; return true; } return false; };
  const expr = (): Fn => {
    let a = term();
    for (;;) {
      if (eat("+")) { const l = a, r = term(); a = (f) => l(f) + r(f); }
      else if (eat("-")) { const l = a, r = term(); a = (f) => l(f) - r(f); }
      else return a;
    }
  };
  const term = (): Fn => {
    let a = unary();
    for (;;) {
      if (eat("*")) { const l = a, r = unary(); a = (f) => l(f) * r(f); }
      else if (eat("/")) { const l = a, r = unary(); a = (f) => l(f) / r(f); }
      else if (eat("%")) { const l = a, r = unary(); a = (f) => { const b = r(f), v = l(f) % b; return v !== 0 && (v < 0) !== (b < 0) ? v + b : v; }; }
      else return a;
    }
  };
  const unary = (): Fn => {
    if (eat("-")) { const a = unary(); return (f) => -a(f); }
    if (eat("+")) return unary();
    return atom();
  };
  const atom = (): Fn => {
    ws();
    if (eat("(")) { const e = expr(); if (!eat(")")) throw new SyntaxError(`missing ) in ${src}`); return e; }
    const num = /^\d*\.?\d+(?:e[+-]?\d+)?/i.exec(src.slice(i));
    if (num) { i += num[0].length; const v = parseFloat(num[0]); return () => v; }
    const id = /^[a-z_]+/i.exec(src.slice(i));
    if (!id) throw new SyntaxError(`bad token at ${i} in ${src}`);
    i += id[0].length;
    if (id[0] === "frame") return (f) => f;
    const fn = FUNCS[id[0]];
    if (!fn || !eat("(")) throw new SyntaxError(`unknown name ${id[0]} in ${src}`);
    const args = [expr()];
    while (eat(",")) args.push(expr());
    if (!eat(")")) throw new SyntaxError(`missing ) in ${src}`);
    return (f) => fn(...args.map((a) => a(f)));
  };
  const out = expr();
  ws();
  if (i !== src.length) throw new SyntaxError(`unexpected "${src.slice(i)}" in ${src}`);
  return out;
}
