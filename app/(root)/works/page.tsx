"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { fieldLabel, splitTitle, works } from "@/data/works";

// Newest first; Array.sort is stable so same-year projects keep their data order.
const sorted = [...works].sort((a, b) => b.publishYear - a.publishYear);

// Gentle curves: expo-out felt like a jolt. easeInOut for layout (height), soft ease-out for reveals.
const inOut = [0.65, 0, 0.35, 1] as const;
const soft = [0.33, 1, 0.68, 1] as const;
const firstSentence = (s: string) => s.split(/(?<=\.)\s/)[0];
const stackOf = (s: string) => s.replace(/\.$/, "").split(",").map((x) => x.trim());

const Works = () => {
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion();
  // Opening a row pushes the rows below it; a short delay stops a pointer that's
  // just passing over from opening every row on the way.
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const openSoon = (id: string | null) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setActive(id), id ? 180 : 0);
  };

  return (
    <div className="py-8 pb-24">
      <div className="flex items-baseline justify-between">
        <h1 className="text-3xl font-semibold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Works
        </h1>
        <span className="text-xs font-mono text-zinc-600 dark:text-zinc-500">{works.length} projects</span>
      </div>
      <p className="mt-2 text-zinc-700 dark:text-zinc-400">
        Personal and team projects from my university years: real-time apps, learning tools, e-commerce and games.
      </p>

      <ul className="mt-10 border-b border-zinc-200 dark:border-zinc-800" onPointerLeave={() => openSoon(null)}>
        {sorted.map((w, i) => {
          const { name, tagline } = splitTitle(w.title);
          const open = active === w.id;
          return (
            <li
              key={w.id}
              onPointerEnter={(e) => e.pointerType === "mouse" && openSoon(w.id)}
              className="border-t border-zinc-200 dark:border-zinc-800"
            >
              <Link
                href={`/works/${w.id}`}
                onFocus={() => setActive(w.id)}
                className="group block py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 rounded-sm"
              >
                <div className="grid grid-cols-[40px_minmax(0,1fr)_auto] items-baseline gap-3">
                  <span className="font-mono text-xs text-zinc-600 dark:text-zinc-500">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0">
                    {/* title rolls up into its blue copy on hover */}
                    <span className="relative block h-6 overflow-hidden font-medium leading-6">
                      <motion.span
                        className="block"
                        animate={{ y: open && !reduce ? "-50%" : "0%" }} // wrapper holds two lines, so half = one line
                        transition={{ duration: 0.6, ease: inOut }}
                      >
                        <span className="block text-zinc-900 dark:text-zinc-100">{name}</span>
                        <span aria-hidden className="block text-blue-600 dark:text-blue-400">{name}</span>
                      </motion.span>
                    </span>
                    {tagline && <span className="block text-sm text-zinc-600 dark:text-zinc-500 truncate">{tagline}</span>}
                  </span>
                  <span className="font-mono text-xs text-zinc-600 dark:text-zinc-500">
                    {w.publishYear} · {fieldLabel(w.field)}
                  </span>
                </div>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="ex"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1, transition: { duration: reduce ? 0 : 0.7, ease: inOut } }}
                      exit={{ height: 0, opacity: 0, transition: { duration: reduce ? 0 : 0.5, ease: inOut } }}
                      className="overflow-hidden"
                    >
                      <div className="grid sm:grid-cols-[minmax(0,1fr)_200px] gap-4 pt-4 pl-[52px]">
                        {/* image opens from the middle like a curtain */}
                        <motion.div
                          initial={{ clipPath: "inset(50% 0% 50% 0% round 8px)" }}
                          animate={{ clipPath: "inset(0% 0% 0% 0% round 8px)" }}
                          transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : 0.15, ease: soft }}
                          className="aspect-[16/10] overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={w.caseStudy?.cover ?? w.headingImg} alt={`${name} screenshot`} className="h-full w-full object-cover object-top" />
                        </motion.div>
                        <div>
                          <p className="text-sm text-zinc-700 dark:text-zinc-400 line-clamp-4">{firstSentence(w.description)}</p>
                          <ul className="mt-3 flex flex-wrap gap-1.5">
                            {stackOf(w.stack).map((s, j) => (
                              <motion.li
                                key={s}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.4 + j * 0.08, ease: soft }}
                                className="font-mono text-xs px-2 py-1 rounded-md border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200"
                              >
                                {s}
                              </motion.li>
                            ))}
                          </ul>
                          <span className="mt-3 inline-block text-sm text-blue-600 dark:text-blue-400">View project →</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Works;
