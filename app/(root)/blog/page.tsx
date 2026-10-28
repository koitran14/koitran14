import Link from "next/link";
import { Be_Vietnam_Pro, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import { SERIES, getPosts, isAdmin } from "@/lib/blog";
import { Reveal } from "@/components/reveal";
import { bookViews, getAllViews } from "@/lib/views";
import { Notes, ReadingNotice, type Entry } from "./notes";

export const dynamic = "force-dynamic";

// Notebook typography for the Notes list; all three carry full Vietnamese glyphs.
const serif = Source_Serif_4({ subsets: ["latin", "vietnamese"], style: ["normal", "italic"], variable: "--font-notes-serif" });
const sans = Be_Vietnam_Pro({ subsets: ["latin", "vietnamese"], weight: ["400", "500"], variable: "--font-notes-sans" });
const mono = JetBrains_Mono({ subsets: ["latin", "vietnamese"], variable: "--font-notes-mono" });

const excerpt = (s: string, n = 160) => {
  const first = s.trim().split(/\n\s*\n/)[0].replace(/\s+/g, " ");
  return first.length > n ? first.slice(0, n).replace(/\s+\S*$/, "") + "…" : first;
};
// ~200 words a minute, never less than one
const minutes = (s: string) => Math.max(1, Math.round(s.trim().split(/\s+/).length / 200));

export default async function BlogPage() {
  const admin = isAdmin();
  // one read for the whole list; posts show their own count, workbooks the sum over their chapters
  const all = await getAllViews();
  const views = all && { ...all, ...Object.fromEntries(SERIES.map((s) => [s.slug, bookViews(all, s.slug)])) };
  const entries: Entry[] = (await getPosts())
    .filter((p) => admin || p.published)
    .map((p) => ({
      slug: p.slug,
      type: p.type ?? "article",
      title: p.title,
      excerpt: excerpt(p.content),
      minutes: minutes(p.content),
      published: p.published,
      createdAt: p.createdAt,
      date: new Date(p.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit" }).replace("/", "."),
    }));

  return (
    <div className={`${serif.variable} ${sans.variable} ${mono.variable} py-8 pb-24`} style={{ fontFamily: "var(--font-notes-sans)" }}>
      <Reveal>
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-zinc-600 dark:text-zinc-500" style={{ fontFamily: "var(--font-notes-mono)" }}>
            VOL. 01 — {new Date().getFullYear()}
          </span>
          {admin && (
            <Link href="/blog/admin" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              + New post
            </Link>
          )}
        </div>
        <h1
          className="mt-3 text-4xl sm:text-5xl tracking-tight text-zinc-900 dark:text-zinc-100"
          style={{ fontFamily: "var(--font-notes-serif)", lineHeight: 1.1 }}
        >
          Notes <span className="text-zinc-400 dark:text-zinc-600">—</span> <span className="italic text-orange-600 dark:text-orange-400">sổ tay</span>
        </h1>
        <p className="mt-3 max-w-md leading-relaxed text-zinc-700 dark:text-zinc-400">
          Góc nhỏ lưu giữ những điều mình học được, những thứ mình tò mò và những ý tưởng mình muốn ghi lại trên hành trình khám phá thế giới tri thức.
        </p>
        <p
          className="mt-3 max-w-md border-l-2 border-orange-500/60 pl-3 italic leading-relaxed text-zinc-600 dark:text-zinc-400"
          style={{ fontFamily: "var(--font-notes-serif)" }}
        >
          Note này không đến từ một đứa học giỏi. Mình chỉ là một đứa học chưa tốt, nhưng luôn muốn học được tốt như các bạn
          giỏi mà thôi. Và đó là lý do mình có cái note này.
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <ReadingNotice />
      </Reveal>

      <Notes entries={entries} series={SERIES} views={views} admin={admin} />
    </div>
  );
}
