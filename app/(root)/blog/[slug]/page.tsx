import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { SERIES, formatDate, getPosts, isAdmin } from "@/lib/blog";

export const dynamic = "force-dynamic";

export default async function PostPage({ params }: { params: { slug: string } }) {
  const series = SERIES.find((s) => s.slug === params.slug);
  if (series) redirect(series.href);
  const post = (await getPosts()).find((p) => p.slug === params.slug);
  if (!post || (!post.published && !isAdmin())) notFound();

  return (
    <article className="py-8 pb-24">
      <Link href="/blog" className="text-sm text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
        ← Blog
      </Link>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {post.title}
      </h1>
      <time className="mt-2 block text-sm text-zinc-600 dark:text-zinc-500" dateTime={post.createdAt}>
        {formatDate(post.createdAt)}
        {!post.published && " · Draft"}
      </time>
      {/* shortcut: plain text with paragraph breaks, no markdown; add a markdown renderer if posts need formatting. */}
      <div className="mt-8 space-y-5 text-zinc-700 dark:text-zinc-300 leading-relaxed">
        {post.content.split(/\n\s*\n/).map((para, i) => (
          <p key={i} className="whitespace-pre-wrap">{para}</p>
        ))}
      </div>
    </article>
  );
}
