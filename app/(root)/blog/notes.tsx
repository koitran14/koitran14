"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { PostType, SERIES } from "@/lib/blog";
import { togglePublished } from "./actions";

/** Notes tabs, in display order. "workbook" is only used by SERIES. */
const TYPES = { article: "Bài viết", note: "Ghi chú", workbook: "Workbook", doc: "Tài liệu" } as const;
// label text and tab swatch per type (full class names so Tailwind keeps them)
const TINT = {
  article: { text: "text-blue-600 dark:text-blue-400", dot: "bg-blue-500" },
  note: { text: "text-amber-600 dark:text-amber-400", dot: "bg-amber-500" },
  workbook: { text: "text-violet-600 dark:text-violet-400", dot: "bg-violet-500" },
  doc: { text: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500" },
} as const;
// one spine colour per chapter: [read, unread]
const SPINES = [
  ["bg-rose-400", "bg-rose-100 dark:bg-rose-950"],
  ["bg-orange-400", "bg-orange-100 dark:bg-orange-950"],
  ["bg-amber-400", "bg-amber-100 dark:bg-amber-950"],
  ["bg-emerald-400", "bg-emerald-100 dark:bg-emerald-950"],
  ["bg-sky-400", "bg-sky-100 dark:bg-sky-950"],
  ["bg-indigo-400", "bg-indigo-100 dark:bg-indigo-950"],
  ["bg-violet-400", "bg-violet-100 dark:bg-violet-950"],
];

export type Entry = {
  slug: string;
  type: PostType;
  title: string;
  excerpt: string;
  minutes: number;
  published: boolean;
  createdAt: string;
  date: string;
};
type Series = (typeof SERIES)[number];
type Tab = "all" | keyof typeof TYPES;

const mono = { fontFamily: "var(--font-notes-mono)" };
const serif = { fontFamily: "var(--font-notes-serif)" };

/** Chapters the reader has answered at least one quiz question in, read from the handbook's own localStorage. */
function useReadChapters(series: Series) {
  const [read, setRead] = useState<boolean[]>(() => series.chapters.map(() => false));
  useEffect(() => {
    setRead(
      series.chapters.map((c) => {
        try {
          return Object.keys(JSON.parse(localStorage.getItem(`ans:${c.key}`) ?? "{}") ?? {}).length > 0;
        } catch {
          return false;
        }
      })
    );
  }, [series]);
  return read;
}

const AudioIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="14" width="5" height="7" rx="1.5" /><rect x="16" y="14" width="5" height="7" rx="1.5" />
  </svg>
);
const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M7 4v16l13-8z" />
  </svg>
);

function Workbook({ s }: { s: Series }) {
  const read = useReadChapters(s);
  const done = read.filter(Boolean).length;
  const next = read.indexOf(false); // -1 once every chapter is read
  const current = next === -1 ? s.chapters.length - 1 : next;
  const cta = done === 0 ? "Bắt đầu đọc" : next === -1 ? "Đọc lại" : `Đọc tiếp chương ${s.chapters[next].n}`;

  return (
    <div className="mt-7 grid grid-cols-[minmax(0,1fr)_22px] sm:grid-cols-[minmax(0,1fr)_30px]">
      <div className="rounded-l-xl border border-r-0 border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 px-5 py-5 sm:px-6">
        <div className="text-xs text-zinc-600 dark:text-zinc-500" style={mono}>
          <span className={TINT.workbook.text}>WORKBOOK</span> · {s.chapters.length} CHƯƠNG
        </div>
        {/* first word plain, the rest in italic violet, like the handbook's own cover */}
        <Link href={s.href} className="group mt-2 block text-2xl sm:text-[28px] leading-snug text-zinc-900 dark:text-zinc-100" style={serif}>
          {s.title.split(" ")[0]}{" "}
          <i className="text-violet-600 dark:text-violet-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {s.title.split(" ").slice(1).join(" ")}
          </i>
        </Link>
        <p className="mt-1.5 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-400">{s.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={next === -1 || done === 0 ? s.chapters[0].href : s.chapters[next].href}
            className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100 px-4 py-2 text-sm font-medium text-white dark:text-zinc-900 hover:opacity-90 transition-opacity"
          >
            {cta} <span aria-hidden>→</span>
          </Link>
          {s.media.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm text-zinc-900 dark:text-zinc-100 hover:border-zinc-500 transition-colors"
            >
              {m.kind === "audio" ? <AudioIcon /> : <PlayIcon />} {m.label}
            </Link>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-3">
          <div className="h-0.5 flex-1 bg-zinc-200 dark:bg-zinc-800">
            <div className="h-full bg-violet-500 transition-[width] duration-700" style={{ width: `${(done / s.chapters.length) * 100}%` }} />
          </div>
          <span className="text-xs tabular-nums text-zinc-600 dark:text-zinc-500" style={mono}>
            {done} / {s.chapters.length}
          </span>
        </div>
      </div>
      {/* chapter tabs on the book's edge: read, current, not yet */}
      <nav aria-label={`Chương của ${s.title}`} className="flex flex-col gap-[3px] pt-4">
        {s.chapters.map((c, i) => (
          <Link
            key={c.n}
            href={c.href}
            title={`${c.n} · ${c.title}`}
            aria-label={`Chương ${c.n}: ${c.title}${read[i] ? " (đã đọc)" : ""}`}
            // the chapter to read next sticks out a little further
            className={`h-6 rounded-r-md transition-transform hover:translate-x-1 ${read[i] || i === current ? SPINES[i % 7][0] : SPINES[i % 7][1]} ${
              i === current && next !== -1 ? "translate-x-1.5" : ""
            }`}
          />
        ))}
      </nav>
    </div>
  );
}

export function Notes({ entries, series, admin }: { entries: Entry[]; series: Series[]; admin: boolean }) {
  const [tab, setTab] = useState<Tab>("all");
  const count = (t: Tab) => (t === "all" ? entries.length + series.length : t === "workbook" ? series.length : entries.filter((e) => e.type === t).length);
  // only tabs that have something in them
  const tabs = (["all", ...Object.keys(TYPES)] as Tab[]).filter((t) => count(t) > 0);
  const shown = entries.map((e, i) => ({ ...e, n: entries.length - i })).filter((e) => tab === "all" || e.type === tab);

  return (
    <>
      <div role="tablist" aria-label="Loại" className="mt-8 flex gap-x-6 overflow-x-auto overflow-y-hidden border-b border-zinc-200 dark:border-zinc-800">
        {tabs.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`shrink-0 border-b pb-2.5 text-sm transition-colors ${
              tab === t
                ? "border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100"
                : "border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            {t !== "all" && <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-sm align-middle ${TINT[t].dot}`} />}
            {t === "all" ? "Tất cả" : TYPES[t]}{" "}
            <span className="text-xs text-zinc-500" style={mono}>
              {String(count(t)).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>

      {(tab === "all" || tab === "workbook") && series.map((s) => <Workbook key={s.slug} s={s} />)}

      {shown.length > 0 && (
        <ul className="mt-9 border-b border-zinc-200 dark:border-zinc-800">
          {shown.map((e) => (
            <li key={e.slug} className="grid grid-cols-[56px_minmax(0,1fr)] sm:grid-cols-[72px_minmax(0,1fr)] border-t border-zinc-200 dark:border-zinc-800">
              {/* margin column: entry number and date, ruled off in red like a notebook */}
              <div className="border-r border-red-300 dark:border-red-900/80 py-5 pr-3 text-right text-xs leading-5" style={mono}>
                <div className="text-zinc-700 dark:text-zinc-400">N° {String(e.n).padStart(2, "0")}</div>
                <time dateTime={e.createdAt} className="text-zinc-500">{e.date}</time>
              </div>
              <div className="py-5 pl-4 sm:pl-5">
                <div className="text-xs text-zinc-600 dark:text-zinc-500" style={mono}>
                  <span className={TINT[e.type].text}>{TYPES[e.type].toUpperCase()}</span>
                  {e.type !== "note" && ` · ${e.minutes} PHÚT`}
                  {!e.published && <span className="text-amber-600 dark:text-amber-400"> · NHÁP</span>}
                  {admin && (
                    <form action={togglePublished.bind(null, e.slug)} className="inline">
                      {" · "}
                      <button className="underline underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-100">
                        {e.published ? "Unpublish" : "Publish"}
                      </button>
                    </form>
                  )}
                </div>
                <Link href={`/blog/${e.slug}`} className="group block mt-1.5">
                  {e.type === "note" ? (
                    <p className="text-lg italic leading-relaxed text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" style={serif}>
                      “{e.excerpt}”
                    </p>
                  ) : (
                    <>
                      <span className="block text-xl leading-snug text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" style={serif}>
                        {e.title}
                      </span>
                      <span className="mt-1.5 block text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-400">{e.excerpt}</span>
                    </>
                  )}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
