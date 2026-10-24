"use client";

import { useEffect } from "react";
import type { HandbookPage as Page } from "@/lib/handbook";

const LIB = "/learn/cube-handbook";

// Renders a handbook page inside the site layout, then runs its scripts in order:
// shared data first, the page's own script, then the chapter engine.
export function HandbookPage({ page, engine }: { page: Page; engine: boolean }) {
  useEffect(() => {
    const ctl = new AbortController();
    (window as any).__hbSignal = ctl.signal;
    const added: HTMLScriptElement[] = [];
    const run = (src?: string, text?: string) =>
      new Promise<void>((done) => {
        if (ctl.signal.aborted) return done();
        const s = document.createElement("script");
        if (src) { s.src = src; s.onload = s.onerror = () => done(); } else s.text = text!;
        document.body.appendChild(s);
        added.push(s);
        if (!src) done();
      });
    (async () => {
      await run(`${LIB}/sources.js`);
      await run(`${LIB}/media.js`);
      await run(undefined, page.script);
      if (engine) await run(`${LIB}/kit.js`);
    })();
    return () => { ctl.abort(); added.forEach((s) => s.remove()); };
  }, [page, engine]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: page.css }} />
      <div className="hb" dangerouslySetInnerHTML={{ __html: page.body }} />
    </>
  );
}
