import "server-only";
import { promises as fs } from "fs";
import path from "path";

// The Cube handbook pages are authored as plain HTML (content/cube-handbook) and rendered inside the site layout.
const DIR = path.join(process.cwd(), "content", "cube-handbook");
export const CHAPTERS = ["00", "01", "02", "03", "04", "05", "06", "07"];

/** Prefix every selector with `.hb` so handbook styles never leak into the rest of the site. */
export function scopeCss(css: string) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[{}])(\s*)([^{}@]+?)\s*\{/g, (_, pre, ws, sel: string) => {
      // keyframe steps are not selectors
      if (/^(from|to|[\d.]+%)(\s*,\s*(from|to|[\d.]+%))*$/.test(sel.trim())) return `${pre}${ws}${sel}{`;
      return `${pre}${ws}${splitTop(sel).map(scopeOne).join(",")}{`;
    });
}

// split on commas that are not inside (...) or [...], e.g. `:is(p,.take)` stays whole
function splitTop(sel: string) {
  const out: string[] = [];
  let depth = 0, cur = "";
  for (const ch of sel) {
    if (ch === "(" || ch === "[") depth++;
    if (ch === ")" || ch === "]") depth--;
    if (ch === "," && !depth) { out.push(cur); cur = ""; } else cur += ch;
  }
  return [...out, cur];
}

function scopeOne(raw: string) {
  const s = raw.trim();
  const dark = s.match(/^:root\[data-theme=dark\](.*)$/);
  if (dark) return `[data-theme=dark] .hb${dark[1]}`;
  const root = s.match(/^(?::root|html|body)(?![\w-])(.*)$/);
  if (root) return `.hb${root[1]}`;
  return `.hb ${s}`;
}

export type HandbookPage = { title: string; css: string; body: string; script: string };

export async function loadPage(name: string): Promise<HandbookPage> {
  const [html, shared] = await Promise.all([
    fs.readFile(path.join(DIR, `${name}.html`), "utf-8"),
    fs.readFile(path.join(DIR, "style.css"), "utf-8"),
  ]);
  const body = html.match(/<body>([\s\S]*)<\/body>/)![1];
  const inline = Array.from(body.matchAll(/<script>([\s\S]*?)<\/script>/g), (m) => m[1]);
  return {
    title: html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "Cube.dev Engineering Handbook",
    css: scopeCss(shared + Array.from(html.matchAll(/<style>([\s\S]*?)<\/style>/g), (m) => m[1]).join("\n")),
    body: body.replace(/<script[\s\S]*?<\/script>/g, ""),
    // each page script runs in its own scope so moving between pages never redeclares a const
    script: inline.map((s) => `(() => {\n${s}\n})();`).join("\n"),
  };
}
