"use client";

import { useEffect, useRef, useState } from "react";

// loaded only while the intro plays; Space Grotesk already comes from <Fonts />
const FONT_URL =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700&family=Bebas+Neue&family=Pacifico&family=Space+Mono&family=Abril+Fatface&family=Press+Start+2P&family=Monoton&family=UnifrakturMaguntia&family=Caveat:wght@700&display=swap";

const FONTS = [
  "font-family:'Playfair Display';font-style:italic;font-weight:700",
  "font-family:'Bebas Neue'",
  "font-family:'Pacifico'",
  "font-family:'Space Mono'",
  "font-family:'Abril Fatface'",
  "font-family:'Press Start 2P';font-size:.55em",
  "font-family:'Monoton'",
  "font-family:'UnifrakturMaguntia'",
  "font-family:'Caveat';font-weight:700",
  "font-family:Georgia;font-style:italic",
  "font-family:'Courier New'",
];
const LOGO = "font-family:'Space Grotesk',system-ui,sans-serif;font-weight:600;letter-spacing:-0.025em";

// runs before paint so a repeat visit in the same tab never flashes the black screen
const SKIP_SCRIPT = `try{if(sessionStorage.getItem('intro')||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.dataset.intro='skip'}catch(e){}`;

export function Intro() {
  const [done, setDone] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLSpanElement>(null);
  const finish = useRef(() => {});

  useEffect(() => {
    if (sessionStorage.getItem("intro") || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    const st = stage.current!, w = word.current!;
    const nav = document.querySelector<HTMLElement>("[data-logo]");
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (t: number, fn: () => void) => timers.push(setTimeout(fn, t));
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    document.body.style.overflow = "hidden";

    finish.current = () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
      if (nav) nav.style.visibility = "";
      sessionStorage.setItem("intro", "1");
      setDone(true);
    };

    const build = (s: string) => {
      w.replaceChildren(...Array.from(s).map((c) => {
        const el = document.createElement("span");
        el.textContent = c;
        el.style.cssText = `display:inline-block;min-width:${c === " " ? ".3em" : "0"};${LOGO}`;
        return el;
      }));
      return Array.from(w.children) as HTMLElement[];
    };

    let letters = build("haise erwin");
    let locked = 0;

    const play = () => {
      for (let t = 300; t < 2500; t += 55) at(t, () => letters.forEach((s, i) => {
        if (i < locked) return;
        s.style.cssText = `display:inline-block;${FONTS[(Math.random() * FONTS.length) | 0]};transform:translateY(${rand(-6, 6) | 0}px) rotate(${rand(-6, 6) | 0}deg)`;
      }));
      at(1200, () => { letters = build("koitran"); });
      // lock the letters left to right, each with a small pop
      for (let i = 0; i < 7; i++) at(1700 + i * 110, () => {
        locked = i + 1;
        const s = letters[i];
        s.style.cssText = `display:inline-block;${LOGO};transform:scale(1.4)`;
        requestAnimationFrame(() => {
          s.style.transition = "transform .3s cubic-bezier(.2,1.6,.4,1)";
          s.style.transform = "scale(1)";
        });
      });
      // the dot stamps down: huge to normal, then the word shakes and a ring spreads from the dot
      at(2500, () => {
        w.style.cssText = `${LOGO};position:relative`;
        const dot = document.createElement("span");
        dot.textContent = ".";
        dot.style.cssText = "display:inline-block;color:#60a5fa;transform-origin:50% 78%;transition:color .9s";
        w.append(dot);
        dot.animate([{ transform: "scale(9)", opacity: 0 }, { transform: "scale(1)", opacity: 1 }],
          { duration: 220, delay: 200, easing: "cubic-bezier(.7,0,1,1)", fill: "backwards" });
      });
      at(2920, () => {
        w.animate([
          { transform: "none" }, { transform: "translate(-6px,4px) scale(.97)" }, { transform: "translate(5px,-3px)" },
          { transform: "translate(-3px,2px)" }, { transform: "none" },
        ], { duration: 320 });
        const d = w.lastElementChild!.getBoundingClientRect(), o = w.getBoundingClientRect();
        const ring = document.createElement("span");
        ring.style.cssText = `position:absolute;width:14px;height:14px;left:${d.left - o.left + d.width / 2 - 7}px;top:${d.top - o.top + d.height * 0.78 - 7}px;border:1.5px solid #60a5fa;border-radius:50%;pointer-events:none;opacity:0`;
        w.prepend(ring);
        ring.animate([{ transform: "scale(1)", opacity: 0.9 }, { transform: "scale(14)", opacity: 0 }],
          { duration: 1000, easing: "cubic-bezier(.16,1,.3,1)" });
      });
      // fly the logo into the navbar logo while the black screen fades
      at(3900, () => {
        st.style.transition = "background-color .9s";
        st.style.backgroundColor = "transparent";
        if (!nav) return;
        nav.style.visibility = "hidden";
        const a = w.getBoundingClientRect(), b = nav.getBoundingClientRect(), k = b.width / a.width;
        w.style.transformOrigin = "0 0";
        w.style.transition = "transform .9s cubic-bezier(.77,0,.18,1),color .9s";
        w.style.transform = `translate(${b.left - a.left}px,${b.top + b.height / 2 - a.top - (a.height * k) / 2}px) scale(${k})`;
        w.style.color = getComputedStyle(nav).color;
        const navDot = nav.lastElementChild;
        if (navDot) (w.lastElementChild as HTMLElement).style.color = getComputedStyle(navDot).color;
      });
      at(4850, () => finish.current());
    };

    // wait for the intro fonts, but never longer than 1.5s on a slow network
    const loads = FONTS.map((f) => document.fonts.load(`52px ${f.match(/font-family:([^;]+)/)![1]}`).catch(() => {}));
    let started = false, cancelled = false;
    const start = () => { if (!started && !cancelled) { started = true; play(); } };
    Promise.all(loads).then(start);
    at(1500, start);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
      if (nav) nav.style.visibility = "";
    };
  }, []);

  if (done) return null;

  return (
    <>
      <link rel="stylesheet" href={FONT_URL} />
      <script dangerouslySetInnerHTML={{ __html: SKIP_SCRIPT }} />
      <div
        id="intro"
        ref={stage}
        onClick={() => finish.current()}
        aria-hidden
        // on phones the viewport starts below the status bar, which Safari paints black too, so the true center reads low;
        // shortcut: lift by a fixed 3dvh, switch to viewport-fit=cover + safe-area padding if it still looks off on some phone
        className="fixed left-0 top-0 h-[100dvh] w-full z-[100] grid cursor-pointer place-items-center bg-[#0b0b0b] text-[#f5f3ee] max-md:pb-[6dvh]"
      >
        <span ref={word} className="whitespace-nowrap text-[clamp(32px,10vw,52px)] leading-none" />
      </div>
    </>
  );
}
