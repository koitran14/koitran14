import "server-only";
import { promises as fs } from "fs";
import path from "path";

// Handbook pages are authored as plain HTML (content/<book>) and rendered inside the site layout.
const ROOT = path.join(process.cwd(), "content");
const chapters = (n: number) => Array.from({ length: n }, (_, i) => String(i).padStart(2, "0"));
export const BOOKS: Record<string, string[]> = { "cube-handbook": chapters(9), "rea-handbook": chapters(11), "ai-product-handbook": chapters(22) };

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

export type HandbookPage = { title: string; css: string; body: string; script: string; libs: string[] };

// scripts every page loads anyway (HandbookPage adds them); any other <script src> a page lists is a book-specific library
const SHARED = ["sources.js", "media.js", "kit.js"];

export async function loadPage(book: string, name: string): Promise<HandbookPage> {
  const css = (dir: string) => fs.readFile(path.join(ROOT, dir, "style.css"), "utf-8");
  // every handbook builds on the Cube handbook's stylesheet; other books add their own figure styles on top
  const [html, shared, own] = await Promise.all([
    fs.readFile(path.join(ROOT, book, `${name}.html`), "utf-8"),
    css("cube-handbook"),
    book === "cube-handbook" ? "" : css(book),
  ]);
  const body = html.match(/<body>([\s\S]*)<\/body>/)![1];
  const inline = Array.from(body.matchAll(/<script>([\s\S]*?)<\/script>/g), (m) => m[1]);
  return {
    title: html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "Handbook",
    css: scopeCss(shared + own + Array.from(html.matchAll(/<style>([\s\S]*?)<\/style>/g), (m) => m[1]).join("\n")),
    body: body.replace(/<script[\s\S]*?<\/script>/g, ""),
    // each page script runs in its own scope so moving between pages never redeclares a const
    script: inline.map((s) => `(() => {\n${s}\n})();`).join("\n"),
    libs: Array.from(body.matchAll(/<script src="([^"]+)"><\/script>/g), (m) => m[1]).filter((s) => !SHARED.includes(s)),
  };
}
