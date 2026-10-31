"use client";

import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import type { HandbookPage as Page } from "@/lib/handbook";
import { useViews } from "@/components/view-count";

// the chapter engine and the hub engine are shared by every handbook
const KIT = "/learn/cube-handbook/kit.js";
const HUB = "/learn/cube-handbook/hub.js";

// Renders a handbook page inside the site layout, then runs its scripts in order:
// the book's shared data first, the page's own script, then the chapter engine (or the hub engine on a book's index).
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
      await run(engine ? KIT : HUB);
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

  // "/blog/cube-handbook/01" -> "cube-handbook/01"; the hub page ("cube-handbook") gets the book's total instead
  const views = useViews(usePathname().replace(/^\/blog\//, ""));

  // the meta row lives in the page's raw HTML, so the count is appended to it rather than rendered by React
  useEffect(() => {
    const meta = document.querySelector(".hb .meta");
    if (views == null || !meta) return;
    const span = document.createElement("span");
    span.textContent = `${views.toLocaleString("vi-VN")} lượt xem`;
    meta.append(span);
    return () => span.remove();
  }, [views, page]);

  // the page scripts fill figures, TOC and quizzes into this markup; a re-render (the view count arriving)
  // would write the raw HTML back over them, so the same element is reused until the page itself changes
  return useMemo(
    () => (
      <>
        <style dangerouslySetInnerHTML={{ __html: page.css }} />
        <div className="hb" dangerouslySetInnerHTML={{ __html: page.body }} />
      </>
    ),
    [page],
  );
}
