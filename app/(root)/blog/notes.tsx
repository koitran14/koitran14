"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { PostType, SERIES } from "@/lib/blog";
import { Reveal } from "@/components/reveal";
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
  ["bg-rose-400", "bg-rose-200 dark:bg-rose-950"],
  ["bg-orange-400", "bg-orange-200 dark:bg-orange-950"],
  ["bg-amber-400", "bg-amber-200 dark:bg-amber-950"],
  ["bg-emerald-400", "bg-emerald-200 dark:bg-emerald-950"],
  ["bg-sky-400", "bg-sky-200 dark:bg-sky-950"],
  ["bg-indigo-400", "bg-indigo-200 dark:bg-indigo-950"],
  ["bg-violet-400", "bg-violet-200 dark:bg-violet-950"],
  ["bg-fuchsia-400", "bg-fuchsia-200 dark:bg-fuchsia-950"],
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

/** Marks anything published in the last 7 calendar days. Age is read on the reader's clock after mount, so the server render (no badge) and hydration agree. */
function NewBadge({ at }: { at: string }) {
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => {
    // calendar days in the reader's time zone, so yesterday's post reads "1 ngày trước" even if under 24 hours old
    const day = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    setDays(Math.round((day(new Date()) - day(new Date(at))) / 86_400_000));
  }, [at]);
  if (days === null || days < 0 || days >= 7) return null;
  return (
    <span className="ml-2 inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      MỚI · {days === 0 ? "HÔM NAY" : `${days} NGÀY TRƯỚC`}
    </span>
  );
}

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

/** Reading notice shared by every note: opens on hover or focus on desktop, on tap on touch screens. */
export function ReadingNotice() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !(e.target as Element).closest("[data-notice]")) setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", close);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", close);
    };
  }, [open]);

  return (
    // hover and focus open it only for mouse and keyboard; a tap fires those too and would undo its own click
    <div
      data-notice
      className="relative mt-4 inline-block"
      onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="reading-notice"
        // a mouse click lands on an already-open panel (hover opened it), so it only keeps it open
        onClick={(e) => ((e.nativeEvent as PointerEvent).pointerType === "mouse" ? setOpen(true) : setOpen((o) => !o))}
        onFocus={(e) => e.currentTarget.matches(":focus-visible") && setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/60 py-1 pl-1.5 pr-3 text-[13px] text-zinc-700 dark:text-zinc-300 hover:border-zinc-500 transition-colors"
      >
        <span aria-hidden className="grid h-4 w-4 place-items-center rounded-full border-[1.5px] border-current text-[10px] leading-none" style={mono}>
          i
        </span>
        Lưu ý khi đọc
      </button>
      <div
        id="reading-notice"
        role="note"
        hidden={!open}
        // pt-2 bridges the gap so the pointer can move from the chip into the panel
        className="absolute left-0 top-full z-20 w-[min(23rem,calc(100vw-4rem))] pt-2"
      >
        <div className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4 text-[13.5px] leading-relaxed text-zinc-700 dark:text-zinc-400 shadow-[0_16px_36px_-14px_rgba(24,24,27,0.28)] dark:shadow-none">
          <p className="font-medium text-zinc-900 dark:text-zinc-100">Lưu ý về tài liệu</p>
          <p className="mt-2">
            Đây là sổ tay kỹ thuật cá nhân, được tổng hợp và biên soạn từ các nguồn tài liệu tham khảo trong quá trình học tập và nghiên cứu. Nội dung không đại
            diện cho quan điểm hoặc tài liệu chính thức của bất kỳ tổ chức nào.
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-4">
            <li>
              <span className="font-medium text-zinc-900 dark:text-zinc-100">Nguồn nội dung:</span> Một số nội dung được hỗ trợ soạn thảo bởi các công cụ AI như
              Gemini và Claude, sau đó được biên tập lại. Tuy nhiên, thông tin vẫn có thể tồn tại sai sót hoặc chưa đầy đủ.
            </li>
            <li>
              <span className="font-medium text-zinc-900 dark:text-zinc-100">Tính cập nhật:</span> Các thông tin và hướng dẫn kỹ thuật có thể phụ thuộc vào
              phiên bản phần mềm, thư viện hoặc công nghệ tại thời điểm biên soạn. Vui lòng đối chiếu với tài liệu chính thức trước khi áp dụng.
            </li>
            <li>
              <span className="font-medium text-zinc-900 dark:text-zinc-100">Dữ liệu minh họa và bảo mật:</span> Các số liệu trong tài liệu chỉ mang tính minh
              họa. Những thông tin nhạy cảm trong mã nguồn mẫu, bao gồm token và secret, đã được thay thế bằng placeholder.
            </li>
          </ul>
          <p className="mt-2.5">
            Mọi feedback hoặc trao đổi liên quan đến nội dung trong sổ tay đều được hoan nghênh. Bạn có thể liên hệ qua email{" "}
            <a href="mailto:tndkhoi.work@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
              tndkhoi.work@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

function Workbook({ s }: { s: Series }) {
  const read = useReadChapters(s);
  const done = read.filter(Boolean).length;
  const next = read.indexOf(false); // -1 once every chapter is read
  const current = next === -1 ? s.chapters.length - 1 : next;
  const cta = done === 0 ? "Bắt đầu đọc" : next === -1 ? "Đọc lại" : `Đọc tiếp chương ${s.chapters[next].n}`;

  return (
    <div className="mt-7 grid grid-cols-[minmax(0,1fr)_22px] sm:grid-cols-[minmax(0,1fr)_30px]">
      <div className="relative z-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#131315] shadow-[0_1px_2px_rgba(24,24,27,0.06),0_16px_36px_-14px_rgba(24,24,27,0.28)] dark:shadow-none px-5 py-5 sm:px-6">
        <div className="text-xs text-zinc-600 dark:text-zinc-500" style={mono}>
          <span className={TINT.workbook.text}>WORKBOOK</span> · {s.chapters.length} CHƯƠNG
          <NewBadge at={s.createdAt} />
        </div>
        {/* first word plain, the rest in italic accent, like the handbook's own cover */}
        <Link href={s.href} className="group mt-2 block text-2xl sm:text-[28px] leading-snug text-zinc-900 dark:text-zinc-100" style={serif}>
          {s.title.split(" ")[0]}{" "}
          <i className="text-orange-600 dark:text-orange-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-400 dark:border-zinc-700 bg-white dark:bg-transparent px-4 py-2 text-sm text-zinc-900 dark:text-zinc-100 hover:border-zinc-500 transition-colors"
            >
              {m.kind === "audio" ? <AudioIcon /> : <PlayIcon />} {m.label}
            </Link>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-3">
          <div className="h-0.5 flex-1 bg-zinc-300 dark:bg-zinc-800">
            <div className="h-full bg-violet-500 transition-[width] duration-700" style={{ width: `${(done / s.chapters.length) * 100}%` }} />
          </div>
          <span className="text-xs tabular-nums text-zinc-600 dark:text-zinc-500" style={mono}>
            {done} / {s.chapters.length}
          </span>
        </div>
      </div>
      {/* chapter tabs on the book's edge: read, current, not yet */}
      {/* -ml tucks the tabs under the cover so they read as attached to it, not floating beside it */}
      {/* tabs shrink (down to min-h) so a long series never makes the card taller than its content */}
      <nav aria-label={`Chương của ${s.title}`} className="-ml-3 flex flex-col gap-[3px] py-4">
        {s.chapters.map((c, i) => (
          <Link
            key={c.n}
            href={c.href}
            title={`${c.n} · ${c.title}`}
            aria-label={`Chương ${c.n}: ${c.title}${read[i] ? " (đã đọc)" : ""}`}
            // the chapter to read next sticks out a little further
            className={`flex-1 min-h-3 max-h-6 rounded-r-md shadow-[0_1px_2px_rgba(24,24,27,0.12)] dark:shadow-none transition-transform hover:translate-x-1 ${read[i] || i === current ? SPINES[i % SPINES.length][0] : SPINES[i % SPINES.length][1]} ${
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
  // one feed, newest first: workbooks and posts interleave by date, and posts in a row share one notebook list
  const feed = [...(tab === "all" || tab === "workbook" ? series : []), ...shown].sort((x, y) => y.createdAt.localeCompare(x.createdAt));
  const blocks: (Series | typeof shown)[] = [];
  for (const it of feed) {
    if ("chapters" in it) blocks.push(it);
    else if (Array.isArray(blocks[blocks.length - 1])) (blocks[blocks.length - 1] as typeof shown).push(it);
    else blocks.push([it]);
  }

  return (
    <>
      <Reveal delay={0.14}>
        <div role="tablist" aria-label="Loại" className="mt-8 flex gap-x-6 overflow-x-auto overflow-y-hidden border-b border-zinc-300 dark:border-zinc-800">
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
      </Reveal>

      {blocks.map((b) =>
        Array.isArray(b) ? (
          <ul key={b[0].slug} className="mt-9 border-b border-zinc-300 dark:border-zinc-800">
            {b.map((e, i) => (
              // stagger only the first few rows; later ones reveal as they scroll in
              <Reveal
                as="li"
                key={e.slug}
                delay={Math.min(i, 5) * 0.06}
                className="grid grid-cols-[56px_minmax(0,1fr)] sm:grid-cols-[72px_minmax(0,1fr)] border-t border-zinc-300 dark:border-zinc-800"
              >
                {/* margin column: entry number and date, ruled off in red like a notebook */}
                <div className="border-r border-red-400 dark:border-red-900/80 py-5 pr-3 text-right text-xs leading-5" style={mono}>
                  <div className="text-zinc-700 dark:text-zinc-400">N° {String(e.n).padStart(2, "0")}</div>
                  <time dateTime={e.createdAt} className="text-zinc-500">
                    {e.date}
                  </time>
                </div>
                <div className="py-5 pl-4 sm:pl-5">
                  <div className="text-xs text-zinc-600 dark:text-zinc-500" style={mono}>
                    <span className={TINT[e.type].text}>{TYPES[e.type].toUpperCase()}</span>
                    {e.type !== "note" && ` · ${e.minutes} PHÚT`}
                    {!e.published && <span className="text-amber-600 dark:text-amber-400"> · NHÁP</span>}
                    <NewBadge at={e.createdAt} />
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
                      <p
                        className="text-lg italic leading-relaxed text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                        style={serif}
                      >
                        “{e.excerpt}”
                      </p>
                    ) : (
                      <>
                        <span
                          className="block text-xl leading-snug text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                          style={serif}
                        >
                          {e.title}
                        </span>
                        <span className="mt-1.5 block text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-400">{e.excerpt}</span>
                      </>
                    )}
                  </Link>
                </div>
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal key={b.slug} delay={0.2}>
            <Workbook s={b} />
          </Reveal>
        ),
      )}
    </>
  );
}
