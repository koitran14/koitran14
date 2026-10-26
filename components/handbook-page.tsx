"use client";

import { useEffect } from "react";
import type { HandbookPage as Page } from "@/lib/handbook";

// the chapter engine is shared by every handbook
const KIT = "/learn/cube-handbook/kit.js";

// Renders a handbook page inside the site layout, then runs its scripts in order:
// the book's shared data first, the page's own script, then the chapter engine.
export function HandbookPage({ book, page, engine }: { book: string; page: Page; engine: boolean }) {
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
      await run(`/learn/${book}/sources.js`);
      await run(`/learn/${book}/media.js`);
      for (const lib of page.libs) await run(`/learn/${book}/${lib}`);
      await run(undefined, page.script);
      if (engine) await run(KIT);
    })();
    return () => { ctl.abort(); added.forEach((s) => s.remove()); };
  }, [book, page, engine]);

  // Fade and lift each block in as it scrolls into view, like the rest of the site; blocks entering together stagger.
  useEffect(() => {
    const art = document.querySelector(".hb article");
    if (!art || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const blocks = Array.from(art.querySelectorAll<HTMLElement>(":scope > :not(section), :scope > section > *"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.filter((e) => e.isIntersecting).forEach((e, i) => {
          const el = e.target as HTMLElement;
          el.style.transitionDelay = `${Math.min(i, 5) * 60}ms`;
          el.classList.add("in");
          io.unobserve(el);
          // hand the element back its own transitions (hover etc.) once it has arrived
          el.addEventListener("transitionend", () => { el.classList.remove("rv", "in"); el.style.transitionDelay = ""; }, { once: true });
        });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    blocks.forEach((el) => { el.classList.add("rv"); io.observe(el); });
    return () => io.disconnect();
  }, [page]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: page.css }} />
      <div className="hb" dangerouslySetInnerHTML={{ __html: page.body }} />
    </>
  );
}
